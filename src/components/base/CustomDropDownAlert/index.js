import actions from '@redux/actions';
import {COLORS} from '@theme';
import {width} from '@utils/responsive';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import Icon from '../Icon';
import Text from '../Text';

const CustomDropDownAlert = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const status = useSelector(state => state.toastInfo?.status);
  const message = useSelector(state => state.toastInfo?.message);
  const popAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (status && message) {
      clearTimeout(timeoutRef.current);
      fadeIn();
    }
  }, [status, message]);

  const fadeIn = () => {
    Animated.timing(popAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(fadeOut());
  };

  const fadeOut = () => {
    timeoutRef.current = setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      dispatch({type: actions.UNMOUNT_TOAST});
    }, 2000);
  };

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity: popAnim,
          backgroundColor:
            status === 'success' ? COLORS.lightGreen : COLORS.errorToast,
          marginBottom: 55 + insets.bottom,
        },
      ]}>
      <View style={styles.toastRow}>
        <Icon
          iconName={status === 'success' ? 'checkcircleo' : 'closecircleo'}
          IconType={AntDesign}
          iconSize={15}
          color={'white'}
        />
        <View style={styles.toastText}>
          <Text color={'white'}>{message}</Text>
        </View>
      </View>
    </Animated.View>
  );
};
export default CustomDropDownAlert;

const styles = StyleSheet.create({
  toastContainer: {
    width: width - 30,
    alignSelf: 'center',
    borderRadius: 7,
    shadowColor: COLORS.black,
    paddingVertical: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    zIndex: 1,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: 15,
  },
  toastRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  toastText: {
    flex: 1,
    marginLeft: 5,
  },
});
