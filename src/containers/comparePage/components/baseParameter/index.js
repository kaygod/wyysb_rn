import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import global from "../../../../style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as comparePageAction } from "../../../../redux/modules/comparePage/actions";
import { getData } from '../../../../redux/modules/comparePage/actions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import HTML from "react-native-render-html";

class BaseParameter extends Component {


    updateActive = (item,index1,index2 = null,index3 = null)=>{

      let arr = [index1];

      if(index2 !== null){
        arr.push(index2);
      }

      if(index3 !== null){
        arr.push(index3)
      }

      this.props.comparePageAction.updateActive(item,arr);

    }

    renderContent = ()=>{

          
         const { count } = this.props.data;

         const { product_parameters,base_parameters } = this.props.data.value;

 
          return  product_parameters.map((item,index)=>{

                 if(item.model == 2){

                    return (
                       
                        <View key={index} style={{marginBottom:10}}>
                            <View style={styles.title}>
                                <Text style={styles.title_left}>{item.key_name}</Text>
                                <TouchableWithoutFeedback onPress={()=>{this.updateActive(item,index)}}>
                                  <Ionicons name={item.active?"ios-add":"ios-remove"} size={25} color="#fff" style={styles.title_right}/>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.parameter}>

                                {
                                    !item.active && 
                                    item.child_list.map((item_child,index2)=>{
                                        return (
                                            <View style={styles.parameter_item} key={index2}>
                                                <View style={styles.item_parent}>
                                                    <Text style={styles.item_parent_left}>{item_child.key_name}</Text>
                                                    <TouchableWithoutFeedback onPress={()=>{this.updateActive(item,index,index2)}}>
                                                      <Ionicons style={styles.item_parent_right} size={20} color="#0064d0" name={item_child.active?"ios-arrow-dropdown-circle":"ios-arrow-dropup-circle"}/>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                <View style={styles.item_child}>
                                                    {
                                                        !item_child.active && 
                                                        Array.from(Array(count)).map((item_child_child,index3)=>{
                                                            return (
                                                                    <View style={styles.item_child_list} key={index3}>
                                                                        <Text style={styles.item_child_left}>{base_parameters[index3].product_name}</Text>
                                                                        <View style={styles.item_child_right}>                                                                    
                                                                              <HTML html={item_child[`value_${index3}`]}></HTML>
                                                                        </View>
                                                                    </View>    
                                                            )
                                                        })    
                                                    }                       
                                                </View>
                                           </View>     
                                        )
                                    })
                                }

                            </View> 
                       </View>       
                    )

                 }else if(item.model == 3){

                
                    return  item.child_list.map((item_c,idx)=>{

                               return (
                                        <View key={idx} style={{marginBottom:10}}>
                                            <View style={styles.title}>
                                                <Text style={styles.title_left}>{item.key_name}({item_c.key_name})</Text>
                                                <TouchableWithoutFeedback onPress={()=>{this.updateActive(item,index,idx)}}>
                                                   <Ionicons name={item_c.active?"ios-add":"ios-remove"} size={25} color="#fff" style={styles.title_right}/>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <View style={styles.parameter}>

                                                {
                                                    !item_c.active && 
                                                    item_c.grand_list.map((item_c_c,index2)=>{
                                                        return (
                                                            <View style={styles.parameter_item} key={index2}>
                                                                <View style={styles.item_parent}>
                                                                    <Text style={styles.item_parent_left}>{item_c_c.key_name}</Text>
                                                                    <TouchableWithoutFeedback onPress={()=>{this.updateActive(item,index,idx,index2)}}>
                                                                      <Ionicons style={styles.item_parent_right} size={20} color="#0064d0" name={item_c_c.active?"ios-arrow-dropdown-circle":"ios-arrow-dropup-circle"}/>
                                                                    </TouchableWithoutFeedback>
                                                                </View>
                                                                <View style={styles.item_c_c}>
                                                                    {
                                                                        !item_c_c.active && 
                                                                        Array.from(Array(count)).map((item_child_child,index3)=>{
                                                                            return (
                                                                                    <View style={styles.item_child_list} key={index3}>
                                                                                        <Text style={styles.item_child_left}>{base_parameters[index3].product_name}</Text>
                                                                                        <View style={styles.item_child_right}>
                                                                                            <HTML html={item_c_c[`value_${index3}`]}></HTML>
                                                                                        </View>
                                                                                    </View>    
                                                                            )
                                                                        })    
                                                                    }                       
                                                                </View>
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
        

    }

    render() {

        if(!this.props.data.value){
            return null;
        }

        console.log(this.props.data.value);

        return (
            <View style={styles.box}>
                {this.renderContent()}
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
      comparePageAction:bindActionCreators(comparePageAction,dispatch),  
      dispatch
    }
 }
 
 export default connect(mapStateToProps,mapDispatchToProps)(BaseParameter);

const styles = StyleSheet.create({
    box:{
        paddingTop:20,
        marginLeft:10,
        marginRight:10
    },
    title:{
        height:35,
        backgroundColor:"#3d464d",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    title_left:{
       marginLeft:6,
       color:"#fff",
       fontSize:16 
    },
    title_right:{
        marginRight:6
    },
    item_parent:{
         height:40,
         flexDirection:"row",
         alignItems:"center",
         justifyContent:"space-between",
         borderBottomWidth:1,
         borderBottomColor:global.borderColor
    },
   item_parent_left:{
      marginLeft:5,
      color:"#9a9a9a"
   },
   item_parent_right:{
      marginRight:5
   },
   item_child:{
       backgroundColor:"#f4f4f4",
   },
   item_child_list:{
    height:36,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    borderBottomWidth:1,
    borderBottomColor:global.borderColor,
    backgroundColor:"#f4f4f4"
   },
   item_child_left:{
     marginLeft:5,
     flex:1
   },
   item_child_right:{
     marginRight:5,
     flex:1,
     flexDirection:"row-reverse"
   }
})

