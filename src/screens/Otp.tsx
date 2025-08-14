import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image  } from "react-native";

const OtpScreen = ({ navigation, route  }: any) => {
  const [timer, setTimer] = useState(60);
  const OTP_LENGTH = 6;
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));

   const { role, from } = route.params || {};

  const backspaceOnEmpty = useRef(false);
  const clearCurrentAndGoPrev = (index: number) => {
  setOtp(prev => {
    const next = [...prev];
    next[index] = '';
    if (index > 0) next[index - 1] = '';
    return next;
  });
  if (index > 0) {
    // focus after state update
    requestAnimationFrame(() => inputRefs.current[index - 1]?.focus());
  }
  };

  // Start countdown
    useEffect(() => {
        let interval: any;
        if (timer > 0) {
        interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (text: string, index: number) => {
  const value = text.replace(/[^0-9]/g, '');

  // if user pasted or typed more than 1 char, take the first
  const char = value.slice(0, 1);

  setOtp(prev => {
    const next = [...prev];
    next[index] = char;
    return next;
  });

  // move forward if we got a digit
  if (char && index < OTP_LENGTH - 1) {
    requestAnimationFrame(() => inputRefs.current[index + 1]?.focus());
  }
};

const handleKeyPress = (e: any, index: number) => {
  if (e.nativeEvent.key === 'Backspace') {
    // If there's a digit in the current cell, clear it and stay here.
    if (otp[index]) {
      setOtp(prev => {
        const next = [...prev];
        next[index] = '';
        return next;
      });
      return;
    }
    // If it's already empty, clear previous and go there.
    clearCurrentAndGoPrev(index);
    }
    };


    const handleVerify = () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
        Alert.alert("Please enter a valid 6-digit OTP");
        return;
        }
        Alert.alert(`OTP entered: ${enteredOtp}`);

        if (from === 'LoginToOtp') {
        navigation.navigate('DoctorDashboard', { role });
        } 
        else if (from === 'ForgotToOtp') {
        navigation.navigate('ResetPassword', { role });
        } 
        else if (from === 'RegisterToOtp') {
        navigation.navigate('DoctorDashboard', { role });
        }
    };

    const handleResend = () => {
        setOtp(["", "", "", "", "", ""]);
        setTimer(60);
        Alert.alert("OTP Resent!");
    };

    return (
        <View style={styles.container}>
            
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assests/back.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <Image source={require('../assests/logo.png')} style={styles.logo} />

        <Text style={styles.title}>OTP</Text>
        <Text style={styles.title}>Enter 6 digit OTP sent on your number
        </Text>
        <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
        <TextInput
        key={index}
        ref={(ref) => { inputRefs.current[index] = ref; }}
        style={styles.otpBox}
        keyboardType="numeric"          
        maxLength={1}
        value={digit}
        onChangeText={(t) => handleChange(t, index)}
        onKeyPress={(e) => handleKeyPress(e, index)}
        autoCorrect={false}
        autoCapitalize="none"
        // optional: helps avoid some OEM quirks
        contextMenuHidden
        />
        ))}
        </View>

        <View style={styles.actionsRow}>
            {timer > 0 ? (
            <Text style={styles.resendDisabled}>Resend OTP ({timer}s)</Text>
            ) : (
            <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendActive}>Resend OTP</Text>
            </TouchableOpacity>
            )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: { fontSize: 16, fontWeight: "bold", alignSelf: "flex-start", marginBottom: 10 },
  otpContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  otpBox: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
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
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center',alignSelf: 'stretch', 
    paddingHorizontal: 8, },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  backText: { fontSize: 16, color: "#555" },
  resendDisabled: { fontSize: 16, color: "#aaa" },
  resendActive: { fontSize: 16, color: "#0a7b83", fontWeight: "bold" },
  verifyButton: {
    backgroundColor: "#006d66",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  verifyText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default OtpScreen;
