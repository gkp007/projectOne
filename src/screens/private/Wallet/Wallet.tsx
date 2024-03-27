import React from 'react'
import { Box, HStack, VStack, Heading, Pressable, ScrollView, Divider, Row } from 'native-base'
import { COLORS, HEIGHT, WIDTH } from '~/styles'
import { AppIcon, Content } from '~/components/core'
import { useNavigation } from '@react-navigation/native'
import { StackAndTabType } from '~/routes/private/types'

const transactions = [
    {
        type: 'DEBITED',
        amount: -50,
        date: '12th Jan 2024',
    },
    {
        type: 'CREDITED',
        amount: 1000,
        date: '12th Jan 2024',
    },
    {
        type: 'CREDITED',
        amount: 1000,
        date: '12th Jan 2024',
    },
    {
        type: 'CREDITED',
        amount: 1000,
        date: '12th Jan 2024',
    },
    {
        type: 'DEBITED',
        amount: -50,
        date: '12th Jan 2024',
    },
    {
        type: 'CREDITED',
        amount: 1000,
        date: '12th Jan 2024',
    },
    {
        type: 'DEBITED',
        amount: -50,
        date: '12th Jan 2024',
    },
    {
        type: 'DEBITED',
        amount: -50,
        date: '12th Jan 2024',
    },
    {
        type: 'DEBITED',
        amount: -50,
        date: '12th Jan 2024',
    },
    {
        type: 'DEBITED',
        amount: -50,
        date: '12th Jan 2024',
    },

];

export const Wallet: React.FC = () => {
    const { navigate, goBack } = useNavigation<StackAndTabType>();

    return (
        <Box bg={'white'} h={HEIGHT}>

            <Box bg={COLORS.PRIMARY} pb={16}>
                <HStack space={3} justifyContent={'space-between'} alignItems={'center'} p={3}>
                    <HStack space={3} justifyContent={'flex-start'} alignItems={'center'}>
                        <Pressable onPress={() => goBack()}>
                            <AppIcon AntDesignName="arrowleft" size={24} color={'white'} />
                        </Pressable>
                        <Heading textAlign={'center'} size="md" color={'white'}>
                            E-Wallet
                        </Heading>
                    </HStack>
                    <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigate('Notifications')}>
                        <Box bg={'#419197'} p={2} borderRadius={6}>
                            <AppIcon FeatherName='bell' color={'white'} size={20} />
                        </Box>
                    </Pressable>
                </HStack>

                <VStack space={3} borderRadius={12} shadow={1} m={2} p={3}>

                    <VStack space={3} p={2} borderRadius={8} justifyContent={'center'} alignItems={'center'}>
                        <Content weight='400' fontSize={12} color={'white'}>
                            CURRENT WALLET BALANCE
                        </Content>
                        <HStack alignItems={'center'} space={2}>
                            <AppIcon FontAwesome5Name='rupee-sign' size={30} color={'white'} />
                            <Heading fontSize={35} noOfLines={1} color={'white'}>
                                486.00
                            </Heading>
                        </HStack>
                    </VStack>

                    <HStack justifyContent={'space-around'} w={'100%'}>
                        <HStack px={5} space={2} borderRadius={8} borderColor={'white'} borderWidth={0.8} alignItems={'center'}>
                            <AppIcon FeatherName='arrow-down-right' size={30} color={'white'} />
                            <VStack space={1} p={2}>
                                <HStack alignItems={'center'} space={1}>
                                    <AppIcon FontAwesome5Name='rupee-sign' size={12} color={'white'} />
                                    <Heading fontSize={15} noOfLines={1} color={'white'}>
                                        514
                                    </Heading>
                                </HStack>
                                <Content weight='400' fontSize={12} color={'white'}>
                                    Money In
                                </Content>
                            </VStack>
                        </HStack>

                        <HStack px={4} space={2} borderRadius={8} borderColor={'white'} borderWidth={0.8} alignItems={'center'}>
                            <AppIcon FeatherName='arrow-up-left' size={30} color={'white'} />
                            <VStack space={1} p={2}>
                                <HStack alignItems={'center'} space={1}>
                                    <AppIcon FontAwesome5Name='rupee-sign' size={12} color={'white'} />
                                    <Heading fontSize={15} noOfLines={1} color={'white'}>
                                        514
                                    </Heading>
                                </HStack>
                                <Content weight='400' fontSize={12} color={'white'}>
                                    Money Out
                                </Content>
                            </VStack>
                        </HStack>


                    </HStack>
                </VStack>

                <Heading size={'md'} color={'white'} m={3} >All Transactions</Heading>
            </Box>


            <ScrollView mt={-60} mb={5} showsVerticalScrollIndicator={false}>
                <Box m={2} borderRadius={8} bg={'white'} shadow={1} zIndex={3} >
                    {transactions.map((transaction, index) => (
                        <VStack space={2} key={index} mb={4}>
                            <HStack space={1} justifyContent={'space-between'} alignItems={'center'} m={2}>
                                <HStack space={4} alignItems={'center'}>
                                    <Box bg={transaction.type === 'DEBITED' ? 'danger.600' : 'success.600'} p={2} borderRadius={'full'}>
                                        {/* <AppIcon FeatherName={getTransactionIcon(transaction.type)!} size={22} color={'white'} /> */}
                                        <AppIcon
                                            FeatherName={transaction.type === 'DEBITED' ? 'arrow-up-left' : 'arrow-down-right'}
                                            size={20}
                                            color={'white'}
                                        />
                                    </Box>
                                    <VStack space={1}>
                                        <Heading fontSize={16} color={transaction.type === 'DEBITED' ? 'danger.600' : 'success.700'}>
                                            {transaction.type}
                                        </Heading>
                                        <Content fontSize={12} weight="400" color={'gray.400'}>
                                            {transaction.date}
                                        </Content>
                                    </VStack>
                                </HStack>

                                <VStack space={1} alignItems={'flex-end'}>
                                    <HStack alignItems={'center'} space={3}>

                                        <AppIcon EntypoName={transaction.type === 'DEBITED' ? 'minus' : 'plus'} size={12} color={transaction.type === 'DEBITED' ? 'red' : 'green'} />

                                        <HStack alignItems={'center'}>
                                            <AppIcon FontAwesome5Name="rupee-sign" size={12} color={transaction.type === 'DEBITED' ? 'red' : 'green'} />
                                            <Heading fontSize={15} noOfLines={1} color={transaction.type === 'DEBITED' ? 'danger.600' : 'success.700'}>
                                                {Math.abs(transaction.amount)}
                                            </Heading>
                                        </HStack>
                                    </HStack>
                                    <Content fontSize={12} weight="400" color={'gray.400'}>
                                        {transaction.type === 'DEBITED' ? 'Money Out' : 'Money In'}
                                    </Content>
                                </VStack>
                            </HStack>
                            {index !== transactions.length - 1 && <Divider />}
                        </VStack>
                    ))}
                </Box>
            </ScrollView>

        </Box >
    );
}

export default Wallet;
