import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native'; // Import 'act' from testing-library
import LoginForm from '../../app/components/LoginForm/LoginForm';


import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mockAxios = new MockAdapter(axios);



describe('LoginForm component', () => {

  afterEach(() => {
    mockAxios.reset(); // Reset the mock adapter after each test
  });

  test('renders a TouchableOpacity with "Submit" text', () => {
    const { getByTestId } = render(<LoginForm />);
    const submitButton = getByTestId('submitButton');
    
    // Use the toBe matcher to assert the text content
    expect(submitButton).toBeTruthy(); // Check if the button exists
    expect(submitButton.props.children[0].props.children).toBe('Submit'); // Check the text content
  });

  test('Login contains correct TextInput', () => {
    // Render the component
    const { getByPlaceholderText } = render(<LoginForm />);
    
    // Query for the TextInput element by its placeholder text
    const UserName = getByPlaceholderText('Username');
    expect(UserName).toBeTruthy();
  
    const textInput = getByPlaceholderText('Password');
    expect(textInput).toBeTruthy();
  });
  
  test('Login contains a submit process', () => {
  
    // Render the component with the handleLogin prop
    const { getByText, queryByTestId } = render(<LoginForm />);
    
    // Query for the Text element with the text "Submit"
    const textElement = getByText('Submit');
  
    // Assert that the Text element exists
    expect(textElement).toBeTruthy();
  
    // Query for the TouchableOpacity element by testID
    const touchableOpacity = queryByTestId('submitButton');
  
    // Assert that the TouchableOpacity element exists
    expect(touchableOpacity).toBeTruthy();
  });

  test('handles successful login', async () => {
    // Mock the axios.post request to simulate a successful response
    mockAxios.onPost(`auth/login`).reply(200, { success: true });

    const { getByTestId } = render(<LoginForm />);
    const submitButton = getByTestId('submitButton');

    // Simulate pressing the submit button
    act(() => {
      fireEvent.press(submitButton);
    });

    // Ensure that the component updates by re-rendering
    await act(async () => {});

    // Assert that the component behaves as expected after a successful login
    // For example, you can check that error is null or that it navigates to another screen
  });
  
  test('handles login error and displays error message', async () => {
    // Mock the axios.post request to simulate an error response
    const errorMessage = 'There was an error loggin in';
    mockAxios.onPost(`auth/login`).reply(400, { error: { message: errorMessage } });

    const { getByTestId } = render(<LoginForm />);
    const submitButton = getByTestId('submitButton');

    // Simulate pressing the submit button
    act(() => {
      fireEvent.press(submitButton);
    });

    // Ensure that the component updates by re-rendering
    await act(async () => {});

    // Locate the error message element by test ID
    const errorMessageElement = getByTestId('errorText');

    // Assert that the error message element exists
    expect(errorMessageElement).toBeTruthy();

    // Assert that the error message has the expected text content
    expect(errorMessageElement.props.children).toBe(errorMessage);
  });
  
});

