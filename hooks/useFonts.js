import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    GibsonR: require('../assets/fonts/gibson-font/Gibson-Regular.ttf'),
    GibsonRI: require('../assets/fonts/gibson-font/Gibson-RegularItalic.ttf'),
    GibsonB: require('../assets/fonts/gibson-font/gibson-bold.ttf'),
    GibsonBI: require('../assets/fonts/gibson-font/Gibson-BoldItalic.ttf'),
  });