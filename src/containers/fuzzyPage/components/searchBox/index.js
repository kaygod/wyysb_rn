import React, { Component } from 'react'
import { Text, StyleSheet, View ,TextInput } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { actions as fuzzyActions,getText } from "../.././../../redux/modules/fuzzyPage/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { goBack,push } from "../../../../util/common";

class SearchBox extends Component {

    loadData = (text)=>{

        if(this.timer){
           clearTimeout(this.timer);
           this.timer = null;
           this.loadData(text);
           return false;
        }

        this.timer = setTimeout(()=>{
            clearTimeout(this.timer);
            this.timer = null;
            this.props.fuzzyActions.requestData();
        },500)

    }

    search = ()=>{

      const { text } = this.props;

      if(text.length>1){
        this.props.fuzzyActions.storeData(text);
        push({
         route:"search_detail",
         params:{
            keyword:text
        }
        },this.props.dispatch);
      }else{
        goBack(this.props.dispatch);
      }

    }

    changeText = (text)=>{

        const {textChange,setNoData} = this.props.fuzzyActions;

        textChange(text);

        if(text.length>1){
            this.loadData(text);
        }else{
            setNoData();
        }

    }

    render() {
         
        const { text } = this.props;

        return (
            <View style={styles.search_box}>
                <View style={styles.search_left}>
                   <Ionicons name="ios-search" size={18} color="#bfbfbf" style={styles.search_left_icon}/>
                   <TextInput style={styles.search_left_input} value={text} placeholder="请输入产品型号或品牌" onChangeText={this.changeText}/>
                </View>
                <View></View>
                <Text style={styles.search_right} onPress={this.search}>{text.length>1?"搜索":"返回"}</Text>
            </View>
        )
    }
}

const mapStateToProps  = (state)=>{

   return {
     text:getText(state)
   }

}

const mapDispatchToProps  = (dispatch)=>{
  
  return {
      fuzzyActions:bindActionCreators(fuzzyActions,dispatch),
      dispatch
  }

}


export default connect(mapStateToProps,mapDispatchToProps)(SearchBox);

const styles = StyleSheet.create({
    search_box:{
        marginLeft:10,
        marginRight:5,
        flexDirection:"row",
        height:32,
        marginTop:10
    },
    search_left:{
       flex:1,
       backgroundColor:"#f4f4f4",
       height:"100%",
       borderRadius:20,
       flexDirection:"row",
       alignItems:"center"
    },
    search_right:{
        width:40,
        textAlign:"center",
        lineHeight:32,
        color:"#0066d4"
    },
    search_left_icon:{
        marginLeft:10,
        marginRight:10
    },
    search_left_input:{
        borderWidth:0,
        height:"100%",
        borderRadius:20,
        flex:1,
        backgroundColor:"#f4f4f4"
    }
})
