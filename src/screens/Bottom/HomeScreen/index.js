import {SafeAreaView, Text, View} from 'react-native';

import {Carousel} from '@components';
import Header from './components/Header';
import HorizontalScroll from './components/HorizontalScroll';
import React from 'react';
import TabViewExample from './components/TabViewExample';
import {icons} from '@assets';

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#EAEFF2',
        paddingVertical: 10,
      }}>
      <Header />
      <TabViewExample />
      <HorizontalScroll />
    </SafeAreaView>
  );
};

export default HomeScreen;
