import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Font from 'expo-font';

const isWeb = Platform.OS === 'web';

const fontObj = isWeb
  ? {
      Montserrat: {
        uri: require('./../assets/fonts/Montserrat-Regular.ttf').default,
        fontDisplay: Font.FontDisplay.SWAP,
      },
    }
  : { Montserrat: './../assets/fonts/Montserrat-Regular.ttf' };

const useFont = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync(fontObj);
      } catch ({ message }) {
        console.log(`Error loading font: ${message}`);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  return isLoaded;
};

export default useFont;
