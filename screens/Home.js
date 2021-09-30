import React from 'react'
import Hero from '../components/Hero'
import { View, StyleSheet, Text } from 'react-native'
import Carousel from '../components/MyCarousel'
const Home = (props) => {
    return (
        <View style={styles.container}>
            <Hero {...props}/>
            <Text style={styles.text}>Popular MyTineraries</Text>
            <Carousel/>
            <Text style={styles.footer}>FWB - 2021</Text>
        </View>
    )
}
export default Home

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