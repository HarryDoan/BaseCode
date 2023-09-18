import Carousel, {Pagination} from 'react-native-snap-carousel';
import {ImageBackground, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';

import {Block} from '@components';
import {COLORS} from '@theme';
import {IMAGES} from '@assets';
import {useSelector} from 'react-redux';
import {width} from '@utils/responsive';

const Banner = () => {
  const getBannerHome = useSelector(state => state.getBannerHome?.data);
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);
  const renderPicture = ({item, i}) => {
    return (
      <ImageBackground
        key={i}
        style={styles.image}
        source={item.img_link ? {uri: item.img_link} : IMAGE?.img_banner_home01}
        resizeMode="cover"
      />
    );
  };
  return (
    <Block marginHorizontal={15} marginVertical={10}>
      <Carousel
        loop
        slideStyle={styles.carousel}
        autoplay
        ref={carouselRef}
        data={getBannerHome?.[0]}
        renderItem={renderPicture}
        sliderHeight={111}
        itemHeight={111}
        sliderWidth={width - 30}
        itemWidth={width - 30}
        onSnapToItem={i => setIndex(i)}
      />
      <Block alignSelfCenter absolute zIndex={99} top={'82%'}>
        <Pagination
          dotsLength={getBannerHome?.[0]?.length}
          activeDotIndex={index}
          carouselRef={carouselRef}
          dotStyle={styles.dot}
          inactiveDotOpacity={0.6}
          inactiveDotScale={1}
          tappableDots={true}
        />
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  image: {
    backgroundColor: COLORS.transparentColor,
    borderRadius: 5,
    height: 111,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  carousel: {
    borderRadius: 5,
    overflow: 'hidden',
  },
});
export default Banner;
