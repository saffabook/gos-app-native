import React from 'react';

import LoggedInHeader from '../../components/LoggedInHeader/LoggedInHeader';
import { View } from 'react-native';

const Welcome = () => {
    return (
        <View>
            <LoggedInHeader title="Notifications" />
        </View>
    );
}

export default Welcome;