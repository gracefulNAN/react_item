/* 
local 数据存储的工具函数封装
*/

import store from 'store';

/* 
保存数据
*/
function set(key,value) {
  store.set(key, value);

  // local
  /* value = value instanceof Object ? JSON.stringify(value) : value;
  localStorage.setItem(key, value); */
}

/* 
获取数据
*/
function get(key,defaultValue) {
  if(defaultValue === undefined){
    throw new Error('get() 必须指定默认值');
  }
   // 返回获取的数据
  return store.get(key, defaultValue);

  // local
  /* const value = localStorage.getItem(key);
  if (defaultValue instanceof Object) {
    return JSON.parse(value) || defaultValue;
  }
  return value || defaultValue; */
  
}

/* 
删除数据:指定删除；不指定默认删除所有
*/
function remove(key) {
  if(key){
    store.remove(key);
  }else{
    store.clearAll();
  }

  // localStorage.removeItem(key);
}

export default {
  set,
  get,
  remove,
  KEYS:{
    USER_KEY: 'user_key',
    TOKEN_KEY: 'token_key'
  }
}