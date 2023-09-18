import {
  Block,
  HeaderTitle,
  Icon,
  ListWrapper,
  Pressable,
  Text,
  TextInput,
} from '@components';
import React, {useEffect, useRef, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import actions from '@redux/actions';
import {Animated, StyleSheet} from 'react-native';
import {COLORS} from '@theme';
import {width, hs} from '@utils/responsive';
import {useDispatch} from 'react-redux';
import {t} from 'i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HEADER, STATUS_EVENTS} from '@constants';

const HeaderTab = ({
  data,
  title,
  status,
  autoOpenSearch,
  showTab = true,
  canGoBack,
  canSearch,
  currentTab,
  setCurrentTab,
  rightOnPress,
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const flatlistRef = useRef();
  const {top} = useSafeAreaInsets();
  const [textSearch, onChangeText] = useState('');
  const [openSearch, setOpenSearch] = useState(autoOpenSearch);
  console.log('🚀 ~ file: index.js ~ line 40 ~ openSearch', openSearch);
  const offset = new Animated.Value(0);
  const open = Animated.timing(offset, {toValue: 1, duration: 200});
  const close = Animated.timing(offset, {toValue: 0, duration: 200});
  const styles = StyleSheet.create({
    container: {
      zIndex: 99,
      top: hs(top + HEADER.height),
      right: 0,
      width: offset.interpolate({
        inputRange: [0, 1],
        outputRange: [50, width],
      }),
      opacity: offset.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      position: 'absolute',
      paddingHorizontal: hs(15),
    },
  });

  const handleOpenSearch = () => {
    open.start();
    inputRef.current?.focus?.();
  };

  useEffect(() => {
    if (openSearch) {
      Animated.timing(offset, {toValue: 1, duration: 0}).start();
      inputRef.current?.focus?.();
    }
    return () => {
      setOpenSearch(false);
    };
  }, [openSearch]);

  useEffect(() => {
    if (status) {
      let index = data.findIndex(item => item.id === status);
      setCurrentTab(status);
      flatlistRef.current.scrollToIndex({
        animated: true,
        index,
      });
    }
  }, [status, data, setCurrentTab]);

  return (
    <Block>
      <HeaderTitle
        canGoBack={canGoBack}
        title={title}
        IconRight={
          canSearch && (
            <Icon
              IconType={Fontisto}
              iconName={'search'}
              iconSize={20}
              onPress={handleOpenSearch}
              iconColor={COLORS.white}
            />
          )
        }
      />
      <Animated.View style={styles.container}>
        <Block
          flex
          radius={5}
          paddingHorizontal={10}
          justifyCenter
          rowCenter
          backgroundColor={COLORS.white}>
          <TextInput
            flex
            returnKeyType="search"
            onEndEditing={() => {
              onChangeText('');
              Animated.timing(offset, {toValue: 0, duration: 0}).start();
            }}
            onSubmitEditing={({nativeEvent}) => {
              const trimmed = nativeEvent.text.trim();
              close.start();
              dispatch({
                type: actions.GET_EVENT,
                params: {search_title: trimmed},
              });
            }}
            onChangeText={() => {
              onChangeText();
              setCurrentTab(STATUS_EVENTS.all);
            }}
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
      </Animated.View>
      {showTab && (
        <Block
          alignCenter
          paddingBottom={10}
          width={width}
          backgroundColor={COLORS.primary}>
          <Block
            row
            radius={5}
            height={40}
            padding={2}
            width={width - 30}
            backgroundColor={COLORS.white}>
            <ListWrapper
              horizontal
              data={data}
              setRef={flatlistRef}
              onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 100));
                wait.then(() => {
                  flatlistRef.current?.scrollToIndex({
                    index: info.index - 1,
                    animated: true,
                  });
                });
              }}
              renderItem={({item, index}) => (
                <Pressable
                  alignCenter
                  justifyCenter
                  radius={5}
                  width={
                    data.length > 2
                      ? (width - 34) / 3
                      : (width - 34) / data.length
                  }
                  onPress={() => {
                    setCurrentTab(item.id);
                    flatlistRef.current.scrollToIndex({
                      animated: true,
                      index:
                        index === 0 || index === data.length
                          ? index
                          : index - 1,
                    });
                  }}
                  backgroundColor={
                    item.id === currentTab
                      ? COLORS.secondary
                      : COLORS.transparent
                  }>
                  <Text
                    regular
                    fontSize={15}
                    color={
                      item.id === currentTab ? COLORS.white : COLORS.primary
                    }>
                    {item.title}
                  </Text>
                </Pressable>
              )}
            />
          </Block>
        </Block>
      )}
    </Block>
  );
};

export default HeaderTab;
