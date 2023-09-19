import {Block, Image, Pressable} from '@components';
import {IMAGES, icons} from '@assets';
import {ScrollView, Text, View} from 'react-native';
import {fakeDataTitle, fakeDataTitle1} from '@utils/dataFake';

import {COLORS} from '@theme';
import React from 'react';
import {width} from '@utils/responsive';

const HorizontalScrollItem = () => {
  return (
    <View>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.black,
            marginBottom: 10,
          }}>
          Featured Brands
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {fakeDataTitle1.map((item, index) => (
          <Block
            row
            wrap
            key={index}
            style={{
              width: '100%',
              marginRight: 15,
            }}>
            {item?.data?.map((item, index) => (
              <Block
                key={item.id}
                style={{
                  marginLeft: 6,
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}>
                <Image
                  radius={5}
                  resizeMode="stretch"
                  width={width / 3.5}
                  height={125}
                  source={IMAGES.img_1}
                />
                <Image
                  radius={5}
                  resizeMode="stretch"
                  width={width / 3.5}
                  height={125}
                  source={IMAGES.img_1}
                />
                <Image
                  radius={5}
                  resizeMode="stretch"
                  width={width / 3.5}
                  height={125}
                  source={IMAGES.img_1}
                />
              </Block>
            ))}
          </Block>
        ))}
      </ScrollView>
    </View>
  );
};

export default HorizontalScrollItem;
