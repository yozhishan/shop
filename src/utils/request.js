// 封装Promise用来请求wx.request
// url就是传过来的请求接口地址
// methods默认的是get  返回一个promise对象
// methods="GET" 声明函数
function request(url,method="GET",data={},header={}){
    //  Promise是一个构造函数，调用方法就会创建对象，可以传递参数，resolve是.then（成功）后传递过来的参数  reject是.catch的参数一般不需要
    return new Promise((resolve, reject) => {
        // 在请求数据之前 显示加载中
        wx.showLoading({
            title: '加载中',
            // 显示遮罩层防止继续点击
            mask: true
        })
        wx.request({
            url: url,
            method: method,
            data,
            // header不能写死，因为request在get和post，auth 都会用到所以header要是动态的，这就需要通过参数传进来，header默认是空的对象，如果存在就赋值给request，哪个接口需要用到header时就在哪个接口传进来
            // header:{token},
            header,
            success: (res) => {
                resolve(res);
                //  数据加载出来后关闭隐藏加载中
                wx.hideLoading()
            }
        })
    });
}
// 追加处理get请求的属性，只需要传递两个参数
request.get=function(url,data){
    return request(url,"GET",data);
}
// 追加处理post请求的属性，只需要传递两个参数
request.post=function(url,data){
    return request(url,"POST",data);
}

// 需要授权的接口调用
request.auth = function(url, data){
    
    // 如果本地没有token，跳转到登录页
    if(!wx.getStorageSync("token")){
        wx.navigateTo({
            url: "/pages/auth/main"
        });
        
        // 没有token的时候直接返回  返回的是一个promis对象。注意： 创建promise必须添加参数
        return new Promise(() => {});
    }
     
    // 注意，在auth里面需要加上头信息
    // return request(url, "POST", data, header)
    // auth需要用到header
    return request(url, "POST", data, {
        // 请求头信息,token已经保存到本地的情况
        "Authorization": wx.getStorageSync("token")
    });
}
// 把变量曝露出去
export default request;