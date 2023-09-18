import {Animated, Image, Pressable, View} from 'react-native';
import {Block, Text} from '@components';
import React, {useRef} from 'react';

import {COLORS} from '@theme';
import {icons} from '@assets';
import styles from './styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

const CheckBox = ({
  title,
  value,
  setValue,
  width = 20,
  containerStyles,
  labelStyles,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const _onChange = () => {
    setValue(prev => !prev);
    Animated.timing(animatedValue, {
      toValue: value ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.smoke, COLORS.green],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 1],
  });

  const widthIcon = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width],
  });

  return (
    <Block style={containerStyles} row alignCenter>
      <AnimatedPressable
        style={styles.button(borderColor, scale, width)}
        onPress={_onChange}>
        <Image style={styles.icon(width)} source={icons?.ic_check_blank} />
        <AnimatedView style={styles.background(widthIcon)} />
      </AnimatedPressable>
      <Text style={labelStyles} fontType="bold" size={15}>
        {title}
      </Text>
    </Block>
  );
};

export default CheckBox;
