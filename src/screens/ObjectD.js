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
  TextInput,
  ImageBackground,
} from 'react-native';

import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const ObjectD = ({navigation}) => {
  const n = 8;
  function renderQuiz() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/ge.jpg')}>
          <View style={styles.containerNew}>
            <TouchableOpacity style={styles.container2}>
              <View style={styles.firstCard}>
                <Image
                  style={{height: '100%', width: '50%'}}
                  source={require('../assets/speak.png')}
                />
                <View>
                  <Text style={styles.title}>
                    Object Detection{'\n'}To get Rewards
                  </Text>
                  <Text style={styles.title3}>
                    Complete Object Detection Training{'\n'}To get Rewards{'\n'}{' '}
                    Complete Speech Training{'\n'}
                    To get Rewards
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.container2}>
              {/* <Text style={{color: COLORS.third}}>Please elect answer</Text> */}
              <View style={styles.container3}>
                <View style={styles.number}>
                  <Text style={{color: COLORS.third}}>1</Text>
                </View>
                <View style={styles.number1}>
                  <Text style={{color: COLORS.third}}>2</Text>
                </View>
                <View style={styles.number}>
                  <Text style={{color: COLORS.third}}>3</Text>
                </View>
                <View style={styles.number}>
                  <Text style={{color: COLORS.third}}>4</Text>
                </View>
                <View style={styles.number}>
                  <Text style={{color: COLORS.third}}>5</Text>
                </View>
                <View style={styles.number}>
                  <Text style={{color: COLORS.third}}>6</Text>
                </View>
                <View style={styles.number}>
                  <Text style={{color: COLORS.third}}>7</Text>
                </View>
                <View style={styles.number}>
                  <Text style={{color: COLORS.third}}>8</Text>
                </View>
              </View>
              <View style={styles.container4}>
                <View style={styles.container3}>
                  <View style={styles.answerBtn2}>
                    <Image
                      style={{height: '100%', width: '50%'}}
                      source={require('../assets/2562.jpeg')}
                    />
                    <TextInput
                      style={styles.input}
                      // onChangeText={onChangeNumber}
                      // value={number}
                      placeholder="useless placeholder"
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('SpeechResults')}>
                  <Text style={styles.buttonTextStyle}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  speechText: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    color: COLORS.third,
    borderColor: '#00BFA6',
    height: 40,
    width: 100,
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
    height: SIZES.height / 10,
    width: SIZES.width / 1.5,
    backgroundColor: COLORS.fourth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 10,
  },
  answerBtn2: {
    height: SIZES.height / 4,
    width: SIZES.width / 1.5,
    // backgroundColor: COLORS.fourth,
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
    flexDirection: 'row',
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
    marginTop: -26,
    fontSize: 15,
    padding: 15,
    color: COLORS.third,
    fontWeight: 'bold',
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

export default ObjectD;
