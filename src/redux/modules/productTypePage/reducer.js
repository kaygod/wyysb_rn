import { types } from "./actions";

const initialState = {
  request_flag:0,
  data:null,
  total_level:null,
  product_parent_type:null
}


export default (state = initialState,action)=>{
  
    switch(action.type){
       
      case types["PRODUCT_TYPE/REQUESTTING"]:

          return {...state,request_flag:1};

      case types["PRODUCT_TYPE/REQUEST_SUCCESS"]:
          
          return {...state,request_flag:0,data:resultHandle(getOptions(action,state)),total_level:action.response.total_level,product_parent_type:action.response.product_parent_type};

      case types["PRODUCT_TYPE/REQUEST_FAIL"]:
          
          return {...state,request_flag:0};

      case types["PRODUCT_TYPE/UPDATE_ACTIVE"]:
          
          return {...state,data:dataActiveHandler(state.data,action.value)};

      case types["PRODUCT_TYPE/CLEAR_DATA"]:
          
          return initialState;

      default:
          
          return state;

    }

}


/**
 * 对data的active做处理
 */
const dataActiveHandler = (state,params)=>{
     
     let data = {...state};

    if(params.level == 1){ //改变的是第1层的数据

        data.child_list[params.index].active = !data.child_list[params.index].active;

        data.child_list.forEach((v,idx)=>{
            if(idx != params.index){
                v.active = false;
            }
        })

        return data;

    }else if(params.level == 2){

        let index1 = getFirstIndex(data);

        data.child_list[index1].child.child_list[params.index].active = !data.child_list[index1].child.child_list[params.index].active;

        data.child_list[index1].child.child_list.forEach((v,idx)=>{
            if(idx != params.index){
                v.active = false; 
            }
        })
        
        return data;

    }

}

const getFirstIndex = (data)=>{
     
    return data.child_list.findIndex((v)=>{
       return v.active;
    })

}

/**
 * 组装options参数
 * 
 *  index1为第一层的索引
 *  index2为第二层的索引 
 *  level表示当前请求的是第几层 
 */
const getOptions = (action,state)=>{

    const { index1,index2,level } = action.extra;

    return {
        index1,
        index2,
        level,
        v:action.response,
        state
    }
}


const addActive = (list,level = null)=>{
   
    let {child_list} = list;

    child_list.forEach((item)=>{
       item.active = false;
    })

    list.child_list = child_list;

    if(level == 1){
        if(!list.child_list[0].child){
            list.child_list[0].active = true;
        }
    }

    return list;

}

const resultHandle = (options)=>{

    const {v,index1,state} = options;
    
    if(v.total_level == 1){ //只有一层数据
       
       return v;

    }else if(v.total_level == 2){
       
       if(v.type == 1){ //表示当前请求的数据为第一层

         return addActive(v);

       }else{ //当前请求的数据为第二层

        let data = {...state.data};

        data.child_list[index1].child = addActive(v);

        return data;

       }

    }else if(v.total_level == 3){

        return three_level_handler(options);

    }



}


/**
 * 第三层数据的处理
 * 
 */
const three_level_handler = (options)=>{

    const {v,index1,state,level,index2} = options;

    let data ={...state.data};

    if(level == 1){

        return addActive(v,level);

    }else if(level == 2){ //请求的是第二层数据
         
        data.child_list[index1].child = addActive(v);

    }else if(level == 3){

        data.child_list[index1].child.child_list[index2].child = addActive(v);

    }

    return data;

}