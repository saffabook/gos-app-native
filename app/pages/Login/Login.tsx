import React from 'react';

import LoggedOutHeader from '../../components/LoggedOutHeader/LoggedOutHeader'; 
import LoginForm from '../../components/LoginForm/LoginForm'; 
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation'; // Import the appropriate type
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';

type NavigationProps = {
  navigation: NavigationScreenProp<any, any>; // Adjust the generics as needed
};


const Login: React.FC<NavigationProps> = ({ navigation }) => {
    return (
        <KeyboardAvoidingWrapper>
            <View>
                <LoggedOutHeader title="My App Header" />
                <LoginForm navigation={navigation}/>
            </View>
        </KeyboardAvoidingWrapper>
    );
}

export default Login;