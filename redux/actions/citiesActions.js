import axios from 'axios'
const citiesActions = {
    getAllCities: () =>{
        return async (dispatch) =>{ // se puede utilizar param getState para traerme el store actual.
            try{
                let res = await axios.get('https://mytinerary-budtke.herokuapp.com/api/cities')
                if(res.data.success){
                    if(res.data.response.length > 0){
                        dispatch({type:"GET_ALL_CITIES", payload:res.data.response})
                        return {success:true}
                    }else{
                        throw new Error("No cities found in db")
                    }
                }else{
                    throw new Error(res.data.response)
                } 
            }catch (err){
                return {success:false, error: err}
            }
        }
    },
    filterCities: (inputValue) =>{
        return (dispatch) =>{
            dispatch({type: 'GET_FILTERED_CITIES', payload:inputValue})
        }
    },
    getACity: (id) =>{
        return async (dispatch)=>{        
            try{
                let res = await axios.get(`https://mytinerary-budtke.herokuapp.com/api/city/${id}`)
                    if(res.data.success){
                        if(res.data.response){
                            dispatch({type:"GET_A_CITY", payload: res.data.response})
                            return {success:true}
                        }else{
                            throw new Error('City not found')
                        }
                    }
                    else{
                        throw new Error(res.data.response)
                    }
            }catch(err){
                return {success:false, error:err}
            }
        }
    },
    resetCity: () =>{
        return(dispatch)=>{
            dispatch({type: 'RESET'})
        }
    },
    resetFilter: () =>{
        return dispatch =>{
            dispatch({type: 'RESET_FILTER'})
        }
    }
}
export default citiesActions