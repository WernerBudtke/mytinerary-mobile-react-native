import React from 'react'
import { View, StyleSheet, Text, ImageBackground, Button, FlatList, Pressable } from 'react-native'
import { useEffect } from "react"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import citiesActions from "../redux/actions/citiesActions"
import Itinerary from '../components/Itinerary'
const Itineraries = (props) =>{
    const {cities, itineraries, fetchingItineraries, city, fetchingCity} = props
    let data = cities.length > 0 ? cities.find(city => city._id === props.route.params.id) : null
    const errorHandler = (res) =>{
        if(!res.success){
            console.error(res.error)
        }
    }
    useEffect(() => {
        if(!data){
            props.getACity(props.route.params.id).then(res => errorHandler(res))
        }
        props.getAllItineraries(props.route.params.id).then(res => errorHandler(res)) 
        return () => {
            props.resetItineraries()
            props.resetCity()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const fetchAgain = (type = null) =>{
        props.getAllItineraries(props.route.params.id).then(res => {
            type === "post" && props.sentTheComment()
            errorHandler(res)
        })
    }
    const dataHandler = (string) =>{
        return data ? data[string] : city[string]
    }
    if(fetchingItineraries && fetchingCity){
        return (
            <>  
                <Text>Loading...</Text>
            </>
        )
    }
    return(
        <View style={styles.container}>
            <View>
                <ImageBackground style={styles.image} source={{uri: `https://mytinerary-budtke.herokuapp.com/assets/${dataHandler('image')}`}} resizeMode="cover">
                    <Text style={styles.text}>In: {dataHandler("country")} you can...</Text>
                    <Text style={styles.text}>Unfold the beauty of: {dataHandler("city")}</Text>
                </ImageBackground>
            </View>
            <Text></Text>
            {(itineraries && itineraries.length === 0) 
            ?   <Text>OOPS, No itineraries yet</Text> 
            :   <FlatList
                data={itineraries}
                keyExtractor={ item => item._id}
                renderItem={ item => <Itinerary itinerary={item}/>}/>}
            {/* <Button title="BACK TO CITIES"/> */}
        </View>
    )
}
const mapStateToProps = (state) =>{
    return{
        cities : state.citiesRed.cities,
        city : state.citiesRed.city,
        itineraries : state.itinerariesRed.itineraries,
        fetchingItineraries: state.itinerariesRed.fetching,
        fetchingCity: state.citiesRed.fetchingCity
    }
}
const mapDispatchToProps = {
    getAllItineraries : itinerariesActions.getAllItinerariesFromCity,
    resetItineraries : itinerariesActions.resetItineraries,
    getACity : citiesActions.getACity,
    resetCity : citiesActions.resetCity,
    sentTheComment : itinerariesActions.sentTheComment
}
export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)

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
        textShadowColor: 'orange',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        backgroundColor:'rgba(0, 0, 0, 0.75)'
    },
    footer:{
        backgroundColor: 'black',
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    image:{
        height: 250,
    },
})