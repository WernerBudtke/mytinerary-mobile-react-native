import React from 'react'
import { View, StyleSheet, Text, ImageBackground, TextInput, Image, FlatList, Pressable } from 'react-native'
import { useEffect } from "react"
import {connect} from 'react-redux'
import citiesActions from "../redux/actions/citiesActions.js"
const Cities = (props) =>{
    const {allCities, filteredCities, fetching, filterCities} = props
    useEffect(() => {
        if(allCities.length === 0){
            props.getCities().then(res => {
                if(!res.success){
                    console.error(res.error)
                }
            })
        }
        return () => {
            props.resetFilter()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const onPressFunction = (e) =>{
        props.navigation.navigate('Itineraries', {
            id: e
        })
    }
    let dataToShow = []
    dataToShow = filteredCities.length > 0 ? filteredCities : allCities
    return (
        <View style={styles.container}>
            {fetching && <View style={styles.containerLoad}><Text style={styles.textLoad}>Loading...</Text></View>}
            {!fetching && 
                <View>
                    <View style={styles.hero}>
                        <ImageBackground style={styles.image} source={{uri: "https://mytinerary-budtke.herokuapp.com/assets/fotohero.jpg"}} resizeMode="cover">
                            <Text style={styles.text}>Find the perfect travel destination for your trip!</Text>
                            <TextInput style={styles.input} onChangeText={e => filterCities(e)}/>
                        </ImageBackground>
                    </View>
                    {filteredCities.length > 0 ? 
                    <View style={styles.citiesContainer}>
                        <FlatList
                            data={dataToShow}
                            keyExtractor={(item) => item._id}
                            renderItem={({item}) => (
                                <View style={styles.cities}>
                                    <Pressable onPress={() => onPressFunction(item._id)}>
                                        <ImageBackground style={styles.image} source={{uri: `https://mytinerary-budtke.herokuapp.com/assets/${item.image}`}} resizeMode="cover">
                                            <Text style={styles.textCities}>{item.city}</Text>
                                        </ImageBackground>
                                    </Pressable>
                               </View>
                        )}/>
                    </View>
                    :
                    <View>
                        <Text>No cities found</Text>
                    </View>}
                </View>}
            <Text style={styles.footer}>FWB - 2021</Text>
        </View>
    )
}
const mapStateToProps = (state) =>{
    return{
        allCities: state.citiesRed.cities,
        filteredCities: state.citiesRed.filteredCities,
        fetching: state.citiesRed.fetching
    } 
}
const mapDispatchToProps = {
    getCities:citiesActions.getAllCities,
    resetFilter:citiesActions.resetFilter,
    filterCities: citiesActions.filterCities
}

export default connect(mapStateToProps,mapDispatchToProps)(Cities)

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#2a2351'
    },
    containerLoad: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2351'
    },
    citiesContainer:{
        paddingBottom: 620
    },
    cities:{
        marginBottom: 20
    },
    hero:{
        marginBottom: 10
    },
    footer:{
        backgroundColor: 'black',
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    image:{
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 40,
        width: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    text:{
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    textLoad:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    textCities:{
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
})