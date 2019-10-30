/* 
定义全局配置的模块
*/

// 开发环境
export const IS_DEV = process.env.NODE_ENV === 'development';

// 分页每页显示的数据条数
export const PAGE_SIZE = 5

// 图片默认的根路径
export const BASE_IMAGE_URL = 'http://localhost:4000/upload/'