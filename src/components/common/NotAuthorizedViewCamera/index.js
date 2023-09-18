import {Block, Pressable, Text} from '@components';
import {COLORS} from '@theme';
import React from 'react';
import {Alert, Linking, Platform} from 'react-native';
import RNRestart from 'react-native-restart';

const NotAuthorizedViewCamera = () => {
  const onContinue = () => {
    Alert.alert(
      'Tính năng này yêu cầu truy cập camera',
      Platform.OS === 'ios'
        ? 'Trong cài đặt iPhone, nhấn vào Ruby và bật Camera'
        : 'Nhấp vào Mở cài đặt và kích hoạt Camera bên dưới menu Quyền',
      [
        {
          text: 'Lúc khác',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Mở cài đặt',
          onPress: () => {
            Linking.openSettings();
            RNRestart.Restart();
          },
        },
      ],
    );
  };

  return (
    <Block flex alignCenter backgroundColor={COLORS.white} justifyCenter>
      <Text fontSize={26} center marginHorizontal={35} bold>
        {
          'Để chụp ảnh và quay video, chúng tôi cần quyền truy cập đến camera trên thiết bị của bạn'
        }
      </Text>
      <Text center marginHorizontal={35} marginTop={5} color={COLORS.gray}>
        {
          'Như vậy bạn có thể thực hiện được những việc như quét mã QR ,thay đổi ảnh đại diện'
        }
      </Text>
      <Pressable
        marginTop={15}
        radius={25}
        onPress={onContinue}
        paddingHorizontal={20}
        paddingVertical={10}
        backgroundColor={COLORS.primary}>
        <Text color={COLORS.white} semiBold>
          {'Tiếp tục'}
        </Text>
      </Pressable>
    </Block>
  );
};

export default NotAuthorizedViewCamera;
