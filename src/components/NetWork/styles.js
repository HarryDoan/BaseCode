import {COLORS} from '@theme';
import {mhs, mvs, width, height} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width,
    height,
    position: 'absolute',
    backgroundColor: COLORS.bg_opacity,
    paddingBottom: mvs(100),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textWrap: {
    backgroundColor: COLORS.gray,
    paddingVertical: mvs(8),
    paddingHorizontal: mhs(15),
    borderRadius: mhs(5),
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
