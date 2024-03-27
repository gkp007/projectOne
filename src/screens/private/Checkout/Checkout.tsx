import React from 'react'
import { Box, HStack, VStack, Heading, Pressable, Image, ScrollView, Divider, Text, AlertDialog, Toast } from 'native-base'
import { COLORS, HEIGHT, WIDTH } from '~/styles'
import { AppIcon, Btn, Content } from '~/components/core'
import { useNavigation } from '@react-navigation/native'
import { StackAndTabType } from '~/routes/private/types'
import AnimatedLottieView from 'lottie-react-native'
import { LOTTI } from '~/assets/animations'

type CartItem = {
    id: number;
    imageUri: string;
    itemName: string;
    brand: string;
    soldBy: string;
    price: number;
    quantity: number;
};

const cartItems: CartItem[] = [
    {
        id: 1,
        imageUri: 'https://yard-ecommerce-web.vercel.app/product/monitor_light.jpg',
        itemName: 'Heart Rate Monitor',
        brand: 'Cipla',
        soldBy: 'KK Enterprises Prvt. Ltd',
        price: 19999,
        quantity: 1,
    },
    // {
    //     id: 2,
    //     imageUri: 'https://yard-ecommerce-web.vercel.app/product/spiro_light.jpg',
    //     itemName: 'Heart Rate Monitor',
    //     brand: 'Spirometer',
    //     soldBy: 'KK Enterprises Prvt. Ltd',
    //     price: 999,
    //     quantity: 1,
    // },
    // {
    //     id: 3,
    //     imageUri: 'https://yard-ecommerce-web.vercel.app/product/steth_light.jpg',
    //     itemName: 'Stethoscope',
    //     brand: 'Cipla',
    //     soldBy: 'KK Enterprises Prvt. Ltd',
    //     price: 21785,
    //     quantity: 1,
    // },

];

