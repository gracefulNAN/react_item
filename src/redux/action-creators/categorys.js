/* 
分类管理的数据管理模块
*/

import {
  RECEIVE_CATEGORYS,
  ADD_CATEGORY,
  UPDATE_CATEGORY
} from '../action_types';

import {
  reqCategorys,
  reqAddCategory,
  reqUpdateCategory
} from '../../api';

// 同步 action
const receiveCategorys = (categorys) => ({
  type: RECEIVE_CATEGORYS,
  data: categorys
})
const addCategory = (category) => ({
  type: ADD_CATEGORY,
  data: category
})
const updateCategory = (category) => ({
  type: UPDATE_CATEGORY,
  data: category
})

/* 
获取分类列表的所有的异步 action
*/
export const getCategoryAsync = () => {
  // 返回异步 promise ;  getState 可以使 action 得到现有的的 state
  return async (dispath, getState) => {

    // 判断 state.categorys 是否有数据，如果有不在发请求
    if (getState().categorys.length>0) return;
    
    // 发 异步请求
    const result = await reqCategorys();

    // 请求完成分发同步 action
    if (result.status === 0) {
      const categorys = result.data;
      dispath(receiveCategorys(categorys));
    }

    // 通过返回 .msg 使外部组件判断请求状态
    return result.msg;
  }
}
/* 
添加分类列表的异步 action
*/
export const addCategoryAsync = (categoryName) => {
  // 返回异步 promise ;  getState 可以使 action 得到现有的的 state
  return async (dispath) => {
    
    // 发 异步请求
    const result = await reqAddCategory(categoryName);

    // 请求完成分发同步 action
    if (result.status === 0) {
      const category = result.data;
      dispath(addCategory(category));
    }

    // 通过返回 .msg 使外部组件判断请求状态
    return result.msg;
  }
}
/* 
更新分类列表的异步 action
*/
export const updateCategoryAsync = ({categoryName, categoryId}) => {
  // 返回异步 promise ;  getState 可以使 action 得到现有的的 state
  return async (dispath) => {
    
    // 发 异步请求
    const result = await reqUpdateCategory({categoryName, categoryId});

    // 请求完成分发同步 action
    if (result.status === 0) {
      const category = {_id:categoryId, name:categoryName};
      dispath(updateCategory(category));
    }

    // 通过返回 .msg 使外部组件判断请求状态
    return result.msg;
  }
}
