import React from 'react';
import {RefreshControl, ScrollView as RNScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ScrollView = ({
  refreshing = false,
  onRefresh,
  contentContainerStyle,
  safeAreaBottom,
  horizontal = false,
  ...rest
}) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <RNScrollView
      {...rest}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh && (
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        )
      }
      contentContainerStyle={[
        contentContainerStyle,
        safeAreaBottom && {paddingBottom: bottom},
      ]}
    />
  );
};

export default ScrollView;
