import {Block, EmptyData} from '@components';
import {COLORS} from '@theme';
import React, {cloneElement} from 'react';
import {ActivityIndicator, SectionList as RNSectionList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SectionList = ({
  data = [],
  page = 1,
  isLoading = false,
  isLoadMore = false,
  refreshing = false,
  horizontal = false,
  HSeparator = 0,
  VSeparator = 0,
  onRefresh,
  onLoadMore,
  EmptyComponent,
  emptyTitle = 'Chưa có dữ liệu',
  emptyNull,
  HolderComponent,
  renderItem,
  renderHeader,
  keyExtractor,
  style,
  containerProps,
  children,
  paddingTopContent,
  safeAreaBottom,
  setRef,
  ...rest
}) => {
  const {bottom} = useSafeAreaInsets();
  if (isLoading && !isLoadMore && data?.length === 0) {
    return HolderComponent ? <HolderComponent /> : null;
  }

  const _keyExtractor = (item, index) => {
    return keyExtractor ? keyExtractor(item, index) : String(index);
  };

  const _renderItem = ({item, index}) => {
    return renderItem
      ? renderItem({item, index})
      : cloneElement(children, {item, index});
  };

  const _renderHeader = ({section: {title}}) => {
    return renderHeader ? renderHeader(title) : null;
  };

  const _renderEmpty = () => {
    return EmptyComponent ? (
      <EmptyComponent title={emptyTitle} />
    ) : emptyNull ? null : (
      <EmptyData title={emptyTitle} />
    );
  };

  const _renderSeparator = () => {
    return horizontal ? (
      <Block width={HSeparator} />
    ) : (
      <Block height={VSeparator} />
    );
  };

  const _renderLoadMore = () => {
    return (
      <Block marginVertical={12}>
        <ActivityIndicator size="small" color={COLORS.black} />
      </Block>
    );
  };

  return (
    <RNSectionList
      {...rest}
      ref={setRef}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 0 || paddingTopContent,
        paddingBottom: safeAreaBottom
          ? typeof safeAreaBottom === 'number'
            ? safeAreaBottom
            : bottom
            ? bottom
            : 20
          : 0,
      }}
      style={style}
      horizontal={horizontal}
      sections={data}
      renderSectionHeader={_renderHeader}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      ListEmptyComponent={_renderEmpty}
      ItemSeparatorComponent={_renderSeparator}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.01}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={isLoadMore && isLoading && _renderLoadMore()}
    />
  );
};

export default SectionList;
