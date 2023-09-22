/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';
import AsyncStorage from "@react-native-async-storage/async-storage";


beforeEach(() => {
  AsyncStorage.clear();
});

it('can read asyncstorage', async () => {
  await AsyncStorage.setItem('username', 'testUser')
  let usernameValue = await AsyncStorage.getItem('username');
  expect(usernameValue).toBe('testUser');
});

it('renders app stack', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => getByText('GOS login'));
});