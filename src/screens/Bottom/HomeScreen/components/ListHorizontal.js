import {Block, Icon, Image, ListWrapper, Pressable, Text} from '@components';
import {IMAGES, icons} from '@assets';
import {authRoot, commonRoot} from '@navigation/navigationRef';

import {COLORS} from '@theme';
import Entypo from 'react-native-vector-icons/Entypo';
import {ImageBackground} from 'react-native';
import React from 'react';
import {STATUS_EVENTS} from '@constants';
import Title from './Title';
import router from '@navigation/router';
import {useSelector} from 'react-redux';

const ListHorizontal = ({data, status, title, idx, ...props}) => {
  const user = useSelector(state => state.user?.userToken);
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        shadow3
        width={254}
        height={323}
        marginRight={15}
        borderTopRadius={5}
        marginBottom={10}
        onPress={() => {
          if (!user) {
            authRoot.navigate(router.LOGIN_SCREEN);
          } else {
            commonRoot.navigate(router.EVENT_DETAIL_SCREEN, {
              data: item.item_id,
            });
          }
        }}
        marginLeft={index === 0 ? 15 : 0}>
        <Block relative>
          <Image
            source={
              item?.picture
                ? {uri: item?.picture}
                : IMAGE?.img_event_coming_soon01
            }
            width={'100%'}
            height={177}
            resizeMode={'cover'}
          />
          <ImageBackground
            style={{
              left: -6,
              bottom: 10,
              width: 100,
              height: 33.5,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
            }}
            source={
              item?.status === STATUS_EVENTS.upcoming
                ? icons?.ic_tag_coming_soon
                : icons?.ic_tag_ongoing
            }>
            <Text regular fontSize={14} translateY={3} color={COLORS.white}>
              {item?.status_text}
            </Text>
          </ImageBackground>
          <Block
            absolute
            alignCenter
            justifyCenter
            right={10}
            bottom={10}
            round={27}
            backgroundColor={COLORS.green5}>
            <Text medium fontSize={14} color={COLORS.white}>
              +{item?.point}
            </Text>
          </Block>
        </Block>
        <Block
          alignCenter
          height={146}
          overflow={'hidden'}
          paddingVertical={15}
          paddingHorizontal={10}
          borderBottomRadius={5}
          backgroundColor={COLORS.white}>
          <Text
            center
            semiBold
            uppercase
            fontSize={18}
            lineHeight={22}
            numberOfLines={2}
            color={COLORS.primary}>
            {item?.title}
          </Text>
          <Text
            numberOfLines={2}
            regular
            fontSize={14}
            lineHeight={20}
            marginTop={5}
            color={COLORS.placeholder}>
            {item?.short}
          </Text>
          <Block absolute bottom={15} row spaceBetween width={'100%'}>
            <Text regular fontSize={14} color={COLORS.secondary}>
              {item?.date_start}
            </Text>
            <Block row>
              <Icon
                IconType={Entypo}
                iconColor={COLORS.text2}
                iconSize={15}
                iconName={'location-pin'}
                marginRight={5}
              />
              <Text regular fontSize={14} color={COLORS.text2}>
                {item?.province}
              </Text>
            </Block>
          </Block>
        </Block>
      </Pressable>
    );
  };

  return (
    <Block {...props}>
      <Title canShowAll status={status} title={title} idx={idx} />
      <ListWrapper
        horizontal
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={renderItem}
      />
    </Block>
  );
};

export default ListHorizontal;
