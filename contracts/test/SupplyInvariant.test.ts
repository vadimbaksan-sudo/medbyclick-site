import { expect } from "chai";
import { ethers } from "hardhat";
import { deployFixture, bridgeToEthereum, bridgeToBnb } from "./helpers/fixtures";
import { checkSupplyInvariant } from "./helpers/invariant";

describe("Supply invariant (spec §4.4 — supply-invariant test)", function () {
  it("holds at every step across a sequence of transfer / lock / mint / burn / unlock operations", async function () {
    const fx = await deployFixture();
    const M = (n: number) => ethers.parseUnits(n.toString(), 18);

    // Step 0: genesis.
    await checkSupplyInvariant(fx);
    expect(await fx.token.totalSupply()).to.equal(await fx.token.balanceOf(fx.safeAddress));

    // Step 1: ordinary BNB-side transfer (not a bridge op) — safe funds two users.
    // Exempt both test users from Contract A anti-whale limits so this test
    // exercises bridge/supply mechanics in isolation from the anti-whale
    // mechanics (covered separately in MBCToken.regressions.test.ts).
    await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, true);
    await fx.token.connect(fx.safeSigner).setExempt(fx.userB.address, true);
    await fx.token.connect(fx.safeSigner).transfer(fx.user.address, M(5_000_000));
    await checkSupplyInvariant(fx);

    // Step 2: user bridges 2,000,000 MBC to userB on Ethereum.
    await bridgeToEthereum(fx, fx.user, fx.userB.address, M(2_000_000));
    await checkSupplyInvariant(fx);
    expect(await fx.oft.balanceOf(fx.userB.address)).to.equal(M(2_000_000));
    expect(await fx.token.balanceOf(await fx.adapter.getAddress())).to.equal(M(2_000_000));

    // Step 3: user bridges another 1,000,000 MBC to themselves on Ethereum.
    await bridgeToEthereum(fx, fx.user, fx.user.address, M(1_000_000));
    await checkSupplyInvariant(fx);
    expect(await fx.oft.totalSupply()).to.equal(M(3_000_000));

    // Step 4: userB bridges 1,500,000 MBC back from Ethereum to user on BNB
    // (burn on Ethereum -> unlock on BNB).
    await bridgeToBnb(fx, fx.userB, fx.user.address, M(1_500_000));
    await checkSupplyInvariant(fx);
    expect(await fx.oft.balanceOf(fx.userB.address)).to.equal(M(500_000));

    // Step 5: user bridges their remaining 1,000,000 Ethereum-side MBC back to BNB.
    await bridgeToBnb(fx, fx.user, fx.user.address, M(1_000_000));
    await checkSupplyInvariant(fx);

    // Final state sanity: 500,000 MBC (userB's remainder) is still bridged out,
    // exactly matching the locked balance on BNB Chain.
    const ethOutstanding = await fx.oft.totalSupply();
    const bnbLocked = await fx.token.balanceOf(await fx.adapter.getAddress());
    expect(ethOutstanding).to.equal(M(500_000));
    expect(bnbLocked).to.equal(M(500_000));
    expect(ethOutstanding).to.equal(bnbLocked);
  });
});
