import {all, fork} from 'redux-saga/effects';

import {watchGeneralSagas} from './watchSagas/generalSagas';
import {watchTokenSagas} from './watchSagas/tokenSagas';
import {watchUserSagas} from './watchSagas/userSagas';
export default function* rootSaga() {
  yield all([
    fork(watchGeneralSagas),
    fork(watchTokenSagas),
    fork(watchUserSagas),
  ]);
}
