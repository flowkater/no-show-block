import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { actionCreators as blacklistActions } from "../store/modules/blacklist";
import { TokenMarket } from "../components";

import BlacklistContract from '../../build/contracts/Blacklist.json'
import getWeb3 from "../utils/getWeb3";
const contract = require('truffle-contract')
const blackList = contract(BlacklistContract)

class TokenMarketContainer extends Component {
  componentWillMount() {
    const { BlackListActions } = this.props;

    getWeb3.then((results) => {
      console.log(results);
      const { web3 } = results;
      blackList.setProvider(web3.currentProvider);
  
      const account = web3.eth.accounts[0];
      console.log(account);
  
      BlackListActions.initializeWeb3({account: account, web3: web3});
      this.populateTokenData();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  populateTokenData = () => {
    const { web3, BlackListActions } = this.props;

    blackList.deployed().then((contractInstance) => {
      contractInstance.totalTokens.call().then((v) => {
        BlackListActions.populateTokens({totalTokens: v.toString()});
      });
      contractInstance.tokenSold.call().then((v) => {
        BlackListActions.populateTokens({tokensSold: v.toString()});
      });
      contractInstance.tokenPrice.call().then((v) => {
        const tokenPrice = parseFloat(web3.fromWei(v.toString()));
        BlackListActions.populateTokens({tokenPrice: tokenPrice});
      });
      web3.eth.getBalance(contractInstance.address, (error, result) => {
        BlackListActions.populateTokens({contractBalance: web3.fromWei(result.toString())});
      });
    });
  }

  buyTokens = (value) => {
    const { tokenPrice, account, web3, BlackListActions } = this.props;

    let tokensToBuy = value;
    let price = tokensToBuy * tokenPrice;

    blackList.deployed().then((contractInstance) => {
      contractInstance.buy({value: web3.toWei(price, 'ether'), from: account}).then((v) => {
        web3.eth.getBalance(contractInstance.address, (error, result) => {
          BlackListActions.populateTokens({contractBalance: web3.fromWei(result.toString())});
        });
      });
    });
    this.populateTokenData();
  }

  render() {
    const { buyTokens } = this;
    const { account, contractBalance, totalTokens, tokensSold, tokenPrice } = this.props;

    return (
      <TokenMarket 
        account={account}
        totalTokens={totalTokens}
        tokensSold={tokensSold}
        tokenPrice={tokenPrice}
        contractBalance={contractBalance}
        buyTokens={buyTokens}
      />
    );
  }
}

export default withRouter(connect(
  (state) => ({
    account: state.blacklist.get('account'),
    web3: state.blacklist.get('web3'),
    totalTokens: state.blacklist.get('totalTokens'),
    tokensSold: state.blacklist.get('tokensSold'),
    tokenPrice: state.blacklist.get('tokenPrice'),
    contractBalance: state.blacklist.get('contractBalance'),
  }),
  (dispatch) => ({
    BlackListActions: bindActionCreators(blacklistActions, dispatch)
  })
)(TokenMarketContainer));