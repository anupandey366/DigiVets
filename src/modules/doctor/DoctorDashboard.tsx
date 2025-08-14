import React, { useState } from 'react';
import { View, Text,  TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const DoctorDashboardScreen = ({ navigation, route }: any) => {
    const handleRoleSelect = (role: string) => {
    navigation.navigate('', { role }); 
  };
  
  const { role } = route.params || {};

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assests/back.png')} style={styles.backIcon} />
      </TouchableOpacity> */}

      {/* <Image source={require('../assests/logo.png')} style={styles.logo} /> */}

      <Text style={styles.title}>Dashboard</Text>

    </View>
  );
};

export default DoctorDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  back: {
    width: 20,
    height: 20,
    marginBottom: 30,
    resizeMode: 'contain',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
});