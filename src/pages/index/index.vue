<template>
<!-- 搜索框 -->
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

<!-- 中间的分类选项-->
<div class="navMenus">
   <div class="menus-item" v-for="(item,key) in menus" :key="key">
    <img :src="item.image_src" mode="aspectFill">
   </div>
</div>
<!-- 楼层数据 -->
<div class="floor" >
  <!-- 每个楼层 -->
   <div class="floor-item" v-for="(item,index) in floors" :key="index">
     <!-- 标题 -->
     <div class="floor-title">
       <img :src="item.floor_title.image_src" alt="">
     </div>
     <div class="product">
       <!-- 左侧商品 -->
       <div class="left">
         <!-- 左侧图片取列表中的第0项的大图片 -->
         <img :src="item.product_list[0].image_src" mode="aspectFill">
       </div>
       <!-- 右侧商品 -->
       <div class="right">
         <!-- 右侧图片需要使用过滤器(v-if和v-show)去除掉列表中第0项 的左侧大图 z这里使用v-if取反 如果索引不等于0的显示图片等于0为flase  v-if不成立就隐藏掉图片-->

         <!-- 同一组件内嵌套的 v-for 不能连续使用相同的索引，目前为: index,index-->
          <div class="right-item" 
           v-if="subIndex!=0"
          v-for="(subItem,subIndex) in item.product_list" :key="subIndex">
           <img :src="subItem.image_src">
          </div>

       </div>
     </div>
   </div>
</div>
  </div>
</template>

<script>

import request from "../../utils/request.js"

export default {
  data () {
    return {
      // 定义
      imgUrl:[],
      menus:[],
      floors:[]
    }
  },
   mounted() {
     this.getData();
    //  理论上一个浏览器可以发送多个ajax请求，但是发送超过5个服务器或浏览器就会挂掉，所以需要封装一下Promise用来请求wx.request放在utils/request.js，处理多个异步请求的解决方法（需要嵌套关系）   request(url,methods)  传的参数url是请求的接口地址，methods默认是get   返回一个promise对象
    // 处理多次请求
    // request(url,methods).then(res=>{
    //   console.log(res);
      
    // })
    // 请求轮播图的接口
    //  wx.request({
    //    // 发起一个轮播图api请求
    //    url:"https://itjustfun.cn/api/public/v1/home/swiperdata",
    //    success:(res)=>{
    //      console.log(res);
    //      // 请求回调函数  解构 
    //      const {data}=res.data;
    //      this.imgUrl=data;
    //    }
    //  });
    // //  请求分类的接口
    //  wx.request({
    //    url:"https://itjustfun.cn/api/public/v1/home/catitems",
    //    success:(res)=>{
    //      console.log(res);
    //      const {data}=res.data;
    //      this.menus=data;
         
    //    }
    //  });
    //  //  请求楼层接口
    //   wx.request({
    //     url:"https://www.zhengzhicheng.cn/api/public/v1/home/floordata",
    //     success:(res)=>{
    //       console.log(res);
    //       const {message}=res.data;
    //       this.floors=message;
          
    //     }
    //   })

   },
   methods: {
    //  用同步的方法处理异步请求
    // 自定义async函数
      // 声明函数
    async getData() {
      // 函数内部调用await 只等待promise对象
      // 请求接口返回后才会执行下面的代码，达到先这行一个接口结束再来请求下一个接口不会冲突的目的
      // try {} catch (error) {}  1.捕获错误信息2.提供块级作用域  这样就不会发生变量命名冲突了
      //  一个函数作用域下不能重复声明变量
      // 返回的是resolve（then参数函数）里面res  用let res来接收返回的res
      try{
        let res = await request("https://itjustfun.cn/api/public/v1/home/swiperdata");
        const {data} = res.data;
        this.imgUrl = data;
      }catch(err){ console.log(err) }

      // 请求分类数据
      try{
        let res = await request("https://itjustfun.cn/api/public/v1/home/catitems");
        const {data} = res.data;
        this.menus = data;
      }catch(err){ console.log(err) }

      // 请求楼层数据
      try{
        let res = await request("https://www.zhengzhicheng.cn/api/public/v1/home/floordata");
        const {message} = res.data;
        this.floors = message;
      }catch(err){ console.log(err) }
    }
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
  .navMenus{
    display: flex;
    justify-content: space-around;
    padding:20rpx 0;
    img{
      width: 128rpx;
      height:140rpx;
    }
  }
  .floor-title{
    img{
      width:750rpx;
      height:60rpx;
      display: block;
    }
  }
   .product{
    padding:20rpx;
    display: flex;

    .left{
      margin-right:15rpx;
      img{
        width:232rpx;
        height:385rpx;
      }
    }

    .right{
      display: flex;
      flex-wrap: wrap;
      flex:1;
      justify-content: space-between;

      img{
        width:232rpx;
        height:188rpx;
        
      }
    }
  }
</style>
