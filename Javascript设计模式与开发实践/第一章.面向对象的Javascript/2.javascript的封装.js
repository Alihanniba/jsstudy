/**
 * 封装的目的是将信息隐藏。一般而言,我们讨论的封装是封装数据和封装实现。这一节将讨
论更广义的封装,不仅包括封装数据和封装实现,还包括封装类型和封装变化。
 */

// 封装数据
/**
 * 封装的目的是将信息隐藏。一般而言,我们讨论的封装是封装数据和封装实现。这一节将讨
论更广义的封装,不仅包括封装数据和封装实现,还包括封装类型和封装变化。
 */

//封装数据
/**
 在许多语言的对象系统中,封装数据是由语法解析来实现的,这些语言也许提供了 private、
public、protected 等关键字来提供不同的访问权限。
 但 JavaScript 并没有提供对这些关键字的支持,我们只能依赖变量的作用域来实现封装特性,
而且只能模拟出 public 和 private 这两种封装性。
除了 ECMAScript 6 中提供的 let 之外,一般我们通过函数来创建作用域:
 */

var myObject = (function(){
    var __name = 'alihanniba';  //私有(private)变量
    return {
        getName: function () {
            return __name;      //  公开(public)方法
        }
    }
})();

console.log(myObject.getName());
console.log(myObject.__name);
