import {Block, Icon, Pressable, TextInput} from '@components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {commonRoot, root} from '@navigation/navigationRef';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {COLORS} from '@theme';
import React, {useEffect, useRef} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import router from '@navigation/router';

const HeaderSearch = ({
  textSearch,
  onChangeText,
  canGoBack,
  IconRight,
  rightOnPress,
  colorIcon,
  color = 'white',
}) => {
  const inputRef = useRef();
  const {top} = useSafeAreaInsets();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current?.focus?.();
  }, []);

  return (
    <Block
      row
      alignCenter
      spaceBetween
      paddingBottom={7}
      backgroundColor={COLORS.primary}
      paddingTop={top}
      paddingHorizontal={15}>
      {canGoBack && (
        <Pressable onPress={root.goBack} paddingRight={10} paddingVertical={10}>
          <Icon
            IconType={Ionicons}
            iconName="chevron-back"
            iconSize={30}
            color={colorIcon || color}
          />
        </Pressable>
      )}

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
              // dispatch({type: actions.HIDE_MODAL_SEARCH});
              commonRoot.navigate(router.EVENT_LIST_SCREEN, {
                keyword: trimmed,
              });
            }
          }}
          onChangeText={onChangeText}
          setRef={r => (inputRef.current = r)}
          value={textSearch}
          height={40}
          placeholder={t('HomeScreen.search_event')}
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
          <Icon
            IconType={Fontisto}
            iconName={'search'}
            iconSize={15}
            iconColor={COLORS.placeholder}
          />
        )}
      </Block>
    </Block>
  );
};

export default HeaderSearch;
