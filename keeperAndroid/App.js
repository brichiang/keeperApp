import React from 'react';
import { StyleSheet, View } from 'react-native';
import Navigation from './comps/Navigation';

import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './redux/combine';

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  )
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <Navigation />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
