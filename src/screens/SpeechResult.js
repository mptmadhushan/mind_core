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

const QuizResults = ({navigation, route}) => {
  const {score} = route.params;
  function renderQuiz() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/6ob.gif')}>
          <ImageBackground
            style={{flex: 1}}
            source={require('../assets/CONGRATS.png')}>
            <View style={styles.containerNew}>
              <TouchableOpacity
                // onPress={() => {
                //   navigation.navigate('OnBoard');
                // }}
                style={styles.container2}>
                <View style={styles.firstCard}>
                  <Image
                    style={{height: '100%', width: '50%'}}
                    source={require('../assets/conlogo.png')}
                  />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.title}>Congratulations.!{'\n'}</Text>

                    <ImageBackground
                      style={{
                        display: 'flex',
                        height: SIZES.height / 3,
                        width: SIZES.width * 0.95,
                        justifyContent: 'center',
                      }}
                      source={require('../assets/speechResu.png')}>
                      {/* <Text style={styles.title3}>
                        Comparing System expectation, you are in LOW
                        pronunciation level, Practice more
                      </Text> */}
                      {score ? (
                        <Text style={styles.title4}>
                          You got {score.score} marks{'\n'}
                          {score.detail}
                        </Text>
                      ) : null}
                    </ImageBackground>
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      activeOpacity={0.5}
                      onPress={() => navigation.navigate('DrawingTest')}>
                      <Text style={styles.buttonTextStyle}>Let's Draw.!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonStyle2}
                      activeOpacity={0.5}
                      onPress={() => navigation.navigate('Home')}>
                      <Text style={styles.buttonTextStyle}>Home</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return <SafeAreaView style={styles.container}>{renderQuiz()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Oh Whale - TTF',
  },
  buttonStyle: {
    backgroundColor: COLORS.secondary,
    borderWidth: 0,
    color: COLORS.third,
    borderColor: '#00BFA6',
    height: 40,
    width: SIZES.width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 5,
  },
  buttonStyle2: {
    backgroundColor: COLORS.fourth,
    borderWidth: 0,
    color: COLORS.third,
    borderColor: '#ff6150',
    height: 40,
    width: SIZES.width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 25,
  },
  number: {
    height: SIZES.height / 20,
    width: SIZES.height / 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  number1: {
    height: SIZES.height / 20,
    width: SIZES.height / 20,
    backgroundColor: COLORS.fourth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  answerBtn: {
    height: SIZES.height / 20,
    width: SIZES.width / 2.5,
    backgroundColor: COLORS.fourth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 10,
  },
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
    marginTop: SIZES.width / 4,
    flexDirection: 'column',
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
    backgroundColor: COLORS.primary,
  },
  container2: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container3: {
    flex: 1,
    // marginTop: -SIZES.height / 3,
    width: SIZES.width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 10,
    // alignItems: 'center',
  },
  containerRow: {
    flex: 1,
    display: 'flex',
    // marginTop: -SIZES.height / 3,
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container4: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    // height: SIZES.height / 15,
    // alignItems: 'center',
  },
  title: {
    // marginTop: -21,
    fontSize: 25,
    paddingTop: 15,
    color: COLORS.white,
    // fontWeight: 'bold',
    fontFamily: 'Oh Whale - TTF',
    textAlign: 'center',
  },
  title3: {
    fontFamily: 'Oh Whale - TTF',
    fontSize: 16,
    padding: 52,
    color: COLORS.white,
    textAlign: 'center',
  },
  title4: {
    fontFamily: 'Oh Whale - TTF',
    fontSize: 14,
    color: COLORS.white,
    textAlign: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  title2: {
    fontSize: 15,
    fontFamily: FONTS.roboto,
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

export default QuizResults;
