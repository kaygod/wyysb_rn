import React, { Component } from 'react'
import { View,Text,StyleSheet,TouchableHighlight,TouchableWithoutFeedback } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import global from "../../../../style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as typeActions,getProductTypeData } from "../../../../redux/modules/productTypePage/actions";
import { delay,push } from "../../../../util/common";



class TypeList extends Component {

    componentDidMount(){
        this.init();
    }

    init = ()=>{

        let options = {
            type_id:this.props.type_id,
            index1:0,
            index2:null,
            level:1
        }


            this.props.typeActions.getData(options).then(async()=>{

                await delay();

                const { total_level,data } = this.props.datas;
  
                if(total_level == 3){
                  options.level = 2;
                  options.type_id = data.child_list[0].type_id;
                  this.props.typeActions.getData(options);
                }
                    
            })

    }
    
    /**
     * 数据处理
     */
    dataHandler = (data,total_level)=>{
         
        if(total_level == 1 || total_level == 2){
           return data;
        }else if(total_level == 3){
           return data.child_list.find((item)=>{
               return item.active;
           }) 
        }

    }
    
    
    /**
     * 其他层的跳转
     */
    jump = (v)=>{ 

       push({
         route:"productList",
         params:{
             type_id:v.type_id,
             product_parent_type:this.props.datas.product_parent_type,
             type_name:v.type_name
         }
       },this.props.dispatch)

    }
    
    /**
     * 第一层的跳转
     */
    firstLayerJump = (index,data)=>{

        push({
            route:"productList",
            params:{
                type_id:data.child_list[index].type_id,
                product_parent_type:this.props.datas.product_parent_type,
                type_name:data.child_list[index].type_name
            }
          },this.props.dispatch)

    }

    renderChild = (v)=>{

        return v.child_list.map((value)=>{
          
          return (
             
                 
                 <View style={styles.drop_box} key={value.type_id}>

                  <TouchableWithoutFeedback onPress={()=>{this.jump(value)}}>  

                    <View style={styles.drop_box_item}>
                        <Text style={styles.drop_box_text}>{value.type_name}</Text>
                    </View>

                  </TouchableWithoutFeedback>  

                 </View>

            
          )

        }) 

    }

    tapNextLevel = (type_id,index)=>{

        const { total_level,data } = this.props.datas;

        let options={},index1=null,index2=null,level;

        if(total_level == 1){

            this.firstLayerJump(index,data);

            return false;

        }else if(total_level == 2){

            options = {
                type_id,
                index1:index,
                index2,
                level:2
            }

            this.props.typeActions.updateActive(index,1);

        }else if(total_level == 3){

            let idx = data.child_list.findIndex((item)=>{
                return item.active;
            }) 

            options = {
                type_id,
                index1:idx,
                index2:index,
                level:3
            }

            this.props.typeActions.updateActive(index,2);

        }

        this.props.typeActions.getData(options);

    }

    /**
     * 
     *     data:{
     *       type_name:"主板",     
     *       child_list:[
     *           {
     *              type_name:"服务器主板",
     *              type_id:"23",
     *              active:false,
     *              child:{
     *                   type_name:"服务器主板",
     *                   child_list:[
     *                     {
     *                         type_name:"Single socket",
     *                         type_id:"45",
     *                         active:false,
     *                         child:{
     *                             type_name:"Intel xean",
     *                             type_id:"84",
     *                             active:false 
     *                         }  
     *                     }
     *                   ]
     *              }  
     *           }
     *       ]
     *    }
     * 
     * 
     */

    renderContent = (list)=>{

        let data = null;

        if(list.child){ //说明是三级分类

           data = list.child.child_list;
           
        }else if(list.child_list){
          
           data = list.child_list; 
      
        }else{
            return null;
        }
        

        return data.map((v,index)=>{
            return (
                <View key={v.type_id}> 

                    <View style={styles.container}>

                        <TouchableHighlight onPress={()=>{this.tapNextLevel(v.type_id,index)}} underlayColor={global.themeColor2}>
                            <View style={styles.item}>
                                <Ionicons name="ios-play" size={22} color="#999" style={{marginLeft:2,marginRight:8}}/>
                                <Text style={styles.type_name}>{v.type_name}</Text>
                            </View>          
                        </TouchableHighlight>

                    </View>

                    {(v.active && v.child)?this.renderChild(v.child):null}


                </View>
            )
        })


    }

    render() {

        const { data,total_level } = this.props.datas;

        if(!data){
          return null;
        }

        const list = this.dataHandler(data,total_level);

        return (
            <View style={styles.list}>

               {this.renderContent(list)}
                
            </View>
        )
    }



}


const styles = StyleSheet.create({
    list:{
       marginLeft:10,
       marginRight:10
    },
    first_item:{
      borderTopWidth:1,
      borderTopColor:global.borderColor
    },
    item:{
       flexDirection:"row",
       alignItems:"center",
       borderBottomColor:global.borderColor,
       borderBottomWidth:1,
       height:50
    },
    type_name:{
        fontSize:18,
        color:"#666"  
    },
    drop_box:{
        backgroundColor:"#f4f4f4",
    },
    drop_box_item:{
        height:40,
        borderBottomWidth:1,
        borderBottomColor:global.borderColor,
        justifyContent:"center"
    },
    drop_box_text:{
       fontSize:16,
       color:"#666",
       marginLeft:22
    }    
})

 const mapStateToProps = (state)=>{
     return {
        datas:getProductTypeData(state)
     }
 }

 const mapDispatchToProps = (dispatch)=>{
  return {
    typeActions:bindActionCreators(typeActions,dispatch),
    dispatch
  }
 }

export default connect(mapStateToProps,mapDispatchToProps)(TypeList);