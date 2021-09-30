const initState = {
    cities: [],
    filteredCities:[],
    city:{},
    fetching: true,
    fetchingCity: true,
}
const citiesReducer = (state = initState, action) =>{
    switch(action.type){
        case "GET_ALL_CITIES":
            return {
                ...state,
                cities:action.payload,
                filteredCities:action.payload,
                fetching: false,    
            }
        case "GET_FILTERED_CITIES":
            return {
                ...state,
                filteredCities:state.cities.filter(object => object.city.toLowerCase().startsWith(action.payload.toLowerCase().trim())),
            }
        case "GET_A_CITY":
            return{
                ...state,
                city:action.payload,
                fetchingCity: false,
            }
        case "RESET":
            return{
                ...state,
                fetchingCity: true,
                city:{}
            }
        case "RESET_FILTER":
            return{
                ...state,
                filteredCities:state.cities
            }
        default:
            return state
    }
}
export default citiesReducer

// el reducer estará a la escucha de las action de mis componentes
// y del estado del state centralizado
// de acuerdo a la action que reciba, debe modificar el store
