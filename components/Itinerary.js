import React from "react"
import { Text, View, ImageBackground, Image, StyleSheet, Button } from "react-native"
const Itinerary = (props) => {
    return (
        <View style={styles.container}> 
            <View style={styles.authorContainer}>
                <View style={styles.authorContainer}>
                    <Image style={styles.image} source={{uri: `https://mytinerary-budtke.herokuapp.com/assets/${props.itinerary.item.author.image}`}} />
                    <Text style={styles.textAuthor}>{props.itinerary.item.author.name}</Text>
                </View>
                <Text style={styles.title}>{props.itinerary.item.title}</Text>
            </View>
            <Text style={styles.title}>{props.itinerary.item.description}</Text>
            <View>
                <Text>Price: {}</Text>
                <Text>Duration: {props.itinerary.item.duration} 🕒</Text>
                <Text>Likes: {props.itinerary.item.likes}</Text>
            </View>
            {props.itinerary.item.hashtags.map((hashtag, index) => <Text key={index}>#{hashtag}</Text>)}
            <Button title="View more"/>
        </View>
    )
}
export default Itinerary
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'goldenrod',
        color: 'white'
    },
    image:{
        height: 65,
        width: 65,
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 100
    },
    title:{
        marginRight: 10
    },
    authorContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})