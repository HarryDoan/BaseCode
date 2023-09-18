import {Block, Image, Loading, Pressable, Text} from '@components';
import {IMAGES, icons} from '@assets';
import {Platform, ScrollView, UIManager} from 'react-native';
import React, {Fragment, useCallback, useEffect} from 'react';
import actions, {_onUnmount} from '@redux/actions';
import {useDispatch, useSelector} from 'react-redux';

import {AccordionList} from 'react-native-accordion-list-view';
import {COLORS} from '@theme';
import RenderHtml from 'react-native-render-html';
import Title from './Title';
import {commonRoot} from '@navigation/navigationRef';
import router from '@navigation/router';
import {t} from 'i18next';
import {useFocusEffect} from '@react-navigation/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {width} from '@utils/responsive';

const Policy = ({group_id, currentTab}) => {
  const dispatch = useDispatch();
  const {bottom} = useSafeAreaInsets();
  const questionList = useSelector(
    state => state?.getFrequentlyQuestions?.data,
  );
  const data = useSelector(state => state?.getPageById?.data);
  const loading = useSelector(state => state?.getPageById?.isLoadings);

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      dispatch({type: actions.GET_PAGE_BY_ID, params: {group_id: group_id}});
      dispatch({
        type: actions.GET_FREQUENTLY_QUESTIONS,
      });
      // return () => {
      //   dispatch({type: _onUnmount(actions.GET_MEMBER_POLICY)});
      //   dispatch({type: _onUnmount(actions.GET_FREQUENTLY_QUESTIONS)});
      // };
    }, [dispatch, currentTab]),
  );
  const RenderHeader = data => {
    return (
      <Fragment>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={currentTab === '5' ? true : false}
          width={width}
          marginLeft={-15}
          backgroundColor={currentTab === '5' ? COLORS.utility : COLORS.white}>
          <Block wrap spaceAround row paddingLeft={15} paddingVertical={15}>
            {data?.map((i, index) => {
              return (
                <Pressable
                  marginBottom={20}
                  shadow3={currentTab === '5' ? false : true}
                  key={index}
                  onPress={() =>
                    commonRoot.navigate(
                      router.POLICY_AND_CONDITION_DETAIL_SCREEN,
                      {
                        img: i?.picture
                          ? {uri: i?.picture}
                          : IMAGE?.img_policy_detail_screen,
                        content: i?.content || '',
                        title: i?.title || '',
                      },
                    )
                  }
                  marginRight={15}
                  justifyCenter
                  alignCenter
                  width={currentTab === '5' ? 127 : 165}
                  height={currentTab === '5' ? 157 : 165}
                  backgroundColor={COLORS.white}
                  radius={10}>
                  <Image
                    width={currentTab === '5' ? 77 : '100%'}
                    height={currentTab === '5' ? 78 : 115}
                    source={i?.picture ? {uri: i?.picture} : icons?.ic_logo}
                  />
                  <Text
                    regular
                    lineHeight={20}
                    color={COLORS.primary}
                    numberOfLines={2}
                    paddingHorizontal={10}
                    marginTop={10}>
                    {i?.title}
                  </Text>
                </Pressable>
              );
            })}
          </Block>
        </ScrollView>
        {currentTab === '5' && (
          <Title
            marginLeft={-15}
            title={t('utilityScreen.Frequently_question')}
          />
        )}
      </Fragment>
    );
  };

  return (
    <Block backgroundColor={COLORS.white}>
      {loading && <Loading />}
      <AccordionList
        data={currentTab === '5' ? questionList : []}
        customTitle={item => <Text semiBold>{item?.title}</Text>}
        customBody={item => (
          <RenderHtml
            contentWidth={width - 30}
            source={{html: item?.content}}
            baseStyle={{
              fontSize: 15,
              lineHeight: 20,
              fontFamily: 'regular',
              color: COLORS.text2,
            }}
          />
        )}
        animationDuration={400}
        ListHeaderComponent={RenderHeader(data)}
        containerItemStyle={{backgroundColor: COLORS.background3}}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: bottom,
        }}
      />
    </Block>
  );
};

export default Policy;
