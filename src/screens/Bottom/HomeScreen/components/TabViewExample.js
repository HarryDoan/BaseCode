import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

import {COLORS} from '@theme';
import {Image} from '@components';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {fakeDataTitle} from '@utils/dataFake';
import {icons} from '@assets';
import {width} from '@utils/responsive';

const TabScreen = ({tabLabel}) => {
  const [items, setItems] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
  ]);

  return (
    <ScrollView style={styles.tabContent}>
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item}>
          <Text testID={`tab${tabLabel}-item${index}`}>{item}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const TabViewExample = ({data}) => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollViewRef = useRef(null);

  // const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  const scrollToTab = index => {
    if (scrollViewRef.current) {
      setActiveTab(index);
      scrollViewRef.current.scrollTo({
        x: index * Dimensions.get('window').width,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} l>
          <View
            style={{
              flexDirection: 'row',
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {data.map((item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    scrollToTab(index);
                  }}
                  key={item.id}
                  style={{
                    margin: 15,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    backgroundColor:
                      index == activeTab ? COLORS.secondary : 'white',
                  }}>
                  <Text
                    style={{
                      color: index == activeTab ? 'white' : COLORS.text2,
                    }}>
                    {item.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={event => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const activeIndex = Math.floor(
            offsetX / Dimensions.get('window').width,
          );
          setActiveTab(activeIndex);
        }}>
        {data.map((tab, index) => (
          <Image width={width} height={300} source={icons.ic_carousel} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  tabContent: {
    width: Dimensions.get('window').width,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  tab: {
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTab: {
    backgroundColor: 'crimson',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TabViewExample;
