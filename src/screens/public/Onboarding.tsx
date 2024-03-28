import { Box, Center, HStack, Heading, Image, Pressable } from 'native-base';
import React, { useRef, useState } from 'react';
import { FlatList, ViewToken, useWindowDimensions } from 'react-native';
import { ANIMATIONS, IMAGES } from '~/assets';
import { OnboardingSlide } from '~/components';
import { Btn } from '~/components/core';
import { COLORS, WIDTH } from '~/styles';
import localStorage from '@react-native-async-storage/async-storage';

const OnboardingScreens = [
  {
    id: 1,
    animation: ANIMATIONS.onboarding1,
    title: 'Easy To connect.',
    subtitle:
      'Choose your product - DoorStep Delivery - Get discounts on bulk order. Month end sales offers. ',
  },
  {
    id: 2,
    animation: ANIMATIONS.onboarding2,
    title: 'Bigger & Bigger then Ever.',
    subtitle:
      'Heavy discounts. Zero shipping charges on first order. Easy return. 100% customer satisfaction.',
  },
  {
    id: 3,
    animation: ANIMATIONS.onboarding3,
    title: 'ZERO shipping charges',
    subtitle:
      '15% of on all medicine. 24 * 7 customer support. Easy payment methods. Fully trusted app in India.',
  },
];

export default function Onboarding({ navigation }: any): JSX.Element {
  const flatListRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const windowDimensions = useWindowDimensions();

  const onViewableItemsChanged = useRef<
    (info: { viewableItems: Array<ViewToken> }) => void
  >(({ viewableItems }) => {
    if (typeof viewableItems?.[0]?.index !== 'number') return;
    setCurrentPage(viewableItems?.[0]?.index);
  });

  const viewOnboarding = async () => {
    try {
      await localStorage.setItem('viewedOnboarding', 'true');
      console.log('view onboarding screen');
    } catch (err) {
      console.log(err);
    }
  };
  viewOnboarding();

  return (
    <Box safeAreaTop h="full">
      <HStack alignItems={'center'} justifyContent={'flex-end'} m={3} mt={5}>
        <Image
          source={IMAGES.LOGO}
          resizeMode={'contain'}
          alt="Logo"
          h={30}
          w={'full'}
        />

        {/* <Pressable
          position={'absolute'}
          borderRadius={5}
          px={1}
          bg={'gray.200'}

          _pressed={{ opacity: 0.5 }}
          onPress={() =>
            currentPage === OnboardingScreens.length - 1
              ? navigation.replace('Login')
              : flatListRef.current?.scrollToIndex({
                animated: true,
                index: OnboardingScreens.length - 1,
              })
          }>
          <Heading size="xs" color={'gray.600'} p={1} >
            {currentPage == OnboardingScreens.length - 1 ? 'Done' : 'Skip'}
          </Heading>
        </Pressable> */}
      </HStack>

      <FlatList
        data={OnboardingScreens}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        initialNumToRender={1}
        extraData={windowDimensions}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        renderItem={({ item }) => (
          <>
            <OnboardingSlide mt="16" px="4" w={WIDTH} item={item} />
          </>
        )}
      />
      {/* The Dots */}
      <Center mb={5}>
        <HStack space="2">
          {[...Array(OnboardingScreens.length)].map((_, index) => (
            <Pressable
              onPress={() =>
                flatListRef.current?.scrollToIndex({ animated: true, index })
              }
              _pressed={{ bg: 'primary.600' }}
              key={index}
              rounded="sm"
              h="2"
              w={index == currentPage ? '6' : '2'}
              bg={index == currentPage ? COLORS.PRIMARY : COLORS.PRIMARY}
            />
          ))}
        </HStack>
      </Center>

      <Box m={4}>
        <Btn
          bg={COLORS.PRIMARY}
          shadow={1}
          onPress={() =>
            currentPage === OnboardingScreens.length - 1
              ? navigation.replace('Login')
              : flatListRef.current?.scrollToIndex({
                animated: true,
                index: OnboardingScreens.length - 1,
              })
          }>
          <Heading size={'md'} fontSize={18} color={'white'}>
            Get Started
          </Heading>
        </Btn>
      </Box>
    </Box>
  );
}
