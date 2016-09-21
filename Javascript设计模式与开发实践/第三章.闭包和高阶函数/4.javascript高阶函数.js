//  高阶函数是指至少满足下列条件之一的函数。
//      1.函数可以作为参数被传递;
//      2.函数可以作为返回值输出。

//  1)函数作为参数传递

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
//  我们也可以把这 些请求封装成一个[ 函数 ],并把它作为[ 参数 ]传递给另外一个函数,“委托”给另外一个函数来执行。

//  2. Array.prototype.sort
//  Array.prototype.sort 接受一个函数当作参数,这个函数里面封装了数组元素的排序规则。
//  从 Array.prototype.sort 的使用可以看到,我们的目的是对数组进行排序,这是不变的部分;
//  而使 用什么规则去排序,则是可变的部分。
//  把可变的部分封装在函数参数里,动态传入 Array.prototype.sort,
//  使 Array.prototype.sort 方法成为了一个非常灵活的方法,
//  代码如下:


//  2)函数作为返回值输出
//      1. 判断数据的类型

//      我们来看看这个例子,判断一个数据是否是数组,
//      在以往的实现中,可以基于鸭子类型的概 念来判断,
//      比如判断这个数据有没有 length 属性,有没有 sort 方法或者 slice 方法等。
//      但更好 的方式是用 Object.prototype.toString 来计算。
//      Object.prototype.toString.call( obj )返回一个 字符串,
//      比如 Object.prototype.toString.call( [1,2,3] )总是返回"[object Array]",
//      而 Object.prototype.toString.call( “str”)总是返回"[object String]"。
//      所以我们可以编写一系列的 isType 函数。
//      代码如下:


var isString = function (obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
var isNumber = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
}

//  我们发现,这些函数的大部分实现都是相同的,不同的只是 Object.prototype.toString. call( obj )返回的字符串。
//  为了避免多余的代码,我们尝试把这些字符串作为参数提前值入 isType 函数。
//  代码如下:

var isType = function (type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
}

var isString = isType('String');
var isArray = isType('Array');
var isNumber = isType('Number');

console.log(isArrsy([1, 2, 3]));        //输出true


//  我们还可以用循环语句,来批量注册这些isType函数:

var type = {};
for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
    (function (type) {
        Type['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    })(type)
}
Type.isArray([]);
Type.isString('alihanniba')
