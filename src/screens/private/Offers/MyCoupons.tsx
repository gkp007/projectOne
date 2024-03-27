import React, { useState } from 'react';
import { AlertDialog, Box, Divider, HStack, Heading, Input, Pressable, ScrollView, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AppIcon from '~/components/core/AppIcon';
import { StackAndTabType } from '~/routes/private/types';
import { COLORS, HEIGHT, WIDTH } from '~/styles';
import { Content } from '~/components/core';
import AnimatedLottieView from 'lottie-react-native';
import { LOTTI } from '~/assets/animations';
import { ToastAndroid } from 'react-native';
import Clipboard from '@react-native-community/clipboard';

const couponData = [
    {
        code: 'WELCOME100',
        discount: 'Save upto 100',
        description: 'Use code WELCOME100 and get 100 rupees flat discount on all orders above 799. Valid for new customers only.',
        terms: [
            'valid till 31 jan',
            'Applicable only for selected items',
            'Can not club with other offers',
        ],
    },
    {
        code: 'NEW20',
        discount: 'Save upto 200',
        description: 'Use code NEW20 and get 200 rupees flat discount on all orders above 999. Valid for new customers only.',
        terms: [
            'valid till 28 feb',
            'Applicable only for first-time users',
            'Not valid on discounted items',
        ],
    },
    {
        code: 'FESTIVE10',
        discount: 'Save upto 10%',
        description: 'Use code NEW20 and get 200 rupees flat discount on all orders above 999. Valid for new customers only.',
        terms: [
            'valid till 28 feb',
            'Applicable only for first-time users',
            'Not valid on discounted items',
        ],
    },
    {
        code: 'WEEKEND02',
        discount: 'Save upto 200',
        description: 'Use code NEW20 and get 200 rupees flat discount on all orders above 999. Valid for new customers only.',
        terms: [
            'valid till 28 feb',
            'Applicable only for first-time users',
            'Not valid on discounted items',
        ],
    },
    {
        code: 'WEEKEND02',
        discount: 'Save upto 200',
        description: 'Use code NEW20 and get 200 rupees flat discount on all orders above 999. Valid for new customers only.',
        terms: [
            'valid till 28 feb',
            'Applicable only for first-time users',
            'Not valid on discounted items',
        ],
    },
    {
        code: 'WEEKEND02',
        discount: 'Save upto 200',
        description: 'Use code NEW20 and get 200 rupees flat discount on all orders above 999. Valid for new customers only.',
        terms: [
            'valid till 28 feb',
            'Applicable only for first-time users',
            'Not valid on discounted items',
        ],
    },
    {
        code: 'WEEKEND02',
        discount: 'Save upto 200',
        description: 'Use code NEW20 and get 200 rupees flat discount on all orders above 999. Valid for new customers only.',
        terms: [
            'valid till 28 feb',
            'Applicable only for first-time users',
            'Not valid on discounted items',
        ],
    },
];

export default function MyCoupons() {
    const { goBack } = useNavigation<StackAndTabType>();

    const [expandedCoupons, setExpandedCoupons] = useState<string[]>([]);

    const copyToClipboard = (code: string) => {
        Clipboard.setString(code);
        ToastAndroid.show('Coupon code copied!', ToastAndroid.SHORT);
    };

    const [isFocused, setIsFocused] = useState(false);

    const handleToggleExpansion = (code: string) => {
        setExpandedCoupons((prevExpandedCoupons) =>
            prevExpandedCoupons.includes(code)
                ? prevExpandedCoupons.filter((c) => c !== code)
                : [...prevExpandedCoupons, code]
        );
    };

    const { navigate } = useNavigation<StackAndTabType>();

    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    const showAlert = () => {
        setIsOpen(true);
        setTimeout(() => {
            onClose();
            navigate('Checkout')
        }, 1500);
    };


    return (
        <Box bg={'white'} h={HEIGHT}>

            <Box bg={COLORS.PRIMARY} borderBottomRightRadius={10} borderBottomLeftRadius={10}>
                <HStack space={3} justifyContent={'flex-start'} alignItems={'center'} p={4}>
                    <Pressable onPress={() => goBack()}>
                        <AppIcon AntDesignName="arrowleft" size={24} color={'white'} />
                    </Pressable>
                    <Heading textAlign={'center'} size="md" color={'white'}>
                        My Coupons
                    </Heading>
                </HStack>

                <VStack w="100%" space={5} alignSelf="center">
                    <Box bg={COLORS.PRIMARY}>
                        <Pressable m={2} pb={2} _pressed={{ opacity: 0.5 }}>
                            <Input
                                placeholder="Enter Coupon Code"
                                placeholderTextColor={'white'}
                                width="100%"
                                borderRadius="6"
                                borderColor={'white'}
                                shadow={1}
                                bg={COLORS.PRIMARY}
                                py="1"
                                px="4"
                                fontSize="13"
                                InputRightElement={
                                    <HStack mr={2} space={4} justifyContent={'center'} alignItems={'center'}>

                                        <Pressable _pressed={{ opacity: 0.5 }} mr={2} >
                                            <Heading size={'xs'} color={'white'}>APPLY</Heading>
                                        </Pressable>
                                    </HStack>
                                }
                            />
                        </Pressable>
                    </Box>
                </VStack>
            </Box>

            <ScrollView>


                <Box mb={5} >
                    {couponData.map((coupon, index) => (
                        <Box key={index}>
                            <HStack key={index} m={3} borderRadius={10} bg={'white'} overflow={'hidden'} >
                                <Box bg={'secondary.700'} borderBottomLeftRadius={10} borderTopLeftRadius={10} minW={6} maxW={10}>
                                    {/* <Box bg={'secondary.700'} style={{ transform: [{ rotate: '270deg' }], marginTop: 62, marginLeft: -65 }}  > */}
                                    <Heading size="xs" color={'white'} style={{ transform: [{ rotate: '270deg' }], marginHorizontal: -28, marginTop: 65, alignItems: 'center', justifyContent: 'center' }}>
                                        FLAT 100 OFF
                                    </Heading>
                                    {/* </Box> */}
                                    <VStack space={12} mt={-12} ml={-1}>
                                        <Box bg={'white'} w={2} h={3} borderRadius={'full'}>

                                        </Box>
                                        <Box bg={'white'} w={2} h={3} borderRadius={'full'}>

                                        </Box>


                                    </VStack>

                                </Box>
                                <VStack space={1} w={'90%'} m={2}>

                                    <HStack px={3} justifyContent={'space-between'} w={'full'} alignItems={'center'}>
                                        <VStack space={2}>
                                            <HStack alignItems={'center'} space={2}>
                                                <Heading size={'md'} color={'gray.600'}>
                                                    {coupon.code}
                                                </Heading>
                                                <Pressable onPress={() => copyToClipboard(coupon.code)} _pressed={{ opacity: 0.5 }}>
                                                    <AppIcon AntDesignName='copy1' size={15} color={'gray'} />
                                                </Pressable>
                                            </HStack>
                                            <Heading fontSize={15} size={'xs'} color={'green.600'}>
                                                {coupon.discount}
                                            </Heading>
                                        </VStack>
                                        <Pressable onPress={showAlert} _pressed={{ opacity: 0.5 }} p={1} px={3} bg={'secondary.50'} borderRadius={5}>
                                            <Heading color={'secondary.600'} size={'sm'}>
                                                Apply
                                            </Heading>
                                        </Pressable>
                                    </HStack>

                                    <Divider w={'95%'} alignSelf={'center'} />
                                    <VStack space={3} m={2} px={1}>
                                        <Content fontSize={10} color={'gray.500'}>
                                            {coupon.description}
                                        </Content>
                                        <Pressable
                                            _pressed={{ opacity: 0.5 }}
                                            onPress={() => handleToggleExpansion(coupon.code)}
                                        >

                                            <Heading fontSize={14} color={COLORS.ORANGE}>
                                                {expandedCoupons.includes(coupon.code) ? '- LESS' : '+ MORE'}
                                            </Heading>
                                        </Pressable>

                                        {expandedCoupons.includes(coupon.code) && (
                                            <VStack space={2} mt={5} ml={-12}>
                                                {coupon.terms.map((term, i) => (
                                                    <HStack space={6} alignItems={'center'}>
                                                        <AppIcon FontAwesome5Name='hand-point-right' color={'white'} size={20} />
                                                        <Content key={i} fontSize={12} color={'gray.500'}>
                                                            {term}
                                                        </Content>
                                                    </HStack>
                                                ))}
                                            </VStack>
                                        )}
                                    </VStack>
                                </VStack>
                            </HStack>
                            <Divider />
                        </Box>
                    ))}
                </Box>
            </ScrollView>



            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>



                <Box bg={'transparent'} h={HEIGHT / 5} w={WIDTH * 0.8} alignItems={'center'} justifyContent={'center'}>
                    <AnimatedLottieView
                        source={LOTTI.COUPONSUCCESS}
                        autoPlay
                        loop={false}
                    />
                </Box>
                {/* <Heading mb={8} textAlign={'center'} color={'white'}>Coupon Applied</Heading> */}


            </AlertDialog >

        </Box>
    );
}
