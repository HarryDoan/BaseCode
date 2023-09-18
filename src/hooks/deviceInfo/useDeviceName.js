import {useEffect} from 'react';
import {useState} from 'react';
import {getDeviceName} from 'react-native-device-info';

export default function useDeviceName() {
  const [name, setName] = useState(null);
  useEffect(() => {
    getDeviceName().then(setName);
  }, []);

  return name;
}
