import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fsdb, rtdb } from '../config/firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { increment, off, onValue, ref, set, update } from 'firebase/database';
import { screenHeight, screenWidth } from '../utils/Dimensions';
import { Slider, Icon } from '@rneui/themed';
import { AuthContext } from '../utils/AuthContext';
import EStyleSheet from 'react-native-extended-stylesheet';

const HomeScreen = () => {
  const { currentUser } = useContext(AuthContext);

  const [value, setValue] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [sliderDisabled, setSliderDisabled] = useState(false);
  const comfortStates = ['cold', 'neutral', 'warm'];

  // Para los botones on / off
  let [typeIconOn, setTypeOn] = useState('radio-button-off-sharp');
  let [typeIconOff, setTypeOff] = useState('radio-button-on-sharp');

  const left = ((value - 16) * (screenWidth - 33)) / 9;

  const setRec = async ac_value => {
    set(ref(rtdb, '/recomendation'), {
      rec: ac_value ? ac_value : controlAC,
    });
  };

  // const getRec = async ac_value => {
  //   set(ref(rtdb, '/recomendation'), {
  //     rec: ac_value ? ac_value : controlAC,
  //   });
  // };

  const incrementUserComfort = async value => {
    let comfortState = comfortStates[value];
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
        setRec(item.option);
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
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
      }}>
      <>
        {/* Icono copo_nieve */}
        <View
          style={{
            width: '29%',
            height: '20%',

            alignItems: 'center',
            justifyContent: 'center',
            marginTop: screenHeight * 0.025,
          }}>
          <Ionicons name="snow-sharp" size={120} color="#2faeea" />
        </View>
        {/*  Texto Temp */}
        <View
          style={{
            width: '50%',
            height: '5%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: screenHeight * 0.01,
          }}>
          <Text style={styles.title_text}>Temperatura del AC: </Text>
        </View>
        {/* Temperatura actual */}
        <View
          style={{
            width: '50%',
            height: '7%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: screenHeight * 0.01,
          }}>
          <Text style={styles.display_text}>
            {' '}
            {convertCode(temperature)
              ? convertCode(temperature) + 'ºC'
              : 'OFF'}{' '}
          </Text>
        </View>
        {/* Contenedor horizontal para botones  */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '15%',
            width: '50%',
          }}>
          {/* Boton ON */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <TouchableHighlight
              underlayColor="transparent"
              activeOpacity={0}
              style={{
                height: '77%',
              }}>
              <Ionicons
                onPress={() => {
                  if (typeIconOn === 'radio-button-off-sharp') {
                    setTypeOn('radio-button-on-sharp');
                    setTypeOff('radio-button-off-sharp');
                  }
                  setRec(1).then(r => console.log('se encendió AC'));
                  setTemperature(0);
                  setSliderDisabled(false);
                }}
                name={typeIconOn}
                size={80}
                color="#2faeea"
              />
            </TouchableHighlight>
            <View style={styles.caption_container}>
              <Text style={styles.caption_text}>ON</Text>
            </View>
          </View>
          {/* Boton OFF */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <TouchableHighlight
              underlayColor="transparent"
              activeOpacity={0}
              style={{
                height: '77%',
              }}>
              <Ionicons
                onPress={() => {
                  if (typeIconOff === 'radio-button-off-sharp') {
                    setTypeOff('radio-button-on-sharp');
                    setTypeOn('radio-button-off-sharp');
                  }
                  setRec(2).then(r => console.log('se apagó AC'));
                  setSliderDisabled(true);
                }}
                name={typeIconOff}
                size={80}
                color="#2faeea"
              />
            </TouchableHighlight>
            <View style={styles.caption_container}>
              <Text style={styles.caption_text}>OFF</Text>
            </View>
          </View>
        </View>
        {/* Slidebar */}
        <View
          style={{
            marginTop: screenHeight * 0.015,
            width: '90%',
            height: '10%',
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
            onSlidingComplete={displayedTempSlider => {
              let recCode = convertCode(displayedTempSlider);
              setRec(recCode).then(console.log('se cambió temp a:', value));
            }}
            allowTouchTrack={!sliderDisabled}
            disabled={sliderDisabled}
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
        {/* TEXTO: Selecciona tu estado de confort: */}
        <View style={{}}>
          <Text style={styles.title_text}>
            Selecciona tu estado de confort:
          </Text>
        </View>
        {/* Iconos finales para eleccion del comfort */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '15%',
            width: '80%',
            marginTop: screenHeight * 0.02,
          }}>
          {/* Frio */}
          <View style={styles.button_text_container}>
            <TouchableHighlight
              onPress={() => {
                incrementUserComfort(0);
              }}
              underlayColor="transparent"
              activeOpacity={0}>
              <Ionicons name="snow-outline" size={80} color="#2faeea" />
            </TouchableHighlight>
            <View style={styles.caption_container}>
              <Text style={styles.caption_text}>FRIO</Text>
            </View>
          </View>
          {/* Neutral */}
          <View style={styles.button_text_container}>
            <TouchableHighlight
              onPress={() => {
                incrementUserComfort(1);
              }}
              underlayColor="transparent"
              activeOpacity={0}>
              <Ionicons name="happy-outline" size={80} color="#D4AC0D" />
            </TouchableHighlight>
            <View style={styles.caption_container}>
              <Text style={styles.caption_text}>NEUTRAL</Text>
            </View>
          </View>
          {/* Calor */}
          <View style={styles.button_text_container}>
            <TouchableHighlight
              onPress={() => {
                incrementUserComfort(2);
              }}
              underlayColor="transparent"
              activeOpacity={0}>
              <Ionicons name="flame" size={80} color="#E67E22" />
            </TouchableHighlight>
            <View style={styles.caption_container}>
              <Text style={styles.caption_text}>CALOR</Text>
            </View>
          </View>
        </View>
      </>
    </View>
  );
};

EStyleSheet.build({
  $rem: screenWidth > 340 ? 18 : 16,
});

const styles = EStyleSheet.create({
  title_text: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'black',
  },
  display_text: {
    fontSize: '2.1rem',
    fontWeight: 'bold',
    color: 'black',
  },
  caption_text: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: 'black',
  },
  caption_container: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text_container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default HomeScreen;
