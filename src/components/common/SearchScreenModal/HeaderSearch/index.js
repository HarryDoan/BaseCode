import {Block, Icon, Image, Pressable, TextInput} from '@components';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS} from '@theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import actions from '@redux/actions';
import {commonRoot} from '@navigation/navigationRef';
import {icons} from '@assets';
import router from '@navigation/router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

const HeaderSearch = ({textSearch, onChangeText}) => {
  const inputRef = useRef();
  const {top} = useSafeAreaInsets();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const department = useSelector(state => state.modalSearch.department);

  useEffect(() => {
    inputRef.current?.focus?.();
  }, []);

  return (
    <LinearGradient
      colors={COLORS.gradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{paddingTop: top}}>
      <Block
        row
        alignCenter
        spaceBetween
        paddingBottom={7}
        paddingHorizontal={15}>
        <Pressable
          paddingRight={20}
          paddingVertical={10}
          alignCenter
          onPress={() => dispatch({type: actions.HIDE_MODAL_SEARCH})}>
          <Image
            source={icons?.ic_arrow_change_screen}
            width={17.5}
            height={17.5}
          />
        </Pressable>
        <Block
          flex
          radius={5}
          paddingHorizontal={10}
          justifyCenter
          rowCenter
          backgroundColor={'white'}>
          <TextInput
            flex
            returnKeyType="search"
            onSubmitEditing={({nativeEvent}) => {
              const trimmed = nativeEvent.text.trim();
              if (trimmed) {
                dispatch({type: actions.HIDE_MODAL_SEARCH});
                commonRoot.navigate(router.LIST_PRODUCT_SEARCH_SCREEN, {
                  keyword: trimmed,
                  department_id: department?.item_id,
                });
              }
            }}
            onChangeText={onChangeText}
            setRef={r => (inputRef.current = r)}
            value={textSearch}
            height={40}
            placeholder={
              department
                ? t('SearchScreen.search_shop_placeholder', {
                    shop_name: department.title,
                  })
                : t('homeScreen.placeholder')
            }
            placeholderTextColor={COLORS.placeholder}
          />
          {textSearch?.length > 0 ? (
            <Pressable onPress={() => onChangeText('')}>
              <Icon
                IconType={Ionicons}
                iconName="close-circle"
                iconSize={20}
                color={COLORS.lightGray}
              />
            </Pressable>
          ) : (
            <Image source={icons?.ic_search} height={16} width={16} />
          )}
        </Block>
      </Block>
    </LinearGradient>
  );
};

export default HeaderSearch;
