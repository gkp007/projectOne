import React from 'react'
import { Box, HStack, Heading, ScrollView } from 'native-base'
import { WIDTH } from '~/styles'
import { Content } from '~/components/core'
import { useNavigation } from '@react-navigation/native'
import { StackAndTabType } from '~/routes/private/types'
import ProductScreen from '~/components/ProductScreen'
import LinkSquare, { item as ProductData } from '~/components/LinkSquare';

const PopularSearches = () => {

    const { navigate } = useNavigation<StackAndTabType>();

    return (
        <>
            <ProductScreen
                title="Popular Searches"
                data={ProductData}
            >
                <HStack mb={3} justifyContent={'space-between'} mx={4} mt={3} alignItems={'center'}>
                    <Content fontSize={15} noOfLines={1} w={'70%'} >Results for 'Result'</Content>
                    <Heading size={'xs'}>3462 founds</Heading>
                </HStack>

                <ScrollView showsVerticalScrollIndicator={false} bg={'white'}>
                    <Box
                        mt={4}
                        flexDir="row"
                        w={WIDTH}
                        flexWrap="wrap"
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        {ProductData.map(item => (
                            <Box mb={3} key={item.id}>
                                <LinkSquare
                                    item={item}
                                    onTap={() => navigate('ProductDetails')}
                                />
                            </Box>
                        ))}
                    </Box>
                </ScrollView>
            </ProductScreen>
        </>
    )
}

export default PopularSearches