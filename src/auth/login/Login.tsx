import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';

import { AuthContext } from '../AuthContext';


export default function LoginPage({navigation}) {
  const [email, onChangeEmail] = useState('');
  const [pass, onChangePass] = useState('');

  const { signIn } = useContext(AuthContext);

  const signInLogo = require('../../../assets/login.png');

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
        <Pressable style={{ borderWidth: 1, width: '50%', borderRadius: 20 }} onPress={() => signIn({email, pass})}>
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
