import React, { Component } from 'react'
import {View,StyleSheet,SafeAreaView,DeviceInfo} from "react-native";

export default class SafeAreaViewPlus extends Component {

   static defaultProps = {
       topColor:"transparent",
       bottomColor:"#f8f8f8",
       enablePlus:true,
       topInset:true,
       bottomInset:false
   }
   
   /**
    * 即满足手机是iphonex，同时topInset要为true才会渲染头部的间隔栏
    * @param {*} topColor 
    * @param {*} topInset 
    */
   getTopArea(topColor,topInset){
       return !DeviceInfo.isIPhoneX_deprecated || !topInset?null:
        <View  style={[styles.topArea,{backgroundColor:topColor}]}></View>;
   }
   
   /**
    * bottomInset默认是false,所以默认是不渲染底部间隔的
    * @param {*} bottomColor 
    * @param {*} bottomInset 
    */
   getBottomArea(bottomColor,bottomInset){
    return !DeviceInfo.isIPhoneX_deprecated || !bottomInset?null:
    <View style={[styles.bottomArea,{backgroundColor:bottomColor}]}></View>;
   }

   genSafeAreaView(){
       return  <SafeAreaView {...this.props} style={[styles.container,this.props.styles]}>
         {this.props.children}
       </SafeAreaView>
   }

   genSafeAreaViewPlus(){
       const { children,topColor,bottomColor,topInset,bottomInset } = this.props;
       return (
           <View style={[styles.container,this.props.style]}>
               {this.getTopArea(topColor,topInset)}
               {children}
               {this.getBottomArea(bottomColor,bottomInset)}
           </View>
       )
      
    }

   
    render() {
        
        const { enablePlus } = this.props;

        return enablePlus?this.genSafeAreaViewPlus():this.genSafeAreaView();
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    topArea:{
        height:44
    },
    bottomArea:{
        height:34
    }
})