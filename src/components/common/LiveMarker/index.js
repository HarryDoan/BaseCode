import {Block} from '@components';
import {COLORS} from '@theme';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

const LiveMarker = ({outerSize = 46, innerSize = 25, borderSize = 3}) => {
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
    backgroundColor: COLORS.lightBlue,
    borderRadius: outerSize / 2,
    zIndex: -1,
    opacity: wave.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.1],
    }),
    transform: [
      {
        scale: wave.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
  };

  return (
    <Block round={outerSize} alignCenter justifyCenter>
      <Block
        round={innerSize}
        backgroundColor="lightBlue"
        borderWidth={borderSize}
        borderColor="white"
      />
      <Animated.View style={animatedStyle} />
    </Block>
  );
};

export default LiveMarker;
