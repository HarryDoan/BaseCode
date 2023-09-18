import actions, {_onFail, _onSuccess} from '@redux/actions';
import {delay, put, select, takeLatest} from '@redux-saga/core/effects';

import {URL_API} from '../common';
import api from '@utils/api';
import {handleFormData} from '@utils';
import queryString from 'query-string';

function* signinUser(action) {
  const body = yield handleFormData(action.body);
  try {
    const res = yield api.postFormData(URL_API.user.signinUser, body);
    yield put({
      type: actions.SAVE_USER_INFO,
      userToken: res.token,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res,
    });
    action.onSuccess?.(res);
  } catch (error) {
    action.onFail?.(error?.data?.message);
    yield put({type: _onFail(action.type)});
  }
}
function* getUser(action) {
  const userToken = yield select(state => state.user.userToken);
  try {
    const res = yield api.get(URL_API.user.getUser, {
      user: userToken,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res.data,
    });
    action.onSuccess?.(res?.data);
  } catch (error) {
    action.onFail?.(error.data.message);
    yield put({type: _onFail(action.type)});
  }
}

function* signUpUser(action) {
  const body = yield handleFormData(action.body);

  try {
    const res = yield api.postFormData(URL_API.user.signupUser, body);
    yield put({
      type: _onSuccess(action.type),
      data: res,
    });
    action.onSuccess?.(res);
  } catch (error) {
    action.onFail?.(error?.data?.message);
    yield put({type: _onFail(action.type)});
  }
}

function* updatePass(action) {
  const body = yield handleFormData(action.body);
  const userToken = yield select(state => state.user.userToken);

  try {
    const res = yield api.postFormData(URL_API.user.updatePass, body, {
      user: userToken,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res,
    });
    action.onSuccess?.(res);
  } catch (error) {
    action.onFail?.(error?.data?.message);
    yield put({type: _onFail(action.type)});
  }
}

function* updateUser(action) {
  const body = yield handleFormData(action.body);
  const userToken = yield select(state => state.user.userToken);

  try {
    const res = yield api.postFormData(URL_API.user.updateUser, body, {
      user: userToken,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res,
    });
    action.onSuccess?.(res);
  } catch (error) {
    action.onFail?.(error?.data?.message);
    yield put({type: _onFail(action.type)});
  }
}

function* forgetPass(action) {
  try {
    const res = yield api.get(URL_API.user.forgetPass, {
      ...(action.params || {}),
    });
    yield put({
      type: _onSuccess(action.type),
      data: res,
    });
    action.onSuccess?.(res);
  } catch (error) {
    action.onFail?.(error?.data?.message);
    yield put({type: _onFail(action.type)});
  }
}

function* logOutUser(action) {
  const userToken = yield select(state => state.user.userToken);
  try {
    const res = yield api.get(URL_API.user.logoutUser, {
      user: userToken,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res,
    });
    yield put({type: actions.UNMOUNT_USER});
    action.onSuccess?.(res);
  } catch (error) {
    action.onFail?.(error?.data?.message);
    yield put({type: _onFail(action.type)});
  }
}

function* deleteAccount(action) {
  try {
    //TODO: replace with real API
    yield delay(500);
    const userToken = yield select(state => state.user.userToken);

    const res = yield api.post(URL_API.user.deleteAccount, null, {
      user: userToken,
    });
    yield put({
      type: _onSuccess(action.type),
      data: res,
    });
    yield put({type: actions.UNMOUNT_USER});
    action.onSuccess?.(res);
  } catch (error) {
    action.onFail?.(error.data.message);
    yield put({type: _onFail(actions.type)});
  }
}

export function* watchUserSagas() {
  yield takeLatest(actions.SIGN_IN_USER, signinUser);
  yield takeLatest(actions.GET_USER, getUser);
  yield takeLatest(actions.SIGN_UP_USER, signUpUser);
  yield takeLatest(actions.LOG_OUT, logOutUser);
  yield takeLatest(actions.FORGET_PASS, forgetPass);
  yield takeLatest(actions.UPDATE_PASS, updatePass);
  yield takeLatest(actions.UPDATE_USER, updateUser);
  yield takeLatest(actions.UPDATE_AVATAR, updateUser);
  yield takeLatest(actions.DELETE_ACCOUNT, deleteAccount);
}
