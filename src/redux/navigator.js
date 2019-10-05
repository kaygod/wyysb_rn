import AppNavigator from '../route';
import { createReduxContainer, createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

export const rootCom = 'newsModule';//设置根路由

// 创建React Navigation Redux中间件
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
);
// 生成reduxify导航组件
const App = createReduxContainer(AppNavigator, "root");

const mapStateToProps = (state) => ({
    state: state.nav,
});

export default connect(mapStateToProps)(App);

