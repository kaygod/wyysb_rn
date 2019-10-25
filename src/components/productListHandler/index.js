import React, { Component } from 'react';
import { View,FlatList,StyleSheet,Text } from "react-native";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";
import global from "../../style";
import ListSpinner from "../../components/listSpinner";
import { connect } from 'react-redux';
import { getData,actions as compareAction} from '../../redux/modules/compareComponent/actions';
import { bindActionCreators } from 'redux';

class ProductListHandler extends Component {


    updateActive = (index)=>{
     
      const { list } = this.props.data;
      const product_list = this.props.list;

      if(list == null || list.length == 0){
        this.props.compareAction.add(product_list[index]).then(()=>{
            this.props.updateActive(index);
        })
      }else{

        if(product_list[index].active){
            this.props.compareAction.del(product_list[index]).then(()=>{
                this.props.updateActive(index);
            })
          }else{
            this.props.compareAction.add(product_list[index]).then(()=>{
                this.props.updateActive(index);
            })
         }

      } 

    } 
    
    renderItem = (data)=>{
        
       const {item,index} = data;

       if(item.additional === true){
          return this.props.children;
       }else{
           
         return (
             <View style={styles.item_container}>
                 <View style={styles.item_left}>
                    <TouchableWithoutFeedback onPress={()=>{this.props.jump(index)}}>
                        <Text style={styles.item_left_top} numberOfLines={1}>{item.serial_num}</Text>
                        <Text style={styles.item_left_bottom} numberOfLines={1}>{item.ext_info}</Text>
                    </TouchableWithoutFeedback>
                 </View>
                 <View style={styles.item_right}>
                    <TouchableWithoutFeedback onPress={()=>{this.updateActive(index)}}>
                         <Ionicons name={item.active?"ios-remove":"ios-add"} size={40} color={global.blue}/>
                    </TouchableWithoutFeedback>
                 </View>
             </View>
         )

       }

    }

    renderFooter = ()=>{

      const { cur_page,final_page } = this.props;
      
      if(cur_page>=final_page){
        return null;
      }else{
        return ListSpinner;  
      }
     
    }

    loadMore = ()=>{
        if(!this.onEndReachedCalledDuringmomentum){
            this.props.loadMore(); 
            this.onEndReachedCalledDuringmomentum = true;
        }
    }

    render() {

        return (
           <View style={styles.wrapper}>
                <FlatList
                data={this.props.list}
                renderItem={(item)=>{return this.renderItem(item)}}
                keyExtractor={item=>item.product_id}
                onRefresh={this.props.onRefresh}
                refreshing={(this.props.request_flag == 1)?true:false}
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
        compareAction:bindActionCreators(compareAction,dispatch)
    }
  
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ProductListHandler);

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
        flex:10,
        marginLeft:15,
        marginRight:5
    },
    item_right:{
        flex:1,
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
