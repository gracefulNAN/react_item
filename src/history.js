/* 
向外暴露 history 对象 ，使外部文件可以获取路由组件的功能
*/

import {createBrowserHistory/* , createHashHistory */} from 'history'

export default createBrowserHistory();