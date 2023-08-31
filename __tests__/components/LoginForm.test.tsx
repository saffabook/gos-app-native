import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginForm from '../../app/components/LoginForm/LoginForm';

test('LoginForm handles login correctly', () => {
  // Mock the console.log function
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

  const { getByText, getByPlaceholderText } = render(<LoginForm />);

  const usernameInput = getByPlaceholderText('Username');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Submit'); // Match the button text

  // Mock user input
  fireEvent.changeText(usernameInput, 'testuser');
  fireEvent.changeText(passwordInput, 'testpassword');

  // Click the login button
  fireEvent.press(loginButton);

  // Check if console.log was called with the expected arguments
  expect(consoleLogSpy).toHaveBeenCalledWith('Username:', 'testuser');
  expect(consoleLogSpy).toHaveBeenCalledWith('Password:', 'testpassword');

  // Restore the original console.log function
  consoleLogSpy.mockRestore();
});
