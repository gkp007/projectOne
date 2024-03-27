import {
    FlatList,
    useColorModeValue,
    Text,
    Pressable,
    Image,
    Box,
    ScrollView,
} from 'native-base';
import React, { useCallback } from 'react';
import { ANIMATIONS } from '~/assets';
import { PrivateContainer } from '~/components/containers';
// import { Empty } from '~/components/shared';
// import { StackAndTabType } from '~/routes';
import { useNavigation } from '@react-navigation/native';
import { WIDTH } from '~/styles';
import { StackAndTabType } from '~/routes/private/types';
import { category as CategoryData, categoryProps } from '~/constant/Constant';
// import { screenWidth } from '~/styles';

export default function Categories(): JSX.Element {
    const { navigate } = useNavigation<StackAndTabType>();
    const bg = useColorModeValue('white', 'dark.50');
    const box = useColorModeValue('white', 'dark.100');
    const data = CategoryData.filter(item => typeof item.img === 'string');
    const slicedData = React.useMemo(() => data.slice(0, -1), [data]);
    const renderItem = useCallback(
        ({ item }: { item: categoryProps }) => (
            <Pressable
                mt={4}
                mx={WIDTH * 0.022}
                onPress={() => navigate('AllCategories', { title: item.name })}>
                <Box
                    w={WIDTH / 2.2}
                    h={WIDTH / 2.2}
                    bg={box}
                    shadow={7}
                    overflow="hidden"
                    borderRadius="10"
                    alignItems="center"
                    p={2}>
                    <Text fontSize={'15'} fontFamily={'Montserrat-SemiBold'}>
                        {item.name}
                    </Text>
                    <Image
                        zIndex={'2'}
                        source={{ uri: item.img }}
                        size={'85%'}
                        alt="Image not found"
                    />
                    <Box
                        zIndex={'1'}
                        position="absolute"
                        h={'200'}
                        w={'200'}
                        bg={'lightBlue.100'}
                        borderRadius="full"
                        top={24}
                    />
                </Box>
            </Pressable>
        ),
        [navigate, box],
    );

    return (

        <>
            <Box
                h={'100%'}
                w={WIDTH}
                flexDirection="row"
                flexWrap="wrap"
                flex={1}
                alignItems={'center'}>
                <FlatList
                    key={'#'}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 5 }}
                    columnWrapperStyle={{
                        justifyContent: 'flex-start',
                    }}
                    keyExtractor={item => item.id.toString()}
                    data={slicedData}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    renderItem={renderItem}
                // ListEmptyComponent={
                //     <Empty
                //         title="No Categories Found"
                //         subtitle="There are no categories available!"
                //         animation={ANIMATIONS.search}
                //         action={{ label: 'Go Back' }}
                //     />
                // }
                />
            </Box>
            <Box
                bg={bg}
                justifyContent={'center'}
                alignItems={'center'}
                shadow="9"
                borderTopRightRadius={12}
                borderTopLeftRadius={12}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {CategoryData.map(item => {
                        return (
                            <Box px={1} my={6} key={item.id}>
                                <Pressable
                                    borderWidth={1}
                                    borderRadius={8}
                                    borderColor={'muted.400'}
                                    _pressed={{ bg: 'lightBlue.200' }}>
                                    <Text
                                        fontSize={15}
                                        color={'muted.600'}
                                        fontFamily={'Montserrat-Semibold'}
                                        py={1}
                                        px={2}>
                                        {item.name}
                                    </Text>
                                </Pressable>
                            </Box>
                        );
                    })}
                </ScrollView>
            </Box>
        </>
    );
}
