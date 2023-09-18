import {Block, ImagePicker, Pressable} from '@components';
import React, {useState} from 'react';

import Image from '@components/base/Image';
import Text from '@components/base/Text';
import {icons} from '@assets';
import {useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

const ImageInput = ({label = '', name, control, compressImageQuality}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    field: {value: image, onChange},
    fieldState: {error},
  } = useController({name, control});
  const {t} = useTranslation();
  const errorMessage = t(error?.message);

  const _renderPlaceHolder = () => {
    return (
      <Pressable
        onPress={() => setModalVisible(true)}
        paddingVertical={20}
        alignCenter
        shadow3
        backgroundColor="white"
        radius={7}>
        <Block round={55} alignCenter justifyCenter backgroundColor="primary">
          <Image source={icons?.ic_upload} width={25} height={29} />
        </Block>
        <Text fontSize={17} marginTop={15}>
          {'Tải ảnh lên'}
        </Text>
        <Text fontSize={15} color="iconPlaceholder" marginTop={5}>
          {'(Tối đa 15MB)'}
        </Text>
      </Pressable>
    );
  };

  const _renderImagePreview = () => {
    return (
      <Block radius={7} backgroundColor="placeholder2">
        <Image source={{uri: image.path}} height={150} resizeMode="contain" />
        <Pressable
          absolute
          right={10}
          bottom={10}
          onPress={() => onChange(null)}>
          <Image
            source={icons?.ic_trash_can}
            tintColor="primary"
            width={16}
            height={21}
          />
        </Pressable>
      </Block>
    );
  };

  return (
    <Block>
      {label?.length > 0 && (
        <Text fontSize={17} marginBottom={15}>
          {t(label)}
        </Text>
      )}
      {image ? _renderImagePreview() : _renderPlaceHolder()}
      {errorMessage?.length > 0 && (
        <Text color="red" fontSize={11} marginTop={2}>
          {errorMessage}
        </Text>
      )}
      {modalVisible && (
        <ImagePicker
          hidePicker={() => setModalVisible(false)}
          onImagePick={onChange}
          options={{compressImageQuality}}
        />
      )}
    </Block>
  );
};

export default ImageInput;
