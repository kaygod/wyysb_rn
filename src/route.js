import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NewsPage from "./containers/newsPage";
import ProductPage from "./containers/productPage";
import productTypePage from "./containers/productTypePage";
import productListPage from "./containers/productListPage";
import productDetailPage from "./containers/productDetailPage";
import comparePage from "./containers/comparePage";
import newsDetail from "./containers/newsDetail";
import fuzzyPage from "./containers/fuzzyPage";
import searchDetail from "./containers/searchDetail";

const newsStack = createStackNavigator({
    newsPage:{
        screen: NewsPage,
        navigationOptions: ({ navigation }) => ({
            header:null
        })
    },
    news_detail:{
      screen:newsDetail,
      navigationOptions: ({ navigation }) => ({
       header:null            
      })  
    }
},{
  navigationOptions:({navigation})=>({
    tabBarVisible:navigation.state.index>0 ? false : true
  }),
})

const productStack = createStackNavigator({
    productPage:{
        screen: ProductPage,
        navigationOptions: ({ navigation }) => ({
          header:null           
        })
    },
    productType:{
      screen: productTypePage,
      navigationOptions: ({ navigation }) => ({
        header:null            
      })
    },
     productList:{
       screen:productListPage,
       navigationOptions: ({ navigation }) => ({
        header:null            
       })    
     },
     productDetail:{
       screen:productDetailPage,
       navigationOptions: ({ navigation }) => ({
        header:null            
       })  
     },
     compare_page:{
      screen:comparePage,
      navigationOptions: ({ navigation }) => ({
       header:null            
      })  
     },
     fuzzy_page:{
       screen:fuzzyPage,
       navigationOptions: ({ navigation }) => ({
        header:null            
       })  
     },
     search_detail:{
      screen:searchDetail,
      navigationOptions: ({ navigation }) => ({
       header:null            
      })  
    }
},{
  navigationOptions:({navigation})=>({
    tabBarVisible:navigation.state.index>0 ? false : true
  }),
})

export default createAppContainer(
    createBottomTabNavigator(
      {
        newsModule: {
          screen:newsStack,
          navigationOptions:{
            tabBarLabel:"资讯"
          }
        },
        productModule: {
          screen:productStack,
          navigationOptions:{
            tabBarLabel:"信息"
          }
        }
      },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if (routeName === 'newsModule') {
              iconName = `ios-information-circle${focused ? '' : '-outline'}`;
              // Sometimes we want to add badges to some icons.
              // You can check the implementation below.
            } else if (routeName === 'productModule') {
              iconName = `ios-options`;
            }
    
            // You can return any component that you like here!
            return <IconComponent name={iconName} size={25} color={tintColor} />;
          },
        }),
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }
      }
    )
  );