import React, { Component } from 'react'
import {Text} from "react-native";
import SafeAreaViewPlus from "../../components/safeAreaViewPlus";
import global from "../../style";
import NavigationBar from "../../components/navigationBar";
import NewsNav from "./components/newsNav";
import NewsList from "./components/newsList";
import { connect } from "react-redux";
import { actions as newsAction,getData,getNavList } from "../../redux/modules/newsPage/actions";
import { bindActionCreators } from 'redux';
import { delay } from "./../../util/common";
import TopTabNavigator from "./navigation";

class NewsPage extends Component {

    componentDidMount(){

        const { getNav,getList } = this.props.newsAction;

        getNav();

    }

    selType = ()=>{
      //this.refs.child.scrollToTop();
    }


    render() {
        
        const { nav_list } = this.props;

        const Topnav = TopTabNavigator(nav_list,this.props);

        return (
        <SafeAreaViewPlus topColor={global.themeColor}>
            <NavigationBar hide={true}/>    
            {Topnav?<Topnav />:null}
        </SafeAreaViewPlus>
        )
    }
}


const mapStateToProps = (state)=>{ 
    return {
      nav_list:getNavList(state)
    }
 }

 const mapDispatchToProps = (dispatch)=>{
    return {
        newsAction:bindActionCreators(newsAction,dispatch)
    }
 }

export default connect(mapStateToProps,mapDispatchToProps)(NewsPage);