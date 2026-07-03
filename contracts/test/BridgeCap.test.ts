import { expect } from "chai";
import { ethers } from "hardhat";
import { deployFixture, bridgeToEthereum, bridgeToBnb, BRIDGE_CAP, EID_ETH, defaultOptions } from "./helpers/fixtures";
import { addressToBytes32 } from "@layerzerolabs/lz-v2-utilities";
import { checkSupplyInvariant } from "./helpers/invariant";

describe("Bridge cap enforcement (spec §4.2 / §4.4)", function () {
  const M = (n: number) => ethers.parseUnits(n.toString(), 18);

  it("allows bridging up to exactly the 10,000,000 MBC cap", async function () {
    const fx = await deployFixture();
    await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, true);
    await fx.token.connect(fx.safeSigner).transfer(fx.user.address, BRIDGE_CAP);

    await bridgeToEthereum(fx, fx.user, fx.user.address, BRIDGE_CAP);

    expect(await fx.oft.totalSupply()).to.equal(BRIDGE_CAP);
    await checkSupplyInvariant(fx);
  });

  it("rejects the mint beyond 10,000,000 MBC outstanding on Ethereum (require in MBCOFT._credit)", async function () {
    const fx = await deployFixture();
    await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, true);
    // Fund the user with cap + 1 token so only the *cap enforcement*, not an
    // insufficient balance, is what stops the second bridge from crediting.
    await fx.token.connect(fx.safeSigner).transfer(fx.user.address, BRIDGE_CAP + M(1));

    await bridgeToEthereum(fx, fx.user, fx.user.address, BRIDGE_CAP);
    expect(await fx.oft.totalSupply()).to.equal(BRIDGE_CAP);

    // NOTE on why this is asserted via effects rather than `expect(...).to.be.reverted`:
    // LayerZero's EndpointV2Mock — like the real EndpointV2 executor path —
    // delivers `lzReceive` via a try/catch (see
    // node_modules/@layerzerolabs/test-devtools-evm-hardhat/contracts/mocks/EndpointV2Mock.sol
    // `receivePayload`), because in production the source-chain `send()` and
    // destination-chain `lzReceive()` are two separate transactions on two
    // separate chains — a destination-side revert cannot and does not revert
    // the source-chain lock. This is not a mock artifact; it is the real
    // LayerZero execution model, and it is exactly why MBCOFT._credit's
    // `require` is the correct enforcement point (spec §4.2): the credit
    // that would breach BRIDGE_CAP simply never happens. We assert on that
    // observable effect below.
    const sendParam = {
      dstEid: EID_ETH,
      to: addressToBytes32(fx.user.address),
      amountLD: M(1),
      minAmountLD: M(1),
      extraOptions: defaultOptions(),
      composeMsg: "0x",
      oftCmd: "0x",
    };
    const quotedFee = await fx.adapter.quoteSend(sendParam, false);
    const fee = { nativeFee: quotedFee.nativeFee, lzTokenFee: quotedFee.lzTokenFee };
    await fx.token.connect(fx.user).approve(await fx.adapter.getAddress(), M(1));
    await fx.adapter.connect(fx.user).send(sendParam, fee, fx.user.address, { value: fee.nativeFee });

    // The lock succeeded on BNB (adapter now holds cap + 1 MBC)...
    expect(await fx.token.balanceOf(await fx.adapter.getAddress())).to.equal(BRIDGE_CAP + M(1));
    // ...but the mint on Ethereum was rejected by the bridge cap `require`,
    // so Ethereum-outstanding supply is UNCHANGED, not incremented, and the
    // user's Ethereum balance never grew past the cap.
    expect(await fx.oft.totalSupply()).to.equal(BRIDGE_CAP);
    expect(await fx.oft.balanceOf(fx.user.address)).to.equal(BRIDGE_CAP);
  });

  it("cap is a live, dynamic limit: freeing headroom by bridging back allows new bridging up to the cap again", async function () {
    const fx = await deployFixture();
    await fx.token.connect(fx.safeSigner).setExempt(fx.user.address, true);
    await fx.token.connect(fx.safeSigner).transfer(fx.user.address, BRIDGE_CAP + M(500_000));

    await bridgeToEthereum(fx, fx.user, fx.user.address, BRIDGE_CAP);
    expect(await fx.oft.totalSupply()).to.equal(BRIDGE_CAP);

    // Bridge 500,000 MBC back to BNB, freeing exactly that much headroom.
    await bridgeToBnb(fx, fx.user, fx.user.address, M(500_000));
    expect(await fx.oft.totalSupply()).to.equal(BRIDGE_CAP - M(500_000));

    // Now bridging the freed 500,000 MBC back to Ethereum succeeds again.
    await bridgeToEthereum(fx, fx.user, fx.user.address, M(500_000));
    expect(await fx.oft.totalSupply()).to.equal(BRIDGE_CAP);

    await checkSupplyInvariant(fx);
  });
});
