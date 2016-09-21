//  ###############################
//          单例模式
//          单例模式的定义是:保证一个类仅有一个实例,并提供一个访问它的全局访问点.
//  #################################

//      单例模式是一种常用的模式,有一些对象我们往往只需要一个,比如线程池、全局缓存、浏 览器中的 window 对象等。
//      在 JavaScript 开发中,单例模式的用途同样非常广泛。
//      试想一下,当我 们单击登录按钮的时候,页面中会出现一个登录浮窗,而这个登录浮窗是唯一的,无论单击多少 次登录按钮,
//      这个浮窗都只会被创建一次,那么这个登录浮窗就适合用单例模式来创建。
//

var singLeTon = function (name) {
    this.name = name;
    this.instance = null;
}

singLeTon.prototype.getName = function () {
    console.log(this.name);
}

singLeTon.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new singLeTon(name);
    }
    return this.instance;
}b
var a = singLeTon.getInstance('R丶G');
var b = singLeTon.getInstance('alihanniba');
console.log(a === b);
