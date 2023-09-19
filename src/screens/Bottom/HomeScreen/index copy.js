import {Block, Image} from '@components';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {fakeAPI1, fakeAPI2, fakeAPI3} from '@utils/dataFake';

import DnDLikeIOS from 'react-native-dnd-like-ios';

const {width, height} = Dimensions.get('window');

const users = [
  {name: 'Name_No1'},
  {name: 'Name_No2'},
  {name: 'Name_No3'},
  {name: 'Name_No4'},
  {name: 'Name_No5'},
  {name: 'Name_No6'},
  {name: 'Name_No7'},
];

const _renderItem = (item, index) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{item?.name}</Text>
    </View>
  );
};
{
  /* <DnDLikeIOS
        parentWidth={width}
        parentHeight={height}
        Item={_renderItem}
        data={users}
        setNewDataSource={setNewData}
      /> */
}
const order = [1, 2, 3];

const HomeScreen = () => {
  const [newData, setNewData] = useState([]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#9CD7CB',
        alignItems: 'center',
      }}>
      {order?.map(item => {
        return (
          <View style={styles.container}>
            {item == 1 &&
              fakeAPI1?.map((item, index) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 30,
                    }}>
                    {item?.component ? item.component : <Text>12313</Text>}
                    <Block style={{width: 100, height: 100}}>
                      <Image
                        source={{
                          uri: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
                        }}
                        style={{width: 100, height: 100}}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        {item?.content}
                      </Text>
                    </Block>
                  </View>
                );
              })}
            {item == 2 &&
              fakeAPI2?.map((item, index) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 30,
                    }}>
                    {item?.component ? item.component : <Text>12313</Text>}
                    <Block style={{width: 100, height: 100}}>
                      <Image
                        source={{
                          uri: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
                        }}
                        style={{width: 100, height: 100}}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        {item?.content}
                      </Text>
                    </Block>
                  </View>
                );
              })}
            {item == 3 &&
              fakeAPI3?.map((item, index) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {item?.component ? item.component : <Text>12313</Text>}
                    <Block style={{width: 100, height: 100}}>
                      <Image
                        source={{
                          uri: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
                        }}
                        style={{width: 100, height: 100}}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        {item?.content}
                      </Text>
                    </Block>
                  </View>
                );
              })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9CD7CB',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

export default HomeScreen;
