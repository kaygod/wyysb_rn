import React, { Component } from 'react'
import { Text, StyleSheet, View,Alert } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getData,actions as compareAction} from '../../redux/modules/compareComponent/actions';
import { bindActionCreators } from 'redux';
import { push } from "../../util/common";
import { COMPARE_COUNT_OVER_TWO } from "../../util/constants";


class BottomCompare extends Component {

    static defaultProps = {
        modalVisible:false
    }

    leftBtnClick = ()=>{

      const {list} = this.props.data;

      if(list && list.length>0){
         
        this.props.leftBtnClick();

      }

    }

    rightBtnClick = ()=>{

      const {list} = this.props.data;

       if(this.props.modalVisible){
         this.props.leftBtnClick();
       }else if(list && (list.length == 0 || list.length == 1)){

         Alert.alert(COMPARE_COUNT_OVER_TWO);
 
       }
       else if(list && list.length>1){
         push({
            route:"compare_page" 
         },this.props.dispatch);
       }

    }

    render() {
       
        const {list} = this.props.data;

        return (
            <View style={styles.box}>
                

                    <LinearGradient colors={["#3a96fb","#0066d4"]} style={{flex:1}}>
                        <View style={styles.box_left}>
                            <TouchableWithoutFeedback onPress={()=>{this.leftBtnClick()}} style={styles.boxTouch}>
                              <Text style={{color:"#fff"}}>{this.props.modalVisible?"完成":"编辑"} ( {(list && list.length>0)?list.length:0} )</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </LinearGradient>

                    <LinearGradient colors={["#3a96fb","#0066d4"]} style={{flex:1}}>
                        <View style={styles.box_right}>
                          <TouchableWithoutFeedback onPress={()=>{this.rightBtnClick()}} style={styles.boxTouch}>
                            <Text style={{color:"#fff"}}>对比</Text>
                          </TouchableWithoutFeedback>  
                        </View>
                    </LinearGradient>
                 
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
    dispatch
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(BottomCompare);

const styles = StyleSheet.create({
    box:{
        height:44,
        flexDirection:"row",
        backgroundColor:"#fff",
        width:"100%"
    },
    box_left:{
      borderRightColor:"#fff",
      borderRightWidth:1,
      flex:1,
      color:"#fff"
    },
    box_right:{
      borderLeftWidth:0.5,
      borderLeftColor:"#fff", 
      flex:1
    },
    boxTouch:{
        alignItems:"center",
        justifyContent:"center",
        height:44
    }
})
