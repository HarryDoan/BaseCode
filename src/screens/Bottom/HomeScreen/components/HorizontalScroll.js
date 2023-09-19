import {Image, Pressable} from '@components';
import {ScrollView, Text, View} from 'react-native';
import {fakeDataTitle} from '@utils/dataFake';

import {COLORS} from '@theme';
import React from 'react';

const HorizontalScroll = ({data}) => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} l>
        <View
          style={{
            marginTop: -15,
            flexDirection: 'row',
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {data.map((item, index) => {
            return (
              <Pressable
                key={item.id}
                style={{
                  margin: 10,
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <Image
                  radius={15}
                  resizeMode="cover"
                  square={60}
                  source={item.icon}
                />
                <Text
                  style={{
                    color: COLORS.secondary,
                    fontSize: 13,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default HorizontalScroll;
