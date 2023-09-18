import actions from '@redux/actions';
import {reducerDefault} from '@redux/common/reducers';

export const appToken = (...props) => {
  return reducerDefault(...props, actions.GET_TOKEN);
};
