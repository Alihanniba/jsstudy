//      在 Web 开发中,因为浏览器之间的实现差异,一些嗅探工作总是不可避免。
//      比如我们需要一个在各个浏览器中能够通用的事件绑定函数 addEvent,常见的写法如下:

var addEvent = function (elem, type, handler) {
    if (window.addEventListener) {
        return elem.addEventListener(type, handler, false);
    }
    if (window.attachEvent) {
        return elem.attachEvent('on' + type, handler);
    }
}

//      这个函数的缺点是,当它每次被调用的时候都会执行里面的 if 条件分支,
//      虽然执行这些 if分支的开销不算大,但也许有一些方法可以让程序避免这些重复的执行过程。
//      第二种方案是这样,我们把嗅探浏览器的操作提前到代码加载的时候,在代码加载的时候就立刻进行一次判断,
//      以便让 addEvent 返回一个包裹了正确逻辑的函数。
//      代码如下:

var addEvent = (function () {
    if (window.addEventListener) {
        return function (elem, type, handler) {
            elem.addEventListener(type, handler, false);
        }
    }
    if (window.attachEvent) {
        return function (elem, type, handler) {
            elem.attachEvent('on' + type, handler);
        }
    }
})();

//      目前的 addEvent 函数依然有个缺点,也许我们从头到尾都没有使用过 addEvent 函数,
//      这样看来,前一次的浏览器嗅探就是完全多余的操作,而且这也会稍稍延长页面 ready 的时间。

//      第三种方案即是我们将要讨论的惰性载入函数方案。
//      此时 addEvent 依然被声明为一个普通函 数,在函数里依然有一些分支判断。
//      但是在第一次进入条件分支之后,在函数内部会重写这个函 数,重写之后的函数就是我们期望的 addEvent 函数,
//      在下一次进入 addEvent 函数的时候,addEvent 函数里不再存在条件分支语句:

var addEvent = function (elem, type, handler) {
    if (window.addEventListener) {
        addEvent = function (elem, type, handler) {
            elem.addEventListener(type, handler, false);
        }
    } else if (window.attachEvent) {
        addEvent = function (elem, type, handler) {
            elem.attachEvent('on' + type, handler);
        }
    }
    addEvent(elem, type, handler);
}

addEvent( div, 'click', function(){
     console.log(1);
});
