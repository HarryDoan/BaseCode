import React from 'react';
import {common} from '@screens/Common';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import router from './router';

const CommonStack = createNativeStackNavigator();

const CommonContainer = () => {
  return (
    <CommonStack.Navigator screenOptions={{headerShown: false}}>
      {/* <CommonStack.Screen
        name={router.EVENT_LIST_SCREEN}
        component={common[router.EVENT_LIST_SCREEN]}
      /> */}
    </CommonStack.Navigator>
  );
};

export default CommonContainer;
