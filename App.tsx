/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './src/home/Home';
import LoginPage from './src/auth/login/Login';
import SignUp from './src/auth/signUp/SignUp';
import ProfilePage from './src/profile/Profile';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs(){
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomePage} options={{headerShown: false}}/>
      <Tab.Screen name='Profile' component={ProfilePage} options={{tabBarLabel: 'Cuenta', title: 'Carlos', headerShown: false}}/>
    </Tab.Navigator>
  )
}

let goToHome = false;

const App = () => {
  //TODO: change headerBackVisible to false for correct functionality

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
        <RootStack.Screen name="Home" component={HomeTabs} options={({route}) => ({
          headerTitle: getFocusedRouteNameFromRoute(route) ?? 'Inicio',
        })}/>
        <RootStack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default App;
