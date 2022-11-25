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
  doc,
  setDoc,
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

  // const prueba = async number => {
  //   const current_date = new Date();
  //   await setDoc(doc(fsdb, 'CollectionPrueba', 'Poninmalta'), {
  //     number: number,
  //     date: current_date,
  //     flag: 'por fin se puedo',
  //   });
  // };

  const aceptedRecommendation = number => {
    //1 aceptado 0 rechazado
    const current_date = new Date();
    addDoc(collection(fsdb, 'AcceptedRecommendations'), {
      accepted: number,
      date: current_date,
    });
  };

  useEffect(() => {
    const recomendatioRef = collection(fsdb, 'recomendations');
    const q = query(recomendatioRef, orderBy('datetime', 'desc'), limit(1));
    const unsub = onSnapshot(q, querySnapshot => {
      console.log('snapshot', querySnapshot);
      querySnapshot.forEach(doc => {
        let item = doc.data();
        // let option = item.option;
        setControlAC(item.option);
        console.log('llego una recomendacion');
        setModalVisible(true);
      });
    });

    return () => unsub;
  }, []);

  const convertCode = value_to_change => {
    let changed_value;
    switch (value_to_change) {
      case 1:
        changed_value = 22;
        break;
      case 3:
        changed_value = 16;
        break;
      case 4:
        changed_value = 17;
        break;
      case 5:
        changed_value = 18;
        break;
      case 6:
        changed_value = 19;
        break;
      case 7:
        changed_value = 20;
        break;
      case 8:
        changed_value = 21;
        break;
      case 9:
        changed_value = 22;
        break;
      case 10:
        changed_value = 23;
        break;
      case 11:
        changed_value = 24;
        break;
      case 24:
        changed_value = 11;
        break;
      case 23:
        changed_value = 10;
        break;
      case 22:
        changed_value = 9;
        break;
      case 21:
        changed_value = 8;
        break;
      case 20:
        changed_value = 7;
        break;
      case 19:
        changed_value = 6;
        break;
      case 18:
        changed_value = 5;
        break;
      case 17:
        changed_value = 4;
        break;
      case 16:
        changed_value = 3;
        break;
    }
    return changed_value;
  };

  let recommendation = '';
  let energy_saving = '';

  switch (controlAC) {
    case 1:
      recommendation = 'Encender AC';
      energy_saving = '0%';
      break;
    case 2:
      recommendation = 'Apagar AC';
      energy_saving = '10%';
      break;
    case 3:
      recommendation = 'Cambiar temperatura a 16º';
      energy_saving = '5%';
      break;
    case 4:
      recommendation = 'Cambiar temperatura a 17º';
      energy_saving = '0%';
      break;
    case 5:
      recommendation = 'Cambiar temperatura a 18º';
      energy_saving = '0%';
      break;
    case 6:
      recommendation = 'Cambiar temperatura a 19º';
      energy_saving = '0%';
      break;
    case 7:
      recommendation = 'Cambiar temperatura a 20º';
      energy_saving = '0%';
      break;
    case 8:
      recommendation = 'Cambiar temperatura a 21º';
      energy_saving = '0%';
      break;
    case 9:
      recommendation = 'Cambiar temperatura a 22º';
      energy_saving = '0%';
      break;
    case 10:
      recommendation = 'Cambiar temperatura a 23º';
      energy_saving = '0%';
      break;
    case 11:
      recommendation = 'Cambiar temperatura a 24º';
      energy_saving = '0%';
      break;
    case 11:
      recommendation = 'Mantener estadoº';
      energy_saving = '0%';
      break;
  }

  return (
    // Modal o pop up de notificación
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              height: '80%',
              aspectRatio: 1 / 1.2,
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
            }}>
            <View style={{ marginBottom: 20 }}>
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
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                aspectRatio: 6 / 1,
                borderWidth: 2.5,
                borderStyle: 'solid',
                borderColor: '#52ADEB',
                borderRadius: 10,
                marginTop: 10,
              }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>
                {recommendation}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 175 / 1,
                borderWidth: 2.5,
                borderStyle: 'solid',
                borderColor: '#52ADEB',
                borderRadius: 10,
                marginTop: 30,
                marginBottom: 30,
              }}>
              {/* Flex para poner la ubicacion horizontalmente */}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: '50%',
                  justifyContent: 'space-evenly',
                  borderBottomWidth: 2,
                  borderBottomColor: '#52ADEB',
                }}>
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'black' }}>Edificio 16A</Text>
                </View>
                {/* Linea divisora */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: 1.5,
                    height: '70%',
                    backgroundColor: 'gray',
                  }}></View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'black' }}>
                    Lab. de Sistemas Telemáticos
                  </Text>
                </View>
              </View>
              {/* Ahorro energetico */}
              <View
                style={{
                  width: '100%',
                  height: '50%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>
                  Ahorro Energético esperado:
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 30,
                    padding: 5,
                    color: '#295675',
                  }}>
                  {energy_saving}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  width: '100%',
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    width: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FormButton
                    buttonTitle="Aceptar"
                    onPress={() => {
                      setControl().then(r => console.log('se envió control'));
                      setModalVisible(!modalVisible);
                      aceptedRecommendation(1);
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FormButton
                    buttonTitle="Rechazar"
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      aceptedRecommendation(0);
                    }}
                  />
                </View>
              </View>
              {/* <View>
                <View>
                  <FormButton
                    buttonTitle="Aceptar"
                    // onPress={() => {
                    //   setControl().then(r => console.log('se envió control'));
                    //   setModalVisible(!modalVisible);
                    //   aceptedRecommendation(1);
                    // }}
                  />
                </View>
                <View>
                  <FormButton
                    buttonTitle="Rechazar"
                    // onPress={() => {
                    //   setModalVisible(!modalVisible);
                    //   aceptedRecommendation(0);
                    // }}
                  />
                </View>
              </View> */}
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '125%',
//     alignSelf: 'flex-start',
//     marginTop: 60,
//   },
//   buttonContainer: {
//     width: '55%',
//     aspectRatio: 2 / 1,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   contentView: {
//     padding: 20,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'stretch',
//   },
//   button: {
//     marginTop: 10,
//     width: '95%',
//     //height: windowHeight / 5,
//     backgroundColor: '#32A9E9',
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     fontFamily: 'Lato-Regular',
//   },
// });

export default HomeScreen;
