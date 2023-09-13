import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

interface Props {
    children: ReactNode;
  }
  
const KeyboardAvoidingWrapper: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardAvoidingView style={{flex:1}}>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
    
    );
};



export default KeyboardAvoidingWrapper;
