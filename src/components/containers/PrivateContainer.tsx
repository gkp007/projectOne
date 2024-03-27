import React, { useState } from 'react';
import {
  Box,
  HStack,
  Heading,
  Pressable,
  VStack,
} from 'native-base';
import { AppIcon, Content } from '../core';
import { COLORS, WIDTH } from '~/styles';
import { Search } from '~/screens/private';
import { StackAndTabType } from '~/routes/private/types';
import { useNavigation } from '@react-navigation/native';

type Props = {
  title?: React.ReactNode;
  showSearch?: boolean;

} & React.ComponentProps<typeof Box>;

export default function PrivateContainer({
  children
}: Props) {
  const [visible, setVisible] = useState(false);

  const [searchTxt, setSearchTxt] = useState('');

  const { navigate, goBack } = useNavigation<StackAndTabType>();

  return (
    <>
      <Box safeAreaTop flex={1} bg={'white'}>
        <Box
          bg={COLORS.PRIMARY}
        >
          <VStack>
            <HStack justifyContent={'space-between'} alignItems={'center'} p={2} borderBottomColor={'gray.300'} w={WIDTH}>
              <Pressable _pressed={{ opacity: 0.5 }} onPress={() => setVisible(true)}>
                <VStack space={2}>
                  <HStack space={1} alignItems={'center'} >
                    <AppIcon MaterialCommunityIconsName='navigation-variant' size={25} color={COLORS.SECONDARY} />
                    <Heading size={'md'} color={'white'}> Home </Heading>
                    <AppIcon EntypoName='chevron-small-down' size={20} color={'white'} />
                  </HStack>
                  <Box w={'80%'}>
                    <Content fontSize={12} color={'white'} noOfLines={1}  >Plot 160 Hakim Manzil, phase 3 Dumduma hdhdd dhbdhd hhdh </Content>
                  </Box>
                </VStack>
              </Pressable>

              <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigate('Notifications')}>
                <Box bg={'#419197'} p={2} borderRadius={6}>
                  <AppIcon FeatherName='bell' color={'white'} size={20} />
                </Box>
              </Pressable>

            </HStack>
          </VStack>
        </Box>
        {children}
      </Box >

      <Search
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onSelect={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
