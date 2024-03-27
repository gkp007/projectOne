import React from 'react';
import {
    Box,
    Text,
    HStack,
    Heading,
    Center,
    VStack,
    useColorMode,
} from 'native-base';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { AppIcon } from './core';
import { Dimensions } from 'react-native';
import { WIDTH } from '~/styles';

export type NotificationCard = {
    id: number;
    day: string;
    notifications: Notification[];
};

export type Notification = {
    id: number;
    title: string;
    subtitle: string;
    icon: ReturnType<typeof AppIcon>;
};

interface NotificationItemProps
    extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    notify: Notification;
    onDismiss?: (notify: Notification) => void;
}
export const NotificationsData: NotificationCard[] = [
    {
        id: 1,
        day: 'Today',
        notifications: [
            {
                id: 1,
                title: '30% Special Discount!',
                subtitle: 'Special promotion only valid today',
                icon: <AppIcon FontAwesomeName="bell-o" color={'gray'} size={20} />,
            },
        ],
    },
    {
        id: 2,
        day: 'Yesterday',
        notifications: [
            {
                id: 2,
                title: 'Top Up E-Wallet Successful!',
                subtitle: 'You have to top up your e-wallet',
                icon: <AppIcon FontAwesomeName="bell-o" color={'gray'} size={20} />,
            },
            {
                id: 3,
                title: 'New Services Available',
                subtitle: 'Now you can track orders in real time',
                icon: <AppIcon FontAwesomeName="bell-o" color={'gray'} size={20} />,
            },
        ],
    },
    {
        id: 3,
        day: 'Dec 14, 2022 ',
        notifications: [
            {
                id: 4,
                title: 'Credit Card Connected!',
                subtitle: 'Credit Card has been linked',
                icon: <AppIcon FontAwesomeName="bell-o" color={'gray'} size={20} />,
            },
            {
                id: 5,
                title: 'Account Setup Successful!',
                subtitle: 'Your account has been created',
                icon: <AppIcon FontAwesomeName="bell-o" color={'gray'} size={20} />,
            },
            {
                id: 6,
                title: 'New Services Available',
                subtitle: 'Now you can track orders in real time',
                icon: <AppIcon FontAwesomeName="bell-o" color={'gray'} size={20} />,
            },
            {
                id: 7,
                title: 'Account Setup Successful!',
                subtitle: 'Your account has been created',
                icon: <AppIcon FontAwesomeName="bell-o" color={'gray'} size={20} />,
            },
            {
                id: 8,
                title: 'Account Setup Successful!',
                subtitle: 'Your account has been created',
                icon: <AppIcon FontAwesomeName="bell-o" color={'gray'} size={20} />,
            },
        ],
    },
];

const NotificationItem: React.FC<NotificationItemProps> = ({
    notify,
    onDismiss,
    simultaneousHandlers,
}) => {
    const { colorMode } = useColorMode();
    const { width: SCREEN_WIDTH } = Dimensions.get('window');
    const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(90);
    const opacity = useSharedValue(1);

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: event => {
            translateX.value = event.translationX;
        },

        onEnd: event => {
            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                opacity.value = withTiming(0, undefined, isFinished => {
                    if (isFinished && onDismiss) {
                        runOnJS(onDismiss)(notify);
                    }
                });
            } else {
                translateX.value = withTiming(0);
            }
        },
    });
    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
            ],
        };
    });
    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(
            translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
        );
        return { opacity };
    });
    const rTaskContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            opacity: opacity.value,
            overflow: 'hidden',
        };
    });

    return (
        <Box bg={colorMode === 'dark' ? 'dark.50' : 'white'}>
            <Animated.View style={[{ justifyContent: 'center' }, rTaskContainerStyle]}>
                <Animated.View
                    style={[{ position: 'absolute', right: 8 }, rIconContainerStyle]}>
                    <AppIcon AntDesignName="delete" color={'red'} size={20} />
                </Animated.View>
                <PanGestureHandler
                    onGestureEvent={panGesture}
                    simultaneousHandlers={simultaneousHandlers}>
                    <Animated.View style={[{ flex: 1 }, rStyle]}>
                        <Box
                            bg={colorMode === 'dark' ? 'dark.100' : 'white'}
                            _light={{
                                shadow: '1',
                            }}
                            my="2"
                            mx={WIDTH * 0.04}
                            p="2"
                            flex={1}
                            borderRadius={15}
                            justifyContent={'center'}>
                            <HStack my="1" space="4">
                                <Box
                                    size={50}
                                    bg={colorMode === 'dark' ? 'white' : 'gray.200'}
                                    borderRadius={'full'}
                                    justifyContent="center">
                                    <Center >{notify.icon}</Center>
                                </Box>
                                <Box justifyContent="center" flex={1} overflow="hidden">
                                    <VStack space="1.5">
                                        <Heading
                                            numberOfLines={1}
                                            fontSize="sm"
                                            color={colorMode === 'dark' ? 'white' : 'black'}>
                                            {notify.title}
                                        </Heading>
                                        <Text
                                            numberOfLines={2}
                                            fontWeight={500}
                                            color={colorMode === 'dark' ? 'white' : 'gray'}>
                                            {notify.subtitle}
                                        </Text>
                                    </VStack>
                                </Box>
                            </HStack>
                        </Box>
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </Box>
    );
};

export default NotificationItem;
