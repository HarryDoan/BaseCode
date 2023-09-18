import {Block, Icon, Modal, Pressable} from '@components';
import Text from '@components/base/Text';
import TextInput from '@components/base/TextInput';
import {searchIgnoreCaseAccent} from '@utils';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Picker = ({
  label = '',
  placeholder = '-- Select --',
  data = [],
  haveSearch,
  containerStyle,
  containerModal,
  inputStyle,
  flex = true,
  renderCustomInput,
  textProps = {},
  onChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState(null);
  const isFullMode = data.length > 5 && flex;

  const showModal = () => {
    if (data.length > 0) {
      setModalVisible(true);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
    setSearch('');
  };

  const _renderInput = () => {
    const display =
      value != null
        ? data.find(d => d.value === value)?.label || ''
        : placeholder;
    if (renderCustomInput) {
      return renderCustomInput({
        display,
        value,
        onPress: showModal,
      });
    }
    const isEmptyData = !(data?.length > 0);
    return (
      <Block>
        <Pressable
          disabled={isEmptyData}
          onPress={showModal}
          paddingVertical={11}
          radius={7}
          marginTop={10}
          paddingHorizontal={10}
          borderWidth={0.7}
          borderColor="inputBorder"
          row
          backgroundColor={isEmptyData ? 'placeholder3' : 'white'}
          style={inputStyle}>
          <Text
            color={value != null ? 'black' : 'textPlaceholder'}
            fontSize={15}
            numberOfLines={1}
            flex
            {...textProps}>
            {display}
          </Text>
          <Icon
            IconType={AntDesign}
            iconName="down"
            iconColor="textPlaceholder"
          />
        </Pressable>
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
          {filtered.map(item => {
            const selected = item.value === value;
            const onPress = () => {
              setValue(item.value);
              onChange?.(item.value);
              hideModal();
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
    return (
      <Modal position="center" isVisible={true} hideModal={hideModal}>
        <Block
          flex={isFullMode}
          style={containerModal}
          backgroundColor="white"
          safeAreaTop
          marginHorizontal={isFullMode ? 0 : 15}
          radius={10}>
          {_renderModalHeader()}
          {(haveSearch ?? isFullMode) && _renderModalSearch()}
          {_renderListItem()}
        </Block>
      </Modal>
    );
  };

  return (
    <Block style={containerStyle}>
      {_renderInput()}
      {modalVisible && _renderModal()}
    </Block>
  );
};

export default Picker;
