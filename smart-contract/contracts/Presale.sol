//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

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

    bool private allowed = false;
    uint256 private endate = block.timestamp + 7 days;
    uint256 private minPurchase = 0.1 ether; //0.1 Eth/ETH
    uint256 private purchaseCap = 100 ether; // 100 ETH/Eth

    uint256 totalContributors = 0;
    uint256 private weiRaised = 0;
    mapping(address => uint256) contributors;

    event TokensPurchased(
        address indexed purchaser,
        uint256 value,
        uint256 amount
    );

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

    function getAmountRaised() external view returns (uint256) {
        return weiRaised;
    }

    function getUserContribution() external view returns (uint256) {
        return contributors[msg.sender];
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

    // Get Minimum and Maximum purchase
    function getMinMax() external view returns (uint256[] memory) {
        uint256[] memory minmax = new uint256[](2);
        minmax[0] = minPurchase;
        minmax[1] = purchaseCap;
        return minmax;
    }

    // Set Minimum and Maximum purchase
    function setMinMax(uint256 _minPurchase, uint256 _purchaseCap)
        external
        onlyOwner
        notZero(_minPurchase)
        notZero(_purchaseCap)
    {
        if (minPurchase != _minPurchase) {
            minPurchase = _minPurchase;
        }

        if (purchaseCap != _purchaseCap) {
            purchaseCap = _purchaseCap;
        }
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

    // Withdraw tokens from the presale contract
    function getUnsoldTokens(address _wallet) external onlyOwner {
        require(
            block.timestamp < endate,
            "You cannot get tokens until the presale is closed."
        );

        IERC20(Token).transfer(_wallet, IERC20(Token).balanceOf(address(this)));
    }

    // Buy token
    /**
     * @dev recieves Eth and requires some token to be transfered to the msg.sender
     */
    function buyToken() public payable {
        uint256 weiAmount = msg.value;
        // Make sure presale is currently not paused
        require(allowed == true, "Presale: Presale is paused");
        // Must send more that minEth
        require(weiAmount >= minPurchase, "Presale: Buy quantity is low");
        // Sender doesn't exceed maxCap
        require(
            contributors[msg.sender].add(weiAmount) < purchaseCap,
            "Presale: Attained max cap"
        );
        // Get token value
        uint256 tokenQuantity = getTokensPerEth(weiAmount);

        // // Recieve the Ethereum into our wallet
        payable(wallet).transfer(msg.value);

        // Pay the sender in our token
        require(
            Token.transfer(msg.sender, tokenQuantity),
            "Insufficient balance of presale contract!"
        );

        totalReceived = totalReceived.add(msg.value);
        contributors[msg.sender] = contributors[msg.sender].add(msg.value);
        totalContributors.add(1);
        weiRaised.add(weiAmount);
        emit TokensPurchased(_msgSender(), weiAmount, tokenQuantity);
    }

    function getTokensPerEth(uint256 weiVal) public view returns (uint256) {
        return weiVal.mul(rate);
    }
}
