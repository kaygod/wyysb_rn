import {combineReducers} from 'redux'
import {rootCom} from './navigator';
import RootNavigator from "../route";
import product_type from "./modules/productTypePage/reducer";
import product_list from "./modules/productListPage/reducer";
import product_detail from "./modules/productDetailPage/reducer";
import compare_data from "./modules/compareComponent/reducer";
import compare_page from "./modules/comparePage/reducer";
import news_page from "./modules/newsPage/reducer";
import fuzzy_page from "./modules/fuzzyPage/reducer";
import search_detail from "./modules/searchDetailPage/reducer";

//1.指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2.创建自己的 navigation reducer，
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
    nav: navReducer,
    product_type,
    product_list,
    product_detail,
    compare_data,
    compare_page,
    news_page,
    fuzzy_page,
    search_detail
});

export default index;