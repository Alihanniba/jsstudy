//  过程与数据的结合是形容面向对象中的“对象”时经常使用的表达。
//  对象以方法的形式包含了过程,而闭包则是在过程中以环境的形式包含了数据。
//  通常用面向对象思想能实现的功能,用 闭包也能实现。
//  反之亦然。在 JavaScript 语言的祖先 Scheme 语言中,甚至都没有提供面向对象 的原生设计,但可以使用闭包来实现一个完整的面向对象系统。

//  下面来看看这段跟闭包相关的代码:

var extent1 = function () {
    var value = 0;
    return {
        call: function () {
            value++;
            console.log(value);
        }
    }
}
var extent2 = extent1();
extent2.call();      //1
extent2.call();      //2
extent2.call();      //3

//  换成面向对象的写法:
var extent3 = {
    value: 0,
    call: function () {
        this.value++;
        console.log(this.value);
    }
}

extent3.call();      //1
extent3.call();      //2
extent3.call();      //3

//  或者
var Extent = function () {
    this.value = 0;
}
Extent.prototype.call = function () {
    this.value++;
    console.log(this.value);
}
var extent4 = new Extent();
extent4.call();
extent4.call();
extent4.call();
