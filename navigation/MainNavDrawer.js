import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainNavStack from './MainNavStack'
import Cities from '../screens/Cities'
import Itineraries from '../screens/Itineraries'

const Drawer = createDrawerNavigator()

const Navigator = (props) => {
   return (
      <Drawer.Navigator screenOptions={{
         drawerContentStyle:{
            backgroundColor:'#2a2351'
         },
         drawerInactiveBackgroundColor:'black',
         drawerInactiveTintColor:'white',
         drawerActiveBackgroundColor:'black',
         drawerActiveTintColor:'goldenrod',
         drawerLabelStyle:{
            fontSize:25,
            textAlignVertical:'center',
         },
         headerTintColor:'goldenrod',
         headerStyle: {
            backgroundColor: '#2a2351',
         },
         headerTitleStyle: {
            fontSize: 25,
         },
      }}>
         <Drawer.Screen
            name='Home'
            component={MainNavStack}
            options={{
               headerShown: false,
            }}
         />
         <Drawer.Screen name='Cities' component={Cities} />
         {/* <Drawer.Screen name='Itineraries' component={Itineraries} /> */}
      </Drawer.Navigator>
   )
}

export default Navigator
