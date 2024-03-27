import { Box, HStack, Input, VStack, Pressable, Heading, Divider, Actionsheet, SimpleGrid, useDisclose, Image } from 'native-base';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
    TouchableWithoutFeedback,
    SafeAreaView,
    Modal,
} from 'react-native';
import { AppIcon, Content } from '~/components/core';
import { COLORS, WIDTH } from '~/styles';


type Props = {
    visible: boolean;
    onSelect: () => void;
    onClose: () => void;
    onCloseShare: () => void;

};

export default ({ onClose, onSelect, visible }: Props) => {
    const [searchTxt, setSearchTxt] = useState('');

    const [locationPermission, setLocationPermission] = useState(false);

    const { isOpen, onOpen, onClose: onCloseShare } = useDisclose();

    const categories = [
        {
            id: 0,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/11662/11662876.png',
            label: 'Copy Link',
        },
        {
            id: 1,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/4494/4494494.png',
            label: 'WhatsApp',
        },
        {
            id: 2,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/1370/1370907.png',
            label: 'Messages',
        },
        {
            id: 3,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968804.png',
            label: 'Telegram',
        },
        {
            id: 4,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/3670/3670166.png',
            label: 'Snapchat',
        },
        {
            id: 5,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png',
            label: 'Facebook',
        },
        {
            id: 6,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/3955/3955024.png',
            label: 'Instagram',
        },
        {
            id: 7,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/7515/7515150.png',
            label: 'Nearby',
        },
        {
            id: 8,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968523.png',
            label: 'Drive',
        },
        {
            id: 3,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/6125/6125000.png',
            label: 'Chrome',
        },
    ];

    return (
        <>
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => onClose()}>
                <TouchableWithoutFeedback onPress={() => onClose()}>
                    <SafeAreaView>
                        <Box m={3}>
                            <VStack w="100%" space={5} alignSelf="center">
                                <HStack mt={2} space={4}>
                                    <Pressable onPress={() => onClose()}>
                                        <AppIcon MaterialIconsName='arrow-back' size={25} color={'black'} />
                                    </Pressable>
                                    <Content alignSelf={'center'} fontSize="lg">
                                        Search
                                    </Content>
                                </HStack>

                                <Input
                                    placeholder="Enter your area or location"
                                    width="100%"
                                    borderRadius="6"
                                    backgroundColor={'#fff'}
                                    py="1"
                                    px="4"

                                    fontSize="13"
                                    InputRightElement={
                                        <HStack mr={2} space={4} justifyContent={'center'} alignItems={'center'}>
                                            <Pressable _pressed={{ opacity: 0.5 }}>
                                                <AppIcon IoniconsName='search-outline' size={23} color={'gray'} />
                                            </Pressable>
                                            <Pressable _pressed={{ opacity: 0.5 }}>
                                                <AppIcon EntypoName='mic' size={20} color={COLORS.ORANGE} />
                                            </Pressable>
                                        </HStack>
                                    }
                                    value={searchTxt}
                                    onChangeText={setSearchTxt}
                                />


                                <HStack space={2}>

                                    <Pressable _pressed={{ opacity: 0.5 }} onPress={() => onClose()}>
                                        <HStack space={2}>

                                            <AppIcon MaterialCommunityIconsName='navigation-variant' size={25} color={COLORS.ORANGE} />
                                            <Heading color={COLORS.ORANGE} size={'md'}>Use my current location</Heading>
                                        </HStack>


                                    </Pressable>
                                </HStack>
                                <Divider />
                                <Heading size={'xs'} color={'gray.500'} >SAVED ADDRESSES</Heading>

                                <Pressable _pressed={{ opacity: 0.5 }} onPress={() => onClose()}>
                                    <HStack justifyContent={'space-between'} alignItems={'center'}>
                                        <VStack w={'80%'} space={2}>
                                            <HStack space={1} alignItems={'center'} >
                                                <AppIcon MaterialCommunityIconsName='navigation-variant' size={25} color={COLORS.GREY} />
                                                <Heading size={'sm'} color={'gray.900'}> Home </Heading>
                                            </HStack>
                                            <Box>
                                                <Content fontSize={12} color={'gray.600'} noOfLines={1}  >Plot 160 Hakim Manzil, phase 3 Dumduma hdhdd dhbdhd hhdh </Content>
                                                {/* <Heading size={'xs'} color={'gray.400'} noOfLines={1}  >Plot 160 Hakim Manzil, phase 3 Dumduma hdhdd dhbdhd hhdh </Heading> */}
                                            </Box>
                                        </VStack>
                                        <Pressable _pressed={{ opacity: 0.5 }} onPress={onOpen} >
                                            <Box bg={'gray.200'} rounded={'full'} p={1.5}>
                                                <AppIcon EntypoName='share' size={22} color={'gray'} />
                                            </Box>
                                        </Pressable>
                                    </HStack>
                                </Pressable>

                                <Pressable _pressed={{ opacity: 0.5 }} onPress={() => onClose()} >
                                    <HStack justifyContent={'space-between'} alignItems={'center'}>
                                        <VStack w={'80%'} space={2}>
                                            <HStack space={1} alignItems={'center'} >
                                                <AppIcon MaterialCommunityIconsName='navigation-variant' size={25} color={COLORS.GREY} />
                                                <Heading size={'sm'} color={'gray.900'}> Office </Heading>
                                            </HStack>
                                            <Box>
                                                <Content fontSize={12} color={'gray.600'} noOfLines={1}  >Plot 160 Hakim Manzil, phase 3 Dumduma hdhdd dhbdhd hhdh </Content>
                                                {/* <Heading size={'xs'} color={'gray.400'} noOfLines={1}  >Plot 160 Hakim Manzil, phase 3 Dumduma hdhdd dhbdhd hhdh </Heading> */}
                                            </Box>
                                        </VStack>
                                        <Pressable _pressed={{ opacity: 0.5 }} >
                                            <Box bg={'gray.200'} rounded={'full'} p={1.5}>
                                                <AppIcon EntypoName='share' size={22} color={'gray'} />
                                            </Box>
                                        </Pressable>
                                    </HStack>
                                </Pressable>
                            </VStack>
                        </Box>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>


            <Actionsheet isOpen={isOpen} onClose={onCloseShare}>
                <Actionsheet.Content>
                    <Heading size={'md'} opacity={0.8}>Share this Item</Heading>
                    <SimpleGrid columns={4} mt={5}>
                        {categories.map((category, index) => (
                            <Pressable _pressed={{ opacity: 0.5 }}>
                                <VStack
                                    key={index}
                                    py={1}
                                    m={2}
                                    w={WIDTH / 5.2}
                                    alignItems={'center'}
                                    space={3}
                                >
                                    <Image source={{ uri: category.imageUrl }} resizeMode='contain' alt={category.label} h={6} w={6} />
                                    <Content weight='400' fontSize={12} color={'black'} textAlign={'center'}>
                                        {category.label}
                                    </Content>
                                </VStack>
                            </Pressable>
                        ))}
                    </SimpleGrid>

                </Actionsheet.Content>
            </Actionsheet>

        </>
    );
};
