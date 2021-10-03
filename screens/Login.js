import React from 'react'
import { View, StyleSheet, Text, TextInput, Button, Pressable } from 'react-native'
import { useState, useEffect } from "react"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"

const Login = (props) => {
    const [renderError, setRenderError] = useState({error: '', errorEffect: true})
    const [loading, setLoading] = useState(false)
    const [dataUser, setDataUser] = useState({
        eMail: '',
        password: '',
        google: false
    })
    const missingFields = () =>{
        const {eMail, password} = dataUser
        let namesOfFields = ["eMail", "password"]
        let bodyFields = [eMail, password]
        return namesOfFields.filter((field, index) => bodyFields[index] === "").join(' ')
    }
    const inputHandler = (e, string) =>{
        setDataUser({
            ...dataUser,
            [string] : e
        })
    }
    const submitHandler = () =>{ // agregar preloader?
        let badFields = missingFields()
        if(badFields === ''){
            setLoading(true)
            props.loginUser(dataUser).then(res => {
                !res.success && setRenderError({error: res.error, errorEffect:!renderError.errorEffect})
                setLoading(false)
                res.success && props.navigation.navigate('Home')
            })
        }else{
            setRenderError({error: badFields, errorEffect:!renderError.errorEffect})
        }   
    }
    useEffect(()=>{
        if(renderError.error.includes('Network')){
            console.error(renderError.error)
            props.history.push('/error')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[renderError.error])
    if(loading){
        return <View style={styles.container}><Text style={styles.text}>Loading...</Text></View>
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email:</Text>
            <TextInput style={styles.input} value={dataUser.eMail} onChangeText={e => inputHandler(e, 'eMail')}/>
            <Text style={styles.text}>Password:</Text>
            <TextInput style={styles.input} secureTextEntry={true} value={dataUser.password} onChangeText={e => inputHandler(e, 'password')}/>
            <Button onPress={submitHandler} title="Sign In"/>
            <Pressable onPress={() => {
                    props.navigation.navigate("Sign Up")
                }}><Text style={styles.textRegister}>Don't have an acc yet? SIGN UP NOW</Text></Pressable>
            {renderError.error !== "" && <Text>{renderError.error.includes('Google') ? renderError.error : 'Invalid email or password!'}</Text>}
        </View>
    )
}
const mapStateToProps = (state) =>{
    return{
    }
}
const mapDispatchToProps = {
    loginUser : userActions.loginUser
}
export default connect(mapStateToProps, mapDispatchToProps) (Login)


const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
    textRegister:{
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        paddingBottom: 5,
        paddingTop: 5,
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