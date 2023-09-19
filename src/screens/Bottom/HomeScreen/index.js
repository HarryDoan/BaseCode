import {Block, Carousel} from '@components';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import Header from './components/Header';
import HorizontalScroll from './components/HorizontalScroll';
import HorizontalScrollImage from './components/HorizontalScrollImage';
import React from 'react';
import TabViewExample from './components/TabViewExample';
import {IMAGES, icons} from '@assets';
import {useState} from 'react';
import {height} from '@utils/responsive';

const fakeDataTitle = [
  {
    id: 1,
    icon: icons.ic_1,
    title: 'Wines & Spirits',
  },
  {
    id: 2,
    icon: icons.ic_2,
    title: 'Beauty',
  },
  {
    id: 3,
    icon: icons.ic_3,
    title: 'Electronics',
  },
  {
    id: 4,
    icon: icons.ic_4,
    title: 'Fashion',
  },
  {
    id: 5,
    icon: icons.ic_5,
    title: 'Food',
  },
];
const fakeDataHorizontalItems = [
  {
    id: 1,
    icon: icons.ic_1,
    title: 'iShopCurates',
  },
  {
    id: 2,
    icon: icons.ic_2,
    title: 'Gift Sets',
  },
  {
    id: 3,
    icon: icons.ic_3,
    title: 'Earn rewards',
  },
  {
    id: 4,
    icon: icons.ic_4,
    title: 'GoLocal',
  },
  {
    id: 5,
    icon: icons.ic_5,
    title: 'Influencer',
  },
];
const fakeDataImage1 = [
  {
    id: 1,

    title: 'Wines & Spirits',
    data: [
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_1,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_2,
      },
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_3,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_3,
      },
    ],
  },
  {
    id: 2,

    title: 'Wines & Spirits',
    data: [
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_1,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_2,
      },
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_3,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_3,
      },
    ],
  },
];

const fakeDataImage2 = [
  {
    id: 1,

    title: 'Wines & Spirits',
    data: [
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_1,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_2,
      },
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_3,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_3,
      },
    ],
  },
  {
    id: 2,

    title: 'Wines & Spirits',
    data: [
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_1,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_2,
      },
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_3,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_3,
      },
    ],
  },
];

const fakeDataImage3 = [
  {
    id: 1,

    title: 'Wines & Spirits',
    data: [
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_1,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_2,
      },
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_3,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_3,
      },
    ],
  },
  {
    id: 2,

    title: 'Wines & Spirits',
    data: [
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_1,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_2,
      },
      {
        id: 1,
        title: 'Wines & Spirits',
        img: IMAGES.img_3,
      },
      {
        id: 2,
        title: 'Beauty',
        img: IMAGES.img_3,
      },
    ],
  },
];

const HomeScreen = () => {
  const [listOrder, setListOrder] = useState([
    'Header',
    'TabViewExample',
    'HorizontalScrollImage1',
    'HorizontalScrollImage2',
    'HorizontalScrollImage3',
    'HorizontalScrollImage4',
  ]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#EAEFF2',
        paddingVertical: 10,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {listOrder?.map((item, index) => {
          return (
            <View>
              {item == 'Header' && <Header />}

              {item == 'TabViewExample' && (
                <TabViewExample data={fakeDataTitle} />
              )}
              {item == 'HorizontalScrollImage1' && (
                <HorizontalScroll data={fakeDataHorizontalItems} />
              )}
              {item == 'HorizontalScrollImage2' && (
                <HorizontalScrollImage data={fakeDataImage1} />
              )}
              {item == 'HorizontalScrollImage3' && (
                <HorizontalScrollImage data={fakeDataImage2} />
              )}
              {item == 'HorizontalScrollImage4' && (
                <HorizontalScrollImage data={fakeDataImage3} />
              )}
            </View>
          );
        })}

        <Block height={height * 0.2} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
