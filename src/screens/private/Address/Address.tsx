import React from 'react';
import { HStack, VStack, Box, Heading, ScrollView, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import { COLORS } from '~/styles';
import { AppIcon, Btn, Content } from '~/components/core';
import { AlertDialog } from "native-base";

interface AddressItemProps {
    id: number;
    name: string;
    city: string;
    state: string;
    landmark: string;
    PIN: number;
    line1: string;
    line2: string;
    type: string;
    phoneNumber: string;
    icon?: () => JSX.Element;
}

const AddressItem: React.FC<AddressItemProps> = ({ id, type, phoneNumber, icon: IconComponent, name, city, state, landmark, PIN, line1, line2 }) => {
    const { navigate } = useNavigation<StackAndTabType>();


    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    const getIconByType = (): JSX.Element => {
        if (type === 'Home') {
            return <AppIcon AntDesignName="home" size={15} color="white" />;
        } else if (type === 'Office') {
            return <AppIcon MaterialCommunityIconsName="office-building-marker-outline" size={15} color={'white'} />;
        } else {
            return <AppIcon SimpleLineIconsName="location-pin" size={15} color="white" />;
        }
    };

    return (
        <VStack mx={3} m={2} space={3} p={2} borderRadius={10} shadow={2} bg={'white'}>

            <HStack space={3} alignItems="center" justifyContent={'space-between'}>


                <HStack shadow={1} bg={COLORS.PRIMARY} borderBottomRightRadius={10} borderTopLeftRadius={10} space={2} alignItems={'center'} mx={-2} mt={-3} p={1} justifyContent={'center'}>
                    {IconComponent ? (
                        <IconComponent />
                    ) : (
                        getIconByType()
                    )}
                    <Content fontSize={14} color={'white'} weight='400'>
                        {type}
                    </Content>
                </HStack>

                <HStack space={4} justifyContent={'flex-end'} alignItems={'center'} alignSelf={'center'}>
                    <Pressable
                        _pressed={{ opacity: 0.6 }}
                        rounded={'full'}
                        opacity={0.8}
                        mt={0.9}
                        onPress={() => navigate('EditAddress')}>
                        <AppIcon MaterialCommunityIconsName='square-edit-outline' size={20} />
                    </Pressable>

                    <Pressable _pressed={{ opacity: 0.6 }} onPress={() => setIsOpen(!isOpen)} alignSelf={'center'}>
                        <AppIcon MaterialCommunityIconsName='delete-outline' size={20} />
                    </Pressable>
                </HStack>
            </HStack>

            <VStack space={1}>
                <Content fontSize={14} color={'black'} weight='200'>{name}{', '}{phoneNumber}</Content>
            </VStack>
            <Content fontSize={13} color={'gray'}>{line1}{', '}{line2} {city}{', '}{state}{', '}{landmark}{', '}{PIN} </Content>

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <Box m={2} my={3}>
                        <VStack space={3} m={3}>
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Heading size={'sm'} >Delete Address</Heading>
                                <Pressable onPress={onClose}>
                                    <AppIcon EntypoName='circle-with-cross' size={20} color={'black'} />
                                </Pressable>

                            </HStack>
                            <Content fontSize={12} color={'gray'}>Are you sure want to delete this address?</Content>
                        </VStack>

                        <HStack justifyContent={'space-between'} space={5} m={3} alignItems={'center'}>
                            <Pressable onPress={onClose} ref={cancelRef} _pressed={{ opacity: 0.6 }} borderWidth={1} borderColor={'black'} p={1.5} px={2} borderRadius={5}>
                                <Heading size={'sm'} >Cancel</Heading>
                            </Pressable>
                            <Btn bg={'red.500'} >
                                <Heading size={'sm'} color={'white'}>Delete</Heading>
                            </Btn>
                        </HStack>
                    </Box>
                </AlertDialog.Content>
            </AlertDialog>

        </VStack>
    );
};

const Address = () => {

    const { navigate, goBack } = useNavigation<StackAndTabType>();

    const handleAddAddress = () => {
        navigate('AddAddress');
    };

    const addresses = [
        { id: 1, name: 'Jason Statham', city: 'bhubaneswar', state: 'odisha', landmark: 'near school', PIN: 764512, line1: 'Plot 160 Hakim Manzil, Phase 3 Dumduma,', line2: 'Dumduma phase 3', type: 'Home', phoneNumber: '1234567890' },
        { id: 1, name: 'Jason Statham', city: 'bhubaneswar', state: 'odisha', landmark: 'near school', PIN: 764512, line1: 'Plot 160 Hakim Manzil, Phase 3 Dumduma,', line2: 'Dumduma phase 3', type: 'Office', phoneNumber: '1234567890' },
        { id: 1, name: 'Jason Statham', city: 'bhubaneswar', state: 'odisha', landmark: 'near school', PIN: 764512, line1: 'Plot 160 Hakim Manzil, Phase 3 Dumduma,', line2: 'Dumduma phase 3', type: 'Others', phoneNumber: '1234567890' },
    ];


    return (
        <>
            <Box bg={COLORS.PRIMARY} >
                <HStack space={3} justifyContent={'flex-start'} alignItems={'center'} p={4}>
                    <Pressable onPress={() => goBack()}>
                        <AppIcon AntDesignName="arrowleft" size={24} color={'white'} />
                    </Pressable>
                    <Heading textAlign={'center'} size="md" color={'white'}>
                        My Addresses
                    </Heading>
                </HStack>


            </Box>


            <ScrollView >

                <Box mt={3} >
                    {addresses.map((item, index) => (
                        <AddressItem key={index} {...item} />
                    ))}
                </Box>


            </ScrollView>





            <Btn borderRadius={5} bg={COLORS.PRIMARY} onPress={handleAddAddress} m={3}>
                <HStack justifyContent={'space-between'} px={4}>
                    <Heading size={'sm'} color={'white'}>Add new address</Heading>
                    <AppIcon FeatherName='chevron-right' size={20} color={'white'} />
                </HStack>
            </Btn>
        </>


    );
};

export default Address;
