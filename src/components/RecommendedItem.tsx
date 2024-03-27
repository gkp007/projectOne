import React from 'react';
import { Box, HStack, Image } from 'native-base';
import { Content } from '~/components/core';

type RecommendedItemProps = {
    imageUri: string;
    itemName: string;
};

export const RecommendedItem: React.FC<RecommendedItemProps> = ({ imageUri, itemName }) => {
    return (
        <HStack bg={'gray.200'} alignItems={'center'} justifyContent={'space-around'} p={2} space={2} w={'49%'} borderRadius={3}>
            <Image
                source={{ uri: imageUri }}
                alt={'no image'}
                h={8}
                w={12}
                resizeMode='contain'
            />
            <Content fontSize={12} noOfLines={1} w={'70%'}>
                {itemName}
            </Content>
        </HStack>
    );
};

export default RecommendedItem;
