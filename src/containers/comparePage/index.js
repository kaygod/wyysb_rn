import React, { Component } from 'react'
import { Text, StyleSheet, View ,ScrollView } from 'react-native';
import SafeAreaViewPlus from "../../components/safeAreaViewPlus";
import NavigationBar from "../../components/navigationBar";
import BaseParameter from "./components/baseParameter";
import ProductName from "./components/productName";
import global from "../../style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as comparePageAction } from "../../redux/modules/comparePage/actions";
import Spinner from "react-native-loading-spinner-overlay";
import { getData } from '../../redux/modules/comparePage/actions';


class ComparePage extends Component {

    componentWillUnmount(){
        this.props.comparePageAction.clearData();
    }

    componentDidMount(){

      this.props.comparePageAction.initParams();

      this.props.comparePageAction.requestData();

    }

    render() {
        
        const { request_flag } = this.props.data;
          
        return (
            <SafeAreaViewPlus topColor={global.themeColor2}>
       
            <NavigationBar title="产品对比" style={{backgroundColor:global.themeColor2}}/>

            <ScrollView>

                    <ProductName />
                    
                    <BaseParameter/>

            </ScrollView>

            <Spinner visible={request_flag == 1?true:false} />
           
      
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
        comparePageAction:bindActionCreators(comparePageAction,dispatch),
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ComparePage);

const styles = StyleSheet.create({})
