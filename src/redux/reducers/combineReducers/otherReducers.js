import {APP_LANGUAGE} from '@constants';
import actions from '@redux/actions';

const initialState = {
  isFirstOpenApp: true,
  lang: APP_LANGUAGE.vietnamese,
  pass: null,
  account: null,
  location: null,
};

export const other = (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_FIRST_OPEN_APP:
      return {...state, isFirstOpenApp: false};
    case actions.SAVE_LANGUAGE:
      return {...state, lang: action.data};
    case actions.LOCATION:
      return {...state, location: action.location};
    case actions.SAVE_ACCOUNT:
      return {
        ...state,
        pass: action.pass,
        account: action.account,
      };
    default:
      return state;
  }
};
