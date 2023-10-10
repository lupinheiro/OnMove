import React, {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Box,
  Heading,
  Center,
  NativeBaseProvider,
  Button,
  Stack,
  KeyboardAvoidingView,
  Divider,
  View,
  Image,
  Text,
  ScrollView,
  FormControl,
  Checkbox,
  Progress,
} from 'native-base';
import Questions from './Questions';
import {icons, SIZES} from '../../constants/index';
import I18n from '../../utils/language';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(55, 71, 79)',
  },
  image: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
  },
  view: {flexDirection: 'row', height: 40, backgroundColor: 'white'},
  touchable: {
    backgroundColor: 'white',
    width: 50,
    paddingLeft: SIZES.padding * 1,
    justifyContent: 'center',
  },
  view_2: {
    paddingTop: 10,
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
    paddingTop: 5,

    fontSize: 24,
    fontWeight: '400',
  },
});
const Survey = ({navigation}) => {
  const [showQuestion, setShowQuestion] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(false);
  const maxQuestions = 24;
  console.log(navigation);
  const goBack = () => {
    navigation.navigate('Settings');
  };
  const renderHeader = () => {
    return (
      <View style={styles.view} key="94">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.touchable}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={styles.image}
            alt="menu"
          />
        </TouchableOpacity>
        <View style={styles.view_2} key="93">
          <Text style={styles.text_settings}>
            {I18n.t('SETTINGS_survey_tittle')}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <NativeBaseProvider key="999">
      <View style={styles.container} key="92">
        {renderHeader()}
        <ScrollView h="100%" key="95">
          <KeyboardAvoidingView
            key="96"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Center w="100%">
              <Box safeArea p="2" py="2" w="97%">
                <Heading
                  size="lg"
                  fontWeight="600"
                  color="white"
                  _dark={{
                    color: 'warmGray.50',
                  }}>
                  {I18n.t('SETTINGS_survey')}
                </Heading>
                <Text />
                <Progress
                  value={(showQuestion / maxQuestions) * 100}
                  mx="4"
                  colorScheme="emerald"
                />
                <Text />
                {showQuestion === 0 && (
                  <>
                    <Text color="white" type="email" autoComplete="email">
                      Declaração de Consentimento Informado Eu, ao aceitar a
                      opção “Sim, aceito e tenho conhecimento do que me será
                      pedido e para que serve." fui informado de que o Estudo de
                      Investigação acima mencionado se destina a medir os níveis
                      de atividade física do universo do Politécnico do Porto e
                      do Instituto Politécnico de Viana do Castelo. Sei que
                      neste estudo está prevista a realização de questionários
                      tendo-me sido explicado em que consistem e quais os seus
                      possíveis efeitos. Foi-me garantido que todos os dados
                      relativos à identificação dos participantes neste estudo
                      são confidenciais e que será mantido o anonimato. Sei que
                      posso recusar-me a participar ou interromper a qualquer
                      momento a participação no estudo, sem nenhum tipo de
                      penalização por este facto. Compreendi a informação que me
                      foi dada, tive oportunidade de fazer perguntas e as minhas
                      dúvidas foram esclarecidas. Aceito participar de livre
                      vontade no estudo acima mencionado. Também autorizo a
                      divulgação dos resultados obtidos no meio científico,
                      garantindo o anonimato. Nome do Investigador e Contacto:
                      Andreia Sofia Pinheiro de Sousa, asp@ess.ipp.pt
                    </Text>

                    <FormControl>
                      <FormControl.Label>
                        <Text color="white">
                          Declaração de Consentimento Informado
                        </Text>
                      </FormControl.Label>

                      <Checkbox
                        accessibilityLabel="choose numbers"
                        onChange={() => {
                          setSelectedQuestion(!selectedQuestion);
                        }}
                        value={selectedQuestion ? 'true' : 'false'}>
                        <Text color="white">Aceito</Text>
                      </Checkbox>
                    </FormControl>
                  </>
                )}

                {showQuestion > 0 && (
                  <Questions
                    state={showQuestion}
                    key="99"
                    goBack={goBack}
                    setSelected={setSelectedQuestion}
                  />
                )}
              </Box>
            </Center>
          </KeyboardAvoidingView>
        </ScrollView>
        <Divider />
        <Center>
          <Stack direction="row" mb="2.5" mt="1.5" space={3} key="321S">
            <Button
              onPress={() => {
                setShowQuestion(showQuestion - 1);
              }}
              key="98"
              mt="2"
              colorScheme="indigo"
              disabled={showQuestion < 1}>
              {I18n.t('BUTTON_previous')}
            </Button>
            <Button
              onPress={() => {
                setShowQuestion(showQuestion + 1);
                setSelectedQuestion(false);
              }}
              key="97"
              mt="2"
              disabled={!selectedQuestion}
              colorScheme="indigo">
              {I18n.t('BUTTON_next')}
            </Button>
          </Stack>
        </Center>
      </View>
    </NativeBaseProvider>
  );
};

export default Survey;
