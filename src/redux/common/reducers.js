import {_onFail, _onSuccess, _onUnmount} from '@redux/actions';
import {stateDefault, stateDevice, stateLoadMore} from './initialStates';

export const reducerDefault = (state = stateDefault, action, Action) => {
  switch (action.type) {
    case Action:
      return {...state, isLoading: true};
    case _onSuccess(Action):
      return {data: action.data, isLoading: false, exData: action.exData};
    case _onFail(Action):
      return {...state, isLoading: false};
    case _onUnmount(Action):
      return {...stateDefault};
    default:
      return state;
  }
};

export const reducerDevice = (state = stateDevice, action, Action) => {
  switch (action.type) {
    case Action: {
      return {
        ...state,
        device_token: action.device_token,
        device_name: action.device_name,
      };
    }
    default:
      return state;
  }
};

export const reducerLoadMore = (state = stateLoadMore, action, Action) => {
  switch (action.type) {
    case Action:
      return {...state, isLoading: true};
    case _onSuccess(Action):
      const page = action.page;
      return {
        data: page > 1 ? [...state.data, ...action.data] : action.data,
        totalPage: action.totalPage,
        page,
        numshow: action.numshow,
        isLoading: false,
        total: action.total,
        totalUnread: action?.totalUnread,
      };
    case _onFail(Action):
      return {...state, isLoading: false};
    case _onUnmount(Action):
      return stateLoadMore;
    default:
      return state;
  }
};

export const reducerLoadMoreObject = (
  state = stateLoadMore,
  action,
  Action,
) => {
  switch (action.type) {
    case Action:
      return {...state, isLoading: true};
    case _onSuccess(Action):
      const page = action.page;
      let merged = [...(state.data || [])];

      for (const [key, value] of Object.entries(action.data)) {
        const foundIndex = merged.findIndex(m => m.title === key);
        if (foundIndex > -1) {
          merged[foundIndex].data = [...merged[foundIndex].data, ...value];
        } else {
          merged.push({title: key, data: value});
        }
      }
      return {
        data:
          page > 1
            ? merged
            : Object.entries(action.data).map(([key, value]) => {
                return {title: key, data: value};
              }),
        totalPage: action.totalPage,
        page,
        numshow: action.numshow,
        isLoading: false,
      };
    case _onFail(Action):
      return {...state, isLoading: false};
    case _onUnmount(Action):
      return stateLoadMore;
    default:
      return state;
  }
};

export const reducerAdvance = (state = stateLoadMore, action, Action) => {
  switch (action.type) {
    case Action:
      return {...state, isLoading: true};
    case _onSuccess(Action): {
      const data = state.data ? [...state.data, ...action.data] : action.data;
      return {
        data: action.isLoadMore ? data : action.data,
        totalPage: action.totalPage,
        total: action.total,
        isLoading: false,
      };
    }
    case _onFail(Action):
      return {...state, isLoading: false};
    case _onUnmount(Action):
      return {...stateLoadMore};
    default:
      return state;
  }
};
