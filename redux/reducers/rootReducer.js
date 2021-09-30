import { combineReducers } from "redux";
import citiesReducer from "../reducers/citiesReducer.js";
import itinerariesReducer from '../reducers/itinerariesReducer.js'
import userReducer from "../reducers/userReducer.js";

// reducer habilitado a modificar el store
const rootReducer = combineReducers({
   citiesRed : citiesReducer,
   itinerariesRed : itinerariesReducer,
   usersRed : userReducer
}) // le paso como parametro un obj que contiene mis reducers.
export default rootReducer