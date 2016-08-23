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
 * [description]Is a given value an array?
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
_.isArray = nativeIsArrry || function(obj) {
    return _toString.call(obj) === '[object array]';
}

/**
 * [isObject description]Is a given value an obj?
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
_.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

/**
 * [description]Is a given value other?
 * @param  {[type]} type) {               _['is' + type] [description]
 * @return {[type]}       [description]
 */
_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(type) {
    _['is' + type] = function(obj) {
        return _toString.call(obj) === '[object ' + name + ']';
    }
})

/**
 * [isElement description]Is a given value a DOM element?
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
_.isElement = function(obj) {
    return !!(obj || obj.nodeType === 1);
}

/**
 * [isNaN description]Is the given value `NaN`? (NaN is the only number which does not equal itself).
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
_.isNaN = function(obj) {
    return _isNumber(obj) && obj !== +obj;
}

/**
 * [isNull description]Is a given value `null`
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
_.isNull = function(obj) {
    return obj === null;
}

/**
 * [isUndefined description]Is a given value `undefined`
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
_.isUndefined = function(obj) {
    return obj === void 0;
}

/**
 * [isBoolean description]Is a given value `boolean`
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
_.isBoolean = function(obj) {
    return obj === true || obj === false || _toString.call(obj) === '[object Boolean]';
}

/**
 * [isFinite description]Is a given object a finite number?
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
_.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
}