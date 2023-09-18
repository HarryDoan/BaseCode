import {
  handleFlex,
  handleFlexGrow,
  handleFlexShrink,
  handleRound,
  handleSquare,
} from '@components/shared';
import {hs, vs} from '@responsive';
import {COLORS, FONTS} from '@theme';
import React from 'react';
import {Platform, StyleSheet, TextInput as RNTextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';

const TextInput = ({
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
  paddingVertical = Platform.OS === 'ios' ? 12 : 0,
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
  width,
  height,
  maxWidth,
  maxHeight,
  square,
  round,
  //position
  //color
  backgroundColor,
  borderColor,
  color = COLORS.black,
  opacity,
  //font
  h1,
  h2,
  h3,
  h4,
  h5,
  title,
  large,
  small,
  tiny,
  light,
  lightItalic,
  regular,
  medium,
  semiBold,
  bold,
  extraBold,
  heavy,
  block,
  //text style
  center,
  right,
  fontSize,
  fontFamily,

  maxLength,
  setRef,
  value,
  placeholder,
  placeholderTextColor,
  onChangeText,
  returnKeyType,
  onBlur,
  editable,
  secureTextEntry,
  keyboardType,
  style,
  blurOnSubmit,
  onSubmitEditing,
  onEndEditing,
  includeFontPadding = false,
  textAlignVertical,
  ...rest
}) => {
  const insets = useSafeAreaInsets();

  const customStyles = [
    //default
    {color: COLORS.blackGray},
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
    paddingVertical && {paddingVertical: hs(paddingVertical)},
    paddingHorizontal && {paddingHorizontal: hs(paddingHorizontal)},
    marginVertical && {marginVertical: hs(marginVertical)},
    marginHorizontal && {marginHorizontal: hs(marginHorizontal)},
    paddingTop && {paddingTop: hs(paddingTop)},
    paddingRight && {paddingRight: hs(paddingRight)},
    paddingBottom && {paddingBottom: hs(paddingBottom)},
    paddingLeft && {paddingLeft: hs(paddingLeft)},
    marginTop && {marginTop: hs(marginTop)},
    marginRight && {marginRight: hs(marginRight)},
    marginBottom && {marginBottom: hs(marginBottom)},
    marginLeft && {marginLeft: hs(marginLeft)},
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
    width && {width: hs(width)},
    height && {height: hs(height)},
    maxWidth && {maxWidth: hs(width)},
    maxHeight && {maxHeight: vs(height)},
    round && handleRound(hs(round)),
    square && handleSquare(hs(square)),
    //color
    backgroundColor && {
      backgroundColor: COLORS[backgroundColor] || backgroundColor,
    },
    borderColor && {
      borderColor: COLORS[borderColor] || borderColor,
    },
    color && {color: COLORS[color] || color},
    opacity !== undefined && {opacity},
    //font
    {fontFamily: fontFamily || FONTS.medium},
    {includeFontPadding: false},
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    h4 && styles.h4,
    h5 && styles.h5,
    title && {fontSize: hs(32)},
    large && {fontSize: hs(18)},
    small && {fontSize: hs(11)},
    tiny && {fontSize: hs(10)},
    regular && {fontFamily: FONTS.regular},
    semiBold && {fontFamily: FONTS.semiBold},
    bold && {fontFamily: FONTS.bold},
    medium && {fontFamily: FONTS.medium},
    light && {fontFamily: FONTS.light},
    heavy && {fontWeight: '700'},
    block && {fontWeight: '900'},

    //text style
    center && {textAlign: 'center'},
    right && {textAlign: 'right'},
    fontSize && {fontSize: hs(fontSize)},
    {includeFontPadding},
    textAlignVertical && {textAlignVertical: textAlignVertical},
    {...StyleSheet.flatten(style)},
  ];

  return (
    <RNTextInput
      {...rest}
      ref={setRef}
      style={customStyles}
      value={value}
      returnKeyType={returnKeyType}
      placeholder={placeholder}
      maxLength={maxLength}
      placeholderTextColor={COLORS[placeholderTextColor] || COLORS.placeholder}
      onChangeText={onChangeText}
      onBlur={onBlur}
      editable={editable}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      blurOnSubmit={blurOnSubmit}
      onSubmitEditing={onSubmitEditing}
      onEndEditing={onEndEditing}
    />
  );
};

export default TextInput;
