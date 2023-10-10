import React, {useState} from 'react';
import {
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {auth} from '../../services/api';
import images from '../../constants/images';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import I18n from '../../utils/language';

const SignInScreen = ({navigation}) => {
  async function saveUser(user) {
    await AsyncStorage.setItem('@App:userID', JSON.stringify(user));
    console.log(user);
  }

  // temail@testdefff.com
  async function onSubmit() {
    try {
      const response = await auth.post('/users/signin', {
        email: formData.email,
        password: formData.password,
      });
      saveUser(response.data.id);

      navigation.navigate('Drawer');
    } catch (err) {
      console.log(err);
      if (err.data.errors[0].message !== undefined) {
        Alert.alert(err.data.errors[0].message);
      } else {
        Alert.alert('Error! Please try again!');
      }
    }
  }

  const [formData, setData] = useState({});

  return (
    <NativeBaseProvider>
      <KeyboardAwareScrollView>
        <ImageBackground
          source={images.logo}
          style={{
            height: Dimensions.get('screen').height / 2.5,
          }}
        />
        <Center w="100%" bgColor="blueGray.800">
          <Box safeArea p="2" py="2" w="90%" maxW="290" h="100%">
            <Heading
              size="lg"
              fontWeight="600"
              color="white"
              _dark={{
                color: 'warmGray.50',
              }}>
              {I18n.t('SIGNIN_title')}
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.400"
              fontWeight="medium"
              size="xs">
              {I18n.t('SIGNIN_subtitle')}
            </Heading>

            <VStack space={5} mt="3">
              <FormControl>
                <FormControl.Label>
                  <Text color="white" type="email" autoComplete="email">
                    {I18n.t('SIGNIN_email')}
                  </Text>
                </FormControl.Label>
                <Input
                  color="white"
                  placeholder="user@email.com"
                  onChangeText={value => setData({...formData, email: value})}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color="white">{I18n.t('SIGNIN_password')}</Text>
                </FormControl.Label>
                <Input
                  color="white"
                  type="password"
                  onChangeText={value =>
                    setData({...formData, password: value})
                  }
                />
              </FormControl>
              <Button onPress={onSubmit} mt="2" colorScheme="indigo">
                {I18n.t('SIGNIN_button')}
              </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}>
                <Text
                  fontSize="sm"
                  color="coolGray.400"
                  _dark={{
                    color: 'coolGray.200',
                  }}>
                  {I18n.t('SIGNIN_new_user')}
                </Text>
              </TouchableOpacity>
              <HStack mt="6" justifyContent="center" />
            </VStack>
          </Box>
        </Center>
      </KeyboardAwareScrollView>
    </NativeBaseProvider>
  );
};

export default SignInScreen;
