import { FlatList, Box, Heading, HStack, Pressable } from 'native-base';
import React, { useCallback, useState, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    NotificationCard,
    NotificationsData,
} from '~/components/NotificationItems';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { AppIcon, Content, Header } from '~/components/core';
import { NotificationItems } from '~/components';
import { WIDTH } from '~/styles';
import { StackAndTabType } from '~/routes/private/types';
import { useNavigation } from '@react-navigation/native';

export default function Notifications(): JSX.Element {

    const scrollRef = useRef(null);
    const [notificationData, setNotificationData] = useState(NotificationsData);
    const headerOpacity = useSharedValue(1);

    const onDismiss = useCallback((notify: { id: number; }) => {
        setNotificationData(prevData => {
            const newData = prevData.map(item => ({
                ...item,
                notifications: item.notifications.filter(
                    notification => notification.id !== notify.id,
                ),
            }));
            headerOpacity.value = withSpring(
                newData.some(item => item.notifications.length > 0) ? 1 : 0,
            );
            return newData;
        });
    }, []);

    const headerStyle = useAnimatedStyle(() => {
        return {
            opacity: headerOpacity.value,
        };
    });

    const renderItem = ({ item }: { item: NotificationCard }) => {
        return (
            <>
                <GestureHandlerRootView>
                    <Animated.View style={headerStyle}>
                        <Heading fontSize={18} p="1" px="4">
                            {item.day}
                        </Heading>
                    </Animated.View>
                    {item.notifications.map(notify => (
                        <NotificationItems
                            key={notify.id}
                            notify={notify}
                            onDismiss={onDismiss}
                            simultaneousHandlers={scrollRef}
                        />
                    ))}
                </GestureHandlerRootView>
            </>
        );
    };

    const { navigate, goBack } = useNavigation<StackAndTabType>();

    return (
        <Box bg={'white'}>
            <Header title="Notifications" />
            <FlatList
                data={notificationData}
                mt={2}
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                extraData={WIDTH}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Content>No notifications</Content>
                }
                ListFooterComponent={<Box h="10" mb={'16'} />}
            />
        </Box>
    );
}
