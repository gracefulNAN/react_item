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
} from 'antd'
import {connect} from 'react-redux'

// import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import {
  getCategoryAsync,
  addCategoryAsync,
  updateCategoryAsync
} from '../../redux/action-creators/categorys';
import LinkButton from '../../components/link-button'
import AddUpdateForm from './add-update-form'

@connect(
  state => ({categorys: state.categorys}),
  {getCategoryAsync, addCategoryAsync, updateCategoryAsync}
)
class Category extends Component {

  state = {
    loading: false, // 是否显示loading
    isShowAdd: false,
    isShowUpdate: false,
  }

  // 分类列表 数组
  columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      width: 300,
      title: '操作',
      render: (category) => <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>,
    },
    {
      width: 100,
      title: '功能',
      dataIndex: '',
      key: 'x',
      render: (category) => <LinkButton onClick={
        ()=>{
          this.deleteCategorys(category);
        }
      }>删除</LinkButton>,
    },
  ];

  // 删除 分类项
  deleteCategorys = (category) => {
    Modal.confirm({
      title: '确定删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        
        // 获取 categorys 
        const {categorys} = this.props;

        // 使用 .reduce() 更新 categorys
        this.setState({
          categorys: categorys.reduce((pre,item)=>{
            
            if (item._id !== category._id) {
              
              // 合并指定数组到目标数组
              pre = pre.concat(item);
              
            }

            return pre;
          },[])
        });

      },
      onCancel: () => { }
    });
  }

  // 获取分类列表
  getCategorys = async () => {

    // 显示加载
    this.setState({
      loading: true
    });

    // 发请求
    const msg = await this.props.getCategoryAsync();

    // 隐藏加载
    this.setState({
      loading: false
    });

    if (msg) {
      message.error(msg);
    }

    // 判断 请求是否成功
    /* if (result.status === 0) {
      // 获取数据保存到state中
      const categorys = result.data;
      this.setState({
        categorys,
      });
    } else {
      message.error(result.msg);
    } */
  }

  // 调用getCategorys
  componentDidMount() {
    this.getCategorys()
  }

  // 隐藏添加界面
  hideAdd = () => {

    // 重置输入框，回到默认值
    this.form.resetFields();

    // 改变 添加分类界面的状态
    this.setState({
      isShowAdd: false
    })
  }

  // 添加分类
  addCategory = async () => {

    // 进行输入验证
    this.form.validateFields(async (error, values) => {

      // 判断输入框是不是为空
      if (!error) {  // 没有值，说明输入的有数据

        // 获取输入的分类名
        const { categoryName } = values;

        // 发 添加分类请求
        const msg = await this.props.addCategoryAsync(categoryName);

        // 重置 回复初始值
        this.form.resetFields();

        if (msg) {
          message.error(msg);
        } else {
          this.setState({
            isShowAdd: false
          });
          message.success('添加成功');
        }

        /* // 判断 请求是否成功
        if (result.status === 0) {

          // 获取 category
          const category = result.data

          // 因为不能直接修改 state 中的数据，所以要接收以下旧的数据
          const categorys = this.state.categorys

          // 设置 state, 改变 添加分类界面状态
          this.setState({
            categorys: [category, ...categorys],
            isShowAdd: false
          });

          // 提示信息
          message.success('添加分类成功');

        } else {
          // 添加失败
          message.error(result.msg);
        } */
      }
    });

  }

  // 隐藏 修改页面
  hideUpdate = () => {

    // 重置 回复初始值
    this.form.resetFields();

    // 改变 修改分类界面的状态
    this.setState({
      isShowUpdate: false
    });
  }

  // 显示修改界面
  showUpdate = (category) => {

    // 保存 分类
    this.category = category

    // 改变 修改界面的状态
    this.setState({
      isShowUpdate: true
    })
  }

  // 修改分类
  updateCategory = () => {

    // 进行 输入验证
    this.form.validateFields( async (error, values) => {

      // 判断 是否输入的内容
      if (!error) {

        // 获取 输入的数据
        const { categoryName } = values;
        // 获取 输入数据的 id
        const categoryId = this.category._id;

        // 发 修改分类的请求，并接收返回的数据
        const msg = await this.props.updateCategoryAsync({ categoryName,categoryId });

        // 重置 回复初始值
        this.form.resetFields();

        if (msg) {
          message.error(msg);
        } else {
          this.setState({
            isShowUpdate:false
          });
          message.success('修改成功');
        }

        // 判断 是否修改成功 
        /* if (result.status === 0) {  // 修改 成功，刷新页面显示

          // 生成 category
          const category = {
            _id: categoryId,
            name: categoryName
          }

          // 修改 state ，因不能直接修改状态, 所以使用 .map() 生成新的数据数组
          const categorys = this.state.categorys;
          this.setState({
            categorys: categorys.map((item) => {
             
              // 通过判断 id 值是否相等，对数据进行修改
              if (item._id === category._id) {
                return category;
              } else {
                return item
              }
            }),

            // 改变 修改界面的状态
            isShowUpdate:false
          });

          // 提示信息
          message.error('修改成功');
        } else {
          message.error(result.msg);
        } */
      }
    });


  }

  render() {

    // 右上角界面
    const extra = (
      <Button type="primary" onClick={() => {
        this.setState({
          isShowAdd: true,
        })
      }}>  {/* 打开 添加 界面*/}
        <Icon type="plus"></Icon>
        添加
      </Button>
    )

    const { loading, isShowAdd, isShowUpdate } = this.state;
    const category = this.category || {};
    const {categorys} = this.props

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
          visible={isShowAdd}
          onOk={this.addCategory}
          onCancel={this.hideAdd}
          okText="确认"
          cancelText="取消"
        >
          <AddUpdateForm setForm={(form) => this.form = form} />
        </Modal>
        <Modal
          title="修改分类"
          visible={isShowUpdate}
          onOk={this.updateCategory}
          onCancel={this.hideUpdate}
          okText="确认"
          cancelText="取消"
        >
          <AddUpdateForm setForm={(form) => this.form = form} categoryName={category.name} />
        </Modal>
      </Card>
    )
  }
}
export default Category;