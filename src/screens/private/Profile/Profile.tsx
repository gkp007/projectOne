import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, HStack, Heading, Image, Pressable, Row, ScrollView, StatusBar, Text, VStack } from 'native-base';
import React from 'react';
import { Linking } from 'react-native';
import { IMAGES } from '~/assets';
import { Btn, Content, List } from '~/components/core';
import AppIcon, { IconProps } from '~/components/core/AppIcon';
import { StackAndTabType } from '~/routes/private/types';
import { COLORS, WIDTH } from '~/styles';
import { useAuth } from '~/hooks';

export default function Profile() {

  const { navigate, goBack } = useNavigation<StackAndTabType>();

  const { logout } = useAuth();

  // const handleLogout = () => {
  //   logout();
  //   navigate('Login');
  // };

  const listData: {
    title: string;
    subtitle?: string;
    avatar?: string;
    leftIcon?: IconProps;
    isHeading?: boolean;
    onPress?: () => void;
  }[] = [
      {
        title: 'Profile',
        leftIcon: { FeatherName: 'user', color: COLORS.PRIMARY, size: 18 },
        subtitle: 'Manage Profile',
        onPress: () => navigate('AllOrders')

      },
      {
        title: 'Notification',
        leftIcon: { FeatherName: 'bell', color: COLORS.PRIMARY, size: 18 },
        subtitle: 'Manage Notification',
        onPress: () => navigate('WishList')
      },
      {
        title: 'Messages',
        leftIcon: { FeatherName: 'message-square', color: COLORS.PRIMARY, size: 18 },

        subtitle: 'Manage Chats',
        onPress: () => navigate('MyCoupons')
      },
      {
        title: 'Help & FAQ',
        leftIcon: { EntypoName: 'help', color: COLORS.PRIMARY, size: 18 },
        subtitle: 'Get help',
        onPress: () => navigate('Address')
      },
      {
        title: 'Languages',
        leftIcon: { FontAwesomeName: 'language', color: COLORS.PRIMARY, size: 18 },
        subtitle: 'Manage Language',
        onPress: () => navigate('Wallet')
      },
      {
        title: 'Settings',
        leftIcon: { IoniconsName: 'settings-outline', color: COLORS.PRIMARY, size: 18 },

        subtitle: 'See all settings',
        onPress: () => {
          logout();
          navigate('Login');
        }
      },

      {
        title: 'Privacy Policy',
        leftIcon: { FeatherName: 'lock', color: COLORS.PRIMARY, size: 18 },
        onPress: () => Linking.openURL('https://yard-ecommerce-web.vercel.app/privacy-policy')
      },
      {
        title: 'Terms of Service',
        leftIcon: { FeatherName: 'file-text', color: COLORS.PRIMARY, size: 18 },
        onPress: () => Linking.openURL('https://yard-ecommerce-web.vercel.app/terms-and-conditions')

      },
      {
        title: 'About',
        leftIcon: { FeatherName: 'info', color: COLORS.PRIMARY, size: 18 },
      },

      {
        title: 'Logout',
        leftIcon: { FeatherName: 'log-out', color: COLORS.PRIMARY, size: 18 },
        onPress: () => {
          logout();
          navigate('Login');
        }
      },

    ];
  const userData: {
    name?: string;
    email?: string;
    avatar?: string;
    mobileNumber?: number;
    gender?: string;

  } =
  {
    name: 'Krishna Pattanaik',
    email: 'gkpattanaik001@gmail.com',
    avatar: IMAGES.PROFILE,
    mobileNumber: 775421654,
    gender: 'male',
  }

  return (
    <Box bg={'white'} >
      <StatusBar backgroundColor={COLORS.PRIMARY} />
      <Box
        bg={COLORS.PRIMARY}
        pb={50}
        zIndex={-1}
        borderBottomLeftRadius={15}
        borderBottomRightRadius={15}
      >
        <Row space={3} justifyContent={'space-between'} alignItems={'center'} p={4}>
          <HStack space={4}>
            <Pressable onPress={() => goBack()}>
              <AppIcon AntDesignName="arrowleft" size={24} color={'white'} />
            </Pressable>

          </HStack>
          <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigate('Notifications')}>
            <Box p={2} borderRadius={6}>
              <AppIcon FeatherName='bell' color={'white'} size={20} />
            </Box>
          </Pressable>
        </Row>

        <Heading textAlign={'center'} size="md" color={'white'}>
          GopalKrishna Pattanaik
        </Heading>

        <Text color={'white'} mt={1} textAlign={'center'} fontSize={14}>demo@gmail.com</Text>

        <VStack alignItems="center" space={4} mt={5} >



          <Pressable
            justifyContent={'center'}
            alignItems={'center'}
            borderWidth={'2'}
            borderColor={COLORS.PRIMARY}
            borderRadius={'full'}
            position={'absolute'}
            top={0}
            zIndex={1}
          >
            <Avatar source={IMAGES.PROFILE} size="24" />
          </Pressable>
        </VStack>
      </Box>





      <ScrollView _contentContainerStyle={{ minH: 'full' }}>

        <Box zIndex={0} bg={'white'} mt={16} m={4} >
          {listData.map((item, index) => (
            <List
              key={index.toString()}
              title={item.title}
              leftIcon={item.leftIcon}
              subtitle={item.subtitle}
              avatar={item.avatar}
              onPress={() => item?.onPress?.()}
            />
          ))}

        </Box>

      </ScrollView >
    </Box >
  );
}
