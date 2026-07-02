// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

/// @dev TEST-ONLY stand-in for the production 3-of-5 Gnosis Safe multisig
///      address. Never deployed to any real network. It exists only so
///      MBCToken's constructor guard `safe.code.length > 0` ("must be a
///      contract, not an EOA") has a real contract account to target in
///      tests. Test code impersonates this address via Hardhat's
///      `impersonateAccount` to exercise owner-only functions exactly as if
///      a real multisig had submitted the transaction — no Solidity logic is
///      needed here beyond having nonempty bytecode.
contract TestMultisigStub {}
