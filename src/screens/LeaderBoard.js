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
  ScrollView,
  ImageBackground,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// import {CheckBox} from 'react-native-elements';
// import {Avatar} from 'react-native-elements';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import {getOverallResultAPI} from '../api/getOverallResultAPI';

const LeaderBoard = ({navigation}) => {
  const [resp, setResp] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getOverallResultAPI()
      .then(response => {
        if (response.error) {
          console.log('error', response.error);
          // showToast(response.error);
          return;
        }
        const {data} = response;
        console.log(data);
        setResp(data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // setLoading(false);
      });
    // handlePlay();
  }, []);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  function renderQuiz() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/CONGRATS.png')}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Text style={styles.title22}>Prediction</Text>
                </View>
                {resp ? <Text style={styles.title3}>{resp.pred}</Text> : null}
                <TouchableOpacity
                  // disabled={!toggleCheckBox}
                  style={styles.buttonStyle3}
                  activeOpacity={0.5}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.buttonTextStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <ImageBackground
            style={{flex: 1}}
            source={require('../assets/6ob.gif')}>
            <View>
              <Text style={styles.title}>Leaderboard</Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 40}}>
              {/* {users.map((u, i) => {
                return ( */}
              {resp ? (
                <View style={styles.leaderBack}>
                  <View style={styles.number}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: 'Oh Whale - TTF',
                      }}>
                      i
                    </Text>
                  </View>
                  <Text>{resp.grade}</Text>
                  <Text>Score : {resp.score.toFixed(2)}+</Text>
                </View>
              ) : null}
              {/* );
              })} */}
            </View>
            {resp ? (
              <View>
                <Text style={styles.title2}>Overall Performance</Text>
                <Text style={styles.title4}>
                  SCORE: {resp.score.toFixed(2)}
                </Text>
                <Text style={styles.title4}>Progress: {resp.progress}</Text>
                <Text style={styles.title3}>
                  {resp.grade} : {resp.detail}
                </Text>
              </View>
            ) : null}
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 40,
              }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text style={styles.title6}>
                Parent should mark this to continue
              </Text>
            </View>
            <View style={{display: 'flex', alignItems: 'center'}}>
              <TouchableOpacity
                disabled={!toggleCheckBox}
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Speech')}>
                <Text style={styles.buttonTextStyle}>Speech Training</Text>
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
    height: 40,
    width: SIZES.width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 5,
  },
  buttonStyle3: {
    backgroundColor: COLORS.fourth,
    borderWidth: 0,
    color: COLORS.third,
    borderColor: '#ff6150',
    height: 40,
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
    height: SIZES.height / 10,
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
    fontSize: 25,
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

export default LeaderBoard;
