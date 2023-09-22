import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native'; // Import 'act' from testing-library
import LoginForm from '../../app/components/LoginForm/LoginForm';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


jest.mock('axios'); // Mock Axios

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  AsyncStorage.clear();
});

describe('LoginForm component', () => {

  afterEach(() => {
    mockAxios.reset(); // Reset the mock adapter after each test
  });

  test('renders a TouchableOpacity with "Submit" text', () => {
    const { getByTestId } = render(<LoginForm />);
    const submitButton = getByTestId('submitButton');
    
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

  test('handles typing in username input', () => {
    const { getByPlaceholderText } = render(<LoginForm />);
    
    // Find the username input element using its placeholder text
    const usernameInput = getByPlaceholderText('Username');
    
    // Simulate typing in the username field
    fireEvent.changeText(usernameInput, 'testuser');

    // Check if the state value has been updated
    expect(usernameInput.props.value).toBe('testuser');
  });
});
  
  
describe('LoginForm component', () => {

  it('handles successful login', async () => {
    
    const navigateMock = jest.fn();
    const navigation = { navigate: navigateMock };
    const { getByPlaceholderText, getByTestId, debug } = render(<LoginForm navigation={navigation}/>);

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByTestId('submitButton');

    fireEvent.changeText(usernameInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');

    // Mock the axios.post request to simulate a successful response
    const mockResponse = { data: {data:{ accessToken: 'mockedAccessToken' }}};
    jest.spyOn(axios, 'post').mockResolvedValue(mockResponse);


    await act(async () => {
      await fireEvent.press(submitButton);
    });

    // Check if the response value is set correctly
    const successValue = mockResponse;
    expect(successValue).toEqual(mockResponse);


    // Check if the token has been set in storyage 
    let tokenStored = await AsyncStorage.getItem('token');
    expect(tokenStored).toBe('mockedAccessToken');
    
    expect(navigateMock).toHaveBeenCalledWith('NotificationFeed');
  
  });

  it('handles failed login', async () => {
    
    const navigateMock = jest.fn();
    const navigation = { navigate: navigateMock };
    const { getByPlaceholderText, getByTestId, debug } = render(<LoginForm navigation={navigation}/>);

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByTestId('submitButton');

    fireEvent.changeText(usernameInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');

    // Mock the axios.post request to simulate a successful response
    const mockResponse = { error: { message: 'login invalid' }};
    jest.spyOn(axios, 'post').mockResolvedValue(mockResponse);


    await act(async () => {
      await fireEvent.press(submitButton);
    });

    // Check if the response value is set correctly
    const errorValue = mockResponse;
    expect(errorValue).toEqual(mockResponse);

  
  });


  it('handles error if both inputs not provided', async () => {
    
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(<LoginForm />);

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByTestId('submitButton');

    fireEvent.changeText(passwordInput, 'password');

    await act(async () => {
      await fireEvent.press(submitButton);
    });


    const errorText = queryByTestId('errorText');
    expect(errorText).not.toBeNull();
  });

});
  