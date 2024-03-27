import React, { useState } from 'react'
import { AlertDialog, Box, Center, Circle, Divider, HStack, Heading, IInputProps, Image, Pressable, Row, ScrollView, VStack } from 'native-base'
import { AppIcon, AppInput, Btn, Content, CountryPicker, PhotoPicker } from '~/components/core'
import { COLORS, HEIGHT, WIDTH } from '~/styles'
import { useNavigation } from '@react-navigation/native'
import { StackAndTabType } from '~/routes/private/types'
import { BrandsTable } from '~/components/Home'
import { IconProps } from '~/components/core/AppIcon'
import { useForm } from 'react-hook-form'
import AnimatedLottieView from 'lottie-react-native'
import { LOTTI } from '~/assets/animations'
import { ToastAndroid } from 'react-native'


const CircleLogo = [
    {
        image: 'https://cdn-icons-png.flaticon.com/512/4579/4579727.png',
        label: 'Grow World-wide'
    },
    {
        image:
            'https://cdn-icons-png.flaticon.com/512/8759/8759534.png',
        label: 'Product Promotions'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/512/4674/4674978.png',
        label: 'Transparency in Sales'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/512/2331/2331941.png',
        label: 'Instant Payments'
    },
];

type FormValues = {
    name: string;
    phone: string;
    store: string;
    desc: string;
    email: string;
    gst: string;
    image: string;
    signature: string;
};
type FormInput = {
    key: keyof FormValues;
    label: string;
    placeholder: string;
    icon: IconProps;
    rules: Object;
    inputProps?: IInputProps;
    onPress?: any;
};

