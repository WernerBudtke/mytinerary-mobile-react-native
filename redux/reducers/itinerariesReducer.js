const initState = {
    itineraries:[],
    fetching: true,
    itineraryComment: false
}
const itinerariesReducer = (state = initState, action) =>{
    switch(action.type){
        case "GET_AN_ITINERARY":
            return{
                ...state,
                itineraries:action.payload,
                fetching: false
            }
        case "SENT_COMMENT":
            return{
                ...state,
                itineraryComment:!state.itineraryComment
            }
        case "RESET":
            return initState
        default:
            return state
    }
}
export default itinerariesReducer