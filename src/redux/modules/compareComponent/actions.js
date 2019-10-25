import {Alert} from "react-native";
import { MAX_COMPARE_COUNT,NOT_COMPARE_DIFF_PRODUCT } from "../../../util/constants";
import { confirm } from "../../../util/common";
export const types ={
    "BOTTOM_COMPARE/ADD":"BOTTOM_COMPARE/ADD",
    "BOTTOM_COMPARE/DEL":"BOTTOM_COMPARE/DEL",
    "BOTTOM_COMPARE/CLEAR":"BOTTOM_COMPARE/CLEAR"
}


export const actions = {
    add(item){
      
      return (dispatch,getState)=>{

          return new Promise((resolve)=>{

             const {list} = getData(getState());

             if(list.length>=4){ //对比数量大于或者等于4
                 Alert.alert(MAX_COMPARE_COUNT);
                return false;
             }
              
             //进行不同的数据对比
             if(list.length>0 && list[0].product_type != item.product_type){

                confirm({
                    content:NOT_COMPARE_DIFF_PRODUCT,
                    callback:()=>{

                        dispatch(clearType());

                        dispatch(addType(item));

                        resolve(true);   


                    }
                })

             }else{

                dispatch(addType(item));

                resolve(true);   

             }

          })

      }

    },
    del(item){

      return (dispatch)=>{

        return new Promise((resolve)=>{

            dispatch(delType(item));

            resolve(true);

         })
  
      }

    },
    clear(){
     
      return (dispatch)=>{
         
        dispatch(clearType());

      }

    }
}


const clearType = ()=>{
    return {
        type:types["BOTTOM_COMPARE/CLEAR"]
    }
}

const addType = (item)=>{
    return {
        type:types["BOTTOM_COMPARE/ADD"],
        value:item
    }
}

const delType = (item)=>{
    return {
        type:types["BOTTOM_COMPARE/DEL"],
        value:item
    }
}

export const getData = (state)=>{

    return state.compare_data;

}