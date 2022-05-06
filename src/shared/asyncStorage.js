import AsyncStorage from '@react-native-community/async-storage';

export const storeUserToken = async value => {
  try {
    await AsyncStorage.setItem('@user_token', value);
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};
export const storeIqMarks = async value => {
  try {
    await AsyncStorage.setItem('@iq_marks', JSON.stringify(value));
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};
export const storeMathMarks = async value => {
  try {
    await AsyncStorage.setItem('@math_marks', JSON.stringify(value));
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};
export const storeEnglishMarks = async value => {
  try {
    await AsyncStorage.setItem('@english_marks', JSON.stringify(value));
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};

export const getUserToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@user_token');
    if (value !== null) {
      // After restoring token, we may need to validate it
      return value;
    }
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};
export const getIq = async () => {
  try {
    const value = await AsyncStorage.getItem('@iq_marks');
    if (value !== null) {
      // After restoring token, we may need to validate it
      return value;
    }
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};
export const getMath = async () => {
  try {
    const value = await AsyncStorage.getItem('@math_marks');
    if (value !== null) {
      // After restoring token, we may need to validate it
      return value;
    }
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};
export const getEnglish = async () => {
  try {
    const value = await AsyncStorage.getItem('@english_marks');
    if (value !== null) {
      // After restoring token, we may need to validate it
      return value;
    }
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};

export const clearUserToken = async () => {
  try {
    await AsyncStorage.removeItem('@user_token');
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};
