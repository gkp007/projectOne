// ProductScreen.tsx
import React, { useState } from 'react';
import {
    Box,
    HStack,
    Heading,
    Pressable,
} from 'native-base';
import { COLORS } from '~/styles';
import { AppIcon, FilterSearch } from '~/components/core';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import { GlobalSearch } from '~/screens/private';
interface ProductScreenProps {
    title: string;
    data: any;
    onSearchPress?: () => void;
    children: any;
}

const ProductScreen: React.FC<ProductScreenProps> = ({ title, data, onSearchPress, children }) => {

    const { navigate, goBack } = useNavigation<StackAndTabType>();

    const [visible, setVisible] = useState(false);
    const [visibleFilter, setVisibleFilter] = useState(false);

    return (
        <>
            <Box bg={COLORS.PRIMARY}>
                <HStack space={3} justifyContent={'space-between'} alignItems={'center'} p={4}>
                    <HStack space={3} justifyContent={'flex-start'} alignItems={'center'}>
                        <Pressable onPress={() => goBack()}>
                            <AppIcon AntDesignName="arrowleft" size={24} color={'white'} />
                        </Pressable>
                        <Heading textAlign={'center'} size="md" color={'white'}>
                            {title}
                        </Heading>
                    </HStack>
                    <HStack space={4}>
                        <Pressable _pressed={{ opacity: 0.5 }} onPress={() => setVisible(true)}>
                            <Box bg={'#419197'} p={2} borderRadius={6} >
                                <AppIcon FeatherName='search' color={'white'} size={20} />
                            </Box>
                        </Pressable>
                        <Pressable _pressed={{ opacity: 0.5 }} onPress={() => setVisibleFilter(true)}>
                            <Box bg={'#419197'} p={2} borderRadius={6}>
                                <AppIcon FeatherName='filter' color={'white'} size={20} />
                            </Box>
                        </Pressable>
                    </HStack>
                </HStack>
            </Box>

            {children}

            <GlobalSearch
                visible={visible}
                onClose={() => {
                    setVisible(false);
                }}
                onSelect={() => {
                    setVisible(false);
                }}
            />
            <FilterSearch
                visibleFilter={visibleFilter}
                onClose={() => {
                    setVisibleFilter(false);
                }}
                onSelect={() => {
                    setVisibleFilter(false);
                }}
            />
        </>
    );
};

export default ProductScreen;
