import {Block, Image, Pressable, Text} from '@components';
import React, {memo, useEffect} from 'react';
import {authRoot, commonRoot} from '@navigation/navigationRef';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS} from '@theme';
import actions from '@redux/actions';
import {icons} from '@assets';
import router from '@navigation/router';

const Notify = () => {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.user?.userToken);
  const [lengthNotification, setLengthNotification] = React.useState(
    useSelector(state => state.getNotification?.totalUnread),
  );

  useEffect(() => {
    if (!userToken) {
      setLengthNotification(0);
    }
  }, [userToken]);
  return (
    <Pressable
      height={25}
      width={35}
      radius={5}
      justifyCenter
      alignCenter
      onPress={() => {
        userToken
          ? commonRoot.navigate(router.NOTIFY_SCREEN)
          : authRoot.navigate(router.LOGIN_SCREEN);
      }}>
      {+lengthNotification > 0 && (
        <Block
          absolute
          top={-8}
          right={0.1}
          backgroundColor={COLORS.secondary}
          round={16}
          zIndex={99}
          justifyCenter
          alignCenter>
          <Text color={COLORS.white} semiBold fontSize={10}>
            {+lengthNotification > 9 ? '9+' : lengthNotification}
          </Text>
        </Block>
      )}
      <Image source={icons?.ic_bell} height={21} width={19} />
    </Pressable>
  );
};

export default memo(Notify);
