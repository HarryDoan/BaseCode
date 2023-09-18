import {Block, Icon, Pressable, Text} from '@components';
import React from 'react';
import {SIZES} from '@theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FormButton = ({
  placeholder,
  messageErr,
  errProps,
  placeholderStyle,
  customerMessageErr,
  styles,
  label,
  province,
  onPress,
}) => {
  const _renderMessageErr = () => {
    return (
      <Text {...errProps} marginTop={SIZES.normal} small color="red">
        {messageErr}
      </Text>
    );
  };
  const _renderButtom = () => {
    return (
      <Pressable
        style={styles}
        row
        alignCenter
        space="between"
        borderColor={'lightGray'}
        borderBottomWidth={1}
        marginTop={SIZES.medium}
        radius={SIZES.xxxLarge}
        onPress={onPress}>
        <Text style={placeholderStyle} marginLeft={10}>
          {placeholder}
        </Text>
        <Icon
          IconType={AntDesign}
          iconName="down"
          iconColor="placeholder"
          marginRight={SIZES.small}
          right={0}
        />
      </Pressable>
    );
  };
  const _renderButtomErr = () => {
    if (messageErr) {
      return customerMessageErr
        ? customerMessageErr(_renderMessageErr)
        : _renderMessageErr();
    }
  };

  return (
    <Block>
      {_renderButtom()}
      {_renderButtomErr()}
    </Block>
  );
};

export default FormButton;
