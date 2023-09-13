import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LoggedInHeaderProps {
    title: string;
}
  
const LoggedInHeader: React.FC<LoggedInHeaderProps>  = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3498db',
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.26,
    elevation: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
});

export default LoggedInHeader;
