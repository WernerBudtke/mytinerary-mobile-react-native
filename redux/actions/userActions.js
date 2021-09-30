import axios from 'axios'
const userActions = {
    registerUser: (dataUser) =>{
        return async (dispatch) =>{
            try{
                let res = await axios.post(`https://mytinerary-budtke.herokuapp.com/api/user/register`, dataUser)
                if (res.data.success){
                    dispatch({type:'USER_LOGGED', payload: res.data.response})
                    return {success:true, response:res.data.response}
                }else{
                    throw new Error(res.data.response)
                }
            }catch(err){
                return {success:false, error: err.message}
            }
        }
    },
    loginUser: (dataUser)=>{
        return async (dispatch) =>{
            try{
                let res = await axios.post(`https://mytinerary-budtke.herokuapp.com/api/user/login`, dataUser)
                if (res.data.success){
                    dispatch({type:'USER_LOGGED', payload: res.data.response})
                    return {success:true , response:res.data.response}
                }else{
                    // console.log(res.data.response)
                    throw new Error(res.data.response)
                }
            }catch(err){
                // console.log(err)
                return {success:false, error: err.message}
            }
        }
    },
    logOut: () =>{
        return (dispatch)=>{
            dispatch({type: 'LOGOUT'})
        }
    },
    logInLS: (savedUser) =>{
        return async (dispatch) => {
            try{
                let res = await axios.get('https://mytinerary-budtke.herokuapp.com/api/user/valid',{
                    headers:{
                        Authorization: 'Bearer ' + savedUser.token
                    }
                })
                if(res.data.success){
                    dispatch({type: 'USER_LOGGED', payload: savedUser})
                    return {success:true}
                }else{
                    throw new Error('Invalid user')
                }
            }catch(err){
                dispatch({type: 'LOGOUT'})
                return {success: false, error: err.message}
            }
        }
    },
    likeAnItinerary: (idItinerary, token) =>{
        // console.log(token)
        return async (dispatch) =>{
            try{
                let res = await axios.put(`https://mytinerary-budtke.herokuapp.com/api/user/like/${idItinerary}`,{},{
                    headers:{
                        Authorization: 'Bearer ' + token
                    }
                })
                if (res.data.success){
                    dispatch({type:'LIKED_ITINERARY', payload: res.data.response})
                    // console.log(res.data.response)
                    return {success:true}
                }else{
                    throw new Error(res.data.response)
                }
            }catch(err){
                return {success: false, response: err}
            }
        }
    },
    populateItineraries: (token) =>{
        return async (dispatch)=>{
            try{
                let res = await axios.get('https://mytinerary-budtke.herokuapp.com/api/user/favourites',{
                    headers:{
                        Authorization: 'Bearer ' + token
                    }
                })
                if(res.data.success){
                    dispatch({type:'FAVOURITE_ITINERARIES', payload: res.data.response})
                    return {success: true, response: res.data.response}
                }else{
                    throw new Error(res.data.response)
                }
            }catch(err){
                return {success: false, response: err}
            }
        }
    },
    isValidOwner: (token) =>{
        return async dispatch =>{
            try{
                let res = await axios.get('https://mytinerary-budtke.herokuapp.com/api/user/validowner',{
                    headers:{
                        Authorization: 'Bearer ' + token
                    }
                })
                if(res.data.success){
                    return {success: true, response: res.data.response}
                }else{
                    throw new Error('not a valid owner')
                }
            }catch(err){
                return {success: false, response: err}
            }
        }
    }
    // colocarle return al axios.get, si luego lo voy a usar con then y catch. que tengan return dentro
}
export default userActions