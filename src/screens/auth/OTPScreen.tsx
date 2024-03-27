import React from 'react';
import { Box, useColorModeValue, VStack, HStack, Pressable, Heading, Toast, useToast, Spinner, Image } from 'native-base';
import { Content, OTPInput } from '~/components/core';
import { Btn } from '~/components/core';
import { COLORS } from '~/styles';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import { useAuth } from '~/hooks';
import { IMAGES } from '~/assets';
import { ImageBackground } from 'react-native';

type otp = {
    Success: undefined;
};

type OTPScreenRouteProp = RouteProp<StackAndTabType, 'OTPScreen'>;

type Props = {
    route: OTPScreenRouteProp;
};

export default function OTPVerification({ route }: Props): JSX.Element {
    const [otpValue, setOtpValue] = React.useState<string[]>([]);
    const bg4 = useColorModeValue('white', 'black');
    const { navigate, goBack } = useNavigation<StackAndTabType>();
    const { token, mobileNumber, code } = route.params; // Accessing route params

    const handleOtpChange = (newValue: string[]) => {
        setOtpValue(newValue);
    };

    const handleResend = () => {
        Toast.show({
            title: 'OTP sent successfully',
            duration: 2000,
            bg: 'success.500',
        });
    };

    const { setUser } = useAuth();
    const toast = useToast();

    const handleLogin = async () => {
        try {
            toast.show({
                title: true ? 'Login Successful!' : 'Login Failed',
                duration: 5000,
            });
            setUser({
                mobile: mobileNumber,
                otp: otpValue.join(''), // Assuming you need the OTP value in string format
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box safeAreaTop h="full" bg={{ linearGradient: { colors: ['gray.100', 'blue.400', 'blue.700'], start: [1, 0, 1], end: [0, 1] } }}>
            <ImageBackground style={{ flex: 1, height: 450 }} borderRadius={5} resizeMode='cover' source={IMAGES.FIRST} alt="Logo" imageStyle={{ opacity: 0.2, backgroundColor: 'blue' }}>
                <Image source={IMAGES.SECOND} resizeMode={'contain'} h="32" top={-15} bg={'transparent'} borderWidth={1} alt="Logo" my="2" />
                <Box position="absolute" borderTopRightRadius={20} borderTopLeftRadius={20} bottom={0} left={0} right={0} bg={'white'}>
                    <Box w={'97%'} my={5} alignSelf={'center'}>
                        <VStack space={10}>
                            <VStack space={5}>
                                <Heading fontSize={22} textAlign={'center'} color={'black'}>Verify Your Mobile</Heading>
                                <Content fontSize={12} alignSelf={'center'} w={'80%'} color={'blue.500'} textAlign={'center'}>
                                    Enter 6-digit verification code sent to your mobile number {mobileNumber}
                                </Content>
                            </VStack>
                            <Box mx={5}>
                                <OTPInput length={5} disabled={false} onChange={handleOtpChange} />
                            </Box>
                            <Box>
                                <HStack mb={1} justifyContent={'center'} alignItems={'center'} mt={4} space={1}>
                                    <Content fontSize={11} weight='400' color={'gray'}>Didn't received the OTP?</Content>
                                    <Pressable _pressed={{ opacity: 0.5 }} onPress={handleResend}>
                                        <Content underline fontSize={12} weight='400' color={COLORS.PRIMARY}>Resend OTP</Content>
                                    </Pressable>
                                </HStack>
                                <Box m={2}>
                                    <Btn shadow={1} borderRadius="5" alignItems={'center'} w="full" onPress={handleLogin} bg={COLORS.PRIMARY} _text={{ color: bg4, fontSize: '14', fontFamily: 'Montserrat-Semibold', textAlign: 'center' }}>
                                        <HStack space={4} alignItems={'center'}>
                                            <Spinner alignSelf={'center'} size={13} color={'white'} />
                                            <Heading py={1} fontSize={15} color={'white'}>Submit</Heading>
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