export const Checkout: React.FC = () => {

    const { navigate, goBack } = useNavigation<StackAndTabType>();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<string | null>(null);

    const handlePaymentMethodSelection = (paymentMethod: string) => {
        setSelectedPaymentMethod(paymentMethod);
    };

    const isPaymentMethodSelected = (paymentMethod: string) => {
        return selectedPaymentMethod === paymentMethod;
    };

    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    const showAlert = () => {
        setIsOpen(true);
        setTimeout(() => {
            onClose();
            navigate('OrderDetails')
        }, 1000);
    };

    const handleApply = () => {
        Toast.show({
            title: 'Available wallet balance applied',
            duration: 2000,
            bg: 'success.500',
        });
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
                            Checkout
                        </Heading>
                    </HStack>
                </HStack>
            </Box>

            <ScrollView showsVerticalScrollIndicator={false} mb={2}>
                <Box mx={WIDTH * 0.04}>

                    <Heading fontSize={15} mt={3}>
                        Shipping Address
                    </Heading>
                    <Pressable mt={4} onPress={() => navigate('Address')} borderRadius={10} bg={'white'} borderColor={'gray.200'} borderWidth={0.5} p={3}>
                        <VStack space={2} >
                            <HStack justifyContent={'space-between'}>
                                <HStack space={1} alignItems={'center'} >
                                    <AppIcon MaterialCommunityIconsName='navigation-variant' size={25} color={COLORS.SECONDARY} />
                                    <Heading size={'md'} color={'black'}> Home </Heading>

                                </HStack>
                                <AppIcon FeatherName="edit-3" size={20} />
                            </HStack>
                            <Box >
                                <Content fontSize={12} color={'black'} noOfLines={1}  >Plot 160 Hakim Manzil, phase 3 Dumduma hdhdd dhbdhd hhdh </Content>
                                <HStack space={2} alignItems={'center'}>
                                    <Text fontSize={12}>Deliver to:</Text>
                                    <Heading size={'xs'}>Ramakrushna Pramahansa</Heading>
                                </HStack>
                            </Box>
                        </VStack>
                    </Pressable>

                    <Heading fontSize={15} mb={3} mt={3}>
                        Order Items
                    </Heading>

                    <>
                        <Box bg={'white'} borderRadius={8} borderColor={'gray.200'} borderWidth={0.5}>
                            {cartItems.map((item, index) => (
                                <Box key={item.id} mx={0} >
                                    <HStack space={1}>
                                        <Box p={1} m={1} >
                                            <Image
                                                source={{ uri: item.imageUri }}
                                                alt={'no image'}
                                                h={16}
                                                w={16}
                                                borderRadius={6}
                                                resizeMode='contain'
                                            />
                                        </Box>

                                        <VStack p={1} m={1} space={1} w={'70%'}>
                                            <HStack justifyContent={'space-between'}>
                                                <Heading size={'xs'} noOfLines={1}>
                                                    {item.itemName}
                                                </Heading>
                                            </HStack>

                                            <Content fontSize={12}>Quantity: {item.quantity}</Content>

                                            <HStack justifyContent={'space-between'}>
                                                <HStack alignItems={'center'} space={1}>
                                                    <AppIcon FontAwesome5Name='rupee-sign' size={12} />
                                                    <Heading size={'xs'} noOfLines={1}>
                                                        {item.price}
                                                    </Heading>
                                                </HStack>
                                            </HStack>

                                        </VStack>
                                    </HStack>
                                    {index !== cartItems.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </Box>

                        <Pressable onPress={() => navigate('MyCoupons')} mt={4} borderRadius={10} bg={'white'} borderWidth={0.5} borderColor={'secondary.700'} p={3}>
                            <VStack space={4} >
                                <HStack justifyContent={'space-between'}>
                                    <HStack space={1} alignItems={'center'} >
                                        <AppIcon MaterialCommunityIconsName='brightness-percent' size={25} color={COLORS.SECONDARY} />
                                        <Heading fontSize={18} color={'black'}> Apply Promo Code </Heading>

                                    </HStack>

                                    <Heading fontSize={18} color={COLORS.SECONDARY}> Apply </Heading>
                                </HStack>
                                <Box >
                                    <Content mt={-2} fontSize={12} color={'gray.500'} noOfLines={1}>Save another 100 rupees in this order. </Content>
                                </Box>

                                <Divider />
                                <Pressable onPress={() => navigate('MyCoupons')} >
                                    <HStack space={1} alignItems={'center'} justifyContent={'center'} >
                                        <Heading alignSelf={'center'} size={'xs'}>View More Coupons</Heading>
                                        <AppIcon EntypoName='chevron-small-right' size={20} color={'black'} />
                                    </HStack>
                                </Pressable>
                            </VStack>
                        </Pressable>

                        <Heading fontSize={15} mt={4}>
                            Payment Method
                        </Heading>
                        <Pressable
                            mt={4}
                            borderRadius={8}
                            bg={'white'}
                            borderWidth={isPaymentMethodSelected('Online payment') ? 1 : 0.5}
                            borderColor={isPaymentMethodSelected('Online payment') ? 'success.700' : 'gray.700'}
                            p={2}
                            onPress={() => handlePaymentMethodSelection('Online payment')}
                        >
                            <VStack space={4}>
                                <HStack justifyContent={'space-between'}>
                                    <HStack space={1} alignItems={'center'}>
                                        <AppIcon MaterialIconsName='payment' size={25} color={isPaymentMethodSelected('Online payment') ? 'green' : 'gray'} />
                                        <Heading fontSize={15} color={isPaymentMethodSelected('Online payment') ? 'success.700' : 'black'}> Online payment </Heading>
                                    </HStack>
                                    {isPaymentMethodSelected('Online payment') && <AppIcon FeatherName='check-circle' size={25} color={isPaymentMethodSelected('Online payment') ? 'green' : 'gray'} />}
                                </HStack>
                            </VStack>
                        </Pressable>

                        <Pressable
                            mt={4}
                            borderRadius={10}
                            bg={'white'}
                            borderWidth={isPaymentMethodSelected('Cash on delivery') ? 1 : 0.5}
                            borderColor={isPaymentMethodSelected('Cash on delivery') ? 'success.700' : 'gray.700'}
                            p={2}
                            onPress={() => handlePaymentMethodSelection('Cash on delivery')}
                        >
                            <VStack space={4}>
                                <HStack justifyContent={'space-between'}>
                                    <HStack space={1} alignItems={'center'}>
                                        <AppIcon FontAwesome5Name='hand-holding-usd' size={25} color={isPaymentMethodSelected('Cash on delivery') ? 'green' : 'gray'} />
                                        <Heading fontSize={15} color={isPaymentMethodSelected('Cash on delivery') ? 'success.700' : 'black'} > Cash on delivery </Heading>
                                    </HStack>
                                    {isPaymentMethodSelected('Cash on delivery') && <AppIcon FeatherName='check-circle' size={25} color={isPaymentMethodSelected('Cash on delivery') ? 'green' : 'gray'} />}
                                </HStack>
                            </VStack>
                        </Pressable>

                        <Heading fontSize={15} mt={4} mb={2}>
                            Bill Details
                        </Heading>

                        <Box
                            mt={2}
                            borderRadius={10}
                            bg={'white'}
                            p={2}
                        >
                            <VStack space={4} m={2}>
                                <HStack justifyContent={'space-between'}>
                                    <Content fontSize={12}>Item Total (1 item)</Content>
                                    <HStack space={1} alignItems={'center'}>
                                        <AppIcon FontAwesome5Name='rupee-sign' color={'gray'} size={14} />
                                        <Heading fontSize={15} color={'gray.600'}> 461</Heading>
                                    </HStack>
                                </HStack>
                                <HStack justifyContent={'space-between'}>
                                    <Heading fontSize={15} color={'success.700'}>You Save</Heading>
                                    <HStack space={1} alignItems={'center'}>
                                        <AppIcon FontAwesome5Name='rupee-sign' color={'green'} size={14} />
                                        <Heading fontSize={15} color={'success.700'} > 138.00</Heading>
                                    </HStack>
                                </HStack>
                                <HStack justifyContent={'space-between'}>
                                    <Content fontSize={12}>Delivery Charges</Content>
                                    <HStack space={1} alignItems={'center'}>
                                        <AppIcon FontAwesome5Name='rupee-sign' size={14} color={'gray'} />
                                        <Heading fontSize={15} color={'gray.600'} > 25</Heading>
                                    </HStack>
                                </HStack>
                                <HStack justifyContent={'space-between'}>
                                    <Content fontSize={12}>Coupon Discount</Content>
                                    <HStack space={1} alignItems={'center'}>
                                        <AppIcon FontAwesome5Name='rupee-sign' size={14} color={'gray'} />
                                        <Heading fontSize={15} color={'gray.600'} > - 0</Heading>
                                    </HStack>
                                </HStack>

                                <VStack space={4} bg={'gray.100'} borderRadius={5} borderColor={'gray.500'} p={2} >
                                    <HStack justifyContent={'space-between'}>
                                        <VStack space={2}>
                                            <Heading color={'gray.700'} fontSize={15} >Available Wallet Balance</Heading>

                                        </VStack>
                                        <HStack space={1} alignItems={'center'}>
                                            <AppIcon FontAwesome5Name='rupee-sign' size={14} color={'black'} />
                                            <Heading
                                                color={'black'}
                                                fontSize={15}
                                                textDecorationLine={'line-through'}>
                                                20
                                            </Heading>
                                        </HStack>
                                    </HStack>
                                    <Btn fontSize={15} bg={'white'} borderColor={COLORS.PRIMARY} borderWidth={0.5} onPress={handleApply}>
                                        <Heading size={'sm'} color={COLORS.PRIMARY}>Apply</Heading>
                                    </Btn>
                                </VStack>


                                <Divider />

                                <HStack justifyContent={'space-between'}>
                                    <Heading fontSize={15}  > Total Amount</Heading>
                                    <HStack space={1} alignItems={'center'}>
                                        <AppIcon FontAwesome5Name='rupee-sign' size={14} />
                                        <Heading fontSize={15}  > 486</Heading>
                                    </HStack>
                                </HStack>
                            </VStack>
                        </Box>
                    </>
                </Box>
            </ScrollView>

            <Box shadow={1} p={1} mx={1} px={2} borderTopLeftRadius={30} borderTopRightRadius={30} bg={'white'}>
                <HStack justifyContent={'space-between'} alignItems={'center'} m={4}>
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
                    <Btn borderRadius={5} shadow={1} onPress={showAlert}>
                        <HStack justifyContent={'space-between'} px={4}>
                            <Heading size={'sm'} color={'white'}>Proceed</Heading>
                            <AppIcon FeatherName='chevron-right' size={20} color={'white'} />
                        </HStack>
                    </Btn>
                </HStack>
            </Box>

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>


                    <Box bg={'white'} h={HEIGHT / 3} alignItems={'center'} justifyContent={'center'}>
                        <AnimatedLottieView
                            source={LOTTI.ORDERSUCCESS}
                            autoPlay
                            loop={true}
                        />
                    </Box>
                    <Heading mb={8} textAlign={'center'} color={'success.700'}>Order Success </Heading>

                </AlertDialog.Content>
            </AlertDialog >

        </>
    );
}

export default Checkout;
