// import {put, select, takeLatest} from '@redux-saga/core/effects';
// import actions, {_onFail, _onSuccess} from '@redux/actions';
// import {handleFormData} from '@utils';
// import api from '@utils/api';

// import {URL_API} from '../common';

// function* getConfigApp(action) {
//   try {
//     const res = yield api.get(URL_API.constants.getConfigApp);
//     yield put({
//       type: _onSuccess(action.type),
//       data: res.data,
//     });
//     action.onSuccess?.(res?.data);
//   } catch (error) {
//     action.onFail?.(error.data.message);
//     yield put({type: _onFail(action.type)});
//   }
// }

// export function* watchConstantsSagas() {
//   yield takeLatest(actions.GET_CONFIG_APP, getConfigApp);
// }
