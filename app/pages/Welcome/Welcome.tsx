import React from 'react';

import LoggedInHeader from '../../components/LoggedInHeader/LoggedInHeader';
import NotificationFeed from '../../components/NotificationFeed/NotificationFeed';

import { View } from 'react-native';

const Welcome = () => {
    return (
        <View>
            <LoggedInHeader title="Notifications" />
            <NotificationFeed />
        </View>
    );
}

export default Welcome;