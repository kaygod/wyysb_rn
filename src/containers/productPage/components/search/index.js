import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableWithoutFeedback} from "react-native";
import global from "../../../../style";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Search extends Component {


    jump = ()=>{

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.jump}>
                <View style={styles.container}>
                   <View style={styles.content}>
                       <Ionicons name="ios-search" size={18} color={global.themeColor3} style={{marginTop:1}}/>
                       <Text style={styles.text}>搜索相关热点/视频</Text>
                   </View>
                </View>
            </TouchableWithoutFeedback> 
        )
    }

}


const styles = StyleSheet.create({
    container:{
      height:30,
      backgroundColor:global.themeColor2,
      marginLeft:10,
      marginRight:10,
      alignItems:"center",
      justifyContent:"center",
      borderRadius:10
    },
    content:{
      flexDirection:"row"
    },
    text:{
        fontSize:13,
        color:global.themeColor3,
        marginLeft:6,
        marginTop:2
    }
})