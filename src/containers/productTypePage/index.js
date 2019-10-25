import React,{Component} from "react";
import {View,ScrollView,Alert} from "react-native";
import global from "../../style";
import SafeAreaViewPlus from "../../components/safeAreaViewPlus";
import NavigationBar from "../../components/navigationBar";
import TypeList from "./components/typeList";
import TypeTitle from "./components/typeTitle";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { getProductTypeData,actions as typeActions } from "../../redux/modules/productTypePage/actions";
import { bindActionCreators } from "redux";

class ProductTypePage extends Component{


  constructor(props){
      super(props);
      this.state = {
        type_id:this.props.navigation.state.params.type_id
      }
  }

  componentWillMount(){
    this.props.typeActions.clearData();
  }

  goBack = ()=>{
    this.props.navigation.goBack();
  }

  
  render(){

    const { request_flag } = this.props.datas;

    return (
      <SafeAreaViewPlus topColor={global.themeColor2}>
       
         <NavigationBar title="产品分类" goBack = {this.goBack}/>

         <ScrollView>

          <TypeTitle title="存储"/>

          <TypeList type_id={this.state.type_id}/>

         </ScrollView>

         <Spinner visible = {(request_flag == 1)?true:false}/>
     
      </SafeAreaViewPlus>
    )


  }


}


const mapStateToProps = (state)=>{
  
  return {
    datas:getProductTypeData(state)
  }

}

const mapDispatchToProps = (dispatch)=>{
  return {
    typeActions:bindActionCreators(typeActions,dispatch)
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(ProductTypePage);
