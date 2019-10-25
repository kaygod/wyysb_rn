import React from "react";
import {createAppContainer} from 'react-navigation'
import NewsList from './components/newsList';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { delay } from "../../util/common";


const selType = (item,index)=>{

    const { selType } = this.props.newsAction;

    this.controllScroll(index);

    this.props.selType();

    selType(item.brand_id);

}



/**
 * 标签导航
 */
const TopTabNavigator = (list,props)=>{

    if(list.length == 0){
      return null;
    }

    let routeMap = {};

    list.reduce((item,value,index)=>{

        item[`newsPage${index}`] = {
            screen:NewsList,
            params:{
               index,
               brand_id:value.brand_id 
            },
            navigationOptions: {
                tabBarLabel: value.brand_name,
                tabBarOnPress({navigation,defaultHandler}){
                    props.newsAction.updateType(navigation.state.params.brand_id)
                    defaultHandler();
                }
            }
        }

        return item;

    },routeMap)

  
    return createAppContainer(createMaterialTopTabNavigator(routeMap, {
        tabBarPosition: 'top',       //标签栏在屏幕顶部还是底部
        swipeEnabled:true,           //是否可以滑动切换标签
        // backBehavior:'none',         //andorid按下返回键将返回initalRouteName，如果设置非initalRouteName则直接结束标签导航
        lazy: true,                    //是否只渲染显示的标签
        animationEnabled: true,         //标签切换是否有动画效果
        tabBarOptions: {
            activeTintColor: '#000',  //标签栏激活字体颜色
            inactiveTintColor: '#333',//标签栏未激活字体颜色
            showLabel: true,             //是否显示标签栏
            labelStyle: {fontSize: 15},  //标签样式(可设置字体大小等)
            showIcon: false,              //是否显示标签栏上图标
            scrollEnabled: true,        //是否可以滚动标签栏目(当tab总数超过一屏)
            indicatorStyle: {height: 2}, //指示器样式 height：0则不显示
            style: {backgroundColor: '#fff'}, //设置整个tabbar样式(背景颜色等)
            tabStyle:{backgroundColor:'#ffffff', height:50,width:107}//设置单个tabbar样式
        }
    }));


}

export default TopTabNavigator;
