<template>
  <div>
    <div class="search-wrapper">
      <div class="search-input">
        <!-- 给搜索图标注册点击搜索事件 -->
        <!-- input组件中给键盘触发表单提交事件  confirm-type="search"
        confirm-type设置键盘右下角按钮文字
        @confirm="handleSearch"
        触发右下角按钮事件bindconfirm=>onconfirm=>@confirm-->
        <icon type="search" size="16"  @click="handleSearch"/>
        <input type="text" placeholder="请输入商品" @input="handleInput" v-model="inputValue">
        
      </div>
      <!-- 取消按钮  v-if="inputValue"inputValue是空的时候，为false条件不成立，不显示按钮-->
      <button class="cancel" v-if="inputValue" @click="handleCancel">取消</button>
    </div>
    <!-- 历史搜索 -->
    <div class="history-title">
      <h4>历史搜索</h4>
      <icon type="clear" size="14" @click="handleClear"/>
    </div>
    <div class="list" >
  <span v-for="(item,index) in historyList" :key="index">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //  初始化本地页面的时候在本地要把数据拿回来，获取本地数据，web获取只需要一个参数key，需要调用同步版本，页面一加载就把数据加载出来
       // 初始化本地的搜索列表数据，如果本地没有值获取本地值为空的时候，不存在设置为空的数组(默认值)
      historyList: wx.getStorageSync("historyList")|| [],
      // 是否显示取消按钮：通过input的value是否有值，来判断显示或隐藏按钮
      inputValue:"",
      
    }
  },

  methods: {
    //  在小程序里所有on的监听事件都写成bind，监听事件时，省略前面的on和bind，但是在vue里面是on会替换成@，所以这里会使用@input来监听输入框的输入事件，绑定事件会拿到一个事件对象，通过事件函数返回对象来获取这个事件对象，可以通过变量event来接收，通过打印可以拿到value的属性值，再把这个对象解构处理
    //监听输入框事件
    handleInput(){
    //  console.log(event);
     // 获取输入框的值，（因为使用了v-model进行双向数据绑定，所以不需要赋值）
    //  const {value}=event.target;
    //  拿到this.inputValue的值后就可以控制按钮的显示和隐藏
    //  this.inputValue=value;
    //  console.log(this.inputValue);
     
    },
    // 触发取消
    handleCancel(){
      // 清空输入框的数据
      this.inputValue="";
    },
    // 确认搜索时候触发
    handleSearch(){
        // this.historyList.push(this.inputValue)

         // 从数组前面添加
      this.historyList.unshift(this.inputValue);
         // 第一种去重：循环列表找到相同的下标删除，再添加上新的数据
        // 第二种：set对象去重，在添加数据之后去重 
        // 构造函数的首字母都是大写的
      const newData = new Set(this.historyList);
      // 返回一个变量,set对象
      console.log(newData);
      // 第一次点击时 this.historyList还是一个数组,第二次点击调用时会报错， 需要将set对象重新转化成数组

      //有bug
      // this.historyList=newData;

      // // 把set对象解构到数据里面
      this.historyData = [...newData];

      // 把输入框的值存到本地（设置）两个参数（key，value）
      // wx.setStorageSync(搜索历史记录key（字符串数组）,输入的value,需要存入的数组),搜索历史记录数组定义的变量名命名最好与所定义的数组保持一致一致
      wx.setStorageSync("historyList",this.historyList);

      // 页面跳转的api，跳转到搜索结果页
      wx.navigateTo({
        url:`/pages/searchlist/main?keyword=${this.inputValue}`
      })
      
     
    },
     // 清除所有的数据
    handleClear(){
      wx.clearStorageSync("historyList");
      // 清空后刷新页面
      this.historyList = [];
      
    }
  }
}

</script>
<style lang='scss' scoped>
@import "style.scss"
</style>