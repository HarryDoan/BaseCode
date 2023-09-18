import {Block, Image, Pressable, Text} from '@components';
import {authRoot, commonRoot} from './navigationRef';

import {COLORS} from '@theme';
import {Platform} from 'react-native';
import React from 'react';
import {bottom} from '@screens/Bottom';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {icons} from '@assets';
import router from './router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const TabStack = createBottomTabNavigator();

const CustomTabBar = ({state, navigation}) => {
  const bottomHeight = useSafeAreaInsets().bottom;
  const {t} = useTranslation();
  const userToken = useSelector(user => user.user?.userToken);

  return (
    <Block>
      <Block row backgroundColor={COLORS.white} shadow4>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            navigation.navigate({name: route.name, merge: true});
          };
          const iconsSource = {
            [router.HOME_SCREEN]: icons?.ic_home,
            [router.EVENT_SCREEN]: icons?.ic_event,
            [router.UTILITY_SCREEN]: icons?.ic_utility,
            [router.MEMBER_SCREEN]: icons?.ic_member,
          };
          const iconsSourceFocus = {
            [router.HOME_SCREEN]: icons?.ic_home_focus,
            [router.EVENT_SCREEN]: icons?.ic_event_focus,
            [router.UTILITY_SCREEN]: icons?.ic_utility_focus,
            [router.MEMBER_SCREEN]: icons?.ic_member_focus,
          };
          const labels = {
            [router.HOME_SCREEN]: t('BottomTab.home'),
            [router.EVENT_SCREEN]: t('BottomTab.event'),
            [router.UTILITY_SCREEN]: t('BottomTab.utility'),
            [router.MEMBER_SCREEN]: t('BottomTab.member'),
          };
          return isFocused ? (
            <Block flex alignCenter backgroundColor={COLORS.white} key={index}>
              <Image
                source={iconsSourceFocus[route.name]}
                square={22}
                marginVertical={10}
              />
              <Text marginTop={-5} color={COLORS.secondary} fontSize={12}>
                {labels[route.name]}
              </Text>
            </Block>
          ) : (
            <Pressable
              key={index}
              onPress={onPress}
              flex
              alignCenter
              justifyCenter
              backgroundColor={COLORS.white}>
              <Image
                source={iconsSource[route.name]}
                square={22}
                marginVertical={10}
              />
              <Text marginTop={-5} fontSize={12}>
                {labels[route.name]}
              </Text>
            </Pressable>
          );
        })}
      </Block>
      <Block
        paddingBottom={
          Platform.OS === 'ios' ? bottomHeight + 5 : bottomHeight + 15
        }
        backgroundColor={COLORS.white}
      />
    </Block>
  );
};

const BottomContainer = () => {
  const bottomHeight = useSafeAreaInsets().bottom;
  const userToken = useSelector(user => user.user?.userToken);

  return (
    <Block flex backgroundColor={'white'}>
      <TabStack.Navigator
        initialRouteName={router.HOME_SCREEN}
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
        })}>
        <TabStack.Screen
          name={router.HOME_SCREEN}
          component={bottom[router.HOME_SCREEN]}
        />
        <TabStack.Screen
          name={router.EVENT_SCREEN}
          component={bottom[router.EVENT_SCREEN]}
        />
        <TabStack.Screen
          name={router.UTILITY_SCREEN}
          component={bottom[router.UTILITY_SCREEN]}
        />
        <TabStack.Screen
          name={router.MEMBER_SCREEN}
          component={bottom[router.MEMBER_SCREEN]}
        />
      </TabStack.Navigator>
    </Block>
  );
};
export default BottomContainer;
