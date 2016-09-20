//假设我们要编写一个地图应用,现在有两家可选的地图 API 提供商供我们接入自己的应用。
//目前我们选择的是谷歌地图,谷歌地图的 API 中提供了 show 方法,负责在页面上展示整个地图。
//示例代码如下:
var googleMap = {
    show: function() {
        console.log('第一个例子:开始渲染googleMap');
    }
}

var renderMap = function () {
    googleMap.show();
}

renderMap();

//后来因为某些原因,要把谷歌地图换成百度地图,
//为了让 renderMap 函数保持一定的弹性, 我们用一些条件分支来让 renderMap 函数同时支持谷歌地图和百度地图:

var googleMap = {
    show: function () {
        console.log('第二个例子:开始渲染googleMap');
    }
}

var baiduMap = {
    show: function () {
        console.log('第二个例子:开始渲染baidu');
    }
}

var renderMap = function (type) {
    if (type === 'google') {
        googleMap.show()
    } else if (type === 'baidu') {
        baiduMap.show()
    }
}

renderMap('google')
renderMap('baidu')

// 可以看到,虽然 renderMap 函数目前保持了一定的弹性,但这种弹性是很脆弱的,
// 一旦需要 替换成搜搜地图,那无疑必须得改动 renderMap 函数,继续往里面堆砌条件分支语句。
//  我们还是先把程序中相同的部分抽象出来,那就是显示某个地图:

var renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show()
    }
}

renderMap(googleMap)
renderMap(baiduMap)

//现在来找找这段代码中的多态性。
//当我们向谷歌地图对象和百度地图对象分别发出“展示地 图”的消息时,会分别调用它们的 show 方法,就会产生各自不同的执行结果。
//对象的多态性提 示我们,“做什么”和“怎么去做”是可以分开的,即使以后增加了搜搜地图,renderMap 函数仍 然不需要做任何改变,
//如下所示:

var sosoMap = {
    show: function() {
        console.log('第三个例子:开始渲染sosoMap');
    }
}

renderMap(sosoMap)
