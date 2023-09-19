import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getNotificationIcon } from '../../services/IconService';


const notifications = [
  { id: 1, type: 'booking', message: 'New booking made for Room 101', status: 'Confirmed', timeAgo: '1m' },
  { id: 2, type: 'payment', message: 'Payment received for Order #1234', status: 'Completed', timeAgo: '1d' },
  { id: 3, type: 'message', message: 'You have a new message from John Doe', status: '', timeAgo: '3m' },
];

const NotificationFeed = () => {
  const renderNotification = ({ item }) => {
    const icon = getNotificationIcon(item.type);

    return (
        <View style={styles.notification}>
        <View style={styles.iconContainer}>
            <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.contentContainer}>
            <View style={styles.topRow}>
            
            {item.status && <Text style={styles.status}>{item.status}</Text>}
            <Text style={styles.date}>{item.timeAgo}</Text>
            </View>
            <Text numberOfLines={2} style={styles.message}>{item.message}</Text>
        </View>
        </View>
    );
  };

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderNotification}
    />
  );
};

const styles = StyleSheet.create({
    notification: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    iconContainer: {
      marginRight: 10,
    },
    icon: {
      fontSize: 20,
    },
    contentContainer: {
      flex: 1,
    },
    topRow: {
      flexDirection: 'row',
      marginBottom: 5,
      justifyContent: 'space-between', 
    },
    status: {
      marginRight: 10,
    },
    type: {
      marginRight: 10,
    },
    date: {
        marginLeft: 'auto',
    },
    message: {
      fontSize: 20,
    },
  });
  

export default NotificationFeed;
