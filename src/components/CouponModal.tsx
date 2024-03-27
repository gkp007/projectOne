import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Input, VStack, Pressable, Heading, Divider, ScrollView, FlatList } from 'native-base';
import React, { useState } from 'react';
import {
    TouchableWithoutFeedback,
    SafeAreaView,
    Modal,
} from 'react-native';
import { AppIcon, Content } from '~/components/core';
import { StackAndTabType } from '~/routes/private/types';
import { COLORS } from '~/styles';


type Props = {
    visible: boolean;
    onSelect: () => void;
    onClose: () => void;
};

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

export default ({ onClose, onSelect, visible }: Props) => {
    const [searchTxt, setSearchTxt] = useState('');

    const { goBack, navigate } = useNavigation<StackAndTabType>();

    const [expandedCoupons, setExpandedCoupons] = useState<string[]>([]);

    const [isFocused, setIsFocused] = useState(false);

    const handleToggleExpansion = (code: string) => {
        setExpandedCoupons((prevExpandedCoupons) =>
            prevExpandedCoupons.includes(code)
                ? prevExpandedCoupons.filter((c) => c !== code)
                : [...prevExpandedCoupons, code]
        );
    };


    return (
        <>
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => onClose()}>
                <TouchableWithoutFeedback onPress={() => onClose()}>
                    <SafeAreaView>
                        <Box >
                            <VStack w="100%" space={5} alignSelf="center">
                                <HStack mt={2} space={4}>
                                    <Pressable onPress={() => onClose()}>
                                        <AppIcon MaterialIconsName='arrow-back' size={25} color={'black'} />
                                    </Pressable>
                                    <Content alignSelf={'center'} fontSize="lg">
                                        Available Coupon
                                    </Content>
                                </HStack>

                                <VStack w="100%" space={5} alignSelf="center">
                                    <Box>
                                        <Pressable m={2} _pressed={{ opacity: 0.5 }}>
                                            <Input
                                                placeholder="Enter Coupon Code"
                                                placeholderTextColor={'grey'}
                                                width="100%"
                                                borderRadius="6"
                                                borderColor={'black'}
                                                bg={'gray'}
                                                py="1"
                                                px="4"
                                                fontSize="13"
                                                InputRightElement={
                                                    <HStack mr={2} space={4} justifyContent={'center'} alignItems={'center'}>

                                                        <Pressable _pressed={{ opacity: 0.5 }} mr={2}>
                                                            <Heading size={'xs'} color={'black'}>APPLY</Heading>
                                                        </Pressable>
                                                    </HStack>
                                                }
                                            />
                                        </Pressable>
                                    </Box>
                                </VStack>


                                <FlatList
                                    data={couponData}
                                    keyExtractor={(_item: any, index: { toString: () => any; }) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <>
                                            <HStack key={index} m={2} borderRadius={10} bg={'white'} overflow={'hidden'} >
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
                                                            <Heading size={'md'} color={'gray.600'}>
                                                                {item.code}
                                                            </Heading>
                                                            <Heading fontSize={15} size={'xs'} color={'green.600'}>
                                                                {item.discount}
                                                            </Heading>
                                                        </VStack>
                                                        <Pressable onPress={() => navigate('AllProducts')} _pressed={{ opacity: 0.5 }} p={1} px={3} bg={'secondary.50'} borderRadius={5}>
                                                            <Heading color={'secondary.600'} size={'sm'}>
                                                                Shop Now
                                                            </Heading>
                                                        </Pressable>
                                                    </HStack>

                                                    <Divider w={'95%'} alignSelf={'center'} />
                                                    <VStack space={3} m={2} px={1}>
                                                        <Content fontSize={10} color={'gray.500'}>
                                                            {item.description}
                                                        </Content>
                                                        <Pressable
                                                            _pressed={{ opacity: 0.5 }}
                                                            onPress={() => handleToggleExpansion(item.code)}
                                                        >

                                                            <Heading fontSize={14} color={COLORS.ORANGE}>
                                                                {expandedCoupons.includes(item.code) ? '- LESS' : '+ MORE'}
                                                            </Heading>
                                                        </Pressable>

                                                        {expandedCoupons.includes(item.code) && (
                                                            <VStack space={2} mt={5}>
                                                                {item.terms.map((term, i) => (
                                                                    <HStack space={3} alignItems={'center'}>
                                                                        <AppIcon FontAwesome5Name='hand-point-right' color={'green'} />
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
                                        </>
                                    )}
                                    showsVerticalScrollIndicator={false}
                                />
                            </VStack>
                        </Box>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};
