import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import SafeAreaViewPlus from "../../components/safeAreaViewPlus";
import NavigationBar from "../../components/navigationBar";
import global from "../../style";
import ProductContent from "./components/productContent";
import ProductHeader from "./components/productHeader";
import { connect } from "react-redux";
import { actions as productDetailAction,getData } from "../../redux/modules/productDetailPage/actions";
import { bindActionCreators } from 'redux';
import Spinner from "react-native-loading-spinner-overlay";
import Gallery from "react-native-image-gallery";


class productDetailPage extends Component {

   
    componentDidMount(){

      const { product_parent_type,product_id } = this.props.navigation.state.params;  
       
      this.props.productDetailAction.initParams(product_parent_type,product_id);

      this.props.productDetailAction.requestData();

    }

    singleTap = ()=>{
       this.props.productDetailAction.toggleGallery(false)
    }
  
    render() {

        if(!this.props.data.value){
            return null;
        }

        const { request_flag,value,gallery_show } = this.props.data;

        if(gallery_show){
          return  <Gallery style={{flex:1,backgroundColor:'black'}} images={value.icon_list} onSingleTapConfirmed={this.singleTap} />;
        }
       
        return (                  
                <SafeAreaViewPlus topColor={global.themeColor2}>              
                    <NavigationBar title="产品详情" style={{backgroundColor:global.themeColor2}}/>
                    <ProductHeader/>
                    <ProductContent/>
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
        productDetailAction:bindActionCreators(productDetailAction,dispatch)
    }
 }

export default connect(mapStateToProps,mapDispatchToProps)(productDetailPage);

const styles = StyleSheet.create({})
