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
  Heading,
  Text,
  Alert,
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
import { PublicRouteProps } from '~/routes/public/types';

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

export default function Register(): JSX.Element {
  const handleRegistration = (data: FormData) => {
    try {
      toast.show({
        title: true ? 'Registration Successful!' : 'Registration Failed',
        duration: 5000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toast = useToast();
  const [isPhone, setIsPhone] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [visible, setVisible] = useState(false);
  const { navigate } = useNavigation<PublicRouteProps>();
  const { height } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { setUser, getUser, setToken } = useAuth();
  const { mutation: login, isLoading } = useMutation();
  const { mutation: gmail, isLoading: isGmailValidating } = useMutation();
  const { mutation: gLogin } = useMutation();
  let objData: any = {};
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
      const res = await login(`auth/register-with-phone`, {
        isAlert: true,
        body: objData,
      });
      // console.log(res, 'res');
      // console.log(res?.results?.success, 'success');
      // console.log(res?.results?.data?.token, 'token');

      console.log('615216');
      if (res?.results?.success && res?.results?.data?.token) {
        setToken(res?.results?.data?.token);

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

  const handleLoginWithGmail = async (data: FormData) => {
    const { username, password } = data;
    try {
      let objData = { email: username, password: password };
      const res = await gmail(`auth/register-with-email-and-password`, {
        body: {
          email: username,
          password,
        },
      });
      console.log(res);
      if (res?.results?.success && res?.results?.data?.token && res?.results?.data?.otp) {
        setToken(res?.results?.data?.token);
        await gLogin(`auth/verify-email-or-phone`, {
          body: {
            token: res?.results?.data?.token,
            otp: res?.results?.data?.otp,
          },
        })
        toast.show({
          title: res?.results?.success
            ? 'Register Successful login your account !'
            : 'Login Failed',
          duration: 5000,
        });

        navigate('Login');
      }
    } catch (error) {
      Alert(
        `${error instanceof Error ? error?.message : 'Something Went wrong'}`,
      );
    }
  };

  GoogleSignin.configure({
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  const [selectedCountry, setSelectedCountry] = useState({
    code: 'IN',
    name: 'India',
    phone: '91',
  });

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

  return (
    <>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        bg="white"
        _dark={{bg: 'dark.100'}}>
        <Center flexGrow={1} px="5" py="8" w="full">
          <Image
            width="60"
            height="60"
            my="15"
            source={IMAGES.LOGO}
            alt="logo"
          />
          <Heading mt="5" mb="4" fontSize="26" fontWeight="500" color={bg}>
            Create Your Account{' '}
          </Heading>
          {formInputs.map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
            />
          ))}

          <Box w={'100%'} mt={'4'}>
            <Btn
              bg={COLORS.PRIMARY}
              _text={{color: 'white', fontSize: 'sm', fontWeight: '900'}}
              onPress={handleSubmit(handleRegistration)}
              shadow={0.8}>
              Sign up
            </Btn>
          </Box>

          <Box alignItems="center" w="100%">
            <Text color={bg} fontSize="16" fontWeight="400" mt="4">
              or continue with
            </Text>
            <HStack space={4} mt="6" mb="6">
              <Link
                isUnderlined={false}
                href="#"
                borderColor="#f2f2f2"
                borderWidth="1.5"
                px="6"
                py="3"
                borderRadius="10">
                <ICONS.Facebook color="#3b5998" />
              </Link>
              <Link
                isUnderlined={false}
                href="#"
                borderColor="#f2f2f2"
                borderWidth="1.5"
                px="6"
                py="3"
                borderRadius="10">
                <ICONS.Email color="#BB001B" />
              </Link>
              <Link
                isUnderlined={false}
                href="#"
                borderColor="#f2f2f2"
                borderWidth="1.5"
                px="6"
                py="3"
                borderRadius="10">
                <ICONS.LinkedIn color="#0A66C2" />
              </Link>
            </HStack>
            <Text mb={4} textAlign={'center'}>
              - Or -
            </Text>

            <Pressable
              _pressed={{opacity: 0.8}}
              w={'92%'}
              py={1.5}
              my={'6'}
              borderColor={'blue.800'}
              borderRadius={6}
              bg={'white'}
              alignSelf={'center'}
              justifyContent={'center'}
              alignItems={'center'}
              borderWidth={0.3}>
              <HStack alignItems={'center'} justifyContent={'center'} space={3}>
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
            <Box alignItems="center" flexDirection="row">
              <Text color={bg} fontSize="16" fontWeight="400">
                Already have an account?
              </Text>
              <Btn
                colors={['#fff', '#fff']}
                _text={{color: 'black', fontSize: 'sm'}}
                onPress={() => navigate('Login')}>
                Login
              </Btn>
            </Box>
          </Box>
        </Center>
      </ScrollView> */}
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

            <Heading mt={1} textAlign={'center'} fontSize={30} color={'white'}>
              Connect with skilled people
            </Heading>

            <Heading textAlign={'center'} fontSize={15} mt={3} color={'white'}>
              Welcome to the top connection platform
            </Heading>
            <Text m={3} bold textAlign={'center'} fontSize={15} color={'white'}>
              Register
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
                    <HStack
                      alignItems="center"
                      flexDirection="row"
                      justifyContent={'center'}>
                      <Text fontSize="16" fontWeight="400">
                        Already have an account?
                      </Text>
                      <Btn
                        colors={['#fff', '#fff']}
                        _text={{
                          color: COLORS.PRIMARY,
                          fontSize: 'sm',
                          fontWeight: '',
                        }}
                        onPress={() => navigate('Login', { objData })}>
                        Login
                      </Btn>
                    </HStack>
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

                  <Box m={2}>
                    <Btn
                      bg={COLORS.PRIMARY}
                      _text={{ color: 'white', fontSize: 'sm' }}
                      onPress={handleSubmit(handleLogin)}
                      shadow={0.8}>
                      <Heading fontSize={15} py={1} color={'white'}>
                        {isLoading ? (
                          <Spinner size={'sm'} color={'white'} />
                        ) : (
                          <Text> Get verification code</Text>
                        )}
                      </Heading>

                      <AppIcon FeatherName="log-in" color={'white'} size={20} />
                    </Btn>
                  </Box>
                  <HStack
                    alignItems="center"
                    flexDirection="row"
                    justifyContent={'center'}>
                    <Text fontSize="16" fontWeight="400">
                      Already have an account?
                    </Text>
                    <Btn
                      colors={['#fff', '#fff']}
                      _text={{
                        color: COLORS.PRIMARY,
                        fontSize: 'sm',
                        fontWeight: '',
                      }}
                      onPress={() => navigate('Login', { objData })}>
                      Login
                    </Btn>
                  </HStack>

                  <Text mb={2} textAlign={'center'}>
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
                        Register With Google
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
                <HStack
                  alignItems={'center'}
                  justifyContent={'center'}
                  space={4}>
                  <AppIcon
                    FontistoName="email"
                    size={18}
                  />
                  <Heading fontSize={15} py={1} color={'black'}>
                    {`Register With ${!isPhone ? 'Phone' : 'Email'}`}
                  </Heading>
                </HStack>
              </Pressable>
              <Box mt={5} alignItems={'center'}>
                <HStack>
                  <Content fontSize={11} color="gray.500" weight="400">
                    By continuing, you agree to our{' '}
                  </Content>
                  <Pressable
                    _pressed={{ opacity: 0.6 }}
                    onPress={() =>
                      Linking.openURL(
                        'https://yard-ecommerce-web.vercel.app/terms-and-conditions',
                      )
                    }>
                    <Content
                      fontSize={12}
                      weight="400"
                      color="red.500"
                      underline>
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
                    onPress={() =>
                      Linking.openURL(
                        'https://yard-ecommerce-web.vercel.app/privacy-policy',
                      )
                    }>
                    <Content
                      fontSize={12}
                      weight="400"
                      color="red.500"
                      underline>
                      Privacy Policy
                    </Content>
                  </Pressable>
                </HStack>
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
    </>
  );
}
