// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/Context.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TestToken is Context, ERC20, Ownable {
    address thisowner;

    constructor(
        string memory name, //Name of the token
        string memory symbol, //Token symbol
        uint256 initailSupply
    ) ERC20(name, symbol) {
        thisowner = _msgSender();
        _mint(_msgSender(), initailSupply);
    }

    // Get Address of the Owner
    function getAddress() public view returns (address) {
        return thisowner;
    }

    // Mint Extra token
    function mint(uint256 amount) public onlyOwner {
        _mint(_msgSender(), amount);
    }
}
