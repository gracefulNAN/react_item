/* 管理登录用户数据的reducer函数 */
import {
  SAVE_USER_TOKEN,
  REMOVE_USER_TOKEN
} from '../action-types'

const local_user = JSON.parse(localStorage.getItem('user_key') || {});
const local_token = localStorage.getItem('token_key');
const initUser = {
  user: local_user,
  token: local_token,
  hasLogin: local_user && local_token._id
};
export default function user(state = initUser, action) {
  switch (action.type) {
    case SAVE_USER_TOKEN:
      const {user,token} = action.data
      return {
        user,
        token,
        hasLogin:true
      }
    case REMOVE_USER_TOKEN:
      return {
        user:{},
        token:'',
        hasLogin:false
      }
    default:
      return state
  }
}