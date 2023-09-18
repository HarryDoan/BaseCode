import {Block, EmptyData, Loading} from '@components';
import {COLORS} from '@theme';
import React, {cloneElement} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ListWrapper = ({
  data = [],
  page = 1,
  isLoading = false,
  refreshing = false,
  horizontal = false,
  HSeparator = 0,
  VSeparator = 0,
  onRefresh,
  onLoadMore,
  EmptyComponent,
  emptyTitle,
  emptyNull,
  HolderComponent,
  renderItem,
  keyExtractor,
  style,
  containerProps,
  children,
  numColumns = 1,
  paddingTopContent,
  safeAreaBottom,
  renderHeader,
  loadingHeader = false,
  isLoadMore = false,
  onEndReachedThreshold = 0.5,
  setRef,
  contentContainerStyle,
  ...rest
}) => {
  const {bottom} = useSafeAreaInsets();
  if (isLoading && !isLoadMore) {
    return HolderComponent && loadingHeader ? (
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader && renderHeader()}
        <HolderComponent />
      </ScrollView>
    ) : HolderComponent ? (
      <HolderComponent />
    ) : null;
  }

  const _keyExtractor = (item, index) => {
    return keyExtractor ? keyExtractor(item, index) : String(index);
  };

  const _renderItem = ({item, index}) => {
    return renderItem
      ? renderItem({item, index})
      : cloneElement(children, {item, index});
  };

  const _renderEmpty = () => {
    if (isLoading) {
      return HolderComponent ? (
        <HolderComponent />
      ) : (
        <Loading backgroundColor="white" />
      );
    } else {
      return EmptyComponent ? (
        <EmptyComponent title={emptyTitle} />
      ) : emptyNull ? null : (
        <EmptyData title={emptyTitle} />
      );
    }
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
        {/* <ActivityIndicator size="large" color={COLORS.text2} /> */}
        <UIActivityIndicator size={27} color={COLORS.text} />
      </Block>
    );
  };

  return (
    <FlatList
      style={style}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 0 || paddingTopContent,
        paddingBottom: safeAreaBottom
          ? typeof safeAreaBottom === 'number'
            ? safeAreaBottom
            : bottom
          : 0,
        ...contentContainerStyle,
      }}
      ref={setRef}
      horizontal={horizontal}
      data={data}
      numColumns={numColumns}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      ListEmptyComponent={_renderEmpty}
      ItemSeparatorComponent={_renderSeparator}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onLoadMore}
      onEndReachedThreshold={onEndReachedThreshold}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={renderHeader && data?.length > 0 && renderHeader()}
      ListFooterComponent={isLoadMore && _renderLoadMore()}
      {...rest}
    />
  );
};

export default ListWrapper;
