import {checkAndRequestPermission} from '@utils';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';

export default function useLocationPermission() {
  const [locationPermited, setPermited] = useState(false);

  useEffect(() => {
    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    });
    checkAndRequestPermission(permission)
      .then(() => {
        setPermited(true);
      })
      .catch(error => {
        setPermited(false);
      });
  }, []);

  return locationPermited;
}
