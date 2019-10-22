//
import {createStore,applyMiddleware} from 'redux'
//
import thunk from 'redux-thunk'
// 
import {
  composeWithDevTools
} from 'redux-devtools-extension'

// 引入 IS_DEV 判断是否是开发环境
import { IS_DEV } from '../config'

import reducer from './reducers'

export default createStore(
  reducer,
  IS_DEV ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
);