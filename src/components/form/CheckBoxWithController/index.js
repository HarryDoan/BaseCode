import {Icon, Pressable, Text} from '@components';
import Block from '@components/base/Block';
import React from 'react';
import {useController} from 'react-hook-form';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CheckBoxWithController = ({name, control, label = ''}) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController({name, control});

  return (
    <Block>
      <Pressable row onPress={() => onChange(!value)}>
        <Icon
          IconType={FontAwesome5}
          iconColor={value ? 'green' : 'placeholder'}
          iconName={value ? 'check-square' : 'square'}
          solid={value}
          iconSize={20}
        />
        {label?.length > 0 && <Text marginLeft={5}>{label}</Text>}
      </Pressable>
      {error && (
        <Text color="red" fontSize={11} marginTop={2}>
          {error.message}
        </Text>
      )}
    </Block>
  );
};

export default CheckBoxWithController;
