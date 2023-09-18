import {Block, Image, Pressable, Text} from '@components';
import {commonRoot} from '@navigation/navigationRef';
import router from '@navigation/router';
import actions from '@redux/actions';
import {COLORS} from '@theme';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

const TopSearch = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const getTopSearch = useSelector(state => state.getTopSearch.data);

  return (
    <Block backgroundColor={COLORS.white} marginHorizontal={15}>
      <Text
        fontSize={16}
        bold
        color={COLORS.backgroundVoucher}
        marginVertical={10}>
        {t('homeScreen.topHotSearch')}
      </Text>

      <Block wrap row spaceBetween>
        {getTopSearch?.map((item, index) => {
          return (
            <Pressable
              onPress={() => {
                dispatch({type: actions.HIDE_MODAL_SEARCH});
                commonRoot.navigate(router.LIST_PRODUCT_SEARCH_SCREEN, {
                  keyword: item.title,
                  group_id: item.group_id,
                });
              }}
              key={item.id}
              marginBottom={10}
              alignCenter
              row
              width={'50%'}>
              <Image
                radius={3}
                marginRight={10}
                width={68}
                height={55}
                source={{uri: item.picture}}
                resizeMode="cover"
              />
              <Text
                flex
                numberOfLines={2}
                fontSize={14}
                regular
                color={COLORS.text}>
                {item.title}
              </Text>
            </Pressable>
          );
        })}
      </Block>
    </Block>
  );
};

export default TopSearch;
