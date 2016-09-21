//          函数节流

//      JavaScript 中的函数大多数情况下都是由用户主动调用触发的,除非是函数本身的实现不合 理,否则我们一般不会遇到跟性能相关的问题。
//      但在一些少数情况下,函数的触发不是由用户直 接控制的。在这些场景下,函数有可能被非常频繁地调用,而造成大的性能问题。
//      下面将列举一 些这样的场景。
//
//      (1) 函数被频繁调用的场景
//           window.onresize 事件。
//              我们给 window 对象绑定了 resize 事件,当浏览器窗口大小被拖动 而改变的时候,这个事件触发的频率非常之高。
//              如果我们在 window.onresize 事件函数里 有一些跟 DOM 节点相关的操作,而跟 DOM 节点相关的操作往往是非常消耗性能的,
//              这 时候浏览器可能就会吃不消而造成卡顿现象。
//
//           mousemove 事件。
//              同样,如果我们给一个 div 节点绑定了拖曳事件(主要是 mousemove),当 div 节点被拖动的时候,也会频繁地触发该拖曳事件函数。
//
//           上传进度。
//              微云的上传功能使用了公司提供的一个浏览器插件。
//              该浏览器插件在真正开 始上传文件之前,会对文件进行扫描并随时通知 JavaScript 函数,以便在页面中显示当前 的扫描进度。
//              但该插件通知的频率非常之高,大约一秒钟 10 次,很显然我们在页面中不 需要如此频繁地去提示用户。

//      (2) 函数节流的原理
//          我们整理上面提到的三个场景,发现它们面临的共同问题是函数被触发的频率太高。
//          比如我们在 window.onresize 事件中要打印当前的浏览器窗口大小,
//          在我们通过拖曳来改变 窗口大小的时候,打印窗口大小的工作 1 秒钟进行了 10 次。
//          而我们实际上只需要 2 次或者 3 次。 这就需要我们按时间段来忽略掉一些事件请求,比如确保在 500ms 内只打印一次。
//          很显然,我们 可以借助 setTimeout 来完成这件事情。
//
//      (3) 函数节流的代码实现
//          关于函数节流的代码实现有许多种,下面的 throttle 函数的原理是,将即将被执行的函数用 setTimeout 延迟一段时间执行。
//          如果该次延迟执行还没有完成,则忽略接下来调用该函数的请求。
//          throttle 函数接受 2 个参数,第一个参数为需要被延迟执行的函数,第二个参数为延迟执行的时 间。
//          具体实现代码如下:

var throttle = function (fn, interval) {
    var __self = fn,
        timer,
        fristTime = true;
    return function () {
        var args = arguments,
            __me = this;
        if (firstTime) {
            __self.apply(__me, args);
            return firstTime = false;
        }
        if (timer) {
            return false;
        }
        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, setInterval(function () {

        },  || 500);
    }
}
