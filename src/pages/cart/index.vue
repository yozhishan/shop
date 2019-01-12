<!--  -->
<template>
<div>
<!-- 购物车列表为空时候 -->
 <div class="empty" v-if="isEmpty">
      <img src="../../../static/images/cart_empty@2x.png" mode="aspectFill">
      <div>你还没有添加任何商品</div>
    </div>
<!-- 购物车列表有值时候显示 -->
    <div class="container" v-if="!isEmpty">
    <!-- 收货人信息 -->
    <!--  当收获地址为空（没有值的时候）显示按钮，获取地址 （根据属性来判断一个对象是否为空，address是否有值）-->
    <!-- @click="getAddress"点击箭头可以再获取地址进行修改 -->
    <div class="cart-top" v-if="address.name"  @click="getAddress">
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
    <!--  当收获地址为空（没有值的时候）显示按钮，获取地址 （根据属性来判断一个对象是否为空，address是否有值）-->
    <!--getAddress点击跳转到获取收获地址界面  -->
    <div class="get-address" v-if="!address.name" @click="getAddress">
    <button>获取地址</button>
    </div>
  <div class="list-title">
    <span class='iconfont icon-dianpu'></span>
    优购生活馆
  </div>

    <!-- 购物车列表 -->
    <!-- 循环的goods是一个对象，在v-for里循环对象时第二个值是key（唯一的id）第三个值是index，index可以省略 item是循环的对象 goods赋值给item-->
  <div class="ware-list">
      <div class="ware-item" v-for="(item,key) in goods" :key="key ">

      <!-- 左侧的按钮 选中状态 -->
      <div class="choice-button" >
          <!-- 默认选中状态，默认true为选中红色 keyweiid -->
          <icon type="success" :color="item.selected ? 'red' : '#999'" size="18"
         @click="handleSelected(key)"/>
          
          <!-- <icon type="success" color="red" size="18"/>  -->
      </div>
      <!-- 内容区域 -->
  <div class="ware-content">
  <!-- 左侧的图片 -->
  <navigator class="ware-image" :url="'/pages/goods_detail/main?goods_id='+key">
  <!-- <image src="{{item.goods_small_logo}}"></image> -->
  <!-- key=id -->
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

      <!-- 修改商品的数量 商品加入购物车时商品数量跟选中按钮需要关联起来 当你点击加入购物车的时候this.detail默认添加两个属性（是否选中状态和初始数量）-->
      <div class="calculate">
        <!-- 传入item，通过item拿到id，找到当前相加的商品-->
      <div class="calculate">
          <div class="rect" @click="handleDecrease(item)">-</div>
          <div class="number">
          {{item.number}}
          </div>
          <div class="rect" @click="handleIncrease(item)">+</div>
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
          <!-- <icon type="success" color="#999" size="18" bindtap="handleAllSelect"/> -->
        <icon type="success" :color="allSelected ? 'red' : '#999'" size="18" @click="handleAllSelect"/>   
          全选
      </div>
      <div class="total-center">
          <div class="total-price">
          合计： 
          <text class="colorRed">
              <text>￥</text>{{ allPrice}}
          </text>
          </div>
          <div class="price-tips">
          包含运费
          </div>
      </div>
      <div class="accounts" @click="handleBuy">
          结算
      </div>
    </div>
  </div>         
 </div>
</template>

<script>
// 引入reqeust
import request from "../../utils/request.js";

