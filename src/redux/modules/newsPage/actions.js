import { dataResolve } from "../../../util/common"

export const types ={
    "NEWS_PAGE/NEWS_REQUESTTING":"NEWS_PAGE/NEWS_REQUESTTING",
    "NEWS_PAGE/NEWS_REQUEST_SUCCESS":"NEWS_PAGE/NEWS_REQUEST_SUCCESS",
    "NEWS_PAGE/NEWS_REQUEST_FAIL":"NEWS_PAGE/NEWS_REQUEST_FAIL",
    "NEWS_PAGE/NAV_REQUESTTING":"NEWS_PAGE/NAV_REQUESTTING",
    "NEWS_PAGE/NAV_REQUEST_SUCCESS":"NEWS_PAGE/NAV_REQUEST_SUCCESS",
    "NEWS_PAGE/NAV_REQUEST_FAIL":"NEWS_PAGE/NAV_REQUEST_FAIL",
    "NEWS_PAGE/SEL_TYPE":"NEWS_PAGE/SEL_TYPE",
    "NEWS_PAGE/UPDATE_NAV":"NEWS_PAGE/UPDATE_NAV",
    "NEWS_PAGE/UPDATE_TYPE":"NEWS_PAGE/UPDATE_TYPE"
}


export const actions ={

  selType(brand_id){

    return (dispatch)=>{
     
        let params ={
          url:"/video_service/news/get_list",
          data:{
            page_no:1,
            brand_id
          },
          extra:{
              cur_page:1,
              brand_id,
              selType:true,
              loadMore:false
          },
          types:[types["NEWS_PAGE/NEWS_REQUESTTING"],types["NEWS_PAGE/NEWS_REQUEST_SUCCESS"],types["NEWS_PAGE/NEWS_REQUEST_FAIL"]]
      }

      return dispatch(dataResolve(params));


    }

  }, 
  getNav(){

      return (dispatch)=>{
         
        let params ={
            url:"/video_service/index/navigation",
            data:{},
            types:[types["NEWS_PAGE/NAV_REQUESTTING"],types["NEWS_PAGE/NAV_REQUEST_SUCCESS"],types["NEWS_PAGE/NAV_REQUEST_FAIL"]]
        }

        return dispatch(dataResolve(params));

      }

  },
  getList(cur_page,loadMore = false){

      return (dispatch,getState)=>{

        const { brand_id } = getData(getState());

        let params ={
            url:"/video_service/news/get_list",
            data:{
              page_no:cur_page,
              brand_id
            },
            extra:{
                cur_page,
                loadMore
            },
            types:[types["NEWS_PAGE/NEWS_REQUESTTING"],types["NEWS_PAGE/NEWS_REQUEST_SUCCESS"],types["NEWS_PAGE/NEWS_REQUEST_FAIL"]]
        }

        return dispatch(dataResolve(params));

      }
  },
  updateNav(list){

    return (dispatch)=>{

      dispatch(updateNavType(list));

    }

  },
  updateType(brand_id){

    return (dispatch)=>{

      dispatch(updateTypeType(brand_id));

    }

  }

}

const updateTypeType = (brand_id)=>{
  return {
    type:types["NEWS_PAGE/UPDATE_TYPE"],
    value:brand_id
  }
}

const updateNavType = (list)=>{
   
  return {
    type:types["NEWS_PAGE/UPDATE_NAV"],
    value:list
  }

}

export const getData = (state)=>{
  
  return state.news_page;

}

export const getNavList = (state)=>{

  return state.news_page.nav_list;

}