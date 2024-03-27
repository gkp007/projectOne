import React, { useState } from 'react';
import {
    Box,
    Text,
    Pressable,
    Center,
    Checkbox,
    IInputProps,
    ScrollView,
    useColorMode,
    Input,
    Radio,
    HStack,
    useToast,
    Heading,
    Image,
} from 'native-base';
import { AppInput, AppIcon, CountryPicker, CustomButton } from '~/components/core';
import { IconProps } from '~/components/core/AppIcon';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { WIDTH } from '~/styles';
import { StackAndTabType } from '~/routes/private/types';

type FormValues = {
    name: string;
    phone: string;
    city: string;
    state: string;
    landmark: string;
    pincode: string;
    addressLineOne: string;
};
type FormInput = {
    key: keyof FormValues;
    label: string;
    placeholder: string;
    icon: IconProps;
    rules: Object;
    inputProps?: IInputProps;
};
type FormData = {
    [key: string]: string;
};

export default function EditAddress(): JSX.Element {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const handleEditAddress = (data: FormValues) => {

        console.log('Button clicked');
        console.log(data);
    };

    const toast = useToast();

    const { navigate, goBack } = useNavigation<StackAndTabType>();
    const { colorMode } = useColorMode();
    const [country, setCountry] = useState('India');
    const [visible, setVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [addressType, setAddressType] = useState<string>('home');
    const [addressLineTwo, setAddressLineTwo] = useState('');
    const handleAddressType = React.useCallback((value: string) => {
        setAddressType(value);
    }, []);

    const formInputs: FormInput[] = [
        {
            key: 'name',
            label: 'Name',
            placeholder: 'Enter your full name',
            icon: { IoniconsName: 'person' },
            rules: {
                required: 'Fullname is required',
            },
            inputProps: { autoCapitalize: 'none' },
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
            },
        },
        {
            key: 'city',
            label: 'City',
            placeholder: 'Enter City Name',
            icon: { MaterialIconsName: 'location-city' },
            rules: {
                required: 'City name is required',
            },
            inputProps: { autoCapitalize: 'none' },
        },
        {
            key: 'state',
            label: 'State',
            placeholder: 'Enter state name',
            icon: { FontAwesome5Name: 'map-marked-alt' },
            rules: {
                required: 'State name is required',
            },
            inputProps: { autoCapitalize: 'none' },
        },

        {
            key: 'landmark',
            label: 'Landmark',
            placeholder: 'Enter Your landmark',
            icon: { MaterialCommunityIconsName: 'home-city' },
            rules: {
                required: 'landmark required',
            },
            inputProps: { autoCapitalize: 'none' },
        },
        {
            key: 'pincode',
            label: 'Pincode',
            placeholder: 'Enter Pincode',
            icon: { MaterialIconsName: 'fiber-pin' },
            rules: {
                required: 'Pincode is required',
            },
            inputProps: { keyboardType: 'phone-pad' },
        },
        {
            key: 'addressLineOne',
            label: 'Address Line 1',
            placeholder: 'Enter Road Name, Area, Colony',
            icon: { EntypoName: 'location-pin' },
            rules: {
                required: 'Address Details is required',
            },
            inputProps: { autoCapitalize: 'none' },
        },
    ];

    const [selectedCountry, setSelectedCountry] = useState({
        code: 'IN',
        name: 'India',
        phone: '91',
    });

    return (
        <>
            <HStack space={3} justifyContent={'space-between'} alignItems={'center'} p={4}>
                <Pressable onPress={() => goBack()}>
                    <AppIcon AntDesignName="arrowleft" size={22} color={'black'} />
                </Pressable>
                <Heading size="md" flex={1} fontWeight={'900'}>
                    Edit Address
                </Heading>
            </HStack>

            <ScrollView>
                <Center w="full" px={WIDTH * 0.04}>
                    <Box>
                        {formInputs.map(input => (
                            <AppInput
                                key={input.key}
                                input={input}
                                control={control}
                                errorMessage={errors[input.key]?.message}
                                leftElement={
                                    input.key === 'phone' ? (
                                        <Pressable onPress={() => setVisible(true)}>
                                            <HStack alignItems="center" space={1}>
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
                                    ) : undefined
                                }
                            />
                        ))}

                        <Text mt="2" mb={1}>
                            Address Line 2 (Optional)
                        </Text>
                        <Input
                            placeholder="Enter Road Name,Area,Colony"
                            w="full"
                            InputLeftElement={
                                <Box pl="2">
                                    {
                                        <AppIcon
                                            EntypoName="location-pin"
                                            color={colorMode === 'dark' ? 'white' : 'gray'}
                                            size={20}
                                        />
                                    }
                                </Box>
                            }
                            value={addressLineTwo}
                            onChangeText={text => setAddressLineTwo(text)}
                        />

                        <Text mt="2">Address Type </Text>
                        <Radio.Group
                            defaultValue="home"
                            name="addressType"
                            accessibilityLabel="select address type"
                            value={addressType}
                            onChange={handleAddressType}>
                            <HStack alignItems={'center'} space={3} py={1}>
                                <Radio value="home" my={1} size={'sm'}>
                                    Home
                                </Radio>
                                <Radio value="office" my={1} size={'sm'}>
                                    Office
                                </Radio>
                                <Radio value="others" my={1} size={'sm'}>
                                    Others
                                </Radio>
                            </HStack>
                        </Radio.Group>

                        <Checkbox
                            fontSize="10"
                            value="true"
                            mt="2"
                            mb="5"
                            _light={{ borderColor: 'dark.200' }}
                            _dark={{ borderColor: 'dark.600' }}
                            borderRadius="6"
                            isChecked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}>
                            Make this as the default address
                        </Checkbox>
                    </Box>
                </Center>
            </ScrollView>

            <CustomButton onPress={handleSubmit(handleEditAddress)} label="SAVE" shadow={2} />


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

        </>
    );
}
