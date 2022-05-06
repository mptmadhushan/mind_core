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
  Modal,
  ImageBackground,
} from 'react-native';
import useSound from 'react-native-use-sound';

import {getQuizAPI} from '../api/getQuizAPI';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import {getResultAPIMath} from '../api/getResultAPIMath';
import {getFirstQMath} from '../api/getFirstQMath';
import {getNextQ} from '../api/getNextQ';
import Loader from '../components/Loader';
import {storeMathMarks} from '../shared/asyncStorage';

const Quiz = ({navigation}) => {
  useEffect(() => {
    setLoading(true);
    getFirstQMath()
      .then(response => {
        if (response.error) {
          console.log('error', response.error);
          // showToast(response.error);
          return;
        }
        const {data} = response;
        setIq(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // setLoading(false);
      });
    // handlePlay();
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [Quiz, setIq] = useState();
  const [time, setTime] = useState();
  const [modalVisible, setModalVisible] = useState(true);
  const [currQuiz, setCurrQuiz] = useState(0);
  const [theArray, setTheArray] = useState([]);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [loading, setLoading] = useState(false);
  const [endTime, setEndTime] = useState(Date.now());

  // const SomeRandomArray = [];
  const [play, pause, stop] = useSound(
    'https://assets.mixkit.co/sfx/preview/mixkit-tick-tock-clock-timer-1045.mp3',
  );

  const handlePlay2 = () => {
    setModalVisible(!modalVisible);
    console.log('play');
    setTime(Date.now());
    play();
  };
  const navigateTores = () => {
    setLoading(false);
    console.log('response 🍡');
    console.log(theArray.length);
    if (theArray.length === 10) {
      console.log('arr length', theArray);
      getResultAPIMath(theArray)
        .then(response => {
          if (response.error) {
            console.log('error', response.error);
            // showToast(response.error);
            return;
          }
          const resData = response.data;
          console.log('res', resData);
          storeMathMarks(resData).then(result =>
            console.log('Remove me if not needed Iq', result),
          );
          navigation.navigate('QuizResults', {resData});
        })
        .catch(error => {
          console.log('error', error);
        })
        .finally(() => {
          console.log('response');
        });
    }
  };

  const handleAnswerOptionClick = (selectedAns, id) => {
    setTime(Date.now());
    const milles = endTime - time;
    var seconds = ((milles % 60000) / 1000).toFixed(0);
    const ansToSend = {
      question: id,
      given_answer: selectedAns,
      time_taken: seconds,
    };
    // SomeRandomArray.push(ansToSend);
    console.log('currQuiz', currQuiz);
    // console.log('ansToSend', ansToSend);
    // console.log('theArray', theArray);
    setTheArray(theArray => [...theArray, ansToSend]);
    if (currQuiz < 12) {
      setCurrQuiz(currQuiz + 1);
      const preQ = {
        id: id,
        answer: selectedAns,
        time_taken: parseInt(seconds),
      };
      setLoading(true);

      getNextQ(preQ)
        .then(response => {
          if (response.error) {
            console.log('error', response.error);
            // showToast(response.error);
            setLoading(false);
            return;
          }
          const {data} = response;
          setIq(data);
          console.log(data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        })
        .finally(() => {
          // setLoading(false);
        });
      if (currQuiz > 8) {
        const newArr = theArray;
        setLoading(true);
        // setTimeout(() => {
        console.log('naci');

        navigateTores();
        // }, 200);
      }
    }
  };
  function renderQuiz() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/qback.jpg')}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Number of questions and current question is highlighted
                </Text>
                <Image
                  style={{width: 300, resizeMode: 'contain'}}
                  source={require('../assets/images/help/1.png')}
                />
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 15,
                  }}
                />
                <Text style={styles.modalText}> current questions</Text>
                <Image
                  style={{width: 300, resizeMode: 'contain'}}
                  source={require('../assets/images/help/2.png')}
                />
                <Text style={styles.modalText}>
                  These are the answers! Press the correct answer to gain score.
                </Text>
                <Image
                  style={{width: 300, height: 200, resizeMode: 'contain'}}
                  source={require('../assets/images/help/3.png')}
                />
                <TouchableOpacity
                  style={styles.buttonStyle2m}
                  activeOpacity={0.5}
                  onPress={() => handlePlay2()}>
                  <Text style={styles.buttonTextStyle}>close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.containerNew}>
            <Loader loading={loading} />
            <View style={styles.container2}>
              {/* <Text style={{color: COLORS.third}}>Please elect answer</Text> */}
              <View style={styles.container3}>
                {numbers.map((number, i) => (
                  <View
                    key={i}
                    style={[
                      styles.number1,
                      {
                        backgroundColor:
                          currQuiz !== number ? COLORS.primary : COLORS.fourth,
                      },
                    ]}>
                    <Text style={{color: COLORS.third}}>{number}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.fourth,
                padding: 10,
                marginTop: SIZES.height / 15,
              }}>
              {Quiz ? (
                <Text
                  style={{
                    color: COLORS.white,
                    // fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'Oh Whale - TTF',
                  }}>
                  {Quiz[currentQuestion].question}
                </Text>
              ) : null}
            </View>
            <View style={styles.firstCard}>
              <ImageBackground
                style={{height: '100%', width: '100%'}}
                source={require('../assets/qizFrame.png')}>
                {Quiz ? (
                  <View
                    style={{
                      textAlign: 'center',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      // padding: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        handleAnswerOptionClick(
                          Quiz[currentQuestion].answers[0],
                          Quiz[currentQuestion].id,
                        )
                      }>
                      <Text
                        style={{
                          color: COLORS.secondary,
                          // fontWeight: 'bold',
                          fontFamily: 'Oh Whale - TTF',
                          fontSize: 20,
                          // marginTop: SIZES.height / 10,
                        }}>
                        {Quiz[currentQuestion].answers[0]}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        handleAnswerOptionClick(
                          Quiz[currentQuestion].answers[1],
                          Quiz[currentQuestion].id,
                        )
                      }>
                      <Text
                        style={{
                          color: COLORS.secondary,
                          // fontWeight: 'bold',
                          fontFamily: 'Oh Whale - TTF',
                          fontSize: 20,
                          // marginTop: SIZES.height / 10,
                        }}>
                        {Quiz[currentQuestion].answers[1]}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        handleAnswerOptionClick(
                          Quiz[currentQuestion].answers[2],
                          Quiz[currentQuestion].id,
                        )
                      }>
                      <Text
                        style={{
                          color: COLORS.secondary,
                          // fontWeight: 'bold',
                          fontFamily: 'Oh Whale - TTF',
                          fontSize: 20,
                          // marginTop: SIZES.height / 10,
                        }}>
                        {Quiz[currentQuestion].answers[2]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </ImageBackground>
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
  modalText: {
    marginBottom: -15,
    textAlign: 'left',
    color: '#a1a1a1',
  },
  firstCard: {
    // flex: 2,
    height: SIZES.height / 1.6,
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
  },
});

export default Quiz;
