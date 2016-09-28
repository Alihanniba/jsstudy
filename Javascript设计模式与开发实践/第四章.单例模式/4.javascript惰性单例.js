//      惰性单例是指在需要的时候才创建对象实例.
//      惰性单例是单例模式的重点,这种技术在实际开发中非常有用,有用的程度超出了我们的想象.

Singleton.getInstance = (function() {
    var instance = null;
    return function(name) {
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})();

//      不过这是基于类的单例模式,前面说过,基于类的单例模式在javascript中并不适用
//      在getSinge函数中,实际上也提到了闭包和高阶函数的概念.
//      单例模式是一种简单但非常实用的模式,特别是惰性单例模式,
//      在合适的时候才创建对象,并且只创建唯一的一个.
//      更奇妙的是,创建对象和管理单例的职责被分布字啊两个不同的方法中,
//      这两个方法组合起来才具有单例模式的威力.
