import React from "react"
import { Text, View, ImageBackground, Image, StyleSheet, Button, FlatList, TextInput, Pressable } from "react-native"
import { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import itinerariesActions from "../redux/actions/itinerariesActions"
const Itinerary = (props) => {
    const {author, description, hashtags, price, duration, likes, title, _id, comments} = props.itinerary.item
    const [render, setRender] = useState(false)
    const [blankComment, setblankComment] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [logged, setLogged] = useState(false)
    const [idUser, setidUser] = useState('')
    const [activities, setActivities] = useState([])
    const clickHandler = (e) =>{
        // e.target.innerText = e.target.innerText === "View more" ? 'View less' : 'View more'
        !activities.length && props.getActivities(_id)
        .then(res => {
            res.success && setActivities(res.response)
            
        })
        setRender(!render)
        // scrollToBottom()
    }
    const priceHandler = ()=>{
        let arrayPrice = []
        for(let i = 0; i < price; i++){
            arrayPrice.push('💵')
        }
        return arrayPrice.map((dollar, index) => <Text key={index}>{dollar}</Text>)
    }
    const heartHandler = () =>{
        if(disabled){
            return
        }
        if(!props.token){ // comunicar que debe estar logueado
            // setLogged(true)
            return
        }
        setDisabled(true) // desabilito el input handler
        // setLogged(false)
        props.likeAnItinerary(_id, props.token)
        .then((res) => {
            if(res.success){
                setDisabled(false) // habilito el input handler de nuevo
                props.myFunction() // mando a fetchear los itinerarios
            }else{
                console.error(res.response)
            }
        })
    }
    const [newComment, setnewComment] = useState("")
    const commentInputHandler = (e) =>{
        setnewComment(e)
    }
    const commentSendHandler = () =>{
        if(!props.token){
            return
        }
        if(newComment === ''){
            return
        }
        props.sendComment(newComment, null, props.token, _id, "post").then(res => {
            if(res.success){
                props.myFunction("post")
                setnewComment('')
            }else{
                console.error('was not able to send comment')
            }
        })
    }
    // console.log(activities)
    console.log(comments)
    return (
        <View style={styles.container}> 
            <View style={styles.authorContainer}>
                <View style={styles.authorContainer}>
                    <Image style={styles.image} source={{uri: `https://mytinerary-budtke.herokuapp.com/assets/${props.itinerary.item.author.image}`}} />
                    <Text style={styles.textAuthor}>{props.itinerary.item.author.name}</Text>
                </View>
                <Text style={styles.title}>{props.itinerary.item.title}</Text>
            </View>
            <Text style={styles.description}>{props.itinerary.item.description}</Text>
            <View style={styles.moreinfo}>
                <Text style={styles.textInfo}>Price: {priceHandler()}</Text>
                <Text style={styles.textInfo}>Duration: {props.itinerary.item.duration} 🕒{props.itinerary.item.duration === 1 ? 'hr' : 'hrs'}</Text>
                <Pressable onPress={heartHandler}><Text style={styles.textInfo}>Likes: {props.itinerary.item.likes} {props.likedItineraries.find(element => element._id === _id) ? '❤️' : props.likedItineraries.indexOf(_id) !== -1 ? '❤️' : '🤍'}</Text></Pressable>
            </View>
            <View style={styles.moreinfo}>
                {props.itinerary.item.hashtags.map((hashtag, index) => <Text key={index}>#{hashtag}</Text>)}
            </View>
            <Button title={!render ? 'View More' : 'View Less'} onPress={clickHandler}/>
            {render && 
            <View>
                <Text style={styles.subtitle}>Activities</Text>
                <View style={styles.activities}>
                    {activities.length > 0 
                    ?
                    <FlatList data={activities} listKey={(item, index) => `_key${index.toString()}`} keyExtractor={(item) => item._id + 'D'} renderItem={({item}) => <ImageBackground style={styles.activity} source={{uri: `${item.photo}`}} resizeMode="cover"><Text style={styles.actTitle}>{item.title}</Text></ImageBackground>}/>
                    :
                    <Text>No activities yet!</Text>
                    }
                </View>
                <Text style={styles.subtitle}>Comments</Text>
                <View>
                {comments.length > 0 
                    ?
                    <FlatList data={comments} listKey={(item, index) => `_key${index.toString()}`} keyExtractor={(item) => item._id + 'C'} renderItem={({item}) => <View style={styles.commentContainer}><Text style={styles.commentTextAuthor}>{item.author.name.firstName} {item.author.name.lastName}</Text><Text style={styles.commentText}>{item.comment}</Text></View>}/>
                    :
                    <Text>No comments yet!</Text>
                }
                {!props.token && <Text style={styles.actTitle}>You must log in to post a comment!</Text>}
                {props.token ? <TextInput style={styles.input} onChangeText={e => commentInputHandler(e)} value={newComment}/> : <Text></Text>}
                {props.token ? <Button onPress={commentSendHandler} title='Send'/> : <Text></Text>}
                </View>
                
            </View>}
        </View>
    )
}
const mapStateToProps = (state) =>{
    return{
        token: state.usersRed.token,
        likedItineraries: state.usersRed.likedItineraries,
        itineraryComment: state.itinerariesRed.itineraryComment
    }
}
const mapDispatchToProps = {
    likeAnItinerary : userActions.likeAnItinerary,
    sendComment : itinerariesActions.sendComment,
    isValidOwner : userActions.isValidOwner,
    getActivities : itinerariesActions.getActivities
}
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        color: 'white',
        marginBottom: 10
    },
    image:{
        height: 65,
        width: 65,
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 100
    },
    title:{
        marginRight: 10,
        color: 'white'
    },
    activity:{
        width: '100%',
        height: 200
    },
    authorContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        height: 40,
        width: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    moreinfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    description:{
        textAlign: 'center',
        color: 'white',
        marginBottom: 5
    },
    activities:{
        flexDirection: 'column',
        width: '100%'
    },
    commentContainer:{
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        marginBottom: 5
    },
    commentText:{
        paddingLeft: 5,
        fontSize: 15
    },
    commentTextAuthor:{
        paddingLeft: 5,
        backgroundColor: '#2a2351',
        fontSize: 15,
        color: 'white'
    },
    textAuthor:{
        color: 'white'
    },
    textInfo:{
        color: 'white'
    },
    subtitle:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'teal'
    },
    actTitle:{
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        fontSize: 15
    }
})