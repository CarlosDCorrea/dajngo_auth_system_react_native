import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView, Image, Alert } from 'react-native';


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

  const [canSignIn, onChangeCanSignIn] = useState(false);
  const [showEmailInvalidation, onChangeShowEmailInvalidation] = useState(false);
  const [showUsernameInvalidation, onChangeShowUsernameInvalidation] = useState(false);
  const [showPassInvalidation, onChangeShowPassInvalidation] = useState(false);
  const [showPass2Invalidation, onChangeShowPass2Invalidation] = useState(false);
  
  const signUpLogo = require('../../../assets/signup.png');

  const signUp = () => {
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
      .then(response => response.json())
      .then(json => {
        console.log("json::", json)
        return json;
      })
      .catch(error => {
        console.error("Error::", error);
      });
  }

  function goToLogin() {
    navigation.navigate('Login');
  }

  function validateForm(event){
    console.log('email::', email);
    if(email.trim() === ''){
      onChangeShowEmailInvalidation(true);
    } else{
      onChangeShowEmailInvalidation(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer]}>
        <Image source={signUpLogo} style={[styles.image]}></Image>
      </View>
      <View style={[styles.inputsContainer]}>
        <View>
          <TextInput style={[styles.textInput, showEmailInvalidation ? styles.textInputInvalid: styles.textInputValid]} onChangeText={onChangeEmail} onChange={validateForm} value={email} placeholder='Correo'></TextInput>
          {showEmailInvalidation && <Text>Este campo es obligatorio</Text>}
        </View>
        <View>
        <TextInput style={[styles.textInput, showUsernameInvalidation ? styles.textInputInvalid: styles.textInputValid]} onChangeText={onChangeUsername} onChange={validateForm} value={username} placeholder='Username'></TextInput>
        {showEmailInvalidation && <Text>Este campo es obligatorio</Text>}
        </View>
        <View>
        <TextInput style={[styles.textInput, showPassInvalidation ? styles.textInputInvalid: styles.textInputValid]} onChangeText={onChangePass} onChange={validateForm} value={pass} placeholder='Contraseña'></TextInput>
        {showEmailInvalidation && <Text>Este campo es obligatorio</Text>}
        </View>
        <View>
        <TextInput style={[styles.textInput, showPass2Invalidation ? styles.textInputInvalid: styles.textInputValid]} onChangeText={onChangePass2} onChange={validateForm} value={pass2} placeholder='Repetir contraseña'></TextInput>
        {showEmailInvalidation && <Text>Este campo es obligatorio</Text>}
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <Pressable style={[styles.pressable, canSignIn ? styles.pressableAtive: styles.pressableInactive]} onPress={() => { canSignIn ? signUp: console.log('you cant signup') }}>
          <Text style={styles.pressableText}>Registrate</Text>
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
  pressable: {
    borderWidth: 1,
    width: '50%',
    marginBottom: 5,
    borderRadius: 20,
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
