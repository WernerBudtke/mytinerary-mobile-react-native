import React from 'react'
import Home from '../screens/Home'
import Cities from '../screens/Cities'
import Itineraries from '../screens/Itineraries'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()
const Navigator = (props) => {
    return (
       <Stack.Navigator>
            <Stack.Screen
               name='Home'
               component={Home}
               options={{
                  title: 'myTinerary - Home',
                  headerTintColor: 'goldenrod',
                  headerStyle: {
                     backgroundColor: '#2a2351',
                  },
                  headerTitleStyle: {
                     fontSize: 25,
                  },
               }}
            />
            <Stack.Screen name='Cities' component={Cities}
               options={{
                  title: 'myTinerary - Cities',
                  headerTintColor: 'goldenrod',
                  headerStyle: {
                     backgroundColor: '#2a2351',
                  },
                  headerTitleStyle: {
                     fontSize: 25,
                  },
               }}
            />
            <Stack.Screen name='Itineraries' component={Itineraries}
               options={{
                  title: 'myTinerary - Itineraries',
                  headerTintColor: 'goldenrod',
                  headerStyle: {
                     backgroundColor: '#2a2351',
                  },
                  headerTitleStyle: {
                     fontSize: 25,
                  },
               }}
            />
       </Stack.Navigator>
    )
 }
 
 export default Navigator