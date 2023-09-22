import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import NotificationFeed from '../../app/pages/NotificationFeed/NotificationFeed';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
jest.mock("axios")
const mock = new MockAdapter(axios);

const mockToken = 'thisisthemockedtoken';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

const mockAxios = new MockAdapter(axios);

describe('LoginForm component', () => {

    it('should show error if token is not in storage', async () => {
    
      let tokenData = await AsyncStorage.getItem('token');
      
      expect(tokenData).toBe(undefined);

      const { getByText, debug } = render(<NotificationFeed />);   
    
      await waitFor(() => getByText('No notifications available'));
  });

  it('should load if token instorage: no data returned', async () => {
    
    AsyncStorage.getItem.mockResolvedValueOnce(mockToken);

    const { getByText } = render(<NotificationFeed />);

    const mockedResponse = {
      data: {
        data: {
          data: []
        }
      }
    };

    // Mock the axios.post request to simulate a successful response
    jest.spyOn(axios, 'post').mockResolvedValue(mockedResponse);

    await waitFor(() => {});
  
    await waitFor(() => getByText('No notifications available'));
  
  });

  
  it('should load if token instorage: data returned', async () => {
    
    AsyncStorage.getItem.mockResolvedValueOnce(mockToken);

    const { getByText } = render(<NotificationFeed />);
    
    const item = {
      id: 1,
      type: 'info',
      message: 'This is a test notification',
      status: 'new',
      timeAgo: '2 hours ago',
      seen: false,
    };

    const mockedResponse = {
      data: {
        data: {
          data: [
            item
          ]
        }
      }
    };
    // Mock the axios.post request to simulate a successful response
    jest.spyOn(axios, 'post').mockResolvedValue(mockedResponse);

    await waitFor(() => {});
  
    // Check if the notification content is rendered correctly
    expect(getByText(item.message)).toBeTruthy();
    expect(getByText(item.status)).toBeTruthy();
    expect(getByText(item.timeAgo)).toBeTruthy();
  
  });

});