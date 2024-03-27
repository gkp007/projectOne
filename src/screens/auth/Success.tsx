import AnimatedLottieView from 'lottie-react-native';
import {
    Box,
    ScrollView,
    useColorModeValue,
    VStack,
    Heading,
    HStack,
} from 'native-base';
import React from 'react';
import { LOTTI } from '~/assets/animations';
import { COLORS, WIDTH } from '~/styles';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import { Btn, Content } from '~/components/core';
import useAuth from '~/hooks/useAuth';
import { useAppContext } from '../../context/AppContextProvider';

export default function Success(): JSX.Element {
    const bg4 = useColorModeValue('white', 'black');
    const { navigate } = useNavigation<StackAndTabType>();
    const { user } = useAuth();
    const { setIsLoggedIn } = useAppContext();

    return (
        <Box safeAreaTop h="full" bg={'white'}>
            <ScrollView showsVerticalScrollIndicator={false} mt={50}>
                <VStack flex={1} justifyContent="center" p={2} w={WIDTH}>
                    <VStack space={5} alignItems="center">
                        <Box size={'250'} alignSelf={'center'}>
                            <AnimatedLottieView source={LOTTI.SUCCESS} autoPlay loop={true} />
                        </Box>
                        <Heading fontSize={25} textAlign={'center'} color={COLORS.PRIMARY}>
                            Successfully
                        </Heading>
                        <Content fontSize={14} color={'gray.500'} textAlign={'center'}>
                            Your account has been created,click Okay to go home page.
                        </Content>
                    </VStack>
                </VStack>
            </ScrollView>

            <Box w={'97%'} my={5} alignSelf={'center'}>
                <Btn
                    shadow={1}
                    borderRadius="5"
                    alignItems={'center'}
                    w="full"
                    bg={COLORS.PRIMARY}
                    onPress={() => setIsLoggedIn(true)}
                    _text={{
                        color: bg4,
                        fontSize: '18',
                        fontFamily: 'Montserrat-Semibold',
                        textAlign: 'center',
                    }}
                >
                    <HStack space={2}>
                        <Heading size={'md'} color={'white'}>
                            Okay
                        </Heading>
                    </HStack>
                </Btn>
            </Box>
        </Box>
    );
}
