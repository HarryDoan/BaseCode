import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import NetInfo from '@react-native-community/netinfo';

const NetWork = () => {
  const [isConnection, setIsConnection] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnection(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (isConnection) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        <Text style={styles.text}>
          Vui lòng bật Internet để sử dụng ứng dụng
        </Text>
      </View>
    </View>
  );
};

export default NetWork;
