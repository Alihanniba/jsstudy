/**###########################################################
 * 				透明的单例模式
 ##########################################################*/
//  我们现在的目标是实现一个“透明”的单例类,用户从这个类中创建对象的时候,可以像使 用其他任何普通类一样。
//  在下面的例子中,我们将使用 CreateDiv 单例类,它的作用是负责在页 面中创建唯一的 div 节点,
//  代码如下:

var createDiv = (function () {
    var instance;
    var createDiv = function (html) {
        if (instance) {
            return instance;
        }
        this.html = html;
        this.init();
        return instance = this;
    }
    createDiv.prototype.init = function () {
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }
    return createDiv;
})()

var a = new createDiv('R丶G');
var a = new createDiv('alihanniba');
console.log(a === b);

/**###########################################################
 	 	上面的代码不好
        下面用代理实现单例模式
 ###########################################################*/

var createDiv = function (html) {
    this.html = html;
    this.init();
}
createDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}
//  接下来引入代理类
var proxySingletionCreateDiv = (function () {
    var instance;
    return function (html) {
        if (!instance) {
            instance = new createDiv(html)
        }
        return instance;
    }
})
var a = new proxySingletionCreateDiv('R丶G')
var b = new proxySingletionCreateDiv('alihanniba')
console.log(a === b);
