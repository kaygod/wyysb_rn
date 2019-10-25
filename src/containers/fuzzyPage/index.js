import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import styles from "./style";
import SafeAreaViewPlus from "../../components/safeAreaViewPlus";
import NavigationBar from "../../components/navigationBar";
import global from "../../style";
import SearchBox from "./components/searchBox";
import RecentHistory from "./components/recentHistory";
import FuzzyResult from "./components/fuzzyResult";
import { actions as fuzzyActions,getText } from "./../../redux/modules/fuzzyPage/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dao from "../../util/dao";

class FuzzyPage extends Component {

   
    componentDidMount(){
        dao.getData("search").then((history_data)=>{
            this.props.fuzzyActions.setHistoryData(history_data);
        })
    }

    render() {
      
        const { text } = this.props;

        return (
            <SafeAreaViewPlus topColor={global.themeColor2}>
   
               <NavigationBar title="产品搜索" goBack = {this.goBack}/>

               <SearchBox/>

               {text.length>0?<FuzzyResult / >:<RecentHistory/>}

                
            </SafeAreaViewPlus>
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
       fuzzyActions:bindActionCreators(fuzzyActions,dispatch)
   }
 
 }
 
 
 export default connect(mapStateToProps,mapDispatchToProps)(FuzzyPage);


