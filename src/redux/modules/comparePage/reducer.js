import { types } from "./actions";
const initailState ={
  product_type:null,
  product1_id:null,
  product2_id:null,
  product3_id:null,
  product4_id:null,
  value:null,
  count:null,
  request_flag:0
}


export default (state = initailState,action)=>{

  switch(action.type){
   
   case types["COMPARE_PAGE/INIT_PARAMS"]:

     const { product_type,product1_id,product2_id,product3_id,product4_id,count } = action.value; 

     return {...state,product_type,product1_id,product2_id,product3_id,product4_id,count};

   case types["COMPARE_PAGE/REQUESTTING"]:
       
      return {...state,request_flag:1};

   case types["COMPARE_PAGE/REQUEST_SUCCESS"]:
       
      return {...state,request_flag:0,value:dataHandler(action.response)};

   case types["COMPARE_PAGE/REQUEST_FAIL"]:
       
      return {...state,request_flag:0};

   case types["COMPARE_PAGE/UPDATE_ACTIVE"]:
      
      return {...state,value:activeHandler(action.value,state.value)};

   case types["COMPARE_PAGE/CLEAR_DATA"]:
      
      return {...state,value:null};

   default:
       
      return state;


  }

}


const activeHandler = ({item,arr},data)=>{

  let new_data = {...data};

  if(item.model == 2){

     if(arr.length == 2){

       new_data.product_parameters[arr[0]].child_list[arr[1]].active = !new_data.product_parameters[arr[0]].child_list[arr[1]].active;

     }else if(arr.length == 1){

      new_data.product_parameters[arr[0]].active = !new_data.product_parameters[arr[0]].active;

     }

  }else if(item.model == 3){

     if(arr.length == 2){

      new_data.product_parameters[arr[0]].child_list[arr[1]].active = !new_data.product_parameters[arr[0]].child_list[arr[1]].active;

     }else if(arr.length == 3){

      new_data.product_parameters[arr[0]].child_list[arr[1]].grand_list[arr[2]].active = !new_data.product_parameters[arr[0]].child_list[arr[1]].grand_list[arr[2]].active;

     } 

  }

  return new_data;

}


const dataHandler = (data)=>{

  let new_data = {...data};

  new_data.product_parameters.forEach((item)=>{
    
     if(item.model == 2){
      
       item.active = false;

       item.child_list.forEach((item_c)=>{
         item_c.active = false;
       })

     }else if(item.model == 3){

      item.child_list.forEach((item_c)=>{

         item_c.active = false;

         item_c.grand_list.forEach((item_c_c)=>{
            item_c_c.active = false;
         })

      })

     }

  })

  return new_data;

}