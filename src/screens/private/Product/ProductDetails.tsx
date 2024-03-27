import { useNavigation } from '@react-navigation/native';
import {
    Actionsheet,
    Box,
    Circle,
    Divider,
    HStack,
    Heading,
    Image,
    Input,
    Pressable,
    ScrollView,
    SimpleGrid,
    Text,
    VStack,
    useColorMode,
    useDisclose,
} from 'native-base';
import React, { useState } from 'react';
import { AppIcon, Content, RatingAnalytic } from '~/components/core';
import { ImageCarousel } from '~/components/core';
import { LinkSquare, StarRating } from '~/components';
import { COLORS, WIDTH } from '~/styles';
import { StackAndTabType } from '~/routes/private/types';
import { item as ProductData } from '~/components/LinkSquare';
import GlobalSearch from '../Search/GlobalSearch';
import PopularSearches from '~/components/PopularSearch';


const images = [
    {
        image: 'https://rukminim2.flixcart.com/image/416/416/kox8b680/pulse-oximeter/o/f/a/pulse-oximeter-fingertip-with-blood-oxygen-saturation-and-heart-original-imag39utekxgfvez.jpeg?q=70',
    },
    {
        image:
            'https://rukminim2.flixcart.com/image/416/416/kox8b680/pulse-oximeter/a/9/e/pulse-oximeter-fingertip-with-blood-oxygen-saturation-and-heart-original-imag39utmqtphytd.jpeg?q=70',
    },
    {
        image: 'https://rukminim2.flixcart.com/image/416/416/kox8b680/pulse-oximeter/w/g/6/pulse-oximeter-fingertip-with-blood-oxygen-saturation-and-heart-original-imag39utckzzrgat.jpeg?q=70',
    },
    {
        image: 'https://rukminim2.flixcart.com/image/416/416/kox8b680/pulse-oximeter/t/h/n/pulse-oximeter-fingertip-with-blood-oxygen-saturation-and-heart-original-imag39uthhjz7czq.jpeg?q=70',
    },
    {
        image: 'https://rukminim2.flixcart.com/image/416/416/kox8b680/pulse-oximeter/3/t/0/pulse-oximeter-fingertip-with-blood-oxygen-saturation-and-heart-original-imag39ut3yyqdnzt.jpeg?q=70',
    },

];
const CircleLogo = [
    {
        image: 'https://cdn-icons-png.flaticon.com/512/6953/6953251.png',
        label: '100% Genuine Products'
    },
    {
        image:
            'https://cdn-icons-png.flaticon.com/512/5790/5790705.png',
        label: '100% Secure Payments'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/512/3306/3306056.png',
        label: 'Manufacture Warranty'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/512/6948/6948412.png',
        label: 'Easy Returns No Worry'
    },
];
const Description =
    "The Advanced Digital Pulse Oximeter is an essential health monitoring device designed to provide accurate and instant readings of oxygen saturation levels and heart rate.This compact and user - friendly oximeter is suitable for home use, healthcare professionals, and on - the - go individual";

type Colors = {
    id: number;
    color: string;
};
const colors: Colors[] = [
    {
        id: 1,
        color: 'dark.300',
    },
    {
        id: 2,
        color: 'indigo.300',
    },
    {
        id: 3,
        color: 'tertiary.700',
    },
    {
        id: 4,
        color: 'secondary.800',
    },
    {
        id: 5,
        color: 'primary.800',
    },
    {
        id: 6,
        color: 'primary.800',
    },
    {
        id: 7,
        color: 'primary.800',
    },
];

type ReadMoreProps = {
    text: string;
    color: string;
    fontWeight: string;
    fontSize: number;
    px: number;
};

