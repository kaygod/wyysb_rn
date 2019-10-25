import { dataResolve } from '../../../util/common';

export const types = {
    "PORDUCT_DETAIL/REQUESTTING":"PORDUCT_DETAIL/REQUESTTING",
    "PORDUCT_DETAIL/REQUEST_SUCCESS":"PORDUCT_DETAIL/REQUEST_SUCCESS",
    "PRODUCT_DETAIL/REQUEST_FAIL":"PRODUCT_DETAIL/REQUEST_FAIL",
    "PRODUCT_DETAIL/INIT_PARAMS":"PRODUCT_DETAIL/INIT_PARAMS",
    "PRODUCT_DETAIL/TOGGLE_ACTIVE":"PRODUCT_DETAIL/TOGGLE_ACTIVE",
    "PRODUCT_DETAIL/TOGGLE_GALLERY":"PRODUCT_DETAIL/TOGGLE_GALLERY"
}

export const actions = {

  requestData(){
      return (dispatch,getState)=>{
        
        const { product_parent_type,product_id } = getData(getState());
        
        const params={
            url:"/product/msg",
            data:{
                product_parent_type,
                product_id
            },
            types:[types["PORDUCT_DETAIL/REQUESTTING"],types["PORDUCT_DETAIL/REQUEST_SUCCESS"],types["PRODUCT_DETAIL/REQUEST_FAIL"]]
        }
   
        return dispatch(dataResolve(params));

      }
  },
  initParams(product_parent_type,product_id){
      return (dispatch)=>{
        dispatch(initParamsType(product_parent_type,product_id));
      }
  },
  toggle(value,index,index_cc){

    return (dispatch)=>{

       dispatch(toggleType(value,index,index_cc));

    }

  },
  toggleGallery(status){
   
    return (dispatch)=>{
       dispatch(toggleGalleryType(status));
    }

  }

}

const toggleGalleryType = (status)=>{

  return {
    type:types["PRODUCT_DETAIL/TOGGLE_GALLERY"],
    value:status
  }

}

const toggleType = (value,index,index_cc)=>{
  
  return {
      type:types["PRODUCT_DETAIL/TOGGLE_ACTIVE"],
      value:{
          index,
          value,
          index_cc
      }
  }

}

const initParamsType = (product_parent_type,product_id)=>{
    return {
        type:types["PRODUCT_DETAIL/INIT_PARAMS"],
        value:{
            product_parent_type,
            product_id
        }
    }
}

export const getData = (store)=>{
  return store.product_detail;
}
