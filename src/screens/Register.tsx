import React, { useState } from 'react';
import { View, Text,  TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode } from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';

const RegisterScreen = ({ navigation, route }: any) => {
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false); // Login using OTP
  const [isSelectedTerms, setSelectionTerms] = useState(false); // Terms checkbox
  
  const { role } = route.params || {};

  const handleRegister = () => {
    // Mobile validation
    if (!mobile || mobile.length < 10) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid mobile number.');
      return;
    }

    // Password validation if OTP is NOT selected
    if (!isSelected && (!password || password.length < 8)) {
      Alert.alert('Invalid Password', 'Password must be at least 8 characters long.');
      return;
    }

    // Terms & Conditions validation
    if (!isSelectedTerms) {
      Alert.alert('Terms & Conditions', 'You must agree to the terms and conditions.');
      return;
    }

    // If all validations pass
    navigation.navigate('Otp', { role, from: 'RegisterToOtp' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assests/back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Image source={require('../assests/logo.png')} style={styles.logo} />

      <Text style={styles.title}>{role ? `Register as ${role}` : 'Register'}</Text>

      <Text style={styles.title}>Join DigiVet as a Pet Parent and connect with veterinary doctors online.</Text>

      {/* Mobile Number */}
      <Text style={styles.label}>Mobile Number</Text>
      <View style={styles.inputRow}>
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withCallingCode
          withCallingCodeButton
          onSelect={(country) => {
            setCountryCode(country.cca2);
            setCallingCode(country.callingCode[0]);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          maxLength={15}
          value={mobile}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            setMobile(numericText);
          }}
        />
      </View>

      {/* Password */}
      {!isSelected && (
        <>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.iconButton}
            >
              <Icon
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#2b7fff', fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Terms Checkbox */}
      <View style={styles.left}>
        <CheckBox
          value={isSelectedTerms}
          onValueChange={setSelectionTerms}
        />
        <Text style={styles.label}>
          By logging in, you agree with our Terms & Conditions, Privacy & Cookie Policy.
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
