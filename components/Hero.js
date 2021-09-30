import React from 'react'
import {Text, View, StyleSheet, ImageBackground, Button} from 'react-native'
const Hero = (props) => {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={{uri: "https://mytinerary-budtke.herokuapp.com/assets/fotohero.jpg"}} resizeMode="cover">
                <Text style={styles.text}>Find your perfect trip, designed by insiders who know and love their cities!</Text>
                <Button title="CLICK HERE" color="#131025" onPress={() => {
                    props.navigation.navigate("Cities")
                }}/>
            </ImageBackground> 
        </View>
    )
}
export default Hero
const styles = StyleSheet.create({
    container: {
      height: 250,
    },
    image: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        color: 'white',
        fontSize: 18,
        letterSpacing: 1,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 15,
        marginBottom: 10
    },
})