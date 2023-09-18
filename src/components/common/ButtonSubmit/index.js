import {Pressable} from '@components';
import {COLORS, SIZES} from '@theme';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const ButtonSubmit = ({
  loading,
  loadingColor = COLORS.white,
  width,
  height,
  paddingHorizontal,
  paddingVertical,
  backgroundColor,
  onPress,
  children,
  disabled,
  containerProps,
  indicatorStyle,
}) => {
  return (
    <Pressable
      width={width}
      height={height}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      justifyCenter
      alignCenter
      disabled={loading || disabled}
      radius={SIZES.xSmall}
      margin={SIZES.normal}
      padding={SIZES.normal}
      backgroundColor={backgroundColor ? backgroundColor : 'primary'}
      labelProps={{color: 'white'}}
      onPress={onPress}
      {...containerProps}>
      {loading ? (
        <ActivityIndicator
          {...indicatorStyle}
          size="small"
          color={loadingColor}
        />
      ) : (
        children
      )}
    </Pressable>
  );
};

export default ButtonSubmit;
