// 跟别的语言大相径庭的是,JavaScript 的 this 总是指向一个对象,
// 而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的,而非函数被声明时的环境

/** this的指向
 * 		作为对象的方法调用。
 * 		作为普通函数调用。
 * 		构造器调用。
 * 		Function.prototype.call 或 Function.prototype.apply 调用。
 */

// 1.作为对象的方法调用
// 当函数作为对象的方法被调用时,this 指向该对象:

var obj = {
    a: 1,
    getA: function () {
        console.log(this === obj);
        console.log(this.a);
    }
}
obj.getA();

// 2. 作为普通函数调用
// 当函数不作为对象的属性被调用时,也就是我们常说的普通函数方式,此时的 this 总是指向全局对象。
// 在浏览器的 JavaScript 里,这个全局对象是 window 对象。
// 在浏览器中测试

window.name = 'alihanniba';
var getName = function () {
    return this.name;
}

console.log(getName());

//或者

var myObject = {
    name: 'alihanniba3333',
    getName: function () {
        return this.name;
    }
}

var getName2 = myObject.getName;
console.log(getName2());

// 3. 构造器调用
// JavaScript 中没有类,但是可以从构造器中创建对象,同时也提供了 new 运算符,使得构造器看起来更像一个类。
// 除了宿主提供的一些内置函数,大部分 JavaScript 函数都可以当作构造器使用。
// 构造器的外表跟普通函数一模一样,它们的区别在于被调用的方式。
// 当用 new 运算符调用函数时,该函数总会返回一个对象,通常情况下,构造器里的 this 就指向返回的这个对象,见如下代码:

// 隐式对象
var myClass = function () {
    this.name = 'alihanniba';
}

var obj = new myClass();
console.log(obj.name);

//但用 new 调用构造器时,还要注意一个问题,如果构造器显式地返回了一个 object 类型的对象,
//那么此次运算结果最终会返回这个对象,而不是我们之前期待的 this:

// 显示返回一个对象

var myClass2 = function () {
    this.name = 'alihanniba';
    return {
        name: 'R丶G'
    }
}
var obj2 = new myClass2();
console.log(obj2.name);

//如果构造器不显式地返回任何数据,
//或者是返回一个非对象类型的数据,就不会造成上述 问题:

var myClass3 = function () {
    this.name = 'alis';
    return 'R丶G';   //返回string类型
}
var obj3 = new myClass3();
console.log(obj3.name);


// 4. Function.prototype.call 或 Function.prototype.apply 调用
// 跟普通的函数调用相比,用 Function.prototype.call 或 Function.prototype.apply 可以动态地改变传入函数的 this:

var obj4 = {
    name: 'huayi1',
    getName: function () {
        return this.name;
    }
}

var obj5 = {
    name: 'huayi2'
}
console.log(obj4.getName());
console.log(obj4.getName.call(obj5));


/**
 * call 和 apply 方法能很好地体现 JavaScript 的函数式语言特性,
 * 在 JavaScript 中,几乎每一次 编写函数式语言风格的代码,都离不开 call 和 apply。
 * 在 JavaScript 诸多版本的设计模式中,也 用到了 call 和 apply。
 */


// 丢失的this
// 这是一个经常遇到的问题,我们先看下面的代码:

var obj6 = {
    myName: 'hauyi3333',
    getName: function () {
        return this.myName;
    }
}
console.log(obj6.getName());    //hauyi3333

var getName2 = obj6.getName;
console.log(getName2());        //undefined

//当调用 obj.getName 时,getName 方法是作为 obj 对象的属性被调用的,
//此时的 this 指向 obj 对象,所以 obj.getName()输出'sven'。
//当用另外一个变量 getName2 来引用 obj.getName,并且调用 getName2 时,
//此时是普通函数调用方式,this 是指向全局 window 的,所以程序的执行结果是 undefined。
