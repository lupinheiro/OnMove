/*eslint-disable*/
import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Text, Image, View, NativeBaseProvider} from 'native-base';
import {images, icons, SIZES} from '../constants';
import {routes as routeAPI} from '../services/api';
import {FlatGrid} from 'react-native-super-grid';
import Moment from 'moment';
import I18n from '../utils/language';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-start',
    borderRadius: 25,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemDate: {
    fontSize: 13,
    fontWeight: '600',
  },
  userName: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: '800',
  },
  itemCode: {
    fontWeight: '500',
    fontSize: 12,
    opacity: 0.99,
  },
});
const DestinationSearch = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const {name, endLocation, startLocation} = route.params;
  const [routes, setRoutes] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [routesList, setRoutesList] = useState([]);
  useEffect(() => {
    // temail@testdefff.com
    async function getRoutes() {
      setLoading(true);
      try {
        const response = await routeAPI.post('/routes/search/', {
          start: startLocation,
          end: endLocation,
          type: 'driver',
        });
        filterRoutes(response.data);
      } catch (err) {
        console.log(`error: ${err}`);
        Alert.alert(I18n.t('DESTINATIONSEARCH_error_alert'));
        setLoading(false);
      }
    }
    getRoutes();
  }, []);

  const getRouteDetails = route => {
    const allData = route;
    navigation.navigate('DestinationDetail', {
      data: route[0],
      allData: allData,
      endLocation: endLocation,
    });
  };

  const filterRoutes = routes => {
    if (!routes) {
      setRoutes([]);
      Alert.alert(I18n.t('DESTINATIONSEARCH_no_routes_alert'));
    } else {
      routes.forEach(element => {
        setRoutesList(oldArray => [...oldArray, element]);
      });
    }
    setLoading(false);
  };
  const openFilter = () => {
    console.log('Open Filters');
  };

  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 1,
            justifyContent: 'center',
            marginRight: 5,
          }}>
          <Image
            alt="back"
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            borderRadius: 20,
            width: 280,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: '600',
            }}>
            {name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => openFilter()}
          style={{
            marginLeft: 10,
            width: 50,
            paddingRight: SIZES.padding * 1,
            justifyContent: 'center',
          }}>
          <Image
            alt="filter"
            source={icons.filter}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderRouteOptions() {
    return (
      <FlatGrid
        itemDimension={130}
        data={routesList}
        style={styles.gridView}
        spacing={10}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => getRouteDetails(item)}>
            <View style={[styles.itemContainer, {backgroundColor: 'white'}]}>
              <View>
                <Text style={styles.itemName}>
                  {I18n.t('GERAL_start')}

                  {startLocation}
                </Text>
                <Text style={styles.itemName}>
                  {I18n.t('GERAL_end')}
                  {endLocation}
                </Text>
                <Text style={styles.itemName}>
                  {I18n.t('GERAL_time')}
                  {item[0].estimatedTime}
                  {I18n.t('GERAL_minutes')}
                </Text>
                <Text style={styles.itemDate}>
                  {Moment(item.startDate).format('lll')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <NativeBaseProvider>
      <ImageBackground
        style={{flex: 1, resizeMode: 'cover'}}
        source={images.background}>
        <SafeAreaView style={styles.container}>
          {renderHeader()}
          {loading ? (
            <ActivityIndicator
              size="large"
              color="white"
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}
            />
          ) : (
            renderRouteOptions()
          )}
        </SafeAreaView>
      </ImageBackground>
    </NativeBaseProvider>
  );
};

export default DestinationSearch;
