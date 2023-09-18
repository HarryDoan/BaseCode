import {Block, Icon, Modal, Pressable, Text} from '@components';
import {usePhotoPermission} from '@hooks';
import {COLORS} from '@theme';
import React from 'react';
import Picker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OPTIONS = {
  mediaType: 'photo',
  compressImageQuality: 0.5,
};

const ImageVideoPicker = ({hidePicker, onImagePick, options = {}}) => {
  usePhotoPermission();
  const openCamera = () => {
    hidePicker?.();
    Picker.openCamera({...OPTIONS, ...options, mediaType: 'video'}).then(
      image => {
        onImagePick?.(image);
      },
    );
  };

  const openGallery = () => {
    hidePicker?.();
    Picker.openPicker({...OPTIONS, ...options, mediaType: 'video'}).then(
      image => {
        onImagePick?.(image);
      },
    );
  };

  return (
    <Modal hideModal={hidePicker}>
      <Block backgroundColor="white">
        <Block safeAreaBottom>
          <Pressable
            onPress={openCamera}
            row
            paddingVertical={10}
            paddingHorizontal={15}
            borderBottomWidth={0.5}
            borderColor="lineBreak">
            <Icon IconType={AntDesign} iconName="camera" />
            <Text color={COLORS.textColor} semiBold marginLeft={10}>
              {'Mở máy ảnh'}
            </Text>
          </Pressable>
          <Pressable
            onPress={openGallery}
            row
            paddingVertical={10}
            paddingHorizontal={15}
            borderBottomWidth={0.5}
            borderColor="lineBreak">
            <Icon IconType={MaterialIcons} iconName="photo-library" />
            <Text color={COLORS.textColor} semiBold marginLeft={10}>
              {'Chọn từ thư viện'}
            </Text>
          </Pressable>
        </Block>
      </Block>
    </Modal>
  );
};

export default ImageVideoPicker;
