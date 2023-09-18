import {Block, Pressable, Text} from '@components';
import {SIZES} from '@theme';
import React from 'react';

const RadioButton = ({
  data,
  value,
  onChangeValue,
  unCheckColor = 'smoke',
  checkedColor = 'green',
  containerProps,
  itemProps,
  labelProps,
}) => {
  const _renderItem = (item, index) => {
    return (
      <Pressable
        {...itemProps}
        key={index}
        marginLeft={index !== 0 ? SIZES.medium : 0}
        onPress={() => onChangeValue(item)}>
        <Block row alignCenter>
          <Block
            round={18}
            backgroundColor={unCheckColor}
            alignCenter
            justifyCenter>
            {item.value === value && (
              <Block round={8} backgroundColor={checkedColor} />
            )}
          </Block>
          <Text {...labelProps} marginLeft={10}>
            {item.label}
          </Text>
        </Block>
      </Pressable>
    );
  };

  return (
    <Block {...containerProps} rowCenter>
      {data.map(_renderItem)}
    </Block>
  );
};

export default RadioButton;
