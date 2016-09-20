//1.所有的数据都是对象

/**
 * 事实上,JavaScript 中的根对象是 Object.prototype 对象。
 * Object.prototype 对象是一个空的 对象。
 * 我们在 JavaScript 遇到的每个对象,实际上都是从 Object.prototype 对象克隆而来的, Object.prototype 对象就是它们的原型。
 * 比如下面的 obj1 对象和 obj2 对象:
 */

var obj1 = new Object();
var obj2 = {};

console.log(Object.getPrototypeOf(obj1) === Object.prototype);
console.log(Object.getPrototypeOf(obj2) === Object.prototype);

//2.要得到一个对象,不是通过实例化类,而是找到一个对象作为原型并克隆它

/**
 * 但在 JavaScript 语言里,我们并不需要关心克隆的细节,因为这是引擎内部负责实现的。
 * 我们所需要做的只是显式地调用 var obj1 = new Object()或者 var obj2 = {}。
 * 此时,引擎内部会从 Object.prototype 上面克隆一个对象出来,我们最终得到的就是这个对象。
 */

//Person作为函数构造器
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
}

var a = new Person('alihanniba');
console.log(a.name);
console.log(a.getName());
console.log(Object.getPrototypeOf(a) === Person.prototype);


var objectFactory = function () {
    var obj = new Object(),             //从Object.prototype上克隆一个对象
        Constructor = [].shift.call(arguments);     //取得外部传入的构造器,此例是Person

    obj.__proto__ = Constructor.prototype;          //指向正确的原型
    var ret = Constructor.apply(obj, arguments);    //借用外部传入的构造器给obj设置属性
    return typeof ret === 'object' ? ret : obj;     //确保构造器总是返回一个对象
}

var b = objectFactory(Person, 'R丶G');
console.log(b.name);
console.log(b.getName());
console.log(Object.getPrototypeOf(b) === Person.prototype);


//3. 对象会记住它的原型

/**
 * JavaScript 给对象提供了一个名为__proto__的隐藏属性,
 * 某个对象的__proto__属性默认会指 向它的构造器的原型对象,即{Constructor}.prototype。
 * 在一些浏览器中,__proto__被公开出来, 我们可以在 Chrome 或者 Firefox 上用这段代码来验证:
 */

var a = new Object();
console.log ( a.__proto__ === Object.prototype ); // 输出:true



//4. 如果对象无法响应某个请求,它会把这个请求委托给它的构造器的原型

//这条规则即是原型继承的精髓所在


/**
 * 另外,ECMAScript 6 带来了新的 Class 语法。
 * 这让 JavaScript 看起来像是一门基于类的语言, 但其背后仍是通过原型机制来创建对象。
 * 通过 Class 创建对象的一段简单示例代码1如下所示 :
 */

class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

class Dog extends Animal{
    constructor(name) {
        super(name);
    }
    speak() {
        return 'woof';
    }
}

var dog = new Dog('Scamp');
console.log(dog.getName() + 'says' + dog.speak());
