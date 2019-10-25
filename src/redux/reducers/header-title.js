/* 
待定
*/
import {
  SET_HEADER_TITLE
} from '../action_types'

const initUser = '首页';
export default function other(state=initUser,action){

  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data;
    default:
      return state;
  }

}