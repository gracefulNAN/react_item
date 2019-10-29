/* 
redux 最核心的管理对象 store ， 可以保存 state 在内存中
*/

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
//引入redux-devtools-extension的可视化工具
import {composeWithDevTools} from 'redux-devtools-extension';

// 引入 reducers 暴露的总 reducer 函数
import reducer from './reducers';
// 引入 环境模块的布尔值
import {IS_DEV} from '../config';


// 通过 createStore 方法创建的 store 是一个对象 , 并 暴露出去，让 react 获取 state
 export default createStore(
  reducer, 
  IS_DEV ? composeWithDevTools(applyMiddleware(thunk)):applyMiddleware(thunk)
);

/* 

Redux 最核心的 API ---- createStore，通过 createStore 方法创建的 store 是一个对象，它本身又包含4个方法。

getState()：获得store中当前的状态。
dispath(action)：分发一个action，并返回这个 action，这是唯一能改变 store 中数据的方式。
subscrible(listener)： 注册一个监听者，他在 store 发生变化时被调用。
replaceReducer(nextReducer)：更新当前 store 里的reducer，一般只会在开发模式中调用该方法。


直接将thunk中间件引入，放在applyMiddleware方法之中，传入createStore方法，就完成了store.dispatch()的功能增强。即可以在reducer中进行一些异步的操作

applyMiddleware就是Redux的一个原生方法，将所有中间件组成一个数组，依次执行

*/