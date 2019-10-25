import { dataResolve } from "../../../util/common";
import dao from "../../../util/dao";

export const types ={
    "FUZZY_PAGE/FUZZY_REQUESTTING":"FUZZY_PAGE/FUZZY_REQUESTTING",
    "FUZZY_PAGE/FUZZY_REQUEST_SCUCESS":"FUZZY_PAGE/FUZZY_REQUEST_SCUCESS",
    "FUZZY_PAGE/FUZZY_REQUEST_FAIL":"FUZZY_PAGE/FUZZY_REQUEST_FAIL",
    "FUZZY_PAGE/TEXT_CHANGE":"FUZZY_PAGE/TEXT_CHANGE",
    "FUZZY_PAGE/SET_HOSTORY_DATA":"FUZZY_PAGE/SET_HOSTORY_DATA",
    "FUZZY_PAGE/CLOSE_SEARCH":"FUZZY_PAGE/CLOSE_SEARCH",
    "FUZZY_PAGE/NO_DATA":"FUZZY_PAGE/NO_DATA",
    "FUZZY_PAGE/CLEAR_HISTORY":"FUZZY_PAGE/CLEAR_HISTORY"
}


export const actions = {
  
  requestData(){
      return (dispatch,getState)=>{

        const text = getText(getState());

         let params = {
             url:"/product_list/fuzzy",
             data:{
                keyword:text,
                product_parent_type:[9,1,8,10,53,2,6,5,4,3,11,13,12]
             },
             types:[types["FUZZY_PAGE/FUZZY_REQUESTTING"],types["FUZZY_PAGE/FUZZY_REQUEST_SCUCESS"],types["FUZZY_PAGE/FUZZY_REQUEST_FAIL"]]
        }

        return dispatch(dataResolve(params));

      }    
  },
  textChange(text){
      return (dispatch)=>{
          dispatch(textChangeType(text));
      }
  },
  setHistoryData(value){
      return (dispatch)=>{

          if(typeof value == "string"){
            value = JSON.parse(value);
          }else if(typeof value  == "undefined"){
            value = [];
          }

          dispatch(setHistoryData(value));

      }
  },
  closeSearch(){
      return (dispatch)=>{

      }
  },
  setNoData(){
      return (dispatch)=>{
        dispatch(setNoDataType());
      }
  },
  storeData(value){
      return (dispatch,getState)=>{

        const history_list = getHistoryList(getState());

        let new_list = [...history_list];

        if(!new_list.includes(value)){
            new_list.unshift(value);
        }

        if(new_list.length>6){
           new_list.pop();
        }

         dao.storeData("search",JSON.stringify(new_list))

         dispatch(setHistoryData(new_list));

      }
  },
  clearHistory(){
      return (dispatch)=>{
       
        dao.storeData("search",JSON.stringify([])); 
        
        dispatch(clearHistoryType());

      }
  }

}


const setHistoryData = (value)=>{

  return {
      type:types["FUZZY_PAGE/SET_HOSTORY_DATA"],
      value
  }

}

const clearHistoryType = ()=>{
    return {
        type:types["FUZZY_PAGE/CLEAR_HISTORY"]
    }
}

const setNoDataType = ()=>{
    return {
        type:types["FUZZY_PAGE/NO_DATA"]
    }
}

const textChangeType = (value)=>{
    return {
        type:types["FUZZY_PAGE/TEXT_CHANGE"],
        value
    }
}



export const getText = (state)=>{
  return state.fuzzy_page.text;
}

export const getList  = (state)=>{
    return state.fuzzy_page.list;
}

export const getHistoryList = (state)=>{
    return state.fuzzy_page.history_list;
}