/* 
商品的详情模块
*/

import React, { Component } from "react";
import { Card, Icon, List } from 'antd'

import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memory'
import { reqProductById, reqCategory } from '../../api'
import './detail.less'
// import { BASE_IMAGE_URL } from '../../config'


const { Item } = List

class Detail extends Component {

  state = {
    product: {},
    categoryName: ''
  }

  // 获取 product
  getProduct = async () => {

    // 取出内存中保存的 product
    const product = memoryUtils.product;
    // 如果 有 product ,直接使用
    if (product._id) {
      this.setState({
        product
      })

      // 获取分类
      this.getCategory(product.categoryId);
      return
    }

    // 如果没有，发请求获取指定 id 的数据
    // 获取 params 的 id
    const id = this.props.match.params.id;
    const result = await reqProductById(id);
    if (result.status === 0) {
      const product = result.data;
      this.setState({
        product
      })

      // 获取分类
      this.getCategory(product.categoryId);
    }
  }

  // 发异步分类请求
  getCategory = async (categoryId) => {
    // 发情求，获取数据
    const result = await reqCategory(categoryId);
    console.log(result);

    if (result.status === 0) {
      this.setState({
        categoryName: result.data.name
      })
    }
  }

  componentDidMount() {
    this.getProduct();
  }

  render() {

    const { product, categoryName } = this.state;

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>商品详情</span>
      </span>
    );

    return (
      <Card
        title={title}
      >
        <List
          bordered
          className = 'product_dedail'
        >
          <Item>
            <span className='product_detail_left'>商品名称：</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className='product_detail_left'>商品描述：</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className='product_detail_left'>商品价格：</span>
            <span>{product.price}元</span>
          </Item>
          <Item>
            <span className='product_detail_left'>所属分类：</span>
            <span>{categoryName}</span>
          </Item>
          <Item>
            <span className='product_detail_left'>商品图片：</span>
            <span>{
              product.imgs && product.imgs.map((img) => {
                return <img
                  key={img}
                  src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572433438&di=81e39e4cba54927e0754b523e1461cb4&src=http://hbimg.b0.upaiyun.com/3af0ab269d05a082eaaf03c5d3fffdabb4cd3ea317a80-66bQGb_fw658" alt="img"
                  className='product_detail_img'
                />
              })
            }</span>
          </Item>
          <Item>
            <span className='product_detail_left'>商品详情：</span>
            <div
              dangerouslySetInnerHTML={{
                __html: product.detail
              }}
            ></div>
          </Item>
        </List>
      </Card>
    )
  }
}
export default Detail;