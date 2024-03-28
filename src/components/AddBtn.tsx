import { Box, Image, Pressable } from 'native-base';
import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { AppIcon } from './core';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import { COLORS } from '~/styles';
import { IMAGES } from '~/assets';
export default function AddBtn({ open, toggleOpened }: any): JSX.Element {
  const animation = useRef(new Animated.Value(0)).current;
  const { navigate } = useNavigation<StackAndTabType>();
  useEffect(() => {
    Animated.timing(animation, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [open, animation]);

  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };
  return (
    <Box alignItems="center" flex={1} h={0}>
      <Box position={'relative'} h={60} w={60} mt={-30}>
        <Pressable
          onPress={() => {
            // navigate('Wallet'), toggleOpened();
          }}
        >
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -55],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -45],
                    }),
                  },
                ],
              },
            ]}>

            <AppIcon AntDesignName="wallet" size={22} color="white" />
          </Animated.View>
        </Pressable>
        <Pressable
          onPress={() => {
            // navigate('Address'), toggleOpened();
          }}>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -95],
                    }),
                  },
                ],
              },
            ]}>

            <AppIcon IoniconsName="location-outline" size={22} color="white" />
          </Animated.View>
        </Pressable>
        <Pressable
          onPress={() => {
            // navigate('AllOrders'), toggleOpened();
          }}
        >
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 55],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -45],
                    }),
                  },
                ],
              },
            ]}>

            <AppIcon OcticonsName="checklist" size={22} color="white" />
          </Animated.View>
        </Pressable>
        <Pressable shadow="4" onPress={toggleOpened}>
          <Animated.View
            style={[
              styles.addButtonInner,
              {
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}>

            <AppIcon AntDesignName='pluscircle' size={40} color={COLORS.PRIMARY} />
          </Animated.View>
        </Pressable>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  addButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 55,
    height: 55,
    borderRadius: 30,
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    padding: 2,
  },
  item: {
    position: 'absolute',
    top: 16,
    left: 4,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    width: 40,
    height: 40,
    borderRadius: 25,

  },
});
