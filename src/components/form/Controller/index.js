import {Block} from '@components';
import React, {cloneElement} from 'react';
import {useController} from 'react-hook-form';

const Controller = ({name, control, containerProps, children}) => {
  const {
    field: {onChange, onBlur, value},
    formState: {errors},
  } = useController({name, control});

  return (
    <Block {...containerProps}>
      {cloneElement(children, {
        onChange,
        onBlur,
        value,
        error: errors[name],
      })}
    </Block>
  );
};

export default Controller;
