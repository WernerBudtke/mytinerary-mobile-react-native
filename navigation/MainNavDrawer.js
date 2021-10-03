import React from 'react'
import { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
   NavHome,
   NavCities,
   NavLogin,
   NavRegister,
   NavLogout,
} from "./MainNavStack"
import { connect } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import userActions from '../redux/actions/userActions';
const Drawer = createDrawerNavigator()

const Navigator = (props) => {
   const handleDrawer = (props) =>{
      props.navigation.toggleDrawer()
   }
   const {token} = props
   useEffect(() =>{
      async function myFunction(){
         if(await AsyncStorage.getItem('token')){
            const savedUser = {
               photoURL: await AsyncStorage.getItem('photoURL'),
               token: await AsyncStorage.getItem('token'),
               firstName: await AsyncStorage.getItem('firstName'),
               likedItineraries: JSON.parse(await AsyncStorage.getItem('likedItineraries'))
            }
            props.logLs(savedUser).then((res) => console.log(res))
            // console.log(savedUser)
            // console.log(token)
         }
      }
      myFunction()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
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
            name='Home '
            component={NavHome}
            options={{
               headerShown: false,
            }}
            handleDrawer={handleDrawer}
         />
         <Drawer.Screen name='Cities ' component={NavCities} options={{headerShown: false}}/>
         {!props.token ? <Drawer.Screen name='Sign In' component={NavLogin} options={{headerShown: false}}/> : <Drawer.Screen name='Sign Out' component={NavLogout} options={{headerShown: false}}/>}
         {!props.token && <Drawer.Screen name='Sign Up' component={NavRegister} options={{headerShown: false}}/>}
      </Drawer.Navigator>
   )
}
const mapStateToProps = (state) =>{
   return{
         token: state.usersRed.token,
   }
}
const mapDispatchToProps = {
   logLs: userActions.logInLS
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigator)
