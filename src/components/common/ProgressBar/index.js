import {Block} from '@components';
import {COLORS, GRADIENTS} from '@theme';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProgressBar = ({
  width = 120,
  height = 12,
  total = 1,
  used = 1,
  radius = 7,
  radiusProgress = 0,
  children,
  backgroundColor = 'white',
  progressColor = COLORS.primary,
  ...rest
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const percent = (used / total) * 100;
  const translateX = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [-width, 0],
  });

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: percent,
      useNativeDriver: true,
    }).start();
  }, [percent]);

  return (
    <Block
      backgroundColor={backgroundColor}
      radius={radius}
      overflow="hidden"
      height={height}
      width={width}
      justifyCenter
      {...rest}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{translateX}],
        }}>
        {Array.isArray(progressColor) ? (
          <LinearGradient
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: radiusProgress,
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={GRADIENTS.voucher}
          />
        ) : (
          <Block flex backgroundColor={progressColor} borderLeftRadius={10} />
        )}
      </Animated.View>
      {children}
    </Block>
  );
};

export default ProgressBar;
