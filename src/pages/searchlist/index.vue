
<template>
  <div>
       <!-- 搜索栏 -->
        <div class="search-wrapper">
            <div class="search-input">
                <icon type="search" size="16"/>
               {{keyword}}
            </div>
        </div>
      <!-- tab栏切换 -->
      <div class="tab">
        <div class="tab-item"
         :class="{active:index==currentIndex}"
         v-for="(item,index) in tabList" :key="index" 
        @click="handleTabChange(index)">
             {{item}}
        </div>
      </div>
      <!-- 商品列表 -->
      <div class="goods-list">
     <a :href="'/pages/goods_detail/main?goods_id='+item.goods_id"  v-for="(item,index) in goodsList" :key="index">
          <!-- 商品 -->
        <div class="goods-item">
        <img :src="item.goods_small_logo" mode="aspectFill">
          <div class="goods-right">
            <div class="goods-title">
              {{item.goods_name}}
            </div>
            <div class="goods-price">
             ￥<span>{{item.goods_price}}</span> 
            </div>
          </div>
        </div>
     </a>
      </div>
        <!-- 加载提示 -->
        <div class="loading">
             <div v-if="hasMore">正在加载</div>
             <div v-if="!hasMore">加载完成</div>
        </div>
  </div>
</template>

<script>
import  request  from '../../utils/request.js';

export default {
  data () {
    return {
      tabList:["综合", "销量", "价格"],
      keyword:'',
       currentIndex: 0,
       goodsList:[],
       pagenum:1,
      //  是否有更多的数据
       hasMore:true
    }
  },

  // mounted () {
  //   this.getData();
  // },
     // 小程序的生命周期，在mpvue不但可以使用vue的生命周期函数
    // 同时也可以使用原生小程序的生命周期
    onLoad(query){
      console.log(query);
      // 获取参数
      const keyword=query.keyword;
      // 保存到data
      this.keyword=keyword
    },
    // 2.解决了请求发送的问题后发现再次点击别的商品，第一页的数据仍是之前的商品，再次点击的商品数据被追加到了第二页----数据不会重载回原始数据
     // 在页面卸载时候初始化所有data数据（此方法在github找的）
     onUnload(){
       Object.assign(this,this.$options.data());
     },
    onShow(){
      // 1.当路由没有改变时,onLoad不再触发 所以请求不能写在onLoad中 应该写在onShow中(onShow不能传参数)
      // 第一次请求数据
        this.getData();
    },
    
    // 滚动到底部触发
    onReachBottom(){
        // 加载下一页
        this.getData();
    },
  methods: {
     handleTabChange(index){
       this.currentIndex=index;
       console.log(index);
       
     },
     //发起请求
     getData(){
       // 如果没有更多数据，不再发起请求
            if (!this.hasMore) {
              return;
            }
       request.get("https://www.itjustfun.cn/api/public/v1/goods/search",{
         query:this.keyword,pagenum:this.pagenum
       }).then(res=>{
         console.log(res);
         const {goods}=res.data.data;
         // 当goods列表数量小于20时候，没有更多数据
                if(goods.length < 20){
                    // 没有更多数据
                    this.hasMore = false;
                }
         // 把goods添加到this.goodsList
         this.goodsList=this.goodsList.concat(goods);
        //  下一页
        this.pagenum++;
         
       })
     }
  }
}

</script>
<style lang='scss' scoped>
@import 'style.scss';
</style>