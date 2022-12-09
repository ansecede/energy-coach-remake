import React, { useState, useEffect, useContext } from 'react';
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
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  updateDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { increment, off, onValue, ref, set, update } from 'firebase/database';
import { screenHeight, screenWidth } from '../utils/Dimensions';
import { Slider, Icon } from '@rneui/themed';
import { AuthContext } from '../utils/AuthContext';

const HomeScreen = () => {
  const { currentUser } = useContext(AuthContext);

  const [controlAC, setControlAC] = useState([]);
  const [value, setValue] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [comfort, setComfort] = useState('');
  const [comfortStates, setComfortStates] = useState([
    'cold',
    'neutral',
    'warm',
  ]);

  // Para los botones on / off
  let [typeIconOn, setTypeOn] = useState('radio-button-off-sharp');
  let [typeIconOff, setTypeOff] = useState('radio-button-on-sharp');

  const left = ((value - 16) * (screenWidth - 33)) / 9;

  const setControl = async ac_value => {
    set(ref(rtdb, '/recomendation'), {
      rec: ac_value ? ac_value : controlAC,
    });
  };

  const incrementUserComfort = async value => {
    const comfortState = comfortStates[value];
    const dbRef = ref(rtdb, '/comfort');

    await update(dbRef, {
      [comfortState]: increment(1),
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

  useEffect(() => {
    const recomendatioRef = collection(fsdb, 'recomendations2');
    const q = query(recomendatioRef, orderBy('date', 'desc'), limit(1));
    const unsub = onSnapshot(q, querySnapshot => {
      querySnapshot.forEach(doc => {
        let item = doc.data();
        console.log('llego una recomendacion, ejecutando...');
        setControl(item.option);
      });
    });

    return () => unsub;
  }, []);

  const cases = [
    1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 24, 23, 22, 21, 20, 19, 18, 17, 16,
  ];
  const correspondingOutput = [
    22, 16, 17, 18, 19, 20, 21, 22, 23, 24, 11, 10, 9, 8, 7, 6, 5, 4, 3,
  ];

  const convertCode = valueToChange => {
    idx = cases.indexOf(valueToChange);
    return correspondingOutput[idx];
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}>
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
            <TouchableHighlight underlayColor="transparent" activeOpacity={0}>
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
                    setControl(1).then(r => console.log('se encendió AC'));
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
            <TouchableHighlight underlayColor="transparent" activeOpacity={0}>
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
                    setControl(2).then(r => console.log('se apagó AC'));
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
            Selecciona tu estado de confort:
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
              incrementUserComfort(0).then(setComfort('Frio'));
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
              incrementUserComfort(1).then(setComfort('Neutral'));
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
              incrementUserComfort(2).then(setComfort('Calor'));
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

export default HomeScreen;
