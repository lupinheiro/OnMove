import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './components/DrawerContent';
import {
  HomeScreen,
  SettingsScreen,
  MyRoutesScreen,
  SignInScreen,
  SignUpScreen,
  SignUpScreen2,
  DestinationDetail,
  DestinationSearch,
  Onboarding,
  UserProfile,
  CreateVehicle,
  Survey,
  Statistics,
  OrdersScreen,
  OrderDetail,
  MapScreen,
  MyProfile,
  CreateCarPooling,
  AuthLoadingScreen,
} from './screens';

import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './navigation/RootNavigation';
import {NativeBaseProvider} from 'native-base';

const Drawer = createDrawerNavigator();

const App = () => {
  const navigationDrawer = () => {
    return (
      <NativeBaseProvider>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={HomeScreen}
          drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Drawer.Screen name="Map" component={MapScreen} />
          <Drawer.Screen name="My Routes" component={MyRoutesScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Statistics" component={Statistics} />
        </Drawer.Navigator>
      </NativeBaseProvider>
    );
  };

  const AppStack = createStackNavigator();

  const MyStack = () => {
    return (
      <AppStack.Navigator headerMode="none" initialRouteName="Onboarding">
        <AppStack.Screen name="SignInScreen" component={SignInScreen} />
        <AppStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <AppStack.Screen name="SignUpScreen2" component={SignUpScreen2} />
        <AppStack.Screen name="CreateVehicle" component={CreateVehicle} />
        <AppStack.Screen name="OrdersScreen" component={OrdersScreen} />
        <AppStack.Screen name="OrderDetail" component={OrderDetail} />
        <AppStack.Screen name="Map" component={MapScreen} />
        <AppStack.Screen name="Drawer" component={navigationDrawer} />
        <AppStack.Screen name="Onboarding" component={Onboarding} />
        <AppStack.Screen name="MyProfile" component={MyProfile} />
        <AppStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <AppStack.Screen name="Survey" component={Survey} />
        {/* <AppStack.Screen name="Settings" component={SettingsScreen} /> */}
        <AppStack.Screen
          name="DestinationSearch"
          component={DestinationSearch}
        />
        <AppStack.Screen name="CreateCarPooling" component={CreateCarPooling} />
        <AppStack.Screen name="UserProfile" component={UserProfile} />
        <AppStack.Screen
          name="DestinationDetail"
          component={DestinationDetail}
        />
      </AppStack.Navigator>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>{MyStack()}</NavigationContainer>
  );
};

export default App;
