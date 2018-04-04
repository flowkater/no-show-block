import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as blacklistActions } from "../store/modules/blacklist";
import { BlackList } from "../components";

import BlacklistContract from '../../build/contracts/Blacklist.json'
import getWeb3 from "../utils/getWeb3";
const contract = require('truffle-contract')
const blackList = contract(BlacklistContract)

class BlackListContainer extends Component {

  componentWillMount() {
    const { BlackListActions } = this.props;

    getWeb3.then((results) => {
      console.log(results);
      const { web3 } = results;
      blackList.setProvider(web3.currentProvider);
  
      const account = web3.eth.accounts[0];
      console.log(account);
  
      BlackListActions.initializeWeb3({account: account, web3: web3});
      this.getMyToken();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  getMyToken = () => {
    const { BlackListActions } = this.props;

    blackList.deployed().then((contractInstance) => {
      contractInstance.getSenderTokensBought.call().then((v) => {
        BlackListActions.setMyToken({myToken: v.toString()});
      });
    });
  }

  onAddSubmit = (formValues) => {
    console.log("onAddSubmit");
    console.log(formValues);
    const { account } = this.props;
    const { phoneNumber, platform, latitude, longitude } = formValues;
    

    let blackListInstance;

    blackList.deployed().then((instance) => {
      blackListInstance = instance;

      return blackListInstance.addList(phoneNumber, latitude, longitude, platform, {gas: 2100000, from: account})
      .then((result) => {
        console.log(result);
        
        return blackListInstance.getCount.call(phoneNumber);
      }).then((result) => {
        console.log(result.c[0]);
      })
    })
  }

  onSearchSubmit = (formValues) => {
    const { BlackListActions } = this.props;
    const { searchPhoneNumber } = formValues;

    let blackListInstance;

    blackList.deployed().then((instance) => {
      blackListInstance = instance
      return blackListInstance.getCount.call(searchPhoneNumber)
    }).then((result) => {
      BlackListActions.setCount({phoneNumber: searchPhoneNumber, count: result.c[0]});

      return blackListInstance.getLength.call(searchPhoneNumber)
    }).then((result) => {
      const length = result.c[0];

      [...Array(length)].forEach((_, i) => {
        console.log(i);

        blackListInstance.getInfo.call(searchPhoneNumber, i).then((result) => {
          BlackListActions.setReporter({reporter: {reporterAddress: result[0], latitude:result[1], longitude: result[2], platform: result[3]}})
        })
      });
    })
  }

  onReduceCount = (formValues) => {
    const { search, account, BlackListActions } = this.props;
    const { tradeToken } = formValues;

    blackList.deployed().then((contractInstance) => {
      contractInstance.removeCount(search.phoneNumber, tradeToken, {gas: 2100000, from: account}).then((v) => {
        console.log(v);
        this.getMyToken();
        contractInstance.getCount.call(search.phoneNumber).then((result) => {
          BlackListActions.setJustCount({phoneNumber: search.phoneNumber, count: result.c[0]});
        });
      });
    });
  }

  render() {
    const { onAddSubmit, onSearchSubmit, onReduceCount } = this;
    const { account, search, myToken } = this.props;

    return (
      <BlackList 
        account={account}
        search={search}
        myToken={myToken}
        onAddSubmit={onAddSubmit}
        onSearchSubmit={onSearchSubmit}
        onReduceCount={onReduceCount}
      />
    );
  }
}

export default connect(
  (state) => ({
    account: state.blacklist.get('account'),
    search: state.blacklist.get('search').toJS(),
    myToken: state.blacklist.get('myToken')
  }),
  (dispatch) => ({
    BlackListActions: bindActionCreators(blacklistActions, dispatch)
  })
)(BlackListContainer);