import { types } from "./actions";

export const initailState = {
    page:null,
    nav_list:[],
    news_list:null,
    nav_request_flag:0,
    news_request_flag:0,
    loadMore:0,
    brand_id:-1
}

export default (state = initailState,action)=>{

  switch(action.type){
    
   case types["NEWS_PAGE/NEWS_REQUESTTING"]:

      return {...state,
        news_request_flag:((action.extra && action.extra.loadMore)?0:1),
        loadMore:((action.extra && action.extra.loadMore)?1:0)
      };

   case types["NEWS_PAGE/NEWS_REQUEST_SUCCESS"]:

        const { msg_list,total } = action.response;

        const { cur_page,brand_id,isFocus } = action.extra;

        if(action.extra.selType){

          let obj = {...state,news_request_flag:0,loadMore:0,news_list:typeDataHandler(msg_list,state,brand_id),page:pageHanlder(cur_page,total,brand_id,state.page)};

          if(isFocus){
            obj.brand_id = brand_id;
          }

          return obj;

        }else{

          return {...state,news_request_flag:0,loadMore:0,news_list:newsDataHandler(state,msg_list,action.extra),page:pageHanlder(cur_page,total,state.brand_id,state.page)};

        }
          
   case types["NEWS_PAGE/NEWS_REQUEST_FAIL"]:

        return {...state,news_request_flag:0,loadMore:0};

   case types["NEWS_PAGE/NAV_REQUESTTING"]:
       
        return {...state,nav_request_flag:1};

   case types["NEWS_PAGE/NAV_REQUEST_SUCCESS"]:
       
        return {...state,nav_request_flag:0,nav_list:navsDataHandler(action.response.type_list)};

    case types["NEWS_PAGE/NAV_REQUEST_FAIL"]:

        return {...state,nav_request_flag:0};

    case types["NEWS_PAGE/UPDATE_NAV"]:
      
        return {...state,nav_list:action.value};

    case types["NEWS_PAGE/UPDATE_TYPE"]:
      
        return {...state,brand_id:action.value}

    default:
        
       return state;

  }


}

const pageHanlder = (cur_page,final_page,brand_id,page)=>{
  
  let new_page ;

  if(page == null){
    new_page = {};
  }else{
    new_page = {...page}
  }
   
  new_page[brand_id] = {
    cur_page,
    final_page
  }

  return new_page;

}

const typeDataHandler = (msg_list,{news_list},brand_id)=>{

   let new_news_list = {...news_list};

   new_news_list[brand_id] = msg_list;

   return new_news_list;

}

const newsDataHandler = (state,list,{loadMore})=>{

  const { news_list,brand_id } = state;

  let data = {...news_list};

  if(loadMore){

    if(data[brand_id]){
      data[brand_id] = data[brand_id].concat(list);
    }

  }else{
    data[brand_id] = list;
  }

  return data;

}

const navsDataHandler = (list)=>{

  let data =[...list];

  data = data.filter((v)=>{
     if(isNaN(v.brand_id) == false){
       return true;
     }else{
         return false;
     }
  })

  data.unshift({
      brand_id:"-1",
      brand_name:"热点"
  })

  return data;

}