/*  
向外暴露总 reducers 函数
*/
// 把 reducer 函数 包装成总的 reducer 函数
import { combineReducers } from 'redux'

import user from './user';
import headerTitle from './header-title'
import categorys from './categorys'

// combineReducers 是一个函数，传入一个 reducer 函数集合，
export default combineReducers({
  user,
  headerTitle,
  categorys
});

/* 
在 redux 中 reducers 会向 store 传递一个总的reducer函数，可用于更新数据 state
*/