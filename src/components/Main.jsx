import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import AppBar from './AppBar'
import BodyMassIndexCalculator from './Bmi'
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
  text: {
    color: 'grey',
    fontSize: 14,
  },
  blueText: {
    color: 'blue',
  },
  bigText: {
    fontSize: 24,
    fontWeight: '700',
  },
});
import { React } from 'react';
import { Text,Platform } from 'react-native';

const styles2 = StyleSheet.create({
  text: {
    color: Platform.OS === 'android' ? 'green' : 'blue',
  },
});

const WhatIsMyPlatform = () => {
  return <Text style={styles2.text}>Your platform is: {Platform.OS}</Text>;
};


const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <WhatIsMyPlatform />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/bmi" element={<BodyMassIndexCalculator />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
