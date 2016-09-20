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
