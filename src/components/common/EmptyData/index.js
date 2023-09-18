import React from 'react';
import {Block, Text} from '@components';
import LottieView from 'lottie-react-native';
import {LOTTIES} from '@assets';
import Loading from '@components/base/Loading';
import {useTranslation} from 'react-i18next';
import {width, height} from '@utils/responsive';

const EmptyData = ({
  lottieName,
  width = width,
  height = 200,
  title = 'Common.data_empty',
  isLoading,
}) => {
  const {t} = useTranslation();
  return (
    <Block flex justifyCenter alignCenter>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <LottieView
            loop
            autoPlay
            source={LOTTIES.emptyData}
            style={{width: width, height: height}}
          />
          <Text>{t(title)}</Text>
        </>
      )}
    </Block>
  );
};
export default EmptyData;
