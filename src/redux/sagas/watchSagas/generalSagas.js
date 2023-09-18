import {delay, put, select, takeLatest} from '@redux-saga/core/effects';
import actions, {_onFail, _onSuccess} from '@redux/actions';
import api from '@utils/api';
import {URL_API} from '../common';

function* getBannerHome(action) {
  try {
    const res = yield api.get(URL_API.general.getBannerByID, {
      banner_id: 'banner-main-app',
    });
    yield put({type: _onSuccess(action.type), data: res.data});
    action.onSuccess?.(res.data);
  } catch (error) {
    action.onFail?.(error.data);
    yield put({type: _onFail(action.type)});
  }
}

export function* watchGeneralSagas() {
  yield takeLatest(actions.GET_BANNER_HOME, getBannerHome);
}
