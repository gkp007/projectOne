import {
  Avatar,
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  Pressable,
  Row,
  VStack,
} from 'native-base';
import React from 'react';
import { Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { AppIcon, Content } from '~/components/core';
import { COLORS } from '~/styles';

type PressableProps = React.ComponentProps<typeof Pressable>;
type AvatarProps = React.ComponentProps<typeof Avatar>;
type IconProps = React.ComponentProps<typeof AppIcon>;
type HeadingProps = React.ComponentProps<typeof Heading>;

type Props = {
  title: string;
  _title?: HeadingProps;
  subtitle?: string;
  _subtitle?: HeadingProps;
  avatar?: string;
  _avatar?: AvatarProps;
  rightIcon?: IconProps;
  leftIcon?: IconProps;
  noDivider?: boolean;
  hasSharedElement?: boolean;
} & PressableProps;

export default function List({
  title,
  _title,
  subtitle,
  _subtitle,
  avatar,
  _avatar,
  rightIcon = { EntypoName: 'chevron-small-right' },
  leftIcon,
  noDivider,
  ..._pressableProps
}: Props) {
  return (
    <>
      <Pressable
        flexDirection={'row'}
        alignItems="center"
        w="full"
        py={2}
        _pressed={{ bg: 'gray.200', opacity: 0.5 }}
        {..._pressableProps}>
        <Center w={avatar || leftIcon ? '1/6' : '0'}>
          {avatar ? (
            <SharedElement id="id-1">
              <Avatar source={{ uri: avatar }} {..._avatar}>
                {title[0]}
              </Avatar>
            </SharedElement>
          ) : (
            <HStack space={4} alignItems={'center'} p={3}>
              <AppIcon {...leftIcon} />
              <Divider orientation='vertical' h={10} />
            </HStack>
          )}
        </Center>

        <HStack
          alignItems="center"
          justifyContent="space-between"
          w={avatar || leftIcon ? '5/6' : 'full'}>
          <Box>
            <VStack space={1}>
              <Content size="xs" {..._title} weight="400">
                {title}
              </Content>
              {subtitle && (
                <Content fontSize={12} color="gray.500" {..._subtitle}>
                  {subtitle}
                </Content>
              )}
            </VStack>
          </Box>
          <Box mr={2}>
            <AppIcon {...rightIcon} color={COLORS.PRIMARY} />
          </Box>
        </HStack>
      </Pressable>
    </>
  );
}
