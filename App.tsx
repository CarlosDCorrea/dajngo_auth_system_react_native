import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HomePage from './src/home/Home';
import LoginPage from './src/auth/login/Login';


import { AuthContext } from './src/auth/AuthContext';


const RootStack = createNativeStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            accessToken: action.token,
            isLoading: false
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            accessToken: action.token
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            accessToken: null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      accessToken: null
    }
  );

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        console.log('data::', data);
        const { email, pass } = data;

        console.log('email::', email)

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

          if (response.status === 200) {
            const accessToken = await response.json();
            console.log('AccessToken::', accessToken);
            await AsyncStorage.setItem('accessToken', accessToken['Token']);
            dispatch({ type: 'SIGN_IN', token: accessToken['Token'] });
          }
        } catch (error) {
          console.log('error al realizar la peticion', error);
        }
      },
      signOut: async () => {
        console.log('calling signOut');
        await AsyncStorage.removeItem('accessToken');
        dispatch({ type: 'SIGN_OUT' })
      }
    }),
    []
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let accessToken: string | null;

      try {
        accessToken = await AsyncStorage.getItem('accessToken');
        dispatch({ type: 'RESTORE_TOKEN', token: accessToken });
      } catch (e) {
        console.log('some error occur while getting the token', e);
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack.Navigator>
          {
            state.accessToken === null ? (
              <RootStack.Screen name='Login' component={LoginPage} />
            ) :
              (
                <RootStack.Screen name='Home' component={HomePage} />
              )
          }
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );

  /* useEffect(() => {
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      console.log('accessToken::', accessToken);

      accessToken ? setHomeRoot('Home') : setHomeRoot('Login');
      console.log('root:', rootRoute);
    })
  }, [rootRoute]) */


  //TODO: change headerBackVisible to false for correct functionality
  /* return (
    //dont use the same name for the stack and the tab, are tabs routes? investigate this later
    <NavigationContainer>
      <RootStack.Navigator>
        {
          rootRoute === 'Login' ? (
            <>
              <RootStack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
              <RootStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            </>
          ) : (
            <>
              <RootStack.Screen name="Home" component={HomePage} options={({ route }) => ({
                headerTitle: getFocusedRouteNameFromRoute(route) ?? 'Inicio',
              })} />
              <RootStack.Screen name="Profile" component={ProfilePage} />
            </>
          )
        }
      </RootStack.Navigator>
    </NavigationContainer>
  ); */
};
export default App;
