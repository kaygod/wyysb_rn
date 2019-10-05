import React, { Component } from 'react'
import {Text} from "react-native";
import SafeAreaViewPlus from "../../components/safeAreaViewPlus";
import global from "../../style";
import Search from "./components/search";
import ProductList from "./components/productList";

export default class ProdcutPage extends Component {
   
    render() {
        return (
         <SafeAreaViewPlus topColor={global.themeColor}>

              <Search />

              <ProductList/>
             
         </SafeAreaViewPlus>
        )
    }
}
