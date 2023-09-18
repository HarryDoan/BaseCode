import {TextInput} from '@components';
import React, {useEffect, useMemo, useState} from 'react';

const NumberInput = ({value, onChangeValue, maxValue, ...props}) => {
  const formatter = useMemo(() => new Intl.NumberFormat('en-US'), []);
  const [_value, setValue] = useState(value ? formatter.format(value) : '');

  useEffect(() => {
    setValue(value ? formatter.format(value) : '');
  }, [value]);

  const onChangeText = text => {
    if (maxValue) {
      if (+text.replace(',', '') <= +maxValue) {
        const rawNumber = text ? `${+text.replace(/\D/g, '')}` : '';
        onChangeValue(rawNumber);
        setValue(rawNumber ? formatter.format(rawNumber) : '');
      }
    } else {
      const rawNumber = text ? `${+text.replace(/\D/g, '')}` : '';
      onChangeValue(rawNumber);
      setValue(rawNumber ? formatter.format(rawNumber) : '');
    }
  };

  return (
    <TextInput
      value={_value}
      onChangeText={onChangeText}
      keyboardType="numeric"
      maxLength={17} //9.999.999.999.999
      {...props}
    />
  );
};

export default NumberInput;
