import React from 'react';
import { ScrollView, Box, Image, HStack, Pressable } from 'native-base';
import { WIDTH } from '~/styles';

const BrandsTable = () => {
    const brandsData = [
        {
            id: 1,
            name: 'Brand A',
            logoUrl: 'https://yard-ecommerce-web.vercel.app/home/customersSlider/logo_8.jpeg',
        },
        {
            id: 2,
            name: 'Brand B',
            logoUrl: 'https://yard-ecommerce-web.vercel.app/home/customersSlider/logo_4.jpeg',
        },
        {
            id: 3,
            name: 'Brand C',
            logoUrl: 'https://yard-ecommerce-web.vercel.app/home/customersSlider/logo_1.jpeg',
        },
        {
            id: 4,
            name: 'Brand D',
            logoUrl: 'https://yard-ecommerce-web.vercel.app/home/customersSlider/logo_1.jpeg',
        },
        {
            id: 5,
            name: 'Brand E',
            logoUrl: 'https://yard-ecommerce-web.vercel.app/home/customersSlider/logo_9.jpg',
        },

    ];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack space={0}>
                {brandsData.map((brand) => (
                    <Pressable
                        key={brand.id}
                        _pressed={{ opacity: 0.5 }}
                    // onPress={() => {

                    //     console.log(`Brand ${brand.name} pressed`);
                    // }}
                    >
                        <Box
                            key={brand.id}
                            m={1}
                            borderRadius={10}
                            bg={'white'}
                            shadow={1}
                            w={WIDTH / 4}
                            alignItems={'center'}
                        >
                            <Image
                                resizeMode='contain'
                                source={{ uri: brand.logoUrl }}
                                alt={brand.name}
                                h={WIDTH / 7}
                                w={WIDTH / 6}
                                maxW={WIDTH / 6}
                            />
                        </Box>
                    </Pressable>
                ))}
            </HStack>
        </ScrollView>
    );
};

export default BrandsTable;
