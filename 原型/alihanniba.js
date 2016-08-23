var _ = {};
var ArrayProto = Array.prototype,
    ObjectProto = Object.prototype,
    FunctionProto = Function.prototype;

var _slice = ArrayProto.slice,
    _toString = ObjectProto.toString,
    _hasOwnProperty = ObjectProto.hasOwnProperty;

var nativeIsArrry = Array.isArray(),
    nativeBind = FunctionProto.bind();

/**
 * [description]判断数组
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
_.isArray = nativeIsArrry || function(obj) {
    return _toString.call(obj) === '[object array]';
}

/**
 * [isObject description]判断对象
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
_.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

/**
 * [description]判断其他类型
 * @param  {[type]} type) {               _['is' + type] [description]
 * @return {[type]}       [description]
 */
_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(type) {
    _['is' + type] = function(obj) {
        return _toString.call(obj) === '[object ' + name + ']';
    }
})