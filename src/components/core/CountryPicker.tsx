import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HStack, Icon, Input, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import { Countries } from '~/constant';
import Content from './Content';

type Props = {
  visible: boolean;
  onSelect: (country: any) => void;
  onClose: () => void;
  selectedCountry?: any;
};

export default ({ onClose, onSelect, visible }: Props) => {
  const [searchTxt, setSearchTxt] = useState('');
  const [searchRes, setSearchRes] = useState(() => Countries);
  useEffect(() => {
    if (searchTxt) {
      const resArr = Countries?.filter((item: any) =>
        item?.name?.toLowerCase().includes(searchTxt.toLowerCase()),
      );
      setSearchRes(resArr);
    } else {
      setSearchRes(Countries);
    }
  }, [searchTxt]);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => onClose()}>
        <TouchableWithoutFeedback onPress={() => onClose()}>
          <SafeAreaView style={styles.container}>
            <VStack w="100%" space={5} alignSelf="center">
              <HStack mt={2} space={8}>
                <Pressable onPress={() => onClose()}>
                  <MaterialIcons name="arrow-back" size={25} color="#000" />
                </Pressable>
                <Content alignSelf={'center'} fontSize="lg">
                  Select Your Country
                </Content>
              </HStack>

              <Input
                placeholder="Search by country name"
                width="100%"
                borderRadius="4"
                backgroundColor={'#fff'}
                py="3"
                px="1"
                fontSize="14"
                InputLeftElement={
                  <Icon
                    m="2"
                    ml="3"
                    size="6"
                    color="gray.400"
                    as={<MaterialIcons name="search" />}
                  />
                }
                value={searchTxt}
                onChangeText={setSearchTxt}
              />
            </VStack>

            <FlatList
              keyboardShouldPersistTaps="always"
              data={searchRes}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.flagWrapper}
                  onPress={() => onSelect(item)}>
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w20/${item.code.toLowerCase()}.png`,
                    }}
                    alt="country"
                    style={styles.flag}
                  />
                  <Content fontSize={12}>{item.name}</Content>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.code}
              showsVerticalScrollIndicator={false}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  flag: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  flagWrapper: { padding: 10, flexDirection: 'row' },
  container: {
    flex: 1,
    padding: 10,
  },
});
