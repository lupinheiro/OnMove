import React, {useState} from 'react';
import {
  Text,
  FormControl,
  Input,
  Radio,
  Divider,
  Checkbox,
  Button,
} from 'native-base';
import {Alert} from 'react-native';
import {auth} from '../../services/api';
import I18n from '../../utils/language';
const Questions = ({state, setSelected, goBack}) => {
  const [formData, setData] = useState({});
  const [risk, setRisk] = useState('one');
  const [cardioIllness, setCardioIllness] = useState('0');
  const [heartAtack, setHeartAtack] = useState('0');
  const [smoke, setSmoke] = useState('0');
  const [colesterol, setColesterol] = useState('0');
  const [diabetes, setDiabetes] = useState('0');
  const [pressure, setPressure] = useState([]);
  const [activity, setActivity] = useState([]);
  const [balance, setBalance] = useState([]);
  const [cronicDesease, setCronicDesease] = useState('0');
  const [medication, setMedication] = useState('0');
  const [boneIllness, setBoneIllness] = useState('0');
  const [medicalSuvervision, setMedicalSupervision] = useState('0');
  const [artriteOrRelated, setArtriteOrRelated] = useState('0');
  const [artriteMeds, setArtiteMeds] = useState('0');
  const [articularProblems, setArticularProblems] = useState('0');
  const [injections, setInjections] = useState('0');
  const [cancer, setCancer] = useState('0');
  const [cancertType, setCancerType] = useState('0');
  const [cancerTreatment, setCancerTreatment] = useState('0');
  const [heartProblem, setHeartProblem] = useState('0');
  const [controllingHeartCondition, setControllingHeartCondition] =
    useState('0');
  const [irregularHeartStrokes, setIrregularHeartStrokes] = useState('0');
  const [insufficentCardiac, setInsufficientCardiac] = useState('0');
  const [activityCronicDesiese, setActivityCronicDesiese] = useState('0');
  const [highPressure, setHighPressure] = useState('0');
  const [highPressureMeds, setHighPressureMeds] = useState('0');
  const [highPressureRelaxed, setHighPressureRelaxed] = useState('0');
  const [metabolicProblem, setMetabolicProblem] = useState('0');
  const [hipoglicemy, setHipoglicemy] = useState('0');
  const [diabetesComplication, setDiabetesComplication] = useState('0');
  const [intenseExercise, setIntenseExercise] = useState('0');
  const [mentalIllness, setMentalIllness] = useState('0');
  const [mentalIllnessMeds, setMentalIllnessMeds] = useState('0');
  const [downSindrome, setDownSindrome] = useState('0');
  const [breathingIllness, setBreathingIllness] = useState('0');
  const [breathingIllnessMeds, setBreathingIllnessMeds] = useState('0');
  const [lowOxygen, setLowOxygen] = useState('0');
  const [asmatic, setAsmatic] = useState('0');
  const [highBloodPressure, setHighBloodPressure] = useState('0');
  const [spinal, setSpinal] = useState('0');
  const [spinalMeds, setSpinalMeds] = useState('0');
  const [lowBloodPressure, setLowBloodPressure] = useState('0');
  const [bloodPressureSurges, setBloodPressureSurges] = useState('0');
  const [stroke, setStroke] = useState('0');
  const [strokeMeds, setStrokeMeds] = useState('0');
  const [compromisedMobility, setCompromisedMobility] = useState('0');
  const [strokeOrMuscle, setStrokeOrMuscle] = useState('0');
  const [metabolicProblemMeds, setMetabolicProblemMeds] = useState('0');
  const [metabolicOther, setMetabolicOrOther] = useState('0');
  const [otherHealthProblems, setOtherHealtProblem] = useState('0');
  const [concussion, setConcussion] = useState('0');
  const [otherProblems, setOtherProblems] = useState('0');
  const [twoOrMoreProblems, setTwoOrMoreProblems] = useState('0');

  async function onSubmit() {
    try {
      await auth.post('/users/edit', {
        ...formData,
        risk,
        cardioIllness,
        heartAtack,
        smoke,
        colesterol,
        diabetes,
        pressure,
        activity,
        balance,
        cronicDesease,
        medication,
        boneIllness,
        medicalSuvervision,
        artriteOrRelated,
        artriteMeds,
        articularProblems,
        injections,
        cancer,
        cancertType,
        cancerTreatment,
        heartProblem,
        controllingHeartCondition,
        irregularHeartStrokes,
        insufficentCardiac,
        activityCronicDesiese,
        highPressure,
        highPressureMeds,
        highPressureRelaxed,
        metabolicProblem,
        hipoglicemy,
        diabetesComplication,
        intenseExercise,
        mentalIllness,
        mentalIllnessMeds,
        downSindrome,
        breathingIllness,
        breathingIllnessMeds,
        lowOxygen,
        asmatic,
        highBloodPressure,
        spinal,
        spinalMeds,
        lowBloodPressure,
        bloodPressureSurges,
        stroke,
        strokeMeds,
        compromisedMobility,
        strokeOrMuscle,
        metabolicProblemMeds,
        metabolicOther,
        otherHealthProblems,
        concussion,
        otherProblems,
      });
      Alert.alert(I18n.t('SETTINGS_success'));
      // navigation.navigate('Settings');
      goBack();
    } catch (err) {
      console.log(err);
      if (err.data.errors[0].message !== undefined) {
        Alert.alert(err.data.errors[0].message);
      } else {
        Alert.alert('SETTINGS_error');
      }
    }
  }
  return (
    <>
      {state === 1 && (
        <>
          <FormControl>
            <Text color="white">
              Gostaria de saber o seu risco cardiovascular?
            </Text>

            <Radio.Group
              key="1"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={risk}
              onChange={values => {
                setRisk(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
        </>
      )}
      {state === 2 && (
        <>
          <FormControl>
            <FormControl.Label>
              <Text color="white">
                Já teve alguma uma doença cardiovascular, respiratória ou
                metabólica?
              </Text>
            </FormControl.Label>

            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={cardioIllness}
              onChange={values => {
                setCardioIllness(values);
                setSelected(true);
              }}
              key="2">
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
              <Radio value="3" my={1}>
                <Text color="white">
                  Não sei o que são doenças cardiovasculares, respiratórias ou
                  metabólicas
                </Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {cardioIllness === '1' && (
            <>
              <Divider />
              <FormControl>
                <FormControl.Label>
                  <Text color="white" type="email" autoComplete="email">
                    Indique que doenças já teve (por exemplo: se teve um AVC,
                    escreva, AVC)
                  </Text>
                </FormControl.Label>
                <Input
                  key="3"
                  color="white"
                  placeholder="AVC, diabetes, etc"
                  onChangeText={value => {
                    setData({...formData, illness: value});
                    setSelected(true);
                  }}
                />
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 3 && (
        <>
          <FormControl>
            <FormControl.Label>
              <Text color="white">
                Algum dos seus familiares (pais ou irmãos) teve enfarte do
                miocárdio, ou foi submetido a revascularização coronária ou
                morte súbita antes dos 55 anos em familiares masculinos de 1º
                grau ou antes dos 65 em familiares femininos de 1º grau?
              </Text>
            </FormControl.Label>

            <Radio.Group
              key="4"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={heartAtack}
              onChange={values => {
                setHeartAtack(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
              <Radio value="3" my={1}>
                <Text color="white">Não sei</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
        </>
      )}
      {state === 4 && (
        <>
          <FormControl>
            <FormControl.Label>
              <Text color="white">É fumador?</Text>
            </FormControl.Label>

            <Radio.Group
              key="5"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={smoke}
              onChange={values => {
                setSmoke(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
        </>
      )}
      {state === 5 && (
        <>
          <FormControl>
            <Text color="white">
              {
                'Sofre de colesterol alto? (LDL≥130mg/dL, HDL<40mg/dL, medicação lipidica, colesterol total ≥200 mg/dL)'
              }
            </Text>

            <Radio.Group
              key="6"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={colesterol}
              onChange={values => {
                setColesterol(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
              <Radio value="3" my={1}>
                <Text color="white">Não sei</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
        </>
      )}
      {state === 6 && (
        <>
          <FormControl>
            <Text color="white">{'Sofre de diabetes? Ou Pre-diabetes?'}</Text>
            <Radio.Group
              key="7"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={diabetes}
              onChange={values => {
                setDiabetes(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
        </>
      )}
      {state === 7 && (
        <>
          <Text color="white">
            Já teve alguma uma doença cardiovascular, respiratória ou
            metabólica?
          </Text>
          <Checkbox.Group
            key="8"
            onChange={values => {
              setPressure(values);
              setSelected(true);
            }}
            accessibilityLabel="choose numbers"
            value={pressure}>
            <Checkbox value="1" my={1}>
              <Text color="white"> Sim, problema de coração </Text>
            </Checkbox>
            <Checkbox value="2" my={1}>
              <Text color="white"> Sim, pressão alta </Text>
            </Checkbox>
            <Checkbox value="3" my={1}>
              <Text color="white"> Não </Text>
            </Checkbox>
          </Checkbox.Group>
        </>
      )}
      {state === 8 && (
        <>
          <Text color="white">
            Sente dor no peito em repouso, ao fazer suas atividades cotidianas
            comuns OU ao praticar atividade física?
          </Text>
          <Checkbox.Group
            key="9"
            onChange={values => {
              setActivity(values);
              setSelected(true);
            }}
            accessibilityLabel="choose numbers"
            value={activity}>
            <Checkbox value="1" my={1}>
              <Text color="white"> Sim, atividades cotidianas comuns </Text>
            </Checkbox>
            <Checkbox value="2" my={1}>
              <Text color="white"> Sim, praticar atividade física </Text>
            </Checkbox>
            <Checkbox value="3" my={1}>
              <Text color="white"> Não </Text>
            </Checkbox>
          </Checkbox.Group>
        </>
      )}
      {state === 9 && (
        <>
          <Text color="white">
            Perde o equilíbrio devido a tontura OU ficou inconsciente nos
            últimos 12 meses?
          </Text>
          <Checkbox.Group
            key="10"
            onChange={values => {
              setBalance(values);
              setSelected(true);
            }}
            value={balance}
            accessibilityLabel="choose numbers">
            <Checkbox value="1" my={1}>
              <Text color="white"> Sim, devido a tontura </Text>
            </Checkbox>
            <Checkbox value="2" my={1}>
              <Text color="white"> Sim, fiquei inconsciente </Text>
            </Checkbox>
            <Checkbox value="3" my={1}>
              <Text color="white">
                Não - se sua tontura estiver associada a respiração rápida e/ou
                profunda (inclusive durante exercícios intensos)
              </Text>
            </Checkbox>
          </Checkbox.Group>
        </>
      )}
      {state === 10 && (
        <>
          <FormControl>
            <Text color="white">
              {
                'Foi diagnosticado com alguma outra condição crônica de saúde (que não seja pressão alta ou doença cardíaca)'
              }
            </Text>
            <Radio.Group
              key="11"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={cronicDesease}
              onChange={values => {
                setCronicDesease(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {cronicDesease === '1' && (
            <>
              <Divider />
              <FormControl>
                <FormControl.Label>
                  <Text color="white" type="email" autoComplete="email">
                    Indique a doença
                  </Text>
                </FormControl.Label>
                <Input
                  key="12"
                  color="white"
                  placeholder=""
                  onChangeText={value => {
                    setData({...formData, cronicIllness: value});
                    setSelected(true);
                  }}
                />
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 11 && (
        <>
          <FormControl>
            <Text color="white">
              {
                'Eesta a tomar medicamentos prescritos pelo médico para uma condição crônica de saúde'
              }
            </Text>
            <Radio.Group
              key="13"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={medication}
              onChange={values => {
                setMedication(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>

          {medication === '1' && (
            <>
              <FormControl>
                <FormControl.Label>
                  <Text color="white" type="email" autoComplete="email">
                    Liste os medicamentos
                  </Text>
                </FormControl.Label>
                <Input
                  color="white"
                  placeholder=""
                  onChangeText={value => {
                    setData({...formData, medications: value});
                    setSelected(true);
                  }}
                  key="14"
                />
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 12 && (
        <>
          <FormControl>
            <Text color="white">
              {
                'Atualmente tem (ou teve nos últimos 12 meses) um problema ósseo ou articular ou de tecido mole (músculo, ligamento ou tendão) que se poderia agravar se se tornasse mais ativo fisicamente?'
              }
            </Text>
            <Radio.Group
              key="15"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={boneIllness}
              onChange={values => {
                setBoneIllness(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {boneIllness === '1' && (
            <>
              <Divider />
              <FormControl>
                <FormControl.Label>
                  <Text color="white" type="email" autoComplete="email">
                    Liste as condições
                  </Text>
                </FormControl.Label>
                <Input
                  color="white"
                  placeholder=""
                  onChangeText={value => {
                    setData({...formData, boneIllnessList: value});
                    setSelected(true);
                  }}
                  key="16"
                />
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 13 && (
        <>
          <FormControl>
            <Text color="white">
              {
                'O médico alguma vez lhe disse que só deveria fazer atividade física sob supervisão médica?'
              }
            </Text>
            <Radio.Group
              key="17"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={medicalSuvervision}
              onChange={values => {
                setMedicalSupervision(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
        </>
      )}
      {state === 14 && (
        <>
          <FormControl>
            <Text color="white">
              {'Tem artrite, osteoporose ou problemas na coluna?'}
            </Text>
            <Radio.Group
              key="18"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={artriteOrRelated}
              onChange={values => {
                setArtriteOrRelated(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {artriteOrRelated === '1' && (
            <>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Tem dificuldade em controlar a sua condição com medicamentos ou outros tratamentos prescritos por médicos? (Responda NÃO se não estiver a tomar medicamentos ou a fazer outros tratamentos no momento)'
                  }
                </Text>
                <Radio.Group
                  key="19"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={artriteMeds}
                  onChange={values => {
                    setArtiteMeds(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Tem problemas articulares que causam dor, uma fratura recente ou fratura causada por osteoporose ou cancro, vertebra deslocada, (como espondilolistese) e/ou espondilólise/defeito de pares interarticulares (fratura do anel ósseo na parte posterior da coluna vertebral)?'
                  }
                </Text>
                <Radio.Group
                  key="20"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={articularProblems}
                  onChange={values => {
                    setArticularProblems(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Recebeu injeções de esteroides ou tomou comprimidos de esteroides regularmente por mais de 3 meses?'
                  }
                </Text>
                <Radio.Group
                  key="21"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={injections}
                  onChange={values => {
                    setInjections(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 15 && (
        <>
          <FormControl>
            <Text color="white">{'Tem algum tipo de cancro?'}</Text>
            <Radio.Group
              key="22"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={cancer}
              onChange={values => {
                setCancer(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {cancer === '1' && (
            <>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'O seu diagnóstico de cancro inclui algum destes tipos: pulmão/broncogénico, mieloma múltiplo (cancro de células plasmáticas), cabeça e/ou pescoço? '
                  }
                </Text>
                <Radio.Group
                  key="23"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={cancertType}
                  onChange={values => {
                    setCancerType(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Está a receber tratamento para o cancro (como quimioterapia ou radioterapia)?'
                  }
                </Text>
                <Radio.Group
                  key="24"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={cancerTreatment}
                  onChange={values => {
                    setCancerTreatment(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 16 && (
        <>
          <FormControl>
            <Text color="white">
              {
                'Tem algum problema cardíaco ou cardiovascular? Isto inclui doença arterial coronariana, insuficiência cardíaca, anormalidade do ritmo cardíaco?'
              }
            </Text>
            <Radio.Group
              key="25"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={heartProblem}
              onChange={values => {
                setHeartProblem(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {heartProblem === '1' && (
            <>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Tem dificuldade em controlar a sua condição com medicamentos ou outros tratamentos prescritos por médicos? (Responda NÃO se não estiver a tomar medicamentos ou a fazer outros tratamentos no momento) '
                  }
                </Text>
                <Radio.Group
                  key="26"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={controllingHeartCondition}
                  onChange={values => {
                    setControllingHeartCondition(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Tem batimentos cardíacos irregulares que requerem acompanhamento médico (como fibrilação arterial, contração ventricular prematura)?'
                  }
                </Text>
                <Radio.Group
                  key="27"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={irregularHeartStrokes}
                  onChange={values => {
                    setIrregularHeartStrokes(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl>
                <Text color="white">
                  {'Tem insuficiência cardíaca crónica?'}
                </Text>
                <Radio.Group
                  key="28"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={insufficentCardiac}
                  onChange={values => {
                    setInsufficientCardiac(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Foi diagnosticado com doença coronária (cardiovascular) e não praticou atividades físicas regulares nos últimos 2 meses?'
                  }
                </Text>
                <Radio.Group
                  key="28"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={activityCronicDesiese}
                  onChange={values => {
                    setActivityCronicDesiese(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 17 && (
        <>
          <FormControl>
            <Text color="white">{'Tem pressão alta?'}</Text>
            <Radio.Group
              key="29"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={highPressure}
              onChange={values => {
                setHighPressure(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {highPressure === '1' && (
            <>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Tem dificuldade em controlar a sua condição com medicamentos ou outros tratamentos prescritos por médicos(Responda NÃO se não estiver a tomar medicamentos ou a fazer outros tratamentos no momento)'
                  }
                </Text>
                <Radio.Group
                  key="30"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={highPressureMeds}
                  onChange={values => {
                    setHighPressureMeds(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Tem pressão arterial em repouso igual ou superior a 160/90 mmHg com ou sem medicação? (Responda SIM se não souber a sua pressão arterial em repouso)'
                  }
                </Text>
                <Radio.Group
                  key="31"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={highPressureRelaxed}
                  onChange={values => {
                    setHighPressureRelaxed(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 18 && (
        <>
          <FormControl>
            <Text color="white">
              {
                'Tem algum problema metabólico? Isto inclui diabetes tipo 1, diabetes tipo 2, pré-diabetes'
              }
            </Text>
            <Radio.Group
              key="32"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={metabolicProblem}
              onChange={values => {
                setMetabolicProblem(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>

          {metabolicProblem === '1' && (
            <>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Costuma ter dificuldade em controlar os níveis de açúcar no sangue com a alimentação, com medicamentos, ou com outros tratamentos prescritos por médicos?'
                  }
                </Text>
                <Radio.Group
                  key="33"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={metabolicProblemMeds}
                  onChange={values => {
                    setMetabolicProblemMeds(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>

              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Costuma ter sinais e sintomas de pouco açúcar no sangue (hipoglicemia) após exercícios e/ou durante atividades cotidianas? Sinais de hipoglicemia podem incluir tremores, nervosismo, irritabilidade fora do comum, transpiração excessiva, tontura, confusão mental, dificuldade para falar, fraqueza ou sonolência.'
                  }
                </Text>
                <Radio.Group
                  key="34"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={hipoglicemy}
                  onChange={values => {
                    setHipoglicemy(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Tem algum sinal ou sintoma de complicações do diabetes, como doença cardíaca ou vascular e/ou complicações que afetem os olhos, rins OU perda de sensibilidade nos pés e dedos dos pés?'
                  }
                </Text>
                <Radio.Group
                  key="35"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={diabetesComplication}
                  onChange={values => {
                    setDiabetesComplication(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Tem outros problemas metabólicos (como diabetes gestacional, doença renal crônica ou problemas no fígado?)'
                  }
                </Text>
                <Radio.Group
                  key="36"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={metabolicOther}
                  onChange={values => {
                    setMetabolicOrOther(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl>
                <Text color="white">
                  {
                    'Planeia fazer, num futuro próximo, exercícios que para si são mais intensos ou vigorosos?'
                  }
                </Text>
                <Radio.Group
                  key="37"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={intenseExercise}
                  onChange={values => {
                    setIntenseExercise(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 19 && (
        <>
          <FormControl>
            <Text color="white">
              {
                'Tem problemas de saúde mental ou dificuldade de aprendizagem? Isto inclui Alzheimer, transtorno de ansiedade, depressão, demência, transtorno alimentar, transtorno psicótico, disfunção intelectual, síndrome de Down '
              }
            </Text>
            <Radio.Group
              key="38"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={mentalIllness}
              onChange={values => {
                setMentalIllness(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {mentalIllness === '1' && (
            <>
              <Divider />
              <FormControl key="100">
                <Text color="white">
                  {
                    'Tem dificuldade em controlar a sua condição com medicamentos ou outros tratamentos prescritos por médicos? (Responda NÃO se não estiver a tomar medicamentos ou a fazer outros tratamentos no momento)'
                  }
                </Text>
                <Radio.Group
                  key="39"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={mentalIllnessMeds}
                  onChange={values => {
                    setMentalIllnessMeds(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl key="101">
                <Text color="white">
                  {
                    'Tem síndrome de Down ou problemas da coluna que afetam nervos no músculos?'
                  }
                </Text>
                <Radio.Group
                  key="40"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={downSindrome}
                  onChange={values => {
                    setDownSindrome(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 20 && (
        <>
          <FormControl key="102">
            <Text color="white">
              {
                'Tem alguma doença respiratória? Isto inclui doença pulmonar obstrutiva crónica, asma, hipertensão arterial pulmonar '
              }
            </Text>
            <Radio.Group
              key="41"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={breathingIllness}
              onChange={values => {
                setBreathingIllness(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {breathingIllness === '1' && (
            <>
              <Divider />
              <FormControl key="103">
                <Text color="white">
                  {
                    'Tem dificuldade em controlar a sua condição com medicamentos ou outros tratamentos prescritos por médicos? (Responda NÃO se não estiver a tomar medicamentos ou a fazer outros tratamentos no momento)'
                  }
                </Text>
                <Radio.Group
                  key="42"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={breathingIllnessMeds}
                  onChange={values => {
                    setBreathingIllnessMeds(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl key="104">
                <Text color="white">
                  {
                    'O médico alguma vez disse que tem baixos níveis de oxigênio no sangue em repouso ou durante exercício e/ou que precisa de terapia de oxigênio suplementar?'
                  }
                </Text>
                <Radio.Group
                  key="43"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={lowOxygen}
                  onChange={values => {
                    setLowOxygen(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl key="105">
                <Text color="white">
                  {
                    'Se é asmático e apresenta sintomas como sensação de aperto no peito, respiração sibilante, dificuldade em respirar, tosse constante (mais de 2 dias/semana) ou usou sua medição de resgate mais 2 vezes na ultima semana?'
                  }
                </Text>
                <Radio.Group
                  key="44"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={asmatic}
                  onChange={values => {
                    setAsmatic(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl key="106">
                <Text color="white">
                  {
                    'O médico alguma vez disse que tem pressão alta nos vasos sanguíneos dos pulmões?'
                  }
                </Text>
                <Radio.Group
                  key="45"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={highBloodPressure}
                  onChange={values => {
                    setHighBloodPressure(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 21 && (
        <>
          <FormControl key="107">
            <Text color="white">
              {
                'Tem alguma lesão na medula espinhal? Isto inclui tetraplegia e paraplegia?'
              }
            </Text>
            <Radio.Group
              key="46"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={spinal}
              onChange={values => {
                setSpinal(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {spinal === '1' && (
            <>
              <Divider />
              <FormControl key="108">
                <Text color="white">
                  {
                    'Tem dificuldade em controlar a sua condição com medicamentos ou outros tratamentos prescritos por médicos? (Responda NÃO se não estiver a tomar medicamentos ou a fazer outros tratamentos no momento) '
                  }
                </Text>
                <Radio.Group
                  key="47"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={spinalMeds}
                  onChange={values => {
                    setSpinalMeds(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl key="109">
                <Text color="white">
                  {
                    'Costuma apresentar pressão arterial baixa em repouso a ponto de causar tonturas e/ou desmaios?'
                  }
                </Text>
                <Radio.Group
                  key="48"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={lowBloodPressure}
                  onChange={values => {
                    setLowBloodPressure(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl key="109">
                <Text color="white">
                  {
                    'O médico alguma vez mencionou que apresenta surtos repentinos de pressão arterial (reconhecidos como disreflexia autonômica)'
                  }
                </Text>
                <Radio.Group
                  key="48"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={bloodPressureSurges}
                  onChange={values => {
                    setBloodPressureSurges(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 22 && (
        <>
          <FormControl key="110">
            <Text color="white">
              {
                'Já teve derrame cerebral? Isto inclui ataque isquémico transitório ou acidente vascular cerebral '
              }
            </Text>
            <Radio.Group
              key="49"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={stroke}
              onChange={values => {
                setStroke(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {stroke === '1' && (
            <>
              <Divider />
              <FormControl key="111">
                <Text color="white">
                  {
                    'Tem dificuldade em controlar a sua condição com medicamentos ou outros tratamentos prescritos por médicos? (Responda NÃO se não estiver a tomar medicamentos ou a fazer outros tratamentos no momento)'
                  }
                </Text>
                <Radio.Group
                  key="50"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={strokeMeds}
                  onChange={values => {
                    setStrokeMeds(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl key="112">
                <Text color="white">
                  {'Tem dificuldade para caminhar ou mobilidade comprometida?'}
                </Text>
                <Radio.Group
                  key="51"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={compromisedMobility}
                  onChange={values => {
                    setCompromisedMobility(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl key="113">
                <Text color="white">
                  {
                    'Sofreu algum derrame ou teve comprometimento nos nervos ou músculos nos últimos 6 meses?'
                  }
                </Text>
                <Radio.Group
                  key="52"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={strokeOrMuscle}
                  onChange={values => {
                    setStrokeOrMuscle(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 23 && (
        <>
          <FormControl key="114">
            <Text color="white">
              {
                'Tem qualquer outro problema de saúde não listado acima, ou tem dois ou mais problemas de saúde?'
              }
            </Text>
            <Radio.Group
              key="53"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={otherHealthProblems}
              onChange={values => {
                setOtherHealtProblem(values);
                setSelected(true);
              }}>
              <Radio value="1" my={1}>
                <Text color="white">Sim</Text>
              </Radio>
              <Radio value="2" my={1}>
                <Text color="white">Não</Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          {otherHealthProblems === '1' && (
            <>
              <Divider />
              <FormControl key="115">
                <Text color="white">
                  {
                    'Sofreu de escurecimento de visão, desmaio ou perda de consciência como resultado de lesão na cabeça nos últimos 12 meses OU teve uma concussão cerebral diagnosticada nos últimos 12 meses?'
                  }
                </Text>
                <Radio.Group
                  key="54"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={concussion}
                  onChange={values => {
                    setConcussion(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl key="115">
                <Text color="white">
                  {
                    'Tem um problema de saúde que não está listada (como epilepsia, problemas neurológicos, problemas renais)'
                  }
                </Text>
                <Radio.Group
                  key="54"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={otherProblems}
                  onChange={values => {
                    setOtherProblems(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              <Divider />
              <FormControl key="115">
                <Text color="white">
                  {'Tem atualmente dois ou mais problemas de saúde?'}
                </Text>
                <Radio.Group
                  key="54"
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={twoOrMoreProblems}
                  onChange={values => {
                    setTwoOrMoreProblems(values);
                    setSelected(true);
                  }}>
                  <Radio value="1" my={1}>
                    <Text color="white">Sim</Text>
                  </Radio>
                  <Radio value="2" my={1}>
                    <Text color="white">Não</Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
            </>
          )}
        </>
      )}
      {state === 24 && (
        <Button onPress={onSubmit}>
          <Text>{I18n.t('SEND')}</Text>
        </Button>
      )}
    </>
  );
};

export default Questions;
