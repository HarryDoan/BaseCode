import {Block, Modal} from '@components';
import actions, {_onUnmount} from '@redux/actions';
import {COLORS} from '@theme';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderSearch from './HeaderSearch';
import RecentSearch from './RecentSearch';
import SearchResults from './SearchResults';
import TopSearch from './TopSearch';

export default function SearchScreenModal() {
  const dispatch = useDispatch();
  const initialKeyword = useSelector(state => state.modalSearch.keyword);
  const [textSearch, setTextSearch] = useState(initialKeyword);

  useEffect(() => {
    const keyword = textSearch.trim();
    if (keyword) {
      dispatch({type: actions.GET_AUTO_SEARCH, params: {keyword}});
      dispatch({type: actions.GET_SEARCH_DEPARMENT, params: {keyword}});
    } else {
      dispatch({type: _onUnmount(actions.GET_AUTO_SEARCH)});
      dispatch({type: _onUnmount(actions.GET_SEARCH_DEPARMENT)});
    }
  }, [dispatch, textSearch]);

  useEffect(() => {
    dispatch({type: actions.GET_TOP_SEARCH});
  }, [dispatch]);

  return (
    <Modal
      animation="fade"
      hideModal={() => dispatch({type: actions.HIDE_MODAL_SEARCH})}
      backdropOpacity={0}>
      <Block flex backgroundColor={COLORS.white}>
        <HeaderSearch onChangeText={setTextSearch} textSearch={textSearch} />
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {textSearch?.trim().length > 0 ? (
            <SearchResults />
          ) : (
            <Block>
              <RecentSearch />
              <TopSearch />
            </Block>
          )}
        </ScrollView>
      </Block>
    </Modal>
  );
}
