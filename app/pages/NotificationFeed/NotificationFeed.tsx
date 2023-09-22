import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getNotificationIcon } from '../../services/IconService';
import axios from 'axios';
import { API_URL } from '@env'; // Use environment variable
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

const NotificationFeed  = () => {


  
  const [pageNumber, setPageNumber] = useState(1);
  const apiUrl = API_URL+'notifications/get-user?page='+pageNumber;
  const [tokenData, setTokenValue] = useState('');

        
  useEffect(() => {
    
    const retrieveData = async () => {
      try {
        // Attempt to get the value associated with the key 'token' from AsyncStorage
        const value = await AsyncStorage.getItem('token');
        if(value !== undefined){
          if (value !== null && value.length > 0) {
            setTokenValue(value);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

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
        if (response && response.data && response.data.data && response.data.data.data) {
          setNotifications(response.data.data.data);  
        }
      } catch (error) {
        navigation.navigate('Login');
      }
    }
  };

  const renderNotification = ({ item }: { item: NotificationObject }) => {
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
    <View testID="NotificationFeed" style={styles.container}>
      {notifications && notifications.length > 0? (
        <FlatList
          style={styles.scrollContainer}
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotification}
        />
      ) : (
        <Text style={styles.noNotifications}>No notifications available</Text>
      )}
  </View>
  );
};

const styles = StyleSheet.create({
  noNotifications:{
    fontSize: 26,
    textAlign: 'center',
    marginTop: 100,
    color: '#333', // Change the color to your preference
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
  
  notificationList: {
    flex:1,
    borderColor: 'blue',
    borderWidth: 10,
  },
  
  notification: {
    
    padding: 16,
    display:'flex',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row'
  },
    iconContainer: {
      flex: 20,
      marginRight: 10,
      maxWidth:50, 
    },
    contentContainer: {
      flex: 1,
      marginRight: 10,  
    },
    icon: {
      fontSize: 30,
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
