//  call和apply的区别

//  apply 接受两个参数,第一个参数指定了函数体内 this 对象的指向,
//  第二个参数为一个带下标的集合,这个集合可以为数组,也可以为类数组,
//  apply 方法把这个集合中的元素作为参数传递给被调用的函数:

var func = function (a, b, c) {
    console.log([a, b, c]);
}
func.apply(null, [1, 2, 3])

//  在这段代码中,参数 1、2、3 被放在数组中一起传入 func 函数,它们分别对应 func 参数列 表中的 a、b、c。

//  call 传入的参数数量不固定,跟 apply 相同的是,
//  第一个参数也是代表函数体内的 this 指向,
//  从第二个参数开始往后,每个参数被依次传入函数:

var func2 = function (a, b, c) {
    console.log([a, b, c]);
}
func2.call(null, 1, 2, 3)

//  当调用一个函数时,JavaScript 的解释器并不会计较形参和实参在数量、类型以及顺序上的 区别,
//  JavaScript 的参数在内部就是用一个数组来表示的。
//  从这个意义上说,apply 比 call 的使用 率更高,
//  我们不必关心具体有多少参数被传入函数,只要用 apply 一股脑地推过去就可以了。

//  call 是包装在 apply 上面的一颗语法糖,如果我们明确地知道函数接受多少个参数,
//  而且想 一目了然地表达形参和实参的对应关系,那么也可以用 call 来传送参数。

//  当使用 call 或者 apply 的时候,如果我们传入的第一个参数为 null,函数体内的 this 会指 向默认的宿主对象,
//  在浏览器中则是 window:

var func3 = function (a, b, c) {
    console.log(this === window);
}
func3.apply( null, [ 1, 2, 3 ] );

//  有时候我们使用 call 或者 apply 的目的不在于指定 this 指向,而是另有用途,
//  比如借用其他对象的方法。那么我们可以传入 null 来代替某个具体的对象:

Math.max.apply( null, [ 1, 2, 5, 3, 4 ] );      // 输出:5

//  call和apply的用途
//  1.改变this指向
//  call 和 apply 最常见的用途是改变函数内部的 this 指向,我们来看个例子:

var obj1 = {
    name: 'alihanniba'
}
var obj2 = {
    name: 'R丶G'
}

window.name = 'window';

var getName = function () {
    console.log(this.name);
}

getName();
getName.call(obj1);
getName.call(obj2);


//  2. Function.prototype.bind
//  大部分高级浏览器都实现了内置的 Function.prototype.bind,用来指定函数内部的 this 指向,
//  即使没有原生的 Function.prototype.bind 实现,我们来模拟一个也不是难事,代码如下:

Function.prototype.bind = function () {
    var self = this,        //保存原函数
        context = [].shift.call(arguments);     //需要绑定的this上下文
        args = [].slice.call(arguments);        //剩余的参数转成数组
    return function () {    //返回一个新的函数
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
        //执行新的函数的时候,会把之前传入的context当做新函数体内的this
        //并且组合两次分别传入的参数,作为新函数的参数
    }
}
var obj = {
    name: 'alihanniba'
}
var func4 = function (a, b, c, d) {
    console.log(this.name);
    console.log([a, b, c, d]);
}.bind(obj, 1, 2);

func4(3, 4);

//  3. 借用其他对象的方法
//  借用方法的第一种场景是“借用构造函数”,通过这种技术,可以实现一些类似继承的效果:
var A = function (name) {
    this.name = name;
}
var B = function () {
    A.apply(this, arguments)
}
B.prototype.getName = function () {
    return this.name;
}
var b = new B('alihanniba');
console.log(b.getName());


//  函数的参数列表 arguments 是一个类数组对象,
//  虽然它也有“下标”,但它并非真正的数组, 所以也不能像数组一样,进行排序操作或者往集合里添加一个新的元素。
//  这种情况下,我们常常 会借用 Array.prototype 对象上的方法。
//  比如想往 arguments 中添加一个新的元素,通常会借用 Array.prototype.push:

(function () {
    Array.prototype.push.call(arguments, 3);
    console.log(arguments);
})(1, 2)

//  在操作 arguments 的时候,我们经常非常频繁地找 Array.prototype 对象借用方法
//  想把 arguments 转成真正的数组的时候,可以借用 Array.prototype.slice 方法;
//  想截去 arguments 列表中的头一个元素时,又可以借用 Array.prototype.shift 方法。


//  可以借用 Array.prototype.push 方法的对象还要满足以下两个条件,
//      1.对象本身要可以存取属性;
//      2.对象的 length 属性可读写。
