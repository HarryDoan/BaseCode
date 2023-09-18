import {Block, Icon, Image, Text} from '@components';

import {COLORS} from '@theme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import React from 'react';
import {commonRoot} from '@navigation/navigationRef';
import {icons} from '@assets';
import router from '@navigation/router';
import {t} from 'i18next';

const Title = ({canShowAll, title, status, ...props}) => {
  return (
    <Block rowCenter spaceBetween padding={15} {...props}>
      <Block rowCenter>
        <Image marginRight={5} square={15} source={icons?.ic_setting} />
        <Text medium uppercase fontSize={16} color={COLORS.primary}>
          {title}
        </Text>
      </Block>
    </Block>
  );
};

export default Title;
