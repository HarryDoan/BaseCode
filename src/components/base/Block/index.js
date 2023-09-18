import {hs} from '@responsive';
import {COLORS} from '@theme';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  handleFlex,
  handleFlexGrow,
  handleFlexShrink,
  handleRound,
  handleSquare,
} from '../../shared';
import styles from './styles';

const Block = ({
  //layout
  flex,
  flexGrow,
  flexShrink,
  row,
  column,
  spaceBetween,
  spaceAround,
  spaceEvenly,
  wrap,
  rowCenter,
  columnCenter,
  alignStart,
  alignCenter,
  alignEnd,
  justifyStart,
  justifyCenter,
  justifyEnd,
  overflow,
  alignSelfStretch,
  alignSelfStart,
  alignSelfEnd,
  alignSelfCenter,
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
  borderDashed,
  borderDotted,
  translateY,
  safePaddingAreaTop,
  safeMarginAreaTop,
  safePaddingAreaBottom,
  safeMarginAreaBottom,
  //width, height
  width,
  height,
  maxWidth,
  maxHeight,
  square,
  round,
  //position
  relative,
  absolute,
  absoluteFillObject,
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
  shadow4,
  shadow5,

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
    spaceBetween && {justifyContent: 'space-between'},
    spaceAround && {justifyContent: 'space-around'},
    spaceEvenly && {justifyContent: 'space-evenly'},
    wrap && {flexWrap: 'wrap'},
    rowCenter && styles.rowCenter,
    columnCenter && styles.columnCenter,
    alignStart && {alignItems: 'flex-start'},
    alignCenter && {alignItems: 'center'},
    alignEnd && {alignItems: 'flex-end'},
    justifyStart && {justifyContent: 'flex-start'},
    justifyCenter && {justifyContent: 'center'},
    justifyEnd && {justifyContent: 'flex-end'},
    overflow && {overflow},
    alignSelfStart && {alignSelf: 'flex-start'},
    alignSelfEnd && {alignSelf: 'flex-end'},
    alignSelfCenter && {alignSelf: 'center'},
    alignSelfStretch && {alignSelf: 'stretch'},
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
    borderDashed && {borderStyle: 'dashed'},
    borderDotted && {borderStyle: 'dotted'},
    translateY && {transform: [{translateY: hs(translateY)}]},
    safePaddingAreaTop && {paddingTop: insets.top},
    safeMarginAreaTop && {marginTop: insets.top},
    safePaddingAreaBottom && {paddingBottom: insets.bottom},
    safeMarginAreaBottom && {marginBottom: insets.bottom},
    //width, height
    width !== undefined && {width: hs(width)},
    height !== undefined && {height: hs(height)},
    maxWidth !== undefined && {maxWidth: hs(width)},
    maxHeight !== undefined && {maxHeight},
    round && handleRound(hs(round)),
    square && handleSquare(hs(square)),
    //position
    relative && {position: 'relative'},
    absolute && {position: 'absolute'},
    absoluteFillObject && styles.absoluteFillObject,
    top !== undefined && {top: hs(top)},
    right !== undefined && {right: hs(right)},
    bottom !== undefined && {bottom: hs(bottom)},
    left !== undefined && {left: hs(left)},
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
    shadow4 && styles.shadow4,
    shadow5 && styles.shadow5,

    {...StyleSheet.flatten(style)},
  ];

  return (
    <View style={customStyles} onLayout={onLayout} {...rest}>
      {children}
    </View>
  );
};

export default Block;
