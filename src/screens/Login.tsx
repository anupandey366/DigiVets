import React, { useState } from 'react';
import { View, Text,  TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode } from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';

const LoginScreen = ({ navigation, route }: any) => {
    const handleRoleSelect = (role: string) => {
    navigation.navigate('', { role }); 
  };
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState('91');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [isSelectedTerms, setSelectionTerms] = useState(false);
  
  const { role } = route.params || {};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assests/back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Image source={require('../assests/logo.png')} style={styles.logo} />

      {/* <Text style={styles.title}>Login as Pet Parent</Text> */}
      <Text style={styles.title}>{role ? `Login as ${role}` : 'Login'}</Text>

      <Text style={styles.title}>Access doctors and manage your pet's health online.</Text>

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
          value={mobile}
          onChangeText={setMobile}
        />
      </View>

      {/* Password */}
      {/* Show password fields only when checkbox is NOT selected */}
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
      <View style={styles.row}>
        {/* Left: Checkbox with label */}
        <View style={styles.left}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
          />
          <Text style={styles.label}>Login using OTP</Text>
        </View>

        {/* Right: Forgot Password link */}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword', { role })}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelect('Doctor')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register', { role })}>
          <Text style={{ color: '#2b7fff', fontWeight: 'bold' }}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.left}>
          <CheckBox
            value={isSelectedTerms}
            onValueChange={setSelectionTerms}
          />
          <Text style={styles.label}>By logging in, you agree with our Terms & Conditions, Privacy & Cookie Policy.</Text>
        </View>
    </View>
  );
};

export default LoginScreen;

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
