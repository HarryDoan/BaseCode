import {put, select} from '@redux-saga/core/effects';
import {_onFail, _onSuccess} from '@redux/actions';
import api from '@utils/api';

export const ACCOUNT_IMS = {
  username: 'ims',
  password: 'Y9JE7QSTkDPtlLOOcCFVbCyhg5u7axYD',
};

export const URL_API = {
  //User
  getToken: {
    getToken: 'getToken',
  },
  user: {
    signinUser: 'signinUser',
    getUser: 'getUser',
    signupUser: 'signupUser',
    forgetPass: 'fogetPassword',
    updatePass: 'updatePassword',
    updateUser: 'updateUser',
    logoutUser: 'logoutUser',
    deleteAccount: 'deleteAccount',
  },
  notification: {
    getNotification: 'getNotification',
    updateNotification: 'updateNotification',
  },
  general: {
    getBannerByID: 'getBannerByID',
  },
  constants: {
    getConfigApp: 'getConfigApp',
  },
  supportCenter: {
    sendQuestion: 'sendContact',
  },
  event: {
    getEvent: 'getEvent',
    checkinEvent: 'checkinEvent',
  },
  utility: {
    getPageByID: 'getPageByID',
    getGroupPage: 'getGroupPage',
  },
  member: {
    getHistoryInvitation: 'getLogSendInvitation',
    getInvitation: 'getInvitationTemplate',
    checkPhoneByInvitation: 'checkPhoneByInvitation',
    sendInvitation: 'sendInvitation',
    getEvent: 'getEvent',
  },
};
