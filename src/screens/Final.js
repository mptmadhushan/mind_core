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
import {getFinalResultAPI} from '../api/getFinalResultAPI';

const LeaderBoard = ({navigation}) => {
  const [resp, setResp] = useState();
  const [marks, setMarks] = useState();
  const [grade, setGrade] = useState();

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
        const a = data.new_drawing_score;
        const b = data.new_speaking_score;
        const c = data.new_quiz_scores;

        const total = a + b + c;

        const total2 = (total / 3) * 100;

        console.log(total);
        console.log('------');
        console.log(total2);
        setMarks(total2);
        if (total2 > 40) {
          setGrade('C');
        }
        if (total2 > 60) {
          setGrade('B');
        }
        if (total2 > 80) {
          setGrade('A');
        }
        if (total2 > 90) {
          setGrade('A+');
        }
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
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/final.jpg')}>
          <ImageBackground
            style={{flex: 1}}
            source={require('../assets/6ob.gif')}>
            <View>
              <Text style={styles.title}>CONGRATULATIONS..!</Text>
            </View>

            <Text style={styles.title2}>YOU HAVE SUCCESSFULLY COMPLETED!</Text>
            {marks ? (
              <Text style={styles.title4}>SCORE: {marks.toFixed(2)}</Text>
            ) : null}
            {grade ? <Text style={styles.title4}>Rating: {grade}</Text> : null}
            {/* <Text style={styles.title3}>
              Veniam aliquip irure culpa aute aliqua nostrud magna velit id
              veniam fugiat. Do voluptate tempor dolor adipisicing et ex eiusmod
              ea aliquip. Proident sint qui laborum dolor Lorem ullamco sint ad
              incididunt aliquip aute irure ut deserunt. Quis velit dolore
              adipisicing ullamco dolore sit labore duis adipisicing aute
              cupidatat adipisicing. Des
            </Text> */}
            <View style={{display: 'flex', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonTextStyle}>Home</Text>
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
    height: SIZES.height / 10,
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
    marginTop: SIZES.height / 2.7,
    fontSize: 25,
    padding: 15,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  title3: {
    fontSize: 12,
    padding: 15,
    color: COLORS.white,
    textAlign: 'center',
  },
  title2: {
    fontSize: 25,
    padding: 15,
    color: COLORS.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title4: {
    fontSize: 20,
    // padding: 15,
    color: COLORS.fourth,
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
