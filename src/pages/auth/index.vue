<template>
  <div>
    <!-- 因为小程序的授权安全问题，小程序已经禁止了getUserInfo获取，不能主动获取用户信息的，必须通过用户授权才能拿到数据 通过button设置open-type属性和绑定事件获取所有的用户信息open-type="getUserInfo"-->
    <button open-type="getUserInfo" @getuserinfo="handleClick">授权登录</button>
  </div>
</template>

<script>
// 引入请求方法
import request from "../../utils/request.js"

export default {
  methods: {
    // 授权登录
    handleClick(event){
      // 拿到event获取到detail里面的数据
       console.log(event);
       
      // 获取code
      wx.login({
        success(res) {
           console.log(res);
          // 先拿到第一个参数code，存起来
          if (res.code) {
           
            //  用户信息，用户信息和getUserInfo返回是一样
            // 通过detail拿到剩余的四个参数
            const {detail} = event.mp;
            console.log(detail);
            // 授权登录的接口参数（调用接口获取token需要传递五个参数 ，(拿到五个参数就可以去请求授权登录的接口)返回token，拿到token，保存到本地，在调用post请求的时候，把token传到title里
            // 拼接
            const data = {
              // encryptedData	用户信息加密数据不可读的，解密需要去后台拿到key去解密，拿到当前用户的所有信息
              //iv：解密算法
              // rawData：用户初始数据，基本信息
              code: res.code,
              encryptedData: detail.encryptedData,
              iv: detail.iv,
              rawData: detail.rawData,
              signature: detail.signature
            }
            console.log(data);
            
            // 请求授权登录接口
            request.post(
              "https://itjustfun.cn/api/public/v1/users/wxlogin", 
              data
            ).then(res => {
              // 拿到token
              console.log(res);
              const {token} = res.data.data;
              // 把token保存到本地
              wx.setStorageSync("token", token);
              // 返回上一页，提交订单,创建订单成功，然后根据订单编号发起支付
              wx.navigateBack();
            })

          }
        }
      })

    }
  }
}
</script>

<style scoped>
  button{
    margin:300rpx 50rpx;
  }
</style>
