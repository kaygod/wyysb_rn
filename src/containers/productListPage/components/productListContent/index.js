import React, { Component } from 'react';
import { View,StyleSheet,Text } from "react-native";
import ProductListHandler from "../../../../components/productListHandler";
import global from "../../../../style";
import { connect } from 'react-redux';
import { actions as productListActions,getProductListData } from "../../../../redux/modules/productListPage/actions"
import { bindActionCreators } from 'redux';
import { delay,push } from "../../../../util/common";

class ProductListContent extends Component {

    constructor(props){
      super(props);
      this.isLoading = true;
    }

    componentDidMount(){
        this.props.productListActions.initParams(this.props.type_id,this.props.product_type,this.props.type_name);
        this.props.productListActions.getData(1).then(async()=>{
              await delay();
              this.isLoading = false;
        })
    }

    onRefresh = ()=>{
        this.props.productListActions.getData(1); 
    }

    updateActive = (index)=>{
      
       this.props.productListActions.updateActive(index);

    }

    loadMore = ()=>{

        const { cur_page,final_page }  = this.props.data;

        if(cur_page>=final_page || this.isLoading){
            return false;
        }

        this.isLoading = true;

        this.props.productListActions.getData(cur_page+1,true).then(async()=>{
            this.isLoading = false;
        })
    }

    jump = (index)=>{

        const { list } = this.props.data;

        push({
         route:"productDetail",
         params:{
           product_parent_type:list[index].product_type,
           product_id:list[index].product_id
         }
        },this.props.dispatch)

    }

    render() {
        
        const { list,type_name,request_flag,cur_page,final_page} = this.props.data;

        return (
            <>
                <ProductListHandler list={list} onRefresh={this.onRefresh} cur_page={cur_page} updateActive={this.updateActive}
                request_flag={request_flag} loadMore={this.loadMore} final_page={final_page} jump={this.jump}>
                       <View style={styles.title_container}>
                           <Text style={styles.title_text}>
                             {type_name}
                           </Text>
                       </View>
                </ProductListHandler>
            </>
        )
    }


}

const mapStateToProps = (state)=>{
    return {
       data:getProductListData(state)
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        productListActions:bindActionCreators(productListActions,dispatch),
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductListContent);


const styles = StyleSheet.create({
    wrapper:{
      flex:1
    },
    title_container:{
        borderTopColor:global.borderColor,
        borderTopWidth:1,
        borderBottomColor:global.borderColor,
        borderBottomWidth:1,
        height:60,
        justifyContent:"center"
    },
    title_text:{
        fontSize:24,
        color:global.blue,
        marginLeft:15
    }

})