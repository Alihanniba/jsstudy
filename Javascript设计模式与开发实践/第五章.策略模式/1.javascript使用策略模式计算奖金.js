//          1.使用策略模式计算奖金
//          很多公司的年终奖是根据员工基数和年底绩效情况来发放的.
//          例如,绩效为S的人年终奖为4倍公司,绩效为A的人年终奖有3倍工资,
//          而绩效为B的人年终奖是2倍工资.假设财务部要求我们提供一段代码,
//          来方便他们计算员工的年终奖.
//              1. 最初的代码实现
//          我们可以编写一个calculateBonus的函数来计算每个人的奖金数额.很显然,calculateBonus函数要正确工作,
//          就需要接受两个参数:员工的工资数额和他的绩效考核等级.
//          代码如下:

    var calculateBonus = function(performanceLevel, salary) {
        if (performanceLevel === 'S') {
            return salary * 4;
        }
        if (performanceLevel === 'A') {
            return salary * 3;
        }
        if (performanceLevel === 'B') {
            return salary * 2;
        }
    };
    calculateBonus('B', 20000); //    40000
    calculateBonus('S', 6000); //    24000

//          代码简单,但是存在明显的缺点,接下来用策略模式重构


var performanceS = function() {};
performanceS.prototype.calculate = function (salary) {
    return salary * 4;
};

var performanceA = function() {};
performanceA.prototype.calculate = function (salary) {
    return salary * 3;
};

var performanceB = function() {};
performanceB.prototype.calculate = function (salary) {
    return salary * 2;
};
