import React, {useState} from 'react';
import {TouchableOpacity, Alert, ImageBackground, Dimensions} from 'react-native';
import {auth} from '../../services/api';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Avatar} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  KeyboardAvoidingView,
  Center,
  NativeBaseProvider,
  View,
} from 'native-base';
import I18n from '../../utils/language';
import images from '../../constants/images';

const SignUpScreen = ({navigation}) => {
  async function saveUser(user) {
    await AsyncStorage.setItem('@App:userID', JSON.stringify(user));
  }
  
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [formData, setData] = useState();
  const options = [
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    {label: '6', value: 6},
    {label: '7', value: 7},
    {label: '8', value: 8},
  ];

  const openPicker = () => {
    launchImageLibrary(options, response => {
      // Use launchImageLibrary to open image gallery
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        setPhoto(source);
      }
    });
  };

  const removeImage = () => {
    setPhoto(null);
  };

  async function onSubmit() {
    setLoading(true);
    console.log(typeof photo);
    if (photo == null) {
      console.log('No photo');
      signUp(null);
    } else {
      try {
        console.log('Photo');
        const data = new FormData();
        data.append('file', photo);
        data.append('upload_preset', 'mobility-one');
        data.append('cloud_name', 'hegs');
        fetch('https://api.cloudinary.com/v1_1/hegs/image/upload', {
          method: 'post',
          body: data,
        })
          .then(res => res.json())
          .then(data => {
            if (data.secure_url !== undefined) {
              signUp(data.secure_url);
            }
          })
          .catch(err => {
            Alert.alert(I18n.t('SIGNUP_error'), err.message);
            console.log('error', err.data.errors);
          });
      } catch (err) {
        Alert.alert(err);
        setLoading(false);
      }
    }
  }

  async function signUp(uploadPhoto) {
    try {
      // console.log(photo);
      const response = await auth.post('/users/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      saveUser(response.data.id);
      console.log('response', response);
      if (response.data !== undefined) {
        setLoading(false);
        Alert.alert(I18n.t('SIGNUP_success'));
        navigation.navigate('SignUpScreen2');
      }
    } catch (err) {
      navigation.navigate('SignUpScreen2');
      console.log('erro', err.data.errors[0].message);
      let string = '';
      err.data.errors.map(erro => {
        string = string + `${erro.message} \n`;
      });
      Alert.alert(I18n.t('SIGNUP_error'), string);
      setLoading(false);
    }
  }

  return (
    <NativeBaseProvider>
      <KeyboardAwareScrollView>
      <ImageBackground
          source={images.logo}
          style={{
            height: Dimensions.get('screen').height / 2.5,
          }}
        />
        <Center  w="100%" bgColor="blueGray.800">
          <Box safeArea p="2" py="2" w="100%" maxW="290" h="100%">
            <Heading
              size="lg"
              fontWeight="600"
              color="white"
              _dark={{
                color: 'warmGray.50',
              }}>
              {I18n.t('SIGNUP_title')}
            </Heading>
            <VStack space={5} mt="3">
              {photo ? (
                <>
                  <HStack
                    mt="20"
                    alignItems={{
                      base: 'center',
                      md: 'flex-start',
                    }}>
                    <Avatar rounded source={photo} size="xlarge" />
                  </HStack>
                  <Button
                    onPress={() => removeImage()}
                    mt="3"
                    colorScheme="indigo">
                    {I18n.t('SIGNUP_removeImage')}
                  </Button>
                </>
              ) : (
                <Button
                  onPress={() => openPicker()}
                  colorScheme="indigo"
                  mt="8">
                  {I18n.t('SIGNUP_uploadImage')}
                </Button>
              )}
              <FormControl>
                <FormControl.Label>
                  <Text color="white">{I18n.t('SIGNUP_name')} </Text>
                </FormControl.Label>
                <Input
                  color="white"
                  placeholder="John Doe"
                  TextColor="white"
                  onChangeText={value => setData({...formData, name: value})}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color="white">{I18n.t('SIGNUP_email')}</Text>
                </FormControl.Label>
                <Input
                  color="white"
                  placeholder="user@email.com"
                  onChangeText={value => setData({...formData, email: value})}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color="white">{I18n.t('SIGNUP_password')}</Text>
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
                {I18n.t('SIGNUP_button_Next')}
              </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignInScreen')}>
                <Text
                  fontSize="sm"
                  color="coolGray.400"
                  _dark={{
                    color: 'coolGray.200',
                  }}>
                  {I18n.t('SIGNUP_signIn')}
                </Text>
              </TouchableOpacity>
            </VStack>
          </Box>
        </Center>
    </KeyboardAwareScrollView>
  </NativeBaseProvider>
  );
};

export default SignUpScreen;
