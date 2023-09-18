import {Block, Controller, RadioButton, Text} from '@components';
import {SIZES} from '@theme';
import React from 'react';

const CustomRadio = ({
  data,
  containerProps,
  value,
  onChange,
  itemProps,
  label,
}) => {
  const _onChangeValue = item => {
    onChange(item?.value);
  };

  return (
    <Block margin={SIZES.medium} {...containerProps}>
      {label?.length > 0 && <Text fontSize={17}>{label}</Text>}
      <RadioButton
        data={data}
        value={value}
        onChangeValue={_onChangeValue}
        containerProps={containerProps}
        itemProps={itemProps}
      />
    </Block>
  );
};

const FormRadioButton = ({
  control,
  name,
  data,
  containerProps,
  itemProps,
  label = '',
}) => {
  return (
    <Controller {...{control, name}}>
      <CustomRadio data={data} {...{containerProps, itemProps, label}} />
    </Controller>
  );
};

export default FormRadioButton;
