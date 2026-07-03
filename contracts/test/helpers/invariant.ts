import { expect } from "chai";
import { TOTAL_SUPPLY } from "./fixtures";
import type { DeployedFixture } from "./fixtures";

/**
 * Asserts the supply invariant described in
 * docs/reports/web3/2026-07-02-dual-chain-token-architecture-decision.md §1.3
 * and required by §4.4 ("for any sequence of lock/mint/burn/unlock
 * operations, `BNB circulating + BNB locked + Ethereum outstanding` must
 * equal 100,000,000 at every step").
 *
 * IMPORTANT — a note on how this is implemented, for anyone diffing this
 * against the report's literal wording:
 *
 * Contract C (MBCOFTAdapter) implements LayerZero's standard OFTAdapter
 * pattern, which — per the architecture decision's own §1.2 — LOCKS tokens
 * on BNB Chain rather than burning them ("does not burn it... so lock, not
 * burn, is correct here"). Because Contract A never burns as part of
 * bridging, `totalSupply(ContractA)` is a hard on-chain constant equal to
 * TOTAL_SUPPLY at every step (checked below as `bnbTotal`). That makes
 * `bnbCirculating + bnbLocked` trivially equal to TOTAL_SUPPLY on its own,
 * with or without any bridging activity — so literally ALSO adding
 * `ethOutstanding` on top (as the report's sentence reads word-for-word)
 * would double-count the very tokens that are locked specifically *because*
 * they back that Ethereum mint, and the three-term sum would drift upward by
 * the bridged amount every time someone bridges to Ethereum (verified by
 * hand: sum = 100,000,000 + ethOutstanding, not a constant).
 *
 * The economically-meaningful, non-double-counting rendering of the same
 * invariant — "total system supply across both chains never exceeds
 * 100,000,000, and every minted-on-Ethereum token is backed 1:1 by a locked
 * BNB Chain token" — is the two checks this function actually performs:
 *
 *   1. bnbCirculating + ethOutstanding == 100,000,000   (no phantom supply)
 *   2. bnbLocked == ethOutstanding                       (backing == outstanding)
 *
 * (1) and (2) together imply the report's intended invariant; this
 * discrepancy in the literal formula is flagged in the PR description for
 * Web3 & Token Strategy to review — it is a wording issue in the spec, not a
 * contract bug, and nothing here changes tokenomics parameters or scope.
 */
export async function checkSupplyInvariant(fx: DeployedFixture) {
  const bnbTotal = await fx.token.totalSupply();
  const bnbLocked = await fx.token.balanceOf(await fx.adapter.getAddress());
  const bnbCirculating = bnbTotal - bnbLocked;
  const ethOutstanding = await fx.oft.totalSupply();

  expect(bnbTotal, "Contract A total supply must never change after genesis mint").to.equal(TOTAL_SUPPLY);
  expect(bnbLocked, "locked-on-BNB must exactly back minted-on-Ethereum").to.equal(ethOutstanding);
  expect(bnbCirculating + ethOutstanding, "total system supply must equal 100,000,000 MBC").to.equal(TOTAL_SUPPLY);
}
