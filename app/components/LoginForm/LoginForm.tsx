import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env'; // Use environment variable
import AsyncStorage from '@react-native-async-storage/async-storage';// Define the type for the navigation prop
import { NavigationScreenProp } from 'react-navigation'; // Import the appropriate type

type NavigationProps = {
  navigation: NavigationScreenProp<any, any>; // Adjust the generics as needed
};

interface ApiResponse {
  data: {
    data: {
      accessToken: string;
    };
  };
}

const LoginForm: React.FC<NavigationProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  let errorMessage = 'There was an error logging in';
        

  const setPageError = (msg:string) => {
    setLoading(false);
    setError(msg);
  }

  const saveToken = async(response:ApiResponse) => {
    
    let tokenErrorMsg = 'Could not get an access token';
    if (response && response.data && response.data.data && response.data.data.accessToken) {
      try {
        await AsyncStorage.setItem('token', response.data.data.accessToken);
        setUsername('');
        setPassword('');
        navigation.navigate('NotificationFeed');

      } catch (error) {
        setPageError(tokenErrorMsg);
      }
    } else {
      setPageError(tokenErrorMsg);
    } 
  }

  
  const handleLogin = async () => {
    
    const apiUrl = API_URL+'auth/login';

    const requestData = {
        email: username,
        password: password,
    };

    setError(null);
    setLoading(true);
  
    try {

      const response = await axios.post(apiUrl, requestData);
      setLoading(false);
      
      if (response.hasOwnProperty('data')) {
        saveToken(response);
        return;
      } else if (response.hasOwnProperty('error')) {
        let errorResponse = response as any;
        if (errorResponse.error.message) {
          errorMessage = errorResponse.error.message;
        }
      }

      setPageError(errorMessage);
    } catch (error:any) {
      setPageError(errorMessage);
    }
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>GOS login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
          
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          <TouchableOpacity testID="submitButton" style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

      
          {error && (
            <Text testID="errorText" style={styles.errorText}>{error}</Text>
          )}
        </>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#9c27b0',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    margin: 20,
    fontSize: 16
  },
});

export default LoginForm;
