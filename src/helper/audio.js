import Sound from 'react-native-sound';

Sound.setCategory('Ambient', true);

const buttonPress = new Sound(
  require('../assets/sounds/mixkit-wrong-answer-bass-buzzer-948.wav'),
  error => console.log(error),
);
export const playButtonPress = () => {
  console.log('play');
  buttonPress.play(success => buttonPress.reset());
};

// const playListPull = new Sound(require('../audio/pull.mp3'), error =>
//   console.log(error),
// );
// export const playListPull = () => {
//   pull.play(success => pull.reset());
// };

// const playListPullFinished = new Sound(
//   require('../audio/pullFinished.mp3'),
//   error => console.log(error),
// );
// export const playListPullFinished = () => {
//   pullFinished.play(success => pullFinished.reset());
// };
