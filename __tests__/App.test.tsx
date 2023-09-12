/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';


describe('App', () => {
  it('renders app stack', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => getByText('GOS login'));
  });
});