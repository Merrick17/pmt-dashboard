import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../views/LoginScreen';
import MainTabs from './bottomNav';
const Stack = createNativeStackNavigator();
const MainNav = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
