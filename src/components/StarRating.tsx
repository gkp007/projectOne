import React, { useState } from 'react';
import { Pressable, HStack } from 'native-base';
import { AppIcon } from './core';

interface StarRatingProps {
    initialRating?: number;
    size: number;
    color: string;
    starValue?: number;
}
const StarRating: React.FC<StarRatingProps> = ({
    initialRating = 0,
    size,
    color,
    starValue,
}) => {
    const [rating, setRating] = useState(initialRating);

    const handleStarPress = (starIndex: number) => {
        setRating(starIndex + 1);
    };

    return (
        <HStack alignItems="center" justifyContent="center" space={1}>
            {Array.from({ length: 5 }, (_, i) => (
                <Pressable
                    key={i}
                    onPress={() => {
                        handleStarPress(i);
                    }}>
                    <Star filled={i < rating} size={size} color={color} />
                </Pressable>
            ))}
        </HStack>
    );
};
interface StarProps {
    filled: boolean;
    size: number;
    color: string;
}

const Star: React.FC<StarProps> = ({ filled, size, color }) => {
    return (
        <>
            {filled ? (
                <AppIcon EntypoName="star" size={size} color={color} />
            ) : (
                <AppIcon IoniconsName="star-outline" size={size} color={color} />
            )}
        </>
    );
};
export default StarRating;
