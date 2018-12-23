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
    <div class="brand" v-for="(item,index) in rightList.children" :key="index">
         <div class="brand-title">
           <span>/</span>
           {{item.cat_name}}
           <span>/</span>
         </div>
        <!-- 品牌列表 -->
        <div class="brand-list">
          <div class="brand-item" v-for="(subItem,subIndex) in item.children" :key="subIndex">
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
      menus:[],
      currentIndex:0,
       rightList:{}
    }
  },

  components: {
   Search,
  },
   mounted() {
     request("https://www.zhengzhicheng.cn/api/public/v1/categories").then(res=>{
       console.log(res);
       const {message}=res.data;
       this.menus=message;
       this.rightList=message[0];
     })
   },
  methods: {
 handleClick(index){
 this.currentIndex=index;
 this.rightList=this.menus[this.currentIndex]
 }
  }
}
</script>

<style scoped lang="scss">
@import 'style.scss';
</style>
