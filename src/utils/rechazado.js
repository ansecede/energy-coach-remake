// const aceptedRecommendation = async number => {
//   //1 aceptado 0 rechazado
//   const flag = true ? number == 1 : false;
//   const recomendatioRef = collection(fsdb, 'recomendations2');
//   const q = query(recomendatioRef, orderBy('date', 'desc'), limit(1));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach(doc =>
//     updateDoc(doc.ref, {
//       acceptedRecomendations: flag,
//     }),
//   );
// };

{
  /*<Modal animationType="slide" transparent={true} visible={modalVisible}>
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
              // Flex para poner la ubicacion horizontalmente
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
                // Linea divisora
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
              // Ahorro energetico
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
            </View>
          </View>
        </View>
      </Modal> */
  // function Prueba() {
  //   return (
  //     <View
  //       style={{
  //         width: '100%',
  //         height: '100%',
  //         backgroundColor: '#FFFFFF',
  //       }}>
  //       {/* PANTALLA PRINCIPAL */}
  //       <>
  //         <View
  //           style={{
  //             flex: 0.75,
  //             width: '100%',
  //             height: '60%',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}>
  //           {/* Icono copo_nieve, Texto Temp y temperatura actual */}
  //           <View style={{ marginTop: 20 }}>
  //             <Ionicons name="snow-sharp" size={140} color="#2faeea" />
  //             <Text
  //               style={{
  //                 paddingTop: 10,
  //                 fontWeight: 'bold',
  //                 fontSize: 20,
  //                 textAlign: 'center',
  //                 color: 'black',
  //               }}>
  //               Temp:
  //             </Text>
  //             <Text
  //               style={{
  //                 paddingTop: 10,
  //                 fontWeight: 'bold',
  //                 fontSize: 40,
  //                 textAlign: 'center',
  //                 color: 'black',
  //               }}>
  //               {convertCode(temperature)
  //                 ? convertCode(temperature) + 'ºC'
  //                 : 'OFF'}
  //             </Text>
  //           </View>
  //           {/* Botones ON y OFF */}
  //           <View
  //             style={{
  //               flex: 1,
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //               paddingTop: 10,
  //             }}>
  //             <TouchableHighlight underlayColor="transparent" activeOpacity={0}>
  //               <View
  //                 style={{
  //                   flex: 1,
  //                   marginRight: 50,
  //                   justifyContent: 'center',
  //                   alignItems: 'center',
  //                 }}>
  //                 <Ionicons
  //                   onPress={() => {
  //                     if (typeIconOn === 'radio-button-off-sharp') {
  //                       setTypeOn('radio-button-on-sharp');
  //                       setTypeOff('radio-button-off-sharp');
  //                     }
  //                     setRec(1).then(r => console.log('se encendió AC'));
  //                     setTemperature(0);
  //                     setSliderDisabled(false);
  //                   }}
  //                   style={{ paddingLeft: 7, height: '90%' }}
  //                   name={typeIconOn}
  //                   size={80}
  //                   color="#2faeea"
  //                 />
  //                 <Text
  //                   style={{
  //                     fontWeight: 'bold',
  //                     color: 'black',
  //                     textAlign: 'center',
  //                   }}>
  //                   ON
  //                 </Text>
  //               </View>
  //             </TouchableHighlight>
  //             <TouchableHighlight underlayColor="transparent" activeOpacity={0}>
  //               <View
  //                 style={{
  //                   flex: 1,
  //                   justifyContent: 'center',
  //                   alignItems: 'center',
  //                 }}>
  //                 <Ionicons
  //                   onPress={() => {
  //                     if (typeIconOff === 'radio-button-off-sharp') {
  //                       setTypeOff('radio-button-on-sharp');
  //                       setTypeOn('radio-button-off-sharp');
  //                     }
  //                     setRec(2).then(r => console.log('se apagó AC'));
  //                     setSliderDisabled(true);
  //                   }}
  //                   style={{ paddingLeft: 5, height: '90%' }}
  //                   name={typeIconOff}
  //                   size={80}
  //                   color="#2faeea"
  //                 />
  //                 <Text
  //                   style={{
  //                     fontWeight: 'bold',
  //                     color: 'black',
  //                     textAlign: 'center',
  //                   }}>
  //                   OFF
  //                 </Text>
  //               </View>
  //             </TouchableHighlight>
  //           </View>
  //         </View>
  //         {/* Slidebar */}
  //         <View
  //           style={{
  //             paddingLeft: 30,
  //             paddingRight: 30,
  //           }}>
  //           <Text
  //             style={{
  //               width: 20,
  //               textAlign: 'center',
  //               left: left,
  //               color: 'black',
  //               paddingBottom: 0,
  //               fontWeight: 'bold',
  //             }}>
  //             {value}
  //           </Text>
  //           <Slider
  //             value={value}
  //             onValueChange={setValue}
  //             maximumValue={24}
  //             minimumValue={16}
  //             step={1}
  //             onSlidingComplete={displayedTempSlider => {
  //               let recCode = convertCode(displayedTempSlider);
  //               setRec(recCode).then(console.log('se cambió temp a:', value));
  //             }}
  //             allowTouchTrack={!sliderDisabled}
  //             disabled={sliderDisabled}
  //             trackStyle={{ height: 5, backgroundColor: 'transparent' }}
  //             thumbStyle={{
  //               height: 20,
  //               width: 20,
  //               backgroundColor: 'transparent',
  //             }}
  //             thumbProps={{
  //               children: (
  //                 <Icon
  //                   name="circle"
  //                   type="font-awesome"
  //                   size={20}
  //                   reverse
  //                   containerStyle={{ bottom: 20, right: 20 }}
  //                   color="#2faeea"
  //                 />
  //               ),
  //             }}
  //           />
  //         </View>
  //         {/* Iconos finales para eleccion del confort */}
  //         <View
  //           style={{
  //             marginTop: 10,
  //             alignItem: 'center',
  //             justifyContent: 'center',
  //           }}>
  //           <Text
  //             style={{
  //               fontWeight: 'bold',
  //               color: 'black',
  //               textAlign: 'center',
  //               fontSize: 20,
  //             }}>
  //             Selecciona tu estado de confort:
  //           </Text>
  //         </View>
  //         <View
  //           style={{
  //             flex: 0.3,
  //             flexDirection: 'row',
  //             alignItem: 'center',
  //             justifyContent: 'center',
  //           }}>
  //           {/* Frio */}
  //           <TouchableHighlight
  //             onPress={() => {
  //               incrementUserComfort(0);
  //             }}
  //             underlayColor="transparent"
  //             activeOpacity={0}>
  //             <View style={{ flex: 1, margin: 20 }}>
  //               <Ionicons name="snow-outline" size={80} color="#2faeea" />
  //               <Text
  //                 style={{
  //                   fontWeight: 'bold',
  //                   color: 'black',
  //                   textAlign: 'center',
  //                 }}>
  //                 FRIO
  //               </Text>
  //             </View>
  //           </TouchableHighlight>
  //           {/* Neutral */}
  //           <TouchableHighlight
  //             onPress={() => {
  //               incrementUserComfort(1);
  //             }}
  //             underlayColor="transparent"
  //             activeOpacity={0}>
  //             <View style={{ flex: 1, margin: 20 }}>
  //               <Ionicons name="happy-outline" size={80} color="#D4AC0D" />
  //               <Text
  //                 style={{
  //                   fontWeight: 'bold',
  //                   color: 'black',
  //                   textAlign: 'center',
  //                 }}>
  //                 NEUTRAL
  //               </Text>
  //             </View>
  //           </TouchableHighlight>
  //           {/* Calor */}
  //           <TouchableHighlight
  //             onPress={() => {
  //               incrementUserComfort(2);
  //             }}
  //             underlayColor="transparent"
  //             activeOpacity={0}>
  //             <View style={{ flex: 1, margin: 20 }}>
  //               <Ionicons name="flame" size={80} color="#E67E22" />
  //               <Text
  //                 style={{
  //                   fontWeight: 'bold',
  //                   color: 'black',
  //                   textAlign: 'center',
  //                 }}>
  //                 CALOR
  //               </Text>
  //             </View>
  //           </TouchableHighlight>
  //         </View>
  //       </>
  //     </View>
  //   );
  // }
}

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
