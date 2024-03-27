import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Private } from '~/screens';
import { AppIcon } from '~/components/core';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { NativeBaseProvider, Box, useColorModeValue } from 'native-base';
import { AddBtn } from '~/components';
import { COLORS } from '~/styles';


const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const bg = useColorModeValue('white', '#18181b');

  const [open, setOpen] = useState(false);
  const toggleOpened = () => setOpen(!open);

  return (
    <NativeBaseProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            ...styles.tabBar,
            backgroundColor: bg,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Private.Home}
          options={{
            tabBarItemStyle: { height: 0 },
            tabBarIcon: ({ focused }) => (
              <Box
                position={'absolute'}
                alignItems={'center'}
                justifyContent={'center'}
                top={3}>

                <AppIcon
                  IoniconsName={focused ? 'home' : 'home-outline'}
                  size={25}
                  color={focused ? Colors.primary : Colors.grey}
                />
              </Box>
            ),
          }}
          listeners={{
            tabPress: () => setOpen(false),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={Private.AllCategories}
          options={{
            tabBarItemStyle: { height: 0 },
            tabBarIcon: ({ focused }) => (
              <Box
                position={'absolute'}
                alignItems={'center'}
                justifyContent={'center'}
                top={3}>

                <AppIcon
                  IoniconsName={focused ? 'grid' : 'grid-outline'}
                  size={25}
                  color={focused ? Colors.primary : Colors.grey}
                />
              </Box>
            ),
          }}
          listeners={{
            tabPress: () => setOpen(false),
          }}
        />

        <Tab.Screen
          name="menu"
          component={Private.Home}
          options={{
            tabBarItemStyle: { height: 0 },
            tabBarButton: () => (
              <AddBtn open={open} toggleOpened={toggleOpened} />
            ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={Private.Cart}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({ focused }) => (
              <Box
                position={'absolute'}
                alignItems={'center'}
                justifyContent={'center'}
                top={3}>
                <AppIcon
                  IoniconsName={focused ? 'cart' : 'cart-outline'}
                  size={25}
                  color={focused ? Colors.primary : Colors.grey}
                />
              </Box>
            ),
          }}
          listeners={{
            tabPress: () => setOpen(false),
          }}
        />



        <Tab.Screen
          name="Profile"
          component={Private.Profile}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({ focused }) => (
              <Box
                position={'absolute'}
                alignItems={'center'}
                justifyContent={'center'}
                top={3}>
                <AppIcon
                  IoniconsName={focused ? 'person' : 'person-outline'}
                  size={25}
                  color={focused ? Colors.primary : Colors.grey}
                />
              </Box>
            ),
          }}
          listeners={{
            tabPress: () => setOpen(false),
          }}
        />
      </Tab.Navigator>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    height: 56,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const Colors = {
  primary: COLORS.PRIMARY,
  grey: '#5A5A5A',
};
