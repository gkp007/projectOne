import React from 'react';
import { Box, HStack, Heading, Image, Pressable, VStack, ScrollView, SimpleGrid } from 'native-base';
import { AppIcon, Header } from '~/components/core';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import { COLORS, WIDTH } from '~/styles';

const AllCategories = () => {
    const { navigate, goBack } = useNavigation<StackAndTabType>();

    const categories = [
        {
            id: 1,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Surgery_icon.png',
            label: 'Imaging',
        },
        {
            id: 2,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Laboratory_icon.png',
            label: 'Laboratory',
        },
        {
            id: 3,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Laboratory_icon.png',
            label: 'Surgery',
        },
        {
            id: 4,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Monitoring_icon.png',
            label: 'Respiratory',
        },
        {
            id: 5,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/4474/4474773.png',
            label: 'Defibrillator',
        },
        {
            id: 6,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/6054/6054858.png',
            label: 'Bed',
        },
        {
            id: 7,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/10258/10258940.png',
            label: 'MRI',
        },
        {
            id: 8,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/12617/12617398.png',
            label: 'Stethoscope',
        },
    ];

    return (
        <>
            <Header title="All Categories" />

            <ScrollView>
                <SimpleGrid columns={3} mt={5}>
                    {categories.map((category, index) => (
                        <Pressable key={index} onPress={() => navigate('AllProducts')}>
                            <Box
                                key={index}
                                bg={'white'}
                                py={4}
                                m={2}
                                flex={1}
                                w={WIDTH / 3.4}
                                borderRadius={10}
                                shadow={1}
                                overflow={'hidden'}
                            >
                                <VStack space={5} alignItems="center" justifyContent={'center'} >
                                    <Image source={{ uri: category.imageUrl }} resizeMode='contain' alt={category.label} h={12} w={12} />
                                    <Box bg={'primary.50'} w={'100%'} borderRadius={5} p={2}>
                                        <Heading fontSize={12} color={COLORS.PRIMARY} textAlign={'center'}>
                                            {category.label}
                                        </Heading>
                                    </Box>
                                </VStack>
                            </Box>
                        </Pressable>
                    ))}
                </SimpleGrid>
            </ScrollView>
        </>
    );
};

export default AllCategories;
