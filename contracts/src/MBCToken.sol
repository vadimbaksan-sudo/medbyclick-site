// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MBCToken
 * @dev MedByClick utility token — ERC-20 on Ethereum.
 *
 * Total supply: 100,000,000 MBC (minted at deploy to owner).
 * Burnable: tokens can be burned on redemption.
 * Owner can pause/unpause transfers if needed.
 */
contract MBCToken is ERC20, ERC20Burnable, Ownable {
    uint256 public constant TOTAL_SUPPLY = 100_000_000 * 10 ** 18;

    bool public paused;

    event Paused(address account);
    event Unpaused(address account);

    constructor(address initialOwner)
        ERC20("MedByClick Token", "MBC")
        Ownable(initialOwner)
    {
        _mint(initialOwner, TOTAL_SUPPLY);
    }

    function pause() external onlyOwner {
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() external onlyOwner {
        paused = false;
        emit Unpaused(msg.sender);
    }

    function _update(address from, address to, uint256 value) internal override {
        require(!paused || from == owner() || to == owner(), "MBC: transfers paused");
        super._update(from, to, value);
    }
}
