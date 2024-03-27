import React, { useState } from 'react'
import { Box, HStack, Heading, Image, Pressable, Row, ScrollView, StatusBar, Text, VStack } from 'native-base'
import { COLORS, HEIGHT, WIDTH } from '~/styles'
import { PrivateContainer } from '~/components/containers'
import { BrandsTable, CategoryBox } from '~/components/Home'
import Carousel from 'react-native-reanimated-carousel';
import { AppIcon, Content } from '~/components/core'
import { LinkSquare } from '~/components'
import { item as ProductData } from '~/components/LinkSquare';
import { useNavigation } from '@react-navigation/native'
import { StackAndTabType } from '~/routes/private/types'
import GlobalSearch from '../Search/GlobalSearch'
import PopularSearches from '~/components/PopularSearch'

const data = [
    { id: 1, source: 'https://as2.ftcdn.net/v2/jpg/01/28/27/25/1000_F_128272591_ihpgDbs0wxhxRuvQJ8NMi1yniMhBC4wl.jpg', offerHeading: 'Get Special Offer', subHeading: 'Up to', discount: '40%' },
    { id: 2, source: 'https://www.crushpixel.com/big-static19/preview4/big-sale-discount-banner-template-3224496.jpg', offerHeading: 'Get Special Offer', subHeading: 'Up to', discount: '20%' },
    { id: 3, source: 'https://cdn1.vectorstock.com/i/1000x1000/96/35/grand-offer-sale-and-discount-banner-template-vector-14299635.jpg', offerHeading: 'Get Special Offer', subHeading: 'Up to', discount: '35%' },
    { id: 4, source: 'https://cdn1.vectorstock.com/i/1000x1000/96/35/grand-offer-sale-and-discount-banner-template-vector-14299635.jpg', offerHeading: 'Get Special Offer', subHeading: 'Up to', discount: '90%' }
];

