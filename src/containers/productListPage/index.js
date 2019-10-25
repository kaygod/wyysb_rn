import React, { Component } from 'react';
import {View} from "react-native";
import SafeAreaViewPlus from "../../components/safeAreaViewPlus";
import NavigationBar from "../../components/navigationBar";
import global from "../../style";
import ProductListContent from "./components/productListContent"; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as productListAction } from "../../redux/modules/productListPage/actions";
import ProductCompare from "../../components/productCompare";
import BottomCompare from ".././../components/bottomCompare";

class ProductListPage extends Component {

    
    state = {
        modalVisible:false
    }

    componentWillMount(){
        this.props.productListAction.clearData();
    }

    leftBtnClick = ()=>{
        this.setState({
            modalVisible:!this.state.modalVisible
        })
    }


    render() {

        console.log(this.state.modalVisible);
       
        const { type_id,product_parent_type,type_name } = this.props.navigation.state.params; 

        return (
            <SafeAreaViewPlus topColor={global.themeColor2}>
       
              <NavigationBar title="产品列表" style={{backgroundColor:global.themeColor2}}/>
             
              <ProductListContent type_id={type_id} product_type={product_parent_type} type_name={type_name}/>

              <BottomCompare modalVisible={this.state.modalVisible} leftBtnClick={this.leftBtnClick}/>

              <ProductCompare modalVisible={this.state.modalVisible} leftBtnClick={this.leftBtnClick}/> 
        
            </SafeAreaViewPlus>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
  
  return {
      productListAction:bindActionCreators(productListAction,dispatch)
  }

}

export default connect(null,mapDispatchToProps)(ProductListPage);
