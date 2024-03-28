import React from 'react';
import {
  Box,
  useColorModeValue,
  VStack,
  HStack,
  Pressable,
  Heading,
  Toast,
  useToast,
  Spinner,
  Image,
} from 'native-base';
import { Content, OTPInput } from '~/components/core';
import { Btn } from '~/components/core';
import { COLORS } from '~/styles';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import { useAuth, useMutation } from '~/hooks';
import { IMAGES } from '~/assets';
import { ImageBackground } from 'react-native';
import { PublicRoutesTypes } from '~/routes/public/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import localStorage from '@react-native-async-storage/async-storage';

type otp = {
  Success: undefined;
};

type Props = NativeStackScreenProps<PublicRoutesTypes, 'OTPScreen'>;
export default function OTPVerification({ route: { params } }: Props): JSX.Element {
  const [otpValue, setOtpValue] = React.useState<string[]>([]);
  const bg4 = useColorModeValue('white', 'black');
  const { navigate, goBack } = useNavigation<StackAndTabType>();
  const { token, objData } = params; // Accessing route params?
  const [asyncToken, setSyncToken] = React.useState<any>();
  const { mutation: login, isLoading } = useMutation();
  const { mutation: otp, isLoading: isOtpLoading } = useMutation();
  React.useEffect(() => {
    const fetchData = async () => {
      const accessToken = await localStorage.getItem('accessToken');
      setSyncToken(accessToken);
    };

    fetchData();
  }, [objData]);

  const handleOtpChange = (newValue: string[]) => {
    setOtpValue(newValue);
  };
  console.log({ objData });

  const handleResend = async () => {
    try {
      const res = await otp(`auth/generate-otp`, {
        body: objData,
      });

      Toast.show({
        title: 'OTP sent successfully',
        duration: 2000,
        bg: 'success.500',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { setUser, getUser, setToken } = useAuth();

  const toast = useToast();

  const handleLogin = async () => {
    try {
      const res = await login(`auth/login-with-phone`, {
        body: {
          token: params?.token || asyncToken,
          otp: otpValue,
        },
      });

      // setUser({
      //   mobile: mobileNumber,
      //   otp: otpValue.join(''), // Assuming you need the OTP value in string format
      // });726866

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

  return (
    <Box
      safeAreaTop
      h="full"
      bg={{
        linearGradient: {
          colors: ['gray.100', 'blue.400', 'blue.700'],
          start: [1, 0, 1],
          end: [0, 1],
        },
      }}>
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
        <Box
          position="absolute"
          borderTopRightRadius={20}
          borderTopLeftRadius={20}
          bottom={0}
          left={0}
          right={0}
          bg={'white'}>
          <Box w={'97%'} my={5} alignSelf={'center'}>
            <VStack space={10}>
              <VStack space={5}>
                <Heading fontSize={22} textAlign={'center'} color={'black'}>
                  Verify Your Mobile
                </Heading>
                <Content
                  fontSize={12}
                  alignSelf={'center'}
                  w={'80%'}
                  color={'blue.500'}
                  textAlign={'center'}>
                  Enter 6-digit verification code sent to your mobile number{' '}
                </Content>
              </VStack>
              <Box mx={5}>
                <OTPInput
                  length={6}
                  disabled={false}
                  onChange={handleOtpChange}
                />
              </Box>
              <Box>
                <HStack
                  mb={1}
                  justifyContent={'center'}
                  alignItems={'center'}
                  mt={4}
                  space={1}>
                  <Content fontSize={11} weight="400" color={'gray'}>
                    Didn't received the OTP?
                  </Content>
                  <Pressable _pressed={{ opacity: 0.5 }} onPress={handleResend}>
                    <Content
                      underline
                      fontSize={12}
                      weight="400"
                      color={COLORS.PRIMARY}>
                      Resend OTP
                    </Content>
                  </Pressable>
                </HStack>
                <Box m={2}>
                  <Btn
                    shadow={1}
                    borderRadius="5"
                    alignItems={'center'}
                    w="full"
                    onPress={handleLogin}
                    bg={COLORS.PRIMARY}
                    _text={{
                      color: bg4,
                      fontSize: '14',
                      fontFamily: 'Montserrat-Semibold',
                      textAlign: 'center',
                    }}>
                    <HStack space={4} alignItems={'center'}>
                      {/* <Spinner alignSelf={'center'} size={13} color={'white'} /> */}

                      {isLoading ? (
                        <Spinner size={'sm'} color={'white'} />
                      ) : (
                        <Heading py={1} fontSize={15} color={'white'}>
                          Submit
                        </Heading>
                      )}
                    </HStack>
                  </Btn>
                </Box>
              </Box>
            </VStack>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
}
function async(arg0: () => void, arg1: never[]): React.EffectCallback {
  throw new Error('Function not implemented.');
}
