import {mvs, vs} from '@utils/responsive';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: width,
  },
  banner: (opacity, scale, itemWidth, itemHeight) => ({
    opacity,
    width: itemWidth,
    height: vs(itemHeight),
    transform: [{scale}],
  }),
  dotContainer: dotInside => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(dotInside ? -10 : 20),
  }),
  dot: (opacity, dotWidth, dotInside) => ({
    opacity,
    width: vs(dotInside ? 10 : 8),
    height: vs(dotInside ? 3 : 8),
    borderRadius: vs(dotInside ? 5 : 8),
    marginRight: vs(dotInside ? 5 : 8),
    backgroundColor: dotInside ? 'white' : 'gray',
  }),
});
