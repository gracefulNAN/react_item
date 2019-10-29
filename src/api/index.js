/* 包装多个请求函数接口的模块 ，返回值 promise*/

import jsonp from 'jsonp'
import {
  message
} from 'antd'
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
    url: '/manage/user/list',
    method: 'GET'
  });
}

// 使用 jsonp 发起天气请求
export const reqWeather = (city) => {
  // 返回 promise 
  return new Promise((resolve,reject) => {
    // 获取天气路径
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发请求
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {

        const {
          dayPictureUrl,
          weather
        } = data.results[0].weather_data[0];
        resolve({
          dayPictureUrl,
          weather
        });

      } else {
        message.error('获取失败');
        return new Promise(()=>{});
      }
    })
  });
}

// 获取所有分类的列表
export const reqCategorys = () => ajax('/manage/category/list')

/* 
ajax('/manage/user/list')
ajax.get('/manage/user/list')
*/

// 发 添加分类请求
export const reqAddCategory = (categoryName)=> ajax.post('/manage/category/add', {categoryName})

// 发 修改分类请求
export const reqUpdateCategory = ({categoryId, categoryName})=> ajax({
  url:'/manage/category/update',
  method:'POST',
  data:{categoryId, categoryName}
});