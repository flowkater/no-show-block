var Blacklist = artifacts.require("./Blacklist.sol");

module.exports = function(deployer) {
  deployer.deploy(Blacklist, 210000, web3.toWei('0.1', 'ether'));
};
