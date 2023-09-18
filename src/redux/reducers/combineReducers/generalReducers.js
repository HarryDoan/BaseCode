import actions from '@redux/actions';
import {reducerDefault, reducerLoadMore} from '@redux/common/reducers';

export const getBannerHome = (...props) => {
  return reducerDefault(...props, actions.GET_BANNER_HOME);
};
