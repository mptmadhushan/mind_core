/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const OnBoard = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/images/background.png')}>
        <View style={styles.container}>
          <View style={styles.contentCenter}>
            <Text style={styles.title}> AMBULANCE {'\n'}EMS</Text>
            <TouchableOpacity
              onPress={() => {
                // createUser();

                navigation.navigate('Login');

                // navigation.navigate('Home');
              }}
              style={{
                marginTop: 40,
                borderRadius: 30,
                paddingVertical: 15,
                paddingHorizontal: 25,
                marginBottom: 20,
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
              }}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>User LogIn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // createUser();

                navigation.navigate('Login');

                // navigation.navigate('Home');
              }}
              style={{
                elevation: 8,
                borderRadius: 30,
                paddingVertical: 15,
                paddingHorizontal: 25,
                marginBottom: 20,
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
              }}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>
                Driver LogIn
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // createUser();

                navigation.navigate('Login');

                // navigation.navigate('Home');
              }}
              style={{
                elevation: 8,
                borderRadius: 30,
                paddingVertical: 15,
                paddingHorizontal: 25,
                marginBottom: 20,
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
              }}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default OnBoard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: SIZES.height * 0.16,
    fontSize: 55,
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    padding: 10,
  },
});
