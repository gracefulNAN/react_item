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
  message,
  Input
} from 'antd'

import { reqCategorys } from '../../api'
import LinkButton from '../../components/link-button'


class Category extends Component {

  state = {
    categorys: [],
    loading: false, // 是否显示loading
    visible: false,
    visible123: false,
  }

  columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      width: 300,
      title: '操作',
      render: () => <LinkButton onClick={this.showModal123}>修改分类</LinkButton>,
    }
  ];



// 添加
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

// 修改
  showModal123 = () => {
    this.setState({
      visible123: true,
    });
  };

  hideModal123 = () => {
    this.setState({
      visible123: false,
    });
  };


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
  componentDidMount() {
    this.getCategorys()
  }

  render() {

    const { categorys, loading } = this.state

    // 右上角界面
    const extra = (
      <Button type="primary" onClick={this.showModal}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    )

    return (
      <Card extra={extra}>
        <Table
          bordered
          loading={loading}
          dataSource={categorys}
          columns={this.columns}
          rowKey="_id"
          pagination={{ pageSize: 5, showQuickJumper: true }}
        />
        <Modal
          title="添加分类"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <Input placeholder ='请输入分类名称'/>
        </Modal>
        <Modal
          title="添加分类"
          visible={this.state.visible123}
          onOk={this.hideModal123}
          onCancel={this.hideModal123}
          okText="确认"
          cancelText="取消"
        >
          <Input placeholder ='请输入分类名称'/>
        </Modal>
      </Card>
    )
  }
}
export default Category;