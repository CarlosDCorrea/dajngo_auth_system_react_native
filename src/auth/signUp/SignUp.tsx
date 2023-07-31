import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ToastAndroid, Image, ActivityIndicator } from 'react-native';


type form = {
  email: string,
  username: string,
  pass: string,
  pass2: string
}

type formErrors = {
  field: string,
  message: string
}

export default function LoginPage({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [pass, onChangePass] = useState('');
  const [pass2, onChangePass2] = useState('');
  const [username, onChangeUsername] = useState('');

  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const signUpLogo = require('../../../assets/signup.png');

  const signUp = () => {
    setShowActivityIndicator(true);
    return fetch('http://192.168.20.9:8000/user/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: pass
      })
    })
      .then(response => {
        if (response.status === 201) {
          ToastAndroid.show('Usuario creado', ToastAndroid.LONG);
          setShowActivityIndicator(false);
          goToLogin();
        }
        else {
          response.json().then(json => {
            ToastAndroid.show(json['email'][0], ToastAndroid.SHORT);
            setShowActivityIndicator(false);
          })
        }
      })
      .catch(error => {
        console.error("Error::", error);
        setShowActivityIndicator(false);
      });
  }

  function goToLogin() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer]}>
        <Image source={signUpLogo} style={[styles.image]}></Image>
      </View>
      <View style={[styles.inputsContainer]}>
        <View>
          <TextInput style={[styles.textInput]} onChangeText={onChangeEmail} value={email} placeholder='Correo'></TextInput>
        </View>
        <View>
          <TextInput style={[styles.textInput]} onChangeText={onChangeUsername} value={username} placeholder='Username'></TextInput>
        </View>
        <View>
          <TextInput style={[styles.textInput]} onChangeText={onChangePass} secureTextEntry={true} value={pass} placeholder='Contraseña'></TextInput>
        </View>
        <View>
          <TextInput style={[styles.textInput]} onChangeText={onChangePass2} secureTextEntry={true} value={pass2} placeholder='Repetir contraseña'></TextInput>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <Pressable style={[styles.pressable]} onPress={signUp}>
          {
            showActivityIndicator ? <ActivityIndicator color='#F0A25C'></ActivityIndicator> :
              <Text style={styles.pressableText}>Registrarte</Text>
          }
        </Pressable>
        <Text style={{ marginTop: 10 }}>Ya tienes una cuenta? <Text style={{ color: 'blue' }} onPress={goToLogin}>Iniciar Sesión</Text></Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  inputsContainer: {
    justifyContent: 'center',
    marginBottom: 20
  },
  actionsContainer: {
    marginHorizontal: 20,
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressable: {
    justifyContent: 'center',
    borderWidth: 1,
    height: 40,
    width: '50%',
    marginBottom: 5,
    borderRadius: 20
  },
  pressableAtive: {
    backgroundColor: '#EE7305'
  },
  pressableInactive: {
    backgroundColor: '#F0A25C'
  },
  pressableText: {
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 10
  },
  image: {
    resizeMode: 'contain',
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  textInputInvalid: {
    borderColor: 'red'
  },
  textInputValid: {
    borderColor: 'auto'
  },
  textError: {
    textAlign: 'right',
    paddingHorizontal: 20,
    color: 'red'
  }
});
