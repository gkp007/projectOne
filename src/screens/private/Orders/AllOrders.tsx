import React, { useState } from 'react'
import { Actionsheet, Box, Divider, HStack, Heading, Image, Input, Modal, Pressable, ScrollView, Text, TextArea, VStack, useDisclose } from 'native-base'
import { AppIcon, Btn, Content, Header } from '~/components/core'
import { COLORS, HEIGHT, WIDTH } from '~/styles'
import { useNavigation } from '@react-navigation/native'
import { StackAndTabType } from '~/routes/private/types'
import GlobalSearch from '../Search/GlobalSearch'
import { StarRating } from '~/components'

const AllOrders = () => {

    const { navigate, goBack } = useNavigation<StackAndTabType>();

    const [visible, setVisible] = useState(false);

    const orders = [
        {
            orderId: 12345,
            img: 'https://yard-ecommerce-web.vercel.app/product/op_scope_light.jpg',
            name: 'Remi Magnetic Stirrer',
            clrName: 'red.500',
            color: 'Red',
            size: '10',
            quantity: 2,
            status: 'In transit',
            price: 1500,
            date: '12-Jul-2024 12:10:05',
            address: 'kalinganagar, bhubaneswar',
            rating: 'Not rated yet',
            isRated: false,
        },
        {
            orderId: 67890,
            img: 'https://yard-ecommerce-web.vercel.app/product/cautery_machine_light.jpg',
            name: 'Telescopic Obstetric Gynaec Table',
            clrName: 'blue.500',
            color: 'Blue',
            size: '8',
            quantity: 1,
            status: 'Delivered',
            price: 1200,
            date: '12-Jul-2024 12:10:05',
            address: 'CRPF, bhubaneswar',
            isRated: true,
            rating: 5,
        },
        {
            orderId: 67890,
            img: 'https://yard-ecommerce-web.vercel.app/product/cautery_machine_light.jpg',
            name: 'Telescopic Obstetric Gynaec Table',
            clrName: 'blue.500',
            color: 'Blue',
            size: '8',
            quantity: 1,
            status: 'Delivered',
            price: 1200,
            date: '12-Jul-2024 12:10:05',
            address: 'CRPF, bhubaneswar',
            isRated: false,

        },
        {
            orderId: 123466,
            img: 'https://yard-ecommerce-web.vercel.app/product/op_scope_light.jpg',
            name: 'Remi Magnetic Stirrer',
            clrName: 'red.500',
            color: 'Red',
            size: '10',
            quantity: 2,
            status: 'In transit',
            price: 1500,
            date: '12-Jul-2024 12:10:05',
            address: 'Nayapalli, bhubaneswar',
            isRated: false,
        },
        {
            orderId: 6789450,
            img: 'https://yard-ecommerce-web.vercel.app/product/cautery_machine_light.jpg',
            name: 'Telescopic Obstetric Gynaec Table',
            clrName: 'blue.500',
            color: 'Blue',
            size: '8',
            quantity: 1,
            status: 'Failed',
            price: 1200,
            date: '12-Jul-2024 12:10:05',
            address: 'Jayadev vihar, bhubaneswar',
            isRated: false
        },
        {
            orderId: 6789450,
            img: 'https://yard-ecommerce-web.vercel.app/product/cautery_machine_light.jpg',
            name: 'Telescopic Obstetric Gynaec Table',
            clrName: 'blue.500',
            color: 'Blue',
            size: '8',
            quantity: 1,
            status: 'Reject',
            price: 1200,
            date: '12-Jul-2024 12:10:05',
            address: 'Jayadev vihar, bhubaneswar',
            isRated: false,
        },
    ];

    const { isOpen, onOpen, onClose } = useDisclose();

    const [showModal, setShowModal] = useState(false);

    const navigateToOrderDetails = (orderId?: number) => {

        console.log('Navigating to order details for orderId:', orderId);
        // navigate('OrderDetails', { orderId });
    };
    return (
        < Box bg={'white'} h={HEIGHT}>

            <Header title="My order" showCartIcon />

            <Heading size={'md'} m={3}>All Orders</Heading>

            <ScrollView showsVerticalScrollIndicator={false} mb={10}>
                <VStack mt={1} >
                    {orders.map((order, index) => (
                        <Box key={index} >
                            <Box borderRadius={10} shadow={1} m={2} mb={3} bg={'white'} >
                                <HStack w={'100%'} p={2} justifyContent={'space-between'}>
                                    <Pressable w={'20%'} h={16} borderRadius={10} onPress={() => navigate('ProductDetails')}>
                                        <Image resizeMode='contain' size={60} borderRadius={5} source={{ uri: order.img }} alt="shoes" />
                                    </Pressable>
                                    <VStack space={2} w={'60%'}>
                                        <Pressable onPress={() => navigate('ProductDetails')} _pressed={{ opacity: 0.5 }}>

                                            <Heading fontSize={16} w={'90%'} fontWeight="bold" mr="auto" noOfLines={1} >
                                                {order.name}
                                            </Heading>
                                        </Pressable>
                                        <Content fontSize={12} weight='400' color={'gray.500'}>
                                            {order.address}
                                        </Content>
                                        <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigate('OrderDetails')}>
                                            <HStack space={1}>

                                                {order.status === 'In transit' ? (
                                                    <Heading fontSize={12} noOfLines={1} color={COLORS.PRIMARY}>
                                                        Track Order
                                                    </Heading>
                                                ) : (
                                                    <Heading fontSize={12} noOfLines={1} color={COLORS.PRIMARY}>
                                                        Details
                                                    </Heading>
                                                )}
                                                <AppIcon FontAwesomeName='caret-right' size={15} color={COLORS.PRIMARY} />
                                            </HStack>
                                        </Pressable>
                                    </VStack>
                                    <VStack>
                                        <Box bg={'white'} p={1} px={2} borderRadius={5}>
                                            <Heading size={'xs'} color={order.status === 'Delivered' ? 'success.600' : order.status === 'In transit' ? 'orange.600' : 'danger.500'}>{order.status}</Heading>
                                        </Box>
                                    </VStack>
                                </HStack>


                                <HStack justifyContent={'space-between'} m={2}>
                                    <Content fontSize={12} weight='400' color={'gray.600'}>
                                        {order.date}
                                    </Content>

                                    <HStack alignItems={'center'} space={1} mx={3}>
                                        <AppIcon FontAwesome5Name='rupee-sign' size={12} />
                                        <Heading size={'xs'} noOfLines={1}>
                                            {order.price}
                                        </Heading>
                                    </HStack>

                                </HStack>
                                <Divider w={'95%'} alignSelf={'center'} />
                                <Pressable _pressed={{ opacity: 0.5 }}>

                                    <HStack justifyContent={'space-between'}>

                                        {order.isRated ? (
                                            <Pressable
                                                justifyContent="center"
                                                p={1}
                                                m={2}
                                                borderRadius={8}
                                                onPress={() => setShowModal(true)}
                                                _pressed={{ opacity: 0.5 }}
                                            >
                                                <StarRating size={15} color="#f59e0b" />
                                            </Pressable>
                                        ) : order.status === 'Delivered' ? (
                                            <Pressable
                                                justifyContent="center"
                                                bg={'gray.200'}
                                                p={1}
                                                px={5}
                                                m={2}
                                                borderRadius={15}
                                                onPress={() => setShowModal(true)}
                                                _pressed={{ opacity: 0.5 }}
                                            >
                                                <Heading fontSize="15" color="gray.600" textAlign={'center'}>
                                                    Rate Us
                                                </Heading>
                                            </Pressable>
                                        ) : (
                                            <Heading
                                                p={1}
                                                m={2}
                                                fontSize="13" color="gray.600" >
                                                Rating: Not Applicable
                                            </Heading>
                                        )}
                                    </HStack>
                                </Pressable>
                            </Box>
                        </Box>
                    ))}
                </VStack>
            </ScrollView>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>

                    <Box alignItems={'center'} m="2" mb={3}>
                        <Heading fontSize={20}>How you rate this product?</Heading>
                    </Box>

                    <StarRating size={30} color="#f59e0b" />
                    <VStack space={3} mt={5} mb={5}>

                        <Heading size={'xs'}>
                            Your Review : (optional)
                        </Heading>
                        <TextArea placeholder="Enter your review..." w={'100%'} autoCompleteType={undefined} />
                    </VStack>

                    <HStack justifyContent={'space-between'}>
                        <Box h={'full'} bg={'white'} w={'50%'}>
                            <Pressable onPress={onClose} justifyContent="center" p={3} px={16} bg={'gray.200'} _pressed={{ opacity: 0.5 }}>
                                <HStack alignSelf="center" space={2} borderRadius={6} >
                                    <Text
                                        fontSize="15"
                                        fontWeight="bold"
                                        color={COLORS.PRIMARY}
                                    >
                                        Cancel
                                    </Text>
                                </HStack>
                            </Pressable>
                        </Box>
                        <Box h={'full'} bg={'white'} w={'50%'}>
                            <Pressable
                                justifyContent="center"
                                bg={COLORS.PRIMARY}
                                p={3}
                                px={'16'}
                                onPress={onClose}
                                _pressed={{ opacity: 0.5 }}
                            >
                                <Text mr={0} fontSize="15" fontWeight="bold" color="white" textAlign={'center'}>
                                    Submit
                                </Text>
                            </Pressable>
                        </Box>
                    </HStack>

                </Actionsheet.Content>
            </Actionsheet>


            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content w={WIDTH * 0.9} >
                    <VStack m={4} space={5}>
                        <VStack space={3} mt={1}>
                            <HStack mb={2}>
                                <Heading size={'md'} color={'black'}>
                                    Rate this product
                                </Heading>
                            </HStack>

                            <StarRating size={30} color="#f59e0b" />
                            <VStack space={3} mt={5}>

                                <Heading size={'xs'}>
                                    Title : (optional)
                                </Heading>
                                <Input placeholder="Enter your title..." w={'100%'} />
                            </VStack>
                            <VStack space={3} mt={5}>

                                <Heading size={'xs'}>
                                    Your Review : (optional)
                                </Heading>
                                <TextArea placeholder="Enter your review..." w={'100%'} autoCompleteType={undefined} />
                            </VStack>

                        </VStack>
                        <HStack justifyContent={'space-between'} space={5} alignItems={'center'}>
                            <Pressable onPress={() => setShowModal(false)} px={8}>
                                <Heading size={'sm'} color={'gray.500'}>Cancel</Heading>
                            </Pressable>
                            <Btn bg={COLORS.PRIMARY} onPress={() => setShowModal(false)} px={8}>
                                <Heading size={'sm'} color={'white'}>
                                    Submit
                                </Heading>
                            </Btn>
                        </HStack>
                    </VStack>
                </Modal.Content>
            </Modal>

            <GlobalSearch
                visible={visible}
                onClose={() => {
                    setVisible(false);
                }}
                onSelect={() => {
                    setVisible(false);
                }}
            />

        </Box >
    )
}

export default AllOrders