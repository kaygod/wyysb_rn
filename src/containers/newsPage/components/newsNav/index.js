import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView,View,Dimensions } from 'react-native'
import global from "../../../../style";
import { connect } from "react-redux";
import { actions as newsAction,getData } from "../../../../redux/modules/newsPage/actions";
import { bindActionCreators } from 'redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { layout } from "../../../../util/common";

class NewsNav extends Component {

    selType = (item,index)=>{

        const { selType } = this.props.newsAction;

        this.controllScroll(index);

        this.props.selType();

        selType(item.brand_id);
    
    }

    controllScroll = (index)=>{

       const { width } = Dimensions.get("window");
       
       const { nav_list } = this.props.data;

       if(nav_list.length == 0 || nav_list[0].width === undefined){
          return false;
       }
      
       let result = 0;

      Array.from(Array(index)).forEach((v,idx)=>{
         result+=nav_list[idx].width;
      })

      result = result-width/2 + nav_list[index].width/2;

      if(result<=0){
        result = 0;
      }

      this.refs.container.scrollTo({x: result , y: 0, animated: true})

    }
     
    /**
     * 重新计算导航栏的页面布局
     */
    calcLayout = ()=>{

        let nav_list = [...this.props.data.nav_list];

        let count = 0;

        nav_list.forEach((v,i)=>{

            layout(this.refs[`nav${i}`]).then((value)=>{
                 count++;
                 v.width = parseInt(value.width)+30;
                 if(count>=nav_list.length){
                      this.props.newsAction.updateNav(nav_list);
                 }
            })
            
        })

    }

    render() {
        
        const { nav_list,brand_id } =  this.props.data;

        return (
            <View style={styles.nav_box}>
                <ScrollView horizontal={true} ref="container">

                    <View style={styles.nav_list}>  

                        {
                        nav_list.map((v,idx)=>{
                            return (
                                <View ref={`nav${idx}`} key={idx} style={[styles.item,(v.brand_id == brand_id?styles.item_current:null)]}>
                                    
                                    <TouchableWithoutFeedback style={styles.item_wrapper} onPress={()=>{this.selType(v,idx)}}>

                                        <Text style={[styles.item_text,(v.brand_id == brand_id?styles.item_text_current:null)]}>
                                            {v.brand_name}
                                        </Text>

                                    </TouchableWithoutFeedback>

                                </View> 
                            )
                        })  
                        }

                    </View>     

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav_box:{
        height:48,
        borderBottomWidth:1,
        borderBottomColor:global.borderColor
    },
    nav_list:{
      flexDirection:"row"
    },
    item:{
       marginLeft:15,
       marginRight:15,
       borderBottomWidth:1,
       borderBottomColor:"transparent",
    },
    item_wrapper:{
        alignItems:"center",
        justifyContent:"center",
        height:"100%"
    },
    item_text:{
        fontSize:18,
        color:"#6f7580",
     },
    item_current:{
        borderBottomColor:"#ff8700",
        borderBottomWidth:1
    },
    item_text_current:{
        color:"#000"
    }
})


const mapStateToProps = (state)=>{ 
    return {
      data:getData(state)
    }
 }

 const mapDispatchToProps = (dispatch)=>{
    return {
        newsAction:bindActionCreators(newsAction,dispatch)
    }
 }

export default connect(mapStateToProps,mapDispatchToProps,null,{forwardRef:true})(NewsNav);