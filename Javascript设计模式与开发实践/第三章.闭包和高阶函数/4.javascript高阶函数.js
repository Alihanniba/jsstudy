//  高阶函数是指至少满足下列条件之一的函数。
//      1.函数可以作为参数被传递;
//      2.函数可以作为返回值输出。

//    把函数当作参数传递,这代表我们可以抽离出一部分容易变化的业务逻辑,
//    把这部分业务逻 辑放在函数参数中,这样一来可以分离业务代码中变化与不变的部分。
//    其中一个重要应用场景就 是常见的回调函数。

//    1. 回调函数
//          在 ajax 异步请求的应用中,回调函数的使用非常频繁。
//          当我们想在 ajax 请求返回之后做一 些事情,但又并不知道请求返回的确切时间时,
//          最常见的方案就是把 callback 函数当作参数传入 发起 ajax 请求的方法中,待请求完成之后执行 callback 函数:

var getUserInfo = function (userId, callback) {
    $.ajax('https://www.alihanniba.com/rg?' + userId, function (data) {
        if (typeof callback === 'function') {
            callback(data);
        }
    })
}
getUserInfo(7, function (data) {
    console.log(data.userName);
})

//  回调函数的应用不仅只在异步请求中,当一个函数不适合执行一些请求时,
//  我们也可以把这 些请求封装成一个函数,并把它作为参数传递给另外一个函数,“委托”给另外一个函数来执行。
