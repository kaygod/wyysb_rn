import React, { Component } from 'react'
import {View,Text,StyleSheet,ScrollView,Image,TouchableHighlight,Alert} from "react-native";
import global from "../../../../style";
import {NavigationActions} from "react-navigation";
import { connect } from "react-redux";

class ProductList extends Component {


    constructor(props){
      super(props);
      this.state = {
          list:[
              {
                 src:require("../../../../images/servicer.png"),
                 name:"Servers",
                 id:20 
              },
              {
                src:require("../../../../images/mainboard.png"),
                name:"Boards",
                id:11
              },
              {
                src:require("../../../../images/storage.png"),
                name:"Storage",
                id:19  
              },
              {
                src:require("../../../../images/GPU.png"),
                name:"GPU服务器",
                id:21 
              },
              {
                src:require("../../../../images/CPU.png"),
                name:"Processors",
                id:12  
              },
              {
                src:require("../../../../images/memory.png"),
                name:"Memory",
                id:13  
              },
              {
                src:require("../../../../images/crate.png"),
                name:"Chassis",
                id:17
              },
              {
                src:require("../../../../images/power.png"),
                name:"Power Supplies",
                id:16  
              },
              {
                src:require("../../../../images/HDD.png"),
                name:"HDD机械硬盘",
                id:15  
              },
              {
                src:require("../../../../images/SSD.png"),
                name:"SSD固态硬盘",
                id:14  
              },
              {
                src:require("../../../../images/GPU.png"),
                name:"GPU显卡",
                id:20  
              },
              {
                src:require("../../../../images/Raid_Cards.png"),
                name:"Raid Cards",
                id:298
              },
              {
                src:require("../../../../images/Network_Cards.png"),
                name:"Netword Cards",
                id:295 
              }
          ]
      }  
    }

    onPress = (i,j)=>{

      let index = i*3+j;

      index = index.toString();

      const {dispatch, nav} = this.props;

      dispatch(NavigationActions.navigate({routeName: 'productType',params: {
        type_id:this.state.list[index].id.toString()
      }}));

    }  

    renderList = ()=>{

        const length = Math.ceil(this.state.list.length/3);

        const { list } = this.state;

        let arr = [];
        
        for(let i=0;i<length;i++){

           let j = i*3; 

           let dom = <View style={styles.row} key={i}>
                        <TouchableHighlight onPress={()=>{this.onPress(i,0)}} style={[(list[j+1]?{flex:1}:{flex:1/3})]}>
                          <View style={[styles.item,styles.item_one,(list[j+1]?null:styles.item_last)]}>
                              <Image source={list[j].src} style={styles.img} resizeMode="cover"/>
                              <Text style={styles.font}>{list[j].name}</Text>
                          </View>
                        </TouchableHighlight>  
                        {
                           list[j+1]? 
                           <TouchableHighlight onPress={()=>{this.onPress(i,1)}} style={{flex:1}}>
                             <View style={[styles.item,styles.item_two]}>
                                        <Image source={list[j+1].src} style={styles.img} resizeMode="cover"/>
                                        <Text style={styles.font}>{list[j+1].name}</Text>
                                    </View>
                           </TouchableHighlight>         
                                    : null
                        }
                        {
                           list[j+2]?
                           <TouchableHighlight onPress={()=>{this.onPress(i,2)}} style={{flex:1}}> 
                             <View style={[styles.item,styles.item_three]}>
                                        <Image source={list[j+2].src} style={styles.img} resizeMode="cover"/>
                                        <Text style={styles.font}>{list[j+2].name}</Text>
                                    </View>
                           </TouchableHighlight>          
                                    : null
                        }
                   </View> ;
                arr.push(dom);          
        }

        return arr;
        
    }


    render() {
        return (
           <View style={styles.container}>
               <ScrollView style={styles.scrollContainer}>

                  <View style={styles.list}>
                    {this.renderList()}
                  </View>            

               </ScrollView>
           </View>
        )
    }

}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(ProductList);

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    scrollContainer:{
        flex:1,
        flexDirection:"column",
        backgroundColor:global.themeColor2,
        marginTop:10
    },
    row:{
        flexDirection:"row",
        flex:1
    },
    item:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        height:120,
        backgroundColor:global.themeColor
    },
    item_one:{
       borderRightColor:global.borderColor,
       borderRightWidth:1,
       borderBottomColor:global.borderColor,
       borderBottomWidth:1
    },
    item_two:{
        borderRightColor:global.borderColor,
        borderRightWidth:1,
        borderBottomColor:global.borderColor,
        borderBottomWidth:1
    },
    item_three:{
        borderBottomColor:global.borderColor,
        borderBottomWidth:1
    },
    img:{
        width:60,
        height:60
    },
    font:{
        fontSize:14,
        color:"#000",
        marginTop:6
    }
})
