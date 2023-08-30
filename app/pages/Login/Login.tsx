import React from 'react';

import LoggedOutHeader from '../../components/LoggedOutHeader/LoggedOutHeader'; 
import LoginForm from '../../components/LoginForm/LoginForm'; 
import { View } from 'react-native';


const Login = () => {
    return (
        <View>
            <LoggedOutHeader title="My App Header" />
            <LoginForm />
        </View>
    );
}

export default Login;