/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {sketchApi} from '../api/sketchApi';
import Loader from '../components/Loader';
import * as ImagePicker from 'react-native-image-picker';

import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const DrawingUpload = ({navigation, route}) => {
  const {curSketch} = route.params;
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  let camera;
  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
      uploadSketch(data.uri);
    }
  };
  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response.assets[0].uri);
      setLoading(true);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let formData = new FormData();
        formData.append('image', {
          uri: response.assets[0].uri,
          type: 'image/jpeg',
          name: 'sketch.jpg',
        });
        formData.append('sketch_id', curSketch.id);
        console.log(formData);
        sketchApi(formData)
          .then(response => {
            if (response.error) {
              console.log('error', response.error);
              // showToast(response.error);
              return;
            }

            const resData = response.data;
            console.log('res', resData);
            navigation.navigate('DrawingResults', {resData});
            setLoading(false);
          })
          .catch(error => {
            console.log('error', error);

            // showToast(error.response.data.message);
          })
          .finally(() => {
            // setLoading(false);
          });
      }
    });
  };
  const uploadSketch = async fileUrl => {
    setLoading(true);

    console.log('upload', curSketch);
    console.log('🧑‍🚀🧑‍🚀', fileUrl);
    let formData = new FormData();

    formData.append('image', {
      uri: fileUrl,
      type: 'image/jpeg',
      name: 'sketch.jpg',
    });

    formData.append('sketch_id', curSketch.id);
    console.log(formData);

    sketchApi(formData)
      .then(response => {
        if (response.error) {
          console.log('error', response.error);
          // showToast(response.error);
          return;
        }

        const resData = response.data;
        console.log('res', resData);
        navigation.navigate('DrawingResults', {resData});
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);

        // showToast(error.response.data.message);
      })
      .finally(() => {
        // setLoading(false);
      });
  };
  function renderQuiz() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.containerNew}
          source={require('../assets/drawingUp.jpg')}>
          <Loader loading={loading} />

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
                style={{color: COLORS.white, fontWeight: 'bold', fontSize: 20}}>
                Please Point Camera
              </Text>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    please point the camera to your drawing. and then press
                    capture to continue in the process.
                  </Text>
                  <Image
                    style={{width: 300, resizeMode: 'contain'}}
                    source={require('../assets/captureDrawing.gif')}
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
            <RNCamera
              ref={ref => (camera = ref)}
              style={{flex: 1}}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
            {/* <ImageBackground
              style={styles.container22}
              source={require('../assets/DrawingChameleon.jpeg')}>
              
            </ImageBackground> */}
          </View>

          <View style={styles.container2}>
            <View style={styles.firstCard}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={require('../assets/CAMERA.png')}
              />
              <TouchableOpacity
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => takePicture()}>
                {/* onPress={() => navigation.navigate('DrawingResults')}> */}
                <Text style={styles.buttonTextStyle}>Capture</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => launchImageLibrary()}>
                {/* onPress={() => navigation.navigate('DrawingResults')}> */}
                <Text style={styles.buttonTextStyle}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return <SafeAreaView style={styles.container}>{renderQuiz()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  containerCamera: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
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
    marginTop: 55,
    marginBottom: 15,
  },
  buttonStyle2: {
    backgroundColor: COLORS.primary,
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
    marginTop: 30,
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
    backgroundColor: COLORS.secondary,
  },
  container2: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container22: {
    borderColor: 'red',
    height: SIZES.height / 4,
    width: SIZES.width / 1.5,
    borderRadius: 30,
    marginTop: SIZES.height / 5,
    marginLeft: SIZES.width / 10,
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
    color: COLORS.third,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title3: {
    fontSize: 15,
    padding: 5,
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

export default DrawingUpload;
