import React from 'react'
import { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainNavStack from './MainNavStack'
import Cities from '../screens/Cities'
import { connect } from "react-redux"
import Login from '../screens/Login'
import Register from '../screens/Register'
import Logout from '../screens/Logout'
import AsyncStorage from "@react-native-async-storage/async-storage"
import userActions from '../redux/actions/userActions';
const Drawer = createDrawerNavigator()

const Navigator = (props) => {
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
            console.log(savedUser)
            console.log(token)
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
            name='Home'
            component={MainNavStack}
            options={{
               headerShown: false,
            }}
         />
         <Drawer.Screen name='Cities' component={Cities} />
         {!props.token ? <Drawer.Screen name='Login' component={Login} /> : <Drawer.Screen name='Logout' component={Logout} />}
         {!props.token && <Drawer.Screen name='Register' component={Register} />}
         {/* <Drawer.Screen name='Itineraries' component={Itineraries} /> */}
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
