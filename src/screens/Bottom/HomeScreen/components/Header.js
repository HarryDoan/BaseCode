import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Block, Icon, Notify, Pressable, StatusBar, Text} from '@components';
import {COLORS} from '@theme';
import {HEADER} from '@constants';
import {t} from 'i18next';
import {authRoot, commonRoot} from '@navigation/navigationRef';
import router from '@navigation/router';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import actions from '@redux/actions';

const Header = () => {
  const getUser = useSelector(state => state.getUser?.data);

  return (
    <Block>
      <StatusBar backgroundColor={COLORS.primary} />
      <Block
        row
        alignCenter
        spaceBetween
        height={HEADER.height}
        paddingHorizontal={15}
        backgroundColor={COLORS.primary}>
        <Text regular fontSize={14} color={COLORS.white}>
          {getUser?.full_name || (
            <Pressable
              onPress={() => {
                authRoot.navigate(router.LOGIN_SCREEN);
              }}
              height={30}
              justifyCenter
              alignCenter>
              <Text medium fontSize={14} color={COLORS.white}>
                {t('Login.login')}
              </Text>
            </Pressable>
          )}
        </Text>
        <Block rowCenter spaceBetween>
          <Pressable
            rowCenter
            radius={17}
            height={33}
            width={204}
            spaceBetween
            paddingHorizontal={10}
            marginHorizontal={10}
            backgroundColor={COLORS.white}
            onPress={() => {
              commonRoot.navigate(router.EVENT_LIST_SCREEN, {search: true});
            }}>
            <Text regular fontSize={14} color={COLORS.placeholder}>
              {t('HomeScreen.search_event')}
            </Text>
            <Icon
              IconType={Fontisto}
              iconName={'search'}
              iconSize={15}
              iconColor={COLORS.placeholder}
            />
          </Pressable>
          <Notify />
        </Block>
      </Block>
    </Block>
  );
};

export default Header;
