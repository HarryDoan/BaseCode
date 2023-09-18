import {Pressable, Text} from '@components';
import {COLORS, GRADIENTS} from '@theme';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function GradientButton({title, onPress, ...containerProps}) {
  return (
    <Pressable height={40} radius={5} onPress={onPress} {...containerProps}>
      <LinearGradient
        style={{
          flex: 1,

          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={GRADIENTS.primary}>
        <Text color={COLORS.white}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}
