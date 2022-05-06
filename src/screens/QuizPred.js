/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {SIZES, COLORS} from '../constants';
import {getOverallResultAPI} from '../api/getOverallResultAPI';
import {getIq, getMath, getEnglish} from '../shared/asyncStorage';
import {WebView} from 'react-native-webview';
import Refs from '../screens/Refs';
import BeautyWebView from 'react-native-beauty-webview';

const QuizPred = ({navigation}) => {
  const [resp, setResp] = useState();
  const [maths, setMaths] = useState();
  const [english, setEnglish] = useState();
  const [iq, setIq] = useState();
  const [ref, setRef] = useState();
  const [refUrl, setRefUrl] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getOverallResultAPI()
      .then(response => {
        if (response.error) {
          console.log('error', response.error);
          // showToast(response.error);
          return;
        }
        const {data} = response;
        setRef(data.refer);
        setResp(data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // setLoading(false);
      });

    getIq().then(data => {
      const marks = JSON.parse(data);
      console.log('iq res 🍫', marks.marks);
      setIq(marks);
    });

    getMath().then(data => {
      const marks = JSON.parse(data);
      setMaths(marks);
    });

    getEnglish().then(data => {
      const marks = JSON.parse(data);
      setEnglish(marks);
    });
  }, []);
  const refsWebView = item => {
    // setModalVisible(true);
    setVisible(true);
    setRefUrl(item);
    // navigation.navigate('Refs', {item});
  };
  function renderQuiz() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/CONGRATS.png')}>
          <ImageBackground
            style={{flex: 1}}
            source={require('../assets/6ob.gif')}>
            {refUrl ? (
              <BeautyWebView
                visible={visible} // Reguired for open and close
                onPressClose={() => setVisible(false)} // Reguired for closing the modal
                url={refUrl}
                extraMenuItems={[
                  {
                    title: 'LeaderBoard',
                    onPress: () => navigation.navigate('LeaderBoard'),
                  },
                ]}
              />
            ) : null}
            <View>
              <Text style={styles.title}>Current Scores</Text>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 40,
              }}>
              {resp ? <Text style={styles.title61}>{resp.pred}</Text> : null}
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <View style={styles.leaderBack}>
                <View style={styles.number}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: 'Oh Whale - TTF',
                    }}>
                    1
                  </Text>
                </View>
                <Text>IQ </Text>
                {iq ? <Text>Score :{iq.marks.marks}</Text> : null}
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <View style={styles.leaderBack}>
                <View style={styles.number}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: 'Oh Whale - TTF',
                    }}>
                    2
                  </Text>
                </View>
                <Text>English</Text>
                {english ? <Text>Score :{english.marks.marks}</Text> : null}
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <View style={styles.leaderBack}>
                <View style={styles.number}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: 'Oh Whale - TTF',
                    }}>
                    3
                  </Text>
                </View>
                <Text>Math</Text>

                {maths ? <Text>Score :{maths.marks.marks}</Text> : null}
              </View>
            </View>

            <View style={{alignItems: 'center', marginTop: 10}}>
              {english ? (
                <Text style={styles.titleRef}>Improve Knowledge</Text>
              ) : null}
              {ref ? ( //if refs array is not empty
                <View style={styles.refs}>
                  {ref.map((item, index) => {
                    return (
                      <View key={index} style={styles.ref}>
                        <TouchableOpacity
                          style={styles.buttonStyleRef}
                          activeOpacity={0.5}
                          onPress={() => refsWebView(item)}>
                          <Text
                            numberOfLines={1}
                            style={styles.buttonTextStyleRef}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              ) : null}
            </View>
            <View style={{display: 'flex', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('LeaderBoard')}>
                <Text style={styles.buttonTextStyle}>LeaderBoard</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ImageBackground>
      </ScrollView>
    );
  }

  return <SafeAreaView style={styles.container}>{renderQuiz()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  number: {
    height: SIZES.height / 25,
    width: SIZES.height / 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Oh Whale - TTF',
  },
  buttonTextStyleRef: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Oh Whale - TTF',
    width: '60%',
  },
  buttonStyle: {
    backgroundColor: COLORS.fourth,
    borderWidth: 0,
    color: COLORS.third,
    borderColor: '#00BFA6',
    height: 40,
    width: SIZES.width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 10,
  },
  buttonStyle2: {
    backgroundColor: COLORS.fourth,
    borderWidth: 0,
    color: COLORS.third,
    borderColor: '#ff6150',
    height: 30,
    width: SIZES.width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 5,
  },
  buttonStyleRef: {
    backgroundColor: COLORS.fourth,
    borderWidth: 0,
    color: COLORS.third,
    borderColor: '#ff6150',
    height: 20,
    width: SIZES.width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 5,
  },
  buttonStyle3: {
    backgroundColor: COLORS.fourth,
    borderWidth: 0,
    color: COLORS.third,
    borderColor: '#ff6150',
    height: 20,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  leaderBack: {
    marginTop: 8,
    display: 'flex',
    height: SIZES.height / 15,
    width: '90%',
    backgroundColor: COLORS.fourth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: SIZES.width * 0.8,
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
    marginTop: SIZES.height / 6.5,
    fontSize: 35,
    padding: 15,
    color: COLORS.third,
    textAlign: 'center',
    fontFamily: 'LuckiestGuy-Regular',
  },
  titleRef: {
    fontSize: 35,
    padding: 15,
    color: COLORS.third,
    textAlign: 'center',
    fontFamily: 'LuckiestGuy-Regular',
  },
  title22: {
    marginTop: 6.5,
    fontSize: 25,
    padding: 15,
    color: COLORS.third,
    textAlign: 'center',
    fontFamily: 'LuckiestGuy-Regular',
  },

  title3: {
    fontFamily: 'Oh Whale - TTF',
    fontSize: 14,
    padding: 5,
    color: COLORS.third,
    textAlign: 'center',
  },
  title6: {
    fontFamily: 'Oh Whale - TTF',
    fontSize: 14,
    padding: 5,
    color: COLORS.white,
    textAlign: 'center',
  },
  title61: {
    fontFamily: 'Oh Whale - TTF',
    fontSize: 24,
    padding: 5,
    color: COLORS.white,
    textAlign: 'center',
  },
  title2: {
    fontFamily: 'Oh Whale - TTF',
    fontSize: 25,
    padding: 15,
    color: COLORS.white,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  title4: {
    fontSize: 20,
    // padding: 15,
    color: COLORS.white,
    // fontWeight: 'bold',
    fontFamily: 'Oh Whale - TTF',

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

export default QuizPred;
