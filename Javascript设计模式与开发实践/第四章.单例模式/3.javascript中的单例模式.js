/**
 *  ###单例模式的核心是确保只有一个实例,并提供全局访问
 */

//  作为普通的开发者,我们有必要尽减少全局变量的使用,即时需要,也要把它的污染降到最低。
//  以下几种方式可以相对降低全局变量带来的命名污染。

//    1, 使用命名空间
//      最简单的方法是使用对象字面量的方式:
        var namespace1 = {
            a: function() {
                alert(1);
            },
            b: function() {
                alert(2);
            }
        };

//      把a 和 b 都定义为namespace1的属性,这样可以减少变量和全局作用域打交道的机会.
//      另外还可以动态的创建命名空间
        var MyApp = {};
        MyApp.namespace = function(name) {
            var parts = name.split('.');
            var current = MyApp;
            for (variinparts) {
                if (!current[parts[i]]) {
                    current[parts[i]] = {};
                }
                current = current[parts[i]];
            }
        }


        MyApp.namespace('event');
        MyApp.namespace('dom.style');
        console.dir(MyApp);

//  上面代码等价于
        var MyApp = {
            event: {},
            dom: {
                style: {}
            }
        };


//         2.使用闭包封装私有变量
        //  这种方法把一些变量封装在闭包的内部,只暴露一些接口跟外界通信:
        var user = (function() {
            var __name = 'sven',
                __age = 29;
            return {
                getUserInfo: function() {
                    return __name + '-' + __age;
                }
            }
        })();

        //  我们用下划线来约定私有变量__name和__age,它们被封装在闭包产生的作用域中,
        //  外部是访问不到这两个变量的,这就避免了对全局的污染.
    
