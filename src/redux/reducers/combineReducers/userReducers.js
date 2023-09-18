import {reducerDefault, reducerLoadMore} from '@redux/common/reducers';

import actions from '@redux/actions';

const initialState = {
  data: null,
  userToken: null,
  avatar: null,
  isLoading: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case actions.UNMOUNT_USER:
      return initialState;
    case actions.SAVE_USER_INFO:
      return {
        ...state,
        userToken: action.userToken,
      };

    default:
      return state;
  }
};
export const getUser = (...props) => {
  return reducerDefault(...props, actions.GET_USER);
};
export const signInUser = (...props) => {
  return reducerDefault(...props, actions.SIGN_IN_USER);
};

export const signUpUser = (...props) => {
  return reducerDefault(...props, actions.SIGN_UP_USER);
};

export const logOutUser = (...props) => {
  return reducerDefault(...props, actions.LOG_OUT);
};

export const forgetPass = (...props) => {
  return reducerDefault(...props, actions.FORGET_PASS);
};

export const updateUser = (...props) => {
  return reducerDefault(...props, actions.UPDATE_USER);
};

export const updatePass = (...props) => {
  return reducerDefault(...props, actions.UPDATE_PASS);
};

export const deleteAccount = (...props) => {
  return reducerDefault(...props, actions.DELETE_ACCOUNT);
};
