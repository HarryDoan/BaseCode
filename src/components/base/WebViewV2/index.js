import {Block} from '@components';
import React from 'react';
import {Platform} from 'react-native';
import WebView from 'react-native-webview';

const WEBViewV2 = ({
  content,
  style,
  scrollEnabled = true,
  title,
  short,
  vision,
  image,
  imgHeader,
  mission,
}) => {
  return (
    <Block flex style={style}>
      <WebView
        androidLayerType="hardware"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        startInLoadingState={true}
        scalesPageToFit={false}
        useWebKit={true}
        originWhitelist={['*']}
        source={{
          baseUrl: '',
          html: `
          <html>
          <head>
            <meta name='viewport' content='width=device-width,initial-scale=1,maximum-scale=1'>
            ${styles}
          </head>
          <body> 
          <div style="margin-left: 5%"> <img src='${
            imgHeader ? imgHeader : ''
          }'/></div/> 
           ${short}  
        ${vision}
         ${mission}
          ${image?.map(e => {
            return `<div style="margin-left: 1.5%;">
            <img src='${e ? e : ''}'/> 
            </div/>`;
          })}
          <div style="background-color:#224893;margin: 15 15 0 15; padding: 10 0 10 0";>
         ${content} 
         </div/> 
          </body>
          </html>`,
        }}
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
      />
    </Block>
  );
};

export default WEBViewV2;

const fontFamily = Platform.select({
  ios: '-apple-system',
  android: 'Myriad Pro',
});

const styles = `<style type="text/css">
  * {
    font-size: 15px ;
    text-align: justify;
    line-height: 1.5;
    font-family: ${fontFamily} 
  }
  body {
    margin: 0;
    padding-bottom: 15;
  }
  img {
    height: auto;
   align-seft:center;
  }
  p, figure {
    padding: 0;
    margin:15 20 0 20 ;
  }
</style>`;
