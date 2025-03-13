import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const SuperAi = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon, good things takes time!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#000",
  },
  text: {
    fontSize: 16,
    color:"#fff"
  },
});

export default SuperAi