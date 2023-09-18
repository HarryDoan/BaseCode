/* eslint-disable radix */
import {Block} from '@components';
import {width} from '@utils/responsive';
import React, {useEffect} from 'react';
import {Linking, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const WEBView = ({
  data,
  style,
  scrollEnabled = true,
  title,
  image,
  textColor,
  shot,
  setHeighScrollViewShot,
  screen,
}) => {
  const [webheight, setWebheight] = React.useState(100);
  const {bottom} = useSafeAreaInsets();

  const webViewScript = `
  setTimeout(function() { 
    window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
  }, 500);
  true; // note: this is required, or you'll sometimes get silent failures
`;
  const dt = data?.replace(/display: table-caption;/g, '');
  return (
    <Block flex style={{height: webheight}}>
      <WebView
        style={{
          backgroundColor: 'transparent',
        }}
        onShouldStartLoadWithRequest={request => {
          if (
            request.url.startsWith('file://') ||
            request.url.startsWith('http')
          ) {
            return true;
          }
          Linking.canOpenURL(request.url).then(supported => {
            if (supported) {
              Linking.openURL(request.url);
            }
          });

          return false;
        }}
        automaticallyAdjustContentInsets={false}
        androidLayerType="hardware"
        domStorageEnabled={true}
        javaScriptEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        startInLoadingState={true}
        scalesPageToFit={false}
        onMessage={event => {
          setWebheight(+event.nativeEvent.data);
        }}
        originWhitelist={['*']}
        source={{
          baseUrl: '',
          html: `
          <html>
          <head>
            <meta name='viewport' content='width=device-width,initial-scale=1,maximum-scale=3'>
            ${styles}
          </head>
          <body> 
          <div style="margin-left: 1.5%"> <img src='${
            image ? image : ''
          }'/></div/>
         <h1>${title ? title : ''} </h1> 
          ${dt}
          </body>
          </html>`,
        }}
        injectedJavaScript={webViewScript}
      />
    </Block>
  );
};

export default WEBView;

const fontFamily = Platform.select({
  ios: '-apple-system',
  android: 'Myriad Pro',
});

const styles = `<style type="text/css">
  * {
    // font-size: 16px ;
    text-align: justify;
    line-height: 1.5;
    font-family: ${fontFamily}
    // padding: 0;
    margin: 0;
  }
    figure{
    width: 100%;
    background: 'red' !important;
    display: 'none'

  }
  body {
    margin: 0;
    // padding-bottom: 15;

  }
    table{
    padding: 0;
    margin: 0;
    width: 100% !important;
    table-layout: fixed;
    // box-sizing: border-box;
  }

  img {
    max-width: 100%;
    height: auto !important;
    margin: 0 !important;
    // margin: 10px 5px 10px 5px;
  }
  p, figure {
    padding: 0;
    margin: 0;
    font-size: inherit;
    // font-size: 12px;

  }
   span{
    font-size: inherit ;
  }

  hr {
    max-width: 100% ;
  }
  a{
    font-size: 18px;
  }


</style>`;
