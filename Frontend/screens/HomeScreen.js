/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import {icons, COLORS, SIZES, images} from '../constants/index';
import ActionButton from 'react-native-action-button';
import Geolocation from '@react-native-community/geolocation';
import {FlatGrid} from 'react-native-super-grid';
import {Button as ButtonNative} from 'react-native-elements';
import {routes} from '../services/api';
import Moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../utils/language';
import {
  Center,
  View,
  FlatList,
  Text,
  Image,
  Modal,
  NativeBaseProvider,
  ScrollView,
} from 'native-base';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import env from '../env';
const device_width = Dimensions.get('window').width;
const HomeScreen = ({navigation}) => {
  const [hasNextRide, setHasNextRide] = useState(false);
  const [hasRecommendations, setHasRecommendations] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [userId, setUserId] = useState(null);
  const [startLocation, setStartLocation] = React.useState('');
  const [endLocation, setEndLocation] = React.useState('');
  const [nextTravel, setNextTravel] = useState(null);
  const [name, setName] = useState('');
  const [show, setShow] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [items] = useState([
    {
      label: 'Escola Superior de Tecnologia e Gestão',
      value: 'ESTG',
      position: {
        lat: 41.693463,
        long: -8.846654,
      },
    },
    {
      label: 'Escola Superior de Educação',
      value: 'ESE',
      position: {
        lat: 41.702491,
        long: -8.820698,
      },
    },
    {
      label: 'Escola Superior Agrária',
      value: 'ESA',
      position: {
        lat: 41.793549,
        long: -8.54277,
      },
    },
    {
      label: 'Escola Superior de Saúde',
      value: 'ESS',
      position: {
        lat: 41.697553,
        long: -8.836266,
      },
    },
    {
      label: 'Escola Superior de Desporto e Lazer',
      value: 'ESDL',
      position: {
        lat: 42.117427,
        long: -8.271185,
      },
    },
    {
      label: 'Escola Superior de Ciências Empresariais',
      value: 'ESCE',
      position: {
        lat: 42.031629,
        long: -8.632825,
      },
    },
    {
      label: 'Serviços Académicos',
      value: 'SAS',
      position: {
        lat: 41.693286,
        long: -8.832566,
      },
    },
  ]);

  useEffect(() => {
    async function handleUserNextScreen() {
      const id = await AsyncStorage.getItem('@App:userID');
      setUserId(id);
    }
    handleUserNextScreen();
    findCoordinates();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      findCoordinates();
    }, []),
  );

  const searchRoutes = () => {
    if (startLocation === endLocation) {
      Alert.alert(I18n.t('HOME_error_inputs'));
    } else {
      navigation.navigate('DestinationSearch', {
        startLocation: startLocation,
        endLocation: endLocation,
        name: name,
      });
    }
  };
  const findCoordinates = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const lat = JSON.stringify(position.coords.latitude);
        const lng = JSON.stringify(position.coords.longitude);

        const myLocation = {
          position: {
            lat: lat,
            lng: lng,
          },
        };

        nearestLocation(myLocation);
      },
      error => {
        console.log('error: ', error);
        getMyNextTravel();
      },
      {enableHighAccuracy: false, timeout: 36000, maximumAge: 1000},
    );
  };

  // Calculate distance from my location to all the 6 locations and get the nearest
  // It uses haversine formula
  /*
  φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
  note that angles need to be in radians to pass to trig functions!
  */
  function nearestLocation(myLocation) {
    const R = 6371e3; // metres
    const startLocations = [];
    for (let i = 0; i < items.length; i++) {
      const φ1 = (myLocation.position.lat * Math.PI) / 180; // φ, λ in radians
      const φ2 = (items[i].position.long * Math.PI) / 180;
      const Δφ =
        ((items[i].position.lat - myLocation.position.lat) * Math.PI) / 180;
      const Δλ =
        ((items[i].position.long - myLocation.position.lng) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const d = R * c; // in metres

      startLocations.push({distance: d, startLocation: items[i].value});
    }

    const startLocation = startLocations.reduce(function (prev, curr) {
      return prev.distance < curr.distance ? prev : curr;
    });
    getRecommendations(startLocation.startLocation);
    getMyNextTravel();
  }

  // A função serve para receber as recomendacoes pelo simples pedido da procura de boleias que
  // se inciam no local onde estamos mais perto
  // o forEach serve unicamente para nao mostrar boleias criadas por nos
  async function getRecommendations(startLocation) {
    const recommendations = [];
    try {
      const response = await routes.get(
        '/routes/startLocation/' + startLocation,
      );
      if (response.data.length !== 0) {
        response.data.forEach(element => {
          if (element.userId !== JSON.parse(userId)) {
            recommendations.push(element);
          }
        });
      }
      if (recommendations.length !== 0) {
        setRecommendations(recommendations);
        setHasRecommendations(true);
      }
      getMyNextTravel();
    } catch (err) {
      getMyNextTravel();
      console.log(err);
    }
  }

  async function getMyNextTravel() {
    try {
      const response = await routes.get('/routes/user');
      if (response.data.lenght !== undefined) {
        setHasNextRide(true);
        setNextTravel(response.data);
      } else {
        setHasNextRide(false);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  function renderMyNextTravel() {
    return (
      <View>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 24,
            fontFamily: 'Arial',
            color: 'white',
            position: 'relative',
            fontWeight: '400',
            marginTop: 30,
          }}>
          {I18n.t('HOME_next_travel')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <FlatGrid
            data={nextTravel}
            horizontal
            style={{alignSelf: 'center', marginLeft: 15}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() =>
                  navigation.navigate('DestinationDetail', {
                    data: item,
                    allData: null,
                    endLocation: item.endLocation,
                  })
                }>
                <View
                  style={[
                    styles.nextTravelContainer,
                    {backgroundColor: 'white', marginRight: 10},
                  ]}>
                  <View>
                    <Text style={styles.itemName}>
                      {I18n.t('GERAL_start')} {item.startLocation}
                    </Text>
                    <Text style={styles.itemDate}>
                      {Moment(item.startDate).format('lll')}
                    </Text>
                    <Text style={styles.itemCode}>
                      {I18n.t('GERAL_time')} {item.estimatedTime}{' '}
                      {I18n.t('GERAL_minutes')}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.nextTravelContainer,
                    {backgroundColor: 'white', marginLeft: 10},
                  ]}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text style={{fontWeight: '400', fontSize: 20}}>End</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontWeight: '700', fontSize: 25}}>
                        {item.endLocation}
                      </Text>
                      <Image
                        alt="icon"
                        source={icons.end}
                        style={{
                          marginLeft: 5,
                          marginTop: 2,
                          width: 23,
                          height: 23,
                          tintColor: COLORS.primary,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }

  function renderDestinations() {
    return (
      <View>
        <Center>
          <View style={styles.search_field_container}>
            <GooglePlacesAutocomplete
              // ref="endlocation"
              placeholder="Where do you want to go?"
              minLength={5}
              returnKeyType={'search'}
              listViewDisplayed="auto"
              fetchDetails={true}
              onPress={(data, details) => {
                console.log(details.address_components[0].short_name);
                setStartLocation({
                  details: details.geometry.location,
                  name: details.address_components[0].short_name,
                });
              }}
              query={{
                key: env.googleKey,
                language: 'pt',
              }}
              styles={{
                textInputContainer: {
                  width: '100%',
                  backgroundColor: '#FFF',
                },
                listView: {
                  backgroundColor: '#FFF',
                },
              }}
              debounce={200}
            />
          </View>
          <View style={styles.search_field_container}>
            <GooglePlacesAutocomplete
              // ref="endlocation"
              placeholder="Where do you want to go?"
              minLength={5}
              returnKeyType={'search'}
              listViewDisplayed="auto"
              fetchDetails={true}
              onPress={(data, details) => {
                setEndLocation({
                  details: details.geometry.location,
                  name: details.address_components[0].short_name,
                });
              }}
              query={{
                key: env.googleKey,
                language: 'pt',
              }}
              styles={{
                textInputContainer: {
                  width: '100%',
                  backgroundColor: '#FFF',
                },
                listView: {
                  backgroundColor: '#FFF',
                },
              }}
              debounce={200}
            />
          </View>

          <ButtonNative
            iconRight
            onPress={() => searchRoutes()}
            containerStyle={{
              borderRadius: 30,
              bottom: 0,
              width: 150,
              zIndex: 3,
            }}
            icon={
              <Image
                alt="search"
                source={icons.search}
                style={{
                  marginLeft: 5,
                  width: 30,
                  height: 30,
                  tintColor: 'white',
                }}
              />
            }
            title={I18n.t('HOME_search')}
          />
        </Center>
      </View>
    );
  }

  const RecomCard = () => {
    return (
      <>
        <Text
          style={{
            marginLeft: 120,
            fontSize: 24,
            fontFamily: 'Arial',
            color: 'white',
            position: 'relative',
            fontWeight: '400',
            marginTop: 10,
            marginBottom: 5
          }}>
          {I18n.t('HOME_recommended')}
        </Text>
        <FlatList
          data={recommendations}
          renderItem={({item}) => {
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 1,
              }}
            />;
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DestinationDetail', {
                    data: item,
                    allData: null,
                    endLocation: item.endLocation,
                  })
                }>
                <View style={styles.cardContainer}>
                  <Image
                    alt="User Image"
                    style={styles.imageStyle}
                    source={{
                      uri:
                        item.userImage ||
                        'https://magazine.mafex.es/wp-content/uploads/2020/10/MaaS-general-650x381.jpg',
                    }}
                  />
                  <Text style={styles.itemName}>
                    {I18n.t('HOME_dropdown_placeholder_start')}
                    {item.startLocation}
                  </Text>
                  <Text style={styles.itemName}>
                    {I18n.t('HOME_dropdown_placeholder_end')}
                    {item.endLocation}
                  </Text>
                  <Text style={styles.itemDate}>
                    {Moment(item.startDate).format('lll')}
                  </Text>
                  <Text style={styles.itemCode}>
                    {I18n.t('GERAL_time') +
                      item.estimatedTime +
                      I18n.t('GERAL_minutes')}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </>
    );
  };

  function renderBody() {
    return (
      <View bgColor="blueGray.800" style={{flex: 1}}>
        {hasNextRide ? renderMyNextTravel() : renderDestinations()}
          {hasRecommendations ? <RecomCard /> : null}
      </View>
    );
  }

  function renderHeader() {
    return (
      <View bgColor="blueGray.800" style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 1,
            justifyContent: 'center',
          }}>
          <Image
            alt="menu"
            source={icons.menu}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 40,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 24, fontWeight: '400', color: 'white'}}>
            {I18n.t('HOME_title')}
          </Text>
        </View>
      </View>
    );
  }

  function renderActionButton() {
    return (
      <ActionButton
        buttonColor={COLORS.primary}
        onPress={() => navigation.navigate('CreateCarPooling')}
      />
    );
  }

  if (loading) {
    return (
      <SafeAreaView bgColor="blueGray.800" style={{flex: 1, height: '100%'}}>
        {renderHeader()}
        <ActivityIndicator bgColor="blueGray.800"
          size="large"
          color="white"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        />
      </SafeAreaView>
    );
  }
  return (
    <NativeBaseProvider>
      
        <SafeAreaView bgColor="blueGray.800" style={{flex: 1, height: '100%'}}>
          {renderHeader()}
          {renderBody()}
          {renderActionButton()}
        </SafeAreaView>
    </NativeBaseProvider>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const radius = 20;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  search_field_container: {
    height: 100,
    width: '80%',
    // position: 'absolute',

    zIndex: 1,
  },
  search_field_container2: {
    height: 100,
    width: device_width,
    // position: 'absolute',

    zIndex: 1,
  },
  input_container: {
    alignSelf: 'center',
    backgroundColor: '#FFF',
    opacity: 0.8,
    marginBottom: 5,
  },
  cardContainer: {
    flex: 1,
    width: deviceWidth - 25,
    backgroundColor: 'white',
    height: 220,
    borderRadius: radius,
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 10,
  },
  imageStyle: {
    height: 120,
    width: deviceWidth - 30,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
  },
  listView: {
    marginTop: 5,
    marginBottom: 5,
  },
  nextTravelContainer: {
    justifyContent: 'flex-start',
    borderRadius: 15,
    width: 170,
    padding: 20,
    height: 100,
  },
  itemContainer: {
    justifyContent: 'flex-start',
    borderRadius: 15,
    padding: 5,
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
export default HomeScreen;
