import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {auth} from '@screens/Auth';
import React from 'react';
import router from './router';

const CommonStack = createNativeStackNavigator();

const AuthContainer = () => {
  return (
    <CommonStack.Navigator screenOptions={{headerShown: false}}>
      <CommonStack.Screen
        name={router.ONBOARDING_SCREEN}
        component={auth[router.ONBOARDING_SCREEN]}
      />
      <CommonStack.Screen
        name={router.LOGIN_SCREEN}
        component={auth[router.LOGIN_SCREEN]}
      />
      <CommonStack.Screen
        name={router.REGISTER_SCREEN}
        component={auth[router.REGISTER_SCREEN]}
      />
      <CommonStack.Screen
        name={router.FORGET_PASSWORD_SCREEN}
        component={auth[router.FORGET_PASSWORD_SCREEN]}
      />
    </CommonStack.Navigator>
  );
};

export default AuthContainer;
