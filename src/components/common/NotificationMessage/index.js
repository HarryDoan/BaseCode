import {Block} from '@components';
import {COLORS} from '@theme';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

const NotificationMessage = ({outerSize = 20}) => {
  const wave = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(wave, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, [wave]);

  const animatedStyle = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.red,
    borderRadius: outerSize / 2,
    zIndex: 2,
    opacity: wave.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  };

  return (
    <Block round={outerSize} alignCenter justifyCenter>
      <Animated.View style={animatedStyle} />
    </Block>
  );
};

export default NotificationMessage;
