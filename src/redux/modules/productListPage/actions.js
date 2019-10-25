import { dataResolve } from "../../../util/common";
import {getData} from "../compareComponent/actions";


export const types = {
    "PRODUCT_LIST/REQUESTTING":"PRODUCT_LIST/REQUESTTING",
    "PRODUCT_LIST/REQUEST_SUCCESS":"PRODUCT_LIST/REQUEST_SUCCESS",
    "PRODUCT_LIST/REQUESET_FAIL":"PRODUCT_LIST/REQUESET_FAIL",
    "PRODUCT_LIST/INIT_PARAMS":"PRODUCT_LIST/INIT_PARAMS",
    "PRODUCT_LIST/CLEAR_DATA":"PRODUCT_LIST/CLEAR_DATA",
    "PRODUCT_LIST/UPDATE_ACTIVE":"PRODUCT_LIST/UPDATE_ACTIVE"
}

export const actions = {

  getData(page,loadMore = false){
      return (dispatch,getState)=>{

        const {type_id,product_type} = getProductListData(getState());
         
        let params = {
            url:"/product_list/type",
            data:{
                type_id,
                product_type,
                page_no:page
            },
            extra:{
              cur_page:page,
              loadMore,
              compareList:getData(getState()).list
            },
            types:[types["PRODUCT_LIST/REQUESTTING"],types["PRODUCT_LIST/REQUEST_SUCCESS"],types["PRODUCT_LIST/REQUESET_FAIL"]]
        }

        return dispatch(dataResolve(params));

      }
  },
  initParams(type_id,product_type,type_name){

    return (dispatch)=>{
       
       dispatch(initParamsType(type_id,product_type,type_name));

    }

  },
  clearData(){
    return (dispatch)=>{
       dispatch(clearDataType());
    }
  },
  updateActive(index){
    return (dispatch,getState)=>{

        if(typeof index == "object"){

          const { list } = getProductListData(getState());

          let idx = list.findIndex((v)=>{
            return v.product_id == index.product_id && v.product_type == index.product_type;
          })

          if(idx!=-1){
            dispatch(updateActiveType(idx));
          }

        }else{
          dispatch(updateActiveType(index));
        }
      
    }
  }

}

const updateActiveType = (index)=>{
  return {
    type:types["PRODUCT_LIST/UPDATE_ACTIVE"],
    value:index
  }
}

const clearDataType = ()=>{
  return {
    type:types["PRODUCT_LIST/CLEAR_DATA"]
  }
}

const initParamsType = (type_id,product_type,type_name)=>{
  return {
      type:types["PRODUCT_LIST/INIT_PARAMS"],
      value:{
          type_id,
          product_type,
          type_name
      }
  }
}

export const getProductListData = (store)=>{
    return store.product_list;
}