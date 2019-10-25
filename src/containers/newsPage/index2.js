import React, { Component } from 'react'
import {Text} from "react-native";
import SafeAreaViewPlus from "../../components/safeAreaViewPlus";
import global from "../../style";
import NavigationBar from "../../components/navigationBar";
import NewsNav from "./components/newsNav";
import NewsList from "./components/newsList";
import { connect } from "react-redux";
import { actions as newsAction,getData } from "../../redux/modules/newsPage/actions";
import { bindActionCreators } from 'redux';
import { delay } from "./../../util/common";

class NewsPage extends Component {

    componentDidMount(){

        const { getNav,getList } = this.props.newsAction;

        getNav().then(()=>{

            getList(1);

            return delay();

        }).then(()=>{
            this.refs.child_nav.calcLayout();
        })

    }

    selType = ()=>{
      this.refs.child.scrollToTop();
    }

    render() {
        return (
        <SafeAreaViewPlus topColor={global.themeColor}>
            <NavigationBar hide={true}/>
            <NewsNav selType={this.selType} ref="child_nav"/>
            <NewsList ref="child"/>
        </SafeAreaViewPlus>
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
        newsAction:bindActionCreators(newsAction,dispatch)
    }
 }

export default connect(mapStateToProps,mapDispatchToProps)(NewsPage);