import {Block, Pressable, Text, UserAvatar} from '@components';
import {commonRoot} from '@navigation/navigationRef';
import router from '@navigation/router';
import actions from '@redux/actions';
import {COLORS} from '@theme';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const SearchResults = () => {
  const dispatch = useDispatch();
  const getAutoSearch = useSelector(state => state.getAutoSearch.data || []);
  const getSearchShop = useSelector(
    state => state.getSearchDepartment.data || [],
  );
  const department = useSelector(state => state.modalSearch.department);

  const _renderSearchKeywords = () => {
    const data = getSearchShop.length
      ? getAutoSearch.slice(0, 6)
      : getAutoSearch.length > 0
      ? getAutoSearch
      : Array(15).fill({title: ''});
    return (
      <Block>
        {data.map(({title}, index) => {
          return (
            <Pressable
              key={`${title}${index}`}
              paddingVertical={10}
              paddingHorizontal={15}
              onPress={() => {
                if (title?.length) {
                  dispatch({type: actions.HIDE_MODAL_SEARCH});
                  commonRoot.navigate(router.LIST_PRODUCT_SEARCH_SCREEN, {
                    keyword: title,
                    department_id: department?.item_id,
                  });
                }
              }}
              borderTopWidth={0.5}
              borderColor={index === 0 ? COLORS.white : COLORS.border}>
              <Text fontSize={14} color={COLORS.text}>
                {title}
              </Text>
            </Pressable>
          );
        })}
      </Block>
    );
  };

  const _renderSearchShop = () => {
    return (
      getSearchShop.length > 0 && (
        <Block borderTopWidth={7} borderColor={COLORS.background}>
          <Text
            marginVertical={10}
            marginLeft={15}
            bold
            fontSize={16}
            color={COLORS.indigo}>
            Shop
          </Text>
          {getSearchShop.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  dispatch({type: actions.HIDE_MODAL_SEARCH});
                  commonRoot.navigate(router.SHOP_SCREEN, {data: item.item_id});
                }}
                key={item.item_id}
                row
                alignCenter
                padding={12}
                borderTopWidth={0.5}
                borderColor={COLORS.border}>
                <UserAvatar name={item.title} uri={item.picture} size={40} />
                <Block paddingLeft={10}>
                  <Text medium fontSize={16} color={COLORS.black}>
                    {item.title}
                  </Text>
                  <Text regular fontSize={12} color={COLORS.textLineThrough}>
                    {item.username}
                  </Text>
                </Block>
              </Pressable>
            );
          })}
        </Block>
      )
    );
  };

  return (
    <Block>
      {_renderSearchKeywords()}
      {_renderSearchShop()}
    </Block>
  );
};

export default SearchResults;
