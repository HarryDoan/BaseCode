import React from 'react';

import {Block} from '@components';
import {COLORS} from '@theme';
import {HEADER} from '@constants';

const Header = () => {
  return (
    <Block>
      <Block
        row
        alignCenter
        spaceBetween
        height={HEADER.height}
        paddingHorizontal={15}
        backgroundColor={COLORS.secondary}
      />
    </Block>
  );
};

export default Header;
