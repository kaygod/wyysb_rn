import React, { Component } from 'react';
import { Text,StatusBar,StyleSheet,View,Platform,DeviceInfo } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from "../../style";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { goBack } from "../../util/common";

const NAV_BAR_HEIGHT = 44;

const STATUS_BAR_HEIGHT = (Platform.OS !== "ios" || DeviceInfo.isIPhoneX_deprecated)?0:20;//状态栏高度

class NavigationBar extends Component {

    static defaultProps = {
        statusBar:{
            barStyle:"dark-content",
            backgroundColor:global.themeColor2,
            hidden:false
        }
    }

    goBack = ()=>{
       
        goBack(this.props.dispatch);

    }
    
    getLeftButtonElement(data){
      return (
          <View style={styles.navBarButton}>
             {data?data:
              <TouchableOpacity style={styles.marginLeft} onPress={()=>{this.goBack()}}>
                 <Ionicons name="ios-arrow-back" size={22} color="#333" />
              </TouchableOpacity> 
             }
          </View>
      )
    }

    getRightButtonElement(data){
      return (
          <View style={styles.navBarButton}>
            {data?data:null}
          </View>
      )
    }

  

    render() {

        let statusBar = !this.props.statusBar.hidden?
                    <View style={this.props.statusBar.backgroundColor}>
                        <StatusBar {...this.props.statusBar}/>
                    </View>:null;

        let titleView = this.props.titleView?this.props.titleView:
           <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{this.props.title}</Text>;
           
        let content = this.props.hide?null:
           <View style={styles.navBar}>
               {this.getLeftButtonElement(this.props.leftButton)}
               <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                   {titleView}
               </View>
               {this.getRightButtonElement(this.props.rightButton)}
           </View>;   

        return (
            <View style={[styles.container,this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }

}


const mapDispatchToProps = (dispatch)=>{

  return {
    dispatch
  }

}

export default connect(null,mapDispatchToProps)(NavigationBar);

const styles = StyleSheet.create({
    container:{
        backgroundColor:global.themeColor2
    },
    marginLeft:{
       marginLeft:10
    },
    navBarButton:{
        alignItems:"center"
    },
    navBar:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        height:NAV_BAR_HEIGHT
    },
    navBarTitleContainer:{
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        left:40,
        right:40,
        top:0,
        bottom:0
    },
    title:{
        fontSize:20,
        color:"#333"
    },
    statusBar:{
        height:STATUS_BAR_HEIGHT,
        flex:1,
        backgroundColor:global.themeColor2
    }
})