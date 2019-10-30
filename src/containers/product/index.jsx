/*
admin 的商品
*/

import React, { Component } from "react";
import { Card, Select, Button, Input, Icon, Table, message } from 'antd'

import { 
  reqProducts, 
  reqSearchProducts, 
  reqUpdateProductStatus 
} from '../../api'
import { PAGE_SIZE } from '../../config'
import memoryUtils from '../../utils/memory'

const { Option } = Select;

class Product extends Component {

  state = {
    products: [], // 当前商品列表
    total: 0, // 商品的总数量
    searchType: 'productName', // 下拉框默认显示的内容
    searchName: '', // 搜索的关键字
  }

  columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (price) => '¥' + price
    },
    {
      width: 150,
      title: '状态',
      render: ({ _id, status }) => {
        // status 1 在售； 2 下架
        let btnText = '下架';
        let text = '在售';
        if (status === 2) {
          btnText = '上架';
          text = '已下架'
        }
        return (
          <span>
            <Button
              type="primary"
              onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
            >
              {btnText}
            </Button>
            <span style={{margin:'0 0 0 10px'}}>{text}</span>
          </span>
        )
      }
    },
    {
      width: 150,
      title: '操作',
      render: (product) => (
        <span>
          <Button
            type='link'
            onClick = {
              () => {
                // 将 product 保存到创建的内存容器中
                memoryUtils.product = product;

                // 跳转路由
                this.props.history.push(`/product/detail/${product._id}`)
              }
            }
          >
            详情
          </Button>
          <Button
            type='link'
          >
            修改
          </Button>
        </span>
      )
    },
  ]

  // 更改商品的状态
  updateStatus = async (id, status) => {
    const result = await reqUpdateProductStatus(id, status);

    if (result.status === 0) {
      message.success('更新状态成功');

      // 获取 旧的数据，修改数据并生成新的 products（不能直接修改）
      let products = this.state.products;
      products = products.map((item)=>{

        if (item._id === id) {
          return {...item,status}
        } else {
          return item
        }
      });

      this.setState({
        products
      })

    } else {
      message.error(result.msg)
    }
  }

  // 获取数据
  getProducts = async (pageNum) => {

    let result
    // 发 搜索
    if (this.isSearch) {
      // 获取 searchType, searchName
      const { searchType, searchName } = this.state;
      // 判断是否有关键字
      if (!searchName) return
      // 发请求
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName });
    } else {
      // 发 异步请求获取商品信息
      result = await reqProducts({
        pageNum,
        pageSize: PAGE_SIZE
      });
    }

    // 判断 请求是否成功, 成功
    if (result.status === 0) {
      const { list, total } = result.data;
      this.setState({
        products: list,
        total,
      });
    }
  }

  componentDidMount() {
    this.getProducts(1);
  }

  render() {

    const { searchType, products, total, searchName } = this.state;

    const title = (
      <span>
        <Select
          value={searchType}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder='请输入关键字'
          style={{ width: 200, margin: '0 10px' }}
          value={searchName}
          onChange={ // 获取输入框中输入的关键字
            (event) => this.setState({
              searchName: event.target.value
            })
          }
          
        />
        <Button
          type="primary"
          onClick={
            () => {
              this.isSearch = true  // 保存一个标识搜索的值
              this.getProducts(1)
            }
          }
        >搜索</Button>&nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          onClick={
            () => {
              this.isSearch = false
              this.getProducts(1)
            }
          }
        >刷新</Button>
      </span>
    );

    const extra = (
      <Button
        type="primary"
        htmlType='submit'
      >
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    )

    return (
      <Card
        title={title}
        extra={extra}
      >
        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          size='middle '
          rowKey='_id'
          pagination={{
            pageSize: PAGE_SIZE,
            total,
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}
export default Product;