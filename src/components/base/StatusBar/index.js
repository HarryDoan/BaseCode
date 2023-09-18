import {Block} from '@components';
import {COLORS} from '@theme';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StatusBar as RNStatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const StatusBar = ({
  barStyle = 'light-content',
  backgroundColor = COLORS.gradient,
  ...props
}) => {
  const {top} = useSafeAreaInsets();

  return (
    <Block>
      <RNStatusBar
        barStyle={barStyle}
        {...props}
        // backgroundColor={COLORS[backgroundColor] || backgroundColor}
      />
      <Block height={top} backgroundColor={COLORS.primary} />
    </Block>
  );
};

export default StatusBar;
