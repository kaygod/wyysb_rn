import React, { Component } from 'react'
import { Text, View ,FlatList,Image,RefreshControl } from 'react-native';
import styles from "./style";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import { actions as newsAction,getData } from "../../../../redux/modules/newsPage/actions";
import { bindActionCreators } from 'redux';
import { timeFilter,push,delay } from "../../../../util/common";
import ListSpinner from "../../../../components/listSpinner";


class Newslist extends Component {


    jump = (item)=>{

        push({
          route:"news_detail",
          params:{
              news_id:item.news_id
          }
        },this.props.dispatch);

    }

    renderItem = (item)=>{

        if(item.icon_url.length == 0){

           return (
               <View>
                   <TouchableHighlight style={styles.news_item} underlayColor="#f4f4f4" onPress={()=>{this.jump(item)}}>
                    <View style={styles.item_box}>
                        <Text style={styles.item_box_text}>{item.title}</Text>
                        <View style={styles.item_box_bottom}>
                            <Text style={styles.item_box_bottom_left}>{item.source}</Text>
                            <Text style={styles.item_box_bottom_right}>{timeFilter(item.date)}</Text>
                        </View>
                    </View>
                   </TouchableHighlight>
               </View>
           ) 

        }else if(item.icon_url.length == 1){

            return (
                <View>
                <TouchableHighlight style={styles.news_item} underlayColor="#f4f4f4" onPress={()=>{this.jump(item)}}>
                 <View style={[styles.item_box,{flexDirection:"row"}]}>
                     <Image style={styles.item_left} source={{uri:item.icon_url[0]}} resizeMode="cover"/>
                     <View style={styles.item_right}>
                         <Text style={styles.item_box_text}>{item.title}</Text>
                         <View style={styles.item_box_bottom}>
                             <Text style={styles.item_box_bottom_left}>{item.source}</Text>
                             <Text style={styles.item_box_bottom_right}>{timeFilter(item.date)}</Text>
                         </View>
                     </View>
                 </View>
                </TouchableHighlight>
            </View>
            )

        }else if(item.icon_url.length>1){

            return (
                <View>
                <TouchableHighlight style={styles.news_item} underlayColor="#f4f4f4" onPress={()=>{this.jump(item)}}>
                 <View style={styles.item_box}>
                     <Text style={styles.item_box_text}>{item.title}</Text>
                     <View style={styles.multi_img}>
                         {
                           item.icon_url.map((v,idx)=>{
                               return (
                                <Image key={idx} style={[styles.multi_img_img,(idx!=item.icon_url.length-1?{marginRight:10}:null)]} source={{uri:v}} resizeMode="cover"/>
                               )
                           })  
                         }
                     </View>
                     <View style={[styles.item_box_bottom,{marginTop:5}]}>
                             <Text style={styles.item_box_bottom_left}>{item.source}</Text>
                             <Text style={styles.item_box_bottom_right}>{timeFilter(item.date)}</Text>
                     </View>
                 </View>
                </TouchableHighlight>
            </View>
            )

        }

    }

    onRefresh = ()=>{

        const { selType } = this.props.newsAction;

        selType(this.state.brand_id);
        
    }

    scrollToTop = ()=>{
        this.refs.flat_list.scrollToOffset({
            offset:0,
            animated:false
        })
    }

    loadMore = ()=>{

        const { getList } = this.props.newsAction;

        if(!this.props.data.page | !this.props.data.page[this.state.brand_id]){
           return false;
        }

        const { cur_page,final_page } = this.props.data.page[this.state.brand_id];

        if(!this.onEndReachedCalledDuringmomentum && cur_page<final_page && this.props.data.news_request_flag == 0){
            getList(cur_page+1,true);
            this.onEndReachedCalledDuringmomentum = true;
        }
    
    }

    renderFooter = ()=>{

        if(!this.props.data.page || !this.props.data.page[this.state.brand_id]){
            return false;
         }

        const { cur_page,final_page } = this.props.data.page[this.state.brand_id];
        
        if(cur_page>=final_page){
          return null;
        }else{       
          return ListSpinner;       
        }
       
    }

    constructor(props){
      super(props);
      const { brand_id } = this.props.navigation.state.params;
      this.state = {
        brand_id
      }
    }

    componentDidMount(){
        
        const { selType } = this.props.newsAction;

        selType(this.state.brand_id);

    }

    shouldComponentUpdate(nextProps,nextState){
      
      if(nextProps.data.brand_id == nextState.brand_id){
          return true;
      }else{
          return false;
      }

    }
     

    render() {
       
        const { news_list,news_request_flag } = this.props.data;

        const { brand_id } = this.state;

        console.log(123);

        return (
          <View style={styles.box}> 
                <FlatList
                ref="flat_list" 
                data={((news_list && news_list[brand_id])?news_list[brand_id]:[])}
                renderItem={({item})=>{return this.renderItem(item)}}
                keyExtractor={item=>item.news_id}
                refreshControl={
                    <RefreshControl refreshing={((news_request_flag == 1)?true:false)} onRefresh={this.onRefresh}/>
                }
                ListFooterComponent={this.renderFooter()}
                onEndReached={this.loadMore}
                onEndReachedThreshold={0.01}
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
        newsAction:bindActionCreators(newsAction,dispatch),
        dispatch
    }
 }

export default connect(mapStateToProps,mapDispatchToProps,null,{forwardRef:true})(Newslist);
