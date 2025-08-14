import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler } from 'react-native';

const RoleSelectionScreen = ({ navigation }: any) => {
  const handleRoleSelect = (role: string) => {
    if (role === 'Doctor') {
      navigation.navigate('Login', { role }); 
    } else {
      navigation.navigate('Login', { role }); 
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => {BackHandler.exitApp();}}>
        <Image source={require('../assests/back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Image source={require('../assests/logo.png')} style={styles.logo} />

      <Text style={styles.title}>DigiVet Clinic</Text>

      <Text style={styles.title}>Please select your role to continue</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelect('Doctor')}>
        <Text style={styles.buttonText}>Doctor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelect('Pet Parent')}>
        <Text style={styles.buttonText}>Pet Parent</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoleSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
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
  button: {
    backgroundColor: '#ffb433',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
