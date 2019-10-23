/* 
管理用户信息数据的 reducer 函数
*/

// const initUser = 1;

import { SAVE_USER_TOKEN, REMOVE_USER_TOKEN} from '../action_types'

const _user = JSON.parse(localStorage.getItem('user_key') || '{}');
const _token = localStorage.getItem('token_key');
 // 设置初始值
const initUser = {
  user: _user,
  token: _token,
  hasLogin: _token && _user._id // 是否已经登录
}

export default function user(state=initUser,action){

  switch (action.type) {
    case SAVE_USER_TOKEN:
      const { user, token } = action.data
      return {
        user, 
        token,
        hasLogin: true
      }
    case REMOVE_USER_TOKEN:
      return {
        user: {}, 
        token: '',
        hasLogin: false
      }
    default:
      return state;
  }

}