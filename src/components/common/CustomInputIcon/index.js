import {Block, Icon, Image} from '@components';
import {COLORS, SIZES} from '@theme';
import React from 'react';
import BtnEye from './BtnEye';

const CustomInputIcon = ({
  iconProps,
  renderInput,
  isShowPass,
  iconLeft,
  iconRight,
  source,
  iconRightAssets,
  value,
  setValue,
  styles,
}) => {
  return (
    <Block
      style={styles}
      rowCenter
      marginTop={SIZES.normal}
      borderBottomWidth={1}
      borderColor={COLORS.grayBreak}>
      {iconLeft && (
        <Icon
          {...iconProps}
          iconColor="placeholder"
          marginRight={SIZES.small}
        />
      )}
      {renderInput()}
      {isShowPass && <BtnEye value={value} setValue={setValue} />}
      {iconRight && <Icon {...iconProps} iconColor="placeholder" />}
      {iconRightAssets && <Image source={source} />}
    </Block>
  );
};

export default CustomInputIcon;
