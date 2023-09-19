import {ScrollView, Text, View} from 'react-native';

import {COLORS} from '@theme';
import {Pressable} from '@components';
import React from 'react';
import {fakeDataTitle} from '@utils/dataFake';

const HorizontalScrollItem = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} l>
        <View
          style={{
            flexDirection: 'row',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {fakeDataTitle.map((item, index) => {
            return (
              <Pressable
                key={item.id}
                style={{
                  margin: 15,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    color: COLORS.text2,
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

export default HorizontalScrollItem;
