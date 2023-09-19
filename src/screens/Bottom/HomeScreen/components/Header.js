import {Block, Image} from '@components';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

import {icons} from '@assets';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${searchText}`);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,

        borderRadius: 5,
        width: '85%',
        paddingHorizontal: 25,
        marginVertical: 15,
        height: 45,
        // borderWidth: 1,
      }}>
      <TextInput
        // placeholder="Search"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        style={{
          paddingHorizontal: 10,
          width: '100%',
          height: 45,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 10,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 45,
          borderRadius: 5,
          paddingHorizontal: 10,
          backgroundColor: 'white',
        }}
        onPress={handleSearch}>
        <Image square={22} source={icons.ic_search} />

        <Image square={22} source={icons.ic_camera} />
      </View>
      <Block absolute left={75}>
        <Text
          style={{
            fontSize: 13,
          }}>
          Wines & Spirits Wines & Spirits dsa
        </Text>
      </Block>
      <Image absolute right={-50} top={2} square={50} source={icons.ic_heart} />
    </View>
  );
};

export default SearchBar;
