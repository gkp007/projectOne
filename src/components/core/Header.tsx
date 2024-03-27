import React from 'react';
import { Box, HStack, Heading, Pressable } from 'native-base';
import { AppIcon } from '~/components/core';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import { COLORS } from '~/styles';

interface HeaderProps {
    title: string;
    showCartIcon?: boolean;
    showBellicon?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showCartIcon = false, showBellicon = false, }) => {

    const { navigate, goBack } = useNavigation<StackAndTabType>();

    return (
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

                {showCartIcon && (
                    <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigate('Cart')}>
                        <Box bg={'#419197'} p={2} borderRadius={6} >
                            <AppIcon AntDesignName="shoppingcart" color={'white'} size={20} />
                        </Box>
                    </Pressable>
                )}
                {showBellicon && (
                    <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigate('Notifications')}>
                        <Box bg={'#419197'} p={2} borderRadius={6}>
                            <AppIcon FeatherName='bell' color={'white'} size={20} />
                        </Box>
                    </Pressable>
                )}

            </HStack>
        </Box>
    );
};

export default Header;
