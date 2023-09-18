import {Block, Pressable, Icon, Modal, Text, TextInput} from '@components';
import {useCustomToast} from '@hooks';
import {bottomRoot} from '@navigation/navigationRef';
import router from '@navigation/router';
import {useKeyboard} from '@react-native-community/hooks';
import actions from '@redux/actions';
import {COLORS} from '@theme';
import {throttle} from '@utils/helper';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Platform} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const DELETE_CONFIRM = 'DELETE';

const AccountDeleteIcon = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState('');
  const loading = useSelector(state => state.deleteAccount?.isLoading);
  const {keyboardShown} = useKeyboard();
  const {t} = useTranslation();

  useEffect(() => {
    setConfirm('');
  }, [visible]);

  const hideDelete = () => {
    if (!loading) {
      setVisible(false);
    }
  };

  const onDelete = () => {
    if (confirm === DELETE_CONFIRM) {
      dispatch({
        type: actions.DELETE_ACCOUNT,
        onSuccess: () => {
          setVisible(false);
          Toast.show({
            type: 'success',
            text1: t('AccountInfoScreen.delete_account_success'),
          });
        },
        onFail: () => {
          setVisible(false);
        },
      });
    }
  };

  return (
    <Pressable onPress={() => setVisible(true)}>
      <Icon
        IconType={FontAwesome5}
        iconName="trash-alt"
        solid
        iconColor={COLORS.white}
      />
      {visible && (
        <Modal
          hideModal={() => !loading && setVisible(false)}
          contentContainerStyle={{justifyContent: 'center'}}>
          <Block
            backgroundColor={COLORS.white}
            marginHorizontal={15}
            marginBottom={Platform.OS === 'ios' && keyboardShown ? 50 : 0}
            radius={10}>
            <Text center paddingTop={20} marginHorizontal={20}>
              {t('AccountInfoScreen.delete_account_guide', {
                key_word: DELETE_CONFIRM,
              })}
            </Text>
            <Text
              marginTop={5}
              center
              paddingHorizontal={20}
              marginBottom={20}
              fontSize={16}
              semiBold
              color={COLORS.red}>
              {t('AccountInfoScreen.delete_account_warn')}
            </Text>
            <TextInput
              radius={10}
              marginHorizontal={10}
              paddingHorizontal={10}
              backgroundColor={COLORS.background}
              placeholder={DELETE_CONFIRM}
              autoCapitalize="characters"
              value={confirm}
              onChangeText={setConfirm}
            />
            <Block row marginVertical={10} marginHorizontal={15}>
              <Pressable
                onPress={hideDelete}
                backgroundColor={COLORS.lineBreak}
                radius={10}
                flex
                alignCenter
                marginRight={15}
                paddingVertical={12}>
                <Text color={COLORS.white} bold>
                  {t('Common.cancel')}
                </Text>
              </Pressable>
              <Pressable
                onPress={throttle(onDelete, 1000)}
                disabled={loading}
                backgroundColor={COLORS.primary}
                radius={10}
                flex
                paddingVertical={12}
                alignCenter>
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text color={COLORS.white} bold>
                    {t('Common.confirm')}
                  </Text>
                )}
              </Pressable>
            </Block>
          </Block>
        </Modal>
      )}
    </Pressable>
  );
};

export default AccountDeleteIcon;
