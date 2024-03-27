import React, { useEffect, useState } from 'react';
import {
    TouchableWithoutFeedback,
    SafeAreaView,
    Modal,
} from 'react-native';
import { Box, HStack, Input, VStack, Pressable, Heading, Divider, ScrollView } from 'native-base';
import { AppIcon, Content } from '~/components/core';
import { COLORS } from '~/styles';
import { RecommendedItem } from '~/components';
import { StackAndTabType } from '~/routes/private/types';
import { useNavigation } from '@react-navigation/native';
import PopularSearches from '~/components/PopularSearch';

type Props = {
    visible: boolean;
    onSelect: () => void;
    onClose: () => void;
};
type Item = {
    name: string;
};


export default ({ onClose, onSelect, visible }: Props) => {
    const [searchTxt, setSearchTxt] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    useEffect(() => {
        if (!visible) {
            setSearchTxt('');
        }
    }, [visible]);

    const handleSearch = () => {
        if (searchTxt.trim() !== '') {
            setSearchHistory((prevHistory) => [
                searchTxt.trim(),
                ...prevHistory.slice(0, 2),
            ]);

            onClose();
        }
    };

    const { navigate } = useNavigation<StackAndTabType>();

    const recommendedItemsData = [
        { imageUri: 'https://yard-ecommerce-web.vercel.app/asset/category/Monitoring_icon.png', itemName: 'ECG machine' },
        { imageUri: 'https://yard-ecommerce-web.vercel.app/asset/category/Monitoring_icon.png', itemName: 'Blood Pressure Monitor' },
        { imageUri: 'https://yard-ecommerce-web.vercel.app/asset/category/Monitoring_icon.png', itemName: 'Thermometer' },
        { imageUri: 'https://yard-ecommerce-web.vercel.app/asset/category/Monitoring_icon.png', itemName: 'Thermometer' },

    ];

    const items: Item[] = [
        { name: 'Thermometer' },
        { name: 'Monitor' },
        { name: 'Blood pressure tracker' },
        { name: 'Bed' },
        { name: 'ECG Machine' },
        { name: 'Heart rate monitor' },

    ];

    const popularSearchesData = [
        { id: 1, name: 'ECG', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/bp_light.jpg' },
        { id: 2, name: 'lens', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/lens_light.jpg' },
        { id: 3, name: 'Monitor', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/steth_light.jpg' },
        { id: 4, name: 'Thermometer', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/nebul_light.jpg' },
        { id: 5, name: 'ECG', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/bp_light.jpg' },
        { id: 6, name: 'lens', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/lens_light.jpg' },
    ];


    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => onClose()}>

            <ScrollView>
                <TouchableWithoutFeedback onPress={() => onClose()}>
                    <SafeAreaView>
                        <Box>
                            <VStack w="100%" space={5} alignSelf="center">
                                <Box bg={COLORS.PRIMARY}>
                                    <Pressable m={2} pb={2} py={3} _pressed={{ opacity: 0.5 }}>
                                        <Input
                                            placeholder="Search Medical Equipments"
                                            placeholderTextColor={'white'}
                                            width="100%"
                                            borderRadius="6"
                                            borderColor={'#419197'}
                                            bg={'#419197'}
                                            py="1"
                                            px="4"
                                            fontSize="13"
                                            InputLeftElement={
                                                <Pressable onPress={() => onClose()} ml={2}>
                                                    <AppIcon MaterialIconsName='arrow-back' size={25} color={'white'} />
                                                </Pressable>
                                            }
                                            InputRightElement={
                                                <HStack mr={2} space={4} justifyContent={'center'} alignItems={'center'}>
                                                    <Pressable _pressed={{ opacity: 0.5 }} onPress={handleSearch}>
                                                        <AppIcon IoniconsName='search-outline' size={23} color={'white'} />
                                                    </Pressable>
                                                    <Pressable _pressed={{ opacity: 0.5 }}>
                                                        <AppIcon EntypoName='mic' size={20} color={'white'} />
                                                    </Pressable>
                                                </HStack>
                                            }
                                            value={searchTxt}
                                            onChangeText={setSearchTxt}
                                        />
                                    </Pressable>
                                </Box>

                                {searchHistory.slice(0, 3).map((historyItem, index) => (
                                    <Pressable
                                        key={index}
                                        _pressed={{ opacity: 0.5 }}
                                        mx={4}
                                        ml={5}
                                        onPress={() => {
                                            setSearchTxt(historyItem);
                                            handleSearch();
                                        }}>
                                        <HStack justifyContent={'space-between'} alignItems={'center'}>
                                            <VStack w={'80%'} space={2}>
                                                <HStack space={5} alignItems={'center'}>
                                                    <AppIcon OcticonsName='history' size={20} color={'secondary.500'} />
                                                    <Heading size={'sm'} color={'gray.900'}>
                                                        {historyItem}
                                                    </Heading>
                                                </HStack>
                                            </VStack>
                                            <Box rounded={'full'} p={1.5}>
                                                <AppIcon MaterialCommunityIconsName='arrow-top-left' size={22} />
                                            </Box>
                                        </HStack>
                                    </Pressable>
                                ))}
                            </VStack>
                        </Box>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </Modal>
    );
};
