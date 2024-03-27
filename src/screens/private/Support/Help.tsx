import {
    Box,
    Divider,
    HStack,
    Heading,
    VStack,
    Pressable,
    Collapse,
} from 'native-base';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppIcon, Content } from '~/components/core';
import { StackAndTabType } from '~/routes/private/types';
import { COLORS } from '~/styles';

const Help = () => {

    const { navigate, goBack } = useNavigation<StackAndTabType>();
    const [isExpanded, setIsExpanded] = useState(false);

    const faqData = [
        {
            question: 'Question: How can I place an order?',
            answer:
                "To place an order, simply browse our product catalog, select the items you want, and proceed to checkout. Follow the prompts to provide shipping information and payment details to complete your purchase.",
        },
        {
            question: 'Question: Can I modify or cancel my order after placing it?',
            answer:
                "Yes, but before if it is not shipped. Please double-check your items and shipping information before confirming your order.",
        },
        {
            question: 'What payment methods do you accept?',
            answer:
                'We accept a variety of payment methods, including credit/debit cards, PayPal, and other secure payment options. You can view all available payment methods during the checkout process.',
        },
        {
            question: 'How can I track my order?',
            answer:
                'Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this tracking number on our website to monitor the status and location of your package.',
        },
        {
            question: 'What is your return policy?',
            answer:
                'We offer a hassle-free return policy within 30 days of receiving your order. Please visit our (Returns) page for detailed instructions on initiating a return and obtaining a refund or exchange.',
        },
        {
            question: 'Are there any shipping fees?',
            answer:
                'Shipping fees may vary depending on your location and the shipping method selected. You can view the shipping costs during the checkout process before finalizing your purchase.',
        },

    ];

    const [expandedIndex, setExpandedIndex] = useState(-1);

    const handleAccordionToggle = (index: number) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
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
                            Help
                        </Heading>
                    </HStack>
                </HStack>
            </Box>

            <Box mt={5} borderRadius={10} borderWidth={0.5} borderColor={'blue.300'} m={2} bg={'white'} p={2} >
                <HStack p={2} space={6} alignItems={'center'} >
                    <Box p={2} borderRadius={'full'} bg={'blue.50'} alignItems={'center'} justifyContent={'center'}>
                        <AppIcon IoniconsName="call-outline" size={24} color={'blue'} />
                    </Box>
                    <VStack space={2} >
                        <Content fontSize={12} weight='400' color={'gray.500'}>
                            Our 24 x 7 Customer Service
                        </Content>
                        <Heading color={'blue.600'} fontSize={16} w={'90%'} mr="auto" noOfLines={1} >
                            +911234567890
                        </Heading>
                    </VStack>
                </HStack>
            </Box>

            <Box borderRadius={10} borderWidth={0.5} borderColor={'blue.300'} m={2} bg={'white'} p={2} >
                <HStack p={2} space={6} alignItems={'center'} >
                    <Box p={2} borderRadius={'full'} bg={'blue.50'} alignItems={'center'} justifyContent={'center'}>
                        <AppIcon FontistoName="email" size={24} color={'blue'} />
                    </Box>
                    <VStack space={2} >
                        <Content fontSize={12} weight='400' color={'gray.500'}>
                            Write us at
                        </Content>
                        <Heading color={'blue.600'} fontSize={16} mr="auto" noOfLines={1} >
                            gk001@searchingyard.com
                        </Heading>
                    </VStack>
                </HStack>
            </Box>

            <Box m={3} mt={8}>
                <Heading size={'md'} color={'gray.600'}>Frequently Asked Questions</Heading>
            </Box>

            <Box m={3} bg={'white'} borderWidth={0.7} borderColor={'blue.300'} borderRadius={10}>
                <VStack space={3} m={4}>
                    {faqData.map((item, index) => (
                        <React.Fragment key={index}>
                            <Pressable onPress={() => handleAccordionToggle(index)}>
                                <HStack
                                    justifyContent="space-between"
                                    alignItems="center"
                                    borderRadius={5}
                                >
                                    <Heading fontSize={16} color={'gray.500'}>
                                        {item.question}
                                    </Heading>
                                    <AppIcon
                                        EntypoName={expandedIndex === index ? 'chevron-small-up' : 'chevron-small-down'}
                                        size={20}
                                        color={'black'}
                                    />
                                </HStack>
                            </Pressable>

                            <Collapse isOpen={expandedIndex === index}>
                                <Content textAlign="justify" fontSize={12}>
                                    {item.answer}
                                </Content>
                            </Collapse>
                            {index < faqData.length - 1 && <Divider borderStyle={'dotted'} />}
                        </React.Fragment>
                    ))}
                </VStack>
            </Box>
        </>

    )
}

export default Help