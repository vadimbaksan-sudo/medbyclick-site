import { expect } from "chai";
import { ethers } from "hardhat";
import { deployFixture, bridgeToEthereum, bridgeToBnb } from "./helpers/fixtures";
import { checkSupplyInvariant } from "./helpers/invariant";

describe("Round trip: lock (BNB) -> mint (ETH) -> burn (ETH) -> unlock (BNB) (spec §4.4)", function () {
  it("returns the system to the exact starting state", async function () {
    const fx = await deployFixture();
    const M = (n: number) => ethers.parseUnits(n.toString(), 18);
    const amount = M(3_141_592); // arbitrary, dust-free at 6 shared decimals

    await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, true);
    await fx.token.connect(fx.safeSigner).transfer(fx.user.address, amount);

    const startingUserBnbBalance = await fx.token.balanceOf(fx.user.address);
    const startingAdapterLocked = await fx.token.balanceOf(await fx.adapter.getAddress());
    const startingEthOutstanding = await fx.oft.totalSupply();
    expect(startingAdapterLocked).to.equal(0n);
    expect(startingEthOutstanding).to.equal(0n);
    await checkSupplyInvariant(fx);

    // Lock on BNB -> mint on Ethereum.
    await bridgeToEthereum(fx, fx.user, fx.user.address, amount);

    expect(await fx.token.balanceOf(fx.user.address)).to.equal(startingUserBnbBalance - amount);
    expect(await fx.token.balanceOf(await fx.adapter.getAddress())).to.equal(startingAdapterLocked + amount);
    expect(await fx.oft.balanceOf(fx.user.address)).to.equal(amount);
    expect(await fx.oft.totalSupply()).to.equal(startingEthOutstanding + amount);
    await checkSupplyInvariant(fx);

    // Burn on Ethereum -> unlock on BNB, back to the same user.
    await bridgeToBnb(fx, fx.user, fx.user.address, amount);

    // Exact starting state restored.
    expect(await fx.token.balanceOf(fx.user.address)).to.equal(startingUserBnbBalance);
    expect(await fx.token.balanceOf(await fx.adapter.getAddress())).to.equal(startingAdapterLocked);
    expect(await fx.oft.balanceOf(fx.user.address)).to.equal(0n);
    expect(await fx.oft.totalSupply()).to.equal(startingEthOutstanding);
    await checkSupplyInvariant(fx);
  });

  it("round trip through a different recipient on each leg still conserves total supply", async function () {
    const fx = await deployFixture();
    const M = (n: number) => ethers.parseUnits(n.toString(), 18);
    const amount = M(777_000);

    await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, true);
    await fx.token.connect(fx.safeSigner).setExempt(fx.userB.address, true);
    await fx.token.connect(fx.safeSigner).transfer(fx.user.address, amount);

    // user locks on BNB, mints to userB on Ethereum.
    await bridgeToEthereum(fx, fx.user, fx.userB.address, amount);
    expect(await fx.oft.balanceOf(fx.userB.address)).to.equal(amount);
    await checkSupplyInvariant(fx);

    // userB burns on Ethereum, unlocks back to `user` on BNB.
    await bridgeToBnb(fx, fx.userB, fx.user.address, amount);

    expect(await fx.token.balanceOf(fx.user.address)).to.equal(amount);
    expect(await fx.oft.balanceOf(fx.userB.address)).to.equal(0n);
    expect(await fx.oft.totalSupply()).to.equal(0n);
    expect(await fx.token.balanceOf(await fx.adapter.getAddress())).to.equal(0n);
    await checkSupplyInvariant(fx);
  });
});
