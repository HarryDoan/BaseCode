import {Pressable, Text} from '@components';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const Button = ({
  title = '',
  onPress,
  loading,
  disabled,
  numberOfLines = 1,
  textProps,
  ...containerProps
}) => {
  return (
    <Pressable
      onPress={onPress}
      backgroundColor="primary"
      paddingVertical={10}
      alignCenter
      justifyCenter
      marginHorizontal={15}
      radius={5}
      disabled={loading || disabled}
      {...containerProps}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text numberOfLines={numberOfLines} color="white" {...textProps}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
