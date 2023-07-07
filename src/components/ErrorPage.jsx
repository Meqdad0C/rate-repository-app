import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ErrorPage = ({ errorMessage, onRetry }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorMessage}</Text>
    <Button title="Retry" onPress={onRetry} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ErrorPage;
