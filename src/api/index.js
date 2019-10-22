// 引入 ajax
import ajax from './ajax'

// 登录
// 创建一个函数，传入配置对象{username，password}，返回一个 ajax()请求结果，即 promise 
export const reqLogin = ({username,password}) => {
  return ajax({
    url:'/login',
    method:'POST',
    data:{username,password}
  })
}