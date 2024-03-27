import { Box, Center, Image, Pressable, Row } from 'native-base';
import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { HEIGHT, WIDTH } from '~/styles';

type Props = {
  images?: Array<string>;
  showPreview?: Boolean;
  hideIndicators?: Boolean;
  indicator?: 'rounded' | 'bar';
};

export default function ImageCarousel({
  images = [],
  showPreview,
  hideIndicators,
  indicator = 'rounded',
}: Props): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imagesRef = useRef<FlatList>(null);

  return (
    <>
      <Box h={HEIGHT / 3}>
        {/* Images Slides */}
        <FlatList
          horizontal
          ref={imagesRef}
          onScroll={e => {
            setSelectedIndex(
              +(e.nativeEvent.contentOffset.x / WIDTH).toFixed(0),
            );
          }}
          pagingEnabled
          data={images}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              w={WIDTH}
              h={HEIGHT / 3}
              resizeMode="contain"
              alt="image not found"
            />
          )}
        />
        {/* indicators */}
        {!hideIndicators && (
          <Center>
            <Row
              position="absolute"
              bottom={'1'}
              space={indicator === 'bar' ? 0 : '2'}>
              {images.map((_, id) => {
                return indicator === 'bar' ? (
                  <Box
                    key={id}
                    m="auto"
                    bg={selectedIndex == id ? 'primary.600' : 'primary.50'}
                    h={1}
                    w={WIDTH / 2 / images.length}
                  />
                ) : (
                  <Box
                    key={id}
                    m="auto"
                    bg={selectedIndex == id ? 'primary.600' : 'primary.50'}
                    w={selectedIndex == id ? 5 : 1.5}
                    h={1.5}
                    rounded="xl"
                  />
                );
              })}
            </Row>
          </Center>
        )}
      </Box>
      {/* Preview items */}
      {showPreview && (
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <>
              <Pressable
                w={WIDTH / images.length}
                h={HEIGHT / 9}
                my="3"
                mx="1"
                p="1"
                alignItems="center"
                justifyContent="center"
                borderWidth={2}
                borderColor={
                  selectedIndex == index ? 'primary.600' : 'primary.50'
                }
                borderRadius={8}
                onPress={() => {
                  imagesRef.current?.scrollToIndex({ index, animated: true });
                }}
                _pressed={{ opacity: 0.8, borderColor: 'primary.500' }}>
                <Image
                  source={{ uri: item }}
                  w="full"
                  h="full"
                  resizeMode="contain"
                  alt="image not found"
                />
              </Pressable>
            </>
          )}
        />
      )}
    </>
  );
}
