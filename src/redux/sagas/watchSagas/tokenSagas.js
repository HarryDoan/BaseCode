import {put, takeLatest} from '@redux-saga/core/effects';
import actions, {_onFail, _onSuccess} from '@redux/actions';
import api from '@utils/api';
import queryString from 'query-string';
import {ACCOUNT_IMS, URL_API} from '../common';

function* getToken(action) {
  try {
    const body = queryString.stringify(ACCOUNT_IMS);
    const res = yield api.post(URL_API.getToken.getToken, body);
    yield put({type: _onSuccess(action.type), data: res.token});
    action.onSuccess?.();
  } catch (error) {
    yield put({type: _onFail(action.type)});
  }
}

export function* watchTokenSagas() {
  yield takeLatest(actions.GET_TOKEN, getToken);
}
