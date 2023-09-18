import {AnimatedImage} from '@components';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, FlatList, View} from 'react-native';
import styles from './styles';

const {width} = Dimensions.get('window');
const ViewAnimated = Animated.createAnimatedComponent(View);
const FlatListAnimated = Animated.createAnimatedComponent(FlatList);

const Carousel = ({
  data = null,
  sliderWidth = width,
  itemWidth = sliderWidth,
  itemHeight = 200,
  space = (width - sliderWidth) / 2,
  dotWidth = 8,
  activeOpacity = 1,
  inActiveOpacity = 0.5,
  duration = 3000,
  autoPlay = true,
  dotInside = false,
  isDots = true,
  isCustomData = true,
  renderItem,
  renderPagination,
  onChangeIndex,
  containerStyles,
  bannerStyles,
  dotContainerStyles,
  dotStyles,
  ...props
}) => {
  const ref = useRef();
  const indexPlay = useRef(1);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [auto, setAuto] = useState(autoPlay);

  const _getCustomData = () => {
    return isCustomData ? [null, ...data, null] : data;
  };

  useEffect(() => {
    const animation = scrollX.addListener(({value}) => {
      indexPlay.current = Math.round(value / itemWidth);
      onChangeIndex && onChangeIndex(indexPlay.current + 1);
    });

    return () => scrollX.removeListener(animation);
  }, [itemWidth, onChangeIndex, scrollX]);

  useEffect(() => {
    let interval;
    if (auto && ref.current) {
      interval = setInterval(() => {
        ref?.current?.scrollToOffset({
          offset: indexPlay.current * sliderWidth,
          animated: true,
        });
        if (indexPlay.current === data.length - 1) {
          indexPlay.current = -1;
        }
        indexPlay.current++;
      }, duration);
    }
    return () => clearInterval(interval);
  }, [auto, data, duration, sliderWidth]);

  const _onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {
      useNativeDriver: false,
    },
  );

  const _onPause = () => {
    if (auto) {
      setAuto(false);
    }
  };

  const _onReset = () => {
    if (autoPlay) {
      setAuto(true);
    }
  };

  const _keyExtractor = (_, index) => String(index);

  const _renderItem = ({item, index}) => {
    if (!item) {
      return <View style={{width: space}} />;
    }

    const inputRange = [
      (index - 2) * itemWidth,
      (index - 1) * itemWidth,
      index * itemWidth,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [inActiveOpacity, activeOpacity, inActiveOpacity],
    });

    return (
      <AnimatedImage
        source={item.img_link}
        thumbnail={item.thumbnail}
        containerStyles={{width: sliderWidth}}
        style={[
          styles.banner(opacity, scale, itemWidth, itemHeight),
          bannerStyles,
        ]}
      />
    );
  };

  const _renderDots = (item, index) => {
    if (!item) {
      return null;
    }

    const inputRange = [
      (index - 5) * itemWidth,
      (index - 4) * itemWidth,
      (index - 3) * itemWidth,
      (index - 2) * itemWidth,
      (index - 1) * itemWidth, // middle
      index * itemWidth,
      (index + 1) * itemWidth,
      (index + 2) * itemWidth,
      (index + 3) * itemWidth,
    ];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 0.5],
    });

    return (
      <ViewAnimated
        key={index}
        style={[styles.dot(opacity, dotWidth, dotInside), dotStyles]}
      />
    );
  };

  const _renderPagination = () => {
    if (renderPagination) {
      return renderPagination();
    }
    if (!isDots) {
      return null;
    }
    return (
      <View style={[styles.dotContainer(dotInside), dotContainerStyles]}>
        {_getCustomData().map(_renderDots)}
      </View>
    );
  };

  if (!data) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyles]}>
      <FlatListAnimated
        {...props}
        ref={ref}
        horizontal
        bounces={false}
        data={data}
        keyExtractor={_keyExtractor}
        renderItem={renderItem || _renderItem}
        onScroll={_onScroll}
        decelerationRate="fast"
        scrollEventThrottle={16}
        snapToInterval={sliderWidth}
        onScrollBeginDrag={_onPause}
        onScrollEndDrag={_onReset}
        showsHorizontalScrollIndicator={false}
      />
      {_renderPagination()}
    </View>
  );
};

export default Carousel;
