import {types} from "./actions";

const initailState={
    error:null,
    redirect:false
}

export default (state = initailState,action)=>{

    if(action.error){
       
      return {...state,error:action.error}

    }else if(action.type == types["GLOBAL/CLEAR_ERROR"]){

      return {...state,error:null};  

    }else if(action.type == types["GLOBAL/SET_ERROR"]){
        return {...state,error:action.value};  
    }else if(action.type == types["GLOBAL/REDIRECT"]){
        return {...state,redirect:true};  
    }
    else if(action.type == types["GLOBAL/CLEAR_REDIRECT"]){
        return {...state,redirect:false};  
    } 
    else{
        return state;
    }

}