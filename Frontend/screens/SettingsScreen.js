import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, NativeModules,ImageBackground} from 'react-native';
import ActivityDB from './ActivityDBModule';
import {
  View,
  Button,
  Center,
  Container,
  Switch,
  ScrollView,
  Text,
  Image,
  NativeBaseProvider,
} from 'native-base';
import {icons, SIZES, images} from '../constants/index';
import I18n from '../utils/language';
import AsyncStorage from '@react-native-community/async-storage';
const {HAR_Module} = NativeModules;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 30,
    height: 30,
  },
  view: {flexDirection: 'row', height: 40},
  touchable: {
    width: 50,
    paddingLeft: SIZES.padding * 1,
    justifyContent: 'center',
  },
  view_2: {
    borderRadius: 20,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable_2: {
    borderRadius: 20,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_settings: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white',
  },
  text_settings2: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
  },
});

const SettingsScreen = ({navigation}) => {
  const [checked, setCheked] = useState(false);

  const manageAR = async () => {
    if (!checked) {
      HAR_Module.HAR_Begin_Service();
      await AsyncStorage.setItem('@App:activityRequest', 'true');
    } else {
      HAR_Module.HAR_Stop_Service();
      await AsyncStorage.setItem('@App:activityRequest', 'false');
    }
    setCheked(!checked);
  };


  const renderHeader = () => {
    return (
      <View style={styles.view}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.touchable}>
          <Image
            alt="menu"
            source={icons.menu}
            resizeMode="contain"
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.view_2}>
          <Text style={styles.text_settings}>{I18n.t('SETTINGS_title')}</Text>
        </View>
      </View>
    );
  };

  return (
    <NativeBaseProvider>
     
      <View bgColor="blueGray.800" style={styles.container}>
      {renderHeader()}

      <Center>
        <Container>
          <ScrollView h="80">
            <Center>
              <Text />
              <Text style={styles.text_settings2}>
                {I18n.t('SETTINGS_activity')}
                <Switch
                  size="md"
                  onToggle={() => manageAR()}
                  isChecked={checked}
                />
              </Text>

              <Text> </Text>
              <Button onPress={() => navigation.navigate('Survey')}>
                {I18n.t('SETTINGS_survey')}
              </Button>
            </Center>
            <Text> </Text>
            <ActivityDB />
            <Text />
            <Text />
          </ScrollView>
        </Container>
      </Center>
    </View>
    </NativeBaseProvider>
  );
};

export default SettingsScreen;
