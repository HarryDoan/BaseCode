import {Block, Icon, Image, Pressable, Text} from '@components';
import {IMAGES, icons} from '@assets';
import {authRoot, commonRoot} from '@navigation/navigationRef';

import {COLORS} from '@theme';
import {ImageBackground} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {STATUS_EVENTS} from '@constants';
import {getDistanceFromUser} from '@utils/helper';
import router from '@navigation/router';
import {useSelector} from 'react-redux';
import {width} from '@utils/responsive';

const EventItem = ({item, currentLocation}) => {
  const distance = getDistanceFromUser({
    lat1: currentLocation?.latitude,
    lon1: currentLocation?.longitude,
    lat2: item?.map_latitude,
    lon2: item?.map_longitude,
  });
  const user = useSelector(state => state.user.userToken);
  return (
    <Pressable
      rowCenter
      shadow3
      relative
      radius={5}
      height={120}
      width={'100%'}
      onPress={() => {
        if (!user) {
          authRoot.navigate(router.LOGIN_SCREEN);
        } else {
          commonRoot.navigate(router.EVENT_DETAIL_SCREEN, {
            data: item.item_id,
          });
        }
      }}
      backgroundColor={COLORS.white}>
      <Image
        source={item?.picture ? {uri: item?.picture} : IMAGE?.img_evnet01}
        width={138}
        height={'100%'}
      />
      <ImageBackground
        style={{
          left: -4,
          bottom: 5,
          width: 71,
          height: 19,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}
        source={
          item?.status === STATUS_EVENTS.happenning
            ? icons?.ic_tag_happenning
            : item?.status === STATUS_EVENTS.upcoming
            ? icons?.ic_tag_coming_soon
            : item?.status === STATUS_EVENTS.finished
            ? icons?.ic_tag_finished
            : null
        }>
        <Text regular fontSize={11} translateY={1} color={COLORS.white}>
          {item?.status_text}
        </Text>
      </ImageBackground>

      <Block flex paddingHorizontal={10} paddingVertical={5}>
        <Block width={'100%'} rowCenter spaceBetween wrap>
          <Block rowCenter>
            <Image source={icons?.ic_time} width={13} height={17} />
            <Text regular fontSize={14} color={COLORS.secondary} marginLeft={5}>
              {item?.date_start}
            </Text>
          </Block>

          {!!distance && (
            <Text regular fontSize={14} color={COLORS.secondary}>
              {Number(distance).toFixed(2)} Km
            </Text>
          )}
        </Block>

        <Text
          semiBold
          uppercase
          fontSize={15}
          lineHeight={20}
          color={COLORS.primary}
          marginTop={7}
          numberOfLines={2}
          marginBottom={5}>
          {item?.title}
        </Text>
        <Block row spaceBetween>
          <Block row>
            <Icon
              IconType={Ionicons}
              iconColor={COLORS.text2}
              iconSize={15}
              iconName={'ios-location-sharp'}
              marginRight={5}
            />
            <Text regular fontSize={14} color={COLORS.text2}>
              {item?.province}
            </Text>
          </Block>
          <Text regular fontSize={16} color={COLORS.green5}>
            + {item?.point} điểm
          </Text>
        </Block>
      </Block>
    </Pressable>
  );
};

export default EventItem;
