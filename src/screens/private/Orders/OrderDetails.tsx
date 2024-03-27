import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    Box,
    Divider,
    FlatList,
    HStack,
    Heading,
    Text,
    VStack,
    useColorMode,
    Pressable,
    Actionsheet,
    useDisclose,
    ScrollView,
    Image,
} from 'native-base';
import React, { ReactNode, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppIcon, Btn, Content } from '~/components/core';
import { PrivateRoutesTypes, StackAndTabType } from '~/routes/private/types';
import { COLORS } from '~/styles';

type ProductProps = NativeStackScreenProps<PrivateRoutesTypes, 'OrderDetails'>;

type status = {
    id: number;
    msg: string;
    date: string;
    address: string;
    time: string;
};

type PriceDetails = {
    id: number;
    price: string;
    amount: string;
};

type CartItem = {
    date: ReactNode;
    id: number;
    imageUri: string;
    itemName: string;
    brand: string;
    soldBy: string;
    price: number;
    quantity: number;
    status: string;
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
        status: 'Delivered',
        date: "5-02-2024",
    },


];

const statusData: status[] = [
    {
        id: 1,
        msg: 'Order In Transit',
        date: 'Dec 17',
        address: '32 ManchesterAve Ringgold, GA 30736',
        time: '15:20PM',
    },
    {
        id: 2,
        msg: 'Order placed at custom Port',
        date: 'Dec 16',
        address: '32 ManchesterAve Ringgold, GA 30736',
        time: '15:20PM',
    },
    {
        id: 3,
        msg: 'Order are already Shipped',
        date: 'Dec 12',
        address: '32 ManchesterAve Ringgold, GA 30736',
        time: '15:20PM',
    },

    {
        id: 4,
        msg: 'Order is in Packing',
        date: 'Dec 15',
        address: '891 Glen Ridgen St.Gainesville, VA 20736',
        time: '10:20AM',
    },
    {
        id: 5,
        msg: 'Verified Payments',
        date: 'Dec 15',
        address: '55 Summerhouse Dr.Apopka, FL 32706',
        time: '10:04AM',
    },
];

const truncateTextWithEllipsis = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
        const halfLength = Math.floor((maxLength - 3) / 2);
        const firstHalf = text.slice(0, halfLength);
        const secondHalf = text.slice(text.length - halfLength);
        return `${firstHalf}...${secondHalf}`;
    }
    return text;
};

const priceDetails: PriceDetails[] = [
    {
        id: 1,
        price: 'List Price',
        amount: '₹494',
    },
    {
        id: 2,
        price: 'Selling Price',
        amount: '394',
    },
    {
        id: 3,
        price: 'Discounted Price',
        amount: '-100',
    },
    {
        id: 4,
        price: 'Delivery Charge',
        amount: '40',
    },
    {
        id: 5,
        price: 'Coupon Discount',
        amount: '-₹40',
    },
    {
        id: 6,
        price: 'Total Amount Paid',
        amount: '394',
    },
];