const Seller = () => {

    const { navigate, goBack } = useNavigation<StackAndTabType>();

    const [visible, setVisible] = useState(false);
    const [visiblePhoto, setVisiblePhoto] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const formInputs: FormInput[] = [
        {
            key: 'name',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            icon: { IoniconsName: 'person' },
            rules: {
                required: 'Full name is required',
            },
            inputProps: { autoCapitalize: 'none', bg: 'white' },
        },

        {
            key: 'phone',
            label: 'Mobile number',
            placeholder: 'Enter your mobile number',
            icon: { IoniconsName: 'call', color: 'gray' },
            rules: {
                required: 'Mobile number is required',
                pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Invalid mobile number',
                },
            },
            inputProps: {
                keyboardType: 'numeric',
                autoCapitalize: 'none',
                variant: 'underlined',
                bg: 'white'
            },
        },
        {
            key: 'store',
            label: 'Store display name',
            placeholder: 'Enter Store display name',
            icon: { MaterialIconsName: 'location-city' },
            rules: {
                required: 'Store display name is required',
            },
            inputProps: { autoCapitalize: 'none', bg: 'white' },
        },
        {
            key: 'desc',
            label: 'Store description',
            placeholder: 'Enter Store display name',
            icon: { MaterialIconsName: 'location-city' },
            rules: {
                required: 'Store description is required',
            },
            inputProps: { autoCapitalize: 'none', bg: 'white' },
        },
        {
            key: 'email',
            label: 'Email',
            placeholder: 'Enter Email',
            icon: { EntypoName: 'mail' },
            rules: {
                required: 'Email is required',
                pattern: {
                    // Add a valid email pattern
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                    message: 'Invalid email address',
                },
            },
            inputProps: { autoCapitalize: 'none' },
        },
        {
            key: 'gst',
            label: 'GSTIN',
            placeholder: 'Enter GSTIN',
            icon: { MaterialCommunityIconsName: 'numeric' },
            rules: {
                required: 'GSTIN is required',
                pattern: {
                    value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{2}[0-9]{1}$/,
                    message: 'Invalid GST number',
                },
            },
            inputProps: { autoCapitalize: 'none' },
        },
        {
            key: 'signature',
            label: 'Signature',
            placeholder: '',
            icon: { FontAwesome5Name: 'signature' },
            rules: {
                required: 'Signature is required',
            },
            inputProps: { autoCapitalize: 'none', bg: 'white' },
            onPress: () => setVisiblePhoto(true),
        },


    ];


    const [profileImage, setProfileImage] = useState<any>();
    const [selectedCountry, setSelectedCountry] = useState({
        code: 'IN',
        name: 'India',
        phone: '91',
    });

    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    const showAlert = () => {
        setIsOpen(true);
        setTimeout(() => {
            onClose();
            // navigate('Home')
        }, 3000);
    };
    const handleAddAddress = async (data: FormValues) => {
        try {
            console.log('Button clicked', data);
            console.log('Form Data:', data.gst);

            const gstVerificationEndpoint = 'http://sheet.gstincheck.co.in/check/0a4536bc95d97b415983ddee16b37749/' + data.gst;
            const response = await fetch(gstVerificationEndpoint);

            if (response.ok) {
                const result = await response.json();
                if (result.flag) {
                    showAlert();

                } else {
                    ToastAndroid.show(result.message, ToastAndroid.LONG);
                }
            } else {
                console.error('Failed to fetch GST verification API:', response.status);
            }
        } catch (error) {
            console.error('Error during GST verification:', error);
        }
    };


    return (
        <>

            <Box bg={COLORS.PRIMARY}>
                <VStack>

                    <HStack space={3} justifyContent={'space-between'} alignItems={'center'} p={4}>
                        <HStack space={3} justifyContent={'flex-start'} alignItems={'center'}>
                            <Pressable onPress={() => goBack()}>
                                <AppIcon AntDesignName="arrowleft" size={24} color={'white'} />
                            </Pressable>
                            <Heading textAlign={'center'} size="md" color={'white'}>
                                Seller
                            </Heading>
                        </HStack>
                    </HStack>
                </VStack>
            </Box>

            <ScrollView showsVerticalScrollIndicator={false} >


                <Box mt={4} m={3}>
                    <HStack justifyContent={'space-between'} alignItems={'center'} mb={1} >
                        <Heading color={'gray.600'} size={'md'} >
                            Why Sell on YardHealth
                        </Heading>
                    </HStack>
                    <Box w={'100%'}>
                        <HStack justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
                            {CircleLogo.map((logo, index) => (
                                <VStack space={1} w={'20%'} key={index}>
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
                </Box>

                <Box >
                    <HStack m={3} justifyContent={'space-between'} alignItems={'center'} mb={1} >
                        <Heading color={'gray.600'} size={'md'} >
                            Our Partners
                        </Heading>
                    </HStack>
                    <BrandsTable />
                </Box>



                <Box>
                    <VStack space={5} m={3}>
                        <HStack alignItems={'center'} space={2} >
                            <Heading size={'md'} color={'gray.600'}>Process</Heading>
                        </HStack>
                        <Row justifyContent={'space-between'} w={'100%'}>
                            <HStack bg={'white'} w={'48%'} borderRadius={18} alignItems={'center'} space={2}>
                                <Box bg={'gray.200'} borderRadius={'full'} p={1} px={3}>
                                    <Heading fontSize={16} color={'black'}>1</Heading>
                                </Box>
                                <Heading fontSize={14} color={'black'}>Register Yourself</Heading>
                            </HStack>
                            <HStack bg={'white'} w={'48%'} borderRadius={18} alignItems={'center'} space={2}>
                                <Box bg={'gray.200'} borderRadius={'full'} p={1} px={3}>
                                    <Heading fontSize={16} color={'black'}>2</Heading>
                                </Box>
                                <Heading fontSize={14} color={'black'}>Submit Documents</Heading>
                            </HStack>
                        </Row>
                        <Row justifyContent={'space-between'} w={'100%'}>
                            <HStack bg={'white'} w={'48%'} borderRadius={18} alignItems={'center'} space={2}>
                                <Box bg={'gray.200'} borderRadius={'full'} p={1} px={3}>
                                    <Heading fontSize={16} color={'black'}>3</Heading>
                                </Box>
                                <Heading fontSize={14} color={'black'}>Upload Products</Heading>
                            </HStack>
                            <HStack bg={'white'} w={'48%'} borderRadius={18} alignItems={'center'} space={2}>
                                <Box bg={'gray.200'} borderRadius={'full'} p={1} px={3}>
                                    <Heading fontSize={16} color={'black'}>4</Heading>
                                </Box>
                                <Heading fontSize={14} color={'black'}>Start Selling</Heading>
                            </HStack>
                        </Row>
                    </VStack>
                </Box>

                <Divider my={2} />

                <Box mt={3}>
                    <Heading mx={3} color={'gray.600'} size={'md'}  >
                        Start Registration
                    </Heading>

                    <ScrollView>
                        <Center w="full" px={WIDTH * 0.03} mb={3} mt={2}>
                            <Box bg={'white'} p={2} borderRadius={5} shadow={1}>
                                {formInputs.map(input => (
                                    <AppInput
                                        key={input.key}
                                        input={input}
                                        control={control}
                                        errorMessage={errors[input.key]?.message}
                                        leftElement={
                                            input.key === 'phone' ? (
                                                <Pressable onPress={() => setVisible(true)}>
                                                    <HStack alignItems="center" space={2}>
                                                        <Image
                                                            source={{
                                                                uri: `https://flagcdn.com/w160/${selectedCountry.code.toLocaleLowerCase()}.webp`,
                                                            }}
                                                            alt="IN"
                                                            h={5}
                                                            w={8}
                                                            key="1"
                                                            alignSelf="center"
                                                            resizeMode="contain"
                                                            borderRadius={2}
                                                        />
                                                        <AppIcon
                                                            AntDesignName="caretdown"
                                                            color={'#000'}
                                                            size={10}
                                                        />
                                                    </HStack>
                                                </Pressable>
                                            ) : input.key === 'signature' ? (
                                                <Pressable onPress={input.onPress} w={WIDTH * 0.8}>
                                                    <HStack space={3} alignItems={'center'}>
                                                        <AppIcon FontAwesome5Name='signature' size={15} color={'gray'} />
                                                        <Content color={'gray.400'} fontSize={14} >
                                                            Click here to upload
                                                        </Content>
                                                    </HStack>
                                                </Pressable>
                                            ) : undefined
                                        }
                                    />
                                ))}

                            </Box>
                        </Center>
                    </ScrollView>
                </Box>
            </ScrollView>

            <Btn mx={2} bg={COLORS.ORANGE} borderRadius={5} onPress={handleSubmit(handleAddAddress)} mb={2}>
                <HStack justifyContent={'space-between'} >
                    <Heading size={'md'} color={'white'}>Save</Heading>
                    {/* <AppIcon FeatherName='chevron-right' size={20} color={'white'} /> */}
                </HStack>
            </Btn>

            <CountryPicker
                visible={visible}
                onClose={() => {
                    setVisible(false);
                }}
                onSelect={(country: any) => {
                    setSelectedCountry(country);
                    setVisible(false);
                }}
            />

            <PhotoPicker
                visible={visiblePhoto}
                onDismiss={() => setVisiblePhoto(false)}
                setImageUrl={setProfileImage}
                cropperCircleOverlay={true}
                postImages={true}
            />

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>


                    <Box bg={'white'} h={HEIGHT / 3} alignItems={'center'} justifyContent={'center'}>
                        <AnimatedLottieView
                            source={LOTTI.SUCCESS}
                            autoPlay
                            loop={true}
                        />
                    </Box>
                    <Heading mb={8} textAlign={'center'} color={'success.700'}>Registration Complete </Heading>

                </AlertDialog.Content>
            </AlertDialog >

        </>
    )
}

export default Seller