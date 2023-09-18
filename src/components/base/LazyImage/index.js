import {Animated, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {
  handleFlex,
  handleFlexGrow,
  handleFlexShrink,
  handleRound,
  handleSquare,
} from '@components/shared';
import {hs, vs} from '@responsive';

import {COLORS} from '@theme';
import FastImage from 'react-native-fast-image';
import {IMAGES} from '@assets';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const LazyImage = ({
  //layout
  flex,
  flexGrow,
  flexShrink,
  row,
  column,
  space,
  wrap,
  rowCenter,
  alignStart,
  alignCenter,
  alignEnd,
  justifyStart,
  justifyCenter,
  justifyEnd,
  overflow,
  alignSelf,
  zIndex,
  //size
  padding,
  margin,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  radius,
  borderTopRadius,
  borderBottomRadius,
  borderLeftRadius,
  borderRightRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderWidth,
  borderTopWidth,
  borderRightWidth,
  borderBottomWidth,
  borderLeftWidth,
  translateY,
  safeAreaTop,
  safeAreaBottom,
  //width, height
  width = 100,
  height = 100,
  maxWidth,
  maxHeight,
  square,
  round,
  //position
  relative,
  absolute,
  top,
  left,
  right,
  bottom,
  //color
  backgroundColor,
  borderColor,
  color,
  opacity,
  //shadow
  shadow1,
  shadow2,
  shadow3,

  thumbnail,
  source,
  resizeMode,
  onLayout,
  style,
  children,
  ...rest
}) => {
  const insets = useSafeAreaInsets();

  const customStyles = [
    // layout
    flex && handleFlex(flex),
    flexShrink && handleFlexShrink(flexShrink),
    flexGrow && handleFlexGrow(flexGrow),
    row && {flexDirection: 'row'},
    column && {flexDirection: 'column'},
    space && {justifyContent: `space-${space}`},
    wrap && {flexWrap: 'wrap'},
    rowCenter && styles.rowCenter,
    alignStart && {alignItems: 'flex-start'},
    alignCenter && {alignItems: 'center'},
    alignEnd && {alignItems: 'flex-end'},
    justifyStart && {justifyContent: 'flex-start'},
    justifyCenter && {justifyContent: 'center'},
    justifyEnd && {justifyContent: 'flex-end'},
    overflow && {overflow},
    alignSelf && {alignSelf},
    zIndex && {zIndex},
    //size
    padding && {padding: hs(padding)},
    margin && {margin: hs(margin)},
    paddingTop && {paddingTop: hs(paddingTop)},
    paddingRight && {paddingRight: hs(paddingRight)},
    paddingBottom && {paddingBottom: hs(paddingBottom)},
    paddingLeft && {paddingLeft: hs(paddingLeft)},
    marginTop && {marginTop: hs(marginTop)},
    marginRight && {marginRight: hs(marginRight)},
    marginBottom && {marginBottom: hs(marginBottom)},
    marginLeft && {marginLeft: hs(marginLeft)},
    paddingVertical && {paddingVertical: hs(paddingVertical)},
    paddingHorizontal && {paddingHorizontal: hs(paddingHorizontal)},
    marginVertical && {marginVertical: hs(marginVertical)},
    marginHorizontal && {marginHorizontal: hs(marginHorizontal)},
    radius && {borderRadius: hs(radius)},
    borderTopRadius && {
      borderTopLeftRadius: hs(borderTopRadius),
      borderTopRightRadius: hs(borderTopRadius),
    },
    borderBottomRadius && {
      borderBottomLeftRadius: hs(borderBottomRadius),
      borderBottomRightRadius: hs(borderBottomRadius),
    },
    borderLeftRadius && {
      borderTopLeftRadius: hs(borderLeftRadius),
      borderBottomLeftRadius: hs(borderLeftRadius),
    },
    borderRightRadius && {
      borderTopRightRadius: hs(borderRightRadius),
      borderBottomRightRadius: hs(borderRightRadius),
    },
    borderTopLeftRadius && {borderTopLeftRadius: hs(borderTopLeftRadius)},
    borderTopRightRadius && {borderTopRightRadius: hs(borderTopRightRadius)},
    borderBottomLeftRadius && {
      borderBottomLeftRadius: hs(borderBottomLeftRadius),
    },
    borderBottomRightRadius && {
      borderBottomRightRadius: hs(borderBottomRightRadius),
    },
    borderWidth && {borderWidth: hs(borderWidth)},
    borderTopWidth && {borderTopWidth: hs(borderTopWidth)},
    borderRightWidth && {borderRightWidth: hs(borderRightWidth)},
    borderBottomWidth && {borderBottomWidth: hs(borderBottomWidth)},
    borderLeftWidth && {borderLeftWidth: hs(borderLeftWidth)},
    translateY && {transform: [{translateY: hs(translateY)}]},
    safeAreaTop && {paddingTop: insets.top},
    safeAreaBottom && {paddingTop: insets.bottom},
    //width, height
    width != null && {width: hs(width)},
    height != null && {height: hs(height)},
    maxWidth && {maxWidth: hs(width)},
    maxHeight && {maxHeight: vs(height)},
    round && handleRound(hs(round)),
    square && handleSquare(hs(square)),
    //position
    relative && {position: 'relative'},
    absolute && {position: 'absolute'},
    top && {top: hs(top)},
    right && {right: hs(right)},
    bottom && {bottom: hs(bottom)},
    left && {left: hs(left)},
    //color
    backgroundColor && {
      backgroundColor: COLORS[backgroundColor] || backgroundColor,
    },
    borderColor && {
      borderColor: COLORS[borderColor] || borderColor,
    },
    color && {color},
    opacity !== undefined && {opacity},
    //shadow
    shadow1 && styles.shadow1,
    shadow2 && styles.shadow2,
    shadow3 && styles.shadow3,

    {...StyleSheet.flatten(style)},
  ];

  const rThumbnail = useRef(new Animated.Value(0)).current;
  const rPicture = useRef(new Animated.Value(0)).current;

  const onThumbnailLoad = () => {
    //rThumbnail.value = withTiming(1);
    Animated.timing(rThumbnail, {toValue: 1, useNativeDriver: true}).start();
  };

  const onImageLoad = () => {
    Animated.timing(rPicture, {toValue: 1, useNativeDriver: true}).start();
  };

  return (
    <View style={customStyles} {...rest} bor>
      <Animated.View style={[StyleSheet.absoluteFill, {opacity: rThumbnail}]}>
        <FastImage
          source={thumbnail ? {uri: thumbnail} : IMAGE?.no_image_thumbnail}
          style={[styles.image, customStyles]}
          resizeMode={resizeMode}
          onLoadStart={onThumbnailLoad}
          blurRadius={1}
        />
      </Animated.View>
      <Animated.View style={[styles.image, {opacity: rPicture}]}>
        <FastImage
          source={source ? {uri: source} : IMAGE?.no_image}
          style={[styles.image, customStyles]}
          resizeMode={resizeMode}
          onLoadEnd={onImageLoad}
        />
      </Animated.View>
    </View>
  );
};

export default LazyImage;
