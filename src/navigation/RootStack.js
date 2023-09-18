import AuthContainer from './AuthContainer';
import BottomContainer from './BottomTabNavigation';
import CommonContainer from './CommonContainer';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './navigationRef';
import router from './router';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

export default function MainContainer() {
  const isFirstOpenApp = useSelector(state => state?.other?.isFirstOpenApp);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name={router.BOTTOM_CONTAINER}
          component={BottomContainer}
        />
        <Stack.Screen
          name={router.COMMON_CONTAINER}
          component={CommonContainer}
        />

        <Stack.Screen name={router.AUTH_CONTAINER} component={AuthContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
