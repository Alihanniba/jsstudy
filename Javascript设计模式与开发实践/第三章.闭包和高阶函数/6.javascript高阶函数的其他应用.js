//  函数柯里化 currying
//      currying 又称部分求值。
//      一个 currying 的函数首先会接受一些参数,接受了这些参数之后, 该函数并不会立即求值,而是继续返回另外一个函数,
//      刚才传入的参数在函数形成的闭包中被保 存起来。
//      待到函数被真正需要求值的时候,之前传入的所有参数都会被一次性用于求值。

//      接下来我们编写一个通用的 function currying(){},function currying(){}接受一个参数,即将要被 currying 的函数。
//      在这个例子里,这个函数的作用遍历本月每天的开销并求出它们的总和。
//      代码如下:


var currying = function (fn) {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;            //  匿名函数递归的调用自身
        }
    }
}

var cost = (function () {
    var money = 0;
    return function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        }
        return money;
    }
})();

var cost = currying(cost);          //转化成currying函数
cost(100);      //未真正求职
cost(200);      //未真正求职
cost(300);      //未真正求职

console.log(cost());        //求值并输出600;
