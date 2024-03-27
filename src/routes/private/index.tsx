import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PrivateRoutesTypes } from '~/routes/private/types';
import { Private } from '~/screens';
import { TabLayout } from '../layouts';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator<PrivateRoutesTypes>();

export default function PrivateRoutes({ }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabLayouts" component={TabLayout} />
      <Stack.Screen name="Coupons" component={Private.Coupons} />
      <Stack.Screen name="FAQs" component={Private.FAQs} />
      <Stack.Screen name="Home" component={Private.Home} />
      <Stack.Screen name="Notifications" component={Private.Notifications} />
      <Stack.Screen name="Offers" component={Private.Offers} />
      <Stack.Screen name="Profile" component={Private.Profile} />
      <Stack.Screen name="Search" component={Private.Search} />
      <Stack.Screen name="AllOrders" component={Private.AllOrders} />
      <Stack.Screen name="OrderDetails" component={Private.OrderDetails} />
      <Stack.Screen name="ProfileDetails" component={Private.ProfileDetails} />
      <Stack.Screen name="EditProfile" component={Private.EditProfile} />
      <Stack.Screen name="Address" component={Private.Address} />
      <Stack.Screen name="AddAddress" component={Private.AddAddress} />
      <Stack.Screen name="EditAddress" component={Private.EditAddress} />
      <Stack.Screen name="AllCategories" component={Private.AllCategories} />
      <Stack.Screen name="ProductDetails" component={Private.ProductDetails} />
      <Stack.Screen name="WishList" component={Private.WishList} />
      <Stack.Screen name="AllProducts" component={Private.AllProducts} />
      <Stack.Screen name="NewArrival" component={Private.NewArrival} />
      <Stack.Screen name="PopularSearches" component={Private.PopularSearches} />
      <Stack.Screen name="Ratings" component={Private.Ratings} />
      <Stack.Screen name="MyCoupons" component={Private.MyCoupons} />
      <Stack.Screen name="Help" component={Private.Help} />
      <Stack.Screen name="Checkout" component={Private.Checkout} />
      <Stack.Screen name="Wallet" component={Private.Wallet} />
      <Stack.Screen name="Seller" component={Private.Seller} />
      <Stack.Screen
        name="Settings"
        component={Private.Settings}
        sharedElements={(route, otherRoute, showing) => {
          return ['id-1'];
        }}
      />
      <Stack.Screen name="Support" component={Private.Support} />
    </Stack.Navigator>
  );
}
