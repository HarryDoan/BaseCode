import {Block} from '@components';
import React from 'react';
import {SIZES} from './../../../theme/index';

const GridList = ({numColumns = 2, data = [], renderItem}) => {
  const widthPercent = `${100 / numColumns}%`;

  const _renderItem = (item, index) => {
    return (
      <Block
        overflow="hidden"
        key={`${index}`}
        padding={SIZES.normal}
        style={{width: widthPercent}}>
        {renderItem({item, index})}
      </Block>
    );
  };

  if (!data?.length) {
    return null;
  } else {
    return (
      <Block row wrap padding={SIZES.normal}>
        {data.map(_renderItem)}
      </Block>
    );
  }
};

export default GridList;