const popularSearchesData = [
    { id: 1, name: 'ECG', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/bp_light.jpg', mrp: 345, sellingPrice: 300 },
    { id: 2, name: 'lens', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/lens_light.jpg', mrp: 345, sellingPrice: 300 },
    { id: 3, name: 'Monitor', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/steth_light.jpg', mrp: 345, sellingPrice: 300 },
    { id: 4, name: 'Thermometer', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/nebul_light.jpg', mrp: 345, sellingPrice: 300 },
    { id: 5, name: 'ECG', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/bp_light.jpg', mrp: 345, sellingPrice: 300 },
    { id: 6, name: 'lens', imageUrl: 'https://yard-ecommerce-web.vercel.app/product/lens_light.jpg', mrp: 345, sellingPrice: 300 },
];

const ReadMore: React.FC<ReadMoreProps> = ({
    text,
    color,
    fontWeight,
    fontSize,
    px,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpansion = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <>

            <Content numberOfLines={isExpanded ? undefined : 2} color={'gray.500'} textAlign={"justify"} fontSize={11}>
                {text}
            </Content>
            {!isExpanded ? (
                <Pressable onPress={toggleExpansion}>

                    <Heading size={'xs'} mt={1} color={'gray.700'}>
                        View More
                    </Heading>
                </Pressable>
            ) : (
                <Pressable onPress={toggleExpansion}>
                    <Text
                        color={color}
                        fontWeight="700"
                        fontSize={13}
                        textAlign="justify">
                        View less
                    </Text>
                </Pressable>
            )}
        </>
    );
};


const starValue = 4;
export default function ProductDetails(): JSX.Element {
    const { navigate } = useNavigation<StackAndTabType>();
    const { colorMode } = useColorMode();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [value, setValue] = useState(colors[0].color);
    const [isCart, setIsCart] = useState(false);
    const handleAddCart = () => {
        if (isCart) {
            navigate('Cart');
        } else {
            setIsCart(true);
        }
    };
    const handleLike = () => {
        setIsLiked(prev => !prev);
    };

    const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(
        null,
    );

    const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
        null,
    );
    const [inputValue, setInputValue] = useState<number>(0);
    const [isPressed, setIsPressed] = useState(false);

    const { goBack } = useNavigation<StackAndTabType>();
    const [searchTxt, setSearchTxt] = useState('');
    const [visible, setVisible] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclose();
    // const [, setWishList] = React.useState(false);

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
            <HStack space={3} p={2} bg={'white'}>
                <Box w={'10%'}>
                    <Pressable onPress={() => goBack()} opacity={0.8} bg={COLORS.LIGHTGREY1} p={2} borderRadius={5}>
                        <AppIcon AntDesignName="arrowleft" size={22} color={'black'} />
                    </Pressable>
                </Box>

                <Pressable w={'75%'} _pressed={{ opacity: 0.5 }} onPress={() => setVisible(true)}>
                    <Input
                        placeholder="Search for health care products"
                        width="100%"
                        borderRadius="6"
                        backgroundColor={'#fff'}
                        py="1"
                        px="4"
                        fontSize="13"
                        InputRightElement={
                            <HStack mr={2} space={4} justifyContent={'center'} alignItems={'center'}>
                                <Pressable _pressed={{ opacity: 0.5 }} >
                                    <AppIcon IoniconsName='search-outline' size={23} color={'gray'} />
                                </Pressable>
                                <Pressable _pressed={{ opacity: 0.5 }}>
                                    <AppIcon EntypoName='mic' size={20} color={COLORS.SECONDARY} />
                                </Pressable>
                            </HStack>
                        }
                        value={searchTxt}
                        onChangeText={setSearchTxt}
                    />
                </Pressable>
                <Box w={'10%'}>
                    <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigate('Cart')}>
                        <Box bg={COLORS.LIGHTGREY1} p={2} borderRadius={6} opacity={0.8}>
                            <AppIcon AntDesignName='shoppingcart' color={'black'} size={20} />
                        </Box>
                    </Pressable>
                </Box>

            </HStack>

            <Box flex={1} flexGrow={1} h={'100%'} bg={'white'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Box mt={2}>
                        <ImageCarousel
                            images={images.map(_ => _.image)}
                            showPreview={true}
                            indicator="bar"
                        />
                        <Box px={WIDTH * 0.04}>
                            <Box mt={4}>
                                <VStack
                                    space={1}
                                    _light={{ borderColor: 'coolGray.200' }}
                                    _dark={{ borderColor: 'dark.200' }}>
                                    <HStack justifyContent="space-between">
                                        <HStack space={2}>

                                            <Heading
                                                fontFamily={'Montserrat-Bold'}
                                                fontSize={22}>
                                                Oximeter
                                            </Heading>
                                            <Pressable
                                                bg={'muted.100'}
                                                alignItems="center"
                                                _pressed={{ opacity: 0.5 }}
                                                justifyContent="center"
                                                borderRadius="5">
                                                <Content
                                                    fontWeight="400"
                                                    fontSize="10"
                                                    px="2"
                                                    py="1">
                                                    6,378 sold
                                                </Content>
                                            </Pressable>
                                        </HStack>
                                        <HStack space={3}>

                                            <Box
                                                p={'auto'}
                                                zIndex={2}
                                                alignItems="center"
                                                ml={'auto'}
                                                justifyContent={'center'}>
                                                <Pressable onPress={handleLike} bg={isLiked ? 'red.100' : 'gray.200'} rounded={'full'} p={1.5}>
                                                    <AppIcon
                                                        AntDesignName={isLiked ? 'heart' : 'hearto'}
                                                        size={20}
                                                        color={isLiked ? 'red' : 'black'}
                                                    />
                                                </Pressable>
                                            </Box>

                                            <Box
                                                p={'auto'}
                                                zIndex={2}
                                                alignItems="center"
                                                ml={'auto'}
                                                justifyContent={'center'}>

                                                <Pressable onPress={onOpen} _pressed={{ opacity: 0.5 }}>
                                                    <AppIcon
                                                        IoniconsName="share-social-outline"
                                                        size={22}
                                                    />
                                                </Pressable>
                                            </Box>

                                        </HStack>

                                    </HStack>

                                    <Text fontSize={12} color={'grey'}>
                                        Brand: Noymi
                                    </Text>
                                    <HStack alignItems={'center'} space={1}>
                                        <Heading bold>₹233</Heading>
                                        <Text
                                            fontSize={12}
                                            textDecorationLine={'line-through'}
                                            fontFamily={'Montserrat-Medium'}>
                                            258
                                        </Text>
                                        <Text
                                            fontWeight={700}
                                            fontSize={12}
                                            color={'secondary.700'}
                                            fontFamily={'Montserrat-Medium'}>
                                            GET 10% OFF
                                        </Text>
                                    </HStack>

                                    <HStack my="2" mr="auto" space="2">

                                        <HStack alignItems="center" space={2}>
                                            <StarRating
                                                size={20}
                                                color="green"
                                                starValue={starValue}
                                            />
                                            <Pressable
                                                onPress={() => navigate('Ratings')}
                                                _pressed={{ opacity: 0.5 }}
                                            // onPress={() =>
                                            //     navigate('ProductReviews', { productId: '' })
                                            // }
                                            >
                                                <Text color={'gray.400'} fontSize="12">
                                                    (6,537 reviews)
                                                </Text>
                                            </Pressable>
                                        </HStack>
                                    </HStack>
                                </VStack>
                            </Box>

                            <Box w={'100%'} mt={5}>
                                <HStack justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
                                    {CircleLogo.map((logo, index) => (
                                        <VStack space={2} w={'20%'} key={index}>
                                            <Circle key={index} bg={'transparent'} borderRadius={25} alignItems={'center'} p={2} rounded={'full'} >
                                                <Image source={{ uri: logo.image }} alt={'no image'} h={12} w={10} mt={2} resizeMode='contain' />
                                            </Circle>
                                            <Content fontSize={10} weight='400' color={'gray.500'} textAlign={'center'}>
                                                {logo.label}
                                            </Content>
                                        </VStack>
                                    ))}
                                </HStack>
                            </Box>

                            <VStack mt={4} space={2}>
                                <Text color={'black'} bold fontSize="15">
                                    Description:
                                </Text>
                                <ReadMore
                                    text={Description}
                                    color={'black'}
                                    fontWeight="500"
                                    fontSize={13}
                                    px={0}
                                />
                            </VStack>
                            <Divider my={4} />
                            <RatingAnalytic />
                        </Box>
                        <Divider mt={4} />
                    </Box>

                    <Box mx={2}>
                        <HStack justifyContent={'space-between'} alignItems={'center'} mt={4} >
                            <Heading color={'black'} size={'md'}  >
                                Similar Products
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
                        {ProductData.map(item => (
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
                                Recommended Products
                            </Heading>
                            <Pressable onPress={() => navigate('NewArrival')} _pressed={{ opacity: 0.5 }} bg={'gray.100'} p={2} borderRadius={6}>
                                <Content weight='400' fontSize={12} color={'gray.500'}>
                                    See all  〉
                                </Content>
                            </Pressable>
                        </HStack>
                    </Box>
                    <PopularSearches popularSearchesData={popularSearchesData} />

                </ScrollView>
            </Box>
            <Box>
                <HStack justifyContent={'space-between'}  >
                    <Box h={'full'} bg={'white'}>
                        <Pressable
                            justifyContent="center"
                            bg={'transparent'}
                            p={3}
                            px={16}
                            onPress={handleAddCart}
                        >

                            <HStack alignSelf="center" space={2} >
                                <AppIcon
                                    FontAwesome5Name="shopping-bag"
                                    size={20}
                                    color={colorMode === 'light' ? COLORS.PRIMARY : 'black'}
                                />
                                <Text
                                    fontSize="15"
                                    fontWeight="bold"
                                    color={COLORS.PRIMARY}
                                >
                                    {isCart ? 'Go to Cart' : 'Add to Cart'}
                                </Text>
                            </HStack>
                        </Pressable>
                    </Box>
                    <Box h={'full'} bg={'white'}>
                        <Pressable
                            justifyContent="center"
                            bg={COLORS.PRIMARY}
                            p={3}
                            px={'16'}
                            onPress={() => {
                                navigate('Checkout');
                            }}
                        >
                            <Text fontSize="15" fontWeight="bold" color="white" >
                                Buy Now
                            </Text>
                        </Pressable>
                    </Box>
                </HStack>
            </Box>

            {/* <Button onPress={onOpen}>Actionsheet</Button> */}
            <Actionsheet isOpen={isOpen} onClose={onClose}>
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


            <GlobalSearch
                visible={visible}
                onClose={() => {
                    setVisible(false);
                }}
                onSelect={() => {
                    setVisible(false);
                }}
            />

        </>
    );
}
