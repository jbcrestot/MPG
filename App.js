/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {COLOR, ThemeContext, getTheme} from 'react-native-material-ui';

import Home from './src/components/Home';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

const App: () => React$Node = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Home />
      </ThemeContext.Provider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
