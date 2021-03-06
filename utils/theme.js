import { Platform } from 'react-native';
import { colors } from 'react-native-elements';
import { getRandomGradient } from './../utils/gradient';

const platform = Platform.OS;
const defaultThemes = {
  default: colors.platform.android,
  web: colors.platform.android,
  android: colors.platform.android,
  ios: colors.platform.ios,
};

const commonStyles = {
  Button: {
    titleStyle: { fontFamily: 'Montserrat' },
    buttonStyle: {
      width: 160,
      margin: 8,
      color: '#fff',
      border: 'none',
      background: getRandomGradient(),
      backgroundSize: '200% 100%',
      backgroundPosition: '100% 0',
    },
  },
  Text: {
    style: { fontFamily: 'Montserrat' },
  },
};

export const lightTheme = {
  colors: {
    ...Platform.select({
      ...defaultThemes[platform],
    }),
  },
  ...commonStyles,
};

export const darkTheme = {
  colors: {
    ...defaultThemes[platform],
  },
  ...commonStyles,
};
