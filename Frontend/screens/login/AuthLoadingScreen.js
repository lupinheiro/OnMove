import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {NativeBaseProvider, View} from 'native-base';
import {COLORS} from '../../constants';
import { userMarker } from '../../constants/icons';
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const AuthLoading = ({navigation, route}) => {
  useEffect(() => {
    async function handleUserNextScreen() {
      const userToken = await AsyncStorage.getItem('@App:userID');
      console.log("user token" + userToken);
      if (userToken === null) {
        navigation.navigate('SignInScreen');
      } else {
        navigation.navigate('Drawer');
      }
    }

    handleUserNextScreen();
  });

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    </NativeBaseProvider>
  );
};

export default AuthLoading;
