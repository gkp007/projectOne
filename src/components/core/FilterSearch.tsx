import {
    Box,
    HStack,
    Pressable,
    Row,
    ScrollView,
    Text,
    VStack,
    Checkbox,
    Heading,
    Image,
    SimpleGrid,
} from 'native-base';
import { Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import AppIcon from './AppIcon';
import { COLORS, HEIGHT, WIDTH } from '~/styles';
import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';


type Props = {
    visibleFilter: boolean;
    onSelect: () => void;
    onClose: () => void;
};



const ProgramFilter = ({ onClose, onSelect, visibleFilter }: Props) => {

    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('Categories');

    const handleTabChange = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };
    const { navigate, goBack } = useNavigation<StackAndTabType>();

    const categories = [
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

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleCategorySelection = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories((prevSelected) => prevSelected.filter((cat) => cat !== category));
        } else {
            setSelectedCategories((prevSelected) => [...prevSelected, category]);
        }
    };

    const brandsData = [
        {
            id: 1,
            name: 'Honkon',
            logoUrl: 'https://yard-ecommerce-web.vercel.app/home/customersSlider/logo_8.jpeg',
        },
        {
            id: 2,
            name: 'Romsons',
            logoUrl: 'https://yard-ecommerce-web.vercel.app/home/customersSlider/logo_4.jpeg',
        },
        {
            id: 3,
            name: 'Safesure',
            logoUrl: 'https://yard-ecommerce-web.vercel.app/home/customersSlider/logo_1.jpeg',
        },
        {
            id: 4,
            name: 'Safesure',
            logoUrl: 'https://yard-ecommerce-web.vercel.app/home/customersSlider/logo_1.jpeg',
        },
        {
            id: 5,
            name: 'Unknown',
            logoUrl: 'https://yard-ecommerce-web.vercel.app/home/customersSlider/logo_9.jpg',
        },

    ];

    const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

    const toggleBrandSelection = (brandId: number) => {
        if (selectedBrands.includes(brandId)) {
            setSelectedBrands((prevSelected) => prevSelected.filter((id) => id !== brandId));
        } else {
            setSelectedBrands((prevSelected) => [...prevSelected, brandId]);
        }
    };


    const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

    const toggleDiscountSelection = (discount: string) => {
        if (selectedDiscounts.includes(discount)) {
            setSelectedDiscounts((prevSelected) => prevSelected.filter((disc) => disc !== discount));
        } else {
            setSelectedDiscounts((prevSelected) => [...prevSelected, discount]);
        }
    };




    return (
        <>
            <Modal
                animationType="slide"
                transparent={false}
                visible={visibleFilter}
                onRequestClose={() => onClose()}>

                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => onClose()}>
                        <SafeAreaView>
                            <Box bg={'#f5f3ff'} h={HEIGHT}>
                                <HStack
                                    alignItems={'center'}
                                    p={1}
                                    shadow={4}
                                    bgColor={'#fff'}
                                    height={'12'}>
                                    <Pressable onPress={goBack}>
                                        <AppIcon
                                            AntDesignName="arrowleft"
                                            size={25}
                                            color={COLORS.PRIMARY}
                                            style={{ alignSelf: 'center' }}
                                        />
                                    </Pressable>
                                    <Text
                                        fontSize={'lg'}
                                        color={'#000'}
                                        ml={2}>
                                        Filters
                                    </Text>
                                </HStack>
                                <ScrollView bg={'white'}>
                                    <Row space={2} flex={1} bg={'white'} p={1}>
                                        <VStack space={3} w={'110'} h={HEIGHT / 1.18} bg={'white'} borderRightWidth={0.8} borderColor={'gray.200'}>
                                            <TouchableOpacity onPress={() => handleTabChange('Categories')}>
                                                <Text
                                                    p={2}
                                                    fontSize={16}
                                                    bg={activeTab === 'Categories' ? '#E1F0DA' : 'transparent'}
                                                    borderLeftWidth={activeTab === 'Categories' ? 3 : 0}
                                                    shadow={activeTab === 'Categories' ? 2 : undefined}
                                                    borderLeftColor={activeTab === 'Categories' ? 'green.600' : 'transparent'}
                                                >
                                                    Categories
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleTabChange('Brands')}>

                                                <Text
                                                    p={2}
                                                    fontSize={16}
                                                    bg={activeTab === 'Brands' ? '#E1F0DA' : 'transparent'}
                                                    borderLeftWidth={activeTab === 'Brands' ? 3 : 0}
                                                    shadow={activeTab === 'Brands' ? 2 : undefined}
                                                    borderLeftColor={activeTab === 'Brands' ? 'green.600' : 'transparent'}
                                                >

                                                    Brands
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleTabChange('Price')}>
                                                <Text

                                                    p={2}
                                                    fontSize={16}
                                                    bg={activeTab === 'Price' ? '#E1F0DA' : 'transparent'}
                                                    borderLeftWidth={activeTab === 'Price' ? 3 : 0}
                                                    shadow={activeTab === 'Price' ? 2 : undefined}
                                                    borderLeftColor={activeTab === 'Price' ? 'green.600' : 'transparent'}

                                                >
                                                    Price
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleTabChange('Discounts')}>
                                                <Text

                                                    p={2}
                                                    fontSize={16}
                                                    bg={activeTab === 'Discounts' ? '#E1F0DA' : 'transparent'}
                                                    borderLeftWidth={activeTab === 'Discounts' ? 3 : 0}
                                                    shadow={activeTab === 'Discounts' ? 2 : undefined}
                                                    borderLeftColor={activeTab === 'Discounts' ? 'green.600' : 'transparent'}



                                                >
                                                    Discounts
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleTabChange('Ratings')}>
                                                <Text
                                                    p={2}
                                                    fontSize={16}
                                                    bg={activeTab === 'Ratings' ? '#E1F0DA' : 'transparent'}
                                                    borderLeftWidth={activeTab === 'Ratings' ? 3 : 0}
                                                    shadow={activeTab === 'Ratings' ? 2 : undefined}
                                                    borderLeftColor={activeTab === 'Ratings' ? 'green.600' : 'transparent'}
                                                >
                                                    Ratings
                                                </Text>
                                            </TouchableOpacity>
                                        </VStack>

                                        {activeTab === 'Categories' && (
                                            <ScrollView>
                                                <SimpleGrid columns={3} alignItems={'start'} ml={1} space={2}>
                                                    {categories.map((category) => (
                                                        <Pressable
                                                            key={category.id}
                                                            _pressed={{ opacity: 0.5 }}
                                                            onPress={() => toggleCategorySelection(category.label)}
                                                        >
                                                            <VStack
                                                                key={category.id}
                                                                alignItems={'center'}
                                                                space={3}
                                                                borderRadius={5}
                                                            >
                                                                <VStack
                                                                    borderRadius={10}
                                                                    bg={'white'}
                                                                    // bg={selectedCategories.includes(category.label) ? 'primary.200' : 'white'} // Change background color based on selection
                                                                    shadow={1}
                                                                    space={2}
                                                                    borderWidth={selectedCategories.includes(category.label) ? 1.5 : 1}
                                                                    borderColor={selectedCategories.includes(category.label) ? 'success.600' : 'gray.400'}
                                                                    px={3}
                                                                    alignItems={'center'}
                                                                    p={1}
                                                                >
                                                                    <Image
                                                                        resizeMode='contain'
                                                                        source={{ uri: category.imageUrl }}
                                                                        alt={category.label}
                                                                        h={WIDTH / 12}
                                                                        w={WIDTH / 10}
                                                                        maxW={WIDTH / 7}
                                                                    />
                                                                    <Heading fontSize={12} >
                                                                        {category.label}
                                                                    </Heading>
                                                                </VStack>
                                                            </VStack>
                                                        </Pressable>
                                                    ))}
                                                </SimpleGrid>
                                            </ScrollView>
                                        )}

                                        {activeTab === 'Brands' && (
                                            <ScrollView>
                                                <SimpleGrid columns={3} alignItems={'start'} ml={1} space={2}>
                                                    {brandsData.map((brand) => (
                                                        <Pressable
                                                            key={brand.id}
                                                            _pressed={{ opacity: 0.5 }}
                                                            onPress={() => toggleBrandSelection(brand.id)}
                                                        >
                                                            <VStack
                                                                key={brand.id}
                                                                alignItems={'center'}
                                                                space={3}
                                                                borderRadius={5}

                                                            >
                                                                <VStack
                                                                    borderRadius={10}
                                                                    bg={'white'}
                                                                    // bg={selectedBrands.includes(brand.id) ? 'primary.200' : 'white'} // Change background color based on selection
                                                                    shadow={1}
                                                                    space={2}
                                                                    borderWidth={selectedBrands.includes(brand.id) ? 1.5 : 1}
                                                                    borderColor={selectedBrands.includes(brand.id) ? 'success.600' : 'gray.400'}
                                                                    px={3}
                                                                    alignItems={'center'}
                                                                    p={1}
                                                                >
                                                                    <Image
                                                                        resizeMode='contain'
                                                                        source={{ uri: brand.logoUrl }}
                                                                        alt={brand.name}
                                                                        h={WIDTH / 12}
                                                                        w={WIDTH / 10}
                                                                        maxW={WIDTH / 7}
                                                                    />
                                                                    <Heading fontSize={12} >
                                                                        {brand.name}
                                                                    </Heading>
                                                                </VStack>
                                                            </VStack>
                                                        </Pressable>
                                                    ))}
                                                </SimpleGrid>
                                            </ScrollView>
                                        )}
                                        {activeTab === 'Price' && (
                                            <VStack space={3} mx={3}>
                                                <Checkbox value="regular">Rs. 10000  and  Below</Checkbox>
                                                <Checkbox value="with-delay">Rs. 10000  -  Rs. 50000</Checkbox>
                                                <Checkbox value="infrequent">Rs. 50000  -  Rs. 100000</Checkbox>
                                                <Checkbox value="infrequent">Rs. 100000  -  Rs.  500000</Checkbox>
                                                <Checkbox value="infrequent">Rs. 500000  -  Rs.  1000000</Checkbox>
                                                <Checkbox value="infrequent">Rs. 1000000  and  Above</Checkbox>
                                            </VStack>
                                        )}
                                        {activeTab === 'Discounts' && (

                                            <VStack space={3} mx={3}>
                                                <Checkbox value="50">50% or more</Checkbox>
                                                <Checkbox value="30">30% or more</Checkbox>
                                                <Checkbox value="20">20% or more</Checkbox>
                                                <Checkbox value="10">10% or more</Checkbox>
                                                <Checkbox value="below">10% and below</Checkbox>

                                            </VStack>
                                        )}
                                        {activeTab === 'Ratings' && (

                                            <VStack space={3} mx={3}>
                                                <Checkbox value="1">1  ⭐  or more</Checkbox>
                                                <Checkbox value="2">2  ⭐  or more</Checkbox>
                                                <Checkbox value="3">3  ⭐  or more</Checkbox>
                                                <Checkbox value="4">4  ⭐  or more</Checkbox>
                                                <Checkbox value="5">5  ⭐  or more</Checkbox>

                                            </VStack>
                                        )}
                                    </Row>
                                    <Box>
                                        <HStack justifyContent={'space-between'}  >
                                            <Box h={'full'} bg={'white'}>
                                                <Pressable
                                                    justifyContent="center"
                                                    bg={'transparent'}
                                                    p={3}
                                                    px={16}
                                                >

                                                    <HStack alignSelf="center" space={4} alignItems={'center'}>

                                                        <Heading fontSize={18} color={COLORS.PRIMARY}>
                                                            70
                                                        </Heading>
                                                        <Heading fontSize={12} color={'gray.400'}>
                                                            Products Found
                                                        </Heading>

                                                    </HStack>
                                                </Pressable>
                                            </Box>
                                            <Box h={'full'} bg={'white'}>
                                                <Pressable
                                                    justifyContent="center"
                                                    bg={COLORS.PRIMARY}
                                                    p={3}
                                                    px={'16'}
                                                // onPress={() => {
                                                //     navigate('Checkout');
                                                // }}
                                                >

                                                    <Text fontSize="15" fontWeight="bold" color="white" >
                                                        Apply
                                                    </Text>

                                                </Pressable>
                                            </Box>
                                        </HStack>
                                    </Box>
                                </ScrollView>
                            </Box>
                        </SafeAreaView>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </Modal>
        </>
    );
};

export default ProgramFilter;

