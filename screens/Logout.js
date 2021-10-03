import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import { View, StyleSheet, Text } from 'react-native'
import Carousel from '../components/MyCarousel'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
const Logout = (props) => {
    useEffect(()=>{
        async function dieAcc(){
            await props.logOut()
        }
        dieAcc().then(() => props.navigation.navigate('Home'))
    },[])
    return (
        <View style={styles.container}>
            <Text>Bye!</Text>
        </View>
    )
}
const mapDispatchToProps = {
    logOut : userActions.logOut
}
export default connect(null, mapDispatchToProps)(Logout)

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#2a2351'
    },
    text:{
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 5,
        paddingTop: 5,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    footer:{
        backgroundColor: 'black',
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
})