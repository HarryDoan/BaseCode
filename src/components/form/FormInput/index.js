import {Block, Text, TextInput} from '@components';
import {COLORS, SIZES} from '@theme';
import React from 'react';
import {useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

const FormInput = ({
  name,
  control,
  placeholder,
  messageErr,
  inputProps,
  errProps,
  customInput,
  customerMessageErr,
  secureTextEntry,
  keyboardType,
  returnKeyType,
  maxLength,
  setRef,
  blurOnSubmit,
  onSubmitEditing,
  styles,
  label = '',
  require = false,
  fontSizeLabel = 17,
  labelProps,
  onEndEditing,
  ...containerProps
}) => {
  const {
    field: {onChange, onBlur, value},
    fieldState: {error},
  } = useController({name, control});
  const {t} = useTranslation();
  const errorMessage = t(messageErr) || t(error?.message);
  const _renderMessageErr = () => {
    return (
      <Text {...errProps} marginTop={SIZES.normal} small color="red">
        {errorMessage}
      </Text>
    );
  };

  const _renderInputErr = () => {
    if (errorMessage) {
      return customerMessageErr
        ? customerMessageErr(_renderMessageErr)
        : _renderMessageErr();
    }
  };

  const _renderInput = () => {
    return (
      <TextInput
        flex
        setRef={setRef}
        maxLength={maxLength}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={styles}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        blurOnSubmit={blurOnSubmit}
        onSubmitEditing={onSubmitEditing}
        textAlignVertical={'center'}
        onEndEditing={onEndEditing}
        {...inputProps}
      />
    );
  };

  return (
    <Block {...containerProps}>
      {label.length > 0 && (
        <Text fontSize={fontSizeLabel} marginBottom={0} {...labelProps}>
          {t(label)}
          {require && <Text color={COLORS.red3}> *</Text>}
        </Text>
      )}
      {customInput ? customInput(_renderInput) : _renderInput()}
      {_renderInputErr()}
    </Block>
  );
};

export default FormInput;
