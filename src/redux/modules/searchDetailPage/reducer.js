import { types } from "./actions";

const initailState = {
  keyword:"",
  type_list:[],
  cur_page:1,
  final_page:1,
  request_flag:0,
  list:[]
}

export default ( state = initailState,action )=>{
 
      switch(action.type){
    
        case types["SEARCH_DETAIL/INIT_PARAMS"]:

            const {keyword,type_list} = action.value;
        
            return {...state,keyword,type_list};
    
        case types["SEARCH_DETAIL/SEARCH_REQUETTING"]:
        
            return {...state,request_flag:((action.extra && action.extra.loadMore)?0:1)};

        case types["SEARCH_DETAIL/SEARCH_REQUEST_SUCCESS"]:

            const { response , extra  } = action;

            console.log(action);

            return {...state,request_flag:0,list:dataHandler(state,response.product,extra.loadMore),cur_page:extra.cur_page,final_page:response.total};
        
        case types["SEARCH_DETAIL/SEARCH_FAIL"]:
            
            return {...state,request_flag:0};

        default:
            
            return state;

  }

}

const dataHandler = (state,list,loadMore)=>{
  
    let new_list = [];

    if(loadMore){

        const data = [...state.list];

        new_list = data.concat(list);
       
    }else{

        new_list = list;

    }

    return new_list;
     
}