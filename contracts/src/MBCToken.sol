// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MBCToken is ERC20, ERC20Burnable, Ownable {
    uint256 public constant TOTAL_SUPPLY = 100_000_000 * 10 ** 18;

    uint256 public maxTxAmount = TOTAL_SUPPLY / 100;       // 1% = 1,000,000 MBC
    uint256 public maxWalletAmount = TOTAL_SUPPLY * 3 / 100; // 3% = 3,000,000 MBC
    uint256 public txCooldown = 30;                        // 30 seconds

    bool public paused;
    bool public limitsEnabled = true;

    mapping(address => bool) public isExempt;
    mapping(address => uint256) public lastTxTime;

    event Paused(address account);
    event Unpaused(address account);
    event LimitsUpdated(uint256 maxTx, uint256 maxWallet, uint256 cooldown);
    event LimitsRemoved();

    constructor(address initialOwner)
        ERC20("MedByClick Token", "MBC")
        Ownable(initialOwner)
    {
        isExempt[initialOwner] = true;
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

    function setExempt(address account, bool exempt) external onlyOwner {
        isExempt[account] = exempt;
    }

    function setLimits(uint256 _maxTx, uint256 _maxWallet, uint256 _cooldown) external onlyOwner {
        require(_maxTx >= TOTAL_SUPPLY / 1000, "MBC: maxTx too low");
        require(_maxWallet >= TOTAL_SUPPLY / 100, "MBC: maxWallet too low");
        maxTxAmount = _maxTx;
        maxWalletAmount = _maxWallet;
        txCooldown = _cooldown;
        emit LimitsUpdated(_maxTx, _maxWallet, _cooldown);
    }

    function removeLimits() external onlyOwner {
        limitsEnabled = false;
        emit LimitsRemoved();
    }

    function _update(address from, address to, uint256 value) internal override {
        require(!paused || from == owner() || to == owner(), "MBC: transfers paused");

        if (limitsEnabled && from != address(0) && to != address(0)) {
            bool senderExempt = isExempt[from];
            bool recipientExempt = isExempt[to];

            if (!senderExempt && !recipientExempt) {
                require(value <= maxTxAmount, "MBC: exceeds max tx");
                require(balanceOf(to) + value <= maxWalletAmount, "MBC: exceeds max wallet");
                require(block.timestamp >= lastTxTime[from] + txCooldown, "MBC: cooldown active");
                lastTxTime[from] = block.timestamp;
            }
        }

        super._update(from, to, value);
    }
}
