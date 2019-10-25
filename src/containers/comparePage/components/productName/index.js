import React, { Component } from 'react'
import { Text, StyleSheet, View,Image } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import global from "../../../../style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as comparePageAction } from "../../../../redux/modules/comparePage/actions";
import { getData } from '../../../../redux/modules/comparePage/actions';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { push } from "../../../../util/common";

class ProductName extends Component {

    state={
      toggle:false
    }

    jump = (item)=>{
       push({
         route:"productDetail",
         params:{
            product_parent_type:item.product_type,
            product_id:item.product_id
         }
       },this.props.dispatch)
    }


    render() {

        if(!this.props.data.value){
            return null;
        }

        const { base_parameters } = this.props.data.value;

        const { toggle } = this.state;

        return (
            <View style={styles.box}>
                <TouchableWithoutFeedback onPress={()=>{this.setState({toggle:!toggle})}}>
                    <View style={styles.title}>
                        <Text style={styles.title_left}>产品名称</Text>
                        <Ionicons name={toggle?"ios-add":"ios-remove"} size={25} color="#fff" style={styles.title_right}/>
                    </View>
                </TouchableWithoutFeedback>
                {
                  !toggle?(
                    <View style={styles.list}>
                        {
                        base_parameters.map((v,index)=>{
                            return (
                                <TouchableHighlight key={index} onPress={()=>{this.jump(v)}} underlayColor={"#f4f4f4"}>  
                                    <View style={styles.list_item}>                              
                                            <Text style={styles.list_item_text}>{v.product_name}</Text>
                                            <Image style={styles.list_item_img} source={{uri:v.icon_url}}/>                              
                                    </View>
                                </TouchableHighlight> 
                            )
                        }) 
                        }
                    </View> 
                  ):null  
                }
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
     dispatch
   }
}

export default connect(mapStateToProps,null)(ProductName);

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
    list_item:{
        paddingTop:15,
        paddingBottom:15,
        borderBottomColor:global.borderColor,
        borderBottomWidth:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    list_box:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    list_item_text:{
       color:"#666",
       fontSize:16,
       marginLeft:5,
       flex:2.5
    },
    list_item_img:{
       marginRight:5,
       width:110,
       height:54,
       flex:1
    }
})
