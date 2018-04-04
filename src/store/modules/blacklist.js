import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const SET_COUNT = "blacklist/setCount"
const SET_JUST_COUNT = "blacklist/setJustCount"
const SET_REPORTER = "blacklist/setReporter";
const SET_MY_TOKEN = "blacklist/setMyToken";
const INITIALIZE_WEB3 = "blacklist/initializeWeb3";
const POPULATE_TOKENS = "blacklist/populateTokens";

export const actionCreators = {
  setCount: createAction(SET_COUNT),
  initializeWeb3: createAction(INITIALIZE_WEB3),
  setReporter: createAction(SET_REPORTER),
  populateTokens: createAction(POPULATE_TOKENS),
  setMyToken: createAction(SET_MY_TOKEN),
  setJustCount: createAction(SET_JUST_COUNT)
}

const initialState = Map({
  account: '',
  web3: null,
  search: Map({
    phoneNumber: "",
    count: 0,
    reporters: List([])
  }),
  totalTokens: -1,
  tokensSold: -1,
  tokenPrice: -1,
  contractBalance: -1,
  myToken: -1
});

export default handleActions(
  {
    [INITIALIZE_WEB3]: (state, action) => {
      const { account, web3 } = action.payload

      return state.set('account', account)
                  .set('web3', web3);
    },  
    [SET_COUNT]: (state, action) => {
      const { phoneNumber, count } = action.payload
      return state.setIn(['search', 'phoneNumber'], phoneNumber)
                  .setIn(['search', 'count'], count)
                  .setIn(['search', 'reporters'], List([]));
    },
    [SET_JUST_COUNT]: (state, action) => {
      const { phoneNumber, count } = action.payload
      return state.setIn(['search', 'phoneNumber'], phoneNumber)
                  .setIn(['search', 'count'], count);
    },
    [SET_REPORTER]: (state, action) => {
      const { reporter } = action.payload

      return state.updateIn(['search', 'reporters'], reporters => reporters.push(Map(reporter)));
    },
    [POPULATE_TOKENS]: (state, action) => {
      const {totalTokens,
             tokensSold,
             tokenPrice,
             contractBalance } = action.payload;

      if (totalTokens) {
        return state.set('totalTokens', totalTokens);
      }

      if (tokensSold) {
        return state.set('tokensSold', tokensSold);
      }

      if (tokenPrice) {
        return state.set('tokenPrice', tokenPrice);
      }

      if (contractBalance) {
        return state.set('contractBalance', contractBalance);
      }

      return state;
    },
    [SET_MY_TOKEN]: (state, action) => {
      const { myToken } = action.payload;

      return state.set('myToken', myToken);
    }
  }, initialState
);

export function* watchBlacklist() {

}