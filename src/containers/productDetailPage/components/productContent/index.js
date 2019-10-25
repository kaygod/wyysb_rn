import React, { Component } from 'react'
import { Text,StyleSheet,View,ScrollView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";
import global from "../../../../style";
import { connect } from "react-redux";
import { actions as productDetailAction,getData } from "../../../../redux/modules/productDetailPage/actions";
import { bindActionCreators } from 'redux';

class productContent extends Component {

    
    toggle = (item,index,index_cc=null)=>{
         
       this.props.productDetailAction.toggle(item,index,index_cc);        

    }



    /**
     * 
     * [
     *   {
     *      key_name:"处理器",
     *      child_list:[{key_name:"型号",value:"Intel"}],
     *      model:2,
     *      active:false
     *   },
     *   {
     *      key_name:"扩展槽",
     *      model:3,
     *      child_list:[
     *         {
     *            key_name:"选项1",
     *            active:false,
     *            grand_list:[
     *              {
     *                 key_name:"概述",
     *                 value:2
     *              }
     *            ]
     *         }
     *      ]
     *   }
     * ]
     *
     * 
     */ 

    renderContent = (product_parameters)=>{
       
        return (

            product_parameters.map((v,index)=>{

                if(v.model == 2){

                    return (
                        <View style={styles.body_list} key={index}>
                            <TouchableWithoutFeedback onPress={()=>{this.toggle(v,index)}}>
                                <View style={styles.body_top}>
                                    <Text style={styles.body_top_left}>{v.key_name}</Text>
                                    <Ionicons style={styles.body_top_right} name={v.active?"ios-remove":"ios-add"} size={24} color="#fff"/>
                                </View>
                            </TouchableWithoutFeedback>
                            <View>
                                {
                                    v.active?null:    
                                    v.child_list.map((child,index_c)=>{
                                       return (
                                            <View style={[styles.body_item,(index_c == v.child_list.length-1?styles.border_none:null)]} key={index_c}>
                                                <Text style={styles.body_item_left}>{child.key_name}</Text>
                                                <Text style={styles.body_item_right}>{child.value}</Text>
                                            </View>
                                       )
                                    })
                                }
                            </View>
                        </View>
                     )

                }else if(v.model == 3){

                    return v.child_list.map((child,index_cc)=>{

                        return (
                            <View style={styles.body_list} key={index_cc}>
                                <TouchableWithoutFeedback onPress={()=>{this.toggle(v,index,index_cc)}}>
                                    <View style={styles.body_top}>
                                        <Text style={styles.body_top_left}>{v.key_name} ({child.key_name})</Text>
                                        <Ionicons style={styles.body_top_right} name={child.active?"ios-remove":"ios-add"} size={24} color="#fff"/>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View>
                                    {
                                    child.active?null:    
                                    child.grand_list.map((child_c,index_cc_c)=>{
                                        return (
                                                <View style={[styles.body_item,(index_cc_c == child.grand_list.length-1?styles.border_none:null)]} key={index_cc_c}>
                                                    <Text style={styles.body_item_left}>{child_c.key_name}</Text>
                                                    <Text style={styles.body_item_right}>{child_c.value}</Text>
                                                </View>
                                        )
                                        })
                                    }
                                </View>
                            </View>
                        )

                    })

                }

                
            })
        )

     }


    render() {

        if(!this.props.data.value){
            return null;
        }

        const { product_parameters } = this.props.data.value;

        return (
            <View style={styles.body}>
                <ScrollView>
                      {
                          this.renderContent(product_parameters)
                      }
                </ScrollView>    
            </View>
        )
    }
}

const mapStateToProps = (state)=>{ 
    return {
      data:getData(state)
    }
 }

 const mapDispatchToProps = (dispatch)=>{
    return {
        productDetailAction:bindActionCreators(productDetailAction,dispatch)
    }
 }

export default connect(mapStateToProps,mapDispatchToProps)(productContent);

const styles = StyleSheet.create({
 body:{
     flex:1,
     marginLeft:15,
     marginRight:15
 },
 body_list:{
  marginTop:10
 },
 body_top:{
     height:35,
     flexDirection:"row",
     backgroundColor:"#3d464d",
     alignItems:"center",
     justifyContent:"space-between"
 },
 body_top_left:{
   marginLeft:5,
   color:global.themeColor
 },
 body_top_right:{
  marginRight:5
 },
 body_item:{
   flexDirection:"row",
   paddingTop:12,
   paddingBottom:12,
   borderBottomColor:global.borderColor,
   borderBottomWidth:1,
   justifyContent:"space-between"
 },
 body_item_left:{
   marginLeft:5,
   color:"#999",
   flex:1/2
 },
 body_item_right:{
   marginRight:5,
   color:"#666",
   flex:1/2
 },
 border_none:{
     borderBottomWidth:0
 } 
})
