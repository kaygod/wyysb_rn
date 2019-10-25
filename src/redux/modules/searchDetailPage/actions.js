import { dataResolve } from "../../../util/common";

export const types ={
    "SEARCH_DETAIL/SEARCH_REQUETTING":"SEARCH_DETAIL/SEARCH_REQUETTING",
    "SEARCH_DETAIL/SEARCH_REQUEST_SUCCESS":"SEARCH_DETAIL/SEARCH_REQUEST_SUCCESS",
    "SEARCH_DETAIL/SEARCH_FAIL":"SEARCH_DETAIL/SEARCH_FAIL",
    "SEARCH_DETAIL/INIT_PARAMS":"SEARCH_DETAIL/INIT_PARAMS"
}

export const actions = {

  requestData(page,loadMore = false){

      return (dispatch,getState)=>{
        
            const { type_list,keyword } = getData(getState());

            let params={
                url:"/product_list/search2",
                types:[types["SEARCH_DETAIL/SEARCH_REQUETTING"],types["SEARCH_DETAIL/SEARCH_REQUEST_SUCCESS"],types["SEARCH_DETAIL/SEARCH_FAIL"]],
                data:{
                    key_word:keyword,
                    type_list,
                    page
                },
                extra:{
                    cur_page:page,
                    loadMore
                }
            }

            return dispatch(dataResolve(params));

      }

  },
  initParams(keyword){
      return (dispatch)=>{
          dispatch(initParamsType({
              type_list:[
                  {
                      product_type:9,
                      brand_id_list:["21"]
                  },{
                      product_type:1,
                      brand_id_list:[21,80,94]
                  },{
                      product_type:53,
                      brand_id_list:[21]
                  },
                  {
                    product_type:3,
                    brand_id_list:[21]
                 },
                 {
                    product_type:12,
                    brand_id_list:[21]
                 },
                 {
                    product_type:12,
                    brand_id_list:[21]
                 }
                ],
              keyword:"yi"
          }));
      }
  }

}

export const getData = (state)=>{
    return state.search_detail;
}

const initParamsType = (value)=>{
    return {
        type:types["SEARCH_DETAIL/INIT_PARAMS"],
        value
    }
}