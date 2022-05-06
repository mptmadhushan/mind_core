/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import {getFinalPredictApi} from '../api/getFinaPredictionAPI';

const FinalPrediction = ({navigation, route}) => {
  const {userResults} = route.params;
  const [res, setRes] = useState();

  useEffect(() => {
    console.log('tag', userResults);
    console.log('tag', userResults);
    getFinalPredictApi(userResults)
      .then(response => {
        if (response.error) {
          console.log('error', response);
          // showToast(response.error);
          return;
        }
        const {data} = response;
        console.log('tag', data);
        setRes(data);
        // setLoading(false);
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
              <Text style={styles.title}>predict performance</Text>
            </View>
            {res ? (
              <View>
                {res.predicted_grade === 'Skillful' ? (
                  <Text style={styles.title2}>
                    {res.predicted_grade}- Your child's performance is very
                    good. You're very lucky to have such a child
                  </Text>
                ) : null}
                {res.predicted_grade === 'Developing' ? (
                  <Text style={styles.title2}>
                    {res.predicted_grade}- Your child have average performance
                    parents can encourage to child for performance even better
                  </Text>
                ) : null}
                {res.predicted_grade === 'Minimally Effective' ? (
                  <Text style={styles.title2}>
                    {res.predicted_grade}- Better than ineffective but parents
                    still need to focus on child's education
                  </Text>
                ) : null}
                {res.predicted_grade === 'Ineffective' ? (
                  <Text style={styles.title2}>
                    {res.predicted_grade}- Parent should pay serious attention
                    to their child!
                  </Text>
                ) : null}
              </View>
            ) : null}
            {res ? <Text style={styles.title2}>{res.detail}</Text> : null}

            <View style={{display: 'flex', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Final')}>
                <Text style={styles.buttonTextStyle}>Continue</Text>
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
    fontSize: 30,
    padding: 15,
    color: COLORS.secondary,
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
    color: COLORS.white,
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

export default FinalPrediction;
