<!--  -->
<template>
  
        <div class="container">
        <!-- 收货人信息 -->
        <div class="cart-top">
        <div class="receive">
            <div class="name">
            收货人: 陈
            </div>
            <div class="phonen-number">
            12222222222
            </div>
        </div>
        <div class="address">
          收货地址: 广州吉山幼儿园广州吉山幼儿园
        </div>
        
        <img src="../../../static/images/cart_border@2x.png" class="address-bar"/>
        </div>
     <div class="list-title">
       <span class='iconfont icon-dianpu'></span>
        优购生活馆
      </div>

    <!-- 购物车列表 -->
  <div class="ware-list">
      <div class="ware-item" v-for="(item,index) in [1,1]" :key="index">

      <!-- 左侧的按钮 -->
      <div class="choice-button" >
          <!-- <icon type="success" :color="item.selected ? 'red' : '#999'" size="18"/> -->
          <icon type="success" color="red" size="18"/> 
      </div>
      <!-- 内容区域 -->
  <div class="ware-content">
  <!-- 左侧的图片 -->
  <navigator class="ware-image" url="#">
  <!-- <image src="{{item.goods_small_logo}}"></image> -->
  <img src="https://img.alicdn.com/tfscom/i3/O1CN013qGxdx25uR2Mt3stg_!!0-dgshop.jpg_180x180q90.jpg_.webp"/>
  </navigator>

  <!-- 右边的商品信息 -->
  <div class="ware-info">
  <navigator url="#" class="ware-title">
      今日推荐  今日推荐  今日推荐  今日推荐  今日推荐  今日推荐  今日推荐
  </navigator>
  <div class="ware-info-btm">
      <div class="ware-price">
      <span>￥</span> 250
      </div>

      <!-- 修改商品的数量 -->
      <div class="calculate">
      <div class="calculate">
          <div class="rect" @tap="handleDecrease(item)">-</div>
          <div class="number">
          1
          </div>
          <div class="rect" @tap="handleIncrease(item)">+</div>
        </div>
      </div>
     </div>
    </div>
  </div>
 </div>
</div>
    <!-- 结算 -->
<div class="cart-total">
      <div class="total-button">
          <icon type="success" color="#999" size="18" bindtap="handleAllSelect"/>全选
      </div>
      <div class="total-center">
          <div class="total-price">
          合计： 
          <text class="colorRed">
              <text>￥</text>0
          </text>
          </div>
          <div class="price-tips">
          包含运费
          </div>
      </div>
      <div class="accounts" bindtap="handleBuy">
          结算
      </div>
  </div>
           
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }

  
}

</script>
<style lang='scss' scoped>
@import 'style.scss';
</style>