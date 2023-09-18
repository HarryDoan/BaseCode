import {Block, Icon, Image, Pressable, Text} from '@components';
import React, {useState} from 'react';
import {getAppleProfile, getFacebookProfile, getGoogleProfile} from './helper';
import {useCustomToast, useDeviceName, useFCMToken} from '@hooks';

import {ActivityIndicator} from 'react-native';
import {COLORS} from '@theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import actions from '@redux/actions';
import {authRoot} from '@navigation/navigationRef';
import {icons} from '@assets';
import router from '@navigation/router';
import {throttle} from '@utils/helper';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

const SocialLoginButtons = ({containterProps, textColor = COLORS.white}) => {
  const [isLoading, setLoading] = useState(false);
  const {toastFail} = useCustomToast();
  const dispatch = useDispatch();
  const device_name = useDeviceName();
  const device_token = useFCMToken();
  const {t} = useTranslation();

  const handleFacebook = async () => {
    // try {
    //   setLoading(true);
    //   const profile = await getFacebookProfile();
    //   if (profile.id && profile.email) {
    //     const isNewUser = await checkEmail(profile.email);
    //     if (isNewUser) {
    //       authRoot.navigate(router.REGISTER_SCREEN, {
    //         socialEmail: profile.email,
    //         fb_id: profile.id,
    //       });
    //       setLoading(false);
    //     } else {
    //       dispatch({
    //         type: actions.LOGIN_USER,
    //         body: {
    //           username: profile.email,
    //           device_token,
    //           device_name,
    //           fb_id: profile.id,
    //         },
    //         onFail(e) {
    //           setLoading(false);
    //           toastFail(e);
    //         },
    //       });
    //     }
    //   } else {
    //     setLoading(false);
    //     toastFail('Thông tin tài khoản facebook không đúng');
    //   }
    // } catch (error) {
    //   toastFail('Đã có lỗi xảy ra');
    //   setLoading(false);
    // }
  };

  const handleGoogle = async () => {
    // try {
    //   setLoading(true);
    //   const profile = await getGoogleProfile();
    //   if (profile.id && profile.email) {
    //     const isNewUser = await checkEmail(profile.email);
    //     if (isNewUser) {
    //       authRoot.navigate(router.REGISTER_SCREEN, {
    //         socialEmail: profile.email,
    //         gg_id: profile.id,
    //       });
    //       setLoading(false);
    //     } else {
    //       dispatch({
    //         type: actions.LOGIN_USER,
    //         body: {
    //           username: profile.email,
    //           device_token,
    //           device_name,
    //           gg_id: profile.id,
    //         },
    //         onFail(e) {
    //           setLoading(false);
    //           toastFail(e);
    //         },
    //       });
    //     }
    //   } else {
    //     setLoading(false);
    //     toastFail('Thông tin tài khoản google không đúng');
    //   }
    // } catch (error) {
    //   toastFail('Đã có lỗi xảy ra');
    //   setLoading(false);
    // }
  };

  const handleApple = async () => {
    // try {
    //   setLoading(true);
    //   const profile = await getAppleProfile();
    //   if (profile.sub && profile.email) {
    //     const isNewUser = await checkEmail(profile.email);
    //     if (isNewUser) {
    //       authRoot.navigate(router.REGISTER_SCREEN, {
    //         socialEmail: profile.email,
    //         ap_id: profile.sub,
    //       });
    //       setLoading(false);
    //     } else {
    //       dispatch({
    //         type: actions.LOGIN_USER,
    //         body: {
    //           username: profile.email,
    //           device_token,
    //           device_name,
    //           ap_id: profile.sub,
    //         },
    //         onFail(e) {
    //           setLoading(false);
    //           toastFail(e);
    //         },
    //       });
    //     }
    //   } else {
    //     setLoading(false);
    //     toastFail('Thông tin tài khoản apple không đúng');
    //   }
    // } catch (error) {
    //   toastFail('Đã có lỗi xảy ra');
    //   setLoading(false);
    // }
  };

  const checkEmail = email => {
    return new Promise(resolve => {
      dispatch({
        type: actions.CHECK_EMAIL,
        params: {email},
        onSuccess: () => {
          resolve(true);
        },
        onFail: () => {
          resolve(false);
        },
      });
    });
  };

  return (
    <Block {...containterProps} alignCenter>
      <Text regular fontSize={16} light marginTop={15}>
        {t('Login.login_social')}
      </Text>
      {isLoading ? (
        <Block padding={20}>
          <ActivityIndicator size={'small'} color={COLORS.red} />
        </Block>
      ) : (
        <Block justifyCenter rowCenter marginTop={15}>
          <Pressable>
            <Icon
              IconType={MaterialCommunityIcons}
              iconSize={40}
              iconName="facebook"
              iconColor={COLORS.blueFacebook}
            />
          </Pressable>
          <Pressable
            round={35}
            backgroundColor={COLORS.whiteGray}
            alignCenter
            justifyCenter
            marginHorizontal={15}
            onPress={throttle(handleGoogle)}>
            <Image source={icons?.ic_gmail} width={30} height={21} />
          </Pressable>
          <Pressable
            round={35}
            backgroundColor={COLORS.whiteGray}
            alignCenter
            justifyCenter
            onPress={throttle(handleApple)}>
            <Icon
              IconType={MaterialCommunityIcons}
              iconSize={28}
              iconName="apple"
              iconColor={COLORS.black}
            />
          </Pressable>
        </Block>
      )}
    </Block>
  );
};

export default SocialLoginButtons;
