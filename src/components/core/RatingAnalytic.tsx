import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Heading,
  Pressable,
  Box,
  Slider,
} from 'native-base';
import AppIcon from './AppIcon';
import { useNavigation } from '@react-navigation/native';

type Status = {
  id: number;
  rate: string;
  colorScheme: string;
};

export default function RatingAnalytic() {
  const { navigate } = useNavigation<StackAndTabType>();
  // const [onChangeValue, setOnChangeValue] = useState(70);
  const status: Status[] = [
    {
      id: 1,
      rate: 'Excellent',
      colorScheme: 'tertiary.900',
    },
    {
      id: 2,
      rate: 'Very Good',
      colorScheme: 'tertiary.800',
    },
    {
      id: 3,
      rate: 'Good',
      colorScheme: 'tertiary.700',
    },
    {
      id: 4,
      rate: 'Average',
      colorScheme: 'amber.600',
    },
    {
      id: 5,
      rate: 'Poor',
      colorScheme: 'amber.400',
    },
  ];
  return (
    <>
      <Heading fontSize={15} bold>
        Product Rating & Reviews
      </Heading>
      <Box w={'full'}>
        <HStack alignItems={'center'} mt={4} space={3}>
          <VStack alignItems={'center'}>
            <HStack mb={1}>
              <Heading color="success.700" bold>
                4.0
              </Heading>
              <AppIcon AntDesignName="star" color="#15803d" />
            </HStack>
            <Text fontSize={10} fontWeight={500} fontStyle={'normal'}>
              96 ratings
            </Text>
            <Pressable onPress={() => navigate('ProductReviews')}>
              <Text fontSize={10} bold>
                17 Reviews
              </Text>
            </Pressable>
          </VStack>
          <HStack
            space={3}
            px={5}
            alignItems={'center'}
            justifyContent={'center'}>
            <Box p={2}>
              <VStack space={2}>
                {status.map(item => (
                  <Text fontSize={11} fontWeight={500} key={item.id}>
                    {item.rate}
                  </Text>
                ))}
              </VStack>
            </Box>
            <Box w={'32'}>
              <VStack>
                {status.map(item => (
                  <Slider
                    key={item.id}
                    defaultValue={70}
                    colorScheme={'green'}
                    isReadOnly={true}>
                    <Slider.Track bg="green.100">
                      <Slider.FilledTrack bg={item.colorScheme} />
                    </Slider.Track>
                  </Slider>
                ))}
              </VStack>
            </Box>
            {/* <Box p={2} w={'1/3'}>
              <VStack space={2}>
                {status.map(item => (
                  <Text fontSize={11} fontWeight={500} key={item.id}>
                    {onChangeValue}
                  </Text>
                ))}
              </VStack>
            </Box> */}
          </HStack>
        </HStack>
      </Box>
    </>
  );
}