export default {
  data () {
         // 初始化地址信息(空对象)
    //   const initAddr = {
    //     name: "",
    //     telNumber: "",
    //     addr: ""
    //   }
    return {
        // 收货人信息
        // 初始化数据的时候获取到存起来的本地数据，如果不存在这个地址数据的话就设置为（返回）空对象
        // address:wx.getStorageSync("address")|| {
        //     name:'',
        //    telNumber:'',
        //     addr:''
        // },
    // address:wx.getStorageSync("address")|| initAddr,
       address:{},
  // 购物车列表数据是从详情页添加到本地再从本地goods里拿出来渲染到页面 
    
    //  goods:wx.getStorageSync("goods")||{}
    goods: {}
    //  如果两个值都有了就循环遍历goods，价格跟goods有关系的
        
    }
  },
//  一触发页面的时候触发onShow 每次打开页面的时候都初始化一下获取一遍address和goods，修改信息。这样添加商品后就不用自己手动刷新页面才能看到刚刚添加的商品。（数据放data处会有缓存）
  onShow(){
      // 初始化地址信息
      const initAddr = {
        name: "",
        telNumber: "",
        addr: ""
      }
      this.address = wx.getStorageSync("address") || initAddr;
      this.goods = wx.getStorageSync("goods") || {}
    },
   // 什么方法可以监听到data里的变化并生成新的data（watch是监听，生成用computed）
   computed: {
    //  购物车是否为空
    isEmpty(){
      //如何判断一个对象是否为空？可以通过key（）转为数组
       if(Object.keys(this.goods).length > 0){
           //  不是为空的时候
              return false;
          }
          return true;
    },


    //   生成一个新的属性，函数名即为 address，goods的变量
    // 定义函数名 总价格
    allPrice(){
        // 返回
        // 监听对象的变化，对象是没有foreach，forin方法的
        //  Object.for() 没有这个方法会报错
        // this.goods.key()
        // Object.keys()返回key集合，是一个数组,然后遍历使用数组方法
        // 接收这个this.goods参数，拿到当前key的对象，就能拿到所有goods的key了，然后对这个数组进行循环遍历
        // 这里的数组怎么排序？
        console.log(Object.keys(this.goods))
        // v表示当前项，拿到这个v之后就可以相加价格，先声明一个初始值变量
        let price=0;
        Object.keys(this.goods).forEach(v => {
            const item =this.goods[v];
            //当商品选中时候为才加到总价格
            if (item.selected) {
            // 相加价格 =总价格
             // 把每项商品的价格添加到price
            // price+=v.goods_price;
            // this.goods把这个键v传进去
            // price+=this.goods[v].goods_price;
            // 总价=价格*数量
            price+=item.goods_price*item.number;
            }

       })
       // 返回总价格，然后渲染到页面
           return price;
    },
     //定义状态判断是否全选 goods里所有的selected属性
      allSelected(){
        //  默认值选中状态
        let selected = true;
        // goods需要再循环一次
        Object.keys(this.goods).forEach(v => {
          // 只要商品列表其中有一个值不选中， 全选就为false
          if(this.goods[v].selected == false){
            selected = false;
          }
        })
        //  返回，渲染
        return selected;
      }
    },
  methods: {
      getAddress(){
        //   获取地址 会根据腾讯导航地址的定位获取
          wx.chooseAddress({
            //   模拟器自动生成的地址
            success:(res) =>{
                // success(res) {}是success:function(res){}的缩写，改变this指向需要改为箭头 函数

                // 打印地址
                // console.log(res.userName)
                // console.log(res.postalCode)
                // console.log(res.provinceName)
                // console.log(res.cityName)
                // console.log(res.countyName)
                // console.log(res.detailInfo)
                // console.log(res.nationalCode)
                // console.log(res.telNumber)
                
                // this.address={ }会报错
                // 因为this的指向问题，普通函数的this会指向当前函数作用域=>success:function(res){}这个函数，所以这里应改为箭头函数，改变this指向
           // 重新拼接地址对象,拿到地址
            this.address={
                   name:res.userName,
                  telNumber:res.telNumber,
                   addr:`${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`
                }
                // 但是每次刷新地址会不见，所以需要把地址保存到本地，然后循环遍历goods
                wx.setStorageSync("address",this.address)
            }
          })
      },
    //   点击选中状态
    handleSelected(id){
         // 修改状态，取反
         this.goods[id].selected=!this.goods[id].selected;
         //需要再次保存到本地
           wx.setStorageSync("goods", this.goods);
    },
    // 点击全选
    handleAllSelect(){
        // 先声明
        const isSelected=!this.allSelected
         // goods需要再循环一次
     Object.keys(this.goods).forEach(v => {
         //点选时有bug所以this.allSelected需要在外面先声明  
        //   this.goods[v].selected=!this.allSelected
       // 把当前的全部选中状态取反 
           this.goods[v].selected=isSelected
    })
  },
//   点击数量+1
  handleIncrease(item){
    //拿到id后就可以去匹配goods里面的number然后相加1
        console.log(item);
        // 找出goods_id
        const goods_id=item.goods_id;
        // 根据goods_id找出当前点击的商品，数量加1
        this.goods[goods_id].number++;
        // 然后存到本地
      wx.setStorageSync("goods", this.goods);

  },
    // 数量减一
      handleDecrease(item){
        // 找出goods_id
        const goods_id = item.goods_id;
        // 当数量为1是显示弹框
        if(this.goods[goods_id].number === 1){
          // 弹出询问框
          wx.showModal({
            title: '提示',
            content: '是否删除商品?',
            success: (res) => {
              // 点击确定触发
              if (res.confirm) {
                // 使用delete删除data的属性，不会驱动视图（重点）
                delete this.goods[goods_id];
                console.log(this.goods);
                
                //解决方法一： 把this.goods解构到新的对象,再重新赋值
                // this.goods = {...this.goods};
                // 解决方法二：利用Object.assign({}，this.obj)创建新对象，合并对象，一开始是数组，返回数据时初始化data，第一个参数是需要合并的对象，把第二个参数合并到前面的空对象(把this.goods到新的对象的{})，返回一个新的对象,
                this.goods = Object.assign({}, this.goods)
                // 存到本地
                wx.setStorageSync("goods", this.goods);
              } 
            }
          });
          // 如果商品数量为1，直接返回，不用执行下面代码了
          return;
        }
  
        // 根据goods_id找出当前点击的商品，数量减1
        this.goods[goods_id].number--;
        // 重新存到本地
        wx.setStorageSync("goods", this.goods);
  
      },
   handleBuy(){
       // 处理新goods商品列表,返回一个新的数组传到 request.post里的goods里，map循环的数组里的每一项是由return返回什么决定的
        const newGoods = Object.keys(this.goods).map(v => {
           // 循环里的当前商品
            const item = this.goods[v];
            return {
              // 重新赋值
                goods_id: item.goods_id,
                goods_number: item.num,
                goods_price: item.goods_price
            }
        });

           // 创建订单 需要授权：post改为auth
           request.auth("https://itjustfun.cn/api/public/v1/my/orders/create",{
              //  总价格
              order_price: this.allPrice,
              // 订单地址
              consignee_addr: this.address.addr,
               // 商品列表
               goods: newGoods
       }).then( res => {
            // console.log(res)
             // 解构出订单编号
            // 通过解构拿到order_number
            const {order_number}=res.data;
            // 将order_number传到订单页
            // 跳转到确认订单页，并且通过参数传递订单编码
            wx.navigateTo({
              url:`/pages/enter_order/main?order_number=${order_number}`
            })
       })
       console.log(request.auth());
       
    }
  }
}
</script>
<style lang='scss' scoped>
@import 'style.scss';
</style>