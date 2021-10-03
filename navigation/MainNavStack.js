import React from 'react'
import Home from '../screens/Home'
import Cities from '../screens/Cities'
import Itineraries from '../screens/Itineraries'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Logout from '../screens/Logout'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable, Text } from 'react-native'
const Stack = createNativeStackNavigator()
export const NavHome = (props) => {
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
                 headerRight: () => <Pressable onPress={() => props.navigation.toggleDrawer()}><Text style={{fontSize: 25, color: 'goldenrod'}}>☰</Text></Pressable>
              }}
           />
      </Stack.Navigator>
   )
}
export const NavCities = (props) => {
   return (
      <Stack.Navigator>
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
                  headerRight: () => <Pressable onPress={() => props.navigation.toggleDrawer()}><Text style={{fontSize: 25, color: 'goldenrod'}}>☰</Text></Pressable>
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
export const NavRegister = (props) => {
   return (
      <Stack.Navigator>
            <Stack.Screen name='Register' component={Register}
               options={{
                  title: 'myTinerary - Sign Up',
                  headerTintColor: 'goldenrod',
                  headerStyle: {
                     backgroundColor: '#2a2351',
                  },
                  headerTitleStyle: {
                     fontSize: 25,
                  },
                  headerRight: () => <Pressable onPress={() => props.navigation.toggleDrawer()}><Text style={{fontSize: 25, color: 'goldenrod'}}>☰</Text></Pressable>
               }}
            />
      </Stack.Navigator>
   )
}
export const NavLogin = (props) => {
   return (
      <Stack.Navigator>
            <Stack.Screen name='Login' component={Login}
               options={{
                  title: 'myTinerary - Sign In',
                  headerTintColor: 'goldenrod',
                  headerStyle: {
                     backgroundColor: '#2a2351',
                  },
                  headerTitleStyle: {
                     fontSize: 25,
                  },
                  headerRight: () => <Pressable onPress={() => props.navigation.toggleDrawer()}><Text style={{fontSize: 25, color: 'goldenrod'}}>☰</Text></Pressable>
               }}
            />
      </Stack.Navigator>
   )
}
export const NavLogout = (props) => {
   return (
      <Stack.Navigator>
            <Stack.Screen name='Logout' component={Logout}
               options={{
                  title: 'myTinerary - Logout',
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
// const Navigator = (props) => {
//     return (
//        <Stack.Navigator>
//             <Stack.Screen
//                name='Home'
//                component={Home}
//                options={{
//                   title: 'myTinerary - Home',
//                   headerTintColor: 'goldenrod',
//                   headerStyle: {
//                      backgroundColor: '#2a2351',
//                   },
//                   headerTitleStyle: {
//                      fontSize: 25,
//                   },
//                }}
//             />
//             <Stack.Screen name='Cities' component={Cities}
//                options={{
//                   title: 'myTinerary - Cities',
//                   headerTintColor: 'goldenrod',
//                   headerStyle: {
//                      backgroundColor: '#2a2351',
//                   },
//                   headerTitleStyle: {
//                      fontSize: 25,
//                   },
//                }}
//             />
//             <Stack.Screen name='Itineraries' component={Itineraries}
//                options={{
//                   title: 'myTinerary - Itineraries',
//                   headerTintColor: 'goldenrod',
//                   headerStyle: {
//                      backgroundColor: '#2a2351',
//                   },
//                   headerTitleStyle: {
//                      fontSize: 25,
//                   },
//                }}
//             />
//        </Stack.Navigator>
//     )
//  }
 
//  export default Navigator