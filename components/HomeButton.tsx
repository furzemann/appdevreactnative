import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';


export default function HomeButton() {
  return (
    <Link href="/(tabs)" style={styles.button}>
     <Text style={{fontWeight:200,color:'white'}}> Return to Home </Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  buttonText:{
fontWeight:200,
color:'white'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#060029',
    borderRadius: 5,
    textAlign: 'center',
  },
});
