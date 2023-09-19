import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getNotificationIcon } from '../../services/IconService';
import axios from 'axios';

//import { API_URL } from '@env'; // Use environment variable
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationObject {
  id: number;
  type: string;
  message: string;
  status: string;
  timeAgo: string;
  seen: boolean;
}

interface NotificationData {
  current_page: number;
  data: NotificationItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface NotificationItem {
  id: number;
  userId: number;
  companyId: number;
  type: string;
  message: string;
  status: string;
  seen: boolean;
  created_at: string;
  updated_at: string | null;
  timeAgo: string;
}

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

const API_URL='http://10.0.2.2:8080/api/'

const NotificationFeed = () => {

  
  const [pageNumber, setPageNumber] = useState(1);
  const apiUrl = API_URL+'notifications/get-user?page='+pageNumber;
  const [tokenData, setTokenValue] = useState('');

        
  useEffect(() => {
    // Define a function named retrieveData, which is asynchronous
    
    const retrieveData = async () => {
      try {
        // Attempt to get the value associated with the key 'token' from AsyncStorage
        const value = await AsyncStorage.getItem('token');
        if (value !== null && value.length > 0) {
          // Set the value retrieved from AsyncStorage in the component's state using setTokenValue
          setTokenValue(value);
        } else {
          setTokenValue('');
        }
      } catch (error) {
        //console.log('catch');
      }
    };
    // Call the retrieveData function when this effect is triggered (i.e., when the component mounts or when tokenData changes)
    if(tokenData.length === 0){
      retrieveData();
    }
  }, [tokenData]); // This effect will run whenever tokenData changes

  
  const [notifications, setNotifications] = useState<NotificationObject[]>([]);

  // Ensure to check async data placement from setTokenValue is fired. (watch data is true)
  useEffect(() => {
    setNotifications([]);
    if(tokenData !== undefined){
      if(tokenData.length > 0){
        makeApiCall();
      }
    }
  }, [tokenData]);
  
  const makeApiCall = async () => {

    if (tokenData) {
      try {

        const response = await axios.post(apiUrl, { token: tokenData });
        setNotifications(response.data.data.data);
      } catch (error) {
        //console.log(error);
      }
    } else {
      //console.log('TokenData is undefined');
    }
  };

  const renderNotification = ({ item }: { item: NotificationObject }) => {
    const icon = getNotificationIcon(item.type);
    return (
      <View style={[styles.notification, item.seen ? styles.seenNotification : styles.unSeenNotification]}>
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
    <View testID="NotificationFeed" style={styles.container}>
      {notifications && notifications.length > 0? (
        <FlatList
          style={styles.scrollContainer}
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotification}
        />
      ) : (
        <Text>No notifications available</Text>
      )}
  </View>
  );
};

const styles = StyleSheet.create({
  testdiv:{

  },
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    display: 'flex',
    height:100
  },
  notification: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
    notificationList: {
      flex:1,
      borderColor: 'blue',
      borderWidth: 10,
    },
    unSeenNotification: {
      backgroundColor: '#f6e9f9',
    },
    seenNotification: {
      backgroundColor: '#F5F5F5',
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
