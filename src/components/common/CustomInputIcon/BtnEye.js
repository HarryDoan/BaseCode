import {Icon, Pressable} from '@components';
import {SIZES} from '@theme';
import React, {useCallback} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BtnEye = ({value, setValue}) => {
  const _onChangeValue = useCallback(() => {
    setValue && setValue(prev => !prev);
  }, [setValue]);

  return (
    <Pressable onPress={_onChangeValue}>
      <Icon
        IconType={FontAwesome}
        iconName={value ? 'eye' : 'eye-slash'}
        iconColor="placeholder"
        marginRight={SIZES.small}
      />
    </Pressable>
  );
};

export default BtnEye;
