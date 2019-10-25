import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import SafeAreaViewPlus from "../../components/safeAreaViewPlus";
import NavigationBar from "../../components/navigationBar";
import global from "../../style";
import SearchList from "./components/searchList";
import { connect } from "react-redux";
import { getData,actions as searchActions } from "../../redux/modules/searchDetailPage/actions";
import { bindActionCreators } from "redux";

class SearchDetail extends Component {

    componentDidMount(){

        const { requestData,initParams } = this.props.searchActions;

        initParams(this.props.navigation.state.params.keyword);

        requestData(1);

    }

    render() {

        return (
            <SafeAreaViewPlus topColor={global.themeColor2}>
       
              <NavigationBar title="搜索结果" style={{backgroundColor:global.themeColor2}}/>
           
              <SearchList/>
      
            </SafeAreaViewPlus>
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
        searchActions:bindActionCreators(searchActions,dispatch)
    }
  }
  
  
  
export default connect(mapStateToProps,mapDispatchToProps)(SearchDetail);

const styles = StyleSheet.create({})
