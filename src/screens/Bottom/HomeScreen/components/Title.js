import {Block, Icon, Image, Text} from '@components';

import {COLORS} from '@theme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import React from 'react';
import {commonRoot} from '@navigation/navigationRef';
import {icons} from '@assets';
import router from '@navigation/router';
import {t} from 'i18next';

const Title = ({canShowAll, title, status, idx, ...props}) => {
  return (
    <Block rowCenter spaceBetween padding={15} {...props}>
      <Block rowCenter>
        <Image marginRight={5} square={15} source={icons?.ic_incoming} />
        <Text
          marginRight={5}
          medium
          uppercase
          fontSize={16}
          color={COLORS.primary}>
          {title}
        </Text>
        {(idx === 1 || idx === 2) && (
          <Block
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            borderBottomRightRadius={5}
            width={82}
            height={20}
            justifyCenter
            alignCenter
            backgroundColor={idx === 1 ? COLORS.red : COLORS.green}>
            <Text color={COLORS.white} fontSize={12}>
              {idx === 1 ? 'Coming Soon' : 'Check In Now'}
            </Text>
          </Block>
        )}
      </Block>
      {canShowAll && (
        <Text
          regular
          fontSize={15}
          color={COLORS.secondary}
          onPress={() => {
            commonRoot.navigate(router.EVENT_LIST_SCREEN, {status});
          }}>
          {t('Common.showAll')}
        </Text>
      )}
    </Block>
  );
};

export default Title;
