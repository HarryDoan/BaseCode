import {Block, Icon, Pressable, Text, DateTimePicker} from '@components';
import {COLORS} from '@theme';
import moment from 'moment';
import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DateTimeInput = ({
  name,
  control,
  label = '',
  mode = 'date',
  maximumDate,
  minimumDate,
  placeholder = 'DD/MM/YYYY',
  displayFormat = 'DD/MM/YYYY',
  disabled,
  inputProps,
  textInputProps,
  labelProps,
  errorProps,
  pickerProps,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    field: {onChange, onBlur, value},
    fieldState: {error},
  } = useController({name, control});

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    onBlur();
  };

  const _renderInput = () => {
    return (
      <Block>
        {label?.length > 0 && (
          <Text fontSize={17} {...labelProps}>
            {label}
          </Text>
        )}
        <Pressable
          disabled={disabled}
          onPress={showModal}
          paddingVertical={11}
          row
          radius={7}
          marginTop={10}
          paddingHorizontal={15}
          borderWidth={0.7}
          borderColor="inputBorder"
          {...inputProps}>
          <Text
            regular
            fontSize={14}
            flex
            color={value ? COLORS.textColor : COLORS.placeholder}
            {...textInputProps}>
            {value ? moment(value).format(displayFormat) : placeholder}
          </Text>
          <Icon
            IconType={AntDesign}
            color={COLORS.gray2}
            iconName="calendar"
            iconSize={20}
          />
        </Pressable>
        {error && (
          <Text color="red" fontSize={11} marginTop={2} {...errorProps}>
            {error.message}
          </Text>
        )}
      </Block>
    );
  };

  return (
    <>
      {_renderInput()}
      {modalVisible && (
        <DateTimePicker
          onConfirm={onChange}
          onCancel={hideModal}
          date={value}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          mode={mode}
          {...pickerProps}
        />
      )}
    </>
  );
};

export default DateTimeInput;
