import {Auth, Public} from '~/screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type PublicScreens = {
  [key in keyof typeof Public]: undefined;
};

type AuthScreens = {
  [key in keyof typeof Auth]: undefined;
};

type OmittedScreen = 'OTPScreen';

export type PublicNavigationProp = Omit<PublicRoutesTypes, OmittedScreen> & {
  OTPScreen: {token?: any; objData?: any};
};

export type PublicRoutesTypes = PublicScreens & AuthScreens;

export type PublicRouteProps = NativeStackNavigationProp<PublicRoutesTypes>;
