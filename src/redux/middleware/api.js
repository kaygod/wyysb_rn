import {get,post,service_ip,msgCode} from "../../util/common";
import { CAN_NOT_CONNECT } from "../../util/constants";
import {Alert} from "react-native";

const fun ={
  "get":get,
  "post":post
}

export default store => next => action=>{
    
   if(!action.type.isFetching){ //直接放行
     
     return next(action);

   }

   const {url,types,method,data,extra} = action.type.isFetching;

   if(!url){
      throw new Error("url为必须要传递的项");
   }

   if(types.length!==3){
     throw new Error("请求状态请穿三个来");
   }

   let [requesting,success,fail] = types;
    
      next(requesting);

      return new Promise((resolve)=>{
        
        fun[method]({url:`${service_ip}${url}`,data}).then((res)=>{

          if(extra && extra.delay === false){

            resolve();
  
            return requestHandler({res,extra,success,next,fail});
  
          }else{
  
            let timer=setTimeout(() => {
        
              clearTimeout(timer);

              resolve();
                
              return requestHandler({res,extra,success,next,fail});
    
              }, 250);
  
          }  
  
        }).catch((err)=>{
  
           errHandler(fail,next);
  
        })

      })

}

const errHandler = (fail,next)=>{

   Alert.alert(CAN_NOT_CONNECT);

}

const requestHandler = (obj)=>{

  const {res,extra,success,next,fail} = obj;

            
  if(res.result == 1){

    if(extra){
      success.extra = extra; 
    }

     return next(operate(success,res));

   }else{
  
    return next(fail);

    Alert.alert(msgCode(res.errno));

   } 

}


const operate=(successType,res)=>{  //只要是通过这个中间件的就一定带有response属性
   
    successType.response=res.data;

    return successType;

}