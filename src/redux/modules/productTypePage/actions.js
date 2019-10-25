import { dataResolve } from "../../../util/common";
export const types={
    "PRODUCT_TYPE/REQUESTTING":"PRODUCT_TYPE/REQUESTTING",
    "PRODUCT_TYPE/REQUEST_SUCCESS":"PRODUCT_TYPE/REQUEST_SUCCESS",
    "PRODUCT_TYPE/REQUEST_FAIL":"PRODUCT_TYPE/REQUEST_FAIL",
    "PRODUCT_TYPE/UPDATE_ACTIVE":"PRODUCT_TYPE/UPDATE_ACTIVE",
    "PRODUCT_TYPE/CLEAR_DATA":"PRODUCT_TYPE/CLEAR_DATA"
}

export const actions = {

  getData(options){

    const {type_id,index1,index2,level} = options;

    return (dispatch,getState)=>{
        
        let params ={
            url:"/type_list/msg",
            data:{
             type_id
            },
            extra:{
              index1,
              index2,
              level
            },
            types:[types["PRODUCT_TYPE/REQUESTTING"],types["PRODUCT_TYPE/REQUEST_SUCCESS"],types["PRODUCT_TYPE/REQUEST_FAIL"]]
        }
  
       return dispatch(dataResolve(params));

    }

  },
  updateActive(index,level){
    return (dispatch)=>{
       
        dispatch(updateActiveType(index,level));

    }
  },
  clearData(){
    return (dispatch)=>{
       dispatch(clearDataType());
    }
  }

}


const clearDataType = ()=>{
  return {
    type:types["PRODUCT_TYPE/CLEAR_DATA"]
  }
}

const updateActiveType = (index,level)=>{
  
   return {
     type:types["PRODUCT_TYPE/UPDATE_ACTIVE"],
     value:{
       index,
       level
     }
   }

}

export const getProductTypeData = (store)=>{
  return store.product_type;
}
