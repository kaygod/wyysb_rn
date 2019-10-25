import React, { Component } from 'react'
import { Text, StyleSheet, View , Modal } from 'react-native';
import global from "../../style";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomCompare from "../bottomCompare";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getData,actions as compareAction} from '../../redux/modules/compareComponent/actions';
import { actions as productListAction } from '../../redux/modules/productListPage/actions';
import { bindActionCreators } from 'redux';

class ProductCompare extends Component {

   static defaultProps = {
      modalVisible:false 
   }

   
   /**
    * 删除单项
    */
   delItem = (item)=>{

     this.props.productListAction.updateActive(item);
     
     this.props.compareAction.del(item);
     
   }

    render() {

        const { list } = this.props.data;

        return (
            <View>
                 <Modal
                   animationType="none"
                   transparent={true}
                   visible = {this.props.modalVisible && list && list.length>0}        
                 >
                     <View  style={styles.modal}>


                        <BottomCompare leftBtnClick={this.props.leftBtnClick} modalVisible={this.props.modalVisible}></BottomCompare>
                         
                        {
                           
                           list && list.length>0?
                           (
                                <View style={styles.list}>                
                                  
                                   {
                                       list.map((v,index)=>{
                                          return (
                                            <View style={styles.item} key={index}>
                                                <Text style={styles.item_text}>{v.serial_num}</Text>
                                                <TouchableWithoutFeedback onPress={()=>{this.delItem(v)}}>
                                                    <Ionicons name="ios-trash" size={22} color={global.borderColor}/>  
                                                </TouchableWithoutFeedback>
                                            </View>
                                          )
                                       })
                                   }

                                </View>
                           )
                           :null
                        }
                         
                        <View style={{flex:1}}>
                           <TouchableWithoutFeedback style={{flex:1,backgroundColor:"red"}} onPress={()=>{this.props.leftBtnClick()}}>
                            <View style={{flex:1,backgroundColor:"blue",width:"100%"}}>
                            </View>
                           </TouchableWithoutFeedback>
                        </View>   
                       


                     </View>
                 </Modal>
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
        compareAction:bindActionCreators(compareAction,dispatch),
        productListAction:bindActionCreators(productListAction,dispatch)
    }
  
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ProductCompare);

  const styles = StyleSheet.create({
    modal:{
      flex:1,
      flexDirection:"column-reverse",
      backgroundColor:"rgba(0,0,0,0.6)"
    },
    list:{
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:40,
        backgroundColor:"#fff"
    },
    item:{
        paddingTop:15,
        paddingBottom:15,
        borderBottomColor:global.borderColor,
        borderBottomWidth:1,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    item_text:{
        fontSize:20,
        color:"#333"
    }

})
