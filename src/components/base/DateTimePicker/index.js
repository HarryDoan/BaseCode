import {Block, Modal, Pressable, Text} from '@components';
import {COLORS} from '@theme';
import React, {useState} from 'react';
import DTPicker from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';

const DateTimePickerIOS = ({
  maximumDate,
  minimumDate,
  mode,
  onCancel,
  onConfirm,
  date,
  ...pickerProps
}) => {
  const [_date, setDate] = useState(date || new Date());

  return (
    <Modal hideModal={onCancel} position="bottom">
      <Block
        safeAreaBottom
        backgroundColor="white"
        marginHorizontal={15}
        radius={10}
        paddingVertical={15}>
        <DTPicker
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          value={_date}
          mode={mode}
          display={mode === 'date' ? 'inline' : 'spinner'}
          onChange={(_, v) => {
            setDate(v);
          }}
          {...pickerProps}
        />
        <Block row paddingHorizontal={10} marginBottom={15}>
          <Pressable
            height={40}
            radius={10}
            marginRight={10}
            backgroundColor={COLORS.secondary}
            flex
            justifyCenter
            alignCenter
            onPress={() => {
              onConfirm(_date);
              onCancel();
            }}>
            <Text color={'white'} semiBold>
              {'Xác nhận'}
            </Text>
          </Pressable>
          <Pressable
            height={40}
            radius={10}
            backgroundColor={COLORS.lineBreak}
            flex
            justifyCenter
            alignCenter
            onPress={onCancel}>
            <Text color={'white'} semiBold>
              {'Hủy'}
            </Text>
          </Pressable>
        </Block>
      </Block>
    </Modal>
  );
};

const DateTimePickerAndroid = ({
  maximumDate,
  minimumDate,
  mode,
  onCancel,
  onConfirm,
  date,
  ...pickerProps
}) => {
  return (
    <DTPicker
      maximumDate={maximumDate}
      minimumDate={minimumDate}
      value={date || new Date()}
      mode={mode}
      onChange={(e, v) => {
        e.type === 'set' && onConfirm(v);
        onCancel();
      }}
      {...pickerProps}
    />
  );
};

const DateTimePicker = ({
  maximumDate,
  minimumDate,
  mode,
  onCancel,
  onConfirm,
  date,
  ...pickerProps
}) => {
  if (Platform.OS === 'ios') {
    return (
      <DateTimePickerIOS
        {...{
          maximumDate,
          minimumDate,
          mode,
          onCancel,
          onConfirm,
          date,
          ...pickerProps,
        }}
      />
    );
  }

  return (
    <DateTimePickerAndroid
      {...{
        maximumDate,
        minimumDate,
        mode,
        onCancel,
        onConfirm,
        date,
        ...pickerProps,
      }}
    />
  );
};

export default DateTimePicker;
