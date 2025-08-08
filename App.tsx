import React, { useEffect, useState  } from 'react';
import { StatusBar, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigations/StackNavigator';

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); // Hide native splash when JS is ready
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Match your splash background color
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
