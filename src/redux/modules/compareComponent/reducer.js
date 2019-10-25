import { types } from "./actions";

const initailState = {
    list:[]
}

export default (state = initailState,action)=>{

   switch(action.type){
 
   case types["BOTTOM_COMPARE/ADD"]:

        return {...state,list:addHandler(state.list,action.value)};

   case types["BOTTOM_COMPARE/DEL"]:

        return {...state,list:delHandler(state.list,action.value)};
        
   case types["BOTTOM_COMPARE/CLEAR"]:
       
        return {...state,list:[]};
    
   default:

        return state;

  }

}

const addHandler = (list,item)=>{
   
    var new_list = null;

    if(list.length == 0){
       new_list = [];
    }else{
        new_list = [...list]
    }

    new_list.unshift(item);

    return new_list;

}

const delHandler = (list,item)=>{

    var new_list = [...list];

    let idx = new_list.findIndex((v)=>{
      return (v.product_id == item.product_id && v.product_type == item.product_type);
    })

    if(idx != -1){
       new_list.splice(idx,1);
    }

    return new_list;

}