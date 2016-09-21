//          4. 分时函数
//    在前面关于函数节流的讨论中,我们提供了一种限制函数被频繁调用的解决方案。
//    下面我们 将遇到另外一个问题,某些函数确实是用户主动调用的,但因为一些客观的原因,这些函数会严重地影响页面性能。
//    一个例子是创建 WebQQ 的 QQ 好友列表。
//    列表中通常会有成百上千个好友,如果一个好友 用一个节点来表示,
//    当我们在页面中渲染这个列表的时候,可能要一次性往页面中创建成百上千个节点。

//      解决方案之一是下面的 timeChunk 函数,timeChunk 函数让创建节点的工作分批进行,
//      比如把 1 秒钟创建 1000 个节点,改为每隔 200 毫秒创建 8 个节点。
//      timeChunk 函数接受 3 个参数,第 1 个参数是创建节点时需要用到的数据,
//      第 2 个参数是封装了创建节点逻辑的函数,第 3 个参数表示每一批创建的节点数量。
//      代码如下:

var timeChunk = function (ary, fn, count) {
    var obj,t;
    var len = ary.length;
    var start = function () {
        for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
            var obj = ary.shift();
            fn(obj);
        }
    }
    return function () {
        t = setInterval(function () {
            if (ary.length === 0) {                 //  如果全部节点都已经被创建好
                return clearInterval(t);
            }
            start()
        }, 200);                                    //分批执行的时间间隔,也可以用参数的形式传入
    }
}

//         最后我们进行一些小测试,假设我们有 1000 个好友的数据,我们利用 timeChunk 函数,每一 批只往页面中创建 8 个节点:

var ary = [];
for (var i = 0; i <= 1000; i++) {
    ary.push(i);
}

var renderFriendList = timeChunk(ary, function (n) {
    var div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
}, 8);
renderFriendList();
