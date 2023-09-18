import {Block, Icon} from '@components';
import {SIZES} from '@theme';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomInputErr = ({renderInputErr}) => {
  return (
    <Block rowCenter>
      <Icon
        IconType={MaterialIcons}
        iconName="error"
        iconColor="red"
        iconSize={13}
        marginRight={SIZES.normal}
        marginTop={SIZES.normal}
      />
      {renderInputErr()}
    </Block>
  );
};

export default CustomInputErr;
