import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {NativeBaseProvider, Text, Box, View} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import MainNav from './src/navigation/mainNav';
import store from './src/redux/store';
import {Provider} from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#FFF',
  },
});
