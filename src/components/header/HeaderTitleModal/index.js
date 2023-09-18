import {Block, Icon, Pressable, Text} from '@components';
import {HEADER} from '@constants';
import {root} from '@navigation/navigationRef';
import {COLORS, SIZES} from '@theme';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderTitleModal = ({
  title,
  canGoBack,
  onGoBack,
  backgroundColor,
  color = 'white',
  colorIcon,
  containerProps,
  titleProps,
  IconRight,
  rightOnPress,
  barStyle,
}) => {
  const _renderIconBack = opacity => {
    const _onGoBack = () => {
      if (opacity === 1) {
        onGoBack ? onGoBack() : root.goBack();
      }
    };

    return (
      canGoBack && (
        <Pressable
          opacity={opacity}
          paddingHorizontal={SIZES.xSmall}
          onPress={_onGoBack}>
          <Icon
            IconType={Ionicons}
            iconName="chevron-back"
            iconSize={30}
            color={colorIcon || color}
          />
        </Pressable>
      )
    );
  };

  const _renderIconRight = () => {
    return IconRight ? (
      <Pressable onPress={rightOnPress} paddingHorizontal={SIZES.xSmall}>
        {IconRight}
      </Pressable>
    ) : (
      _renderIconBack(0)
    );
  };

  return (
    <Block
      rowCenter
      height={HEADER.height}
      padding={SIZES.medium}
      backgroundColor={backgroundColor ? backgroundColor : COLORS.header}
      {...containerProps}>
      {_renderIconBack(1)}
      <Text
        flex
        center
        color={color}
        fontSize={HEADER.titleSize}
        numberOfLines={1}
        {...titleProps}>
        {title}
      </Text>
      {_renderIconRight()}
    </Block>
  );
};

export default HeaderTitleModal;
