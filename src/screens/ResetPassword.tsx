import React, { useState } from 'react';
import { View, Text,  TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CommonActions } from '@react-navigation/native';

const ResetPasswordScreen = ({ navigation, route }: any) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { role } = route.params || {};

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // Min 8 chars, at least one uppercase, one lowercase, one number, one special char

  const validateAndSubmit = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill out both fields.');
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Confirm password must match new password.');
      return;
    }

    Alert.alert('Success', 'Password reset successfully!');
    // navigation.navigate('Login', { role });
    navigation.dispatch(
    CommonActions.reset({
        index: 1,
        routes: [
        { name: 'RoleSelection' },
        { name: 'Login', params: { role } },
        ],
    })
    );
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../assests/back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require('../assests/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.title}>Enter your new password below</Text>

      {/* New Password */}
      <Text style={styles.label}>New Password</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry={!newPasswordVisible}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          onPress={() => setNewPasswordVisible(!newPasswordVisible)}
        >
          <Icon
            name={newPasswordVisible ? 'eye-off' : 'eye'}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          <Icon
            name={confirmPasswordVisible ? 'eye-off' : 'eye'}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={validateAndSubmit}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    alignSelf: 'stretch',
    marginTop: 10
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  link: {
    fontSize: 14,
    color: '#2b7fff',
    textDecorationLine: 'underline', 
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
    marginVertical: 20,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  label: { fontSize: 14, marginVertical: 8, textAlign: 'left', alignSelf: 'stretch', },
  callingCode: { marginRight: 5, fontSize: 16 },
  input: { flex: 1, height: 40 },
  iconButton: { padding: 5 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center',alignSelf: 'stretch', 
    paddingHorizontal: 8, },
});
