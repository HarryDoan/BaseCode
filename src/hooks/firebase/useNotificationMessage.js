import PushNotification, {Importance} from 'react-native-push-notification';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS} from '@theme';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import actions from '@redux/actions';
import {commonRoot} from '@navigation/navigationRef';
import {icons} from '@assets';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import router from '@navigation/router';
import {useEffect} from 'react';
import {useFCMMessage} from '@hooks';

export default function useNotificationMessage() {
  const {message, appState} = useFCMMessage();
  const appToken = useSelector(state => state.appToken.data);

  const userToken = useSelector(state => state.user?.userToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      (userToken && message && appState === 2) ||
      (userToken && message && appState === 3)
    ) {
      commonRoot.navigate(router.NOTIFY_DETAIL_SCREEN, {
        item_id: message?.data?.item_id,
      });
    }
  }, [appState, message]);

  PushNotification.createChannel({
    channelId: 'transaction_notification',
    channelName: 'Giao dịch',
    playSound: false,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  });

  PushNotification.configure({
    onNotification: data => {
      // if (Platform.OS === 'ios') {
      //   console.log('====================================');
      //   console.log('check ios: , ', data);
      //   console.log('====================================');
      //   if (message?.data?.url === router.NOTIFY_DETAIL_SCREEN) {
      //     // dispatch({
      //     //   type: actions.GET_ORDER_DETAIL,
      //     //   params: {
      //     //     order_id: message?.data?.item_id,
      //     //   },
      //     // });
      //   }
      //   commonRoot.navigate(router.NOTIFY_DETAIL_SCREEN, {
      //     item_id: message?.data?.item_id,
      //   });
      // } else {
      //   console.log('====================================');
      //   console.log('check android: ', data);
      //   console.log('====================================');
      //   const dataMessage = Object.keys(data?.data).length > 0 ? data : message;
      //   if (dataMessage?.data?.url === router.NOTIFY_DETAIL_SCREEN) {
      //     // dispatch({
      //     //   type: actions.NOTIFY_DETAIL_SCREEN,
      //     //   params: {
      //     //     order_id: dataMessage?.data?.item_id,
      //     //   },
      //     // });
      //   }
      //   commonRoot.navigate(router.NOTIFY_DETAIL_SCREEN, {
      //     item_id: message?.data?.item_id,
      //   });
      // }
    },
  });

  useEffect(() => {
    if (
      userToken &&
      message &&
      appToken &&
      !message.from.startsWith('/topics/')
    ) {
      console.log('=========', message);
      // if (Platform.OS === 'ios') {
      //   PushNotificationIOS.addNotificationRequest({
      //     id: message?.messageId,
      //     body: message?.notification?.body,
      //     title: message?.notification?.title,
      //     sound: 'default',
      //   });
      // } else {
      //   PushNotification.localNotification({
      //     channelId: 'transaction_notification',
      //     title: message?.notification?.title,
      //     message: message?.notification?.body,
      //     showWhen: true,
      //     autoCancel: true,
      //     vibrate: true,
      //     playSound: true,
      //     soundName: 'default',
      //     smallIcon: icons?.ic_load,
      //     largeIcon: 'icon_app_round',
      //     color: COLORS.red6,
      //     when: moment().valueOf(),
      //   });
      // }
      // dispatch({
      //   type: actions.GET_ORDER_DETAIL,
      //   params: {
      //     order_id: message?.data?.item_id,
      //   },
      // });
      // dispatch({
      //   type: actions.GET_ALL_NOTIFICATION,
      // });
      // dispatch({type: actions.GET_ORDER_STATUS});
    }
  }, [message?.messageId, appToken]);
}
