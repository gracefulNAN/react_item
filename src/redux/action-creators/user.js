/* 
用于 登录用户请求数据
*/

import {
  reqLogin
} from '../../api'
import {
  message
} from 'antd'

import { SAVE_USER_TOKEN, REMOVE_USER_TOKEN } from '../action_types'

// 保存 user 和 token 的同步 action creator, 返回一个 包含 type 和 data 的对象
const saveUserToken = (user, token) => ({
  type: SAVE_USER_TOKEN,
  data: {
    user,
    token
  }
});

//当退出登录时，调用, 清除内存数据
export const removeUserToken = () => {
  // 清除local中的user和token
  localStorage.removeItem('user_key')
  localStorage.removeItem('token_key')

  return {type: REMOVE_USER_TOKEN}
}

export function loginAsync(username, password) {
  // 返回一个异步 action 函数

  return async (dispath) => {
    // 执行异步请求 , 并接收请求返回的结果
    const result = await reqLogin({
      username,
      password
    });

    // 根据结果分发同步 action 
    if (result.status === 0) { // 成功 把 user token 保存到内存
      // 获取 响应数据中的 user 和 token
      const {user, token} = result.data;
      // 保存方法：localStorage.setItem(key，value),
      localStorage.setItem('user_key',JSON.stringify(user));
      localStorage.setItem('token_key', token);

      // 分发保存user和token信息的同步action
      dispath(saveUserToken(user, token));

    } else { // 失败 显示警告
      message.error(result.msg)
    }
  }
}