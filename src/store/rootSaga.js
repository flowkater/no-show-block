import { all, fork } from 'redux-saga/effects';
import { watchBlacklist } from "./modules/blacklist";

export default function* rootSaga() {
  yield all([
    fork(watchBlacklist)
  ]);
}
