import React, {useState} from 'react';
import {TouchableOpacity, Alert, ImageBackground, Dimensions} from 'react-native';
import {auth} from '../../services/api';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
  View,
} from 'native-base';
import I18n from '../../utils/language';

const SignUpScreen2 = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setData] = useState();
  const [photo, setPhoto] = useState(null);
  
  const [user, setUser] = useState(null);

  async function onSubmit() {
    setLoading(true);
    signUp();
  }

  useEffect(() => {
    async function getCurrentUserDetails() {
      try {
        const response = await auth.get('/users/currentUser');
        setUser(response.data);
        
      } catch (err) {
        await AsyncStorage.removeItem('@App:userID');
        props.navigation.reset({
          index: 0,
          routes: [{name: 'SignInScreen'}],
        });
      }
    }
    getCurrentUserDetails();
  }, []);
  

  async function signUp() {
    try {
      console.log(biography);
      console.log(contact);
      const response = await auth.post('/users/edit', {
        biography: formData.biography,
        contact: formData.contact,
        birthdate: formData.birthdate,
        mass: formData.mass,
        height: formData.height

      });
      console.log('response', response);
      if (response.data !== undefined) {
        setLoading(false);
        Alert.alert(I18n.t('SIGNUP_success'));
        navigation.navigate('SignInScreen');
      }
    } catch (err) {
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
      <View bgColor="blueGray.800" h="100%">
      <KeyboardAwareScrollView>
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
            <VStack space="4"  mt="3">
              <FormControl>
                <FormControl.Label>
                  <Text color="white">{I18n.t('SIGNUP_biography')}</Text>
                </FormControl.Label>
                <Input
                  color="white"
                  placeholder={I18n.t('SIGNUP_biography_placeholder')}
                  onChangeText={value =>
                    setData({...formData, biography: value})
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color="white">{I18n.t('SIGNUP_contact')}</Text>
                </FormControl.Label>
                <Input
                  keyboardType="phone-pad"
                  color="white"
                  type="number"
                  placeholder="912345678"
                  onChangeText={value => setData({...formData, contact: value})}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color="white">{I18n.t('SIGNUP_birthday')}</Text>
                </FormControl.Label>
                <Input
                  keyboardType="phone-pad"
                  color="white"
                  type="number"
                  placeholder="12/12/2000"
                  onChangeText={value =>
                    setData({...formData, birthdate: value})
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color="white">{I18n.t('SIGNUP_body_mass')}</Text>
                </FormControl.Label>
                <Input
                  keyboardType="phone-pad"
                  color="white"
                  type="number"
                  placeholder="60"
                  onChangeText={value => setData({...formData, mass: value})}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color="white">{I18n.t('SIGNUP_height')}</Text>
                </FormControl.Label>
                <Input
                  keyboardType="phone-pad"
                  color="white"
                  type="number"
                  placeholder="1.76"
                  onChangeText={value => setData({...formData, height: value})}
                />
              </FormControl>
              <Button onPress={onSubmit} mt="2" colorScheme="indigo">
                {I18n.t('SIGNUP_button')}
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
      </View>
    </NativeBaseProvider>
  );
};

export default SignUpScreen2;
