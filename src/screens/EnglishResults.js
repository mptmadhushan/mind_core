/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
import useSound from 'react-native-use-sound';

import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const QuizResults = ({navigation, route}) => {
  const [play, pause, stop, data] = useSound(
    'https://assets.mixkit.co/sfx/preview/mixkit-auditorium-moderate-applause-and-cheering-502.mp3',
  );
  const handlePlay2 = () => {
    // console.log('jello');
    navigation.navigate('Home');

    // play();
  };
  const {resData} = route.params;

  const handlePlay = () => {
    navigation.navigate('Home');
    if (data.isPlaying) pause();
    // // else
    // stop();
  };
  useEffect(() => {
    play();
  }, []);
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
              <TouchableOpacity style={styles.container2}>
                <View style={styles.firstCard}>
                  <Image
                    style={{height: '100%', width: '50%'}}
                    source={require('../assets/conlogo.png')}
                  />
                  <View>
                    <Text style={styles.title}>
                      Congratulations.!{'\n'}You got {resData.marks.marks}
                    </Text>
                    {/* <Text style={styles.title3}>
                      Veniam aliquip irure culpa aute aliqua nostrud magna velit
                      id veniam fugiat. Do voluptate tempor dolor adipisicing et
                      ex eiusmod ea aliquip. Proident sint qui laborum dolor
                      Lorem ullamco sint ad incididunt aliquip aute irure ut
                      deserunt. Quis velit dolore adipisicing ullamco dolore sit
                      labore duis adipisicing aute cupidatat adipisicing.
                      Deserunt esse aliqua aute mollit exercitation incididunt
                      eiusmod magna cupidatat sunt minim quis occaecat non.
                    </Text> */}
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      activeOpacity={0.5}
                      onPress={() => navigation.navigate('Quiz')}>
                      <Text style={styles.buttonTextStyle}>Maths Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonStyle2}
                      activeOpacity={0.5}
                      onPress={() => handlePlay2()}>
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
    fontFamily: 'Oh Whale - TTF',
    color: '#FFFFFF',
    fontSize: 16,
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
    marginTop: 30,
    marginBottom: 25,
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
    marginTop: 10,
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
    padding: 15,
    color: COLORS.third,
    // fontWeight: 'bold',
    fontFamily: 'Oh Whale - TTF',
    textAlign: 'center',
  },
  title3: {
    fontSize: 10,
    padding: 15,
    color: COLORS.third,
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

export default QuizResults;
