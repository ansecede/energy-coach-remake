import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { auth } from '../config/firebase';
import { AuthContext } from '../utils/AuthContext';
import { screenWidth } from '../utils/Dimensions';
import FormButton from '../utils/FormButton';
import { signOut } from 'firebase/auth';

const ProfileScreen = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <View
      style={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
      <View style={styles.container}>
        <View style={styles.header} />
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg',
          }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{currentUser.email}</Text>
            <Text style={styles.info}>Administrador</Text>
            <Text style={styles.description}>
              Esta app permite tomar decisiones para incrementar el ahorro
              energético en tu edificio sin afectar tu confort!
            </Text>
            {/* Estas dos etiquetas se pueden alimentar de la app de registro IoT de Espol */}
            <Text style={styles.description}>Edificio: 11C</Text>
            <Text style={styles.description}>
              Sala: Laboratorio de Sistemas Telematicos
            </Text>
            <FormButton
              buttonTitle="Log out"
              onPress={async () => {
                // TODO: Validar que los campos esten llenos
                // TODO: Autenticacion
                await signOut(auth);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#57c4ea',
    height: 350,
    width: screenWidth,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 280,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});

export default ProfileScreen;
