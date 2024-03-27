import React, { useState } from 'react';
import { View, ScrollView, VStack, FormControl, Input, Button } from 'native-base';
import { PrivateContainer } from '~/components/containers';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSaveChanges = () => {

        console.log('Saving changes...');
    };

    return (
        <PrivateContainer showSearch={false}>
            <ScrollView p={4}>
                {/* Editable Fields */}
                <VStack space={4} alignItems="center">
                    <FormControl>
                        <FormControl.Label>Name</FormControl.Label>
                        <Input
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            keyboardType="email-address"
                        />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Phone Number</FormControl.Label>
                        <Input
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                            keyboardType="phone-pad"
                        />
                    </FormControl>
                </VStack>

                {/* Save Changes Button */}
                <Button mt={6} size="sm" onPress={handleSaveChanges}>
                    Save Changes
                </Button>
            </ScrollView>
        </PrivateContainer>
    );
};

export default EditProfile;
