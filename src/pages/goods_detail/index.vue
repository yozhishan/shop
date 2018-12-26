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
      <div class="ft-right">加入购物车</div>
      <div class="ft-right">立即购买</div>
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
    // 返回后设置值，存到data里
     this.goods_id=query.goods_id;
    //  请求成功后返回一个promise对象
     request.get("https://itjustfun.cn/api/public/v1/goods/detail",{
     goods_id:this.goods_id
   }).then(res=>{
    //  请求成功后的回调
    console.log(res);
     const {data}=res.data;
     this.detail=data;
   })
 }
}

</script>
<style lang='scss' scoped>
@import 'style.scss';
</style>