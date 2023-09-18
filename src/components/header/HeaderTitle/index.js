import {Block, Icon, Pressable, StatusBar, Text} from '@components';
import {HEADER} from '@constants';
import {bottomRoot, root} from '@navigation/navigationRef';
import router from '@navigation/router';
import actions from '@redux/actions';
import store from '@redux/store';
import {COLORS, SIZES} from '@theme';
import {width} from '@utils/responsive';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

const HeaderTitle = ({
  title,
  canGoBack,
  onGoBack,
  backgroundColor,
  backgroundContain,
  color = 'white',
  colorIcon,
  containerProps,
  titleProps,
  IconRight,
  rightOnPress,
  barStyle,
  order,
  setHeightHeader,
  screen,
}) => {
  const dispatch = useDispatch();

  const onLayout = event => {
    if (setHeightHeader) {
      setHeightHeader(event.nativeEvent.layout.height);
    }
    // console.log('this is dta: ', event.nativeEvent.layout.height);
  };

  const _renderIconBack = opacity => {
    const _onGoBack = () => {
      if (opacity === 1) {
        screen === 'invitation'
          ? bottomRoot.navigate(router.MEMBER_SCREEN)
          : screen === 'tutorial'
          ? (() => {
              bottomRoot.navigate(router.HOME_SCREEN);
              // store.dispatch({type: actions.GET_BANNER_HOME});
              // store.dispatch({
              //   type: actions.GET_EVENT_UPCOMING_HOME,
              //   params: {search_type: 'upcoming'},
              // });
              // store.dispatch({
              //   type: actions.GET_EVENT_ONGOING_HOME,
              //   params: {search_type: 'happenning'},
              // });
              // store.dispatch({
              //   type: actions.GET_EVENT_POPULAR_HOME,
              //   params: {search_type: 'focus', numshow: 5},
              // });
            })()
          : root.goBack();
      }
    };

    return canGoBack ? (
      <Pressable opacity={opacity} onPress={_onGoBack}>
        <Icon
          IconType={Ionicons}
          iconName="chevron-back"
          iconSize={30}
          color={colorIcon || color}
        />
      </Pressable>
    ) : (
      <Pressable opacity={0}>
        <Icon
          IconType={Ionicons}
          iconName="chevron-back"
          iconSize={30}
          color={colorIcon || color}
        />
      </Pressable>
    );
  };

  const _renderIconRight = () => {
    return IconRight ? (
      <Pressable onPress={rightOnPress} paddingHorizontal={SIZES.xSmall}>
        {IconRight}
      </Pressable>
    ) : (
      _renderIconBack(0)
    );
  };

  return (
    <Block width={width} onLayout={onLayout}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={barStyle}
      />
      <Block
        row
        alignCenter
        height={HEADER.height}
        backgroundColor={COLORS.primary}
        paddingHorizontal={15}>
        {_renderIconBack(1)}
        <Text
          flex
          center
          color={color}
          fontSize={HEADER.titleSize}
          numberOfLines={1}
          {...titleProps}>
          {title}
        </Text>
        {_renderIconRight()}
      </Block>
    </Block>
  );
};

export default HeaderTitle;
