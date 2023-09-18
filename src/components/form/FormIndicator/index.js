import {Block} from '@components';
import React from 'react';
import {width} from '@utils/responsive';
import Text from '@components/base/Text';

const FormIndicator = ({
  title = '',
  steps = 1,
  currentStep = 1,
  space = 9,
  marginHorizontal = 15,
}) => {
  const rowWidth = width - marginHorizontal * 2;
  const itemWidth = (rowWidth + space) / steps - space;
  return (
    <Block marginHorizontal={marginHorizontal}>
      <Text center marginBottom={15} fontSize={18} bold>
        {title}
      </Text>
      <Block row spaceBetween>
        {[...Array(steps)].map((_, index) => {
          return (
            <Block
              key={index}
              radius={8}
              height={6}
              backgroundColor={index >= currentStep ? 'grayRating' : 'yellow'}
              width={itemWidth}
            />
          );
        })}
      </Block>
    </Block>
  );
};

export default FormIndicator;
