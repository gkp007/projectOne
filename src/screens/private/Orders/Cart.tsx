import React from 'react'
import { Box, HStack, VStack, Heading, Pressable, Image, ScrollView, Divider, AlertDialog } from 'native-base'
import { COLORS } from '~/styles'
import { AppIcon, Btn, Content } from '~/components/core'
import { useNavigation } from '@react-navigation/native'
import { StackAndTabType } from '~/routes/private/types'

type CartItem = {
    id: number;
    imageUri: string;
    itemName: string;
    brand: string;
    soldBy: string;
    price: number;
    quantity: number;
};



export const Cart: React.FC = () => {
    const { navigate, goBack } = useNavigation<StackAndTabType>();

    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    const [cartItems, setCartItems] = React.useState<CartItem[]>([
        {
            id: 1,
            imageUri: 'https://yard-ecommerce-web.vercel.app/product/monitor_light.jpg',
            itemName: 'Heart Rate Monitor',
            brand: 'Cipla',
            soldBy: 'KK Enterprises Prvt. Ltd',
            price: 19999,
            quantity: 1,
        },
        {
            id: 2,
            imageUri: 'https://yard-ecommerce-web.vercel.app/product/spiro_light.jpg',
            itemName: 'Heart Rate Monitor',
            brand: 'Spirometer',
            soldBy: 'KK Enterprises Prvt. Ltd',
            price: 999,
            quantity: 1,
        },
        {
            id: 3,
            imageUri: 'https://yard-ecommerce-web.vercel.app/product/steth_light.jpg',
            itemName: 'Stethoscope',
            brand: 'Cipla',
            soldBy: 'KK Enterprises Prvt. Ltd',
            price: 21785,
            quantity: 1,
        },
        {
            id: 4,
            imageUri: 'https://yard-ecommerce-web.vercel.app/product/nebul_light.jpg',
            itemName: 'Compressor Nebulizer',
            brand: 'Cipla',
            soldBy: 'KK Enterprises Prvt. Ltd',
            price: 16999,
            quantity: 1,
        },
        {
            id: 5,
            imageUri: 'https://yard-ecommerce-web.vercel.app/product/bp_light.jpg',
            itemName: 'Heart Rate Monitor',
            brand: 'Digital BP Machine',
            soldBy: 'KK Enterprises Prvt. Ltd',
            price: 23499,
            quantity: 1,
        },
        {
            id: 6,
            imageUri: 'https://yard-ecommerce-web.vercel.app/product/lens_light.jpg',
            itemName: 'Heart Rate Monitor',
            brand: 'Lens',
            soldBy: 'KK Enterprises Prvt. Ltd',
            price: 14599,
            quantity: 1,
        },
        {
            id: 7,
            imageUri: 'https://yard-ecommerce-web.vercel.app/product/monitor_light.jpg',
            itemName: 'Heart Rate Monitor',
            brand: 'Cipla',
            soldBy: 'KK Enterprises Prvt. Ltd',
            price: 15999,
            quantity: 1,
        },
    ]);

    const increaseQuantity = (itemId: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (itemId: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    return (
        <>
            <Box bg={COLORS.PRIMARY}>
                <HStack space={3} justifyContent={'space-between'} alignItems={'center'} p={4}>
                    <HStack space={3} justifyContent={'flex-start'} alignItems={'center'}>
                        <Pressable onPress={() => goBack()}>
                            <AppIcon AntDesignName="arrowleft" size={24} color={'white'} />
                        </Pressable>
                        <Heading textAlign={'center'} size="md" color={'white'}>
                            My Cart
                        </Heading>
                    </HStack>

                </HStack>
            </Box>

            <ScrollView showsVerticalScrollIndicator={false}>

                {cartItems.map((item) => (
                    <Box key={item.id} m={2} borderRadius={8} bg={'white'} shadow={1}>
                        <HStack space={1}>
                            <Box p={1} m={1} w={'25%'}>
                                <Image
                                    source={{ uri: item.imageUri }}
                                    alt={'no image'}
                                    h={24}
                                    w={24}
                                    borderRadius={6}
                                    resizeMode='contain'
                                />
                            </Box>

                            <VStack p={1} m={1} space={1} w={'70%'}>
                                <HStack justifyContent={'space-between'}>
                                    <Heading size={'xs'} noOfLines={1}>
                                        {item.itemName}
                                    </Heading>
                                    <Pressable _pressed={{ opacity: 0.5 }} bg={'gray.200'} p={1} borderRadius={'full'} onPress={() => setIsOpen(!isOpen)}>
                                        <AppIcon MaterialCommunityIconsName="delete-outline" size={20} color={'gray'} />
                                    </Pressable>
                                </HStack>

                                <Content fontSize={12}>Brand: {item.brand}</Content>
                                <Content fontSize={11} color={'gray.500'}>Sold By: {item.soldBy}</Content>
                                <HStack justifyContent={'space-between'}>
                                    <HStack alignItems={'center'} space={1}>
                                        <AppIcon FontAwesome5Name='rupee-sign' size={12} color={'green'} />
                                        <Heading size={'xs'} noOfLines={1} color={'success.700'}>
                                            {item.price}
                                        </Heading>
                                    </HStack>
                                    <HStack space={3} px={2} alignItems={'center'}>
                                        <Pressable p={1} borderRadius={'full'} bg={'white'} shadow={1} _pressed={{ opacity: 0.5 }} onPress={() => increaseQuantity(item.id)}>
                                            <AppIcon FontAwesome5Name='plus' size={12} color={'green'} />
                                        </Pressable>
                                        <Heading fontSize={12}>{item.quantity}</Heading>
                                        <Pressable p={1} borderRadius={'full'} bg={'white'} shadow={1} _pressed={{ opacity: 0.5 }} onPress={() => decreaseQuantity(item.id)}>
                                            <AppIcon FontAwesome5Name='minus' size={12} color={'red'} />
                                        </Pressable>
                                    </HStack>
                                </HStack>
                            </VStack>
                        </HStack>
                    </Box>
                ))}
            </ScrollView>

            <Box shadow={1} p={1} mx={1} px={2} borderTopLeftRadius={30} borderTopRightRadius={30} bg={'white'}>
                <HStack justifyContent={'space-between'} alignItems={'center'} m={3}>
                    <VStack space={1}>
                        <Content weight='400' fontSize={12}>
                            Total Price
                        </Content>
                        <HStack alignItems={'center'} space={1}>
                            <AppIcon FontAwesome5Name='rupee-sign' size={16} />
                            <Heading size={'md'} noOfLines={1}>
                                486
                            </Heading>
                        </HStack>
                    </VStack>
                    <Btn bg={COLORS.PRIMARY} borderRadius={5} shadow={1} onPress={() => navigate('Checkout')}>
                        <HStack justifyContent={'space-between'} px={2}>
                            <Heading size={'sm'} color={'white'}>Checkout</Heading>
                            <AppIcon FeatherName='chevron-right' size={20} color={'white'} />
                        </HStack>
                    </Btn>
                </HStack>
            </Box>
            <Divider />

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <Box m={2} my={3}>
                        <VStack space={3} m={3}>
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Heading size={'sm'} >Delete Item</Heading>
                                <Pressable onPress={onClose}>
                                    <AppIcon EntypoName='circle-with-cross' size={20} color={'black'} />
                                </Pressable>

                            </HStack>
                            <Content fontSize={12} color={'gray'}>Are you sure want to delete this item?</Content>
                        </VStack>

                        <HStack justifyContent={'space-between'} space={5} m={3} alignItems={'center'}>
                            <Pressable onPress={onClose} ref={cancelRef} _pressed={{ opacity: 0.6 }} borderWidth={1} borderColor={'black'} p={1.5} px={2} borderRadius={5}>
                                <Heading size={'sm'} >Cancel</Heading>
                            </Pressable>
                            <Btn bg={'red.500'} onPress={onClose}>
                                <Heading size={'sm'} color={'white'}>Delete</Heading>
                            </Btn>
                        </HStack>
                    </Box>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    );
}

export default Cart;
