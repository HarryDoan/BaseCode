import {Block} from '@components';
import {COLORS} from '@theme';
import React from 'react';
import {UIActivityIndicator} from 'react-native-indicators';

const Loading = ({
  width = 250,
  height = 250,
  containerProps,
  backgroundColor = 'rgba(0,0,0,0.2)',
}) => {
  return (
    <Block
      absoluteFillObject
      zIndex={199}
      justifyCenter
      alignCenter
      backgroundColor={backgroundColor}
      {...containerProps}>
      <Block alignCenter justifyCenter height={70} width={70} radius={5}>
        <UIActivityIndicator size={30} color={COLORS.primary} />
      </Block>
    </Block>
  );
};

export default Loading;
