import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AnimatedLottieView from 'lottie-react-native';
import {
  Box,
  Center,
  HStack,
  IInputProps,
  Image,
  ScrollView,
  VStack,
  useToast,
  Pressable,
  Text,
  Alert,
  Heading,
  Spinner,
} from 'native-base';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageBackground, Linking, useWindowDimensions } from 'react-native';
import { IMAGES } from '~/assets';
import { LOTTI } from '~/assets/animations';
import { AppInput, Btn, Content, CountryPicker } from '~/components/core';
import AppIcon, { IconProps } from '~/components/core/AppIcon';
import { useAuth, useMutation, useSwrApi } from '~/hooks';
import { PublicRoutesTypes } from '~/routes';
import { COLORS, HEIGHT } from '~/styles';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

type FormInput = {
  key: string;
  label?: string;
  placeholder: string;
  icon: IconProps;
  rules: Object;
  inputProps?: IInputProps;
};

type FormData = {
  [key: string]: string;
};

export default function Login(): JSX.Element {
  const toast = useToast();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const { mutation: gmail, isLoading: isGmailValidating } = useMutation();
  let objData: any = {};
  const { navigate } =
    useNavigation<NativeStackNavigationProp<PublicRoutesTypes>>();
  const { height } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { setUser, getUser, setToken } = useAuth();
  const { mutation: login, isLoading } = useMutation();
  const { mutation: gLogin } = useMutation();

  const { data, error, isValidating } = useSwrApi(`auth/google/select-profile`);

  // console.log(data, 'data');

  const handleLogin = async (formData: FormData) => {
    try {
      const { mobile } = formData;
      // console.log('Mobile Number:', mobile);
      // console.log('Mobile Number:', selectedCountry.name);
      // console.log('Mobile Number:', selectedCountry.phone);
      objData = {
        phone: mobile,
        country_details: {
          name: selectedCountry.name,
          code: selectedCountry.phone,
        },
      };

      const res = await login(`auth/generate-otp`, {
        isAlert: true,
        body: objData,
      });

      console.log(res, 'res');
      if (res?.results?.success && res?.results?.data?.token) {
        setToken(res?.results?.data?.token);
        getUser();

        navigate('OTPScreen', {
          token: res?.results?.data?.token,
          objData,
        });
      }
      // console.log(res);
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
      );
    }
  };

  GoogleSignin.configure({
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     // You can now use userInfo to authenticate the user in your app
  //     console.log(userInfo);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // User cancelled the sign-in flow
  //       console.log('User cancelled the sign-in flow');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // Sign-in is already in progress
  //       console.log('Sign-in is already in progress');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // Play Services not available or outdated
  //       console.log('Play Services not available or outdated');
  //     } else {
  //       // Some other error occurred
  //       console.error('Error occurred while signing in:', error);
  //     }
  //   }453306
  // };

  const handleLoginWithGmail = async (data: FormData) => {
    const { username, password } = data;
    try {
      const res = await gmail(`auth/login-with-email-and-password`, {
        body: {
          email: username,
          password,
        },
      });
      console.log(res, 'res gmail')
      if (res?.results?.success) {
        setToken(res?.results?.data?.token);
        setUser(res?.results?.data);
        toast.show({
          title: res?.results?.success ? 'Login Successful!' : 'Login Failed',
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedCountry, setSelectedCountry] = useState({
    code: 'IN',
    name: 'India',
    phone: '91',
  });

  const formInputs: FormInput[] = useMemo(
    () => [
      {
        key: 'mobile',
        label: undefined,
        placeholder: 'Enter your mobile number',
        icon: { IoniconsName: 'call', color: 'gray' },
        rules: {
          required: 'Mobile number is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Invalid mobile number',
          },
        },
        inputProps: {
          keyboardType: 'numeric',
          autoCapitalize: 'none',
          variant: 'underlined',
        },
      },
    ],
    [secureTextEntry],
  );

  const formInputs1: FormInput[] = useMemo(
    () => [
      {
        key: 'username',
        label: 'Email',
        placeholder: 'Username',
        icon: { FeatherName: 'mail' },
        rules: {
          required: 'Username is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        },
        inputProps: {
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          marginBottom: '2',
        },
      },
      {
        key: 'password',
        label: 'Password',
        placeholder: 'Password',
        icon: { FeatherName: 'lock' },
        rules: {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        },
        inputProps: {
          secureTextEntry,
          rightElement: (
            <Btn
              colors={['#fff', '#fff']}
              _text={{ color: 'black', fontSize: 'xs' }}
              onPress={() => setSecureTextEntry(!secureTextEntry)}>
              {secureTextEntry ? 'Show' : 'Hide'}
            </Btn>
          ),
        },
      },
    ],
    [secureTextEntry],
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Box
        zIndex={1}
        bg={{
          linearGradient: {
            colors: ['gray.100', 'blue.400', 'blue.700'],
            start: [1, 0, 1],
            end: [0, 1],
          },
        }}
        flex={1}
        position="relative">
        <ImageBackground
          style={{ flex: 1, height: 450 }}
          borderRadius={5}
          resizeMode="cover"
          source={IMAGES.FIRST}
          alt="Logo"
          imageStyle={{ opacity: 0.2, backgroundColor: 'blue' }}>
          <Image
            source={IMAGES.SECOND}
            resizeMode={'contain'}
            h="32"
            top={-15}
            bg={'transparent'}
            borderWidth={1}
            alt="Logo"
            my="2"
          />

          <Heading mt={16} textAlign={'center'} fontSize={30} color={'white'}>
            Connect with skilled people
          </Heading>

          <Heading textAlign={'center'} fontSize={15} mt={3} color={'white'}>
            Welcome to the top connection platform
          </Heading>
          <Text mb={3} bold textAlign={'center'} fontSize={15} color={'white'}>
            Login
          </Text>
        </ImageBackground>

        <Box
          position="absolute"
          borderTopRightRadius={20}
          borderTopLeftRadius={20}
          bottom={0}
          left={0}
          right={0}
          bg={'white'}>
          {/* <Box position={'absolute'} alignItems={'center'} justifyContent={'center'} bg={'white'} borderTopRightRadius={15} borderTopLeftRadius={15} top={-35} ml={160} h={20} w={32}>
           
          </Box> */}
          <VStack space={5} mb={2} mt={5}>
            <Box>
              <Heading textAlign={'center'} fontSize={22} color={'black'}>
                Enter Your Mobile Number
              </Heading>
              <Box mt={2} alignItems={'center'}>
                <Content fontSize={11} color={'blue.500'}>
                  We will send you a confirmation code
                </Content>
              </Box>
            </Box>
            {!isPhone ? (
              <VStack space={2}>
                <Box px="4">
                  {formInputs1.map(input => (
                    <AppInput
                      input={input}
                      key={input.key}
                      control={control}
                      errorMessage={errors?.[input?.key]?.message}
                    />
                  ))}
                </Box>

                <Box m={2}>
                  <Btn
                    bg={COLORS.PRIMARY}
                    _text={{ color: 'white', fontSize: 'sm' }}
                    onPress={handleSubmit(handleLoginWithGmail)}
                    shadow={0.8}>
                    <Heading fontSize={15} py={1} color={'white'}>
                      {isLoading || isGmailValidating ? (
                        <Spinner size={'sm'} color={'white'} />
                      ) : (
                        <>
                          <Text> Submit </Text>
                          <AppIcon
                            FeatherName="log-in"
                            color={'white'}
                            size={20}
                          />
                        </>
                      )}
                    </Heading>
                  </Btn>
                </Box>
              </VStack>
            ) : (
              <VStack space={2}>
                <Box px="4">
                  {formInputs.map(input => (
                    <AppInput
                      input={input}
                      key={input.key}
                      control={control}
                      errorMessage={errors?.[input?.key]?.message}
                      leftElement={
                        <Pressable onPress={() => setVisible(true)}>
                          <HStack alignItems={'center'} space={1}>
                            <Image
                              source={{
                                uri: `https://flagcdn.com/w160/${selectedCountry.code.toLocaleLowerCase()}.webp`,
                              }}
                              alt="IN"
                              h={5}
                              w={8}
                              mr={2}
                              key="1"
                              alignSelf={'center'}
                              resizeMode="contain"
                              borderRadius={2}
                            />

                            <AppIcon
                              AntDesignName="caretdown"
                              color={'#000'}
                              size={10}
                            />
                          </HStack>
                        </Pressable>
                      }
                    />
                  ))}
                </Box>

                <Box m={4}>
                  <Btn
                    bg={COLORS.PRIMARY}
                    _text={{ color: 'white', fontSize: 'sm' }}
                    onPress={handleSubmit(handleLogin)}
                    shadow={0.8}>
                    {isLoading ? (
                      <Spinner size={'sm'} color={'white'} />
                    ) : (
                      <Heading fontSize={15} py={1} color={'white'}>
                        Sign In
                      </Heading>
                    )}

                    <AppIcon FeatherName="log-in" color={'white'} size={20} />
                  </Btn>
                </Box>

                <Text mb={4} textAlign={'center'}>
                  - Or -
                </Text>

                <Pressable
                  _pressed={{ opacity: 0.8 }}
                  w={'92%'}
                  py={1.5}
                  borderColor={'blue.800'}
                  borderRadius={6}
                  bg={'white'}
                  alignSelf={'center'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderWidth={0.3}>
                  <HStack
                    alignItems={'center'}
                    justifyContent={'center'}
                    space={3}>
                    <Image
                      source={IMAGES.GOOGLE}
                      resizeMode={'contain'}
                      h="5"
                      w="6"
                      bg={'transparent'}
                      alt="Logo"
                    />
                    <Heading fontSize={15} py={1} color={'black'}>
                      Login With Google
                    </Heading>
                  </HStack>
                </Pressable>
              </VStack>
            )}
            <Pressable
              _pressed={{ opacity: 0.8 }}
              w={'92%'}
              py={1.5}
              onPress={() => {
                setIsPhone(!isPhone);
              }}
              borderColor={'blue.800'}
              borderRadius={6}
              bg={'white'}
              alignSelf={'center'}
              justifyContent={'center'}
              alignItems={'center'}
              borderWidth={0.3}>
              <HStack alignItems={'center'} justifyContent={'center'} space={3}>
                <AppIcon
                  FontistoName={!isPhone ? 'phone' : 'email'}
                  size={18}
                />
                <Heading fontSize={15} py={1} color={'black'}>
                  {`Login With ${!isPhone ? 'Phone' : 'Gmail'}`}
                </Heading>
              </HStack>
            </Pressable>

            {/* <Box mt={5} alignItems={'center'}>
              <HStack>
                <Content fontSize={11} color="gray.500" weight="400">
                  By continuing, you agree to our{' '}
                </Content>
                <Pressable _pressed={{ opacity: 0.6 }}
                // onPress={() => Linking.openURL('https://yard-ecommerce-web.vercel.app/terms-and-conditions')}
                >
                  <Content fontSize={12} weight="400" color="red.500" underline>
                    Terms and Conditions
                  </Content>
                </Pressable>
              </HStack>
              <HStack>
                <Content fontSize={11} color="gray.500" weight="400">
                  and{' '}
                </Content>
                <Pressable
                  _pressed={{ opacity: 0.6 }}
                onPress={() => Linking.openURL('https://yard-ecommerce-web.vercel.app/privacy-policy')}
                >
                  <Content fontSize={12} weight="400" color="red.500" underline>
                    Privacy Policy
                  </Content>
                </Pressable>
              </HStack>
            </Box> */}

            <Box
              alignItems="center"
              flexDirection="row"
              justifyContent={'center'}>
              <Text fontSize="16" fontWeight="400">
                Don't have an account?
              </Text>
              <Btn
                colors={['#fff', '#fff']}
                _text={{
                  color: COLORS.PRIMARY,
                  fontSize: 'sm',
                  fontWeight: '',
                }}
                onPress={() => navigate('Register')}>
                Register
              </Btn>
            </Box>
          </VStack>
        </Box>
      </Box>

      <CountryPicker
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onSelect={(country: any) => {
          setSelectedCountry(country);
          setVisible(false);
        }}
      />
    </ScrollView>
  );
}
