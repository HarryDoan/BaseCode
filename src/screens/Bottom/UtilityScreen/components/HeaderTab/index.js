import {
  Block,
  HeaderTitle,
  Icon,
  ListWrapper,
  Pressable,
  Text,
} from '@components';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS} from '@theme';
import {width} from '@utils/responsive';
import React, {useEffect, useRef} from 'react';

const HeaderTab = ({
  data,
  title,
  status,
  showTab = true,
  canGoBack,
  canSearch,
  currentTab,
  setCurrentTab,
}) => {
  const flatlistRef = useRef();
  useEffect(() => {
    if (status) {
      let index = data.findIndex(item => item.group_id === status);
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
              iconColor={COLORS.white}
            />
          )
        }
      />
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
                  marginRight={10}
                  justifyCenter
                  radius={5}
                  width={width / 3 + 10}
                  onPress={() => {
                    setCurrentTab(item?.group_id);
                    flatlistRef.current.scrollToIndex({
                      animated: true,
                      index:
                        index === 0 || index === data.length
                          ? index
                          : index - 1,
                    });
                  }}
                  backgroundColor={
                    item?.group_id === currentTab
                      ? COLORS.secondary
                      : COLORS.transparent
                  }>
                  <Text
                    regular
                    fontSize={15}
                    color={
                      item.group_id === currentTab
                        ? COLORS.white
                        : COLORS.primary
                    }>
                    {item?.title}
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
