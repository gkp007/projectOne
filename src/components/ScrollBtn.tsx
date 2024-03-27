import { FlatList, Box } from 'native-base';
import React, { useState } from 'react';
import { Btn, Content } from '~/components/core';

import { ListRenderItemInfo } from 'react-native';
import { COLORS } from '~/styles';
type Props = {
    data: any[];
};
const ScrollBtn = ({ data }: Props) => {

    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const handlePressItems = (index: number) => {
        setSelectedItem(prevIndex => (prevIndex === index ? null : index));
    };

    const renderItem = ({ item, index }: ListRenderItemInfo<any>) => (
        <Btn
            onPress={() => handlePressItems(index)}
            bg={selectedItem === index ? COLORS.SECONDARY : 'transparent'}
            px={'2'}
            mx={'1'}
            py="1"
            justifyContent="center"
            borderWidth={selectedItem === index ? '0' : '1'}
            borderRadius="14"
            borderColor={'black'}>
            <Content fontSize={'12'} color={selectedItem === index ? 'white' : 'black'}>
                {item.name}
            </Content>

        </Btn>
    );

    return (
        <Box>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </Box>
    );
};

export default ScrollBtn;
