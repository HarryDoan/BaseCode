import {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {useLocationPermission} from '@hooks';
import actions from '@redux/actions';
import {useDispatch} from 'react-redux';

export default function useCurrentPosition(value) {
  const [currentPosition, setPosition] = useState(null);
  const locationPermission = useLocationPermission();
  const dispatch = useDispatch();

  useEffect(() => {
    if (locationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          const {
            coords: {latitude, longitude, heading},
          } = position;
          setPosition({latitude, longitude, heading});
          dispatch({
            type: actions.LOCATION,
            location: {
              latitude: latitude,
              longitude: longitude,
            },
          });
        },
        error => {},
        {enableHighAccuracy: true},
      );
      const watchId = Geolocation.watchPosition(
        position => {
          const {
            coords: {latitude, longitude, heading},
          } = position;
          setPosition({latitude, longitude, heading});
        },
        error => {},
        {enableHighAccuracy: true, distanceFilter: 10},
      );
      return () => {
        Geolocation.clearWatch(watchId);
      };
    }
  }, [locationPermission]);

  return currentPosition;
}
