/* 
退出按钮
*/

import React,{ Component } from "react";
import './index.less'

class LinkButton extends Component{
  render(){
    return <button className='linkBtn' {...this.props}/>
  }
}
export default LinkButton;