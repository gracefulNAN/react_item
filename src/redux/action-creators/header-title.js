// 操作headerTitle数据的 action creator

import {
  SET_HEADER_TITLE
} from '../action_types'

// 暴露 setHeaderTitle
export const setHeaderTitle = (headerTitle) => ({type:SET_HEADER_TITLE,data:headerTitle});