//原型模式不单是一种设计模式,也被称为一种编程泛型。

//使用克隆的原型模式

/**
 * 假设我们在编写一个飞机大战的网页游戏。某种飞机拥有分身技能,当它使用分身技能的时 候,要在页面中创建一些跟它一模一样的飞机。如果不使用原型模式,那么在创建分身之前,无 疑必须先保存该飞机的当前血量、炮弹等级、防御等级等信息,随后将这些信息设置到新创建的 飞机上面,这样才能得到一架一模一样的新飞机。
  如果使用原型模式,我们只需要调用负责克隆的方法,便能完成同样的功能。
原型模式的实现关键,是语言本身是否提供了 clone 方法。ECMAScript 5 提供了 Object.create 方法,可以用来克隆对象。代码如下:
 */

var Plane = function () {
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
}
var plane = new Plane();
plane.blood = 500;
plane.sttackLevel = 10;
plane.defenseLevel = 300;




Object.create = Object.create || function (obj) {
    var F = function () {}
    F.prototype = obj;
    return new F();
}

var clonePlane = Object.create(plane);
console.log(clonePlane);

/**
 * 所有的数据都是对象。
 * 要得到一个对象,不是通过实例化类,而是找到一个对象作为原型并克隆它
 * 对象会记住它的原型
 * 如果对象无法响应某个请求,它会把这个请求委托给它自己的原型
 */
