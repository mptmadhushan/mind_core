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
// import {Avatar} from 'react-native-elements';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import CheckBox from '@react-native-community/checkbox';
import {getFinalResultAPI} from '../api/getFinalResultAPI';

const LeaderBoard = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const userResults = {
    iq_marks: 5,
    iq_time_taken: 5,
    math_marks: 5,
    math_time_taken: 5,
    english_marks: 5,
    english_time_taken: 5,
    drawing_marks: 5,
    speaking_marks: 5,
  };
  const users = [
    {
      new_drawing_score: 0.2,
      new_quiz_scores: 0.33333333333333337,
      new_speaking_score: 0.9,
      previous_drawing_score: 0,
      // resp.previous_quiz_scores: 0.2,
      previous_speaking_score: 0,
    },
  ];
  const [resp, setResp] = useState();

  useEffect(() => {
    getFinalResultAPI()
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
  function renderQuiz() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <ImageBackground
          style={{flex: 1}}
          source={require('../assets/CONGRATS.png')}> */}
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/6ob.gif')}>
          <View style={{alignItems: 'center', marginTop: 40}}>
            <View style={styles.leaderBack}>
              {resp ? (
                <View>
                  <Text style={styles.title2}>Previous Score</Text>
                  <Text style={styles.title5}>
                    IQ :{resp.previous_quiz_scores.toFixed(2)}
                  </Text>
                  <Text style={styles.title5}>
                    Speech :{resp.previous_speaking_score}
                  </Text>
                  <Text style={styles.title5}>
                    Drawing :{resp.previous_drawing_score}
                  </Text>
                </View>
              ) : null}
              <View>
                {/* <Image
                  style={{height: 100, width: 100, objectFit: 'contain'}}
                  source={require('../assets/staticnew.png')}
                /> */}
                <Text style={styles.title2}>67%</Text>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: 40}}>
            <View style={styles.leaderBack}>
              {resp ? (
                <View>
                  <Text style={styles.title2}>Current Score</Text>
                  {/* <Text style={styles.title4}>Skillful</Text> */}
                  <Text style={styles.title5}>
                    IQ :{resp.new_quiz_scores.toFixed(2)}
                  </Text>
                  <Text style={styles.title5}>
                    Speech :{resp.new_speaking_score}
                  </Text>
                  <Text style={styles.title5}>
                    Drawing :{resp.new_drawing_score}
                  </Text>
                </View>
              ) : null}
              <View>
                {/* <Image
                  style={{height: 100, width: 100, objectFit: 'contain'}}
                  source={require('../assets/staticnew.png')}
                /> */}
                <Text style={styles.title2}>80%</Text>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: 40}}>
            <View style={styles.leaderBack}>
              <View>
                <Text style={styles.title2}>Summary</Text>
                {/* <Text style={styles.title4}>80%</Text> */}
                {/* <Text style={styles.title5}>Progress: 5% 🔻 </Text> */}
                <Text style={styles.des}>
                  You're child performance is very good.{'\n'}you are very lucky
                  to have such a child.
                </Text>
              </View>
              <View>
                <Image
                  style={{height: 100, width: 100}}
                  source={require('../assets/chart.png')}
                />
                <Text style={styles.title6}>STATISTICS</Text>
              </View>
            </View>
          </View>
          {/* <View style={{alignItems: 'center', marginTop: 40}}>
            <View style={styles.leaderBack}>
              <View>
                <Text style={styles.title4}>Summary</Text>
                <Text style={styles.title4}>Review</Text>
                <Text style={styles.title4}>Remark</Text>
                <Text style={styles.title4}>Other</Text>
              </View>
              <View>
                <Text style={styles.title4}>:Summary</Text>
                <Text style={styles.title4}>:Review</Text>
                <Text style={styles.title4}>:Remark</Text>
                <Text style={styles.title4}>:Other</Text>
              </View>
            </View>
          </View> */}
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text style={styles.title6}>
              Parent should mark this to contine
            </Text>
          </View>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.buttonStyle2}
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('FinalPrediction', {userResults})
              }>
              <Text style={styles.buttonTextStyle}>Prediction</Text>
            </TouchableOpacity>
          </View>
          {/* </ImageBackground> */}
        </ImageBackground>
      </SafeAreaView>
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
    marginBottom: 25,
  },
  leaderBack: {
    marginTop: 8,
    display: 'flex',
    height: SIZES.height / 5,
    width: '90%',
    backgroundColor: COLORS.fourth,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    marginTop: SIZES.height / 6.5,
    fontSize: 25,
    padding: 15,
    color: COLORS.third,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  title3: {
    fontSize: 12,
    padding: 15,
    color: COLORS.third,
    textAlign: 'center',
  },
  title2: {
    fontSize: 25,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title4: {
    fontSize: 20,
    // padding: 15,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title5: {
    fontSize: 15,
    // padding: 15,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  des: {
    fontSize: 10,
    color: COLORS.white,
    textAlign: 'left',
  },
  title6: {
    fontSize: 15,
    // padding: 15,
    color: COLORS.white,
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

export default LeaderBoard;
