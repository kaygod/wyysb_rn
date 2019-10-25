import React, { Component } from 'react'
import { Text, StyleSheet, View,Platform,ProgressViewIOS,ProgressBarAndroid  } from 'react-native';
import SafeAreaViewPlus from "../../components/safeAreaViewPlus";
import global from "../../style";
import NavigationBar from "../../components/navigationBar";
import { WebView } from 'react-native-webview';


export default class NewsDetail extends Component {
    
    state = {
        progress:0
    }

    renderProgress = ()=>{

        const {progress} = this.state;
     
        if(Platform.OS == "ios"){
   
            if(progress<1){

                return <ProgressViewIOS
                progress={progress}
               />

            }else{
                return null;
            } 

        }else{
            if(progress<1){             
                return  <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={progress}
              />
            }else{
                return null;
            }
        }

    }

    render() {
        
        const { news_id } = this.props.navigation.state.params;

        return (
            <SafeAreaViewPlus topColor={"#fff"}>
               <NavigationBar title="新闻详情" style={{backgroundColor:"#fff"}}/>
               {this.renderProgress()}
               <WebView
                     onLoadProgress={({ nativeEvent }) => {
                        this.setState({
                          progress:nativeEvent.progress
                        })
                      }}
                    source={{uri: `https://m.wayforcloud.com/html/information/hotnews_detail.html?news_id=${news_id}`}}
                />
            </SafeAreaViewPlus>
        )
    }
}

const styles = StyleSheet.create({})
