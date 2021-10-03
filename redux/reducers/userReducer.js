import AsyncStorage from "@react-native-async-storage/async-storage"
const initState = {
    photoURL:"",
    token: "",
    firstName: "",
    likedItineraries:[],
    itinerariesArePopulated: false
}
const userReducer = (state = initState, action) =>{
    switch(action.type){
        case 'USER_LOGGED':
            async function saveStuff(){
                await AsyncStorage.setItem('token', action.payload.token)
                await AsyncStorage.setItem('firstName', action.payload.firstName)
                await AsyncStorage.setItem('photoURL', action.payload.photoURL)
                await AsyncStorage.setItem('likedItineraries', JSON.stringify(action.payload.likedItineraries))
            }
            saveStuff()
            return{
               ...action.payload,
            }
        case 'LOGOUT':
            async function deleteStuff(){
                await AsyncStorage.clear()
            }
            deleteStuff()
            return initState
        case 'LIKED_ITINERARY':
            // await AsyncStorage.setItem('likedItineraries', JSON.stringify(action.payload))
            return{
                ...state,
                likedItineraries:action.payload
            } 
        case 'FAVOURITE_ITINERARIES':
            return{
                ...state,
                likedItineraries:action.payload,
                itinerariesArePopulated: true
            }
        default:
            return state
    }
}
export default userReducer