import React, { Component } from 'react'
import { Text, StyleSheet, View,FlatList } from 'react-native'
import ListSpinner from "../../../../components/listSpinner";
import { connect } from "react-redux";
import { getData,actions as searchActions } from "../../../../redux/modules/searchDetailPage/actions";
import { bindActionCreators } from "redux";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import { push } from "../../../../util/common";

class SearchList extends Component {


    jump = (item)=>{

      const { product_type,product_id } = item;  

      push({
       route:"productDetail",
       params:{
           product_parent_type:product_type,
           product_id
       }
      },this.props.dispatch)

    }

    renderItem = (data)=>{
        
        const {item,index} = data;
            
          return (
              <View style={styles.item_container}>
                  <View style={styles.item_left}>
                     <TouchableWithoutFeedback onPress={()=>{this.jump(item)}}>
                         <Text style={styles.item_left_top} numberOfLines={1}>{item.product_name}</Text>
                         <Text style={styles.item_left_bottom} numberOfLines={1}>{item.ext_info}</Text>
                     </TouchableWithoutFeedback>
                  </View>
              </View>
          )  
     }

     renderFooter = ()=>{

        const { cur_page,final_page } = this.props.data;
        
        if(cur_page>=final_page){
          return null;
        }else if(cur_page<final_page){
          return ListSpinner;  
        }
       
      }
  
      loadMore = ()=>{
         
          const { cur_page,final_page,request_flag } = this.props.data;

          if(!this.onEndReachedCalledDuringmomentum && cur_page<final_page && request_flag == 0){
              this.props.searchActions.requestData(cur_page+1,true); 
              this.onEndReachedCalledDuringmomentum = true;
          }
      }

      onRefresh = ()=>{
        this.props.searchActions.requestData(1); 
      }

    render() {

        const { list ,request_flag,final_page } = this.props.data;

        return (
            <View style={styles.wrapper}>
                <FlatList
                data={list}
                renderItem={(item)=>{return this.renderItem(item)}}
                keyExtractor={item=>item.product_id}
                onRefresh={this.onRefresh}
                refreshing={(request_flag == 1)?true:false}
                ListFooterComponent={this.renderFooter()}
                onEndReached={this.loadMore}
                onEndReachedThreshold={0.2}
                onMomentumScrollBegin={()=>{
                    this.onEndReachedCalledDuringmomentum = false;
                }}
                />
           </View>  
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
        searchActions:bindActionCreators(searchActions,dispatch),
        dispatch
    }
  }
  
  
  
export default connect(mapStateToProps,mapDispatchToProps)(SearchList);

const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    item_container:{
        height:60,
        alignItems:"center",
        justifyContent:"space-between",
        borderBottomColor:global.borderColor,
        borderBottomWidth:1,
        flexDirection:"row"
    },
    item_left:{
        flex:1,
        marginLeft:15,
        marginRight:5
    },
    item_left_top:{
     fontSize:18,
     color:"#666"
    },
    item_left_bottom:{
      fontSize:12,
      color:global.blue,
      marginTop:2
    }
})
