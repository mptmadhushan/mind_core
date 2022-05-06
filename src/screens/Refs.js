import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import BeautyWebView from 'react-native-beauty-webview';

const App = () => {
  const [visible, setVisible] = useState(false);
  const onButtonPress = () => {
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <BeautyWebView
        visible={visible} // Reguired for open and close
        onPressClose={() => setVisible(false)} // Reguired for closing the modal
        url={'https://github.com/'}
        extraMenuItems={[
          {
            title: 'Extra Item',
            onPress: () => console.log('Extra Menu Item Clicked'),
          },
        ]}
      />
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.text}>Open</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#2196f3',
    marginHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
