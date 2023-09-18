import {Block, Icon, Modal, Pressable} from '@components';
import Button from '@components/base/Button';
import Text from '@components/base/Text';
import TextInput from '@components/base/TextInput';
import {searchIgnoreCaseAccent} from '@utils';
import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MultiSelectInput = ({
  label = '',
  placeholder = '-- Select --',
  data = [],
  haveSearch,
  containerStyle,
  inputStyle,
  name,
  control,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const isFullMode = data.length > 5;
  const {
    field: {onChange, onBlur, value: fValues},
    fieldState: {error},
  } = useController({name, control});
  const [values, setValues] = useState(fValues);
  const {t} = useTranslation();
  const errorMessage = t(error?.message);

  const showModal = () => {
    if (data.length > 0) {
      setModalVisible(true);
      setValues(fValues);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
    onBlur();
  };

  const _renderInput = () => {
    const display =
      fValues.length > 0
        ? fValues
            .map(v => data.find(d => d.value === v)?.label || '')
            .join(', ')
        : placeholder;
    const isEmptyData = !(data?.length > 0);
    return (
      <Block>
        {label?.length > 0 && <Text fontSize={17}>{label}</Text>}
        <Pressable
          disabled={isEmptyData}
          onPress={showModal}
          paddingVertical={11}
          radius={7}
          marginTop={10}
          paddingHorizontal={10}
          borderWidth={0.7}
          borderColor="inputBorder"
          backgroundColor={isEmptyData ? 'placeholder3' : 'white'}
          style={inputStyle}
          row>
          <Text
            color={values.length > 0 ? 'black' : 'textPlaceholder'}
            fontSize={15}
            numberOfLines={1}
            flex>
            {display}
          </Text>
          <Icon
            IconType={AntDesign}
            iconName="down"
            iconColor="textPlaceholder"
          />
        </Pressable>
        {errorMessage?.length > 0 && (
          <Text color="red" fontSize={11} marginTop={2}>
            {errorMessage}
          </Text>
        )}
      </Block>
    );
  };

  const _renderModalHeader = () => {
    return (
      <Block
        row
        justifyCenter
        alignCenter
        paddingVertical={10}
        backgroundColor="primary"
        borderTopRadius={10}>
        <Text color="white" semiBold fontSize={17} center>
          {label || 'Select'}
        </Text>
        <Icon
          IconType={AntDesign}
          iconName="closecircleo"
          iconColor="white"
          absolute
          right={10}
          onPress={hideModal}
        />
      </Block>
    );
  };

  const _renderModalSearch = () => {
    return (
      <Block
        rowCenter
        paddingHorizontal={15}
        backgroundColor="smoke"
        borderBottomWidth={0.5}
        borderColor="lineBreak">
        <Icon iconColor="placeholder" IconType={AntDesign} iconName="search1" />
        <TextInput
          flex
          value={search}
          onChangeText={setSearch}
          placeholder="Tìm kiếm"
          paddingLeft={5}
        />
      </Block>
    );
  };

  const _renderListItem = () => {
    const trimmed = search.trim();
    const filtered = trimmed
      ? data.filter(d => searchIgnoreCaseAccent(d.label, trimmed))
      : data;
    return (
      <ScrollView>
        <Block safeAreaBottom>
          {filtered.map((item, index) => {
            const selected = values.indexOf(item.value) > -1;
            const onPress = () => {
              const newValues = selected
                ? values.filter(v => v !== item.value)
                : [...values, item.value];
              setValues(newValues);
            };
            return (
              <Pressable
                onPress={onPress}
                key={item.value}
                rowCenter
                paddingVertical={10}
                paddingHorizontal={15}
                borderBottomWidth={0.5}
                borderColor="lineBreak">
                <Text
                  flex
                  semiBold
                  fontSize={16}
                  color={selected ? 'primary' : 'black'}>
                  {item.label || ''}
                </Text>
                {selected && (
                  <Icon
                    IconType={AntDesign}
                    iconName="checkcircle"
                    iconColor="primary"
                  />
                )}
              </Pressable>
            );
          })}
        </Block>
      </ScrollView>
    );
  };

  const _renderModal = () => {
    const onPress = () => {
      onChange(values);
      setModalVisible(false);
    };
    return (
      <Modal hideModal={hideModal}>
        <Block
          flex={isFullMode}
          backgroundColor="white"
          safeAreaTop
          radius={10}>
          {_renderModalHeader()}
          {(haveSearch ?? isFullMode) && _renderModalSearch()}
          {_renderListItem()}
          <Button title="Xác nhận" safeAreaBottom onPress={onPress} />
        </Block>
      </Modal>
    );
  };

  return (
    <Block style={containerStyle} marginHorizontal={15}>
      {_renderInput()}
      {modalVisible && _renderModal()}
    </Block>
  );
};

export default MultiSelectInput;
