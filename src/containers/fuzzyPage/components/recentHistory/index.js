import React, { Component } from 'react'
import { Text, StyleSheet, View,Button } from 'react-native';
import global from "../../../../style";
import { actions as fuzzyActions,getText,getList,getHistoryList } from "../.././../../redux/modules/fuzzyPage/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "../../../../util/common";


class RecentHistory extends Component {


    jump = (text)=>{

        const {textChange} = this.props.fuzzyActions;

        textChange(text);

        push({
            route:"search_detail",
            params:{
                keyword:text
            }
        },this.props.dispatch);

    }

    renderList = ()=>{

        const { history_list } = this.props;

        let arr = [];

        const length = Math.ceil(history_list.length/2);

        for(let i =0;i<length;i++){
      
           arr.push((
            <View style={styles.recent_body_line} key={i}>

                    <View style={styles.recent_body_line_button}>
                      <Button onPress={()=>{this.jump(history_list[i*2])}} title={history_list[i*2]}  color="#666" style={styles.recent_body_line_inner_button}></Button>
                    </View>
                     
                     {
                        history_list[i*2+1]?(
                            <View style={styles.recent_body_line_button}>
                            <Button onPress={()=>{this.jump(history_list[i*2+1])}} title={history_list[i*2+1]} color="#666" style={styles.recent_body_line_inner_button}></Button>
                          </View>
                        ):null 
                     }   

            </View>
           ))

        }

        return arr;


    }

    render() {
        
        const { history_list,fuzzyActions } = this.props;

        if(!history_list || history_list.length == 0){
          return null;
        }

        return (
            <View style={styles.recent_box}>
                <Text style={styles.recent_title}>最近搜索</Text>
                <View style={styles.recent_body}>

                    {this.renderList()}
                
                </View>
                <View style={styles.recent_btm}>
                    <View style={styles.recent_btm_wrapper}>
                       <Button title="清空历史搜索"  color="#7fb0eb" style={styles.recent_btm_button} onPress={()=>{fuzzyActions.clearHistory()}}></Button>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps  = (state)=>{

    return {
      history_list:getHistoryList(state)
    }
 
 }
 
 const mapDispatchToProps  = (dispatch)=>{
   
   return {
       fuzzyActions:bindActionCreators(fuzzyActions,dispatch),
       dispatch
   }
 
 }
 
 
 export default connect(mapStateToProps,mapDispatchToProps)(RecentHistory);

const styles = StyleSheet.create({
  
    recent_box:{
        marginTop:30,
        marginLeft:10,
        marginRight:10
    },
    recent_title:{
        color:"#333",
        fontSize:20
    },
    recent_body:{
        marginTop:12,
        marginBottom:20,
        borderBottomColor:global.borderColor,
        borderBottomWidth:1
    },
    recent_btm:{
        marginTop:20,
        alignItems:"center"
    },
    recent_btm_wrapper:{
        height:38,
        width:200,    
        borderRadius:8,
        borderColor:"#7fb0eb",
        borderWidth:1
    },
    recent_btm_button:{
        fontSize:18,
        textAlign:"center",
    },
    recent_body_line:{
        flexDirection:"row",
        height:28,
        marginBottom:20,
        justifyContent:"space-between",
        width:"100%"
    },
    recent_body_line_button:{
        flex:1/2.1,
        height:35,
        borderWidth:1,
        borderColor:global.borderColor
    },
    recent_body_line_inner_button:{
        textAlign:"center",
        fontSize:20,
        lineHeight:30
    }

})
