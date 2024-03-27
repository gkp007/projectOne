import React from 'react';
import { Pressable, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import { COLORS } from '~/styles';

interface CustomButtonProps {
    onPress: () => void;
    label: string;
    shadow?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, label, shadow }) => {
    const { navigate } = useNavigation<StackAndTabType>();

    return (
        <Pressable _pressed={{ opacity: 0.6 }} shadow={shadow} borderRadius={4} m={4} p={2} bg={COLORS.PRIMARY} onPress={() => onPress()}>
            <Heading textAlign={'center'} size={'sm'} color={'white'}>
                {label}
            </Heading>
        </Pressable>
    );
};

export default CustomButton;
