import React from 'react';
// connect 包装 UI 组件，生成容器组件
import {connect} from 'react-redux';

import Counter from '../components/counter'
import {increment, decrement, incrementAsync} from '../redux/action-creators/count'

export default connect(
  (state)=>({count:state.count}),
  {increment, decrement, incrementAsync}
)(Counter);