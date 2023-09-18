import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: (
    width,
    height,
    borderRadius,
    marginVer,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    colors,
  ) => ({
    width: width,
    height: height,
    borderRadius: borderRadius,
    marginVertical: marginVer,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginLeft: marginLeft,
    marginRight: marginRight,
    overflow: 'hidden',
    backgroundColor: colors ? colors[0] : '#E6E6E6',
  }),
});
