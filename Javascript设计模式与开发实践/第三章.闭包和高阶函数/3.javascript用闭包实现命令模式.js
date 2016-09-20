//在完成闭包实现的命令模式之前,我们先用面向对象的方式来编写一段命令模式的代码。
//虽 然还没有进入设计模式的学习,但这个作为演示作用的命令模式结构非常简单,不会对我们的理 解造成困难,

//代码如下:

var Tv = {
    open: function () {
        console.log('open tv');
    },
    close: function () {
        console.log('close tv');
    }
}

var OpenTvCommand = function (receiver) {
    this.receiver = receiver;
}

OpenTvCommand.prototype.execute = function () {
    this.receiver.open();       //执行命令,打开电视机
}

OpenTvCommand.prototype.undo = function () {
    this.receiver.close();      //撤销命令,关闭电视机
}

var setCommand = function (command) {
    command.execute();
}

setCommand(new OpenTvCommand(Tv))


//  命令模式的意图是把请求封装为对象,从而分离请求的发起者和请求的接收者(执行者)之 间的耦合关系。
//  在命令被执行之前,可以预先往命令对象中植入命令的接收者。
//  但在 JavaScript 中,函数作为一等对象,本身就可以四处传递,用函数对象而不是普通对象 来封装请求显得更加简单和自然。
//  如果需要往函数对象中预先植入命令的接收者,那么闭包可以 完成这个工作。
//  在面向对象版本的命令模式中,预先植入的命令接收者被当成对象的属性保存起 来;
//  而在闭包版本的命令模式中,命令接收者会被封闭在闭包形成的环境中,

//  代码如下:

var Tv = {
    open: function() {
        console.log('open tv');
    },
    close: function () {
        console.log('close tv');
    }
}

var createCommand = function (receiver) {
    var execute = function () {
        return receiver.open();
    }
    var undo = function () {
        return receiver.close()
    }
    return {
        execute: execute,
        undo: undo
    }
}

var setCommand = function (command) {
    command.execute();
}

setCommand(createCommand(Tv));
