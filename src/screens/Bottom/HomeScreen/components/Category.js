import {Block, Image, Pressable, Text} from '@components';
import {IMAGES, icons} from '@assets';
import {authRoot, bottomRoot, commonRoot} from '@navigation/navigationRef';

import {COLORS} from '@theme';
import {ImageBackground} from 'react-native';
import React from 'react';
import router from '@navigation/router';
import {t} from 'i18next';
import {useSelector} from 'react-redux';

const Category = () => {
  const userPoints = React.useState(
    useSelector(p => p.getUser?.data?.point_wallet) || 0,
  );
  const userToken = useSelector(u => u.user?.userToken);
  return (
    <Block padding={15}>
      <ImageBackground
        source={IMAGE?.img_bg_category}
        resizeMode={'cover'}
        style={{
          flexDirection: 'row',
          paddingVertical: 15,
          width: '100%',
          height: 87,
        }}>
        <Pressable
          flex
          alignCenter
          justifyCenter
          radius={5}
          onPress={() => {
            commonRoot.navigate(router.EVENT_LIST_SCREEN);
          }}>
          <Image source={icons?.ic_category_home01} width={31} height={31} />
          <Text regular fontSize={15} color={COLORS.white}>
            {t('Common.event')}
          </Text>
        </Pressable>
        <Block width={0.5} backgroundColor={COLORS.white} opacity={0.5} />
        <Pressable
          flex
          alignCenter
          justifyCenter
          borderColor={COLORS.white}
          onPress={() => {
            userToken !== null
              ? bottomRoot.navigate(router.MEMBER_SCREEN)
              : authRoot.navigate(router.LOGIN_SCREEN);
          }}>
          <Image source={icons?.ic_category_home02} width={31} height={31} />
          <Text center regular fontSize={15} color={COLORS.white}>
            {t('HomeScreen.points_accumulated')}
          </Text>
          <Text center regular fontSize={12} color={COLORS.white}>
            {userPoints || 0} {t('MemberScreen.point')}
          </Text>
        </Pressable>
        <Block width={0.5} backgroundColor={COLORS.white} opacity={0.5} />
        <Pressable
          flex
          alignCenter
          justifyCenter
          radius={5}
          onPress={() => {
            userToken !== null
              ? commonRoot.navigate(router.EVENT_LIST_SCREEN, {
                  checkedIn: true,
                })
              : authRoot.navigate(router.LOGIN_SCREEN);
          }}>
          <Image source={icons?.ic_category_home03} width={31} height={31} />
          <Text regular fontSize={15} color={COLORS.white}>
            {t('HomeScreen.history')}
          </Text>
        </Pressable>
      </ImageBackground>
    </Block>
  );
};

export default Category;
