import Carousel, {Pagination} from 'react-native-snap-carousel';
import React, {useState} from 'react';
import {Text, View} from 'react-native';

function MyCarousel() {
  const entries = [1, 2, 3, 4, 5];
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = index => {
    setActiveSlide(index);
    console.log(`Slide changed to ${index}`);
  };

  return (
    <View>
      <Carousel
        data={entries}
        renderItem={item => (
          <View
            style={{
              backgroundColor: 'crimson',
              width: '100%',
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{item}</Text>
          </View>
        )}
        sliderWidth={392}
        itemWidth={392}
        onSnapToItem={handleSlideChange}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 200,
          justifyContent: 'center',
        }}>
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
          containerStyle={{backgroundColor: 'rgba(1, 222, 0, 0.75)'}}
          dotStyle={{
            width: 21,
            height: 7,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotStyle={{
            width: 7,
            height: 7,

            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
        />
      </View>
    </View>
  );
}

export default MyCarousel;
