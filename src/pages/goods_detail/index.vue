<template>
  <div>
      <!-- 轮播图 -->
    <swiper indicator-dots 
    autoplay
    circular
    interval="2000"
   >
  <block v-for="(item,index) in detail.pics" :key="index">
    <swiper-item>
      <image :src="item.pics_big" class="slide-image" mode="aspectFill" />
    </swiper-item>
  </block>
</swiper>
<!-- 价格 -->
<div class="goods-price">
  ￥{{detail.goods_price}}
</div>
<!-- 标题 -->
<div class="goods-title">
  <h4>{{detail.goods_name}}</h4>
  <div class="goods-right">
    <span class="iconfont icon-shoucang"></span>
    <p>收藏</p>
  </div>
</div>
  <!-- 商品详情 -->
  <div class="goods-detail">
    <div class="detail-title">
      商品详情
    </div>
      <!-- v-html 会把html富文本（字符串）插入到元素内部 -->
     <div v-html="detail.goods_introduce">
      </div>
  </div>
 <!-- 底部栏 -->
    <div class="footer">

      <!-- 联系客服的按钮 -->
      <!-- open-type="contact"
      开放式设置 -->
      <button class="contact" open-type="contact">联系客服</button>

      <div class="ft-left">
        <span class="iconfont icon-kefu"></span>
        <p>联系客服</p>
      </div>
      <!-- open-type="switchTab" 
      底部tab需要设置这个属性才能跳转 -->
      <a href="/pages/cart/main" open-type="switchTab" class="ft-left">
        <span class="iconfont icon-gouwuche"></span>
        <p>购物车</p>
      </a>
      <div class="ft-right" @click="handleAddCart">加入购物车</div>
      <div class="ft-right" @click="handleAddCart">立即购买</div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request.js'
export default {
  data () {
    return {
      goods_id: "",
      detail:{},
    }
  },

 onLoad(query){
   console.log(query);
    // 获取goods_id，返回后设置值，存到data里
     this.goods_id=query.goods_id;
    //  请求成功后返回一个promise对象
     request.get("https://itjustfun.cn/api/public/v1/goods/detail",{
     goods_id:this.goods_id
   }).then(res=>{
    //  请求成功后的回调
    console.log(res);
     const {data}=res.data;
    //  把请求回来的数据赋值给详情
     this.detail=data;
   })
 },
 methods: {
  handleAddCart(){
    //添加购物车之前先看看本地有没有数据，有的话需要先拿出来 再往里面添加，没有就返回一个空数组对象
     //  this.detail是对象 
    // 获取本地的购物车数据
    const goods=wx.getStorageSync("goods")||{};
    // 往这个对象追加属性，追加新的商品， 把当前的商品添加到goods（对象里面）,如果goods之前就有商品了会被覆盖掉，
    // goods[this.goods_id]=this.detail;
    //  从详情页添加商品到购物车时：购物车商品数量跟选中按钮需要关联起来 当你点击加入购物车的时候this.detail(goods里面本来没有这两个属性)默认添加两个属性（是否选中状态和初始数量）,有了这两个属性就可以渲染页面了
     // 当加入购物车时候添加一个默认选中的状态属性
      this.detail.selected=true;
      // 添加一个初始数量的属性
      this.detail.number=1;
    // 所以需要判断一下这个goods有没有这个属性，有这个商品的话就不添加，没有才添加，这体现了用对象存列表数据的好处，（如果是用数组，还要循环遍历一遍判断，比较繁琐）这样就不需要遍历直接通过id（key）找到这个对象上面有没有这个数据，把当前的商品添加到goods（对象里面），把对象存到本地里面（goods），如果本地有添加了多个商品了，就可以去购物车循环遍历goods，把数据遍历出来渲染页面
     if(!goods[this.goods_id]){
        goods[this.goods_id] = this.detail;
      }

    // 找到商品对象存到一个对象里
    // wx.setStorageSync("goods",{})
   
    wx.setStorageSync("goods",goods);
    // 购物车列表数据从本地goods里拿出来渲染到页面
    // 加入购物车的时候提示
    // 提示
      wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        duration: 2000
      })
  }
 },
}

</script>
<style lang='scss' scoped>
@import 'style.scss';
</style>