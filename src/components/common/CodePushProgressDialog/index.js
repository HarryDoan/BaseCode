import {Block, Text} from '@components';
import {COLORS} from '@theme';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

const PROGRESS_BAR_WIDTH = 200;

const CodePushProgressDialog = ({progress}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const percent = progress.totalBytes
    ? Math.round((progress.receivedBytes / progress.totalBytes) * 100)
    : 0;

  const translateX = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [-PROGRESS_BAR_WIDTH, 0],
  });

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: Math.min(percent, 100),
      useNativeDriver: true,
    }).start();
  }, [percent, progressAnim]);

  return (
    <Block absoluteFillObject backgroundColor={'rgba(0,0,0,0.5)'} justifyCenter>
      <Block
        backgroundColor={COLORS.white}
        radius={10}
        height={200}
        alignCenter
        justifyCenter
        marginHorizontal={20}>
        <Text lineHeight={22} center fontSize={16} medium marginBottom={15}>
          {'Đang cập nhật dữ liệu\nXin vui lòng đợi trong ít phút'}
        </Text>
        <Block
          backgroundColor={COLORS.white}
          radius={10}
          borderWidth={1}
          borderColor={COLORS.green}
          overflow="hidden"
          height={10}
          width={PROGRESS_BAR_WIDTH}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              transform: [{translateX}],
            }}>
            <Block flex backgroundColor={COLORS.green} borderLeftRadius={10} />
          </Animated.View>
        </Block>
      </Block>
    </Block>
  );
};

export default CodePushProgressDialog;
