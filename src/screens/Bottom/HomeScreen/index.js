import {Block, Carousel} from '@components';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import Header from './components/Header';
import HorizontalScroll from './components/HorizontalScroll';
import HorizontalScrollItem from './components/HorizontalScrollItem';
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <TabViewExample />
        <HorizontalScroll />
        <HorizontalScrollItem />
        <HorizontalScrollItem />

        <Block height={100} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
