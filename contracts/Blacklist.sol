pragma solidity ^0.4.18;

contract Blacklist {
    struct Reporter {
        address reporterAddress;
        string latitude;
        string longitude;
        string platform;
    }
    
    struct Info {
        bytes32 phoneNum;
        uint8 registered;
        uint totalCount;
        Reporter[] reporters;
    }

    struct Member {
        address memberAddress;
        bytes32 phoneNumber;
        uint tokensBought;
    }

    mapping (address => Member) public memberInfo;

    mapping (bytes32 => Info) private blacklistInfo;
    bytes32[] public phoneNumbers;

    uint public totalTokens;
    uint public balanceTokens;
    uint public tokenPrice;

    function Blacklist(uint tokens, uint pricePerToken) public {
        totalTokens = tokens;
        balanceTokens = tokens;
        tokenPrice = pricePerToken;
    }

    function addList(bytes32 number, string latitude, string longitude, string platform) public {
        if(blacklistInfo[number].registered == 0) {
            phoneNumbers.push(number);
        }
      
        blacklistInfo[number].phoneNum = number;
        blacklistInfo[number].totalCount += 1;
        blacklistInfo[number].registered = 1;
        Reporter memory reporter = Reporter(msg.sender, latitude, longitude, platform);
        blacklistInfo[number].reporters.push(reporter);
    }

    function getCount(bytes32 number) view public returns (uint) {
        return blacklistInfo[number].totalCount;
    }

    function getLength(bytes32 number) view public returns (uint) {
        return blacklistInfo[number].reporters.length;
    }

    function getInfo(bytes32 number, uint index) view public returns (address reporterAddress, string latitude, string longitude, string platform) {
        return (blacklistInfo[number].reporters[index].reporterAddress, 
        blacklistInfo[number].reporters[index].latitude, 
        blacklistInfo[number].reporters[index].longitude, 
        blacklistInfo[number].reporters[index].platform);
    }

    function buy() payable public returns (uint) {
        uint tokensToBuy = msg.value / tokenPrice;
        require(tokensToBuy <= balanceTokens);
        memberInfo[msg.sender].memberAddress = msg.sender;
        memberInfo[msg.sender].tokensBought += tokensToBuy;
        balanceTokens -= tokensToBuy;
        return tokensToBuy;
    }

    function getSenderTokensBought() view public returns (uint) {
        return memberInfo[msg.sender].tokensBought;
    }

    function tokenSold() view public returns (uint) {
        return totalTokens - balanceTokens;
    }

    function transferTo(address account) public {
        address myAddress = this;
        account.transfer(myAddress.balance);
    }

    function removeCount(bytes32 number, uint tokens) public {
        // if(blacklistInfo[number].registered != 0)
        require ((tokens <= memberInfo[msg.sender].tokensBought) && (tokens <= getCount(number)));
        memberInfo[msg.sender].tokensBought -= tokens;
        balanceTokens += tokens; 
        blacklistInfo[number].totalCount -= tokens;   
    }
}