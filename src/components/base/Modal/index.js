import {Portal} from '@gorhom/portal';
import {useBackHandler} from '@react-native-community/hooks';
import {COLORS} from '@theme';
import {height} from '@utils/responsive';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {FullWindowOverlay} from 'react-native-screens';

export default function Modal({
  position = 'bottom',
  children,
  animationDuration = 300,
  backdropOpacity = 0.4,
  hideModal,
  onBackdropPress,
  onBackButtonPress,
  contentContainerStyle,
  animation = 'translate',
  onShow,
}) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const backdropStyle = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.black,
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, backdropOpacity],
    }),
  };

  const contentStyle =
    animation === 'translate'
      ? {
          flex: 1,
          justifyContent: position === 'center' ? 'center' : 'flex-end',
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
              }),
            },
          ],
        }
      : {
          flex: 1,
          justifyContent: position === 'center' ? 'center' : 'flex-end',
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        };

  const _onBackDropPress = () => {
    onBackdropPress ? onBackdropPress() : hideModal?.();
  };

  useBackHandler(() => {
    onBackButtonPress ? onBackButtonPress() : hideModal?.();
    return true;
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(({finished}) => {
      onShow?.();
    });
  }, [animatedValue, animationDuration]);

  return (
    <Portal>
      <FullWindowOverlay style={StyleSheet.absoluteFillObject}>
        <TouchableWithoutFeedback onPress={_onBackDropPress}>
          <Animated.View style={backdropStyle} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[contentStyle, contentContainerStyle]}
          pointerEvents="box-none">
          {children}
        </Animated.View>
      </FullWindowOverlay>
    </Portal>
  );
}
