import React, { useState } from 'react';
import { Box, Heading, Image, Pressable, ScrollView, VStack } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '~/styles';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';

const Boxes = () => {
    const [pressedBox, setPressedBox] = useState<number | null>(null);

    const { navigate, goBack } = useNavigation<StackAndTabType>();

    const iconData = [
        {
            id: 1,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/6054/6054843.png',
            label: 'Imaging',
        },
        {
            id: 2,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Laboratory_icon.png',
            label: 'Laboratory',
        },
        {
            id: 3,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Laboratory_icon.png',
            label: 'Surgery',
        },
        {
            id: 4,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Monitoring_icon.png',
            label: 'Respiratory',
        },
        {
            id: 5,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/5996/5996405.png',
            label: 'Others',
        },
    ];



    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} maxHeight={'24'} top={-25}>
            <Box flexDirection={'row'} w={'full'} top={3}>
                {iconData.map((item) => (
                    <Box key={item?.id} mx={2} zIndex={1} m={2} mb={6}>
                        <Pressable
                            w={24}
                            h={16}
                            borderRadius={10}
                            onPressIn={() => setPressedBox(item.id)}
                            onPressOut={() => setPressedBox(null)}
                            justifyContent={'center'}
                            alignItems={'center'}
                            onPress={() => {

                                if (item.label === 'Others') {
                                    navigate('AllCategories');
                                }
                                else {
                                    navigate('AllProducts');
                                }

                            }}
                        >
                            <LinearGradient
                                colors={pressedBox === item.id ? ['teal', 'mediumseagreen'] : ['white', 'white']}
                                start={{ x: 1.5, y: 1.1 }}
                                end={{ x: 0.4, y: 0.5 }}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: 10,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 3,
                                }}
                            >
                                <VStack
                                    space={2}
                                    alignItems="center"
                                    justifyContent={'center'}
                                >
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        alt={item.label}
                                        h={12}
                                        w={12}
                                        mt={2}
                                    />
                                </VStack>
                            </LinearGradient>
                            <Heading size={'xs'} alignSelf={'center'} mt={2} color={pressedBox === item.id ? COLORS.PRIMARY : 'grey'}>{item.label}</Heading>
                        </Pressable>
                    </Box>
                ))}
            </Box>
        </ScrollView>
    );
};

export default Boxes;
