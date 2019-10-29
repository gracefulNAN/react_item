
/* 
分类管理子组件
 */

import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'


const { Item } = Form;

@Form.create()
class AddUpdateForm extends Component {

  // 父组件向子组件传入的指定属性参数类型规范
  static propTypes = {
    setForm:PropTypes.func.isRequired,
    categoryName:PropTypes.string  // 不是必须项，因为该属性在多处使用
  }

  // 构造函数
  constructor (props){
    super(props);

    // 调用父组件出入的 setForm 函数属性，把 form 传递给父组件
    this.props.setForm(this.props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName', {
              // 如果手动输入修改了重新指定无效
              initialValue: this.props.categoryName || '',
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
              <Input placeholder ='请输入分类名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}
export default AddUpdateForm;