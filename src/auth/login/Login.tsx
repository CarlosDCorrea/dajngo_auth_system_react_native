import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginPage({navigation}) {
  const [email, onChangeEmail] = useState('');
  const [pass, onChangePass] = useState('');

  const signInLogo = require('../../../assets/login.png');

  const login = async () => {
    try {
      const response = await fetch('http://192.168.20.9:8000/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: pass
        })
      });

      console.log('response::', response);

      if(response.status === 200){
        const access_token = await response.json()
        console.log('token::', access_token['Token'])
        await AsyncStorage.setItem('access_token', access_token['Token']);
        navigation.replace('Home1');
      }
    } catch (error) {
      console.log('error al realizar la peticion', error);
    }
  }

  function goToSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Image source={signInLogo} style={{resizeMode: 'contain', height: '80%' }}></Image>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput style={styles.textInput} onChangeText={onChangeEmail} value={email} placeholder='Correo'></TextInput>
        <TextInput style={styles.textInput} onChangeText={onChangePass} secureTextEntry={true} value={pass} placeholder='Contraseña'></TextInput>
        <View style={{ width: '80%' }}>
          <Text style={{ textAlign: 'right', marginRight: 10, marginTop: 10, color: 'blue' }}>Recuperar contraseña</Text>
        </View>
      </View>
      <View style={{ flex: 1, marginHorizontal: 20, alignItems: 'center' }}>
        <Pressable style={{ borderWidth: 1, width: '50%', borderRadius: 20 }} onPress={login}>
          <Text style={{ fontSize: 15, textAlign: 'center', paddingVertical: 10 }}>Iniciar Sesión</Text>
        </Pressable>
        <Text style={{ marginTop: 10 }}>No estás registrado? <Text style={{ color: 'blue' }} onPress={goToSignUp}>Registrate</Text></Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center'
  },
  textInput: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    padding: 10
  },
  signInButton: {
    textAlign: 'center',
    backgroundColor: 'red'
  }
});
