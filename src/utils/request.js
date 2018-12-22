// 封装Promise用来请求wx.request
// url就是传过来的请求接口地址
// methods默认是get   返回一个promise对象
// methods="GET" 声明函数
function request(url,methods="GET"){
    //  Promise是一个构造函数，调用方法就会创建对象，可以传递参数，resolve是.then（成功）后传递过来的参数  reject是.catch的参数一般不需要
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            methods: methods,
            success: (res) => {
                resolve(res);
            }
        })
    });
}

// 把变量曝露出去
export default request;