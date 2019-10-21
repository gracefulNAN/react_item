
/* redux 最核心的管理对象 store */
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

// 总 reducer 总状态：{count, products}
import reducer from "./reducers";

// 判断是不是 开发环境
const IS_DEV = process.env.NODE_ENV === 'development';

// 向外默认一个 store 对象
export default createStore(
  reducer,
  IS_DEV ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
);