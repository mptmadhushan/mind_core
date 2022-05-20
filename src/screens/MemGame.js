import {View, ActivityIndicator, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
export default function MemGame() {
  const ActivityIndicatorElement = () => {
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={{flex: 1, justifyContent: 'center',alignContent:'center',backgroundColor:'#6563ff'}}
      />
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        javaScriptEnabled={true}
        //For the Cache
        domStorageEnabled={true}
        //View to show while loading the webpage
        renderLoading={ActivityIndicatorElement}
        //Want to show the view or not
        startInLoadingState={true}
        source={{uri: 'https://watch-e4e51.web.app/'}}
      />
    </SafeAreaView>
  );
}