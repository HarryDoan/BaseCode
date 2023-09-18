import {checkAndRequestPermission} from '@utils';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';

export default function usePhotoPermission() {
  const [permit, setPermited] = useState(false);

  useEffect(() => {
    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    });
    checkAndRequestPermission(permission)
      .then(() => {
        setPermited(true);
      })
      .catch(error => {
        setPermited(false);
      });
  }, []);

  return permit;
}
