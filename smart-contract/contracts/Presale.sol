//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/*
togglePause - Pause the presale activities

Fund - Fund account
Withdraw - Withdraw from the account
buy - Buy tokens from the account
setEndTime - Modify the endate of the presale period
setTokenRate - Modity the rate at which the token is sold per Eth | Eth
*/

contract Presale is Ownable {
    using SafeMath for uint256;
    uint256 rate;
    IERC20Metadata Token;
    address wallet;

    uint256 totalReceived; // Total Eth/ETH Received

    bool allowed;
    uint256 endate = block.timestamp + 7 days;
    uint256 minPurchase = (10**9); //0.5 Eth/ETH
    uint256 purchaseCap = (100 * 10**18); // 100 ETH/Eth

    uint256 totalContributors = 0;
    mapping(address => uint256) contributors;

    constructor(
        uint256 _rate, //Qty of coin to swap for 1 wei or 1 Eth during the ICO
        address payable _wallet, //this Contract Address for investors to send Ether or Eth in other to recive ERC token in Exchange
        IERC20Metadata _token // Pointer to the ERC20 token that would be sent to investors
    ) notZero(_rate) {
        require(_wallet != address(0), "Presale: wallet is the zero address");
        require(
            address(_token) != address(0),
            "Presale: token is the zero address"
        );

        rate = _rate;
        wallet = _wallet;
        Token = _token;
        allowed = true;
    }

    modifier notZero(uint256 _value) {
        require(_value > 0, "Presale: value is 0");
        _;
    }

    function getOwner() external view returns (address) {
        return owner();
    }

    function getTotalReceived() external view returns (uint256) {
        return totalReceived;
    }

    function getTotalContributors() external view returns (uint256) {
        return totalContributors;
    }

    function getEndate() external view returns (uint256) {
        return endate;
    }

    function setEndate(uint256 _enddate) external onlyOwner notZero(_enddate) {
        endate = _enddate;
    }

    // Set token rate
    function setTokenRate(uint256 _rate) external onlyOwner notZero(_rate) {
        rate = _rate;
    }

    // Get token rate
    function getTokenRate() external view returns (uint256) {
        return rate;
    }

    // Get the status of the Presale
    function getStatus() external view returns (bool) {
        return allowed;
    }

    // Pause or Open Presale
    function togglePause() external onlyOwner returns (bool) {
        allowed = !allowed;
        return allowed;
    }

    //Get balance of tokens remaing in this presale Contract
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Deposit some tokens into this presale contract
    receive() external payable {
        buyToken();
    }

    // Withdraw money from the presale contract
    function withdraw(address _wallet, uint256 _amount)
        external
        payable
        onlyOwner
    {
        uint256 balance = address(this).balance;
        if (_wallet == address(0)) _wallet = owner();
        if (_amount <= 0) _amount = balance;

        balance = balance - _amount;
        payable(address(_wallet)).transfer(_amount);
    }

    // Buy token
    /**
     * @dev recieves Eth and requires some token to be transfered to the msg.sender
     */
    function buyToken() public payable {
        // Make sure presale is currently not paused
        require(allowed == false, "Presale: Presale is paused");
        // Must send more that minEth
        require(msg.value >= minPurchase, "Presale: Buy quantity is low");
        // Sender doesn't exceed maxCap
        require(
            contributors[msg.sender].add(msg.value) < purchaseCap,
            "Presale: Attained max cap"
        );
        // Get token value
        uint256 tokenQuantity = getTokensPerEth(msg.value);

        // Recieve the Ethereum into our wallet
        payable(wallet).transfer(msg.value);

        // Pay the sender in our token
        require(
            Token.transfer(msg.sender, tokenQuantity),
            "Insufficient balance of presale contract!"
        );

        totalReceived = totalReceived.add(msg.value);
        contributors[msg.sender] = contributors[msg.sender].add(msg.value);
        totalContributors.add(1);
    }

    function getTokensPerEth(uint256 weiVal) public view returns (uint256) {
        return weiVal.mul(rate).div(10**(uint256(18).sub(Token.decimals())));
    }
}