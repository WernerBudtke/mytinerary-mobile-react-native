import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Navigator from './navigation/MainNavDrawer'
import {applyMiddleware, createStore} from 'redux'
import {LogBox, StatusBar} from 'react-native'
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers/rootReducer.js';
import thunk from 'redux-thunk'
LogBox.ignoreAllLogs(true)


const myStore = createStore(rootReducer, applyMiddleware(thunk))
const App = () => {
  return (
    <Provider store={myStore}>
      <NavigationContainer>
        <StatusBar backgroundColor="#000" barStyle="white" />
        <Navigator/>
      </NavigationContainer>
    </Provider>
  )
}
export default App