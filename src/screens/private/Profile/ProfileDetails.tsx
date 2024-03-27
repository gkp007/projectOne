import React, { useState } from 'react';
import {
    Avatar,
    Box,
    HStack,
    Heading,
    Input,
    Modal,
    ScrollView,
    VStack,
    Pressable
} from 'native-base';
import { AppIcon, Btn, Content, PhotoPicker } from '~/components/core';
import { COLORS, WIDTH } from '~/styles';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import { IMAGES } from '~/assets';

const ProfileDetails = () => {
    const { navigate, goBack } = useNavigation<StackAndTabType>();

    const [showModal, setShowModal] = useState(false);
    const [searchTxt, setSearchTxt] = useState('');
    const [editField, setEditField] = useState('');

    const [visiblePhoto, setVisiblePhoto] = useState(false);

    const [profileImage, setProfileImage] = useState<any>();

    const handleEdit = (field: string) => {
        setEditField(field);
        setShowModal(true);
    };

    const updateProfileField = () => {

        console.log(`Updating ${editField} with value: ${searchTxt}`);
        setShowModal(false);
    };

    return (
        <>
            <ScrollView>
                <Box
                    bg={COLORS.PRIMARY}
                    pb={50}
                    borderBottomLeftRadius={25}
                    borderBottomRightRadius={25}
                >
                    <HStack space={3} justifyContent={'flex-start'} alignItems={'center'} p={4}>
                        <Pressable onPress={() => goBack()}>
                            <AppIcon AntDesignName="arrowleft" size={24} color={'white'} />
                        </Pressable>
                        <Heading textAlign={'center'} size="md" color={'white'}>
                            Profile Details
                        </Heading>
                    </HStack>
                </Box>

                <VStack alignItems="center" space={4} mt={-50} >

                    <Pressable
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderWidth={'2'}
                        borderColor={COLORS.PRIMARY}
                        borderRadius={'full'}
                        onPress={() => setVisiblePhoto(true)}>
                        {profileImage ? (
                            <Avatar source={{ uri: profileImage?.path }} size="32" />
                        ) : (
                            <Avatar source={IMAGES.PROFILE} size="24" />

                        )}
                        <Box position={'absolute'} bottom={0} left={'14%'}>
                            <Box
                                bgColor={COLORS.PRIMARY}
                                borderRadius={'full'}
                                width={'10'}
                                height={'10'}
                                alignItems={'center'}
                                justifyContent={'center'}>
                                <AppIcon FeatherName='camera' size={20} color={'#ffff'} />
                            </Box>
                        </Box>
                    </Pressable>

                    <VStack space={4} mt={5} >

                        <HStack justifyContent={'space-between'} alignItems={'center'} p={2} borderBottomColor={'gray.300'} w={WIDTH}>
                            <Pressable onPress={() => handleEdit('Name')}>
                                <VStack space={2}>
                                    <HStack space={4} alignItems={'center'}>
                                        <AppIcon SimpleLineIconsName="user" size={30} color={COLORS.PRIMARY} />
                                        <VStack w={'70%'} space={2}>
                                            <Heading size={'sm'} color={'grey'}>
                                                Name
                                            </Heading>
                                            <Content fontSize={12} color={'black'} noOfLines={1}>
                                                Robert Dowery Jr.
                                            </Content>
                                        </VStack>
                                    </HStack>
                                    <Box w={'80%'}></Box>
                                </VStack>
                            </Pressable>
                            <Pressable onPress={() => handleEdit('Name')} opacity={0.8} bg={'gray.200'} p={2} borderRadius={5}>
                                {/* <AppIcon FontAwesomeName="edit" color={COLORS.PRIMARY} size={20} /> */}
                                <Heading size={'xs'} color={"black"} >Edit</Heading>
                            </Pressable>
                        </HStack>

                        <HStack justifyContent={'space-between'} alignItems={'center'} p={2} borderBottomColor={'gray.300'} w={WIDTH}>
                            <Pressable >
                                <VStack space={2}>
                                    <HStack space={4} alignItems={'center'}>
                                        <AppIcon FontistoName="email" size={30} color={COLORS.PRIMARY} />
                                        <VStack w={'70%'} space={2}>
                                            <Heading size={'sm'} color={'grey'}>
                                                Email
                                            </Heading>
                                            <Content fontSize={12} color={'grey'} noOfLines={1}>
                                                ecommerse@email.com
                                            </Content>
                                        </VStack>
                                    </HStack>
                                    <Box w={'80%'}></Box>
                                </VStack>
                            </Pressable>
                            {/* <HStack space={5}>
                                <Pressable onPress={() => handleEdit('Email')}>
                                    <AppIcon EntypoName="chevron-small-right" color={COLORS.PRIMARY} size={25} />
                                </Pressable>
                            </HStack> */}
                        </HStack>

                        <HStack justifyContent={'space-between'} alignItems={'center'} p={2} borderBottomColor={'gray.300'} w={WIDTH}>
                            <Pressable >
                                <VStack space={2}>
                                    <HStack space={4} alignItems={'center'}>
                                        <AppIcon EntypoName="mobile" size={30} color={COLORS.PRIMARY} />
                                        <VStack w={'70%'} space={2}>
                                            <Heading size={'sm'} color={'grey'}>
                                                Mobile
                                            </Heading>
                                            <Content fontSize={12} color={'grey'} >
                                                +12345678900
                                            </Content>
                                        </VStack>
                                    </HStack>
                                    <Box w={'80%'}></Box>
                                </VStack>
                            </Pressable>
                            {/* <HStack space={5}>
                                <Pressable onPress={() => handleEdit('Mobile')}>
                                    <AppIcon EntypoName="chevron-small-right" color={COLORS.PRIMARY} size={25} />
                                </Pressable>
                            </HStack> */}
                        </HStack>

                    </VStack>

                </VStack>

                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <VStack m={3} space={5}>
                            <VStack space={5}>
                                <HStack justifyContent={'space-between'} alignItems={'center'}>
                                    <Heading size={'sm'} color={'black'}>
                                        Edit {editField}
                                    </Heading>
                                    <Pressable onPress={() => setShowModal(false)}>
                                        <AppIcon EntypoName="circle-with-cross" size={20} color={'black'} />
                                    </Pressable>
                                </HStack>
                                <Input
                                    placeholder={`Enter your ${editField}`}
                                    width="100%"
                                    borderRadius="6"
                                    backgroundColor={'gray.200'}
                                    py="1"
                                    px="4"
                                    fontSize="13"
                                    value={searchTxt}
                                    onChangeText={setSearchTxt}
                                />
                            </VStack>
                            <HStack justifyContent={'space-between'} space={5} alignItems={'center'}>
                                <Pressable onPress={() => setShowModal(false)}>
                                    <Heading size={'sm'} color={'gray.500'}>Cancel</Heading>
                                </Pressable>
                                <Btn bg={COLORS.PRIMARY} onPress={updateProfileField}>
                                    <Heading size={'sm'} color={'white'}>
                                        Update
                                    </Heading>
                                </Btn>
                            </HStack>
                        </VStack>
                    </Modal.Content>
                </Modal>

                <PhotoPicker
                    visible={visiblePhoto}
                    onDismiss={() => setVisiblePhoto(false)}
                    setImageUrl={setProfileImage}
                    cropperCircleOverlay={true}
                    postImages={true}
                />
            </ScrollView>
            <Content mb={6} fontSize={12} color={'gray.500'} textAlign={'center'} mt={3}>App version 1.02.11</Content>
        </>
    );
};

export default ProfileDetails;
