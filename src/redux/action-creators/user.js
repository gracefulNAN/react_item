// 发请求
import { reqLogin } from '../../api';
// 显示信息
import { message } from 'antd';

import { SAVE_USER_TOKEN, REMOVE_USER_TOKEN } from '../action-types';

/* 保存 user 和 token 的同步 action creator */
const saveUserToken = (user, token) => ({type:SAVE_USER_TOKEN,data:{user, token}});

// 暴露 删除内存 local 中的 user 和 token 的函数，并返回一个对象
export const removeUserToken = () => {
  localStorage.removeItem('user_key')
  localStorage.removeItem('token_key')

  return {type: REMOVE_USER_TOKEN}
}

/* 用于登录请求的异步 action creator */
export function loginAsync(username, password){
  //  返回一个 异步 action 函数
return async dispatch => {
  // 调用接口请求函数执行异步 ajax 请求，通过 await 获取异步请求结果
  const result = await reqLogin({username, password})

  //根据结果分发同步 action
  if(result.status === 0){ // 登录成功
    // 通过结构赋值，获取 result.data 中的 user，token
    const {user, token} = result.data;

    // 将 user 和 token 保存 local 中, user 要转成 json 保存
    localStorage.setItem('user_key', JSON.stringify(user));
    localStorage.setItem('token_key', token);

    // 分发 user token 的同步 action
    dispatch(saveUserToken(user, token));
  } else { // 登录失败
    // 显示错误信息
    message.error(result.msg);
  }
}

}