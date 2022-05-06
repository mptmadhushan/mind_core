/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ImageBackground,
} from 'react-native';
import {getSketchApi} from '../api/getSketchApi';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const Quiz = ({navigation}) => {
  const drawings = [
    {
      id: 2,
      image: images.face,
      name: 'face',
    },
    {
      id: 3,
      image: images.house,
      name: 'house',
    },
    {
      id: 4,
      image: images.ant,
      name: 'ant',
    },
    {
      id: 5,
      image: images.bird,
      name: 'bird',
    },
    {
      id: 6,
      image: images.envelope,
      name: 'envelope',
    },
    {
      id: 7,
      image: images.flower,
      name: 'flower',
    },
    {
      id: 8,
      image: images.fish,
      name: 'fish',
    },
    {
      id: 9,
      image: images.star,
      name: 'star',
    },
    {
      id: 10,
      image: images.sun,
      name: 'sun',
    },
  ];
  const [modalVisible, setModalVisible] = useState(true);
  const [sketch, setSketch] = useState();
  const [imageUrl, setImage] = useState();
  // const imageUrl = require(`../assets/images/sketch/${ImageName}.png`);
  const [curSketch, setCurSketch] = useState(
    drawings[Math.floor(Math.random() * drawings.length)],
  );

  useEffect(() => {
    // getSketchApi()
    //   .then(response => {
    //     if (response.error) {
    //       console.log('error', response.error);
    //       // showToast(response.error);
    //       return;
    //     }
    //     const {data} = response;
    //     setSketch(data);
    //     // console.log(data);
    //     const newUrl = data.name;
    //     setImage(newUrl);
    //     console.log(newUrl);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     // setLoading(false);
    //   });
    // handlePlay();
  }, []);
  function renderQuiz() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/drawbacknew.jpg')}>
          <View style={styles.containerNew}>
            <View
              style={{
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.fourth,
                padding: 10,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  // fontWeight: 'bold',
                  fontSize: 20,
                  fontFamily: 'Oh Whale - TTF',
                }}>
                Let's draw this picture 🖌️
              </Text>
            </View>
            <View style={styles.firstCard}>
              {curSketch ? (
                <Image
                  style={{height: '100%', width: '100%'}}
                  source={curSketch.image}
                  resizeMode="contain"></Image>
              ) : null}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Please Draw the image showing in screen on paper. and then
                      press continue
                    </Text>
                    <Image
                      style={{width: 300, height: 400, resizeMode: 'contain'}}
                      source={require('../assets/drawingKid.gif')}
                    />
                    <TouchableOpacity
                      style={styles.buttonStyle2m}
                      activeOpacity={0.5}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.buttonTextStyle}>close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <View
                style={{
                  // display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  width: SIZES.width,
                  height: SIZES.height / 3,
                }}>
                <View
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    width: '50%',
                    justifyContent: 'center',
                    backgroundColor: COLORS.primary,
                    padding: 20,
                    borderRadius: 30,
                    marginLeft: SIZES.width / 5,
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: 'Oh Whale - TTF',
                      fontSize: 15,
                      textAlign: 'center',
                    }}>
                    Please Draw the image showing in screen on paper. and then
                    press continue
                  </Text>
                </View>
                <ImageBackground
                  style={{height: '100%', width: '70%'}}
                  source={require('../assets/painting.png')}>
                  <View
                    style={{
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 10,
                    }}></View>
                </ImageBackground>
              </View>
              <View
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() =>
                    navigation.navigate('DrawingUpload', {curSketch})
                  }>
                  <Text style={styles.buttonTextStyle}>Continue</Text>
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
    fontFamily: 'Oh Whale - TTF',
  },
  buttonStyle: {
    backgroundColor: COLORS.fourth,
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
    height: SIZES.height / 20,
    width: SIZES.width / 2.5,
    backgroundColor: COLORS.fourth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 10,
  },
  containerNew: {
    // flex: 1,
    // display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'column',
  },
  firstCard: {
    // flex: 2,
    height: SIZES.height / 2.6,
    width: '100%',
    padding: 5,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: -15,
    textAlign: 'left',
    color: '#a1a1a1',
  },
  buttonStyle2m: {
    backgroundColor: COLORS.fourth,
    borderWidth: 0,
    color: COLORS.third,
    borderColor: '#00BFA6',
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: -20,
  },
});

export default Quiz;
