/* 
管理所有分类列表的 reducer 函数
*/

import {
  RECEIVE_CATEGORYS,
  ADD_CATEGORY,
  UPDATE_CATEGORY
} from '../action_types';

// 声明 state 的默认值
const initCategorys = [];
// 暴露创建分类列表的 reducer 函数
export default function categorys (state = initCategorys, action){
  switch (action.type) {
    case RECEIVE_CATEGORYS:
      return action.data;

    case ADD_CATEGORY:
      return [action.data, ...state]; // 因为不能直接修改旧的数据

    case UPDATE_CATEGORY:
      return state.map((item)=>{  // 因为不能直接修改旧的数据
        if (item._id === action.data._id) {
          return action.data;
        } else {
          return item;
        }
      });

    default:
      return state;
  }
}