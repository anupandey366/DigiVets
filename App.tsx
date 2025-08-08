import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    // Hide splash screen after app has loaded
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>Welcome to My App</Text>
    </View>
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
