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
