//  高阶函数实现AOP
//      AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来,
//      这些 跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。
//      把这些功能抽离出来之后, 再通过“动态织入”的方式掺入业务逻辑模块中。
//      这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性,其次是可以很方便地复用日志统计等功能模块。

//      通常,在 JavaScript 中实现 AOP,都是指把一个函数“动态织入”到另外一个函数之中,
//      具体的实现技术有很多,本节我们通过扩展 Function.prototype 来做到这一点。
//      代码如下:

Function.prototype.before = function (beforefn) {
    var __self = this;                          //保存原函数的引用
    return function () {                        //返回包含了原函数和新函数的"代理"的函数
        beforefn.apply(this, arguments);        //执行新函数,修正this
        return __self.apply(this, arguments);   //执行原函数
    }
}

Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}

var func = function () {
    console.log(2);
}

func = func.before(function () {
    console.log(1);
}).after(function () {
    console.log(3);
})

func();
