// navigation.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/auth'; 
import Home from './src/screens/home'; 
import SignUp from './src/screens/signUp';
import Welcome from './src/screens/welcome';
import PostActual from './src/screens/post';
import Profile from './src/screens/profile';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Post" component={PostActual} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
