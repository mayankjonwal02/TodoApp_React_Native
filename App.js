import React from 'react';
import Main from './app/components/main';
import { StyleSheet, Text, View } from 'react-native';


export default class App extends React.Component {
  

  render() {
   

    return <Main />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});