export default function OrderDetails({ route: { params }, }: ProductProps): JSX.Element {

    const { colorMode } = useColorMode();
    const [selectedStep, setSelectedStep] = useState<string>('Delivered');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { navigate, goBack } = useNavigation<StackAndTabType>();
    const [showModal, setShowModal] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclose();
    const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclose();

    const renderItem = ({ item: Status, index }: { item: status; index: number }) => {
        const maxLength = 25;
        const truncatedMsg = truncateTextWithEllipsis(Status.msg, maxLength);
        const isLastItem = index === statusData.length - 1;
        return (
            <Box >
                <HStack space={3}>

                    <Box
                        alignItems="center"
                        alignSelf="center"
                        borderRadius="full"
                        borderWidth={2}
                        borderColor={'success.700'}
                        w={5}
                        h={5}
                        mr={5}
                        justifyContent="center">
                        <Box
                            bg={'success.700'}
                            w={3}
                            h={3}
                            borderRadius="full"
                        />
                    </Box>

                    <VStack>
                        <HStack>
                            <Content
                                color={'black'}
                                fontSize={13}
                                fontWeight={600}
                                mb={1}>
                                {truncatedMsg} - {Status.date}
                            </Content>
                        </HStack>

                        <Content
                            fontSize={12}
                            color={'trueGray.500'}
                            fontWeight={500}>
                            {Status.address}
                        </Content>
                    </VStack>

                    <Content
                        fontSize={10}
                        color={'trueGray.500'}
                    >
                        {Status.time}
                    </Content>

                </HStack>
                {isLastItem ? null : (
                    <Box
                        h={5}
                        borderColor={'success.700'}
                        borderLeftWidth={2}
                        borderStyle="dashed"
                        ml={2}
                    />
                )}
            </Box>
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
                            Order Details
                        </Heading>
                    </HStack>
                </HStack>
            </Box>

            <ScrollView>
                <Box flex={1} m={5}>
                    <VStack space={2}>
                        <HStack alignItems="center" space="1">
                            <Content fontSize={11} color="black">Order ID :</Content>
                            <Content fontSize={11} color="black" weight="400">0D32900096548</Content>
                        </HStack>




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

                                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                                <HStack alignItems={'center'} space={1}>
                                                    <AppIcon FontAwesome5Name='rupee-sign' size={12} />
                                                    <Heading size={'xs'} noOfLines={1}>
                                                        {item.price}
                                                    </Heading>
                                                </HStack>
                                                <Heading fontSize={11} color={'success.700'}>Delivered on {item.date}</Heading>
                                            </HStack>

                                        </VStack>
                                    </HStack>
                                    {index !== cartItems.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </Box>

                        <Box mt={4}>
                            <Text fontSize={12} fontWeight={'bold'}>
                                Packet In Delivery
                            </Text>
                            <VStack mt="4" justifyContent={'center'}>
                                <HStack alignItems={'center'} space={2}>
                                    <Box
                                        alignItems="center"
                                        justifyContent="center"
                                        w={5}
                                        h={5}
                                        borderRadius="full"
                                        bg={selectedStep === 'Cancelled' ? 'danger.600' : 'success.600'}>
                                        <AppIcon
                                            EntypoName={selectedStep === 'Cancelled' ? 'cross' : 'check'}
                                            size={12}
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                        />
                                    </Box>
                                    <Content fontSize={'11'}>{selectedStep === 'Cancelled' ? 'Order Cancelled,' : 'Order Confirmed,'}</Content>
                                    <Content fontSize={'11'}>Oct 09</Content>
                                </HStack>
                                <Divider
                                    mx={2}
                                    w={1}
                                    h={'6'}
                                    bg={
                                        selectedStep === 'Delivered'
                                            ? 'success.600'
                                            : selectedStep === 'In Transit'
                                                ? 'success.600'
                                                : 'muted.200'
                                    }
                                />

                                <HStack alignItems={'center'} space={2}>
                                    <Box
                                        alignItems="center"
                                        justifyContent="center"
                                        w={5}
                                        h={5}
                                        borderRadius="full"
                                        bg={selectedStep === 'Delivered' ? 'success.600' : 'muted.200'}>
                                        <AppIcon
                                            EntypoName={selectedStep === 'Cancelled' ? 'cross' : 'check'}
                                            size={12}
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                        />
                                    </Box>
                                    {selectedStep === 'Cancelled' ? (
                                        undefined
                                    ) : (
                                        <HStack>
                                            <Text fontSize={'12'}>Picked, </Text>
                                            <Text fontSize={'12'}>Oct 20</Text>
                                        </HStack>
                                    )}



                                </HStack>

                                <Divider
                                    mx={2}
                                    w={1}
                                    h={'6'}
                                    bg={
                                        selectedStep === 'Delivered'
                                            ? 'success.600'
                                            : selectedStep === 'In Transit'
                                                ? 'success.600'
                                                : 'muted.200'
                                    }
                                />



                                <HStack alignItems={'center'} space={2}>
                                    <Box
                                        alignItems="center"
                                        justifyContent="center"
                                        w={5}
                                        h={5}
                                        borderRadius="full"
                                        bg={selectedStep === 'Cancelled' ? 'danger.600' : 'success.600'}>
                                        <AppIcon
                                            EntypoName={selectedStep === 'Cancelled' ? 'cross' : 'check'}
                                            size={12}
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                        />
                                    </Box>
                                    <Content fontSize={'11'}>{selectedStep === 'Cancelled' ? 'Order Cancelled,' : 'In transit,'}</Content>
                                    <Content fontSize={'11'}>Oct 09</Content>
                                </HStack>
                                <Divider
                                    mx={2}
                                    w={1}
                                    h={'6'}
                                    bg={
                                        selectedStep === 'Delivered'
                                            ? 'success.600'
                                            : selectedStep === 'In Transit'
                                                ? 'success.600'
                                                : 'muted.200'
                                    }
                                />

                                <HStack alignItems={'center'} space={2}>
                                    <Box
                                        alignItems="center"
                                        justifyContent="center"
                                        w={5}
                                        h={5}
                                        borderRadius="full"
                                        bg={selectedStep === 'Delivered' ? 'success.600' : 'muted.200'}>
                                        <AppIcon
                                            EntypoName={selectedStep === 'Cancelled' ? 'cross' : 'check'}
                                            size={12}
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                        />
                                    </Box>
                                    {selectedStep === 'Cancelled' ? (
                                        <Text fontSize={'12'}></Text>
                                    ) : (
                                        <HStack>
                                            <Text fontSize={'12'}>Out for delivery, </Text>
                                            <Text fontSize={'12'}>Oct 12</Text>
                                        </HStack>
                                    )}

                                </HStack>
                                <Divider
                                    mx={2}
                                    w={1}
                                    h={'6'}
                                    bg={
                                        selectedStep === 'Delivered'
                                            ? 'success.600'
                                            : selectedStep === 'In Transit'
                                                ? 'success.600'
                                                : 'muted.200'
                                    }
                                />
                                <HStack alignItems={'center'} space={2}>
                                    <Box
                                        alignItems="center"
                                        justifyContent="center"
                                        w={5}
                                        h={5}
                                        borderRadius="full"
                                        bg={selectedStep === 'Cancelled' ? 'danger.600' : 'success.600'}>
                                        <AppIcon
                                            EntypoName={selectedStep === 'Cancelled' ? 'cross' : 'check'}
                                            size={12}
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                        />
                                    </Box>
                                    <Content fontSize={'11'}>{selectedStep === 'Cancelled' ? 'Order Cancelled,' : 'Delivered, '}</Content>
                                    <Content fontSize={'11'}>Oct 09</Content>
                                </HStack>


                            </VStack>
                            {selectedStep === 'Cancelled' ? (
                                <HStack mt={4} alignItems={'center'} space={1}>
                                    <Content color={'black'} weight='400' fontSize={13}>
                                        Oops Item Cancelled
                                    </Content>
                                    <AppIcon EntypoName="emoji-sad" size={18} color={'red'} />
                                </HStack>
                            ) : (
                                <Pressable >
                                    <HStack mt={4} alignItems={'center'} space={1}>
                                        <Content color={'blue.700'} weight='400' fontSize={13}>
                                            Order Completed
                                        </Content>

                                    </HStack>
                                </Pressable>
                            )}
                        </Box>
                        <Divider my={4} opacity={0.5} />
                        <Box>
                            <Heading size={'xs'} mb="4">
                                Shipping Details
                            </Heading>

                            <Heading fontSize={13} mb="2">
                                Jashon Stathom
                            </Heading>
                            <VStack space="1">
                                <Content fontSize={11}>61480 Sunbrook Park PC 5678</Content>
                                <Content fontSize={11}>Phone number: +91-123-4567-12345</Content>
                            </VStack>
                        </Box>
                        <Divider my={4} opacity={0.5} />
                        <Box>
                            <Heading fontSize={12}>
                                Price Details
                            </Heading>
                            <Divider w="full" my="3" opacity={0.5} />
                            <VStack space="2">
                                {priceDetails.slice(0, 1).map(item => (
                                    <HStack key={item.id} justifyContent="space-between">
                                        <Content fontSize={11} weight='400'>
                                            {item.price}
                                        </Content>
                                        <Content
                                            fontSize={11}
                                            weight='400'
                                            fontStyle={'normal'}
                                            textDecorationLine={'line-through'}>
                                            {item.amount}
                                        </Content>
                                    </HStack>
                                ))}
                                {priceDetails.slice(1, priceDetails.length - 1).map(item => (
                                    <HStack key={item.id} justifyContent="space-between">
                                        <Content fontSize={11} weight='400'>
                                            {item.price}
                                        </Content>
                                        <Content fontSize={11} weight='400'>
                                            {item.amount}
                                        </Content>
                                    </HStack>
                                ))}

                                <Divider w="full" my="3" opacity={0.5} />
                                {priceDetails
                                    .slice(priceDetails.length - 1, priceDetails.length)
                                    .map(item => (
                                        <HStack key={item.id} justifyContent="space-between">
                                            <Content fontSize={11} bold>
                                                {item.price}
                                            </Content>
                                            <Content fontSize={11} weight='400' color={'success.800'}>
                                                {item.amount}
                                            </Content>
                                        </HStack>
                                    ))}
                            </VStack>
                        </Box>
                        <Divider my={4} opacity={0.5} />
                    </VStack >
                </Box >
            </ScrollView >



            {selectedStep === 'Delivered'
                ? (
                    <Box alignItems={'center'} p={2} m={2}>
                        <Pressable
                            borderRadius={20}
                            onPress={() => navigate('Help')}
                            py={2}
                            shadow={1}
                            bg={COLORS.SECONDARY}
                            w="45%"
                            alignItems="center">
                            <Heading
                                color={'white'}
                                fontSize={17}
                            >
                                Need help?
                            </Heading>
                        </Pressable>
                    </Box>
                )
                : selectedStep === 'Cancelled'
                    ? (
                        <Box alignItems={'center'} p={2} m={2}>
                            <Pressable
                                borderRadius={20}
                                onPress={() => navigate('Support')}
                                py={2}
                                shadow={1}
                                bg={COLORS.SECONDARY}
                                w="45%"
                                alignItems="center">
                                <Heading
                                    color={'white'}
                                    fontSize={17}>
                                    Need help?
                                </Heading>
                            </Pressable>
                        </Box>
                    )
                    : (
                        <Box p={2} alignItems={'center'} my={2}>
                            <HStack space={3}>
                                <Pressable
                                    onPress={onOpenConfirm}
                                    _pressed={{ bg: 'error.100' }}
                                    py={2}
                                    borderRadius={5}
                                    w="45%"

                                    bg={'white'}
                                    borderColor="error.600"
                                    borderWidth={1}
                                    alignItems={'center'}>
                                    <Heading fontSize={17} color="error.600">
                                        Cancel
                                    </Heading>
                                </Pressable>

                                <Pressable
                                    borderRadius={5}
                                    onPress={() => navigate('Support')}
                                    py={2}

                                    bg={COLORS.SECONDARY}
                                    w="45%"
                                    alignItems="center">
                                    <Heading
                                        fontSize={17}
                                        color={'white'}>
                                        Need help?
                                    </Heading>
                                </Pressable>
                            </HStack>
                        </Box>
                    )
            }

            <Actionsheet isOpen={isOpenConfirm} onClose={onCloseConfirm}>
                <Actionsheet.Content>
                    <VStack space={8} mb={3}>
                        <VStack>
                            <HStack justifyContent={'center'} alignItems={'center'}>
                                <Heading size={'sm'} color={'black'} mt={3}>
                                    Are you sure want to cancel this product?
                                </Heading>

                            </HStack>

                        </VStack>
                        <HStack justifyContent={'space-between'} space={5} >
                            <Pressable onPress={onCloseConfirm} px={8}>
                                <Heading size={'sm'} color={'gray.500'}>Cancel</Heading>
                            </Pressable>
                            <Btn bg={COLORS.DANGER} onPress={onCloseConfirm} px={8}>
                                <Heading size={'sm'} color={'white'}>
                                    Confirm
                                </Heading>
                            </Btn>
                        </HStack>
                    </VStack>
                </Actionsheet.Content>
            </Actionsheet>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Heading size={'md'} alignItems={'flex-start'} mb={5}>
                        Location Updates
                    </Heading>
                    <FlatList
                        mb={5}
                        data={statusData}
                        renderItem={({ item, index }) => renderItem({ item, index })}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </Actionsheet.Content>
            </Actionsheet>

        </>
    );
}
