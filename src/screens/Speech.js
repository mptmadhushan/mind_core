/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import Tts from 'react-native-tts';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import axios from 'axios';
import {audioComparison} from '../api/audioApi';
import AudioRecord from 'react-native-audio-record';
import Toast from 'react-native-simple-toast';
import Loader from '../components/Loader';

const Iq = ({navigation}) => {
  const handlePlay = () => {
    Tts.speak(currWord, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };
  const words = [
    'animal',
    'baloon',
    'birthday',
    'clean',
    'father',
    'food',
    'green',
    'house',
    'leader',
    'letter',
    'picture',
    'school',
    'seven',
    'ship',
    'sleep',
    'train',
    'yellow',
  ];
  // var currWord = words[Math.floor(Math.random() * words.length)];
  const [modalVisible, setModalVisible] = useState(true);
  const [image, setImage] = useState('');
  const [score, setScore] = useState('');
  const [loading, setLoading] = useState(false);
  const [currWord, setCurWord] = useState(
    words[Math.floor(Math.random() * words.length)],
  );
  const [clientID, setClientID] = useState(
    'bJQNgLuTGTSRJMsTOETfYTstQMWrqLWqGn6pQvSYEkA',
  );
  useEffect(() => {
    // setCurWord(words[Math.floor(Math.random() * words.length)]);
    const url =
      'https://api.unsplash.com/search/photos?page=1&query=' +
      currWord +
      '&client_id=' +
      clientID;

    axios.get(url).then(response => {
      console.log(response.data.results[0].urls.small);
      setImage(response.data.results[0].urls.small);
    });
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };

    AudioRecord.init(options);

    console.log('use effect home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const record = () => {
    console.log('record');

    AudioRecord.start();
    timeout;
    let timeout = setTimeout(() => {
      stopRecord();
      console.log('hello');
    }, 5000);
  };

  const stopRecord = async () => {
    console.log('recordStop ');
    const audioFile = await AudioRecord.stop();
    AudioRecord.on('data', data => {});
    console.log('audioFile 🍷', audioFile);
    initialRec(audioFile);
    // AudioRecord.stop();
  };
  const initialRec = audioFile => {
    uploadAudio(audioFile);
    console.log('initialRec', audioFile);
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };
  };
  const uploadAudio = async fileUrl => {
    setLoading(true);

    console.log('upload');
    console.log('🧑‍🚀🧑‍🚀', fileUrl);
    let formData = new FormData();
    formData.append('audio', {
      uri: 'file:///data/user/0/com.learnapp/files/test.wav',
      type: 'audio/wav',
      name: 'test.wav',
    });
    formData.append('word', currWord);
    console.log(formData);

    audioComparison(formData)
      .then(response => {
        if (response.error) {
          console.log('error', response.error);
          showToast('Error Try Again');
          // showToast(response.error);
          return;
        }

        const {data} = response;
        console.log('res', data);
        setScore(data);
        setLoading(false);
        showToast('Press Continue');
      })
      .catch(error => {
        console.log('error', error);
        showToast('Error Try Again');

        // showToast(error.response.data.message);
      })
      .finally(() => {
        // setLoading(false);
      });
  };
  const handlePlayOnClose = () => {
    setModalVisible(!modalVisible);
    Tts.speak(currWord, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };
  const getImage = () => {
    const url =
      'https://api.unsplash.com/search/photos?page=1&query=' +
      currWord +
      '&client_id=' +
      clientID;

    axios.get(url).then(response => {
      console.log(response);
    });
  };
  const showToast = message => {
    Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
  };
  function renderQuiz() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/yelback.jpg')}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Please read the word loud and clear
                </Text>
                <Image
                  style={{width: 300, height: 400, resizeMode: 'contain'}}
                  source={require('../assets/images/help/4.png')}
                />
                <TouchableOpacity
                  style={styles.buttonStyle2m}
                  activeOpacity={0.5}
                  onPress={() => handlePlayOnClose()}>
                  <Text style={styles.buttonTextStyle}>close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.containerNew}>
            <Loader loading={loading} />

            <View
              style={{
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.fourth,
                padding: 10,
                borderRadius: 30,
                width: '80%',
                marginTop: SIZES.height / 15,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: 'Oh Whale - TTF',
                  fontSize: 20,
                }}>
                Let's Speak..!
              </Text>
            </View>
            <View style={styles.firstCard}>
              <ImageBackground
                style={{height: '100%', width: '100%'}}
                source={require('../assets/speechback.png')}>
                <View
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: SIZES.height / 4,
                  }}>
                  {image ? (
                    <Image
                      style={{width: 100, height: 100, resizeMode: 'contain'}}
                      source={{
                        uri: image,
                      }}
                    />
                  ) : null}
                  <Text
                    style={{
                      color: COLORS.secondary,
                      fontSize: 50,
                      fontFamily: 'Schoolbell',
                    }}>
                    {currWord}
                  </Text>
                </View>
              </ImageBackground>
              <View
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() => handlePlay()}>
                  <Text style={styles.buttonTextStyle}>Re-play</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() => record()}>
                  <Text style={styles.buttonTextStyle}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('SpeechResults', {score})}>
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
    // marginTop: 20,
    marginBottom: 2,
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
    alignItems: 'center',
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
  modalText: {
    marginBottom: -15,
    textAlign: 'left',
    color: '#a1a1a1',
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

export default Iq;
