import {getData as getCompareData} from "../compareComponent/actions";
import { dataResolve } from "../../../util/common";
export const types = {
    "COMPARE_PAGE/REQUESTTING":"COMPARE_PAGE/REQUESTTING",
    "COMPARE_PAGE/REQUEST_SUCCESS":"COMPARE_PAGE/REQUEST_SUCCESS",
    "COMPARE_PAGE/REQUEST_FAIL":"COMPARE_PAGE/REQUEST_FAIL",
    "COMPARE_PAGE/INIT_PARAMS":"COMPARE_PAGE/INIT_PARAMS",
    "COMPARE_PAGE/UPDATE_ACTIVE":"COMPARE_PAGE/UPDATE_ACTIVE",
    "COMPARE_PAGE/CLEAR_DATA":"COMPARE_PAGE/CLEAR_DATA"
}

const getObject = (list)=>{
    
   let obj = {};

   Array.from(Array(4)).forEach((v,index)=>{
      
       if(index<=list.length-1){
         
          obj[`product${index+1}_id`] = list[index].product_id;

       }else{

        obj[`product${index+1}_id`] = 0;

       }

   })

   return obj;

}


export const actions ={

    clearData(){

        return (dispatch)=>{

            dispatch(clearDataType());

        }

    },
    initParams(){
       
      return (dispatch,getState)=>{

        const { list } = getCompareData(getState());

        if(list == null || list.length == 0){
           return false;
        }

        let obj = getObject(list);

        obj.product_type = list[0].product_type;

        obj.count = list.length;
        
        dispatch(initParamsType(obj));
       
      }

    },
    requestData(){

       return (dispatch,getState)=>{

        const { product_type,product1_id,product2_id,product3_id,product4_id } = getData(getState());
          
           let params ={
               url:"/compare/msg",
               data:{
                   product_type,
                   product1_id,
                   product2_id,
                   product3_id,
                   product4_id
               },
               types:[types["COMPARE_PAGE/REQUESTTING"],types["COMPARE_PAGE/REQUEST_SUCCESS"],types["COMPARE_PAGE/REQUEST_FAIL"]]
           }

           return dispatch(dataResolve(params));

       }   

    },
    updateActive(item,arr){

      return (dispatch)=>{
        
        dispatch(updateActiveType(item,arr));

      }

    }

}

const clearDataType = ()=>{
    return {
        type:types["COMPARE_PAGE/CLEAR_DATA"]
    }
}

const updateActiveType = (item,arr)=>{

    return {
        type:types["COMPARE_PAGE/UPDATE_ACTIVE"],
        value:{
            item,
            arr
        }
    }

}

const initParamsType = ({product_type,product1_id,product2_id,product3_id,product4_id,count})=>{
 
    return {
        type:types["COMPARE_PAGE/INIT_PARAMS"],
        value:{
            product_type,
            product1_id,
            product2_id,
            product3_id,
            product4_id,
            count
        }
    }

}

export const getData = (state)=>{
    return state.compare_page;
}