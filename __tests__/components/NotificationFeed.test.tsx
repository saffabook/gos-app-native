// MyComponent.test.js
import React from 'react';
import { render, act  } from '@testing-library/react-native';
import NotificationFeed from '../../App/pages/NotificationFeed/NotificationFeed';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('NotificationFeed', () => {
  it('should do something', async () => {
    // Set up a mock value for AsyncStorage.getItem

    //AsyncStorage.getItem.mockResolvedValue('mockedToken');

    render(<NotificationFeed />);

    // Wait for asynchronous operations to finish
    await act(async () => {
      // Now you can run your test code that interacts with the component
      // This includes triggering events or checking the rendered output
    });
  });

  // it('renders correctly', () => {
  //   const { getByText } = render(<NotificationFeed />);
  //   // const textElement = getByText('Hello, World!');
  //   // expect(textElement).toBeTruthy();
  // });
});
