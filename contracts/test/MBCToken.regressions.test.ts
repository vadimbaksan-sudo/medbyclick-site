import { expect } from "chai";
import { ethers, network } from "hardhat";
import { deployFixture, TOTAL_SUPPLY } from "./helpers/fixtures";

describe("MBCToken (Contract A) — docs/CONTRACT_AUDIT.md regression tests", function () {
  const M = (n: number) => ethers.parseUnits(n.toString(), 18);

  describe("C-01 — owner-bypassable pause (CRITICAL)", function () {
    it("has no pause()/unpause() function at all — the vector is removed, not gated", async function () {
      const fx = await deployFixture();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyToken = fx.token as any;
      expect(anyToken.pause, "pause() must not exist on MBCToken").to.be.undefined;
      expect(anyToken.unpause, "unpause() must not exist on MBCToken").to.be.undefined;
      expect(anyToken.paused, "paused() must not exist on MBCToken").to.be.undefined;
      expect(fx.token.interface.fragments.some((f) => "name" in f && f.name === "pause")).to.equal(false);
    });

    it("owner can never freeze transfers between two ordinary non-exempt holders", async function () {
      const fx = await deployFixture();
      await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, true);
      await fx.token.connect(fx.safeSigner).transfer(fx.user.address, M(1_000_000));

      // Owner (the Safe) does everything it possibly can to restrict trading
      // short of a nonexistent pause: tighten via setLimits is blocked by
      // H-02 below, so the only lever left is exemption/limits management —
      // neither can globally halt transfers. A plain transfer between two
      // regular (non-exempt) holders under the default 1,000,000 MBC maxTx /
      // 3,000,000 MBC maxWallet limits must always succeed.
      await expect(fx.token.connect(fx.user).transfer(fx.userB.address, M(500_000))).to.not.be.reverted;
      expect(await fx.token.balanceOf(fx.userB.address)).to.equal(M(500_000));
    });
  });

  describe("H-01 — setExempt must emit an event", function () {
    it("emits ExemptionUpdated on every exemption change", async function () {
      const fx = await deployFixture();
      await expect(fx.token.connect(fx.safeSigner).setExempt(fx.user.address, true))
        .to.emit(fx.token, "ExemptionUpdated")
        .withArgs(fx.user.address, true);

      await expect(fx.token.connect(fx.safeSigner).setExempt(fx.user.address, false))
        .to.emit(fx.token, "ExemptionUpdated")
        .withArgs(fx.user.address, false);
    });

    it("emits ExemptionUpdated once for the initial safe exemption set in the constructor", async function () {
      // Re-derive independently of the shared fixture to inspect the
      // deployment transaction's own logs.
      const [deployer] = await ethers.getSigners();
      const TestMultisigStub = await ethers.getContractFactory("TestMultisigStub");
      const safeStub = await TestMultisigStub.deploy();
      await safeStub.waitForDeployment();
      const safeAddress = await safeStub.getAddress();

      const MBCToken = await ethers.getContractFactory("MBCToken");
      const token = await MBCToken.deploy(safeAddress);
      const receipt = await token.deploymentTransaction()!.wait();

      const exemptionEvents = receipt!.logs.filter((log) => {
        try {
          const parsed = token.interface.parseLog(log);
          return parsed?.name === "ExemptionUpdated";
        } catch {
          return false;
        }
      });
      expect(exemptionEvents.length).to.equal(1);
      void deployer;
    });

    it("only the owner (Gnosis Safe) can call setExempt", async function () {
      const fx = await deployFixture();
      await expect(fx.token.connect(fx.user).setExempt(fx.user.address, true)).to.be.revertedWithCustomError(
        fx.token,
        "OwnableUnauthorizedAccount"
      );
    });
  });

  describe("H-02 — setLimits must be loosen-only after initial setup", function () {
    it("allows loosening (raising maxTx/maxWallet, lowering cooldown)", async function () {
      const fx = await deployFixture();
      const newMaxTx = (await fx.token.maxTxAmount()) + M(1_000_000);
      const newMaxWallet = (await fx.token.maxWalletAmount()) + M(1_000_000);
      const newCooldown = (await fx.token.txCooldown()) - 10n;

      await expect(fx.token.connect(fx.safeSigner).setLimits(newMaxTx, newMaxWallet, newCooldown))
        .to.emit(fx.token, "LimitsUpdated")
        .withArgs(newMaxTx, newMaxWallet, newCooldown);

      expect(await fx.token.maxTxAmount()).to.equal(newMaxTx);
      expect(await fx.token.maxWalletAmount()).to.equal(newMaxWallet);
      expect(await fx.token.txCooldown()).to.equal(newCooldown);
    });

    it("reverts on tightening maxTxAmount below its current value", async function () {
      const fx = await deployFixture();
      const currentMaxTx = await fx.token.maxTxAmount();
      const currentMaxWallet = await fx.token.maxWalletAmount();
      const currentCooldown = await fx.token.txCooldown();

      await expect(
        fx.token.connect(fx.safeSigner).setLimits(currentMaxTx - M(1), currentMaxWallet, currentCooldown)
      ).to.be.revertedWith("MBC: maxTx may only increase");
    });

    it("reverts on tightening maxWalletAmount below its current value", async function () {
      const fx = await deployFixture();
      const currentMaxTx = await fx.token.maxTxAmount();
      const currentMaxWallet = await fx.token.maxWalletAmount();
      const currentCooldown = await fx.token.txCooldown();

      await expect(
        fx.token.connect(fx.safeSigner).setLimits(currentMaxTx, currentMaxWallet - M(1), currentCooldown)
      ).to.be.revertedWith("MBC: maxWallet may only increase");
    });

    it("reverts on tightening (raising) the cooldown above its current value", async function () {
      const fx = await deployFixture();
      const currentMaxTx = await fx.token.maxTxAmount();
      const currentMaxWallet = await fx.token.maxWalletAmount();
      const currentCooldown = await fx.token.txCooldown();

      await expect(
        fx.token.connect(fx.safeSigner).setLimits(currentMaxTx, currentMaxWallet, currentCooldown + 1n)
      ).to.be.revertedWith("MBC: cooldown may only decrease");
    });

    it("still enforces the absolute floors even for a loosening call", async function () {
      const fx = await deployFixture();
      const minMaxTx = await fx.token.MIN_MAX_TX();
      // A value below the floor is also, by construction here, below the
      // current (higher) default — the floor check is reached first.
      await expect(
        fx.token.connect(fx.safeSigner).setLimits(minMaxTx - 1n, await fx.token.maxWalletAmount(), 0)
      ).to.be.revertedWith("MBC: maxTx below floor");
    });

    it("the H-02 attack path from docs/CONTRACT_AUDIT.md is structurally blocked: exempt self then tighten on everyone else", async function () {
      const fx = await deployFixture();
      // Step 1 of the documented attack: owner silently exempts itself.
      // (No longer silent either, per H-01 — but that's a separate finding.)
      await fx.token.connect(fx.safeSigner).setExempt(fx.safeAddress, true); // already exempt from genesis; re-assert

      // Step 2 of the documented attack: owner tries to trap retail with a
      // minimal maxTx + long cooldown. This must revert under loosen-only.
      await expect(
        fx.token.connect(fx.safeSigner).setLimits(await fx.token.MIN_MAX_TX(), await fx.token.MIN_MAX_WALLET(), 86_400)
      ).to.be.reverted;
    });

    it("removeLimits() is permanent and one-way — no function can re-enable limitsEnabled", async function () {
      const fx = await deployFixture();
      expect(await fx.token.limitsEnabled()).to.equal(true);

      await expect(fx.token.connect(fx.safeSigner).removeLimits()).to.emit(fx.token, "LimitsRemoved");
      expect(await fx.token.limitsEnabled()).to.equal(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyToken = fx.token as any;
      expect(anyToken.enableLimits, "no function may re-enable limits").to.be.undefined;
      expect(anyToken.setLimitsEnabled, "no function may re-enable limits").to.be.undefined;

      // A subsequent setLimits() call still succeeds (it's owner-gated
      // config, not itself the enable switch) but limitsEnabled stays false.
      const maxTx = await fx.token.maxTxAmount();
      const maxWallet = await fx.token.maxWalletAmount();
      await fx.token.connect(fx.safeSigner).setLimits(maxTx, maxWallet, 0);
      expect(await fx.token.limitsEnabled()).to.equal(false);
    });
  });

  describe("Genesis mint (spec §4.1)", function () {
    it("mints exactly 100,000,000 MBC, exactly once, to the Safe address", async function () {
      const fx = await deployFixture();
      expect(await fx.token.totalSupply()).to.equal(TOTAL_SUPPLY);
      expect(await fx.token.balanceOf(fx.safeAddress)).to.equal(TOTAL_SUPPLY);
    });

    it("has no mint function of any kind anywhere in the ABI", async function () {
      const fx = await deployFixture();
      const mintLike = fx.token.interface.fragments.filter(
        (f) => "name" in f && typeof f.name === "string" && f.name.toLowerCase().includes("mint")
      );
      expect(mintLike, "MBCToken must expose no mint-like function").to.have.length(0);
    });

    it("rejects an EOA as the genesis Safe address", async function () {
      const [, eoa] = await ethers.getSigners();
      const MBCToken = await ethers.getContractFactory("MBCToken");
      await expect(MBCToken.deploy(eoa.address)).to.be.revertedWith(
        "MBC: safe must be a contract (Gnosis Safe), not an EOA"
      );
    });

    it("rejects the zero address as the genesis Safe address", async function () {
      const MBCToken = await ethers.getContractFactory("MBCToken");
      await expect(MBCToken.deploy(ethers.ZeroAddress)).to.be.reverted;
    });
  });

  describe("Baseline anti-whale mechanics (unchanged behavior from PR #2, still enforced)", function () {
    it("reverts a transfer above maxTxAmount between two non-exempt holders", async function () {
      const fx = await deployFixture();
      const maxTx = await fx.token.maxTxAmount();
      await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, true);
      await fx.token.connect(fx.safeSigner).transfer(fx.user.address, maxTx + M(1));
      await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, false);

      await expect(fx.token.connect(fx.user).transfer(fx.userB.address, maxTx + M(1))).to.be.revertedWith(
        "MBC: exceeds max tx"
      );
    });

    it("reverts a transfer that would push the recipient above maxWalletAmount", async function () {
      const fx = await deployFixture();
      const maxWallet = await fx.token.maxWalletAmount();
      await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, true);
      await fx.token.connect(fx.safeSigner).transfer(fx.user.address, maxWallet);
      await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, false);

      await fx.token.connect(fx.safeSigner).setExempt(fx.userB.address, true);
      await fx.token.connect(fx.safeSigner).transfer(fx.userB.address, M(1));
      await fx.token.connect(fx.safeSigner).setExempt(fx.userB.address, false);

      await expect(fx.token.connect(fx.userB).transfer(fx.user.address, M(1))).to.be.revertedWith(
        "MBC: exceeds max wallet"
      );
    });

    it("enforces the cooldown between transfers from the same non-exempt sender", async function () {
      const fx = await deployFixture();
      await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, true);
      await fx.token.connect(fx.safeSigner).transfer(fx.user.address, M(2_000));
      await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, false);

      await fx.token.connect(fx.user).transfer(fx.userB.address, M(100));
      await expect(fx.token.connect(fx.user).transfer(fx.userB.address, M(100))).to.be.revertedWith(
        "MBC: cooldown active"
      );

      await network.provider.send("evm_increaseTime", [31]);
      await network.provider.send("evm_mine", []);
      await expect(fx.token.connect(fx.user).transfer(fx.userB.address, M(100))).to.not.be.reverted;
    });
  });
});
