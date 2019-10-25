import {types} from "./actions";
const initailState={
    product_parent_type:null,
    product_id:null,
    value:null,
    request_flag:0,
    gallery_show:false
}


export default (state = initailState,action)=>{
  
  switch(action.type){
   
   case types["PORDUCT_DETAIL/REQUESTTING"]:

    return {...state,request_flag:1};
   
   case types["PORDUCT_DETAIL/REQUEST_SUCCESS"]:

    return {...state,request_flag:0,value:dataHandler(action.response)};

   case types["PRODUCT_DETAIL/REQUEST_FAIL"]:

    return {...state,request_flag:0};

   case types["PRODUCT_DETAIL/INIT_PARAMS"]:
       
    return {...state,product_parent_type:action.value.product_parent_type,product_id:action.value.product_id};

   case types["PRODUCT_DETAIL/TOGGLE_ACTIVE"]:
     
    return {...state,value:toggleActive(state.value,action.value)};

   case types["PRODUCT_DETAIL/TOGGLE_GALLERY"]:
     
    return {...state,gallery_show:action.value};

   default:
       
     return state;
    
   }

}


/**
 *  对active状态进行处理
 */
const toggleActive = (data,{index,value,index_cc})=>{

    let new_data = {...data};

    if(value.model == 2){

      new_data.product_parameters[index].active = !new_data.product_parameters[index].active;

    }else if(value.model == 3){

      new_data.product_parameters[index].child_list[index_cc].active = !new_data.product_parameters[index].child_list[index_cc].active;
      
    }
    
    return new_data;

}


const dataHandler = (data)=>{
  
   let value = {...data};

   let obj ={
     key_name:"基本参数",
     child_list:value.base_parameters,
     model:2
   }

   value.product_parameters.unshift(obj);

   value.product_parameters.forEach((v)=>{
     if(v.model == 2){
        v.active = false;
     }else if(v.model == 3){
      v.child_list.forEach((child)=>{
         child.active = false;
      })
     }
   })

   value.icon_list=value.icon_list.map((v)=>{
       return {source:{uri:v}};
   })

   return value;
}