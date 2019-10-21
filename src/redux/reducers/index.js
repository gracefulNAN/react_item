
// combineReducers 合并多个 redux 函数
import { combineReducers } from "redux";

import count from "./count";
import products from "./products";

export default combineReducers({
  count,
  products
});