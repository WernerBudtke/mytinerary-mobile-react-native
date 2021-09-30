import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Navigator from './navigation/MainNavDrawer'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers/rootReducer.js';
import thunk from 'redux-thunk'
const myStore = createStore(rootReducer, applyMiddleware(thunk))
const App = () => {
  return (
    <Provider store={myStore}>
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
    </Provider>
  )
}
export default App