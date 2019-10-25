import React, { Component } from 'react'
import { Text, StyleSheet, View,Image } from 'react-native';
import { connect } from "react-redux";
import { actions as productDetailAction,getData } from "../../../../redux/modules/productDetailPage/actions";
import { bindActionCreators } from 'redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class productHeader extends Component {

    showGallery = ()=>{
        this.props.productDetailAction.toggleGallery(true)
    }

    render() {

        if(!this.props.data.value){
            return null;
        }

        const { product_name,icon } = this.props.data.value;

        return (
            <View style={styles.header}>
                <Text style={styles.header_left}>{product_name}</Text>
                <TouchableWithoutFeedback onPress={()=>{this.showGallery()}}>
                 <Image style={styles.header_right} source={{uri:icon}}/> 
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
      flexDirection:"row",
      marginLeft:15,
      marginRight:15,
      marginBottom:15,
      marginTop:10
    },
    header_left:{
        fontSize:16,
        color:"#333",
        flex:1     
    },
    header_right:{
        width:140,
        height:69
    }
})

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

export default connect(mapStateToProps,mapDispatchToProps)(productHeader);

