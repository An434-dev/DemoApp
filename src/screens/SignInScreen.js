import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommonButton from '../components/CommonButton';
import { validateCredentials } from '../utils/storage';
import { setUser } from '../redux/userSlice';
import { validateEmail, validateRequired } from '../utils/validation';
import { Eye } from '../assests/icons';

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isConnected, isInternetReachable } = useSelector(
    state => state.network,
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isOffline = !isConnected || !isInternetReachable;

  const handleLogin = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error);
      return;
    }

    // Validate password
    const passwordValidation = validateRequired(password, 'Password');
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error);
      return;
    }

    // Check network connection
    if (isOffline) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
      );
      return;
    }

    setLoading(true);

    try {
      // Validate credentials from AsyncStorage
      const result = await validateCredentials(
        email.trim().toLowerCase(),
        password,
      );

      setLoading(false);

      if (result.success) {
        // Update Redux state
        dispatch(setUser(result.user));

        // Navigate to main app
        navigation.replace('MainApp');
      } else {
        Alert.alert('Login Failed', result.message);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Enter your details to login</Text>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, emailError && styles.inputError]}
              placeholder="eg. johnfrans@gmail.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.passwordContainer,
                passwordError && styles.inputError,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setPasswordError('');
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIconText}>
                  {showPassword ? <Eye /> : <Eye />}
                </Text>
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>

          {/* Login Button */}
          <CommonButton
            title="Login"
            onPress={handleLogin}
            style={styles.loginButton}
            loading={loading}
            disabled={loading}
          />

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#3D3D3D',
    fontWeight: '400',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#121212',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ece6e6ff',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#121212',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ece6e6ff',
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#121212',
  },
  eyeIcon: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  eyeIconText: {
    fontSize: 20,
  },
  loginButton: {
    marginTop: 16,
    marginBottom: 24,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#666',
  },
  signUpLink: {
    fontSize: 14,
    color: '#121212',
    fontWeight: '600',
  },
});

export default SignInScreen;
