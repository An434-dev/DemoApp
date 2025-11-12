import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  USER_DATA: 'user_data',
  USER_SESSION: 'user_session',
};

export const saveUser = async userData => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_DATA,
      JSON.stringify(userData),
    );
    console.log('User saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    return false;
  }
};

export const getUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_SESSION);
    console.log('User cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing user:', error);
    return false;
  }
};

export const isUserLoggedIn = async () => {
  try {
    const userData = await getUser();
    return userData !== null;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

export const validateCredentials = async (email, password) => {
  try {
    const savedUser = await getUser();
    if (!savedUser) {
      return {
        success: false,
        message: 'No user found. Please sign up first.',
      };
    }

    if (savedUser.email === email && savedUser.password === password) {
      return { success: true, user: savedUser };
    }

    return { success: false, message: 'Invalid email or password' };
  } catch (error) {
    console.error('Error validating credentials:', error);
    return { success: false, message: 'An error occurred' };
  }
};
