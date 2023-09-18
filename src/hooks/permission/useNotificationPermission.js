import {useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';

export default function useNotificationPermission() {
  const [hasPermission, setHasPermission] = useState(false);
  const [register, setRegister] = useState(
    messaging().isDeviceRegisteredForRemoteMessages,
  );

  useEffect(() => {
    messaging()
      .hasPermission()
      .then(authStatus => {
        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          setHasPermission(true);
        }
      });
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      messaging()
        .requestPermission()
        .then(authStatus => {
          if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            setHasPermission(true);
          }
        });
    }
  }, [hasPermission]);

  useEffect(() => {
    if (!register) {
      messaging()
        .registerDeviceForRemoteMessages()
        .then(() => setRegister(true));
    }
  }, [register]);

  return hasPermission && register;
}
