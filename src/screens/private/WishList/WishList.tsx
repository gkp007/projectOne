import React from 'react'
import { Box, HStack, Heading, Image, Pressable, ScrollView, SimpleGrid, Text, VStack } from 'native-base'
import { COLORS, WIDTH } from '~/styles'
import { AppIcon, Btn, Content, Header } from '~/components/core'
import { useNavigation } from '@react-navigation/native'
import { StackAndTabType } from '~/routes/private/types'
import { props } from '~/components/LinkSquare';

export const item: props[] = [
    {
        id: '1',
        name: 'Digital BP Machine',
        category: 'Machine',
        itemSold: '8.2k',
        rating: 4.5,
        img: 'https://yard-ecommerce-web.vercel.app/product/bp_light.jpg',
        price: 205,
        originalPrice: 305,
        offer: '20% off',
        status: 'In Stock',
    },
    {
        id: '2',
        name: 'Lens',
        category: 'Machine',
        itemSold: '1k',
        rating: 4.5,
        img: 'https://yard-ecommerce-web.vercel.app/product/lens_light.jpg',
        price: 105,
        originalPrice: 170,
        offer: '30% off',
        status: 'Out Stock',
    },
    {
        id: '3',
        name: 'Stethoscope',
        category: 'Machine',
        itemSold: '826',
        rating: 4.5,
        img: 'https://yard-ecommerce-web.vercel.app/product/steth_light.jpg',
        price: 225,
        originalPrice: 305,
        offer: '20% off',
        status: 'In Stock',
    },
    {
        id: '4',
        name: 'Spirometer',
        category: 'Machine',
        itemSold: '226',
        rating: 4.5,
        img: 'https://yard-ecommerce-web.vercel.app/product/spiro_light.jpg',
        price: 120,
        originalPrice: 375,
        offer: '50% off',
        status: 'In Stock',
    },
    {
        id: '5',
        name: 'Compressor Nebulizer',
        category: 'Machine',
        itemSold: '82',
        rating: 4.5,
        img: 'https://yard-ecommerce-web.vercel.app/product/nebul_light.jpg',
        price: 305,
        originalPrice: 455,
        offer: '10% off',
        status: 'Out Stock',
    },
    {
        id: '6',
        name: 'Ophthalmoscope',
        category: 'Machine',
        itemSold: '2.6k',
        rating: 4.5,
        img: 'https://yard-ecommerce-web.vercel.app/product/op_scope_light.jpg',
        price: 105,
        originalPrice: 305,
        offer: '20% off',
        status: 'Limited Stock',
    },
    {
        id: '7',
        name: 'BP Machine',
        category: 'Machine',
        itemSold: '2k',
        rating: 4.5,
        img: 'https://yard-ecommerce-web.vercel.app/product/lens_light.jpg',
        price: 133,
        originalPrice: 355,
        offer: '20% off',
        status: 'In Stock',
    },
    {
        id: '8',
        name: 'Thermometer',
        category: 'Thermometer',
        itemSold: '1.6k',
        rating: 4.5,
        img: 'https://yard-ecommerce-web.vercel.app/product/lens_light.jpg',
        price: 105,
        originalPrice: 455,
        offer: '20% off',
        status: 'Out Stock',
    },
];

const WishList = () => {

    const { navigate, goBack } = useNavigation<StackAndTabType>();

    return (
        <>
            <Header title="My WishList" />

            <ScrollView>
                <SimpleGrid columns={2} p={4} alignItems={'center'}>
                    {item.map((product) => (
                        <Box key={product.id} w={WIDTH / 2.2} m={1}>
                            <VStack bg={'white'} space={2} shadow={1} borderRadius={5} pb={2} >
                                <Box
                                    w={'100%'}
                                    h={WIDTH / 2.6}
                                    bg={'white'}
                                    borderRadius={5}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Image
                                        zIndex={-1}
                                        size={'80%'}
                                        resizeMode="contain"
                                        source={{ uri: product.img }}
                                        alt="Product icon"
                                    />
                                </Box>
                                <VStack px={1} space={1} flexWrap={'wrap'}>
                                    <HStack w={'100%'} justifyContent={'space-between'}>
                                        <Heading fontSize={11}>
                                            {product.name}
                                        </Heading>

                                    </HStack>
                                    <HStack space={2} alignItems={'center'} justifyContent={'space-between'}>
                                        <HStack space={2} alignItems={'center'}>
                                            <Content
                                                fontSize={10}
                                                color={'coolGray.600'}
                                                textDecorationLine={'line-through'}
                                            >
                                                ₹{product.originalPrice}
                                            </Content>
                                            <Heading fontSize={13} color={'green.600'}>
                                                ₹{product.price}
                                            </Heading>
                                        </HStack>
                                    </HStack>
                                </VStack>
                                <Box mx={2} alignItems={'center'}>

                                    <Pressable _pressed={{ opacity: 0.5 }} borderColor={'danger.500'} borderWidth={0.5} w={'full'} borderRadius={4}>
                                        <HStack justifyContent={'center'} space={2} p={1} >
                                            <Heading size={'xs'} color={'danger.600'} textAlign={'center'}>Remove</Heading>
                                        </HStack>
                                    </Pressable>
                                </Box>
                            </VStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </ScrollView >
        </>
    )
}

export default WishList