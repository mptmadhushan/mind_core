/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import {SIZES, COLORS} from '../constants';
import {useDispatch} from 'react-redux';
import {authLogout} from '../redux/authSlice';
import {clearUserToken} from '../shared/asyncStorage';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authLogout());
    clearUserToken()
      .then(() => {
        navigation.navigate('OnBoard');
      })
      .catch(() => {
        console.log('Handle me properly! Error clearing user token');
      });
  };
  function renderHome() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1, backgroundColor: COLORS.primary}}
          source={require('../assets/kisspng-cartoon-house-drawing-2017-cartoon-tree-house-road-5a83c9eb52b914.6045599315185863473388.png')}>
          <View style={styles.containerNew}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('IQ');
              }}>
              <ImageBackground
                style={{height: '100%', width: '100%'}}
                source={require('../assets/teacher.png')}>
                <Text style={styles.title}>
                  Tap! {'\n'}to start IQ{'\n'}TEST
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => logOut()}>
              <Text style={styles.buttonTextStyle}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return <SafeAreaView style={styles.container}>{renderHome()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  containerNew: {
    height: SIZES.height / 2,
    marginTop: SIZES.height / 3,
  },
  firstCard: {
    display: 'flex',
    height: SIZES.height / 6,
    width: '80%',
    backgroundColor: COLORS.fourth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SMARC___',
    marginTop: SIZES.height / 8.5,
    fontSize: 35,
    marginRight: SIZES.width / 2.7,
    color: COLORS.white,
    textAlign: 'center',
  },
  title2: {
    fontSize: 15,
    padding: 10,
    color: COLORS.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: '#00BFA6',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#00BFA6',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    fontFamily: 'Oh Whale - TTF',
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default Home;
