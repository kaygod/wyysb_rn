import hexMD5 from "./md5";

import axios from "axios";

import { Alert,findNodeHandle,UIManager } from "react-native";

import { NavigationActions } from "react-navigation";

export const service_ip = "https://m.wayforcloud.com";

export const get = (params)=>{
  
   return new Promise((resolve,reject)=>{

        fetch(params.url,{
          method:"GET"
        }).then((res)=>{
          if(typeof res == "string"){
             res=JSON.parse(res);
          }
          resolve(res.data);
       })
       .catch((error)=>{
         reject();
         console.log(error);
       })

   })  

}

export const post = (params)=>{

  return new Promise((resolve,reject)=>{

    return axios.post(params.url,params.data).then((res)=>{
      if(typeof res == "string"){
         res=JSON.parse(res);
      }
      resolve(res.data);
   })
   .catch((error)=>{
     reject();
     console.log(error);
   })

})  

}


export const delay = (time=20)=>{

   return new Promise((resolve)=>{
       
       let timer = setTimeout(()=>{
         
        clearTimeout(timer);

        resolve(null);


       },time)

   })

}

export const dataResolve=(params)=>{ 
  return {
    type:{
      isFetching:{
          url:params.url,
          types:transformObject(params.types),
          method: params.method || "post",   //默认为post请求
          data:paramsHandler(params.data),
          extra:params.extra || null
      }
    }
  }
}


const transformObject=(params)=>{
  return params.map((v)=>{
    return {
        type:v
    }
  })
}

export const typesHandler = (array)=>{
   
  let obj={};

  array.forEach((v)=>{
    obj[v] = v;
  })

  return obj;

}

export const push = (options,dispatch)=>{

  const {route,params} = options;

  dispatch(NavigationActions.navigate({routeName: route,params}));

}

export const goBack = (dispatch)=>{

  dispatch(NavigationActions.back());

}

export const confirm  = (options)=>{

   Alert.alert(
     options.title || "提示",
     options.content || "",
     [
       {
         text:"取消",
         style:"cancel"
       },
       {
         text:"确定",
         onPress:()=>{
           if(options.callback){
            options.callback();
           }
         }
       }
     ]
   )

}

/**
 * post参数处理
 */
function paramsHandler(v) {

  let params = {
    data: v
  }

  let secrete = "xinwei2017";
  params.secret = secrete;
  params.source = "pline";
  //params.platform = "41";
  params = JSON.stringify(params);
  let params2 = hexMD5(params);
  var second = params2.slice(1);
  second += params2[0];
  params2 = second;
  var reg = new RegExp(secrete);
  params = params.replace(reg, params2);
  return params;
}


//错误码
export const msgCode = (n)=>{
  if (n === undefined) {
    return "";
  }
  n = n.toString();
  switch (n) {
    case "100": return "json解析错误";
    case "101": return "缺少参数";
    case "102": return "密码错误";
    case "200": return "数据校验错误";
    case "625": return "数据库操作失败";
    case "1000": return "验证码错误";
    case "1001": return "您的账号已经被锁定，无法进行操作";
    case "1010": return "公司已经注册";
    case "1011": return "公司不存在";
    case "1020": return "手机号码已经注册了";
    case "1021": return "手机号码还没有注册";
    case "1022": return "手机号码不属于此用户";
    case "1030": return "用户不存在";
    case "1031": return "该账号未开启用户身份";
    case "1032": return "请进行企业认证";
    case "1033": return "本账号一天取消次数达到上限";
    case "1040": return "密码错误";
    case "1050": return "本订单状态下，不能进行此操作";
    case "1051": return "本订单没有邀请此服务商";
    case "1052": return "本账号不能接此订单";
    case "1053": return "本账号不是此订单的服务商";
    case "1054": return "此订单不是由本账号发布";
    case "1055": return "订单已取消";
    case "1056": return "订单不存在";
    case "1057": return "本账号无权对此订单进行此操作";
    case "1058": return "订单已评价";
    case "1060": return "账号在另一台手机登录了";
    case "1070": return "该公司已存在相同手机号码的工程师";
    case "1071": return "工程师不存在";
    case "1072": return "本账号无权对此操作";
    case "1090": return "该记录不存在";
    case "1170": return "您所在区域无可用服务商,无法发布订单";
    case "1250": return "百度地图第三方接口错误";
    case "1220": return "没有查询到相应订单";
    case "1212": return "密码错误";
    default: return "未知错误";
  }
}


export const timeFilter = (date)=>{
   if(date === undefined){
     return "";
   }
   return date.slice(0,10);
}

export const layout = (ref)=>{

  const handle = findNodeHandle(ref);
   
  return new Promise((resolve) => {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          resolve({
              x,
              y,
              width,
              height,
              pageX,
              pageY
          });
      });
  });
  
}
