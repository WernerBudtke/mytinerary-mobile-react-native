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
            // console.log(action.payload)
            // localStorage.setItem('token', action.payload.token)
            // localStorage.setItem('firstName', action.payload.firstName)
            // localStorage.setItem('photoURL', action.payload.photoURL)
            // localStorage.setItem('likedItineraries', JSON.stringify(action.payload.likedItineraries))
            // localStorage.setItem('_id', action.payload._id)
            return{
               ...action.payload,
            }
        case 'LOGOUT':
            localStorage.clear()
            return initState
        case 'LIKED_ITINERARY':
            // console.log(action.payload)
            // localStorage.setItem('likedItineraries', JSON.stringify(action.payload))
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