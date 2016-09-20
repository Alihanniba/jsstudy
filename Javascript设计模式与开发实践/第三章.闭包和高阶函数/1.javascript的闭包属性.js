//  1.变量的作用域
//  变量的作用域,就是指变量的有效范围。我们最常谈到的是在函数中声明的变量作用域。
//  当在函数中声明一个变量的时候,如果该变量前面没有带上关键字 var,这个变量就会成为 全局变量,这当然是一种容易造成命名冲突的做法。
//  另外一种情况是用 var 关键字在函数中声明变量,这时候的变量即是局部变量,只有在该函 数内部才能访问到这个变量,在函数外面是访问不到的。
//  代码如下:

var func1 = function () {
    var a = 1;
    console.log(a);
}
func1();
console.log(a);  //访问不到

//  在 JavaScript 中,函数可以用来创造函数作用域。
//  此时的函数像一层半透明的玻璃,在函数 里面可以看到外面的变量,而在函数外面则无法看到函数里面的变量。
//  这是因为当在函数中搜索一个变量的时候,如果该函数内并没有声明这个变量,那么此次搜索的过程会随着代码执行环境创建的作用域链往外层逐层搜索,一直搜索到全局对象为止。
//  变量的搜索是从内到外而非从外到内的。

//  2.变量的生命周期
//  除了变量的作用域之外,另外一个跟闭包有关的概念是变量的生存周期。
//  对于全局变量来说,全局变量的生存周期当然是永久的,除非我们主动销毁这个全局变量。
//  而对于在函数内用 var 关键字声明的局部变量来说,当退出函数时,这些局部变量即失去了 它们的价值,它们都会随着函数调用的结束而被销毁:

var func2 = function () {
    var a = 1;      //退出函数后局部变量a将被销毁
    console.log(a);
}
func2();

//  现在看看下面这段代码:
var func3 = function () {
    var a = 1;
    return function () {
        a++;
        console.log(a);
    }
}
var f = func3();
f();
f();
f();
f();

//  跟我们之前的推论相反,当退出函数后,局部变量 a 并没有消失,而是似乎一直在某个地方 存活着。
//  这是因为当执行 var f = func();时,f 返回了一个匿名函数的引用,它可以访问到 func() 被调用时产生的环境,
//  而局部变量 a 一直处在这个环境里。
//  既然局部变量所在的环境还能被外界 访问,这个局部变量就有了不被销毁的理由。
//  在这里产生了一个闭包结构,局部变量的生命看起 来被延续了。
//
//  如果直接调用func3()无效

//  3.闭包的更多作用
//      1.封装变量
//          闭包可以帮助把一些不需要暴露在全局的变量封装成“私有变量”。假设有一个计算乘积的简单函数:

            var mult1 = function () {
                var a = 1;
                for (var i = 0, l = arguments.length; i < l; i++) {
                    a = a * arguments[i];
                }
                return a;
            }

//          mult 函数接受一些 number 类型的参数,并返回这些参数的乘积。
//          现在我们觉得对于那些相同 的参数来说,每次都进行计算是一种浪费,我们可以加入缓存机制来提高这个函数的性能:

            var mult2 = (function () {
                var cache = {};
                return function () {
                    var args = Array.prototype.join.call(arguments, ',');
                    if (cache[args]) {
                        return cache[args];
                    }
                    var a = 1;
                    for (var i = 0, l = arguments.length; i < l; i++) {
                        a = a * arguments[i];
                    }
                    return cache[args] = a;
                }
            })();
            console.log(mult2(3,4));
            console.log(mult2(3,4,6));

//      2. 延续局部变量的寿命
//          img 对象经常用于进行数据上报,如下所示:
            var report = function (src) {
                var img = new Image();
                img.src = src;
            }
            report('xxxxxxxx');

//          但是通过查询后台的记录我们得知,因为一些低版本浏览器的实现存在 bug,
//          在这些浏览器 下使用 report 函数进行数据上报会丢失 30%左右的数据,
//          也就是说,report 函数并不是每一次 都成功发起了 HTTP 请求。
//          丢失数据的原因是 img 是 report 函数中的局部变量,当 report 函数的 调用结束后,img 局部变量随即被销毁,
//          而此时或许还没来得及发出 HTTP 请求,所以此次请求 就会丢失掉。

//          现在我们把 img 变量用闭包封闭起来,便能解决请求丢失的问题:
            var report = (function() {
                var imgs = [];
                return function (src) {
                    var img = new Image();
                    imgs.push(img);
                    img.src = src;
                }
            })();
