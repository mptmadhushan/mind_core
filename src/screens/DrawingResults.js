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

const DrawingResults = ({navigation, route}) => {
  const {resData} = {
    score: 89,
    detail: 'You are a good student',
  };
  // const {resData} = route.params;
  function renderQuiz() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/CONGRATS.png')}>
          <View style={styles.containerNew}>
            <TouchableOpacity style={styles.container2}>
              <View style={styles.firstCard}>
                <Image
                  style={{height: '100%', width: '50%'}}
                  source={require('../assets/drawRes.png')}
                />
                {resData ? (
                  <View
                    style={{
                      backgroundColor: COLORS.secondary,
                      borderRadius: 30,
                      padding: 10,
                    }}>
                    <Text style={styles.title}>Drawing Results.!</Text>
                    <Text style={styles.title3}>ACCURACY:{resData.score}</Text>
                    <Text style={styles.title3}>{resData.detail}</Text>
                    <Text style={styles.title3}>
                      "Skill full" - your's child drawing skills are amazing,
                      rather than other children of this age.
                    </Text>
                  </View>
                ) : null}
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('FinalPrediction')}>
                  <Text style={styles.buttonTextStyle}>Next</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
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
  },
  buttonStyle: {
    backgroundColor: COLORS.fourth,
    borderWidth: 0,
    color: COLORS.third,
    borderColor: COLORS.fourth,
    height: 40,
    width: SIZES.width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 40,
    marginBottom: 25,
  },
  buttonStyle2: {
    backgroundColor: COLORS.fourth,
    borderWidth: 0,
    color: COLORS.third,
    borderColor: '#35A7FF',
    height: 40,
    width: SIZES.width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
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
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: COLORS.primary,
    alignItems: 'center',
    borderRadius: 50,
    marginTop: SIZES.height / 8,
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
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title3: {
    fontSize: 15,
    padding: 5,
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
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    padding: 10,
  },
});

export default DrawingResults;
