import React, {useState, useEffect} from 'react';
import {NativeModules} from 'react-native';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {View, Button, Center, Container, ScrollView, Stack} from 'native-base';
import {BarChart, ProgressChart} from 'react-native-chart-kit';
import {icons, SIZES} from '../constants/index';
import I18n from '../utils/language';

const {RecommendationsManager} = NativeModules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(55, 71, 79)',
  },
  image: {
    width: 30,
    height: 30,
  },
  view: {flexDirection: 'row', height: 40, alignItems: 'center'},
  touchable: {
    width: 50,
    paddingLeft: SIZES.padding * 1,
    justifyContent: 'center',
  },
  view_2: {
    borderRadius: 10,
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
    fontSize: 8,
    color: 'white',
    textAlign: 'justify',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  button: {
    justifyContent: 'space-around',
    margin: 10,
    alignItems: 'center',
  },
  row2: {flexDirection: 'row'},
});

const Statistics = ({navigation}) => {
  const [mets, setMets] = useState(null);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    RecommendationsManager.ReadAllWeeklyReportsFromDBIntoReactNative(result => {
      setMets(result);
      setLength(result.length - 1);
      setIndex(result.length - 1);
      setLoading(false);
    });
  }, []);

  const renderHeader = () => {
    return (
      <View style={styles.view} bgColor="blueGray.800">
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
          <Text style={styles.text_settings}>{I18n.t('STATISTICS_title')}</Text>
        </View>
      </View>
    );
  };

  const next = () => {
    if (index < length) {
      setIndex(index + 1);
    }
  };
  const previous = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    // if mets is not populated yet, do not render anything
    !loading && (
      <View style={styles.container}>
        <ScrollView>
          {renderHeader()}
          <View style={styles.row} bgColor="black">
            <ProgressChart
              data={{
                labels: ['Baixa', 'Mod.', 'Vig.'],

                data: [
                  !mets[index - 6]
                    ? 0
                    : mets[index - 6].metsIntBaixaPercentage /
                      (mets[index - 6].metsIntBaixaPercentage +
                        mets[index - 6].metsIntModeradaPercentage +
                        mets[index - 6].metsIntVigorosaPercentage || 1),
                  !mets[index - 6]
                    ? 0
                    : mets[index - 6].metsIntModeradaPercentage /
                      (mets[index - 6].metsIntBaixaPercentage +
                        mets[index - 6].metsIntModeradaPercentage +
                        mets[index - 6].metsIntVigorosaPercentage || 1),
                  !mets[index - 6]
                    ? 0
                    : mets[index - 6].metsIntVigorosaPercentage /
                      (mets[index - 6].metsIntBaixaPercentage +
                        mets[index - 6].metsIntModeradaPercentage +
                        mets[index - 6].metsIntVigorosaPercentage || 1),
                ],
              }}
              width={
                Dimensions.get('window').width -
                0.8571 * Dimensions.get('window').width
              } // from react-native
              height={100}
              strokeWidth={4}
              radius={6}
              chartConfig={{
                backgroundColor: '#030308',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              hideLegend={true}
            />

            <ProgressChart
              data={{
                labels: ['Baixa', 'Mod.', 'Vig.'],

                data: [
                  !mets[index - 5]
                    ? 0
                    : mets[index - 5].metsIntBaixaPercentage /
                      (mets[index - 5].metsIntBaixaPercentage +
                        mets[index - 5].metsIntModeradaPercentage +
                        mets[index - 5].metsIntVigorosaPercentage || 1),
                  !mets[index - 5]
                    ? 0
                    : mets[index - 5].metsIntModeradaPercentage /
                      (mets[index - 5].metsIntBaixaPercentage +
                        mets[index - 5].metsIntModeradaPercentage +
                        mets[index - 5].metsIntVigorosaPercentage || 1),
                  !mets[index - 5]
                    ? 0
                    : mets[index - 5].metsIntVigorosaPercentage /
                      (mets[index - 5].metsIntBaixaPercentage +
                        mets[index - 5].metsIntModeradaPercentage +
                        mets[index - 5].metsIntVigorosaPercentage || 1),
                ],
              }}
              width={
                Dimensions.get('window').width -
                0.8571 * Dimensions.get('window').width
              } // from react-native
              height={100}
              strokeWidth={4}
              radius={6}
              chartConfig={{
                backgroundColor: '#030308',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              hideLegend={true}
            />
            <ProgressChart
              data={{
                labels: ['Baixa', 'Mod.', 'Vig.'],

                data: [
                  !mets[index - 4]
                    ? 0
                    : mets[index - 4].metsIntBaixaPercentage /
                      (mets[index - 4].metsIntBaixaPercentage +
                        mets[index - 4].metsIntModeradaPercentage +
                        mets[index - 4].metsIntVigorosaPercentage || 1),
                  !mets[index - 4]
                    ? 0
                    : mets[index - 4].metsIntModeradaPercentage /
                      (mets[index - 4].metsIntBaixaPercentage +
                        mets[index - 4].metsIntModeradaPercentage +
                        mets[index - 4].metsIntVigorosaPercentage || 1),
                  !mets[index - 4]
                    ? 0
                    : mets[index - 4].metsIntVigorosaPercentage /
                      (mets[index - 4].metsIntBaixaPercentage +
                        mets[index - 4].metsIntModeradaPercentage +
                        mets[index - 4].metsIntVigorosaPercentage || 1),
                ],
              }}
              width={
                Dimensions.get('window').width -
                0.8571 * Dimensions.get('window').width
              } // from react-native
              height={100}
              strokeWidth={4}
              radius={6}
              chartConfig={{
                backgroundColor: '#030308',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              hideLegend={true}
            />
            <ProgressChart
              data={{
                labels: ['Baixa', 'Mod.', 'Vig.'],

                data: [
                  !mets[index - 3]
                    ? 0
                    : mets[index - 3].metsIntBaixaPercentage /
                      (mets[index - 3].metsIntBaixaPercentage +
                        mets[index - 3].metsIntModeradaPercentage +
                        mets[index - 3].metsIntVigorosaPercentage || 1),
                  !mets[index - 3]
                    ? 0
                    : mets[index - 3].metsIntModeradaPercentage /
                      (mets[index - 3].metsIntBaixaPercentage +
                        mets[index - 3].metsIntModeradaPercentage +
                        mets[index - 3].metsIntVigorosaPercentage || 1),
                  !mets[index - 3]
                    ? 0
                    : mets[index - 3].metsIntVigorosaPercentage /
                      (mets[index - 3].metsIntBaixaPercentage +
                        mets[index - 3].metsIntModeradaPercentage +
                        mets[index - 3].metsIntVigorosaPercentage || 1),
                ],
              }}
              width={
                Dimensions.get('window').width -
                0.8571 * Dimensions.get('window').width
              } // from react-native
              height={100}
              strokeWidth={4}
              radius={6}
              chartConfig={{
                backgroundColor: '#030308',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              hideLegend={true}
            />
            <ProgressChart
              data={{
                labels: ['Baixa', 'Mod.', 'Vig.'],

                data: [
                  !mets[index - 2]
                    ? 0
                    : mets[index - 2].metsIntBaixaPercentage /
                      (mets[index - 2].metsIntBaixaPercentage +
                        mets[index - 2].metsIntModeradaPercentage +
                        mets[index - 2].metsIntVigorosaPercentage || 1),
                  !mets[index - 2]
                    ? 0
                    : mets[index - 2].metsIntModeradaPercentage /
                      (mets[index - 2].metsIntBaixaPercentage +
                        mets[index - 2].metsIntModeradaPercentage +
                        mets[index - 2].metsIntVigorosaPercentage || 1),
                  !mets[index - 2]
                    ? 0
                    : mets[index - 2].metsIntVigorosaPercentage /
                      (mets[index - 2].metsIntBaixaPercentage +
                        mets[index - 2].metsIntModeradaPercentage +
                        mets[index - 2].metsIntVigorosaPercentage || 1),
                ],
              }}
              width={
                Dimensions.get('window').width -
                0.8571 * Dimensions.get('window').width
              } // from react-native
              height={100}
              strokeWidth={4}
              radius={6}
              chartConfig={{
                backgroundColor: '#030308',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              hideLegend={true}
            />
            <ProgressChart
              data={{
                labels: ['Baixa', 'Mod.', 'Vig.'],

                data: [
                  !mets[index - 1]
                    ? 0
                    : mets[index - 1].metsIntBaixaPercentage /
                      (mets[index - 1].metsIntBaixaPercentage +
                        mets[index - 1].metsIntModeradaPercentage +
                        mets[index - 1].metsIntVigorosaPercentage || 1),
                  !mets[index - 1]
                    ? 0
                    : mets[index - 1].metsIntModeradaPercentage /
                      (mets[index - 1].metsIntBaixaPercentage +
                        mets[index - 1].metsIntModeradaPercentage +
                        mets[index - 1].metsIntVigorosaPercentage || 1),
                  !mets[index - 1]
                    ? 0
                    : mets[index - 1].metsIntVigorosaPercentage /
                      (mets[index - 1].metsIntBaixaPercentage +
                        mets[index - 1].metsIntModeradaPercentage +
                        mets[index - 1].metsIntVigorosaPercentage || 1),
                ],
              }}
              width={
                Dimensions.get('window').width -
                0.8571 * Dimensions.get('window').width
              } // from react-native
              height={100}
              strokeWidth={4}
              radius={6}
              chartConfig={{
                backgroundColor: '#030308',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              hideLegend={true}
            />

            <ProgressChart
              data={{
                labels: ['Baixa', 'Mod.', 'Vig.'],

                data: [
                  mets[index]
                    ? mets[index].metsIntBaixaPercentage /
                      (mets[index].metsIntBaixaPercentage +
                        mets[index].metsIntModeradaPercentage +
                        mets[index].metsIntVigorosaPercentage || 1)
                    : 0,
                  mets[index]
                    ? mets[index].metsIntModeradaPercentage /
                      (mets[index].metsIntBaixaPercentage +
                        mets[index].metsIntModeradaPercentage +
                        mets[index].metsIntVigorosaPercentage || 1)
                    : 0,
                  mets[index]
                    ? mets[index].metsIntVigorosaPercentage /
                      (mets[index].metsIntBaixaPercentage +
                        mets[index].metsIntModeradaPercentage +
                        mets[index].metsIntVigorosaPercentage || 1)
                    : 0,
                ],
              }}
              width={
                Dimensions.get('window').width -
                0.8571 * Dimensions.get('window').width
              } // from react-native
              height={100}
              strokeWidth={4}
              radius={6}
              chartConfig={{
                backgroundColor: '#030308',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              hideLegend={true}
            />
          </View>
          <Center bgColor="black">
            <Container>
              <View>
                <Text style={styles.text_settings}>
                  {I18n.t('STATISTICS_mets')}
                </Text>

                <ProgressChart
                  data={{
                    labels: ['Baixa', 'Mod.', 'Vig.'],

                    data: [
                      mets[index]
                        ? mets[index].metsIntBaixaPercentage /
                          (mets[index].metsIntBaixaPercentage +
                            mets[index].metsIntModeradaPercentage +
                            mets[index].metsIntVigorosaPercentage || 1)
                        : 0,
                      mets[index]
                        ? mets[index].metsIntModeradaPercentage /
                          (mets[index].metsIntBaixaPercentage +
                            mets[index].metsIntModeradaPercentage +
                            mets[index].metsIntVigorosaPercentage || 1)
                        : 0,
                      mets[index]
                        ? mets[index].metsIntVigorosaPercentage /
                          (mets[index].metsIntBaixaPercentage +
                            mets[index].metsIntModeradaPercentage +
                            mets[index].metsIntVigorosaPercentage || 1)
                        : 0,
                    ],
                  }}
                  width={Dimensions.get('window').width - 80} // from react-native
                  height={220}
                  strokeWidth={16}
                  radius={30}
                  chartConfig={{
                    backgroundColor: '#030308',
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    strokeWidth: 2, // optional, default 3
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false, // optional
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#ffa726',
                    },
                  }}
                  hideLegend={false}
                />
              </View>
              <View style={{margin: 10}}>
                <Text style={styles.text_settings}>
                  {I18n.t('STATISTICS_dayly_activity')}
                </Text>
                <BarChart
                  data={{
                    labels: ['Parado', 'Caminhar', 'Correr', 'Bicicleta'],
                    datasets: [
                      {
                        data: [
                          mets[index] ? mets[index].amountTimeStillMinute : 0,
                          mets[index] ? mets[index].amountTimeWalkingMinute : 0,
                          mets[index] ? mets[index].amountTimeRunningMinute : 0,
                          mets[index]
                            ? mets[index].amountTimeOnBicycleMinute
                            : 0,
                        ],
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width - 80} // from react-native
                  height={250}
                  // yAxisSuffix=" min"
                  verticalLabelRotation={10}
                  chartConfig={{
                    backgroundColor: '#030308',
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    strokeWidth: 2, // optional, default 3
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false, // optional
                    propsForDots: {
                      r: '1',
                      strokeWidth: '2',
                      stroke: '#ffa726',
                    },
                  }}
                  showValuesOnTopOfBars
                  style={{
                    // borderColor: '#FFFFFF',
                    // borderWidth: 1,
                    marginVertical: 16,
                    borderRadius: 16,
                  }}
                />
              </View>
              <View style={styles.row} alignContent="center">
                <Center>
                  <Stack direction="row" mb="2.5" mt="1.5" space={3}>
                    <Button
                      style={styles.button}
                      onPress={() => previous()}
                      disabled={index > 0 ? false : true}>
                      {I18n.t('BUTTON_previous')}
                    </Button>

                    <Button
                      style={styles.button}
                      onPress={() => next()}
                      disabled={index < mets.length - 1 ? false : true}>
                      {I18n.t('BUTTON_next')}
                    </Button>
                  </Stack>
                </Center>
              </View>
            </Container>
          </Center>
        </ScrollView>
      </View>
    )
  );
};

export default Statistics;
