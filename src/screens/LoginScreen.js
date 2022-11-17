import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import FormButton from '../utils/FormButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { AuthContext } from '../utils/AuthContext';

const LoginScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // TODO: editar esta funcion para que cuadre
  const _doSingIn = async (email, password) => {
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      if (response && response.user) {
        Alert.alert('Success ✅', 'Authenticated successfully');
      }
    } catch (e) {
      Alert.alert('Denied ⛔', 'User or password are incorrect');
      console.error(e.message);
    }
  };

  if (!currentUser) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF',
        }}>
        <View style={{ margin: 20 }}>
          <Icon name="leaf-sharp" size={90} color="green" />
        </View>
        <View style={{ margin: 20, alignItems: 'flex-start' }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'Lato-Regular',
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'left',
            }}>
            Sign In
          </Text>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'left',
            alignItems: 'flex-start',
          }}>
          Email
        </Text>
        <View
          style={{
            padding: 2,
            width: '60%',
            fontFamily: 'Lato-Regular',
            margin: 10,
          }}>
          <TextInput
            placeholder={'Username'}
            placeholderTextColor="gray"
            value={userName}
            onChangeText={userName => setUserName(userName)}
            style={{
              borderColor: 'grey',
              borderWidth: 1,
              borderRadius: 5,
              color: 'black',
            }}
          />
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'left',
            alignItems: 'flex-start',
          }}>
          Password
        </Text>
        <View style={{ padding: 2, width: '60%', margin: 10 }}>
          <TextInput
            placeholder={'Password'}
            placeholderTextColor="gray"
            value={password}
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
            style={{
              borderColor: 'grey',
              borderWidth: 1,
              borderRadius: 5,
              color: 'black',
            }}
          />
        </View>
        {/* Cambiar el Button por FormButton, que debe ser un archivo .js */}
        <FormButton
          buttonTitle="Sign In"
          onPress={() => {
            // TODO: Validar que los campos esten llenos
            // TODO: Autenticacion
            //Inicio de sesión
            _doSingIn(userName, password);
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome hgdhgd {currentUser.email}</Text>
      <Button
        title="Log out"
        onPress={async () => {
          // TODO: Validar que los campos esten llenos
          // TODO: Autenticacion
          await signOut(auth);
        }}
      />
    </View>
  );
};

export default LoginScreen;
