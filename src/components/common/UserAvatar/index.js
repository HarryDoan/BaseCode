import {Block, Image, Text, Icon} from '@components';
import React, {useState} from 'react';
import {getAbbr} from './helper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const UserAvatar = ({name = '', uri, size = 50, fontDecrease = 3}) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const _renderInner = () => {
    if (uri && !loadFailed) {
      return (
        <Image
          round={size}
          onError={() => setLoadFailed(true)}
          source={{uri}}
          resizeMode="cover"
        />
      );
    } else if (name) {
      return (
        <Text
          paddingHorizontal={5}
          numberOfLines={1}
          color="white"
          fontSize={size / fontDecrease}>
          {getAbbr(name)}
        </Text>
      );
    } else {
      return (
        <Icon
          solid
          IconType={FontAwesome5}
          iconName="user"
          iconColor="primary"
          iconSize={size / fontDecrease}
        />
      );
    }
  };

  const backgroundColor =
    uri && !loadFailed ? 'transparent' : name ? 'primary' : 'primaryTints50';

  return (
    <Block
      key={`${uri}${loadFailed}`}
      round={size}
      alignCenter
      justifyCenter
      backgroundColor={backgroundColor}>
      {_renderInner()}
    </Block>
  );
};

export default UserAvatar;
