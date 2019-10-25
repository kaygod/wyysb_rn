import React, { Component } from 'react';
import {View,StyleSheet,Text} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProductTypeData,actions as typeActions } from '../../../../redux/modules/productTypePage/actions';
import { TouchableHighlight } from 'react-native-gesture-handler';


class TypeTitle extends Component {


    renderTitle = ()=>{

        const {type_name} = this.props.datas.data;
       
        return <Text style={styles.content}>{type_name}</Text>;

    }

    tapFirstLevel = (index)=>{

        const {child_list} = this.props.datas.data;

        let idx = child_list.findIndex((v)=>{
           return v.active;
        })

        if(index == idx){
           return false;
        }

        if(!child_list[index].child){
            
            let options = {
                type_id:child_list[index].type_id,
                index1:index,
                index2:null,
                level:2
            }
    
            this.props.typeActions.getData(options);

        }

        this.props.typeActions.updateActive(index,1);
    
    }
     

    renderFirstLevel = ()=>{

        const {child_list} = this.props.datas.data;
        
        return (
            <View style={styles.wrapper}>

                 <View style={[styles.wapper_touch,(child_list[0].active?styles.wapper_item_active:null)]}>
                    <TouchableHighlight style={styles.wapper_item} onPress={()=>{this.tapFirstLevel(0)}} underlayColor="#0175d0">                   
                            <Text style={[styles.wrapper_item_text,(child_list[0].active?styles.wapper_item_active:null)]}>{child_list[0].type_name}</Text>             
                    </TouchableHighlight>
                 </View>
               
                <View style={[styles.wapper_touch,(child_list[1].active?styles.wapper_item_active:null)]}>
                    <TouchableHighlight style={styles.wapper_item} onPress={()=>{this.tapFirstLevel(1)}} underlayColor="#0175d0">
                        <Text style={[styles.wrapper_item_text,(child_list[1].active?styles.wapper_item_active:null)]}>{child_list[1].type_name}</Text>
                    </TouchableHighlight> 
                </View>

            </View>
        )

    }

    render() {
        
        const {total_level,data} = this.props.datas;

        if(!data){
           return null;
        }

        return (
            <View style={styles.container}>

                {total_level == 3?this.renderFirstLevel():this.renderTitle()}
                
            </View>
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


export default connect(mapStateToProps,mapDispatchToProps)(TypeTitle);


const styles = StyleSheet.create({
    container:{
        marginLeft:10,
        marginRight:10,
        justifyContent:"center",
        marginTop:20,
        marginBottom:4
    },
    content:{
        fontSize:22,
        color:"#0064d3"
    },
    wrapper:{
        flexDirection:"row",
        height:46,
        borderColor:"#0064d0",
        borderWidth:1,
        borderRadius:5
    },
    wapper_item:{
       height:"100%",
       alignItems:"center",
       justifyContent:"center"
    },
    wapper_item_active:{
      backgroundColor:"#0064d0",
      color:"#fff"
    },
    wrapper_item_text:{
        fontSize:18,
        color:"#0064d0"
    },
    wapper_touch:{
        flex:1,
        height:"100%",
    }
})