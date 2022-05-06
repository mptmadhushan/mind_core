/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';

import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const Drawing = ({navigation}) => {
  function renderHome() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/pngtree-cartoon-kid-meadow-green-background-material-image_124473.jpg')}>
          <View style={styles.containerNew}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Quiz');
              }}
              style={styles.container2}>
              <View style={styles.firstCard}>
                <Image
                  style={{height: '60%', width: '50%'}}
                  source={require('../assets/clip-applying-to-university-online.png')}
                />
                <Text style={styles.title}>e-learning App</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DrawingTest');
              }}
              style={styles.container3}>
              <View style={styles.secondCard}>
                <Image
                  style={{height: '60%', width: '50%'}}
                  source={require('../assets/drawig.png')}
                />
                <Text style={styles.title2}>Drawing Test</Text>
              </View>
              <View style={styles.secondCard}>
                <Image
                  style={{height: '60%', width: '50%'}}
                  source={require('../assets/results.png')}
                />
                <Text style={styles.title2}>Results</Text>
              </View>
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
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  firstCard: {
    display: 'flex',
    height: SIZES.height / 4,
    width: '80%',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  secondCard: {
    display: 'flex',
    height: SIZES.height / 5,
    width: '40%',
    backgroundColor: COLORS.primary,
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
    justifyContent: 'space-around',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container3: {
    flex: 1,
    marginTop: -SIZES.height / 3,
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    marginTop: 0.16,
    fontSize: 25,
    padding: 15,
    color: COLORS.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title2: {
    fontSize: 15,
    padding: 10,
    color: COLORS.secondary,
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

export default Drawing;
