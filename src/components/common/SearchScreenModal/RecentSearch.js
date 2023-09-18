import {Block, Pressable, Text} from '@components';
import {commonRoot} from '@navigation/navigationRef';
import router from '@navigation/router';
import actions, {_onUnmount} from '@redux/actions';
import {COLORS} from '@theme';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

const RecentSearch = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const getSearchHistory = useSelector(
    state => state.getSearchHistory.data || [],
  );
  const [numShow, setNumShow] = useState(3);
  const data = getSearchHistory.slice(0, numShow);
  const isShowAll = getSearchHistory.length === data.length;
  const userToken = useSelector(state => state.user.userToken);
  const department = useSelector(state => state.modalSearch.department);

  useEffect(() => {
    if (userToken) {
      dispatch({type: actions.GET_SEARCH_HISTORY});
    }
  }, [dispatch, userToken]);

  const deleteSearchHistory = () => {
    dispatch({type: _onUnmount(actions.GET_SEARCH_HISTORY)});
    dispatch({type: actions.DELETE_SEARCH_HISTORY});
  };

  return (
    getSearchHistory.length > 0 && (
      <Block>
        {data.map((item, index) => {
          return (
            <Pressable
              onPress={() => {
                dispatch({type: actions.HIDE_MODAL_SEARCH});
                commonRoot.navigate(router.LIST_PRODUCT_SEARCH_SCREEN, {
                  keyword: item.title,
                  department_id: department.item_id,
                });
              }}
              key={item.id}
              borderBottomWidth={0.5}
              paddingHorizontal={15}
              paddingVertical={12}
              borderColor={COLORS.border}>
              <Text fontSize={15} numberOfLines={2}>
                {item.title}
              </Text>
            </Pressable>
          );
        })}
        {isShowAll ? (
          <Pressable
            paddingVertical={10}
            borderBottomWidth={7}
            borderColor={COLORS.background}
            onPress={deleteSearchHistory}>
            <Text light center>
              {t('SearchScreen.delete_history_search')}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            paddingVertical={10}
            borderBottomWidth={7}
            borderColor={COLORS.background}
            onPress={() => setNumShow(undefined)}>
            <Text light center>
              {t('SearchScreen.see_more')}
            </Text>
          </Pressable>
        )}
      </Block>
    )
  );
};

export default RecentSearch;
