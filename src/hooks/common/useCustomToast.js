import {TOAST_TYPE} from '@constants';
import actions from '@redux/actions';
import {useDispatch} from 'react-redux';

export default function useCustomToast() {
  const dispatch = useDispatch();

  const toastSuccess = toast => {
    dispatch({
      type: actions.TOAST_MESSAGE,
      status: TOAST_TYPE.success,
      message: toast,
    });
  };

  const toastFail = toast => {
    dispatch({
      type: actions.TOAST_MESSAGE,
      status: TOAST_TYPE.error,
      message: toast,
    });
  };

  return {toastSuccess, toastFail};
}
