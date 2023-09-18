import {StyleSheet} from 'react-native';
import {hs} from '@responsive';

export default StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: hs(22),
  },
  h2: {
    fontWeight: '800',
    fontSize: hs(20),
  },
  h3: {
    fontWeight: '600',
    fontSize: hs(18),
  },
  h4: {
    fontWeight: '400',
    fontSize: hs(16),
  },
  h5: {
    fontWeight: '200',
    fontSize: hs(14),
  },
});
