import {Block, Icon, Image, Modal, Pressable, Text} from '@components';
import {COLORS, GRADIENTS} from '@theme';
import React, {useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native';
import {icons} from '@assets';
import {useTranslation} from 'react-i18next';

const ModalReportCmt = ({
  title,
  describe,
  data,
  titleCancel,
  titleConfirm,
  onSuccess,
  onFail,
}) => {
  const {t} = useTranslation();
  const [check, setCheck] = useState({});
  return (
    <Modal>
      <Block
        flex
        justifyCenter
        alignCenter
        backgroundColor={COLORS.transparentColor2}>
        <Block
          paddingVertical={10}
          paddingHorizontal={15}
          radius={10}
          height={'50%'}
          width={'90%'}
          backgroundColor={COLORS.white}>
          <Pressable
            zIndex={99}
            right={5}
            absolute
            justifyCenter
            alignCenter
            width={35}
            height={35}
            onPress={() => onFail()}>
            <Icon
              iconName={'close'}
              iconSize={15}
              iconColor={COLORS.gray}
              IconType={AntDesign}
            />
          </Pressable>
          <Text
            style={{textAlign: 'center'}}
            fontSize={16}
            medium
            color={COLORS.primary}>
            {title || ''}
          </Text>
          <Text
            marginTop={10}
            style={{textAlign: 'center'}}
            fontSize={14}
            light
            color={COLORS.textColor}>
            {describe || ''}
          </Text>
          <Block
            marginTop={10}
            marginHorizontal={-15}
            height={0.5}
            backgroundColor={COLORS.border}
          />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {data?.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  marginTop={15}
                  row
                  onPress={() => {
                    setCheck(item);
                  }}>
                  {check?.item_id === item.item_id ? (
                    <Image
                      source={icons?.ic_checkbox}
                      height={18}
                      width={18}
                      marginRight={10}
                    />
                  ) : (
                    <Block
                      borderWidth={1}
                      borderColor={COLORS.textColor}
                      round={18}
                      marginRight={10}
                    />
                  )}
                  <Text flex fontSize={14} color={COLORS.textColor}>
                    {t(item.title)}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Block
            marginTop={10}
            marginHorizontal={-15}
            height={0.5}
            backgroundColor={COLORS.border}
          />
          <Block rowCenter spaceBetween>
            <Pressable
              borderWidth={1}
              marginTop={15}
              alignSelfCenter
              justifyCenter
              alignCenter
              width={155}
              height={35}
              radius={5}
              onPress={() => {
                onFail();
              }}>
              <Text
                paddingHorizontal={20}
                fontSize={16}
                medium
                color={COLORS.textColor}>
                {titleCancel || ''}
              </Text>
            </Pressable>

            <Pressable
              marginTop={15}
              alignSelfCenter
              justifyCenter
              alignCenter
              disabled={check?.item_id ? false : true}
              width={155}
              height={35}
              radius={5}
              onPress={() => {
                onSuccess(check);
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={
                  check?.item_id ? GRADIENTS.primary : GRADIENTS.buttonDisabled
                }
                style={{
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',

                  width: 155,
                  borderRadius: 5,
                }}>
                <Text
                  paddingHorizontal={20}
                  fontSize={16}
                  medium
                  color={COLORS.white}>
                  {titleConfirm || ''}
                </Text>
              </LinearGradient>
            </Pressable>
          </Block>
        </Block>
      </Block>
    </Modal>
  );
};

export default ModalReportCmt;
