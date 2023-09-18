import {COLORS} from '@theme';
import {hs, mhs} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: (borderColor, scale, width) => ({
    borderColor,
    transform: [{scale}],
    width: hs(width),
    height: hs(width),
    padding: mhs(5),
    marginRight: mhs(10),
    borderRadius: mhs(5),
    borderWidth: mhs(2),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }),
  icon: width => ({
    width: hs(width - 5),
    height: hs(width - 5),
    tintColor: COLORS.white,
    resizeMode: 'contain',
    zIndex: 20,
  }),
  background: widthIcon => ({
    width: widthIcon,
    height: widthIcon,
    backgroundColor: 'green',
    position: 'absolute',
  }),
});
