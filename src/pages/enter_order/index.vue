<template>
  <div class="container">
    <!-- 收货人信息 -->
    <div class="cart-top">
        <div class="receive">
            <div class="name">
              收货人: {{address.name}}
            </div>
            <div class="phonen-number">
              {{address.telNumber}}
            </div>
        </div>
        <div class="address">
            收货地址: {{address.addr}}
        </div>
        
        <img src="../../../static/images/cart_border@2x.png" class="address-bar"/>
    </div>

    <!-- 列表标题 -->
    <div class="list-title">
      <span class='iconfont icon-dianpu'></span>
        优购生活馆
    </div>

    <div class="ware-list">
      <div class="ware-item" v-for="(item, key) in goods" :key="key">

          <!-- 内容区域 -->
          <div class="ware-content">
              <!-- 左侧的图片 -->
              <navigator class="ware-image" :url="'/pages/goods_detail/main?goods_id='+key">
                <img :src="item.goods_small_logo" mode="aspectFill"/>
              </navigator>

              <!-- 右边的商品信息 -->
                <div class="ware-info">
                  <navigator :url="'/pages/goods_detail/main?goods_id='+key" class="ware-title">
                      {{item.goods_name}}
                  </navigator>
                  <div class="ware-info-btm">
                      <div class="ware-price">
                        <span>￥</span> {{item.goods_price}}
                      </div>

                      <!-- 修改商品的数量 -->
                      <div class="calculate">
                        <div class="number">x{{item.number}}</div>
                      </div>
                  </div>
                </div>
          </div>
      </div>
    </div>
    
    <!-- 总价 -->
    <div class="pa20">
      总价: <span>{{allPrice}}</span>
    </div>

    <!-- 支付按钮 -->
    <button type="primary" class="pay-button" @click="handlePay">支付</button>

  </div>
</template>

<script>
import request from "../../utils/request.js"

export default {
  data(){
    return {
      address: {},
      goods: [],
      orderNumber: ""
    }
  },

  onLoad(query){
    // 接收订单编号
    this.orderNumber = query.order_number;
  },

  onShow(){
    // 从本地拿出来
    this.address = wx.getStorageSync("address") || {};

    // 找出所有的商品
    const goods = wx.getStorageSync("goods");
    // 把对象转化为数组。空的数组，存放选中的商品
    let newGoods = [];
    // 重新保存到本地的新数据，去除掉购买的商品（过滤）
    let cacheGoods = {};

    // 循环goods对象
    for(let key in goods){
      // 当前其中商品是选中状态 selected为true的状态
      if(goods[key].selected){
        // 修改单个商品加个，加上两位小数点
        goods[key].goods_price = Number(goods[key].goods_price).toFixed(2);
        // 添加到新数组里
        newGoods.push(goods[key]);
      }else{
        // 把没有选中的商品保留到购物车
        cacheGoods[key] = goods[key];
      }
    }

    // 把选中的商品添加到列表渲染到页面
    this.goods = newGoods;

    // 把没有选中的商品保存到本地
    wx.setStorageSync("goods", cacheGoods);
  },

  computed: {
    // 总价格
    allPrice(){
      // Object.keys()返回key集合，是一个数组
      let price = 0;
      // this.goods是一个数组
      this.goods.forEach(item => {
        // 把每项商品的价格添加到price
        price += item.goods_price * item.number;
      })
      // 返回总价格,使用Number().toFixed()去保留小数点
      return Number(price).toFixed(2);
    },
  },

  methods: {
    // 点击支付事件
    handlePay(){
      // 发起支付
      request.auth("https://itjustfun.cn/api/public/v1/my/orders/req_unifiedorder",{
        // 订单编号通过参数从购物车那边传过来
        // order_number需要先从购物车解构出来
        order_number: this.orderNumber
      }).then(res => {
        // 需要支付的对象
        const {wxorder} = res.data.data;
        wx.requestPayment(wxorder);
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "style.scss";
</style>
