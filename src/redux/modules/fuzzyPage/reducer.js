import { types } from "./actions";

const initailState = {
    text:"",
    list:[],
    request_flag:0,
    history_list:[]
}

export default (state = initailState, action)=>{

    switch(action.type){

        case types["FUZZY_PAGE/FUZZY_REQUESTTING"]:

                return {...state,request_flag:1};

        case types["FUZZY_PAGE/FUZZY_REQUEST_SCUCESS"]:
            
                return {...state,request_flag:0,list:action.response.product_list};

        case types["FUZZY_PAGE/FUZZY_REQUEST_FAIL"]:
            
                return {...state,request_flag:0};

        case types["FUZZY_PAGE/TEXT_CHANGE"]:
            
                return {...state,text:action.value};

        case types["FUZZY_PAGE/NO_DATA"]:
            
                return {...state,list:[]};
         
        case types["FUZZY_PAGE/CLEAR_HISTORY"]:
            
                return {...state,history_list:[]};

        case types["FUZZY_PAGE/SET_HOSTORY_DATA"]:
                
                return {...state,history_list:action.value};

        default:
            
                return state;

    }

}