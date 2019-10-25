export const types={
    "GLOBAL/CLEAR_ERROR":"global/clear_error",
    "GLOBAL/SET_ERROR":"global/set_error",
    "GLOBAL/REDIRECT":"GLOBAL/REDIRECT",
    "GLOBAL/CLEAR_REDIRECT":"GLOBAL/CLEAR_REDIRECT"
}

export const actions = {

    clearError(){
       return (dispatch)=>{

        dispatch(clearError());

       }  
    },

    resetRedirection(){

     return (dispatch)=>{

        dispatch(clearRedirect()); 

     }
          
    }

}

export const clearError = ()=>{
  
    return {
        type:types["GLOBAL/CLEAR_ERROR"]
    }

}

export const setError = (v)=>{
    return {
        type:types["GLOBAL/SET_ERROR"],
        value:v
    }
}

export const clearRedirect = ()=>{
    return {
        type:types["GLOBAL/CLEAR_REDIRECT"]
    }
}

export const getError = (state)=>{
  return state.global.error;
}

export const getRedirectStatus = (state)=>{
  return state.global.redirect;
}