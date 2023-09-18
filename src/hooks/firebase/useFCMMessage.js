import PushNotification, {Importance} from 'react-native-push-notification';
import {useEffect, useState} from 'react';

import {COLORS} from '@theme';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {commonRoot} from '@navigation/navigationRef';
import {icons} from '@assets';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import router from '@navigation/router';
import {useNavigation} from '@react-navigation/native';

export default function useFCMMessage(isLog) {
  const [fMessage, setFMessage] = useState({message: null});

  useEffect(() => {
    const onMessageListener = messaging().onMessage(message => {
      setFMessage({message, appState: 1});
      if (Platform.OS === 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: message?.messageId,
          body: message?.notification?.body,
          title: message?.notification?.title,
          sound: 'default',
        });
      } else {
        PushNotification.localNotification({
          channelId: 'transaction_notification',
          title: message?.notification?.title,
          message: message?.notification?.body,
          showWhen: true,
          autoCancel: true,
          vibrate: true,
          playSound: true,
          soundName: 'default',
          smallIcon: icons?.ic_load,
          largeIcon: 'icon_app_round',
          color: COLORS.red6,
          when: moment().valueOf(),
        });
      }
      if (__DEV__ && isLog) {
        console.log(
          '%c FIREBASE_MESSAGE_FORE_GROUND: ',
          'color: yellow; font-weight: bold',
          message,
        );
      }
    });
    return onMessageListener;
  }, []);

  useEffect(() => {
    const onNotificationOpenedAppListener = messaging().onNotificationOpenedApp(
      message => {
        setFMessage({message, appState: 2});
        if (__DEV__ && isLog) {
          console.log(
            '%c FIREBASE_MESSAGE_NOTIFICATION_OPEN_APP: ',
            'color: yellow; font-weight: bold',
            message,
          );
        }
        if (Platform.OS === 'ios' && message?.data?.url) {
          commonRoot.navigate(message?.data?.url, {id: message?.data?.item_id});
        }
      },
    );
    return onNotificationOpenedAppListener;
  }, []);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(message => {
        if (message) {
          setFMessage({message, appState: 3});
          if (__DEV__ && isLog) {
            console.log(
              '%c FIREBASE_MESSAGE_NOTIFICATION_OPEN_FROM_QUIT_STATE: ',
              'color: yellow; font-weight: bold',
              message,
            );
          }
        }
      });
  }, []);

  return fMessage;
}
