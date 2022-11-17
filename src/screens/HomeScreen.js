import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fsdb, rtdb } from '../config/firebase';
import {
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { off, onValue, ref, set } from 'firebase/database';
import { screenHeight, screenWidth } from '../utils/Dimensions';
import { Slider, Icon } from '@rneui/themed';
import FormButton from '../utils/FormButton';

const HomeScreen = () => {
  const [controlAC, setControlAC] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [comfort, setComfort] = useState('');

  // Para los botones on off
  let [typeIconOn, setTypeOn] = useState('radio-button-off-sharp');
  let [typeIconOff, setTypeOff] = useState('radio-button-on-sharp');

  const left = ((value - 16) * (screenWidth - 33)) / 9;

  const setControl = async ac_value => {
    set(ref(rtdb, '/recomendation'), {
      rec: ac_value ? ac_value : controlAC,
    });
  };

  const setUserComfort = async value => {
    set(ref(rtdb, '/comfort'), {
      value: value,
    });
  };

  useEffect(() => {
    const recomendation = ref(rtdb, '/recomendation/rec');
    let listener = onValue(recomendation, snapshot => {
      setTemperature(snapshot.val());
    });
    // Stop listening for updates when no longer required
    return () => off(recomendation, listener);
  }, []);

  const addComfort = (level, code) => {
    const current_date = new Date();
    addDoc(collection(fsdb, 'Comfort'), {
      comfortLevel: level,
      comfortCode: code,
      date: current_date,
    }).then(() => {
      console.log('Comfort added!');
    });
  };

  const aceptedRecommendation = number => {
    //1 aceptado 0 rechazado
    const current_date = new Date();
    addDoc(collection(fsdb, 'AcceptedRecommendations'), {
      accepted: number,
      date: current_date,
    });
  };

  useEffect(() => {
    const recomendatioRef = collection(fsdb, 'recommendations');
    const q = query(recomendatioRef, orderBy('datetime', 'desc'), limit(1));
    const unsub = onSnapshot(q, querySnapshot => {
      console.log('snapshot', querySnapshot);
      querySnapshot.docs.map(function (doc) {
        let item = doc.data();
        // let option = item.option;
        setControlAC(item.option);
        console.log('llego una recomendacion');
        setModalVisible(true);
      });
    });

    return () => unsub;
  }, []);

  let cases = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  ];

  let matchingChanged_value = [
    22, 0, 16, 17, 18, 19, 20, 21, 22, 23, 24, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ];
  let rec_n_energy = [
    { recomendation: 'Encender AC', energy: '0%' },
    { recomendation: 'Apagar AC', energy: '10%' },
    { recomendation: 'Cambiar temperatura a 16º', energy: '5%' },
    { recomendation: 'Cambiar temperatura a 17º', energy: '0%' },
    { recomendation: 'Cambiar temperatura a 18º', energy: '0%' },
    { recomendation: 'Cambiar temperatura a 19º', energy: '0%' },
    { recomendation: 'Cambiar temperatura a 20º', energy: '0%' },
    { recomendation: 'Cambiar temperatura a 21º', energy: '0%' },
    { recomendation: 'Cambiar temperatura a 22º', energy: '0%' },
    { recomendation: 'Cambiar temperatura a 23º', energy: '0%' },
    { recomendation: 'Cambiar temperatura a 24º', energy: '0%' },
    { recomendation: 'Mantener estadoº', energy: '0%' },
  ];

  const convertCode = value_to_change => {
    let changed_value;
    changed_value = matchingChanged_value[cases.indexOf(value_to_change)];
    return changed_value;
  };

  let recommendation = 'Cambiar temperatura a 17º';
  // recommendation = rec_n_energy[cases.indexOf(controlAC)]['recomendation'];
  let energy_saving = '0%';
  // energy_saving = rec_n_energy[cases.indexOf(controlAC)]['energy'];

  return (
    // Modal o pop up de notificación
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text
                style={{
                  color: '#295675',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {' '}
                Recomendacion Pendiente
              </Text>
            </View>
            <View
              style={{
                //flex: 1,
                // justifyContent: "space-between",
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: 300,
                height: '15%',
                borderWidth: 2.5,
                borderColor: '#52ADEB',
                borderRadius: 10,
                margin: 20,
              }}>
              <Text>{recommendation}</Text>
            </View>
            <View
              style={{
                width: '80%',
                height: '42%',
                borderWidth: 2.5,
                borderStyle: 'solid',
                borderColor: '#52ADEB',
                borderRadius: 10,
                margin: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  height: 100,
                  justifyContent: 'space-evenly',
                  borderBottomWidth: 2,
                  borderBottomColor: '#52ADEB',
                  margin: 20,
                }}>
                <View
                  style={{
                    flex: 0.4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Edificio 16A</Text>
                </View>
                <View
                  style={{
                    flex: 0.4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Lab de Sistemas Telemáticos</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{}}>Ahorro Energético esperado</Text>
                <Text style={{ fontSize: 30, padding: 10, color: '#295675' }}>
                  {energy_saving}
                </Text>
              </View>
              <View style={styles.container}>
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonTitle="Aceptar"
                    onPress={() => {
                      setControl().then(r => console.log('se envió control'));
                      setModalVisible(!modalVisible);
                      aceptedRecommendation(1);
                    }}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonTitle="Rechazar"
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      aceptedRecommendation(0);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* PANTALLA PRINCIPAL */}
      <>
        <View
          style={{
            flex: 0.75,
            width: '100%',
            height: '60%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* Icono copo_nieve, Texto Temp y temperatura actual */}
          <View style={{ marginTop: 20 }}>
            <Ionicons name="snow-sharp" size={140} color="#2faeea" />
            <Text
              style={{
                paddingTop: 10,
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                color: 'black',
              }}>
              Temp:
            </Text>
            <Text
              style={{
                paddingTop: 10,
                fontWeight: 'bold',
                fontSize: 40,
                textAlign: 'center',
                color: 'black',
              }}>
              {convertCode(temperature)
                ? convertCode(temperature) + 'ºC'
                : 'OFF'}
            </Text>
          </View>
          {/* Botones ON y OFF */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 10,
            }}>
            <TouchableHighlight
              onPress={() =>
                setControl(1).then(r => console.log('se encendió AC'))
              }
              underlayColor="transparent"
              activeOpacity={0}>
              <View
                style={{
                  flex: 1,
                  marginRight: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  onPress={() => {
                    if (typeIconOn === 'radio-button-off-sharp') {
                      setTypeOn('radio-button-on-sharp');
                      setTypeOff('radio-button-off-sharp');
                    }
                  }}
                  style={{ paddingLeft: 7, height: '90%' }}
                  name={typeIconOn}
                  size={80}
                  color="#2faeea"
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  ON
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() =>
                setControl(2).then(r => console.log('se apagó AC'))
              }
              underlayColor="transparent"
              activeOpacity={0}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  onPress={() => {
                    if (typeIconOff === 'radio-button-off-sharp') {
                      setTypeOff('radio-button-on-sharp');
                      setTypeOn('radio-button-off-sharp');
                    }
                  }}
                  style={{ paddingLeft: 5, height: '90%' }}
                  name={typeIconOff}
                  size={80}
                  color="#2faeea"
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  OFF
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        {/* Slidebar */}
        <View
          style={{
            paddingLeft: 30,
            paddingRight: 30,
          }}>
          <Text
            style={{
              width: 20,
              textAlign: 'center',
              left: left,
              color: 'black',
              paddingBottom: 0,
              fontWeight: 'bold',
            }}>
            {value}
          </Text>
          <Slider
            value={value}
            onValueChange={setValue}
            maximumValue={24}
            minimumValue={16}
            step={1}
            onSlidingComplete={value => {
              let codeAC = convertCode(value);
              setControl(codeAC).then(console.log('se cambió temp a:', value));
            }}
            allowTouchTrack
            trackStyle={{ height: 5, backgroundColor: 'transparent' }}
            thumbStyle={{
              height: 20,
              width: 20,
              backgroundColor: 'transparent',
            }}
            thumbProps={{
              children: (
                <Icon
                  name="circle"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
                  color="#2faeea"
                />
              ),
            }}
          />
        </View>
        {/* Iconos finales para eleccion del confort */}
        <View
          style={{
            marginTop: 10,
            alignItem: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
              fontSize: 20,
            }}>
            Estado de confort: {comfort}
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            alignItem: 'center',
            justifyContent: 'center',
          }}>
          {/* Frio */}
          <TouchableHighlight
            onPress={() => {
              setUserComfort(0).then(setComfort('Frio'));
              addComfort('Cold', '0');
            }}
            underlayColor="transparent"
            activeOpacity={0}>
            <View style={{ flex: 1, margin: 20 }}>
              <Ionicons name="snow-outline" size={80} color="#2faeea" />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                FRIO
              </Text>
            </View>
          </TouchableHighlight>
          {/* Neutral */}
          <TouchableHighlight
            onPress={() => {
              setUserComfort(1).then(setComfort('Neutral'));
              addComfort('Neutral', '1');
            }}
            underlayColor="transparent"
            activeOpacity={0}>
            <View style={{ flex: 1, margin: 20 }}>
              <Ionicons name="happy-outline" size={80} color="#D4AC0D" />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                NEUTRAL
              </Text>
            </View>
          </TouchableHighlight>
          {/* Calor */}
          <TouchableHighlight
            onPress={() => {
              setUserComfort(2).then(setComfort('Calor'));
              addComfort('Hot', '2');
            }}
            underlayColor="transparent"
            activeOpacity={0}>
            <View style={{ flex: 1, margin: 20 }}>
              <Ionicons name="flame" size={80} color="#E67E22" />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                CALOR
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '125%',
    alignSelf: 'flex-start',
    marginTop: 60,
  },
  buttonContainer: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  contentView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  button: {
    marginTop: 10,
    width: '95%',
    //height: windowHeight / 5,
    backgroundColor: '#32A9E9',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
  },
});

export default HomeScreen;