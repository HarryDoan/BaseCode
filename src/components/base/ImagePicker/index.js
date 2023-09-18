import {Block, Icon, Modal, Pressable, Text} from '@components';
import {useCameraPermission, usePhotoPermission} from '@hooks';
import {COLORS} from '@theme';
import React from 'react';
import Picker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OPTIONS = {
  mediaType: 'photo',
  compressImageQuality: 0.5,
};

const ImagePicker = ({
  setAvatar,
  setShowPicker,
  hidePicker,
  onImagePick,
  setIsShowModalCamera,
  options = {},
}) => {
  usePhotoPermission();
  const isStatusCamera = useCameraPermission();
  const openCamera = () => {
    isStatusCamera ? setIsShowModalCamera(false) : setIsShowModalCamera(true);
    hidePicker?.();
    Picker.openCamera({
      width: 1200, // Add this
      height: 1500, // Add this
      cropping: true,
      ...OPTIONS,
      ...options,
    }).then(image => {
      onImagePick?.(image);
      setShowPicker(false);
    });
  };

  const openGallery = () => {
    isStatusCamera ? setIsShowModalCamera(false) : setIsShowModalCamera(true);
    hidePicker?.();
    Picker.openPicker({
      width: 1200, // Add this
      height: 1500, // Add this
      cropping: true,
      ...OPTIONS,
      ...options,
    }).then(image => {
      onImagePick?.(image);
      setShowPicker(false);
    });
  };

  return (
    <Modal hideModal={hidePicker}>
      <Block backgroundColor="white">
        <Block safePaddingAreaBottom>
          <Pressable
            onPress={openCamera}
            row
            height={60}
            alignCenter
            paddingVertical={10}
            paddingHorizontal={15}
            borderBottomWidth={0.5}
            borderColor="lineBreak">
            <Icon IconType={AntDesign} iconName="camera" />
            <Text
              fontSize={16}
              color={COLORS.textColor}
              semiBold
              marginLeft={10}>
              {'Mở máy ảnh'}
            </Text>
          </Pressable>
          <Pressable
            onPress={openGallery}
            row
            height={60}
            alignCenter
            paddingVertical={10}
            paddingHorizontal={15}
            borderBottomWidth={0.5}
            borderColor="lineBreak">
            <Icon IconType={MaterialIcons} iconName="photo-library" />
            <Text
              fontSize={16}
              color={COLORS.textColor}
              semiBold
              marginLeft={10}>
              {'Chọn từ thư viện'}
            </Text>
          </Pressable>
        </Block>
      </Block>
    </Modal>
  );
};

export default ImagePicker;
