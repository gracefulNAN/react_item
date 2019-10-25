/*
admin 的分类管理
*/

import React, { Component } from "react";
import {
  Card,
  Button,
  Icon,
  Table,
  Modal,
  message
} from 'antd'

import { reqCategorys } from '../../api'
import LinkButton from '../../components/link-button'

const columns = [
  {
    title: '分类名称',
    dataIndex: 'name',
  },
  {
    width: 300,
    title: '操作',
    render: () => <LinkButton>修改分类</LinkButton>,
  }
];


class Category extends Component {

  state = {
    categorys: [],
    loading: false, // 是否显示loading
  }

  getCategorys = async () => {

    // 显示加载
    this.setState({
      loading: true
    });

    // 发请求
    const result = await reqCategorys();

    // 隐藏加载
    this.setState({
      loading: false
    });

    // 判断 请求是否成功
    if (result.status === 0) {
      // 获取数据保存到state中
      const categorys = result.data;
      this.setState({
        categorys,
      });
    } else {
      message.error(result.msg);
    }
  }

  // 调用getCategorys
  componentDidMount () {
    this.getCategorys()
  }

  render() {

    const {categorys, loading} = this.state

    // 右上角界面
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    )

    return (
      <Card extra={<a href="#">More</a>}>
        <Table
          bordered
          loading={loading}
          dataSource={categorys}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5, showQuickJumper: true }}
        />
      </Card>
    )
  }
}
export default Category;