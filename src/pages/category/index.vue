<template>
  <div>
   <!-- 搜索 -->
   <Search/>
  <div class="main">
    <!--小程序scroll-view组件  -->
    <!-- 左边菜单 -->
     <scroll-view
    scroll-y class="left"
  >
    <div class="menu-item" 
    :class="{active:index==currentIndex}"
    @click="handleClick(index)"
    v-for="(item,index) in menus" :key="index">
     {{item.cat_name}}
       
    </div>
  </scroll-view>
  <!-- 右边品牌选项 -->
       <scroll-view
    scroll-y class="right"
  >
  <!-- 将rightList.children赋值给 item-->
    <div class="brand" v-for="(item,index) in rightList.children" :key="index">
         <div class="brand-title">
           <span>/</span>
           {{item.cat_name}}
           <span>/</span>
         </div>
        <!-- 品牌列表 -->
        <div class="brand-list">
          <!-- item.children ==> rightList.children.children-->
          <!-- 每项品牌 -->
          <div class="brand-item" v-for="(subItem,subIndex) in item.children" :key="subIndex"
          @click="handleToGoodsList(subItem.cat_name)">
           <img :src="subItem.cat_icon" mode="aspectFill">
             <p>{{subItem.cat_name}}</p>
          </div>
        
        </div>
    </div>
  </scroll-view>
   
  </div>
  </div>
</template>

<script>

// 引入搜索组件
import Search from "../../components/Search.vue";
// 引入请求方法
import request from "../../utils/request.js"
export default {
  data () {
    return {
      // 左侧菜单数组
      menus:[],
      // 菜单高亮下标，当前点击的索引
      currentIndex:0,
      // 右边数据,数据是对象
       rightList:{}
    }
  },
  // 注册组件
  components: {
   Search,
  },
   mounted() {
    //  请求分类页数据
     request("https://www.zhengzhicheng.cn/api/public/v1/categories").then(res=>{
       console.log(res);
      //  结构所有数据列表
       const {message}=res.data;
       this.menus=message;
      //  打开页面时先显示第0项的数据
       this.rightList=message[0];
     })
   },
  methods: {
    // 点击时触发，获取到点击的下标
 handleClick(index){
  //  当前点击菜单索引
 this.currentIndex=index;
//  点击菜单某一项的时候根据索引，匹配出分类数据某一项
 this.rightList=this.menus[this.currentIndex]
 },
  // 负责跳转到商品搜索列表
  handleToGoodsList(name){
      wx.navigateTo({
        url:`/pages/searchlist/main?keyword=${name}`
      })
   }
  }
}
</script>

<style scoped lang="scss">
@import 'style.scss';
</style>
