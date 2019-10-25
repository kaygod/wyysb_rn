import React, { Component } from 'react'
import { Text, StyleSheet, View ,ScrollView,Button } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import global from "../../../../style";
import { actions as fuzzyActions,getText,getList } from "../.././../../redux/modules/fuzzyPage/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class FuzzyResult extends Component {
    
  

    render() {
        
        const { list } = this.props;

        return (

            <ScrollView automaticallyAdjustContentInsets={true} style={{flex:2}}>
                <View style={styles.list}>
                    {
                        list.map((item)=>{
                            return (
                                <View style={styles.item}>
                                    <Ionicons name="ios-search" size={18} color="#bfbfbf" style={styles.item_icon}/>
                                    <Text style={styles.item_text}>{item.serial_num}</Text> 
                               </View>
                            )
                        })
                    }
                </View>
                {
                    list.length>0?(
                        <View style={{marginTop:20}}>
                          <Button title="查看更多"></Button>
                        </View>
                    ):null
                }
            </ScrollView>
        
        )
    }
}

const mapStateToProps  = (state)=>{

    return {
      list:getList(state)
    }
 
 }
 
 const mapDispatchToProps  = (dispatch)=>{
   
   return {
       fuzzyActions:bindActionCreators(fuzzyActions,dispatch)
   }
 
 }
 
 
 export default connect(mapStateToProps,mapDispatchToProps)(FuzzyResult);

const styles = StyleSheet.create({
    list:{
        flex:2,
        marginLeft:10,
        marginRight:10,
        marginTop:15
    },
    item:{
        flexDirection:"row",
        borderBottomColor:global.borderColor,
        borderBottomWidth:1,
        height:40,
        alignItems:"center"
    },
    item_icon:{
        marginLeft:10
    },
    item_text:{
       marginLeft:5,
       fontSize:16,
       color:"#666"
    },
    container:{
        flex:1  
    }
})
