
import { INCREEMENT, DECREEMENT } from "../action-types";

const initCount = 1;
export default function count(state=initCount,action){
  console.log('count()',state,action);
  switch (action.type) {
    case INCREEMENT:
      return state + action.data;
    case DECREEMENT:
      return state + action.data
    default:
      return state; // 返回原来的值
  }
  
};