import React, { useState } from 'react';
import { Avatar, Box, HStack, Heading, Pressable, ScrollView, VStack, Text } from 'native-base';
import { COLORS } from '~/styles';
import { AppIcon, Content } from '~/components/core';
import { useNavigation } from '@react-navigation/native';
import { StackAndTabType } from '~/routes/private/types';
import { IMAGES } from '~/assets';

const Ratings = () => {
  const { goBack } = useNavigation<StackAndTabType>();
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMore, setShowMore] = useState(true);

  const brandsData = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Latest' },
    { id: 3, name: '5' },
    { id: 4, name: '4' },
    { id: 5, name: '3' },
    { id: 6, name: '2' },
    { id: 7, name: '1' },
  ];

  const reviewsData = [
    {
      id: 1,
      userName: 'Darleen jr.',
      avatar: IMAGES.PROFILE,
      rating: 4,
      like: 53,
      dislike: 9,
      days: 10,
      reviewText:
        'Works like its supposed to... Portable design and comfortable to use. Its suitable for a quick shave with little to minimal stubble. However, if you want a 100% clean shave better to go for double-bladed shaver types than round-headed...',
    },
    {
      id: 2,
      userName: 'Robert Jr.',
      avatar: IMAGES.PROFILE,
      rating: 4,
      like: 53,
      dislike: 9,
      days: 10,
      reviewText:
        'Works like its supposed to... Portable design and comfortable to use. Its suitable for a quick shave with little to minimal stubble. However, if you want a 100% clean shave better to go for double-bladed shaver types than round-headed...',
    },
    {
      id: 3,
      userName: 'Jason Stathom',
      avatar: IMAGES.PROFILE,
      rating: 4,
      like: 53,
      dislike: 9,
      days: 10,
      reviewText:
        'Works like its supposed to... Portable design and comfortable to use. Its suitable for a quick shave with little to minimal stubble. However, if you want a 100% clean shave better to go for double-bladed shaver types than round-headed...',
    },
    {
      id: 4,
      userName: 'Salvastor',
      avatar: IMAGES.PROFILE,
      rating: 4,
      like: 53,
      dislike: 9,
      days: 10,
      reviewText:
        'Works like its supposed to... Portable design and comfortable to use. Its suitable for a quick shave with little to minimal stubble. However, if you want a 100% clean shave better to go for double-bladed shaver types than round-headed...',
    },
  ];

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  type ReadMoreProps = {
    text: string;
    color: string;
    fontWeight: string;
    fontSize: number;
    px: number;
  };

  const ReadMore: React.FC<ReadMoreProps> = ({
    text,
    color,
    fontWeight,
    fontSize,
    px,
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpansion = () => {
      setIsExpanded(prev => !prev);
    };

    return (
      <>
        <Text
          textAlign="justify"
          color={color}
          fontWeight={fontWeight}
          fontSize={fontSize}
          px={px}
          numberOfLines={isExpanded ? undefined : 2}>
          {text}
        </Text>
        {!isExpanded ? (
          <Pressable onPress={toggleExpansion}>
            <Text
              color={color}
              fontWeight="700"
              fontSize={13}
              textAlign="justify">
              View More
            </Text>
          </Pressable>
        ) : (
          <Pressable onPress={toggleExpansion}>
            <Text
              color={color}
              fontWeight="700"
              fontSize={13}
              textAlign="justify">
              View less
            </Text>
          </Pressable>
        )}
      </>
    );
  };

  return (
    <>
      <Box bg={COLORS.PRIMARY}>
        <HStack space={3} justifyContent={'space-between'} alignItems={'center'} p={4}>
          <HStack space={3} justifyContent={'flex-start'} alignItems={'center'}>
            <Pressable onPress={() => goBack()}>
              <AppIcon AntDesignName="arrowleft" size={24} color={'white'} />
            </Pressable>
            <Heading textAlign={'center'} size="md" color={'white'}>
              All reviews and ratings
            </Heading>
          </HStack>
          {/* <HStack space={5}>
            <Pressable _pressed={{ opacity: 0.5 }}>
              <Box bg={'#419197'} p={2} borderRadius={6}>
                <AppIcon FeatherName="search" color={'white'} size={20} />
              </Box>
            </Pressable>
          </HStack> */}
        </HStack>
      </Box>

      <ScrollView horizontal maxH={10} showsHorizontalScrollIndicator={false}>
        <HStack mt={2}>
          {brandsData.map((brand) => (
            <Pressable
              _pressed={{ opacity: 0.5 }}
              key={brand.id}
              onPress={() => setSelectedBrand(brand.name)}
            >
              <Box
                m={1}
                borderRadius={10}
                bg={selectedBrand === brand.name ? 'gray.400' : 'white'}
                shadow={1}
                alignItems={'center'}
                px={4}
                p={1}
              >
                <HStack space={2}>
                  <Content
                    fontSize={13}
                    weight="400"
                    textAlign="center"
                    color={selectedBrand === brand.name ? 'white' : 'black'}
                  >
                    {brand.name}
                  </Content>
                  <AppIcon
                    AntDesignName="staro"
                    size={14}
                    color={selectedBrand === brand.name ? 'white' : 'black'}
                  />
                </HStack>
              </Box>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {reviewsData.map((review) => (
          <Box key={review.id} m={3} bg={'white'} shadow={1} borderRadius={5} p={3}>
            <VStack space={3}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <HStack space={3}>
                  <Avatar source={review.avatar} size="sm" />
                  <Heading size={'md'}>{review.userName}</Heading>
                </HStack>
                <Box>
                  <HStack space={2} bg={'white'} p={1} px={2} borderRadius={3} borderColor={COLORS.SECONDARY}>
                    <Content fontSize={13} weight="400" textAlign="center" color={'black'}>
                      {review.rating}
                    </Content>
                    <AppIcon AntDesignName="star" size={14} color={COLORS.PRIMARY} />
                  </HStack>
                </Box>
              </HStack>

              <ReadMore
                text={review.reviewText}
                color={'black'}
                fontWeight="500"
                fontSize={13}
                px={0}
              />

              <HStack justifyContent={'space-between'}>
                <HStack space={3} alignItems={'center'}>

                  <Pressable _pressed={{ opacity: 0.5 }}>

                    <HStack space={2} bg={'white'} shadow={1} p={1} px={4} borderRadius={'full'} borderColor={COLORS.SECONDARY}>
                      <AppIcon OcticonsName="thumbsup" size={14} color={COLORS.PRIMARY} />
                      <Content fontSize={13} weight="400" textAlign="center" color={'black'}>
                        {review.like}
                      </Content>
                    </HStack>
                  </Pressable>

                  <Pressable _pressed={{ opacity: 0.5 }}>
                    <HStack space={2} bg={'white'} shadow={1} p={1} px={4} borderRadius={'full'} borderColor={COLORS.SECONDARY}>
                      <AppIcon OcticonsName="thumbsdown" size={14} color={COLORS.SECONDARY} />
                      <Content fontSize={13} weight="400" textAlign="center" color={'black'}>
                        {review.dislike}
                      </Content>
                    </HStack>
                  </Pressable>
                </HStack>
                <Content fontSize={13} color={'gray.400'}>
                  {review.days} days ago
                </Content>
              </HStack>

            </VStack>
          </Box>
        ))}
      </ScrollView>


    </>
  );
};

export default Ratings;
