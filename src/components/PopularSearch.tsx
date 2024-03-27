// PopularSearch.tsx
import React from 'react';
import { ScrollView, Box, Image, HStack, Pressable, VStack } from 'native-base';
import { WIDTH } from '~/styles';
import { Content } from './core';
import { StackAndTabType } from '~/routes/private/types';
import { useNavigation } from '@react-navigation/native';

type PopularSearchProps = {
    id: number;
    name: string;
    imageUrl: string;
    mrp: number;
    sellingPrice: number;
};



const PopularSearch: React.FC<PopularSearchProps> = ({ id, name, imageUrl, mrp, sellingPrice }) => {


    const { navigate, goBack } = useNavigation<StackAndTabType>();

    return (
        <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigate('ProductDetails')}>
            <Box
                key={id}
                m={1}
                borderRadius={6}
                bg={'white'}
                w={WIDTH / 4}
                shadow={2}
            >
                <Image
                    resizeMode='contain'
                    source={{ uri: imageUrl }}
                    alt={name}
                    h={WIDTH / 5}
                    w={WIDTH / 4}
                    alignSelf={'center'}
                    maxW={WIDTH / 5}
                />
                <VStack m={2} space={2}>
                    <Content fontSize="xs" weight='400'>
                        {name}
                    </Content>
                    <HStack space={2} alignItems={'center'} justifyContent={'space-between'}>
                        <HStack space={2} alignItems={'center'}>
                            <Content
                                fontSize={10}
                                color={'coolGray.600'}
                                textDecorationLine={'line-through'}>
                                ₹{mrp}
                            </Content>
                            <Content fontSize={13}>
                                ₹{sellingPrice}
                            </Content>
                        </HStack>
                    </HStack>
                </VStack>
            </Box>
        </Pressable>
    );
};

type PopularSearchesProps = {
    popularSearchesData: PopularSearchProps[];
};

const PopularSearches: React.FC<PopularSearchesProps> = ({ popularSearchesData }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack space={0}>
                {popularSearchesData.map((item) => (
                    <PopularSearch key={item.id} {...item} />
                ))}
            </HStack>
        </ScrollView>
    );
};

export default PopularSearches;
