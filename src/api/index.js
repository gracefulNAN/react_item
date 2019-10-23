/* 包装多个请求函数接口的模块 ，返回值 promise*/

import ajax from './ajax';

export const reqLogin = ({
  username,
  password
}) => {

  return ajax({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })

}