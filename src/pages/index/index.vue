<template>
  <div>
    <div class="search-wrapper">
      <div class="search-input">
        <icon type="search" size="16" />
        搜索
      </div>
    </div>
    <!-- 轮播图 -->
    <swiper indicator-dots 
    autoplay
    circular
    interval="2000"
   >
  <block v-for="(item,index) in imgUrl" :key="index">
    <swiper-item>
      <img :src="item.image_src" class="slide-image" mode="aspectFill" />
    </swiper-item>
  </block>
</swiper>
  </div>
</template>

<script>


export default {
  data () {
    return {
      imgUrl:[]
    }
  },
   mounted() {
    
     wx.request({
       // 发起一个轮播图api请求
       url:"https://itjustfun.cn/api/public/v1/home/swiperdata",
       success:(res)=>{
         console.log(res);
         // 请求回调函数
         const {data}=res.data;
         this.imgUrl=data;
       }
     });
   }
 
}
</script>

<style scoped lang="scss">
  .search-wrapper{
    background: #DD434F;
    padding:20rpx;

    .search-input{
      background:#fff;
      height:60rpx;
      font-size:15px;
      color:#999;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .search-input icon{
      margin-right:5px;
    }
  }

  .slide-image{
    height:340rpx;
    width:750rpx;
  }
</style>
