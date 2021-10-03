import React from 'react'
import { View, StyleSheet, Text, FlatList, Button, TextInput, Pressable } from 'react-native'
import { useState, useEffect } from "react"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import {Picker} from '@react-native-picker/picker';
const Register = (props) => {
    const [renderError, setRenderError] = useState({error: ''})
    const countries = ["Argentina", "Chile", "Brazil", "Uruguay", "Perú", "Bolivia", "Paraguay", "Rest of the World"]
    const [loading, setLoading] = useState(false)
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        eMail: '',
        password: '',
        photoURL: '',
        country: countries[0],
        google: false
    })
    useEffect(()=>{
        if(renderError.error.includes('Network')){
            console.error(renderError.error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[renderError.error])
    const inputHandler = (e, string) =>{
        setNewUser({
            ...newUser,
            [string] : e
        })
    }
    const missingFields = () =>{
        let namesOfFields = [...Object.keys(newUser)]
        let bodyFields = [...Object.values(newUser)]
        return namesOfFields.filter((field, index) => bodyFields[index] === "").join(' ')
    }
    const submitNewUser = () =>{ // poner preloader?
        let badFields = missingFields()
        if(badFields === ''){
            setLoading(true)
            props.registerUser(newUser).then(res => {
                !res.success && setRenderError({error: res.error})
                setLoading(false)
                res.success && props.navigation.navigate('Home')
            })
        }else{
            setRenderError({error: badFields})
        } 
    }
    let myErrors = {
        firstName: "First name must be 2 chars min, max 35. No numbers",
        lastName: "Last name must be 2 chars min, max 35. No numbers",
        eMail: renderError.error.includes('eMail already in use') ? "Email already in use!" : "Email must be a valid one, for example jwb@gmail.com",
        password: "Password must be atleast 4 chars or numbers!",
        photoURL: "The URL of the photo must be atleast 6 characters long",
        country: "Country must be a valid one!"
    }
    let myErrorsKeys = Object.keys(myErrors).filter(key => renderError.error.includes(key)) 
    const handleError = (string) =>{
        return renderError.error.includes(string) ? 'fieldError' : ''
    }
    // console.log(myErrorsKeys)
    if(loading){
        return <View style={styles.container}><Text style={styles.text}>Loading...</Text></View>
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>First Name:</Text>
            <TextInput style={styles.input} value={newUser.firstName} onChangeText={e => inputHandler(e, 'firstName')}/>
            <Text style={styles.text}>Last Name:</Text>
            <TextInput style={styles.input} value={newUser.lastName} onChangeText={e => inputHandler(e, 'lastName')}/>
            <Text style={styles.text}>Email:</Text>
            <TextInput style={styles.input} value={newUser.eMail} onChangeText={e => inputHandler(e, 'eMail')}/>
            <Text style={styles.text}>Password:</Text>
            <TextInput style={styles.input} secureTextEntry={true} value={newUser.password} onChangeText={e => inputHandler(e, 'password')}/>
            <Text style={styles.text}>Photo URL:</Text>
            <TextInput style={styles.input} value={newUser.photoURL} onChangeText={e => inputHandler(e, 'photoURL')}/>
            <Text style={styles.text}>Country:</Text>
            <Picker
                style={{ height: 50, width: 150, color: 'white'}}
                dropdownIconColor={'white'}
                selectedValue={newUser.country}
                onValueChange={(itemValue, itemIndex) =>
                    inputHandler(itemValue, 'country')
                }>
                <Picker.Item label="Argentina" value="Argentina" />
                <Picker.Item label="Chile" value="Chile" />
                <Picker.Item label="Brasil" value="Brasil" />
                <Picker.Item label="Uruguay" value="Uruguay" />
                <Picker.Item label="Perú" value="Perú" />
                <Picker.Item label="Bolivia" value="Bolivia" />
                <Picker.Item label="Paraguay" value="Paraguay" />
                <Picker.Item label="Rest of the World" value="Rest of the World" />
            </Picker>
            <Button title='SIGN UP' onPress={submitNewUser}/>
            {/* {renderError.error !== "" &&
                <View>
                    <Text>ERRORS: Please read carefully!</Text>
                    {myErrorsKeys.map((key) => <Text key={`${key}D`}>{myErrors[key]}</Text>)}
                </View>
            } */}
            <Pressable onPress={() => {props.navigation.navigate("Sign In")}}><Text style={styles.textRegister}>Already registered? SIGN IN!</Text></Pressable>
        </View>
    )
}

const mapDispatchToProps = {
    registerUser : userActions.registerUser 
}

export default connect(null, mapDispatchToProps) (Register)

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2a2351',
    },
    text:{
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    textRegister:{
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        color: 'goldenrod',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    footer:{
        backgroundColor: 'black',
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    input: {
        height: 40,
        width: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})