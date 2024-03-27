import { Box, Center, Heading, Image } from 'native-base';
import React from 'react';
import AnimatedLottieView, { AnimationObject } from 'lottie-react-native';
import { Content } from './core';
import { COLORS } from '~/styles';

type Props = {
  item: {
    title: string;
    subtitle: string;
    src?: string;
    animation?: AnimationObject;
  };
} & React.ComponentProps<typeof Box>;

export default function OnboardingSlide({
  item: { subtitle, title, src, animation },
  ..._box
}: Props): JSX.Element {
  return (
    <Box {..._box}>

      <Center>
        {animation ? (
          <>
            <AnimatedLottieView
              source={animation}
              autoPlay
              style={{ height: 300 }}
              loop={true}
            />
          </>
        ) : (
          <Image src={src} alt={title} h="64" w="full" resizeMode="contain" />
        )}
        <Heading textAlign={'center'} my="2" color={COLORS.PRIMARY} mt={16}>
          {title}
        </Heading>
        <Content textAlign={'center'} my="2" fontSize={13} color="gray.500" >
          {subtitle}
        </Content>
      </Center>
    </Box>
  );
}
