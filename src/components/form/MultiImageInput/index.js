import {Block, Icon, Image, ImagePicker, Pressable, Text} from '@components';
import {COLORS} from '@theme';
import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const MultiImageInput = ({
  label = '',
  name,
  control,
  maxImage = 4,
  imageOptions = {},
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    field: {value: images = [], onChange},
    fieldState: {error},
  } = useController({name, control});
  const {t} = useTranslation();
  const errorMessage = t(error?.message);

  const onImagePick = imgs => {
    const filteredImage = Array.isArray(imgs)
      ? imgs?.filter(img => !images.some(image => image.data === img.data))
      : [imgs];
    onChange([...images, ...filteredImage].slice(0, maxImage));
  };

  const _renderPlaceHolder = () => {
    if (images.length >= maxImage) {
      return null;
    }
    return (
      <Pressable
        onPress={() => setModalVisible(true)}
        marginLeft={15}
        radius={5}
        marginVertical={15}
        borderDashed
        borderWidth={1}
        borderColor={COLORS.gray}
        width={74}
        height={74}
        justifyCenter
        alignCenter>
        {/* <Text fontSize={13} light color={COLORS.orange1} center>
          {t('CreateFood.addPic')}
          <Text fontSize={10} color={COLORS.orange1}>
            {'\n\n' + t('CreateFood.max_pictures', {num: maxImage})}
          </Text>
        </Text> */}
        <Icon
          IconType={Entypo}
          iconName="camera"
          iconSize={25}
          iconColor="primary"
        />
      </Pressable>
    );
  };

  const _renderImagePreview = () => {
    return (
      <Block row>
        {images?.map((item, index) => {
          const onPress = () => {
            const newImages = images.filter((_, i) => i !== index);
            onChange(newImages);
          };
          return (
            <Block
              backgroundColor="placeholder2"
              key={index}
              marginLeft={15}
              marginVertical={15}>
              <Image
                source={{uri: item.path || item}}
                resizeMode="cover"
                square={74}
              />
              <Pressable absolute right={0} top={0} onPress={onPress}>
                <Icon
                  IconType={AntDesign}
                  iconName="closecircle"
                  iconSize={15}
                  iconColor="primary"
                />
              </Pressable>
            </Block>
          );
        })}
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
      <Block rowCenter>
        {_renderPlaceHolder()}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {_renderImagePreview()}
        </ScrollView>
      </Block>
      {errorMessage?.length > 0 && (
        <Text
          color="red"
          fontSize={11}
          marginTop={2}
          marginLeft={15}
          marginBottom={10}>
          {errorMessage}
        </Text>
      )}
      {modalVisible && (
        <ImagePicker
          hidePicker={() => setModalVisible(false)}
          onImagePick={onImagePick}
          options={{
            multiple: true,
            maxFiles: maxImage,
            includeBase64: true,
            ...imageOptions,
          }}
        />
      )}
    </Block>
  );
};

export default MultiImageInput;