const popularSearchesData = [
    { id: 1, name: 'ECG', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/bp_light.jpg', mrp: 345, sellingPrice: 300 },
    { id: 2, name: 'lens', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/lens_light.jpg', mrp: 345, sellingPrice: 300 },
    { id: 3, name: 'Monitor', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/steth_light.jpg', mrp: 345, sellingPrice: 300 },
    { id: 4, name: 'Thermometer', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/nebul_light.jpg', mrp: 345, sellingPrice: 300 },
    { id: 5, name: 'ECG', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/bp_light.jpg', mrp: 345, sellingPrice: 300 },
    { id: 6, name: 'lens', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/lens_light.jpg', mrp: 345, sellingPrice: 300 },
];

const Home = () => {

    const [activeIndex, setActiveIndex] = useState<any>(0);
    const [searchTxt, setSearchTxt] = useState('');
    const [visible, setVisible] = useState(false);
    const { navigate } = useNavigation<StackAndTabType>();


    return (
        <PrivateContainer>

            <Text>Home</Text>
            {/* <ScrollView>
                <StatusBar backgroundColor={COLORS.PRIMARY} barStyle="light-content" />

                <Box
                    borderBottomLeftRadius={15}
                    borderBottomRightRadius={15}
                    bg={COLORS.PRIMARY}
                >
                    <Pressable m={2} pb={10} py={3} onPress={() => setVisible(true)} _pressed={{ opacity: 0.5 }}>
                        <Box
                            width="100%"
                            borderRadius="6"
                            backgroundColor={'white'}
                            py="1"
                            px="4"
                        >
                            <HStack justifyContent={'space-between'} alignItems={'center'}>

                                <Content fontSize="13" color={'gray.400'}>Search for health care products</Content>
                                <HStack space={4} justifyContent={'center'} alignItems={'center'}>
                                    <Pressable _pressed={{ opacity: 0.9 }} onPress={() => setVisible(true)}>
                                        <AppIcon IoniconsName='search-outline' size={23} color={COLORS.PRIMARY} />
                                    </Pressable>
                                    <Pressable _pressed={{ opacity: 0.5 }} onPress={() => setVisible(true)}>
                                        <AppIcon EntypoName='mic' size={20} color={COLORS.PRIMARY} />
                                    </Pressable>
                                </HStack>
                            </HStack>
                        </Box>

                    </Pressable>
                </Box>

                <CategoryBox />
                <Box>
                    <Box h={HEIGHT / 4.3} mb={4}>
                        <Carousel
                            loop
                            width={WIDTH}
                            autoPlay={true}
                            data={data}
                            scrollAnimationDuration={1000}
                            onSnapToItem={(index: number) => setActiveIndex(index)}
                            renderItem={({ item }) => (
                                <Pressable
                                    m={3}
                                    rounded={'xl'}
                                    overflow={'hidden'}
                                    _pressed={{ opacity: '.5' }}
                                >
                                    <Image source={{ uri: item.source }} alt="no image" h={HEIGHT / 5} />

                                    <Box bg={'#fff'} borderRadius={12} position={'absolute'} p={1} px={2} ml={3} mt={3} >
                                        <Content color={'black'} weight="400" fontSize={'xs'}>Limited time!</Content>
                                    </Box>
                                    <VStack position={'absolute'} bottom={0} p={2} px={4} space={1}>

                                        <HStack justifyContent={'space-between'}>
                                            <Content color={'#fff'} weight="300" fontSize={'xs'} w={'100%'}>*Terms and Conditions applied</Content>
                                        </HStack>

                                    </VStack>

                                    <HStack
                                        right={2}
                                        top={3}
                                        position={'absolute'}
                                        alignSelf={'flex-end'}
                                        p={2}
                                        space={3}>
                                        <AppIcon FeatherName="share-2" size={20} color={'#fff'} />
                                    </HStack>
                                    <HStack
                                        position={'absolute'}
                                        alignSelf={'flex-end'}
                                        bottom={0}
                                        p={2}
                                        space={3}>
                                        <Pressable
                                            bg={COLORS.PRIMARY}
                                            borderRadius={5}
                                            _pressed={{ opacity: 0.6 }}
                                            onPress={() => navigate('AllProducts')}
                                        >
                                            <Heading size={'xs'} m={1} color={'white'} p={1}>
                                                Claim Now
                                            </Heading>
                                        </Pressable>
                                    </HStack>
                                </Pressable>
                            )}
                        />
                        <Row alignSelf="center" bottom={0} position={'absolute'}>
                            {data.map((_, index) => (
                                <Box
                                    key={index}
                                    h={2}
                                    borderRadius={4}
                                    bg={activeIndex === index ? COLORS.SECONDARY : '#888'}
                                    w={activeIndex === index ? 4 : 2}
                                    mr={3}
                                />
                            ))}
                        </Row>

                    </Box>
                </Box>

                <Box mx={2}>
                    <HStack justifyContent={'space-between'} alignItems={'center'} mb={1} >
                        <Heading color={'black'} size={'md'} >
                            Top Brands
                        </Heading>
                    </HStack>
                    <BrandsTable />
                </Box>

                <Box mx={2}>
                    <HStack justifyContent={'space-between'} alignItems={'center'} mt={4} >
                        <Heading color={'black'} size={'md'}  >
                            Best Selling Products
                        </Heading>
                        <Pressable onPress={() => navigate('AllProducts')} _pressed={{ opacity: 0.5 }} opacity={0.8} bg={'gray.100'} p={2} borderRadius={6}>
                            <Content weight='400' fontSize={12} color={'gray.500'} >
                                See all  〉
                            </Content>
                        </Pressable>
                    </HStack>
                </Box>

                <Box mt={4} flexDir="row" w={WIDTH} flexWrap="wrap" alignItems="center" justifyContent="space-evenly">
                    {ProductData.slice(0, 4).map(item => (
                        <Box mb={3} key={item.id}>
                            <LinkSquare
                                key={item.id}
                                item={item}
                                onTap={() => navigate('ProductDetails')}
                            />
                        </Box>
                    ))}
                </Box>

                <Box mx={2}>
                    <HStack justifyContent={'space-between'} alignItems={'center'} mt={4} opacity={0.8} >
                        <Heading color={'black'} size={'md'}  >
                            New Arrival
                        </Heading>
                        <Pressable onPress={() => navigate('NewArrival')} _pressed={{ opacity: 0.5 }} bg={'gray.100'} p={2} borderRadius={6}>
                            <Content weight='400' fontSize={12} color={'gray.500'}>
                                See all  〉
                            </Content>
                        </Pressable>
                    </HStack>
                </Box>


                <Box
                    mt={4}
                    flexDir="row"
                    w={WIDTH}
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-evenly">
                    {ProductData.slice(0, 4).map(item => (
                        <Box mb={3} key={item.id}>
                            <LinkSquare
                                item={item}
                                onTap={() => navigate('ProductDetails')}
                            />
                        </Box>
                    ))}
                </Box>

                <Box mx={2} mb={3}>
                    <HStack justifyContent={'space-between'} alignItems={'center'} mt={4} opacity={0.8} >
                        <Heading color={'black'} size={'md'}  >
                            Popular Searches
                        </Heading>
                        <Pressable onPress={() => navigate('PopularSearches')} _pressed={{ opacity: 0.5 }} bg={'gray.100'} p={2} borderRadius={6}>
                            <Content weight='400' fontSize={12} color={'gray.500'}>
                                See all  〉
                            </Content>
                        </Pressable>
                    </HStack>
                </Box>
                <PopularSearches popularSearchesData={popularSearchesData} />

            </ScrollView> */}

            <GlobalSearch
                visible={visible}
                onClose={() => {
                    setVisible(false);
                }}
                onSelect={() => {
                    setVisible(false);
                }}
            />

        </PrivateContainer>
    )
}

export default Home