import {Dimensions, StatusBar} from 'react-native';

//IPhone 12
export const DESIGN_WIDTH = 375;
export const DESIGN_HEIGHT = 767;

export const statusBarHeight = StatusBar.currentHeight;

export const {width, height} = Dimensions.get('screen');

export const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

/**
 * H => Horizontal
 *
 * V => Vertical
 *
 * hScale responsive by width screen
 *
 * vScale responsive by height screen
 *
 * moderateHScale responsive by width screen with factor
 *
 * moderateVScale responsive by height screen with factor
 *
 **/
export const hScale = size =>
  typeof size === 'number' ? (shortDimension / width) * size : size;

export const vScale = size =>
  typeof size === 'number' ? (longDimension / height) * size : size;

export const moderateHScale = (size, factor = 0.5) => {
  return size + (hScale(size) - size) * factor;
};

export const moderateVScale = (size, factor = 0.5) => {
  return size + (vScale(size) - size) * factor;
};

export const hs = hScale;
export const vs = vScale;
export const mhs = moderateHScale;
export const mvs = moderateVScale;
export const getSize = {
  hs: hScale,
  vs: vScale,
  mhs: moderateHScale,
  mvs: moderateVScale,
};
