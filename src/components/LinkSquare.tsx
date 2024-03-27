import React from 'react';
import { StyleSheet } from 'react-native';
import {
  VStack,
  Text,
  Image,
  useColorModeValue,
  HStack,
  Divider,
  Box,
  Pressable,
} from 'native-base';
import { AppIcon } from '~/components/core';
import {
  GestureHandlerRootView,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { WIDTH } from '~/styles';
export type props = {
  id: string;
  name: string;
  category?: string;
  itemSold: string;
  rating?: number;
  img: string;
  price: number;
  originalPrice: number;
  offer?: string;
  status?: string;
};

import AnimatedLottieView from 'lottie-react-native';
import { ANIMATIONS } from '~/assets';

export const item: props[] = [
  {
    id: '1',
    name: 'Digital BP Machine',
    category: 'Machine',
    itemSold: '8.2k',
    rating: 4.5,
    img: 'https://yard-ecommerce-web.vercel.app/product/bp_light.jpg',
    price: 205,
    originalPrice: 305,
    offer: '20% off',
    status: 'In Stock',
  },
  {
    id: '2',
    name: 'Lens',
    category: 'Machine',
    itemSold: '1k',
    rating: 4.5,
    img: 'https://yard-ecommerce-web.vercel.app/product/lens_light.jpg',
    price: 105,
    originalPrice: 170,
    offer: '30% off',
    status: 'Out Stock',
  },
  {
    id: '3',
    name: 'Stethoscope',
    category: 'Machine',
    itemSold: '826',
    rating: 4.5,
    img: 'https://yard-ecommerce-web.vercel.app/product/steth_light.jpg',
    price: 225,
    originalPrice: 305,
    offer: '20% off',
    status: 'In Stock',
  },
  {
    id: '4',
    name: 'Spirometer',
    category: 'Machine',
    itemSold: '226',
    rating: 4.5,
    img: 'https://yard-ecommerce-web.vercel.app/product/spiro_light.jpg',
    price: 120,
    originalPrice: 375,
    offer: '50% off',
    status: 'In Stock',
  },
  {
    id: '5',
    name: 'Compressor Nebulizer',
    category: 'Machine',
    itemSold: '82',
    rating: 4.5,
    img: 'https://yard-ecommerce-web.vercel.app/product/nebul_light.jpg',
    price: 305,
    originalPrice: 455,
    offer: '10% off',
    status: 'Out Stock',
  },
  {
    id: '6',
    name: 'Ophthalmoscope',
    category: 'Machine',
    itemSold: '2.6k',
    rating: 4.5,
    img: 'https://yard-ecommerce-web.vercel.app/product/op_scope_light.jpg',
    price: 105,
    originalPrice: 305,
    offer: '20% off',
    status: 'Limited Stock',
  },
  {
    id: '7',
    name: 'BP Machine',
    category: 'Machine',
    itemSold: '2k',
    rating: 4.5,
    img: '',
    price: 133,
    originalPrice: 355,
    offer: '20% off',
    status: 'In Stock',
  },
  {
    id: '8',
    name: 'Thermometer',
    category: 'Thermometer',
    itemSold: '1.6k',
    rating: 4.5,
    img: '',
    price: 105,
    originalPrice: 455,
    offer: '20% off',
    status: 'Out Stock',
  },


];

const DEFAULT_IMAGE = 'https://commercial.bunn.com/img/image-not-available.png';
export default function LinkSquare({
  item: Item,
  onTap,
}: {
  item: props;
  onTap?: () => void;
}): JSX.Element {
  const label = useColorModeValue('white', 'dark.300');
  const heart = useColorModeValue('#EC1E79', '#29ABE2');
  const [wishList, setWishList] = React.useState(false);
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const rippleOpacity = useSharedValue(1);

  // ripple effect
  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: tapEvent => {
        centerX.value = tapEvent.x;
        centerY.value = tapEvent.y;
        rippleOpacity.value = 1;
        scale.value = 0;
        scale.value = withTiming(1, { duration: 1000 });
      },
      onActive: () => {
        if (onTap) {
          runOnJS(onTap)();
        }
      },
      onFinish: () => {
        rippleOpacity.value = withTiming(0);
      },
    });
  const rStyle = useAnimatedStyle(() => {
    const width = WIDTH / 2.2;
    const height = WIDTH / 2.2;
    const circleRadius = Math.sqrt(width ** 2 + height ** 2);
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;
    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      backgroundColor: 'rgba(0,0,0,0.2)',
      opacity: rippleOpacity.value,
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [
        { translateX },
        { translateY },
        {
          scale: scale.value,
        },
      ],
    };
  }, []);
  return (
    <GestureHandlerRootView>
      <Box w={WIDTH / 2.2}>
        <VStack bg={'white'} shadow={1} borderRadius={5} pb={2} px={2}>
          <Box
            p={'auto'}
            position={'absolute'}
            zIndex={2}
            top={2}
            right={3}
            alignItems="center"
            ml={'auto'}
            justifyContent={'center'}>
            {wishList && (
              <Box h={24} w={24} position="absolute" >
                <AnimatedLottieView
                  source={ANIMATIONS.particles}
                  autoPlay
                  loop={false}
                />
              </Box>
            )}
            <Pressable onPress={() => setWishList(!wishList)} bg={wishList ? 'red.100' : 'gray.200'} rounded={'full'} p={1.5}>
              <AppIcon
                AntDesignName={wishList ? 'heart' : 'hearto'}
                size={13}
                color={wishList ? heart : 'black'}
              />
            </Pressable>
          </Box>
          <TapGestureHandler onGestureEvent={tapGestureEvent}>
            <Animated.View style={styles.animateSquare} >
              <Box
                w={'100%'}
                h={WIDTH / 2.2}
                bg={'white'}
                borderRadius={5}
                mb="2"
                alignItems="center"
                justifyContent="center">
                <HStack
                  px={1}
                  py={0.5}
                  bottom={2}
                  left={2}
                  borderRadius={10}
                  alignItems="center"
                  space={2}
                  bg={label}
                  shadow={1}
                  opacity={0.8}
                  position={'absolute'}
                  zIndex={1}>
                  <HStack space={1} alignItems={'center'}>
                    <AppIcon
                      FontAwesome5Name="star-half-alt"
                      size={10}
                    />
                    <Text fontSize={10}>
                      {Item.rating}
                    </Text>
                  </HStack>
                  <Divider orientation="vertical" h={3} />
                  <Text fontSize={10} py="1">
                    {Item.itemSold}
                  </Text>
                </HStack>

                <Image
                  zIndex={-1}
                  size={'68%'}
                  resizeMode="contain"
                  source={{ uri: Item.img || DEFAULT_IMAGE }}
                  alt="Product icon"
                />
              </Box>
              <Animated.View style={rStyle} />
            </Animated.View>
          </TapGestureHandler>
          <VStack px={1} space={1} flexWrap={'wrap'} >
            <HStack w={'100%'} justifyContent={'space-between'}>
              <Text
                fontSize={11}
                fontFamily={'Montserrat-Bold'}
                numberOfLines={1}
                ellipsizeMode="tail">
                {Item.name}
              </Text>

              <Text
                fontSize={10}
                color={'green.600'}
                fontFamily={'Montserrat-Medium'}>
                {Item.offer}
              </Text>
            </HStack>
            <HStack space={2} alignItems={'center'} justifyContent={'space-between'}>
              <HStack space={2} alignItems={'center'}>
                <Text
                  fontSize={10}
                  fontFamily={'Montserrat-Bold'}
                  color={'coolGray.600'}
                  textDecorationLine={'line-through'}>
                  ₹{Item.originalPrice}
                </Text>
                <Text
                  fontSize={13}
                  fontFamily={'Montserrat-Bold'}
                >
                  ₹{Item.price}
                </Text>
              </HStack>
              {/* <Text
                fontSize={9}
                bg={Item.status === 'Out Stock' ? 'red.400' : 'green.400'}
                borderRadius={5}
                fontFamily={'Montserrat-SemiBold'}
                color={'white'}
                p="1">
                {Item.status}
              </Text> */}
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  animateSquare: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
});
