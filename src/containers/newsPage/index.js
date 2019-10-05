import React, { Component } from 'react'
import {Text} from "react-native";
import SafeAreaViewPlus from "../../components/safeAreaViewPlus";
import global from "../../style";

export default class NewsPage extends Component {

    render() {
        return (
        <SafeAreaViewPlus topColor={global.themeColor}>
            <Text>我是新闻首页</Text>
        </SafeAreaViewPlus>
        )
    }
}
