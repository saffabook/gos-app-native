import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login/Login';
import NotificationFeed from '../pages/NotificationFeed/NotificationFeed';

const Stack = createNativeStackNavigator();

const RootStack = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    }
                }}
                initialRouteName='Login'
                >
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="NotificationFeed" component={NotificationFeed} options={{ title: 'GOS notifications' }} // Set your custom title here
         />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;