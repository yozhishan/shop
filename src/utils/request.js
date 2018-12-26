// 封装Promise用来请求wx.request
// url就是传过来的请求接口地址
// methods默认是get   返回一个promise对象
// methods="GET" 声明函数
function request(url,methods="GET",data={}){
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
            methods: methods,
            data,
            success: (res) => {
                resolve(res);
                //  数据加载出来后关闭隐藏加载中
                wx.hideLoading()
            }
        })
    });
}
// 处理get请求的，只需要传递两个参数
request.get=function(url,data){
    return request(url,"GET",data);
}
// 把变量曝露出去
export default request;