import {extendTheme} from 'native-base';
import {fontFamily} from '../../app.json';
import {Dimensions} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const COLORS = {
  PRIMARY: '#3949AB',
  SECONDARY: '#FF8A5B',
  GREY: '#A9A9A9',
  LIGHTGREY: '#D3D3D3',
  LIGHTGREY1: '#E0E0E0',
  LIGHTWHITE: '#F9F9F9',
  YELLOW: '#f59e0b',
  DANGER: '#ef4444',
  ORANGE: '#e64a19',
  darkBlue: '#070A52',
  darkOrange: '#D21312',
  darkMaroon: '#750E21',
  darkCoffee: '#310B0B',
  lightBlue: '#03506F',

  primary: {
    50: 'blue.50',
    100: 'blue.100',
    200: 'blue.200',
    300: 'blue.300',
    400: 'blue.400',
    500: 'blue.500',
    600: 'blue.600',
    700: 'blue.700',
    800: 'blue.800',
    900: 'blue.900',
  },

  secondary: {
    50: '#fbe9e7',
    100: '#ffccbc',
    200: '#ffab91',
    300: '#ff8a65',
    400: '#ff7043',
    500: '#ff5722',
    600: '#f4511e',
    700: '#e64a19',
    800: '#d84315',
    900: '#bf360c',
  },
};

const CustomTheme = extendTheme({
  colors: COLORS,
  fontConfig: {
    [fontFamily]: {
      100: {
        normal: `${fontFamily}-Light`,
        italic: `${fontFamily}-LightItalic`,
      },
      200: {
        normal: `${fontFamily}-ExtraLight`,
        italic: `${fontFamily}-ExtraLightItalic`,
      },
      300: {
        normal: `${fontFamily}-Regular`,
        italic: `${fontFamily}-Italic`,
      },
      400: {
        normal: `${fontFamily}-Medium`,
        italic: `${fontFamily}-MediumItalic`,
      },
      500: {
        normal: `${fontFamily}-SemiBold`,
        italic: `${fontFamily}-SemiBoldItalic`,
      },
      600: {
        normal: `${fontFamily}-Bold`,
        italic: `${fontFamily}-BoldItalic`,
      },
      700: {
        normal: `${fontFamily}-ExtraBold`,
        italic: `${fontFamily}-ExtraBoldItalic`,
      },
      800: {
        normal: `${fontFamily}-Black`,
        italic: `${fontFamily}-BlackItalic`,
      },
      900: {
        normal: `${fontFamily}-Black`,
        italic: `${fontFamily}-BlackItalic`,
      },
    },
    fonts: {
      heading: `${fontFamily}`,
      body: `${fontFamily}`,
      mono: `${fontFamily}`,
    },
  },
});

export default CustomTheme;
