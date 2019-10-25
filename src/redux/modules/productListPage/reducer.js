import { types } from "./actions";

const initialState = {
  type_id:null,
  type_name:null,
  product_type:null,
  cur_page:1,
  final_page:1,
  request_flag:0,
  list:null,
  loaded:false
}

export default (state = initialState,action)=>{
 
   switch(action.type){
     
     case types["PRODUCT_LIST/REQUESTTING"]:

        return {...state,request_flag:1};

     case types["PRODUCT_LIST/REQUEST_SUCCESS"]:

        const {total_page,product_list,type_name} = action.response;

        const {  loadMore,cur_page,compareList } = action.extra;
         
        return {...state,request_flag:0,cur_page,final_page:total_page,list:dataHandler(product_list,type_name,state,loadMore,compareList),loaded:true};

    case types["PRODUCT_LIST/REQUESET_FAIL"]:
        
        return {...state,request_flag:0};

    case types["PRODUCT_LIST/INIT_PARAMS"]:
        
        return {...state,type_id:action.value.type_id,product_type:action.value.product_type,type_name:action.value.type_name}; 
    
    case types["PRODUCT_LIST/CLEAR_DATA"]:
       
        return initialState;
    
    case types["PRODUCT_LIST/UPDATE_ACTIVE"]:
       
        return {...state,data:activeHandler(state.list,action.value)};
    
        default:
        
        return state;

   }

}


const activeHandler = (data,index)=>{
  
  let list = [...data];

  list[index].active = !list[index].active;

  return list;

}

/**
 * 对数据集进行处理
 */
const dataHandler = (data,type_name,state,loadMore,compare_list)=>{

   const {cur_page,list} = state;

   let new_list  = [...data];

   new_list.forEach((v)=>{
      v.active = getFlag(v,compare_list);
   })

   if(!loadMore){//第一次请求数据s
      new_list.unshift({
        product_id:"-1",
        serial_num:type_name,
        additional:true
       });
   }else{
      new_list = list.concat(new_list);
   }

   return new_list;

}

const getFlag = (item,list)=>{

   if(list.length == 0){
     return false;
   }

   let result = list.find((v)=>{
      return item.product_id == v.product_id && item.product_type == v.product_type;
   })

   if(result){
      return true; 
   }else{
      return false;
   }

}

