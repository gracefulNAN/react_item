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

// 获取列表信息，用于验证 token 
export const reqUsers = () => {
  return ajax({
    url:'/manage/user/list',
    method:'GET'
  });
}

/* 
ajax('/manage/user/list')
ajax.get('/manage/user/list')
*/