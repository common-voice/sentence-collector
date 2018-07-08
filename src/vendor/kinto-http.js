(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.KintoClient = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":22}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":23}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":24}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":25}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":26}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":27}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":28}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":29}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":30}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":31}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _promise = require("../core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};
},{"../core-js/promise":8}],12:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":6}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
},{"../core-js/object/define-property":6}],15:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
},{"../core-js/object/assign":4}],16:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":5,"../core-js/object/set-prototype-of":7,"../helpers/typeof":20}],17:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":20}],18:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/get-iterator":2,"../core-js/is-iterable":3}],19:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  return Array.isArray(arr) ? arr : (0, _from2.default)(arr);
};
},{"../core-js/array/from":1}],20:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":9,"../core-js/symbol/iterator":10}],21:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":124}],22:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":39,"../../modules/es6.array.from":108,"../../modules/es6.string.iterator":116}],23:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/core.get-iterator":106,"../modules/es6.string.iterator":116,"../modules/web.dom.iterable":122}],24:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/core.is-iterable":107,"../modules/es6.string.iterator":116,"../modules/web.dom.iterable":122}],25:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":39,"../../modules/es6.object.assign":110}],26:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};

},{"../../modules/_core":39,"../../modules/es6.object.create":111}],27:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":39,"../../modules/es6.object.define-property":112}],28:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;

},{"../../modules/_core":39,"../../modules/es6.object.set-prototype-of":113}],29:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/_core":39,"../modules/es6.object.to-string":114,"../modules/es6.promise":115,"../modules/es6.string.iterator":116,"../modules/es7.promise.finally":118,"../modules/es7.promise.try":119,"../modules/web.dom.iterable":122}],30:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":39,"../../modules/es6.object.to-string":114,"../../modules/es6.symbol":117,"../../modules/es7.symbol.async-iterator":120,"../../modules/es7.symbol.observable":121}],31:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/_wks-ext":103,"../../modules/es6.string.iterator":116,"../../modules/web.dom.iterable":122}],32:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],33:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],34:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],35:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":59}],36:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":95,"./_to-iobject":97,"./_to-length":98}],37:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":38,"./_wks":104}],38:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],39:[function(require,module,exports){
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],40:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":72,"./_property-desc":84}],41:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":32}],42:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],43:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":48}],44:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":50,"./_is-object":59}],45:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],46:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":77,"./_object-keys":80,"./_object-pie":81}],47:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":39,"./_ctx":41,"./_global":50,"./_hide":52}],48:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],49:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":35,"./_ctx":41,"./_is-array-iter":57,"./_iter-call":60,"./_to-length":98,"./core.get-iterator-method":105}],50:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],51:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],52:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":43,"./_object-dp":72,"./_property-desc":84}],53:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":50}],54:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":43,"./_dom-create":44,"./_fails":48}],55:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],56:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":38}],57:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":65,"./_wks":104}],58:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":38}],59:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],60:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":35}],61:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":52,"./_object-create":71,"./_property-desc":84,"./_set-to-string-tag":89,"./_wks":104}],62:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":47,"./_has":51,"./_hide":52,"./_iter-create":61,"./_iterators":65,"./_library":66,"./_object-gpo":78,"./_redefine":86,"./_set-to-string-tag":89,"./_wks":104}],63:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":104}],64:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],65:[function(require,module,exports){
module.exports = {};

},{}],66:[function(require,module,exports){
module.exports = true;

},{}],67:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":48,"./_has":51,"./_is-object":59,"./_object-dp":72,"./_uid":101}],68:[function(require,module,exports){
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_cof":38,"./_global":50,"./_task":94}],69:[function(require,module,exports){
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":32}],70:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":48,"./_iobject":56,"./_object-gops":77,"./_object-keys":80,"./_object-pie":81,"./_to-object":99}],71:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":35,"./_dom-create":44,"./_enum-bug-keys":45,"./_html":53,"./_object-dps":73,"./_shared-key":90}],72:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":35,"./_descriptors":43,"./_ie8-dom-define":54,"./_to-primitive":100}],73:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":35,"./_descriptors":43,"./_object-dp":72,"./_object-keys":80}],74:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":43,"./_has":51,"./_ie8-dom-define":54,"./_object-pie":81,"./_property-desc":84,"./_to-iobject":97,"./_to-primitive":100}],75:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":76,"./_to-iobject":97}],76:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":45,"./_object-keys-internal":79}],77:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],78:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":51,"./_shared-key":90,"./_to-object":99}],79:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":36,"./_has":51,"./_shared-key":90,"./_to-iobject":97}],80:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":45,"./_object-keys-internal":79}],81:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],82:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],83:[function(require,module,exports){
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":35,"./_is-object":59,"./_new-promise-capability":69}],84:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],85:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":52}],86:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":52}],87:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_an-object":35,"./_ctx":41,"./_is-object":59,"./_object-gopd":74}],88:[function(require,module,exports){
'use strict';
var global = require('./_global');
var core = require('./_core');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_core":39,"./_descriptors":43,"./_global":50,"./_object-dp":72,"./_wks":104}],89:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":51,"./_object-dp":72,"./_wks":104}],90:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":91,"./_uid":101}],91:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":50}],92:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":32,"./_an-object":35,"./_wks":104}],93:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":42,"./_to-integer":96}],94:[function(require,module,exports){
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_cof":38,"./_ctx":41,"./_dom-create":44,"./_global":50,"./_html":53,"./_invoke":55}],95:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":96}],96:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],97:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":42,"./_iobject":56}],98:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":96}],99:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":42}],100:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":59}],101:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],102:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":39,"./_global":50,"./_library":66,"./_object-dp":72,"./_wks-ext":103}],103:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":104}],104:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":50,"./_shared":91,"./_uid":101}],105:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":37,"./_core":39,"./_iterators":65,"./_wks":104}],106:[function(require,module,exports){
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":35,"./_core":39,"./core.get-iterator-method":105}],107:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"./_classof":37,"./_core":39,"./_iterators":65,"./_wks":104}],108:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":40,"./_ctx":41,"./_export":47,"./_is-array-iter":57,"./_iter-call":60,"./_iter-detect":63,"./_to-length":98,"./_to-object":99,"./core.get-iterator-method":105}],109:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":33,"./_iter-define":62,"./_iter-step":64,"./_iterators":65,"./_to-iobject":97}],110:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":47,"./_object-assign":70}],111:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":47,"./_object-create":71}],112:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":43,"./_export":47,"./_object-dp":72}],113:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":47,"./_set-proto":87}],114:[function(require,module,exports){

},{}],115:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_a-function":32,"./_an-instance":34,"./_classof":37,"./_core":39,"./_ctx":41,"./_export":47,"./_for-of":49,"./_global":50,"./_is-object":59,"./_iter-detect":63,"./_library":66,"./_microtask":68,"./_new-promise-capability":69,"./_perform":82,"./_promise-resolve":83,"./_redefine-all":85,"./_set-species":88,"./_set-to-string-tag":89,"./_species-constructor":92,"./_task":94,"./_wks":104}],116:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":62,"./_string-at":93}],117:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":35,"./_descriptors":43,"./_enum-keys":46,"./_export":47,"./_fails":48,"./_global":50,"./_has":51,"./_hide":52,"./_is-array":58,"./_is-object":59,"./_library":66,"./_meta":67,"./_object-create":71,"./_object-dp":72,"./_object-gopd":74,"./_object-gopn":76,"./_object-gopn-ext":75,"./_object-gops":77,"./_object-keys":80,"./_object-pie":81,"./_property-desc":84,"./_redefine":86,"./_set-to-string-tag":89,"./_shared":91,"./_to-iobject":97,"./_to-primitive":100,"./_uid":101,"./_wks":104,"./_wks-define":102,"./_wks-ext":103}],118:[function(require,module,exports){
// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_core":39,"./_export":47,"./_global":50,"./_promise-resolve":83,"./_species-constructor":92}],119:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":47,"./_new-promise-capability":69,"./_perform":82}],120:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":102}],121:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":102}],122:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":50,"./_hide":52,"./_iterators":65,"./_wks":104,"./es6.array.iterator":109}],123:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;

  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === 'function')
      ret = [evlistener.listener || evlistener];
    else
      ret = unwrapListeners(evlistener);
  }

  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],124:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":125}],125:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);

},{}],126:[function(require,module,exports){
var v1 = require('./v1');
var v4 = require('./v4');

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;

},{"./v1":129,"./v4":130}],127:[function(require,module,exports){
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;

},{}],128:[function(require,module,exports){
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

},{}],129:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;

},{"./lib/bytesToUuid":127,"./lib/rng":128}],130:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

},{"./lib/bytesToUuid":127,"./lib/rng":128}],131:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SUPPORTED_PROTOCOL_VERSION = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _desc, _value, _class;

var _utils = require("./utils");

var _http = require("./http");

var _http2 = _interopRequireDefault(_http);

var _endpoint = require("./endpoint");

var _endpoint2 = _interopRequireDefault(_endpoint);

var _requests = require("./requests");

var requests = _interopRequireWildcard(_requests);

var _batch = require("./batch");

var _bucket = require("./bucket");

var _bucket2 = _interopRequireDefault(_bucket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * Currently supported protocol version.
 * @type {String}
 */
var SUPPORTED_PROTOCOL_VERSION = exports.SUPPORTED_PROTOCOL_VERSION = "v1";

/**
 * High level HTTP client for the Kinto API.
 *
 * @example
 * const client = new KintoClient("https://kinto.dev.mozaws.net/v1");
 * client.bucket("default")
 *    .collection("my-blog")
 *    .createRecord({title: "First article"})
 *   .then(console.log.bind(console))
 *   .catch(console.error.bind(console));
 */
var KintoClientBase = (_dec = (0, _utils.nobatch)("This operation is not supported within a batch operation."), _dec2 = (0, _utils.nobatch)("This operation is not supported within a batch operation."), _dec3 = (0, _utils.nobatch)("This operation is not supported within a batch operation."), _dec4 = (0, _utils.nobatch)("This operation is not supported within a batch operation."), _dec5 = (0, _utils.nobatch)("Can't use batch within a batch!"), _dec6 = (0, _utils.capable)(["permissions_endpoint"]), _dec7 = (0, _utils.support)("1.4", "2.0"), (_class = function () {
  /**
   * Constructor.
   *
   * @param  {String}       remote  The remote URL.
   * @param  {Object}       [options={}]                  The options object.
   * @param  {Boolean}      [options.safe=true]           Adds concurrency headers to every requests.
   * @param  {EventEmitter} [options.events=EventEmitter] The events handler instance.
   * @param  {Object}       [options.headers={}]          The key-value headers to pass to each request.
   * @param  {Object}       [options.retry=0]             Number of retries when request fails (default: 0)
   * @param  {String}       [options.bucket="default"]    The default bucket to use.
   * @param  {String}       [options.requestMode="cors"]  The HTTP request mode (from ES6 fetch spec).
   * @param  {Number}       [options.timeout=null]        The request timeout in ms, if any.
   */
  function KintoClientBase(remote) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, KintoClientBase);

    if (typeof remote !== "string" || !remote.length) {
      throw new Error("Invalid remote URL: " + remote);
    }
    if (remote[remote.length - 1] === "/") {
      remote = remote.slice(0, -1);
    }
    this._backoffReleaseTime = null;

    this._requests = [];
    this._isBatch = !!options.batch;
    this._retry = options.retry || 0;
    this._safe = !!options.safe;
    this._headers = options.headers || {};

    // public properties
    /**
     * The remote server base URL.
     * @type {String}
     */
    this.remote = remote;
    /**
     * Current server information.
     * @ignore
     * @type {Object|null}
     */
    this.serverInfo = null;
    /**
     * The event emitter instance. Should comply with the `EventEmitter`
     * interface.
     * @ignore
     * @type {Class}
     */
    this.events = options.events;

    var requestMode = options.requestMode,
        timeout = options.timeout;
    /**
     * The HTTP instance.
     * @ignore
     * @type {HTTP}
     */

    this.http = new _http2.default(this.events, { requestMode: requestMode, timeout: timeout });
    this._registerHTTPEvents();
  }

  /**
   * The remote endpoint base URL. Setting the value will also extract and
   * validate the version.
   * @type {String}
   */


  (0, _createClass3.default)(KintoClientBase, [{
    key: "_registerHTTPEvents",


    /**
     * Registers HTTP events.
     * @private
     */
    value: function _registerHTTPEvents() {
      var _this = this;

      // Prevent registering event from a batch client instance
      if (!this._isBatch) {
        this.events.on("backoff", function (backoffMs) {
          _this._backoffReleaseTime = backoffMs;
        });
      }
    }

    /**
     * Retrieve a bucket object to perform operations on it.
     *
     * @param  {String}  name              The bucket name.
     * @param  {Object}  [options={}]      The request options.
     * @param  {Boolean} [options.safe]    The resulting safe option.
     * @param  {Number}  [options.retry]   The resulting retry option.
     * @param  {Object}  [options.headers] The extended headers object option.
     * @return {Bucket}
     */

  }, {
    key: "bucket",
    value: function bucket(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return new _bucket2.default(this, name, {
        batch: this._isBatch,
        headers: this._getHeaders(options),
        safe: this._getSafe(options),
        retry: this._getRetry(options)
      });
    }

    /**
     * Set client "headers" for every request, updating previous headers (if any).
     *
     * @param {Object} headers The headers to merge with existing ones.
     */

  }, {
    key: "setHeaders",
    value: function setHeaders(headers) {
      this._headers = (0, _extends3.default)({}, this._headers, headers);
      this.serverInfo = null;
    }

    /**
     * Get the value of "headers" for a given request, merging the
     * per-request headers with our own "default" headers.
     *
     * Note that unlike other options, headers aren't overridden, but
     * merged instead.
     *
     * @private
     * @param {Object} options The options for a request.
     * @returns {Object}
     */

  }, {
    key: "_getHeaders",
    value: function _getHeaders(options) {
      return (0, _extends3.default)({}, this._headers, options.headers);
    }

    /**
     * Get the value of "safe" for a given request, using the
     * per-request option if present or falling back to our default
     * otherwise.
     *
     * @private
     * @param {Object} options The options for a request.
     * @returns {Boolean}
     */

  }, {
    key: "_getSafe",
    value: function _getSafe(options) {
      return (0, _extends3.default)({ safe: this._safe }, options).safe;
    }

    /**
     * As _getSafe, but for "retry".
     *
     * @private
     */

  }, {
    key: "_getRetry",
    value: function _getRetry(options) {
      return (0, _extends3.default)({ retry: this._retry }, options).retry;
    }

    /**
     * Retrieves the server's "hello" endpoint. This endpoint reveals
     * server capabilities and settings as well as telling the client
     * "who they are" according to their given authorization headers.
     *
     * @private
     * @param  {Object}  [options={}] The request options.
     * @param  {Object}  [options.headers={}] Headers to use when making
     *     this request.
     * @param  {Number}  [options.retry=0]    Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "_getHello",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var path, _ref2, json;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                path = this.remote + (0, _endpoint2.default)("root");
                _context.next = 3;
                return this.http.request(path, { headers: this._getHeaders(options) }, { retry: this._getRetry(options) });

              case 3:
                _ref2 = _context.sent;
                json = _ref2.json;
                return _context.abrupt("return", json);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _getHello() {
        return _ref.apply(this, arguments);
      }

      return _getHello;
    }()

    /**
     * Retrieves server information and persist them locally. This operation is
     * usually performed a single time during the instance lifecycle.
     *
     * @param  {Object}  [options={}] The request options.
     * @param  {Number}  [options.retry=0]    Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "fetchServerInfo",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.serverInfo) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", this.serverInfo);

              case 2:
                _context2.next = 4;
                return this._getHello({ retry: this._getRetry(options) });

              case 4:
                this.serverInfo = _context2.sent;
                return _context2.abrupt("return", this.serverInfo);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchServerInfo() {
        return _ref3.apply(this, arguments);
      }

      return fetchServerInfo;
    }()

    /**
     * Retrieves Kinto server settings.
     *
     * @param  {Object}  [options={}] The request options.
     * @param  {Number}  [options.retry=0]    Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "fetchServerSettings",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(options) {
        var _ref5, settings;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.fetchServerInfo(options);

              case 2:
                _ref5 = _context3.sent;
                settings = _ref5.settings;
                return _context3.abrupt("return", settings);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchServerSettings(_x5) {
        return _ref4.apply(this, arguments);
      }

      return fetchServerSettings;
    }()

    /**
     * Retrieve server capabilities information.
     *
     * @param  {Object}  [options={}] The request options.
     * @param  {Number}  [options.retry=0]    Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "fetchServerCapabilities",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _ref7, capabilities;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.fetchServerInfo(options);

              case 2:
                _ref7 = _context4.sent;
                capabilities = _ref7.capabilities;
                return _context4.abrupt("return", capabilities);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchServerCapabilities() {
        return _ref6.apply(this, arguments);
      }

      return fetchServerCapabilities;
    }()

    /**
     * Retrieve authenticated user information.
     *
     * @param  {Object}  [options={}] The request options.
     * @param  {Object}  [options.headers={}] Headers to use when making
     *     this request.
     * @param  {Number}  [options.retry=0]    Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "fetchUser",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _ref9, user;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._getHello(options);

              case 2:
                _ref9 = _context5.sent;
                user = _ref9.user;
                return _context5.abrupt("return", user);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchUser() {
        return _ref8.apply(this, arguments);
      }

      return fetchUser;
    }()

    /**
     * Retrieve authenticated user information.
     *
     * @param  {Object}  [options={}] The request options.
     * @param  {Number}  [options.retry=0]    Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "fetchHTTPApiVersion",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _ref11, http_api_version;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.fetchServerInfo(options);

              case 2:
                _ref11 = _context6.sent;
                http_api_version = _ref11.http_api_version;
                return _context6.abrupt("return", http_api_version);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function fetchHTTPApiVersion() {
        return _ref10.apply(this, arguments);
      }

      return fetchHTTPApiVersion;
    }()

    /**
     * Process batch requests, chunking them according to the batch_max_requests
     * server setting when needed.
     *
     * @param  {Array}  requests     The list of batch subrequests to perform.
     * @param  {Object} [options={}] The options object.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "_batchRequests",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(requests) {
        var _this2 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var headers, serverSettings, maxRequests, chunks, _ref13, responses;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                headers = this._getHeaders(options);

                if (requests.length) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return", []);

              case 3:
                _context7.next = 5;
                return this.fetchServerSettings({
                  retry: this._getRetry(options)
                });

              case 5:
                serverSettings = _context7.sent;
                maxRequests = serverSettings["batch_max_requests"];

                if (!(maxRequests && requests.length > maxRequests)) {
                  _context7.next = 10;
                  break;
                }

                chunks = (0, _utils.partition)(requests, maxRequests);
                return _context7.abrupt("return", (0, _utils.pMap)(chunks, function (chunk) {
                  return _this2._batchRequests(chunk, options);
                }));

              case 10:
                _context7.next = 12;
                return this.execute({
                  // FIXME: is this really necessary, since it's also present in
                  // the "defaults"?
                  headers: headers,
                  path: (0, _endpoint2.default)("batch"),
                  method: "POST",
                  body: {
                    defaults: { headers: headers },
                    requests: requests
                  }
                }, { retry: this._getRetry(options) });

              case 12:
                _ref13 = _context7.sent;
                responses = _ref13.responses;
                return _context7.abrupt("return", responses);

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _batchRequests(_x9) {
        return _ref12.apply(this, arguments);
      }

      return _batchRequests;
    }()

    /**
     * Sends batch requests to the remote server.
     *
     * Note: Reserved for internal use only.
     *
     * @ignore
     * @param  {Function} fn                        The function to use for describing batch ops.
     * @param  {Object}   [options={}]              The options object.
     * @param  {Boolean}  [options.safe]            The safe option.
     * @param  {Number}   [options.retry]           The retry option.
     * @param  {String}   [options.bucket]          The bucket name option.
     * @param  {String}   [options.collection]      The collection name option.
     * @param  {Object}   [options.headers]         The headers object option.
     * @param  {Boolean}  [options.aggregate=false] Produces an aggregated result object.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "batch",
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(fn) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var rootBatch, bucketBatch, collBatch, batchClient, responses;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                rootBatch = new KintoClientBase(this.remote, {
                  events: this.events,
                  batch: true,
                  safe: this._getSafe(options),
                  retry: this._getRetry(options)
                });
                bucketBatch = void 0, collBatch = void 0;

                if (options.bucket) {
                  bucketBatch = rootBatch.bucket(options.bucket);
                  if (options.collection) {
                    collBatch = bucketBatch.collection(options.collection);
                  }
                }
                batchClient = collBatch || bucketBatch || rootBatch;

                fn(batchClient);
                _context8.next = 7;
                return this._batchRequests(rootBatch._requests, options);

              case 7:
                responses = _context8.sent;

                if (!options.aggregate) {
                  _context8.next = 12;
                  break;
                }

                return _context8.abrupt("return", (0, _batch.aggregate)(responses, rootBatch._requests));

              case 12:
                return _context8.abrupt("return", responses);

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function batch(_x11) {
        return _ref14.apply(this, arguments);
      }

      return batch;
    }()

    /**
     * Executes an atomic HTTP request.
     *
     * @private
     * @param  {Object}  request             The request object.
     * @param  {String}  request.path        The path to fetch, relative
     *     to the Kinto server root.
     * @param  {String}  [request.method="GET"] The method to use in the
     *     request.
     * @param  {Body}    [request.body]      The request body.
     * @param  {Object}  [request.headers={}] The request headers.
     * @param  {Object}  [options={}]        The options object.
     * @param  {Boolean} [options.raw=false] If true, resolve with full response
     * @param  {Boolean} [options.stringify=true] If true, serialize body data to
     * @param  {Number}  [options.retry=0]   The number of times to
     *     retry a request if the server responds with Retry-After.
     * JSON.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "execute",
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(request) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _options$raw, raw, _options$stringify, stringify, msg, result;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _options$raw = options.raw, raw = _options$raw === undefined ? false : _options$raw, _options$stringify = options.stringify, stringify = _options$stringify === undefined ? true : _options$stringify;
                // If we're within a batch, add the request to the stack to send at once.

                if (!this._isBatch) {
                  _context9.next = 5;
                  break;
                }

                this._requests.push(request);
                // Resolve with a message in case people attempt at consuming the result
                // from within a batch operation.
                msg = "This result is generated from within a batch " + "operation and should not be consumed.";
                return _context9.abrupt("return", raw ? { json: msg, headers: {
                    get: function get() {}
                  } } : msg);

              case 5:
                _context9.next = 7;
                return this.http.request(this.remote + request.path, (0, _utils.cleanUndefinedProperties)({
                  // Limit requests to only those parts that would be allowed in
                  // a batch request -- don't pass through other fancy fetch()
                  // options like integrity, redirect, mode because they will
                  // break on a batch request.  A batch request only allows
                  // headers, method, path (above), and body.
                  method: request.method,
                  headers: request.headers,
                  body: stringify ? JSON.stringify(request.body) : request.body
                }), { retry: this._getRetry(options) });

              case 7:
                result = _context9.sent;
                return _context9.abrupt("return", raw ? result : result.json);

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function execute(_x13) {
        return _ref15.apply(this, arguments);
      }

      return execute;
    }()

    /**
     * Fetch some pages from a paginated list, following the `next-page`
     * header automatically until we have fetched the requested number
     * of pages. Return a response with a `.next()` method that can be
     * called to fetch more results.
     *
     * @private
     * @param  {String}  path
     *     The path to make the request to.
     * @param  {Object}  params
     *     The parameters to use when making the request.
     * @param  {String}  [params.sort="-last_modified"]
     *     The sorting order to use when fetching.
     * @param  {Object}  [params.filters={}]
     *     The filters to send in the request.
     * @param  {Number}  [params.limit=undefined]
     *     The limit to send in the request. Undefined means no limit.
     * @param  {Number}  [params.pages=undefined]
     *     The number of pages to fetch. Undefined means one page. Pass
     *     Infinity to fetch everything.
     * @param  {String}  [params.since=undefined]
     *     The ETag from which to start fetching.
     * @param  {Object}  [options={}]
     *     Additional request-level parameters to use in all requests.
     * @param  {Object}  [options.headers={}]
     *     Headers to use during all requests.
     * @param  {Number}  [options.retry=0]
     *     Number of times to retry each request if the server responds
     *     with Retry-After.
     */

  }, {
    key: "paginatedList",
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(path, params) {
        var _this3 = this;

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var _sort$params, sort, filters, limit, pages, since, querystring, results, current, next, processNextPage, pageResults, handleResponse;

        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                // FIXME: this is called even in batch requests, which doesn't
                // make any sense (since all batch requests get a "dummy"
                // response; see execute() above).
                _sort$params = (0, _extends3.default)({
                  sort: "-last_modified"
                }, params), sort = _sort$params.sort, filters = _sort$params.filters, limit = _sort$params.limit, pages = _sort$params.pages, since = _sort$params.since;
                // Safety/Consistency check on ETag value.

                if (!(since && typeof since !== "string")) {
                  _context13.next = 3;
                  break;
                }

                throw new Error("Invalid value for since (" + since + "), should be ETag value.");

              case 3:
                querystring = (0, _utils.qsify)((0, _extends3.default)({}, filters, {
                  _sort: sort,
                  _limit: limit,
                  _since: since
                }));
                results = [], current = 0;

                next = function () {
                  var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(nextPage) {
                    return _regenerator2.default.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            if (nextPage) {
                              _context10.next = 2;
                              break;
                            }

                            throw new Error("Pagination exhausted.");

                          case 2:
                            return _context10.abrupt("return", processNextPage(nextPage));

                          case 3:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10, this);
                  }));

                  return function next(_x18) {
                    return _ref17.apply(this, arguments);
                  };
                }();

                processNextPage = function () {
                  var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(nextPage) {
                    var headers;
                    return _regenerator2.default.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            headers = options.headers;
                            _context11.t0 = handleResponse;
                            _context11.next = 4;
                            return _this3.http.request(nextPage, { headers: headers });

                          case 4:
                            _context11.t1 = _context11.sent;
                            return _context11.abrupt("return", (0, _context11.t0)(_context11.t1));

                          case 6:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    }, _callee11, _this3);
                  }));

                  return function processNextPage(_x19) {
                    return _ref18.apply(this, arguments);
                  };
                }();

                pageResults = function pageResults(results, nextPage, etag, totalRecords) {
                  // ETag string is supposed to be opaque and stored «as-is».
                  // ETag header values are quoted (because of * and W/"foo").
                  return {
                    last_modified: etag ? etag.replace(/"/g, "") : etag,
                    data: results,
                    next: next.bind(null, nextPage),
                    hasNextPage: !!nextPage,
                    totalRecords: totalRecords
                  };
                };

                handleResponse = function () {
                  var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(_ref20) {
                    var headers = _ref20.headers,
                        json = _ref20.json;
                    var nextPage, etag, totalRecords;
                    return _regenerator2.default.wrap(function _callee12$(_context12) {
                      while (1) {
                        switch (_context12.prev = _context12.next) {
                          case 0:
                            nextPage = headers.get("Next-Page");
                            etag = headers.get("ETag");
                            totalRecords = parseInt(headers.get("Total-Records"), 10);

                            if (pages) {
                              _context12.next = 5;
                              break;
                            }

                            return _context12.abrupt("return", pageResults(json.data, nextPage, etag, totalRecords));

                          case 5:
                            // Aggregate new results with previous ones
                            results = results.concat(json.data);
                            current += 1;

                            if (!(current >= pages || !nextPage)) {
                              _context12.next = 9;
                              break;
                            }

                            return _context12.abrupt("return", pageResults(results, nextPage, etag, totalRecords));

                          case 9:
                            return _context12.abrupt("return", processNextPage(nextPage));

                          case 10:
                          case "end":
                            return _context12.stop();
                        }
                      }
                    }, _callee12, this);
                  }));

                  return function handleResponse(_x20) {
                    return _ref19.apply(this, arguments);
                  };
                }();

                _context13.t0 = handleResponse;
                _context13.next = 12;
                return this.execute(
                // N.B.: This doesn't use _getHeaders, because all calls to
                // `paginatedList` are assumed to come from calls that already
                // have headers merged at e.g. the bucket or collection level.
                { headers: options.headers, path: path + "?" + querystring },
                // N.B. This doesn't use _getRetry, because all calls to
                // `paginatedList` are assumed to come from calls that already
                // used `_getRetry` at e.g. the bucket or collection level.
                { raw: true, retry: options.retry || 0 });

              case 12:
                _context13.t1 = _context13.sent;
                return _context13.abrupt("return", (0, _context13.t0)(_context13.t1));

              case 14:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function paginatedList(_x15, _x16) {
        return _ref16.apply(this, arguments);
      }

      return paginatedList;
    }()

    /**
     * Lists all permissions.
     *
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers={}] Headers to use when making
     *     this request.
     * @param  {Number} [options.retry=0]    Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object[], Error>}
     */

  }, {
    key: "listPermissions",
    value: function () {
      var _ref21 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var path, paginationOptions;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                path = (0, _endpoint2.default)("permissions");
                // Ensure the default sort parameter is something that exists in permissions
                // entries, as `last_modified` doesn't; here, we pick "id".

                paginationOptions = (0, _extends3.default)({ sort: "id" }, options);
                return _context14.abrupt("return", this.paginatedList(path, paginationOptions, {
                  headers: this._getHeaders(options),
                  retry: this._getRetry(options)
                }));

              case 3:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function listPermissions() {
        return _ref21.apply(this, arguments);
      }

      return listPermissions;
    }()

    /**
     * Retrieves the list of buckets.
     *
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers={}] Headers to use when making
     *     this request.
     * @param  {Number} [options.retry=0]    Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object[], Error>}
     */

  }, {
    key: "listBuckets",
    value: function () {
      var _ref22 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var path;
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                path = (0, _endpoint2.default)("bucket");
                return _context15.abrupt("return", this.paginatedList(path, options, {
                  headers: this._getHeaders(options),
                  retry: this._getRetry(options)
                }));

              case 2:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function listBuckets() {
        return _ref22.apply(this, arguments);
      }

      return listBuckets;
    }()

    /**
     * Creates a new bucket on the server.
     *
     * @param  {String|null}  id                The bucket name (optional).
     * @param  {Object}       [options={}]      The options object.
     * @param  {Boolean}      [options.data]    The bucket data option.
     * @param  {Boolean}      [options.safe]    The safe option.
     * @param  {Object}       [options.headers] The headers object option.
     * @param  {Number}       [options.retry=0] Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "createBucket",
    value: function () {
      var _ref23 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(id) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _options$data, data, permissions, path;

        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _options$data = options.data, data = _options$data === undefined ? {} : _options$data, permissions = options.permissions;

                if (id != null) {
                  data.id = id;
                }
                path = data.id ? (0, _endpoint2.default)("bucket", data.id) : (0, _endpoint2.default)("bucket");
                return _context16.abrupt("return", this.execute(requests.createRequest(path, { data: data, permissions: permissions }, {
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                }), { retry: this._getRetry(options) }));

              case 4:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function createBucket(_x23) {
        return _ref23.apply(this, arguments);
      }

      return createBucket;
    }()

    /**
     * Deletes a bucket from the server.
     *
     * @ignore
     * @param  {Object|String} bucket                  The bucket to delete.
     * @param  {Object}        [options={}]            The options object.
     * @param  {Boolean}       [options.safe]          The safe option.
     * @param  {Object}        [options.headers]       The headers object option.
     * @param  {Number}        [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Number}        [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "deleteBucket",
    value: function () {
      var _ref24 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17(bucket) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var bucketObj, path, _bucketObj$options, last_modified;

        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                bucketObj = (0, _utils.toDataBody)(bucket);

                if (bucketObj.id) {
                  _context17.next = 3;
                  break;
                }

                throw new Error("A bucket id is required.");

              case 3:
                path = (0, _endpoint2.default)("bucket", bucketObj.id);
                _bucketObj$options = (0, _extends3.default)({}, bucketObj, options), last_modified = _bucketObj$options.last_modified;
                return _context17.abrupt("return", this.execute(requests.deleteRequest(path, {
                  last_modified: last_modified,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                }), { retry: this._getRetry(options) }));

              case 6:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function deleteBucket(_x25) {
        return _ref24.apply(this, arguments);
      }

      return deleteBucket;
    }()

    /**
     * Deletes all buckets on the server.
     *
     * @ignore
     * @param  {Object}  [options={}]            The options object.
     * @param  {Boolean} [options.safe]          The safe option.
     * @param  {Object}  [options.headers]       The headers object option.
     * @param  {Number}  [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "deleteBuckets",
    value: function () {
      var _ref25 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var path;
        return _regenerator2.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                path = (0, _endpoint2.default)("bucket");
                return _context18.abrupt("return", this.execute(requests.deleteRequest(path, {
                  last_modified: options.last_modified,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                }), { retry: this._getRetry(options) }));

              case 2:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function deleteBuckets() {
        return _ref25.apply(this, arguments);
      }

      return deleteBuckets;
    }()
  }, {
    key: "remote",
    get: function get() {
      return this._remote;
    }

    /**
     * @ignore
     */
    ,
    set: function set(url) {
      var version = void 0;
      try {
        version = url.match(/\/(v\d+)\/?$/)[1];
      } catch (err) {
        throw new Error("The remote URL must contain the version: " + url);
      }
      if (version !== SUPPORTED_PROTOCOL_VERSION) {
        throw new Error("Unsupported protocol version: " + version);
      }
      this._remote = url;
      this._version = version;
    }

    /**
     * The current server protocol version, eg. `v1`.
     * @type {String}
     */

  }, {
    key: "version",
    get: function get() {
      return this._version;
    }

    /**
     * Backoff remaining time, in milliseconds. Defaults to zero if no backoff is
     * ongoing.
     *
     * @type {Number}
     */

  }, {
    key: "backoff",
    get: function get() {
      var currentTime = new Date().getTime();
      if (this._backoffReleaseTime && currentTime < this._backoffReleaseTime) {
        return this._backoffReleaseTime - currentTime;
      }
      return 0;
    }
  }]);
  return KintoClientBase;
}(), (_applyDecoratedDescriptor(_class.prototype, "fetchServerSettings", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "fetchServerSettings"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "fetchServerCapabilities", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "fetchServerCapabilities"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "fetchUser", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "fetchUser"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "fetchHTTPApiVersion", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "fetchHTTPApiVersion"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "batch", [_dec5], Object.getOwnPropertyDescriptor(_class.prototype, "batch"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "listPermissions", [_dec6], Object.getOwnPropertyDescriptor(_class.prototype, "listPermissions"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deleteBuckets", [_dec7], Object.getOwnPropertyDescriptor(_class.prototype, "deleteBuckets"), _class.prototype)), _class));
exports.default = KintoClientBase;

},{"./batch":132,"./bucket":133,"./endpoint":135,"./http":137,"./requests":139,"./utils":140,"babel-runtime/helpers/asyncToGenerator":11,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/extends":15,"babel-runtime/regenerator":21}],132:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggregate = aggregate;
/**
 * Exports batch responses as a result object.
 *
 * @private
 * @param  {Array} responses The batch subrequest responses.
 * @param  {Array} requests  The initial issued requests.
 * @return {Object}
 */
function aggregate() {
  var responses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var requests = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (responses.length !== requests.length) {
    throw new Error("Responses length should match requests one.");
  }
  var results = {
    errors: [],
    published: [],
    conflicts: [],
    skipped: []
  };
  return responses.reduce(function (acc, response, index) {
    var status = response.status;

    var request = requests[index];
    if (status >= 200 && status < 400) {
      acc.published.push(response.body);
    } else if (status === 404) {
      // Extract the id manually from request path while waiting for Kinto/kinto#818
      var regex = /(buckets|groups|collections|records)\/([^/]+)$/;
      var extracts = request.path.match(regex);
      var id = extracts.length === 3 ? extracts[2] : undefined;
      acc.skipped.push({
        id: id,
        path: request.path,
        error: response.body
      });
    } else if (status === 412) {
      acc.conflicts.push({
        // XXX: specifying the type is probably superfluous
        type: "outgoing",
        local: request.body,
        remote: response.body.details && response.body.details.existing || null
      });
    } else {
      acc.errors.push({
        path: request.path,
        sent: request,
        error: response.body
      });
    }
    return acc;
  }, results);
}

},{}],133:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _dec, _desc, _value, _class;

var _utils = require("./utils");

var _collection = require("./collection");

var _collection2 = _interopRequireDefault(_collection);

var _requests = require("./requests");

var requests = _interopRequireWildcard(_requests);

var _endpoint = require("./endpoint");

var _endpoint2 = _interopRequireDefault(_endpoint);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * Abstract representation of a selected bucket.
 *
 */
var Bucket = (_dec = (0, _utils.capable)(["history"]), (_class = function () {
  /**
   * Constructor.
   *
   * @param  {KintoClient} client            The client instance.
   * @param  {String}      name              The bucket name.
   * @param  {Object}      [options={}]      The headers object option.
   * @param  {Object}      [options.headers] The headers object option.
   * @param  {Boolean}     [options.safe]    The safe option.
   * @param  {Number}      [options.retry]   The retry option.
   */
  function Bucket(client, name) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck3.default)(this, Bucket);

    /**
     * @ignore
     */
    this.client = client;
    /**
     * The bucket name.
     * @type {String}
     */
    this.name = name;
    /**
     * @ignore
     */
    this._isBatch = !!options.batch;
    /**
     * @ignore
     */
    this._headers = options.headers || {};
    this._retry = options.retry || 0;
    this._safe = !!options.safe;
  }

  /**
   * Get the value of "headers" for a given request, merging the
   * per-request headers with our own "default" headers.
   *
   * @private
   */


  (0, _createClass3.default)(Bucket, [{
    key: "_getHeaders",
    value: function _getHeaders(options) {
      return (0, _extends3.default)({}, this._headers, options.headers);
    }

    /**
     * Get the value of "safe" for a given request, using the
     * per-request option if present or falling back to our default
     * otherwise.
     *
     * @private
     * @param {Object} options The options for a request.
     * @returns {Boolean}
     */

  }, {
    key: "_getSafe",
    value: function _getSafe(options) {
      return (0, _extends3.default)({ safe: this._safe }, options).safe;
    }

    /**
     * As _getSafe, but for "retry".
     *
     * @private
     */

  }, {
    key: "_getRetry",
    value: function _getRetry(options) {
      return (0, _extends3.default)({ retry: this._retry }, options).retry;
    }

    /**
     * Selects a collection.
     *
     * @param  {String}  name              The collection name.
     * @param  {Object}  [options={}]      The options object.
     * @param  {Object}  [options.headers] The headers object option.
     * @param  {Boolean} [options.safe]    The safe option.
     * @return {Collection}
     */

  }, {
    key: "collection",
    value: function collection(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return new _collection2.default(this.client, this, name, {
        batch: this._isBatch,
        headers: this._getHeaders(options),
        retry: this._getRetry(options),
        safe: this._getSafe(options)
      });
    }

    /**
     * Retrieves bucket data.
     *
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers] The headers object option.
     * @param  {Number} [options.retry=0] Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "getData",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var request, _ref2, data;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = {
                  headers: this._getHeaders(options),
                  path: (0, _endpoint2.default)("bucket", this.name)
                };
                _context.next = 3;
                return this.client.execute(request, {
                  retry: this._getRetry(options)
                });

              case 3:
                _ref2 = _context.sent;
                data = _ref2.data;
                return _context.abrupt("return", data);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData() {
        return _ref.apply(this, arguments);
      }

      return getData;
    }()

    /**
     * Set bucket data.
     * @param  {Object}  data                    The bucket data object.
     * @param  {Object}  [options={}]            The options object.
     * @param  {Object}  [options.headers={}]    The headers object option.
     * @param  {Boolean} [options.safe]          The safe option.
     * @param  {Number}  [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Boolean} [options.patch]         The patch option.
     * @param  {Number}  [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "setData",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(data) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var bucket, bucketId, path, patch, permissions, _data$options, last_modified, request;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if ((0, _utils.isObject)(data)) {
                  _context2.next = 2;
                  break;
                }

                throw new Error("A bucket object is required.");

              case 2:
                bucket = (0, _extends3.default)({}, data, { id: this.name });

                // For default bucket, we need to drop the id from the data object.
                // Bug in Kinto < 3.1.1

                bucketId = bucket.id;

                if (bucket.id === "default") {
                  delete bucket.id;
                }

                path = (0, _endpoint2.default)("bucket", bucketId);
                patch = options.patch, permissions = options.permissions;
                _data$options = (0, _extends3.default)({}, data, options), last_modified = _data$options.last_modified;
                request = requests.updateRequest(path, { data: bucket, permissions: permissions }, {
                  last_modified: last_modified,
                  patch: patch,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context2.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setData(_x4) {
        return _ref3.apply(this, arguments);
      }

      return setData;
    }()

    /**
     * Retrieves the list of history entries in the current bucket.
     *
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers] The headers object option.
     * @param  {Number} [options.retry=0] Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Array<Object>, Error>}
     */

  }, {
    key: "listHistory",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var path;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                path = (0, _endpoint2.default)("history", this.name);
                return _context3.abrupt("return", this.client.paginatedList(path, options, {
                  headers: this._getHeaders(options),
                  retry: this._getRetry(options)
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function listHistory() {
        return _ref4.apply(this, arguments);
      }

      return listHistory;
    }()

    /**
     * Retrieves the list of collections in the current bucket.
     *
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers] The headers object option.
     * @param  {Number} [options.retry=0] Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Array<Object>, Error>}
     */

  }, {
    key: "listCollections",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var path;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                path = (0, _endpoint2.default)("collection", this.name);
                return _context4.abrupt("return", this.client.paginatedList(path, options, {
                  headers: this._getHeaders(options),
                  retry: this._getRetry(options)
                }));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function listCollections() {
        return _ref5.apply(this, arguments);
      }

      return listCollections;
    }()

    /**
     * Creates a new collection in current bucket.
     *
     * @param  {String|undefined}  id          The collection id.
     * @param  {Object}  [options={}]          The options object.
     * @param  {Boolean} [options.safe]        The safe option.
     * @param  {Object}  [options.headers]     The headers object option.
     * @param  {Number}  [options.retry=0]     Number of retries to make
     *     when faced with transient errors.
     * @param  {Object}  [options.permissions] The permissions object.
     * @param  {Object}  [options.data]        The data object.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "createCollection",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(id) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var permissions, _options$data, data, path, request;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                permissions = options.permissions, _options$data = options.data, data = _options$data === undefined ? {} : _options$data;

                data.id = id;
                path = (0, _endpoint2.default)("collection", this.name, id);
                request = requests.createRequest(path, { data: data, permissions: permissions }, {
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context5.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function createCollection(_x8) {
        return _ref6.apply(this, arguments);
      }

      return createCollection;
    }()

    /**
     * Deletes a collection from the current bucket.
     *
     * @param  {Object|String} collection              The collection to delete.
     * @param  {Object}        [options={}]            The options object.
     * @param  {Object}        [options.headers]       The headers object option.
     * @param  {Number}        [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Boolean}       [options.safe]          The safe option.
     * @param  {Number}        [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "deleteCollection",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(collection) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var collectionObj, id, _collectionObj$option, last_modified, path, request;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                collectionObj = (0, _utils.toDataBody)(collection);

                if (collectionObj.id) {
                  _context6.next = 3;
                  break;
                }

                throw new Error("A collection id is required.");

              case 3:
                id = collectionObj.id;
                _collectionObj$option = (0, _extends3.default)({}, collectionObj, options), last_modified = _collectionObj$option.last_modified;
                path = (0, _endpoint2.default)("collection", this.name, id);
                request = requests.deleteRequest(path, {
                  last_modified: last_modified,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context6.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function deleteCollection(_x10) {
        return _ref7.apply(this, arguments);
      }

      return deleteCollection;
    }()

    /**
     * Retrieves the list of groups in the current bucket.
     *
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers] The headers object option.
     * @param  {Number} [options.retry=0] Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Array<Object>, Error>}
     */

  }, {
    key: "listGroups",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var path;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                path = (0, _endpoint2.default)("group", this.name);
                return _context7.abrupt("return", this.client.paginatedList(path, options, {
                  headers: this._getHeaders(options),
                  retry: this._getRetry(options)
                }));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function listGroups() {
        return _ref8.apply(this, arguments);
      }

      return listGroups;
    }()

    /**
     * Creates a new group in current bucket.
     *
     * @param  {String} id                The group id.
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers] The headers object option.
     * @param  {Number} [options.retry=0] Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "getGroup",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(id) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var request;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                request = {
                  headers: this._getHeaders(options),
                  path: (0, _endpoint2.default)("group", this.name, id)
                };
                return _context8.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getGroup(_x13) {
        return _ref9.apply(this, arguments);
      }

      return getGroup;
    }()

    /**
     * Creates a new group in current bucket.
     *
     * @param  {String|undefined}  id                    The group id.
     * @param  {Array<String>}     [members=[]]          The list of principals.
     * @param  {Object}            [options={}]          The options object.
     * @param  {Object}            [options.data]        The data object.
     * @param  {Object}            [options.permissions] The permissions object.
     * @param  {Boolean}           [options.safe]        The safe option.
     * @param  {Object}            [options.headers]     The headers object option.
     * @param  {Number}            [options.retry=0]     Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "createGroup",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(id) {
        var members = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var data, path, permissions, request;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                data = (0, _extends3.default)({}, options.data, {
                  id: id,
                  members: members
                });
                path = (0, _endpoint2.default)("group", this.name, id);
                permissions = options.permissions;
                request = requests.createRequest(path, { data: data, permissions: permissions }, {
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context9.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function createGroup(_x15) {
        return _ref10.apply(this, arguments);
      }

      return createGroup;
    }()

    /**
     * Updates an existing group in current bucket.
     *
     * @param  {Object}  group                   The group object.
     * @param  {Object}  [options={}]            The options object.
     * @param  {Object}  [options.data]          The data object.
     * @param  {Object}  [options.permissions]   The permissions object.
     * @param  {Boolean} [options.safe]          The safe option.
     * @param  {Object}  [options.headers]       The headers object option.
     * @param  {Number}  [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Number}  [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "updateGroup",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(group) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var data, path, patch, permissions, _data$options2, last_modified, request;

        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if ((0, _utils.isObject)(group)) {
                  _context10.next = 2;
                  break;
                }

                throw new Error("A group object is required.");

              case 2:
                if (group.id) {
                  _context10.next = 4;
                  break;
                }

                throw new Error("A group id is required.");

              case 4:
                data = (0, _extends3.default)({}, options.data, group);
                path = (0, _endpoint2.default)("group", this.name, group.id);
                patch = options.patch, permissions = options.permissions;
                _data$options2 = (0, _extends3.default)({}, data, options), last_modified = _data$options2.last_modified;
                request = requests.updateRequest(path, { data: data, permissions: permissions }, {
                  last_modified: last_modified,
                  patch: patch,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context10.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function updateGroup(_x18) {
        return _ref11.apply(this, arguments);
      }

      return updateGroup;
    }()

    /**
     * Deletes a group from the current bucket.
     *
     * @param  {Object|String} group                   The group to delete.
     * @param  {Object}        [options={}]            The options object.
     * @param  {Object}        [options.headers]       The headers object option.
     * @param  {Number}        [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Boolean}       [options.safe]          The safe option.
     * @param  {Number}        [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "deleteGroup",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(group) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var groupObj, id, _groupObj$options, last_modified, path, request;

        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                groupObj = (0, _utils.toDataBody)(group);
                id = groupObj.id;
                _groupObj$options = (0, _extends3.default)({}, groupObj, options), last_modified = _groupObj$options.last_modified;
                path = (0, _endpoint2.default)("group", this.name, id);
                request = requests.deleteRequest(path, {
                  last_modified: last_modified,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context11.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function deleteGroup(_x20) {
        return _ref12.apply(this, arguments);
      }

      return deleteGroup;
    }()

    /**
     * Retrieves the list of permissions for this bucket.
     *
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers] The headers object option.
     * @param  {Number} [options.retry=0] Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "getPermissions",
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var request, _ref14, permissions;

        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                request = {
                  headers: this._getHeaders(options),
                  path: (0, _endpoint2.default)("bucket", this.name)
                };
                _context12.next = 3;
                return this.client.execute(request, {
                  retry: this._getRetry(options)
                });

              case 3:
                _ref14 = _context12.sent;
                permissions = _ref14.permissions;
                return _context12.abrupt("return", permissions);

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getPermissions() {
        return _ref13.apply(this, arguments);
      }

      return getPermissions;
    }()

    /**
     * Replaces all existing bucket permissions with the ones provided.
     *
     * @param  {Object}  permissions             The permissions object.
     * @param  {Object}  [options={}]            The options object
     * @param  {Boolean} [options.safe]          The safe option.
     * @param  {Object}  [options.headers={}]    The headers object option.
     * @param  {Number}  [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Object}  [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "setPermissions",
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(permissions) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var path, last_modified, data, request;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if ((0, _utils.isObject)(permissions)) {
                  _context13.next = 2;
                  break;
                }

                throw new Error("A permissions object is required.");

              case 2:
                path = (0, _endpoint2.default)("bucket", this.name);
                last_modified = options.last_modified;
                data = { last_modified: last_modified };
                request = requests.updateRequest(path, { data: data, permissions: permissions }, {
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context13.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 7:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function setPermissions(_x23) {
        return _ref15.apply(this, arguments);
      }

      return setPermissions;
    }()

    /**
     * Append principals to the bucket permissions.
     *
     * @param  {Object}  permissions             The permissions object.
     * @param  {Object}  [options={}]            The options object
     * @param  {Boolean} [options.safe]          The safe option.
     * @param  {Object}  [options.headers]       The headers object option.
     * @param  {Number}  [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Object}  [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "addPermissions",
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(permissions) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var path, last_modified, request;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if ((0, _utils.isObject)(permissions)) {
                  _context14.next = 2;
                  break;
                }

                throw new Error("A permissions object is required.");

              case 2:
                path = (0, _endpoint2.default)("bucket", this.name);
                last_modified = options.last_modified;
                request = requests.jsonPatchPermissionsRequest(path, permissions, "add", {
                  last_modified: last_modified,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context14.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 6:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function addPermissions(_x25) {
        return _ref16.apply(this, arguments);
      }

      return addPermissions;
    }()

    /**
     * Remove principals from the bucket permissions.
     *
     * @param  {Object}  permissions             The permissions object.
     * @param  {Object}  [options={}]            The options object
     * @param  {Boolean} [options.safe]          The safe option.
     * @param  {Object}  [options.headers]       The headers object option.
     * @param  {Number}  [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Object}  [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "removePermissions",
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(permissions) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var path, last_modified, request;
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if ((0, _utils.isObject)(permissions)) {
                  _context15.next = 2;
                  break;
                }

                throw new Error("A permissions object is required.");

              case 2:
                path = (0, _endpoint2.default)("bucket", this.name);
                last_modified = options.last_modified;
                request = requests.jsonPatchPermissionsRequest(path, permissions, "remove", {
                  last_modified: last_modified,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context15.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 6:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function removePermissions(_x27) {
        return _ref17.apply(this, arguments);
      }

      return removePermissions;
    }()

    /**
     * Performs batch operations at the current bucket level.
     *
     * @param  {Function} fn                   The batch operation function.
     * @param  {Object}   [options={}]         The options object.
     * @param  {Object}   [options.headers]    The headers object option.
     * @param  {Boolean}  [options.safe]       The safe option.
     * @param  {Number}   [options.retry=0]    The retry option.
     * @param  {Boolean}  [options.aggregate]  Produces a grouped result object.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "batch",
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(fn) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                return _context16.abrupt("return", this.client.batch(fn, {
                  bucket: this.name,
                  headers: this._getHeaders(options),
                  retry: this._getRetry(options),
                  safe: this._getSafe(options),
                  aggregate: !!options.aggregate
                }));

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function batch(_x29) {
        return _ref18.apply(this, arguments);
      }

      return batch;
    }()
  }]);
  return Bucket;
}(), (_applyDecoratedDescriptor(_class.prototype, "listHistory", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "listHistory"), _class.prototype)), _class));
exports.default = Bucket;

},{"./collection":134,"./endpoint":135,"./requests":139,"./utils":140,"babel-runtime/helpers/asyncToGenerator":11,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/extends":15,"babel-runtime/regenerator":21}],134:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _dec, _dec2, _dec3, _desc, _value, _class;

var _uuid = require("uuid");

var _utils = require("./utils");

var _requests = require("./requests");

var requests = _interopRequireWildcard(_requests);

var _endpoint = require("./endpoint");

var _endpoint2 = _interopRequireDefault(_endpoint);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * Abstract representation of a selected collection.
 *
 */
var Collection = (_dec = (0, _utils.capable)(["attachments"]), _dec2 = (0, _utils.capable)(["attachments"]), _dec3 = (0, _utils.capable)(["history"]), (_class = function () {
  /**
   * Constructor.
   *
   * @param  {KintoClient}  client            The client instance.
   * @param  {Bucket}       bucket            The bucket instance.
   * @param  {String}       name              The collection name.
   * @param  {Object}       [options={}]      The options object.
   * @param  {Object}       [options.headers] The headers object option.
   * @param  {Boolean}      [options.safe]    The safe option.
   * @param  {Number}       [options.retry]   The retry option.
   * @param  {Boolean}      [options.batch]   (Private) Whether this
   *     Collection is operating as part of a batch.
   */
  function Collection(client, bucket, name) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    (0, _classCallCheck3.default)(this, Collection);

    /**
     * @ignore
     */
    this.client = client;
    /**
     * @ignore
     */
    this.bucket = bucket;
    /**
     * The collection name.
     * @type {String}
     */
    this.name = name;

    /**
     * @ignore
     */
    this._isBatch = !!options.batch;

    /**
     * @ignore
     */
    this._retry = options.retry || 0;
    this._safe = !!options.safe;
    // FIXME: This is kind of ugly; shouldn't the bucket be responsible
    // for doing the merge?
    this._headers = (0, _extends3.default)({}, this.bucket._headers, options.headers);
  }

  /**
   * Get the value of "headers" for a given request, merging the
   * per-request headers with our own "default" headers.
   *
   * @private
   */


  (0, _createClass3.default)(Collection, [{
    key: "_getHeaders",
    value: function _getHeaders(options) {
      return (0, _extends3.default)({}, this._headers, options.headers);
    }

    /**
     * Get the value of "safe" for a given request, using the
     * per-request option if present or falling back to our default
     * otherwise.
     *
     * @private
     * @param {Object} options The options for a request.
     * @returns {Boolean}
     */

  }, {
    key: "_getSafe",
    value: function _getSafe(options) {
      return (0, _extends3.default)({ safe: this._safe }, options).safe;
    }

    /**
     * As _getSafe, but for "retry".
     *
     * @private
     */

  }, {
    key: "_getRetry",
    value: function _getRetry(options) {
      return (0, _extends3.default)({ retry: this._retry }, options).retry;
    }

    /**
     * Retrieves the total number of records in this collection.
     *
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers] The headers object option.
     * @param  {Number} [options.retry=0] Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Number, Error>}
     */

  }, {
    key: "getTotalRecords",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var path, request, _ref2, headers;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                path = (0, _endpoint2.default)("record", this.bucket.name, this.name);
                request = {
                  headers: this._getHeaders(options),
                  path: path,
                  method: "HEAD"
                };
                _context.next = 4;
                return this.client.execute(request, {
                  raw: true,
                  retry: this._getRetry(options)
                });

              case 4:
                _ref2 = _context.sent;
                headers = _ref2.headers;
                return _context.abrupt("return", parseInt(headers.get("Total-Records"), 10));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getTotalRecords() {
        return _ref.apply(this, arguments);
      }

      return getTotalRecords;
    }()

    /**
     * Retrieves collection data.
     *
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers] The headers object option.
     * @param  {Number} [options.retry=0] Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "getData",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var path, request, _ref4, data;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                path = (0, _endpoint2.default)("collection", this.bucket.name, this.name);
                request = { headers: this._getHeaders(options), path: path };
                _context2.next = 4;
                return this.client.execute(request, {
                  retry: this._getRetry(options)
                });

              case 4:
                _ref4 = _context2.sent;
                data = _ref4.data;
                return _context2.abrupt("return", data);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getData() {
        return _ref3.apply(this, arguments);
      }

      return getData;
    }()

    /**
     * Set collection data.
     * @param  {Object}   data                    The collection data object.
     * @param  {Object}   [options={}]            The options object.
     * @param  {Object}   [options.headers]       The headers object option.
     * @param  {Number}   [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Boolean}  [options.safe]          The safe option.
     * @param  {Boolean}  [options.patch]         The patch option.
     * @param  {Number}   [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "setData",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(data) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var patch, permissions, _data$options, last_modified, path, request;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if ((0, _utils.isObject)(data)) {
                  _context3.next = 2;
                  break;
                }

                throw new Error("A collection object is required.");

              case 2:
                patch = options.patch, permissions = options.permissions;
                _data$options = (0, _extends3.default)({}, data, options), last_modified = _data$options.last_modified;
                path = (0, _endpoint2.default)("collection", this.bucket.name, this.name);
                request = requests.updateRequest(path, { data: data, permissions: permissions }, {
                  last_modified: last_modified,
                  patch: patch,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context3.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setData(_x4) {
        return _ref5.apply(this, arguments);
      }

      return setData;
    }()

    /**
     * Retrieves the list of permissions for this collection.
     *
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers] The headers object option.
     * @param  {Number} [options.retry=0] Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "getPermissions",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var path, request, _ref7, permissions;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                path = (0, _endpoint2.default)("collection", this.bucket.name, this.name);
                request = { headers: this._getHeaders(options), path: path };
                _context4.next = 4;
                return this.client.execute(request, {
                  retry: this._getRetry(options)
                });

              case 4:
                _ref7 = _context4.sent;
                permissions = _ref7.permissions;
                return _context4.abrupt("return", permissions);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getPermissions() {
        return _ref6.apply(this, arguments);
      }

      return getPermissions;
    }()

    /**
     * Replaces all existing collection permissions with the ones provided.
     *
     * @param  {Object}   permissions             The permissions object.
     * @param  {Object}   [options={}]            The options object
     * @param  {Object}   [options.headers]       The headers object option.
     * @param  {Number}   [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Boolean}  [options.safe]          The safe option.
     * @param  {Number}   [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "setPermissions",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(permissions) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var path, data, request;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if ((0, _utils.isObject)(permissions)) {
                  _context5.next = 2;
                  break;
                }

                throw new Error("A permissions object is required.");

              case 2:
                path = (0, _endpoint2.default)("collection", this.bucket.name, this.name);
                data = { last_modified: options.last_modified };
                request = requests.updateRequest(path, { data: data, permissions: permissions }, {
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context5.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setPermissions(_x7) {
        return _ref8.apply(this, arguments);
      }

      return setPermissions;
    }()

    /**
     * Append principals to the collection permissions.
     *
     * @param  {Object}  permissions             The permissions object.
     * @param  {Object}  [options={}]            The options object
     * @param  {Boolean} [options.safe]          The safe option.
     * @param  {Object}  [options.headers]       The headers object option.
     * @param  {Number}  [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Object}  [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "addPermissions",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(permissions) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var path, last_modified, request;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if ((0, _utils.isObject)(permissions)) {
                  _context6.next = 2;
                  break;
                }

                throw new Error("A permissions object is required.");

              case 2:
                path = (0, _endpoint2.default)("collection", this.bucket.name, this.name);
                last_modified = options.last_modified;
                request = requests.jsonPatchPermissionsRequest(path, permissions, "add", {
                  last_modified: last_modified,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context6.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function addPermissions(_x9) {
        return _ref9.apply(this, arguments);
      }

      return addPermissions;
    }()

    /**
     * Remove principals from the collection permissions.
     *
     * @param  {Object}  permissions             The permissions object.
     * @param  {Object}  [options={}]            The options object
     * @param  {Boolean} [options.safe]          The safe option.
     * @param  {Object}  [options.headers]       The headers object option.
     * @param  {Number}  [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Object}  [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "removePermissions",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(permissions) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var path, last_modified, request;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if ((0, _utils.isObject)(permissions)) {
                  _context7.next = 2;
                  break;
                }

                throw new Error("A permissions object is required.");

              case 2:
                path = (0, _endpoint2.default)("collection", this.bucket.name, this.name);
                last_modified = options.last_modified;
                request = requests.jsonPatchPermissionsRequest(path, permissions, "remove", {
                  last_modified: last_modified,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context7.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function removePermissions(_x11) {
        return _ref10.apply(this, arguments);
      }

      return removePermissions;
    }()

    /**
     * Creates a record in current collection.
     *
     * @param  {Object}  record                The record to create.
     * @param  {Object}  [options={}]          The options object.
     * @param  {Object}  [options.headers]     The headers object option.
     * @param  {Number}  [options.retry=0]     Number of retries to make
     *     when faced with transient errors.
     * @param  {Boolean} [options.safe]        The safe option.
     * @param  {Object}  [options.permissions] The permissions option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "createRecord",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(record) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var permissions, path, request;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                permissions = options.permissions;
                path = (0, _endpoint2.default)("record", this.bucket.name, this.name, record.id);
                request = requests.createRequest(path, { data: record, permissions: permissions }, {
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context8.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function createRecord(_x13) {
        return _ref11.apply(this, arguments);
      }

      return createRecord;
    }()

    /**
     * Adds an attachment to a record, creating the record when it doesn't exist.
     *
     * @param  {String}  dataURL                 The data url.
     * @param  {Object}  [record={}]             The record data.
     * @param  {Object}  [options={}]            The options object.
     * @param  {Object}  [options.headers]       The headers object option.
     * @param  {Number}  [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Boolean} [options.safe]          The safe option.
     * @param  {Number}  [options.last_modified] The last_modified option.
     * @param  {Object}  [options.permissions]   The permissions option.
     * @param  {String}  [options.filename]      Force the attachment filename.
     * @param  {String}  [options.gzipped]       Force the attachment to be gzipped or not.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "addAttachment",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(dataURI) {
        var record = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var permissions, id, path, _record$options, last_modified, addAttachmentRequest;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                permissions = options.permissions;
                id = record.id || _uuid.v4.v4();
                path = (0, _endpoint2.default)("attachment", this.bucket.name, this.name, id);
                _record$options = (0, _extends3.default)({}, record, options), last_modified = _record$options.last_modified;
                addAttachmentRequest = requests.addAttachmentRequest(path, dataURI, { data: record, permissions: permissions }, {
                  last_modified: last_modified,
                  filename: options.filename,
                  gzipped: options.gzipped,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                _context9.next = 7;
                return this.client.execute(addAttachmentRequest, {
                  stringify: false,
                  retry: this._getRetry(options)
                });

              case 7:
                return _context9.abrupt("return", this.getRecord(id));

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function addAttachment(_x15) {
        return _ref12.apply(this, arguments);
      }

      return addAttachment;
    }()

    /**
     * Removes an attachment from a given record.
     *
     * @param  {Object}  recordId                The record id.
     * @param  {Object}  [options={}]            The options object.
     * @param  {Object}  [options.headers]       The headers object option.
     * @param  {Number}  [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Boolean} [options.safe]          The safe option.
     * @param  {Number}  [options.last_modified] The last_modified option.
     */

  }, {
    key: "removeAttachment",
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(recordId) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var last_modified, path, request;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                last_modified = options.last_modified;
                path = (0, _endpoint2.default)("attachment", this.bucket.name, this.name, recordId);
                request = requests.deleteRequest(path, {
                  last_modified: last_modified,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context10.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function removeAttachment(_x18) {
        return _ref13.apply(this, arguments);
      }

      return removeAttachment;
    }()

    /**
     * Updates a record in current collection.
     *
     * @param  {Object}  record                  The record to update.
     * @param  {Object}  [options={}]            The options object.
     * @param  {Object}  [options.headers]       The headers object option.
     * @param  {Number}  [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Boolean} [options.safe]          The safe option.
     * @param  {Number}  [options.last_modified] The last_modified option.
     * @param  {Object}  [options.permissions]   The permissions option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "updateRecord",
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(record) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var permissions, _record$options2, last_modified, path, request;

        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if ((0, _utils.isObject)(record)) {
                  _context11.next = 2;
                  break;
                }

                throw new Error("A record object is required.");

              case 2:
                if (record.id) {
                  _context11.next = 4;
                  break;
                }

                throw new Error("A record id is required.");

              case 4:
                permissions = options.permissions;
                _record$options2 = (0, _extends3.default)({}, record, options), last_modified = _record$options2.last_modified;
                path = (0, _endpoint2.default)("record", this.bucket.name, this.name, record.id);
                request = requests.updateRequest(path, { data: record, permissions: permissions }, {
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options),
                  last_modified: last_modified,
                  patch: !!options.patch
                });
                return _context11.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 9:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function updateRecord(_x20) {
        return _ref14.apply(this, arguments);
      }

      return updateRecord;
    }()

    /**
     * Deletes a record from the current collection.
     *
     * @param  {Object|String} record                  The record to delete.
     * @param  {Object}        [options={}]            The options object.
     * @param  {Object}        [options.headers]       The headers object option.
     * @param  {Number}        [options.retry=0]       Number of retries to make
     *     when faced with transient errors.
     * @param  {Boolean}       [options.safe]          The safe option.
     * @param  {Number}        [options.last_modified] The last_modified option.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "deleteRecord",
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(record) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var recordObj, id, _recordObj$options, last_modified, path, request;

        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                recordObj = (0, _utils.toDataBody)(record);

                if (recordObj.id) {
                  _context12.next = 3;
                  break;
                }

                throw new Error("A record id is required.");

              case 3:
                id = recordObj.id;
                _recordObj$options = (0, _extends3.default)({}, recordObj, options), last_modified = _recordObj$options.last_modified;
                path = (0, _endpoint2.default)("record", this.bucket.name, this.name, id);
                request = requests.deleteRequest(path, {
                  last_modified: last_modified,
                  headers: this._getHeaders(options),
                  safe: this._getSafe(options)
                });
                return _context12.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 8:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function deleteRecord(_x22) {
        return _ref15.apply(this, arguments);
      }

      return deleteRecord;
    }()

    /**
     * Retrieves a record from the current collection.
     *
     * @param  {String} id                The record id to retrieve.
     * @param  {Object} [options={}]      The options object.
     * @param  {Object} [options.headers] The headers object option.
     * @param  {Number} [options.retry=0] Number of retries to make
     *     when faced with transient errors.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "getRecord",
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(id) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var path, request;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                path = (0, _endpoint2.default)("record", this.bucket.name, this.name, id);
                request = { headers: this._getHeaders(options), path: path };
                return _context13.abrupt("return", this.client.execute(request, { retry: this._getRetry(options) }));

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getRecord(_x24) {
        return _ref16.apply(this, arguments);
      }

      return getRecord;
    }()

    /**
     * Lists records from the current collection.
     *
     * Sorting is done by passing a `sort` string option:
     *
     * - The field to order the results by, prefixed with `-` for descending.
     * Default: `-last_modified`.
     *
     * @see http://kinto.readthedocs.io/en/stable/api/1.x/sorting.html
     *
     * Filtering is done by passing a `filters` option object:
     *
     * - `{fieldname: "value"}`
     * - `{min_fieldname: 4000}`
     * - `{in_fieldname: "1,2,3"}`
     * - `{not_fieldname: 0}`
     * - `{exclude_fieldname: "0,1"}`
     *
     * @see http://kinto.readthedocs.io/en/stable/api/1.x/filtering.html
     *
     * Paginating is done by passing a `limit` option, then calling the `next()`
     * method from the resolved result object to fetch the next page, if any.
     *
     * @param  {Object}   [options={}]                    The options object.
     * @param  {Object}   [options.headers]               The headers object option.
     * @param  {Number}   [options.retry=0]               Number of retries to make
     *     when faced with transient errors.
     * @param  {Object}   [options.filters=[]]            The filters object.
     * @param  {String}   [options.sort="-last_modified"] The sort field.
     * @param  {String}   [options.at]                    The timestamp to get a snapshot at.
     * @param  {String}   [options.limit=null]            The limit field.
     * @param  {String}   [options.pages=1]               The number of result pages to aggregate.
     * @param  {Number}   [options.since=null]            Only retrieve records modified since the provided timestamp.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "listRecords",
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var path;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                path = (0, _endpoint2.default)("record", this.bucket.name, this.name);

                if (!options.hasOwnProperty("at")) {
                  _context14.next = 5;
                  break;
                }

                return _context14.abrupt("return", this.getSnapshot(options.at));

              case 5:
                return _context14.abrupt("return", this.client.paginatedList(path, options, {
                  headers: this._getHeaders(options),
                  retry: this._getRetry(options)
                }));

              case 6:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function listRecords() {
        return _ref17.apply(this, arguments);
      }

      return listRecords;
    }()

    /**
     * @private
     */

  }, {
    key: "isHistoryComplete",
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15() {
        var _ref19, _ref19$data, oldestHistoryEntry;

        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return this.bucket.listHistory({
                  limit: 1,
                  filters: {
                    action: "create",
                    resource_name: "collection",
                    collection_id: this.name
                  }
                });

              case 2:
                _ref19 = _context15.sent;
                _ref19$data = (0, _slicedToArray3.default)(_ref19.data, 1);
                oldestHistoryEntry = _ref19$data[0];
                return _context15.abrupt("return", !!oldestHistoryEntry);

              case 6:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function isHistoryComplete() {
        return _ref18.apply(this, arguments);
      }

      return isHistoryComplete;
    }()

    /**
     * @private
     */

  }, {
    key: "listChangesBackTo",
    value: function () {
      var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(at) {
        var _ref21, changes;

        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return this.isHistoryComplete();

              case 2:
                if (_context16.sent) {
                  _context16.next = 4;
                  break;
                }

                throw new Error("Computing a snapshot is only possible when the full history for a " + "collection is available. Here, the history plugin seems to have " + "been enabled after the creation of the collection.");

              case 4:
                _context16.next = 6;
                return this.bucket.listHistory({
                  pages: Infinity, // all pages up to target timestamp are required
                  sort: "-target.data.last_modified",
                  filters: {
                    resource_name: "record",
                    collection_id: this.name,
                    "max_target.data.last_modified": String(at) // eq. to <=
                  }
                });

              case 6:
                _ref21 = _context16.sent;
                changes = _ref21.data;
                return _context16.abrupt("return", changes);

              case 9:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function listChangesBackTo(_x27) {
        return _ref20.apply(this, arguments);
      }

      return listChangesBackTo;
    }()

    /**
     * @private
     */

  }, {
    key: "getSnapshot",
    value: function () {
      var _ref22 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17(at) {
        var changes, seenIds, snapshot, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (!(!Number.isInteger(at) || at <= 0)) {
                  _context17.next = 2;
                  break;
                }

                throw new Error("Invalid argument, expected a positive integer.");

              case 2:
                _context17.next = 4;
                return this.listChangesBackTo(at);

              case 4:
                changes = _context17.sent;

                // Replay changes to compute the requested snapshot.
                seenIds = new Set();
                snapshot = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context17.prev = 10;

                _loop = function _loop() {
                  var _ref23 = _step.value;
                  var action = _ref23.action,
                      record = _ref23.target.data;

                  if (action == "delete") {
                    seenIds.add(record.id); // ensure not reprocessing deleted entries
                    snapshot = snapshot.filter(function (r) {
                      return r.id !== record.id;
                    });
                  } else if (!seenIds.has(record.id)) {
                    seenIds.add(record.id);
                    snapshot.push(record);
                  }
                };

                for (_iterator = changes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _loop();
                }
                _context17.next = 19;
                break;

              case 15:
                _context17.prev = 15;
                _context17.t0 = _context17["catch"](10);
                _didIteratorError = true;
                _iteratorError = _context17.t0;

              case 19:
                _context17.prev = 19;
                _context17.prev = 20;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 22:
                _context17.prev = 22;

                if (!_didIteratorError) {
                  _context17.next = 25;
                  break;
                }

                throw _iteratorError;

              case 25:
                return _context17.finish(22);

              case 26:
                return _context17.finish(19);

              case 27:
                return _context17.abrupt("return", {
                  last_modified: String(at),
                  data: snapshot.sort(function (a, b) {
                    return b.last_modified - a.last_modified;
                  }),
                  next: function next() {
                    throw new Error("Snapshots don't support pagination");
                  },
                  hasNextPage: false,
                  totalRecords: snapshot.length
                });

              case 28:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[10, 15, 19, 27], [20,, 22, 26]]);
      }));

      function getSnapshot(_x28) {
        return _ref22.apply(this, arguments);
      }

      return getSnapshot;
    }()

    /**
     * Performs batch operations at the current collection level.
     *
     * @param  {Function} fn                   The batch operation function.
     * @param  {Object}   [options={}]         The options object.
     * @param  {Object}   [options.headers]    The headers object option.
     * @param  {Boolean}  [options.safe]       The safe option.
     * @param  {Number}   [options.retry]      The retry option.
     * @param  {Boolean}  [options.aggregate]  Produces a grouped result object.
     * @return {Promise<Object, Error>}
     */

  }, {
    key: "batch",
    value: function () {
      var _ref24 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18(fn) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return _regenerator2.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                return _context18.abrupt("return", this.client.batch(fn, {
                  bucket: this.bucket.name,
                  collection: this.name,
                  headers: this._getHeaders(options),
                  retry: this._getRetry(options),
                  safe: this._getSafe(options),
                  aggregate: !!options.aggregate
                }));

              case 1:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function batch(_x29) {
        return _ref24.apply(this, arguments);
      }

      return batch;
    }()
  }]);
  return Collection;
}(), (_applyDecoratedDescriptor(_class.prototype, "addAttachment", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "addAttachment"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "removeAttachment", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "removeAttachment"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getSnapshot", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "getSnapshot"), _class.prototype)), _class));
exports.default = Collection;

},{"./endpoint":135,"./requests":139,"./utils":140,"babel-runtime/helpers/asyncToGenerator":11,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/extends":15,"babel-runtime/helpers/slicedToArray":18,"babel-runtime/regenerator":21,"uuid":126}],135:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endpoint;
/**
 * Endpoints templates.
 * @type {Object}
 */
var ENDPOINTS = {
  root: function root() {
    return "/";
  },
  batch: function batch() {
    return "/batch";
  },
  permissions: function permissions() {
    return "/permissions";
  },
  bucket: function bucket(_bucket) {
    return "/buckets" + (_bucket ? "/" + _bucket : "");
  },
  history: function history(bucket) {
    return ENDPOINTS.bucket(bucket) + "/history";
  },
  collection: function collection(bucket, coll) {
    return ENDPOINTS.bucket(bucket) + "/collections" + (coll ? "/" + coll : "");
  },
  group: function group(bucket, _group) {
    return ENDPOINTS.bucket(bucket) + "/groups" + (_group ? "/" + _group : "");
  },
  record: function record(bucket, coll, id) {
    return ENDPOINTS.collection(bucket, coll) + "/records" + (id ? "/" + id : "");
  },
  attachment: function attachment(bucket, coll, id) {
    return ENDPOINTS.record(bucket, coll, id) + "/attachment";
  }
};

/**
 * Retrieves a server enpoint by its name.
 *
 * @private
 * @param  {String}    name The endpoint name.
 * @param  {...string} args The endpoint parameters.
 * @return {String}
 */
function endpoint(name) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return ENDPOINTS[name].apply(ENDPOINTS, args);
}

},{}],136:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnparseableResponseError = exports.ServerResponse = exports.NetworkTimeoutError = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extendableBuiltin5(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

function _extendableBuiltin3(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

/**
 * Kinto server error code descriptors.
 * @type {Object}
 */
var ERROR_CODES = {
  104: "Missing Authorization Token",
  105: "Invalid Authorization Token",
  106: "Request body was not valid JSON",
  107: "Invalid request parameter",
  108: "Missing request parameter",
  109: "Invalid posted data",
  110: "Invalid Token / id",
  111: "Missing Token / id",
  112: "Content-Length header was not provided",
  113: "Request body too large",
  114: "Resource was created, updated or deleted meanwhile",
  115: "Method not allowed on this end point (hint: server may be readonly)",
  116: "Requested version not available on this server",
  117: "Client has sent too many requests",
  121: "Resource access is forbidden for this user",
  122: "Another resource violates constraint",
  201: "Service Temporary unavailable due to high load",
  202: "Service deprecated",
  999: "Internal Server Error"
};

exports.default = ERROR_CODES;

var NetworkTimeoutError = function (_extendableBuiltin2) {
  (0, _inherits3.default)(NetworkTimeoutError, _extendableBuiltin2);

  function NetworkTimeoutError(url, options) {
    (0, _classCallCheck3.default)(this, NetworkTimeoutError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NetworkTimeoutError.__proto__ || Object.getPrototypeOf(NetworkTimeoutError)).call(this, "Timeout while trying to access " + url + " with " + JSON.stringify(options)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, NetworkTimeoutError);
    }

    _this.url = url;
    _this.options = options;
    return _this;
  }

  return NetworkTimeoutError;
}(_extendableBuiltin(Error));

var UnparseableResponseError = function (_extendableBuiltin4) {
  (0, _inherits3.default)(UnparseableResponseError, _extendableBuiltin4);

  function UnparseableResponseError(response, body, error) {
    (0, _classCallCheck3.default)(this, UnparseableResponseError);
    var status = response.status;

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (UnparseableResponseError.__proto__ || Object.getPrototypeOf(UnparseableResponseError)).call(this, "Response from server unparseable (HTTP " + (status || 0) + "; " + error + "): " + body));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this2, UnparseableResponseError);
    }

    _this2.status = status;
    _this2.response = response;
    _this2.stack = error.stack;
    _this2.error = error;
    return _this2;
  }

  return UnparseableResponseError;
}(_extendableBuiltin3(Error));

/**
 * "Error" subclass representing a >=400 response from the server.
 *
 * Whether or not this is an error depends on your application.
 *
 * The `json` field can be undefined if the server responded with an
 * empty response body. This shouldn't generally happen. Most "bad"
 * responses come with a JSON error description, or (if they're
 * fronted by a CDN or nginx or something) occasionally non-JSON
 * responses (which become UnparseableResponseErrors, above).
 */


var ServerResponse = function (_extendableBuiltin6) {
  (0, _inherits3.default)(ServerResponse, _extendableBuiltin6);

  function ServerResponse(response, json) {
    (0, _classCallCheck3.default)(this, ServerResponse);
    var status = response.status;
    var statusText = response.statusText;

    var errnoMsg = void 0;

    if (json) {
      // Try to fill in information from the JSON error.
      statusText = json.error || statusText;

      // Take errnoMsg from either ERROR_CODES or json.message.
      if (json.errno && json.errno in ERROR_CODES) {
        errnoMsg = ERROR_CODES[json.errno];
      } else if (json.message) {
        errnoMsg = json.message;
      }

      // If we had both ERROR_CODES and json.message, and they differ,
      // combine them.
      if (errnoMsg && json.message && json.message !== errnoMsg) {
        errnoMsg += " (" + json.message + ")";
      }
    }

    var message = "HTTP " + status + " " + statusText;
    if (errnoMsg) {
      message += ": " + errnoMsg;
    }

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (ServerResponse.__proto__ || Object.getPrototypeOf(ServerResponse)).call(this, message.trim()));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this3, ServerResponse);
    }

    _this3.response = response;
    _this3.data = json;
    return _this3;
  }

  return ServerResponse;
}(_extendableBuiltin5(Error));

exports.NetworkTimeoutError = NetworkTimeoutError;
exports.ServerResponse = ServerResponse;
exports.UnparseableResponseError = UnparseableResponseError;

},{"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],137:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require("./utils");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Enhanced HTTP client for the Kinto protocol.
 * @private
 */
var HTTP = function () {
  (0, _createClass3.default)(HTTP, null, [{
    key: "DEFAULT_REQUEST_HEADERS",

    /**
     * Default HTTP request headers applied to each outgoing request.
     *
     * @type {Object}
     */
    get: function get() {
      return {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
    }

    /**
     * Default options.
     *
     * @type {Object}
     */

  }, {
    key: "defaultOptions",
    get: function get() {
      return { timeout: null, requestMode: "cors" };
    }

    /**
     * Constructor.
     *
     * @param {EventEmitter} events                       The event handler.
     * @param {Object}       [options={}}                 The options object.
     * @param {Number}       [options.timeout=null]       The request timeout in ms, if any (default: `null`).
     * @param {String}       [options.requestMode="cors"] The HTTP request mode (default: `"cors"`).
     */

  }]);

  function HTTP(events) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, HTTP);

    // public properties
    /**
     * The event emitter instance.
     * @type {EventEmitter}
     */
    if (!events) {
      throw new Error("No events handler provided");
    }
    this.events = events;

    /**
     * The request mode.
     * @see  https://fetch.spec.whatwg.org/#requestmode
     * @type {String}
     */
    this.requestMode = options.requestMode || HTTP.defaultOptions.requestMode;

    /**
     * The request timeout.
     * @type {Number}
     */
    this.timeout = options.timeout || HTTP.defaultOptions.timeout;
  }

  /**
   * @private
   */


  (0, _createClass3.default)(HTTP, [{
    key: "timedFetch",
    value: function timedFetch(url, options) {
      var _this = this;

      var hasTimedout = false;
      return new Promise(function (resolve, reject) {
        // Detect if a request has timed out.
        var _timeoutId = void 0;
        if (_this.timeout) {
          _timeoutId = setTimeout(function () {
            hasTimedout = true;
            reject(new _errors.NetworkTimeoutError(url, options));
          }, _this.timeout);
        }
        function proceedWithHandler(fn) {
          return function (arg) {
            if (!hasTimedout) {
              if (_timeoutId) {
                clearTimeout(_timeoutId);
              }
              fn(arg);
            }
          };
        }
        fetch(url, options).then(proceedWithHandler(resolve)).catch(proceedWithHandler(reject));
      });
    }

    /**
     * @private
     */

  }, {
    key: "processResponse",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(response) {
        var status, headers, text, json;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                status = response.status, headers = response.headers;
                _context.next = 3;
                return response.text();

              case 3:
                text = _context.sent;

                // Check if we have a body; if so parse it as JSON.
                json = void 0;

                if (!(text.length !== 0)) {
                  _context.next = 13;
                  break;
                }

                _context.prev = 6;

                json = JSON.parse(text);
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](6);
                throw new _errors.UnparseableResponseError(response, text, _context.t0);

              case 13:
                if (!(status >= 400)) {
                  _context.next = 15;
                  break;
                }

                throw new _errors.ServerResponse(response, json);

              case 15:
                return _context.abrupt("return", { status: status, json: json, headers: headers });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 10]]);
      }));

      function processResponse(_x2) {
        return _ref.apply(this, arguments);
      }

      return processResponse;
    }()

    /**
     * @private
     */

  }, {
    key: "retry",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(url, retryAfter, request, options) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _utils.delay)(retryAfter);

              case 2:
                return _context2.abrupt("return", this.request(url, request, (0, _extends3.default)({}, options, { retry: options.retry - 1 })));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function retry(_x3, _x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return retry;
    }()

    /**
     * Performs an HTTP request to the Kinto server.
     *
     * Resolves with an objet containing the following HTTP response properties:
     * - `{Number}  status`  The HTTP status code.
     * - `{Object}  json`    The JSON response body.
     * - `{Headers} headers` The response headers object; see the ES6 fetch() spec.
     *
     * @param  {String} url               The URL.
     * @param  {Object} [request={}]      The request object, passed to
     *     fetch() as its options object.
     * @param  {Object} [request.headers] The request headers object (default: {})
     * @param  {Object} [options={}]      Options for making the
     *     request
     * @param  {Number} [options.retry]   Number of retries (default: 0)
     * @return {Promise}
     */

  }, {
    key: "request",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(url) {
        var _request = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { headers: {} };

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { retry: 0 };
        var response, status, headers, retryAfter;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // Ensure default request headers are always set
                _request.headers = (0, _extends3.default)({}, HTTP.DEFAULT_REQUEST_HEADERS, _request.headers);
                // If a multipart body is provided, remove any custom Content-Type header as
                // the fetch() implementation will add the correct one for us.
                if (_request.body && typeof _request.body.append === "function") {
                  delete _request.headers["Content-Type"];
                }
                _request.mode = this.requestMode;

                _context3.next = 5;
                return this.timedFetch(url, _request);

              case 5:
                response = _context3.sent;
                status = response.status, headers = response.headers;


                this._checkForDeprecationHeader(headers);
                this._checkForBackoffHeader(status, headers);

                // Check if the server summons the client to retry after a while.
                retryAfter = this._checkForRetryAfterHeader(status, headers);
                // If number of allowed of retries is not exhausted, retry the same request.

                if (!(retryAfter && options.retry > 0)) {
                  _context3.next = 14;
                  break;
                }

                return _context3.abrupt("return", this.retry(url, retryAfter, _request, options));

              case 14:
                return _context3.abrupt("return", this.processResponse(response));

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function request(_x7) {
        return _ref3.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "_checkForDeprecationHeader",
    value: function _checkForDeprecationHeader(headers) {
      var alertHeader = headers.get("Alert");
      if (!alertHeader) {
        return;
      }
      var alert = void 0;
      try {
        alert = JSON.parse(alertHeader);
      } catch (err) {
        console.warn("Unable to parse Alert header message", alertHeader);
        return;
      }
      console.warn(alert.message, alert.url);
      this.events.emit("deprecated", alert);
    }
  }, {
    key: "_checkForBackoffHeader",
    value: function _checkForBackoffHeader(status, headers) {
      var backoffMs = void 0;
      var backoffSeconds = parseInt(headers.get("Backoff"), 10);
      if (backoffSeconds > 0) {
        backoffMs = new Date().getTime() + backoffSeconds * 1000;
      } else {
        backoffMs = 0;
      }
      this.events.emit("backoff", backoffMs);
    }
  }, {
    key: "_checkForRetryAfterHeader",
    value: function _checkForRetryAfterHeader(status, headers) {
      var retryAfter = headers.get("Retry-After");
      if (!retryAfter) {
        return;
      }
      var delay = parseInt(retryAfter, 10) * 1000;
      retryAfter = new Date().getTime() + delay;
      this.events.emit("retry-after", retryAfter);
      return delay;
    }
  }]);
  return HTTP;
}();

exports.default = HTTP;

},{"./errors":136,"./utils":140,"babel-runtime/helpers/asyncToGenerator":11,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/extends":15,"babel-runtime/regenerator":21}],138:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require("events");

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KintoClient = function (_KintoClientBase) {
  (0, _inherits3.default)(KintoClient, _KintoClientBase);

  function KintoClient(remote) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, KintoClient);

    var events = options.events || new _events.EventEmitter();

    return (0, _possibleConstructorReturn3.default)(this, (KintoClient.__proto__ || Object.getPrototypeOf(KintoClient)).call(this, remote, Object.assign({ events: events }, options)));
  }

  return KintoClient;
}(_base2.default);

// This is a hack to avoid Browserify to expose the above class
// at `new KintoClient()` instead of `new KintoClient.default()`.
// See https://github.com/Kinto/kinto-http.js/issues/77


exports.default = KintoClient;
if ((typeof module === "undefined" ? "undefined" : (0, _typeof3.default)(module)) === "object") {
  module.exports = KintoClient;
}

},{"./base":131,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17,"babel-runtime/helpers/typeof":20,"events":123}],139:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports.createRequest = createRequest;
exports.updateRequest = updateRequest;
exports.jsonPatchPermissionsRequest = jsonPatchPermissionsRequest;
exports.deleteRequest = deleteRequest;
exports.addAttachmentRequest = addAttachmentRequest;

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestDefaults = {
  safe: false,
  // check if we should set default content type here
  headers: {},
  permissions: undefined,
  data: undefined,
  patch: false
};

/**
 * @private
 */
function safeHeader(safe, last_modified) {
  if (!safe) {
    return {};
  }
  if (last_modified) {
    return { "If-Match": "\"" + last_modified + "\"" };
  }
  return { "If-None-Match": "*" };
}

/**
 * @private
 */
function createRequest(path, _ref) {
  var data = _ref.data,
      permissions = _ref.permissions;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _requestDefaults$opti = (0, _extends3.default)({}, requestDefaults, options),
      headers = _requestDefaults$opti.headers,
      safe = _requestDefaults$opti.safe;

  return {
    method: data && data.id ? "PUT" : "POST",
    path: path,
    headers: (0, _extends3.default)({}, headers, safeHeader(safe)),
    body: { data: data, permissions: permissions }
  };
}

/**
 * @private
 */
function updateRequest(path, _ref2) {
  var data = _ref2.data,
      permissions = _ref2.permissions;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _requestDefaults$opti2 = (0, _extends3.default)({}, requestDefaults, options),
      headers = _requestDefaults$opti2.headers,
      safe = _requestDefaults$opti2.safe,
      patch = _requestDefaults$opti2.patch;

  var _data$options = (0, _extends3.default)({}, data, options),
      last_modified = _data$options.last_modified;

  if (Object.keys((0, _utils.omit)(data, "id", "last_modified")).length === 0) {
    data = undefined;
  }

  return {
    method: patch ? "PATCH" : "PUT",
    path: path,
    headers: (0, _extends3.default)({}, headers, safeHeader(safe, last_modified)),
    body: { data: data, permissions: permissions }
  };
}

/**
 * @private
 */
function jsonPatchPermissionsRequest(path, permissions, opType) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var _requestDefaults$opti3 = (0, _extends3.default)({}, requestDefaults, options),
      headers = _requestDefaults$opti3.headers,
      safe = _requestDefaults$opti3.safe,
      last_modified = _requestDefaults$opti3.last_modified;

  var ops = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(permissions)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
          type = _step$value[0],
          principals = _step$value[1];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = principals[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var principal = _step2.value;

          ops.push({
            op: opType,
            path: "/permissions/" + type + "/" + principal
          });
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    method: "PATCH",
    path: path,
    headers: (0, _extends3.default)({}, headers, safeHeader(safe, last_modified), {
      "Content-Type": "application/json-patch+json"
    }),
    body: ops
  };
}

/**
 * @private
 */
function deleteRequest(path) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _requestDefaults$opti4 = (0, _extends3.default)({}, requestDefaults, options),
      headers = _requestDefaults$opti4.headers,
      safe = _requestDefaults$opti4.safe,
      last_modified = _requestDefaults$opti4.last_modified;

  if (safe && !last_modified) {
    throw new Error("Safe concurrency check requires a last_modified value.");
  }
  return {
    method: "DELETE",
    path: path,
    headers: (0, _extends3.default)({}, headers, safeHeader(safe, last_modified))
  };
}

/**
 * @private
 */
function addAttachmentRequest(path, dataURI) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      data = _ref3.data,
      permissions = _ref3.permissions;

  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var _requestDefaults$opti5 = (0, _extends3.default)({}, requestDefaults, options),
      headers = _requestDefaults$opti5.headers,
      safe = _requestDefaults$opti5.safe,
      gzipped = _requestDefaults$opti5.gzipped;

  var _data$options2 = (0, _extends3.default)({}, data, options),
      last_modified = _data$options2.last_modified;

  var body = { data: data, permissions: permissions };
  var formData = (0, _utils.createFormData)(dataURI, body, options);

  var customPath = gzipped != null ? customPath = path + "?gzipped=" + (gzipped ? "true" : "false") : path;

  return {
    method: "POST",
    path: customPath,
    headers: (0, _extends3.default)({}, headers, safeHeader(safe, last_modified)),
    body: formData
  };
}

},{"./utils":140,"babel-runtime/helpers/extends":15,"babel-runtime/helpers/slicedToArray":18}],140:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pMap = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _toArray2 = require("babel-runtime/helpers/toArray");

var _toArray3 = _interopRequireDefault(_toArray2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Maps a list to promises using the provided mapping function, executes them
 * sequentially then returns a Promise resolving with ordered results obtained.
 * Think of this as a sequential Promise.all.
 *
 * @private
 * @param  {Array}    list The list to map.
 * @param  {Function} fn   The mapping function.
 * @return {Promise}
 */
var pMap = exports.pMap = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(list, fn) {
    var results;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            results = [];
            _context2.next = 3;
            return list.reduce(function () {
              var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(promise, entry) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return promise;

                      case 2:
                        _context.t0 = results;
                        _context.next = 5;
                        return fn(entry);

                      case 5:
                        _context.t1 = _context.sent;
                        results = _context.t0.concat.call(_context.t0, _context.t1);

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }(), Promise.resolve());

          case 3:
            return _context2.abrupt("return", results);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function pMap(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Takes an object and returns a copy of it with the provided keys omitted.
 *
 * @private
 * @param  {Object}    obj  The source object.
 * @param  {...String} keys The keys to omit.
 * @return {Object}
 */


exports.partition = partition;
exports.delay = delay;
exports.omit = omit;
exports.toDataBody = toDataBody;
exports.qsify = qsify;
exports.checkVersion = checkVersion;
exports.support = support;
exports.capable = capable;
exports.nobatch = nobatch;
exports.isObject = isObject;
exports.parseDataURL = parseDataURL;
exports.extractFileInfo = extractFileInfo;
exports.createFormData = createFormData;
exports.cleanUndefinedProperties = cleanUndefinedProperties;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Chunks an array into n pieces.
 *
 * @private
 * @param  {Array}  array
 * @param  {Number} n
 * @return {Array}
 */
function partition(array, n) {
  if (n <= 0) {
    return array;
  }
  return array.reduce(function (acc, x, i) {
    if (i === 0 || i % n === 0) {
      acc.push([x]);
    } else {
      acc[acc.length - 1].push(x);
    }
    return acc;
  }, []);
}

/**
 * Returns a Promise always resolving after the specified amount in milliseconds.
 *
 * @return Promise<void>
 */
function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}function omit(obj) {
  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return Object.keys(obj).reduce(function (acc, key) {
    if (!keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

/**
 * Always returns a resource data object from the provided argument.
 *
 * @private
 * @param  {Object|String} resource
 * @return {Object}
 */
function toDataBody(resource) {
  if (isObject(resource)) {
    return resource;
  }
  if (typeof resource === "string") {
    return { id: resource };
  }
  throw new Error("Invalid argument.");
}

/**
 * Transforms an object into an URL query string, stripping out any undefined
 * values.
 *
 * @param  {Object} obj
 * @return {String}
 */
function qsify(obj) {
  var encode = function encode(v) {
    return encodeURIComponent(typeof v === "boolean" ? String(v) : v);
  };
  var stripUndefined = function stripUndefined(o) {
    return JSON.parse(JSON.stringify(o));
  };
  var stripped = stripUndefined(obj);
  return Object.keys(stripped).map(function (k) {
    var ks = encode(k) + "=";
    if (Array.isArray(stripped[k])) {
      return ks + stripped[k].map(function (v) {
        return encode(v);
      }).join(",");
    } else {
      return ks + encode(stripped[k]);
    }
  }).join("&");
}

/**
 * Checks if a version is within the provided range.
 *
 * @param  {String} version    The version to check.
 * @param  {String} minVersion The minimum supported version (inclusive).
 * @param  {String} maxVersion The minimum supported version (exclusive).
 * @throws {Error} If the version is outside of the provided range.
 */
function checkVersion(version, minVersion, maxVersion) {
  var extract = function extract(str) {
    return str.split(".").map(function (x) {
      return parseInt(x, 10);
    });
  };

  var _extract = extract(version),
      _extract2 = (0, _slicedToArray3.default)(_extract, 2),
      verMajor = _extract2[0],
      verMinor = _extract2[1];

  var _extract3 = extract(minVersion),
      _extract4 = (0, _slicedToArray3.default)(_extract3, 2),
      minMajor = _extract4[0],
      minMinor = _extract4[1];

  var _extract5 = extract(maxVersion),
      _extract6 = (0, _slicedToArray3.default)(_extract5, 2),
      maxMajor = _extract6[0],
      maxMinor = _extract6[1];

  var checks = [verMajor < minMajor, verMajor === minMajor && verMinor < minMinor, verMajor > maxMajor, verMajor === maxMajor && verMinor >= maxMinor];
  if (checks.some(function (x) {
    return x;
  })) {
    throw new Error("Version " + version + " doesn't satisfy " + minVersion + " <= x < " + maxVersion);
  }
}

/**
 * Generates a decorator function ensuring a version check is performed against
 * the provided requirements before executing it.
 *
 * @param  {String} min The required min version (inclusive).
 * @param  {String} max The required max version (inclusive).
 * @return {Function}
 */
function support(min, max) {
  return function (target, key, descriptor) {
    var fn = descriptor.value;
    return {
      configurable: true,
      get: function get() {
        var _this = this;

        var wrappedMethod = function wrappedMethod() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          // "this" is the current instance which its method is decorated.
          var client = "client" in _this ? _this.client : _this;
          return client.fetchHTTPApiVersion().then(function (version) {
            return checkVersion(version, min, max);
          }).then(function () {
            return fn.apply(_this, args);
          });
        };
        Object.defineProperty(this, key, {
          value: wrappedMethod,
          configurable: true,
          writable: true
        });
        return wrappedMethod;
      }
    };
  };
}

/**
 * Generates a decorator function ensuring that the specified capabilities are
 * available on the server before executing it.
 *
 * @param  {Array<String>} capabilities The required capabilities.
 * @return {Function}
 */
function capable(capabilities) {
  return function (target, key, descriptor) {
    var fn = descriptor.value;
    return {
      configurable: true,
      get: function get() {
        var _this2 = this;

        var wrappedMethod = function wrappedMethod() {
          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          // "this" is the current instance which its method is decorated.
          var client = "client" in _this2 ? _this2.client : _this2;
          return client.fetchServerCapabilities().then(function (available) {
            var missing = capabilities.filter(function (c) {
              return !(c in available);
            });
            if (missing.length > 0) {
              var missingStr = missing.join(", ");
              throw new Error("Required capabilities " + missingStr + " not present on server");
            }
          }).then(function () {
            return fn.apply(_this2, args);
          });
        };
        Object.defineProperty(this, key, {
          value: wrappedMethod,
          configurable: true,
          writable: true
        });
        return wrappedMethod;
      }
    };
  };
}

/**
 * Generates a decorator function ensuring an operation is not performed from
 * within a batch request.
 *
 * @param  {String} message The error message to throw.
 * @return {Function}
 */
function nobatch(message) {
  return function (target, key, descriptor) {
    var fn = descriptor.value;
    return {
      configurable: true,
      get: function get() {
        var _this3 = this;

        var wrappedMethod = function wrappedMethod() {
          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          // "this" is the current instance which its method is decorated.
          if (_this3._isBatch) {
            throw new Error(message);
          }
          return fn.apply(_this3, args);
        };
        Object.defineProperty(this, key, {
          value: wrappedMethod,
          configurable: true,
          writable: true
        });
        return wrappedMethod;
      }
    };
  };
}

/**
 * Returns true if the specified value is an object (i.e. not an array nor null).
 * @param  {Object} thing The value to inspect.
 * @return {bool}
 */
function isObject(thing) {
  return (typeof thing === "undefined" ? "undefined" : (0, _typeof3.default)(thing)) === "object" && thing !== null && !Array.isArray(thing);
}

/**
 * Parses a data url.
 * @param  {String} dataURL The data url.
 * @return {Object}
 */
function parseDataURL(dataURL) {
  var regex = /^data:(.*);base64,(.*)/;
  var match = dataURL.match(regex);
  if (!match) {
    throw new Error("Invalid data-url: " + String(dataURL).substr(0, 32) + "...");
  }
  var props = match[1];
  var base64 = match[2];

  var _props$split = props.split(";"),
      _props$split2 = (0, _toArray3.default)(_props$split),
      type = _props$split2[0],
      rawParams = _props$split2.slice(1);

  var params = rawParams.reduce(function (acc, param) {
    var _param$split = param.split("="),
        _param$split2 = (0, _slicedToArray3.default)(_param$split, 2),
        key = _param$split2[0],
        value = _param$split2[1];

    return (0, _extends4.default)({}, acc, (0, _defineProperty3.default)({}, key, value));
  }, {});
  return (0, _extends4.default)({}, params, { type: type, base64: base64 });
}

/**
 * Extracts file information from a data url.
 * @param  {String} dataURL The data url.
 * @return {Object}
 */
function extractFileInfo(dataURL) {
  var _parseDataURL = parseDataURL(dataURL),
      name = _parseDataURL.name,
      type = _parseDataURL.type,
      base64 = _parseDataURL.base64;

  var binary = atob(base64);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  var blob = new Blob([new Uint8Array(array)], { type: type });
  return { blob: blob, name: name };
}

/**
 * Creates a FormData instance from a data url and an existing JSON response
 * body.
 * @param  {String} dataURL            The data url.
 * @param  {Object} body               The response body.
 * @param  {Object} [options={}]       The options object.
 * @param  {Object} [options.filename] Force attachment file name.
 * @return {FormData}
 */
function createFormData(dataURL, body) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$filename = options.filename,
      filename = _options$filename === undefined ? "untitled" : _options$filename;

  var _extractFileInfo = extractFileInfo(dataURL),
      blob = _extractFileInfo.blob,
      name = _extractFileInfo.name;

  var formData = new FormData();
  formData.append("attachment", blob, name || filename);
  for (var property in body) {
    if (typeof body[property] !== "undefined") {
      formData.append(property, JSON.stringify(body[property]));
    }
  }
  return formData;
}

/**
 * Clones an object with all its undefined keys removed.
 * @private
 */
function cleanUndefinedProperties(obj) {
  var result = {};
  for (var key in obj) {
    if (typeof obj[key] !== "undefined") {
      result[key] = obj[key];
    }
  }
  return result;
}

},{"babel-runtime/helpers/asyncToGenerator":11,"babel-runtime/helpers/defineProperty":14,"babel-runtime/helpers/extends":15,"babel-runtime/helpers/slicedToArray":18,"babel-runtime/helpers/toArray":19,"babel-runtime/helpers/typeof":20,"babel-runtime/regenerator":21}]},{},[138])(138)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLW1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvdXVpZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL3YxLmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJzcmMvYmFzZS5qcyIsInNyYy9iYXRjaC5qcyIsInNyYy9idWNrZXQuanMiLCJzcmMvY29sbGVjdGlvbi5qcyIsInNyYy9lbmRwb2ludC5qcyIsInNyYy9lcnJvcnMuanMiLCJzcmMvaHR0cC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9yZXF1ZXN0cy5qcyIsInNyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Z0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2dEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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aUMsSUFBakMsRUFBcUQ7QUFBQSxNQUFkLE9BQWMsdUVBQUosRUFBSTtBQUFBLDBCQUN4QixPQUR3QixDQUNsRCxRQURrRDtBQUFBLE1BQ2xELFFBRGtELHFDQUN2QyxVQUR1Qzs7QUFBQSx5QkFFbkMsZ0JBQWdCLE9BQWhCLENBRm1DO0FBQUEsTUFFbEQsSUFGa0Qsb0JBRWxELElBRmtEO0FBQUEsTUFFNUMsSUFGNEMsb0JBRTVDLElBRjRDOztBQUcxRCxNQUFNLFdBQVcsSUFBSSxRQUFKLEVBQWpCO0FBQ0EsV0FBUyxNQUFULENBQWdCLFlBQWhCLEVBQThCLElBQTlCLEVBQW9DLFFBQVEsUUFBNUM7QUFDQSxPQUFLLElBQU0sUUFBWCxJQUF1QixJQUF2QixFQUE2QjtBQUMzQixRQUFJLE9BQU8sS0FBSyxRQUFMLENBQVAsS0FBMEIsV0FBOUIsRUFBMkM7QUFDekMsZUFBUyxNQUFULENBQWdCLFFBQWhCLEVBQTBCLEtBQUssU0FBTCxDQUFlLEtBQUssUUFBTCxDQUFmLENBQTFCO0FBQ0Q7QUFDRjtBQUNELFNBQU8sUUFBUDtBQUNEOztBQUVEOzs7O0FBSU8sU0FBUyx3QkFBVCxDQUFrQyxHQUFsQyxFQUF1QztBQUM1QyxNQUFNLFNBQVMsRUFBZjtBQUNBLE9BQUssSUFBTSxHQUFYLElBQWtCLEdBQWxCLEVBQXVCO0FBQ3JCLFFBQUksT0FBTyxJQUFJLEdBQUosQ0FBUCxLQUFvQixXQUF4QixFQUFxQztBQUNuQyxhQUFPLEdBQVAsSUFBYyxJQUFJLEdBQUosQ0FBZDtBQUNEO0FBQ0Y7QUFDRCxTQUFPLE1BQVA7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb21cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3Byb21pc2UgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9wcm9taXNlXCIpO1xuXG52YXIgX3Byb21pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvbWlzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgX3Byb21pc2UyLmRlZmF1bHQoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gc3RlcChrZXksIGFyZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfcHJvbWlzZTIuZGVmYXVsdC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RlcChcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHN0ZXAoXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdGVwKFwibmV4dFwiKTtcbiAgICB9KTtcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIik7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9jcmVhdGVcIik7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAoKHR5cGVvZiBjYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShjYWxsKSkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpID8gYXJyIDogKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5mcm9tO1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpO1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCkge1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3ltYm9sO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjMnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHJlc3VsdCA9IGdldEtleXMoaXQpO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYgKGdldFN5bWJvbHMpIHtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpO1xuICAgIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAoc3ltYm9scy5sZW5ndGggPiBpKSBpZiAoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYga2V5IGluIGV4cG9ydHMpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgQlJFQUsgPSB7fTtcbnZhciBSRVRVUk4gPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUikge1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSk7XG4gIHZhciBmID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmIChpc0FycmF5SXRlcihpdGVyRm4pKSBmb3IgKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOykge1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCBhcmdzLCB0aGF0KSB7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG4iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSBhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gKCFCVUdHWSAmJiAkbmF0aXZlKSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJ2YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbiAoKSB7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYywgc2tpcENsb3NpbmcpIHtcbiAgaWYgKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IFs3XTtcbiAgICB2YXIgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGRvbmU6IHNhZmUgPSB0cnVlIH07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIGlzTm9kZSA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChoZWFkKSBub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChpc05vZGUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgU2FmYXJpIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMzOVxuICB9IGVsc2UgaWYgKE9ic2VydmVyICYmICEoZ2xvYmFsLm5hdmlnYXRvciAmJiBnbG9iYWwubmF2aWdhdG9yLnN0YW5kYWxvbmUpKSB7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWU7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gICAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYgKCFoZWFkKSB7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjUuNC4xLjUgTmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5cbmZ1bmN0aW9uIFByb21pc2VDYXBhYmlsaXR5KEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIChDKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG4iLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGdPUE4gPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmY7XG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uIChpdCkge1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcbiIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4geyBlOiBmYWxzZSwgdjogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBlOiB0cnVlLCB2OiBlIH07XG4gIH1cbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIHNhZmUpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzYWZlICYmIHRhcmdldFtrZXldKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG4iLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoIChlKSB7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYgKGJ1Z2d5KSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmIChERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSBkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcbiIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuIiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbiIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZiAobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSkgZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwgeyB2YWx1ZTogd2tzRXh0LmYobmFtZSkgfSk7XG59O1xuIiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikgeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKE8pO1xuICAgIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKG1hcHBpbmcpIG1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKSB7XG4gICAgICBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDKCk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvciAocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IGNyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcbiIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IHNldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXQgfSk7XG4iLCIiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyICRQcm9taXNlID0gZ2xvYmFsW1BST01JU0VdO1xudmFyIGlzTm9kZSA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xudmFyIGVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIEludGVybmFsLCBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIE93blByb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlLnJlc29sdmUoMSk7XG4gICAgdmFyIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhlbXB0eSwgZW1wdHkpO1xuICAgIH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJykgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5faCA9PSAyKSBvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSBydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpIG9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgdW5oYW5kbGVkID0gaXNVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgdmFyIHJlc3VsdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pIHtcbiAgICAgICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmICh1bmhhbmRsZWQgJiYgcmVzdWx0LmUpIHRocm93IHJlc3VsdC52O1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICByZXR1cm4gcHJvbWlzZS5faCAhPT0gMSAmJiAocHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jKS5sZW5ndGggPT09IDA7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpIHtcbiAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3YgfSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYgKCFwcm9taXNlLl9hKSBwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgdmFyIHRoZW47XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmICh0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0geyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgJHJlamVjdC5jYWxsKHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9hKSB0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX3MpIG5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbiAgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgICByZXR1cm4gQyA9PT0gJFByb21pc2UgfHwgQyA9PT0gV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFByb21pc2U6ICRQcm9taXNlIH0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICB2YXIgJCRyZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoTElCUkFSWSAmJiB0aGlzID09PSBXcmFwcGVyID8gJFByb21pc2UgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyICRpbmRleCA9IGluZGV4Kys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbiAoaXRlcmF0ZWQpIHtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBpbmRleCA9IHRoaXMuX2k7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IE8ubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7IHZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2UgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIE1FVEEgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZO1xudmFyICRmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciB3a3NEZWZpbmUgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJyk7XG52YXIgZW51bUtleXMgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBfY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdPUE5FeHQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKTtcbnZhciAkR09QRCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJyk7XG52YXIgJERQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUEQgPSAkR09QRC5mO1xudmFyIGRQID0gJERQLmY7XG52YXIgZ09QTiA9IGdPUE5FeHQuZjtcbnZhciAkU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciAkSlNPTiA9IGdsb2JhbC5KU09OO1xudmFyIF9zdHJpbmdpZnkgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgSElEREVOID0gd2tzKCdfaGlkZGVuJyk7XG52YXIgVE9fUFJJTUlUSVZFID0gd2tzKCd0b1ByaW1pdGl2ZScpO1xudmFyIGlzRW51bSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKTtcbnZhciBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJyk7XG52YXIgT1BTeW1ib2xzID0gc2hhcmVkKCdvcC1zeW1ib2xzJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3RbUFJPVE9UWVBFXTtcbnZhciBVU0VfTkFUSVZFID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcbnZhciBRT2JqZWN0ID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24gKGl0LCBrZXksIEQpIHtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmIChwcm90b0Rlc2MpIGRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYgKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pIGRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHRhZykge1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCkge1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvKSAkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUQuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoaXQsIEhJRERFTikpIGRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSBpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHsgZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSkgfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCkge1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSk7XG4gIHZhciBpID0gMDtcbiAgdmFyIGwgPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGwgPiBpKSAkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKSB7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KSB7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmICh0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICBpdCA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZiAoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSBELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHZhciBuYW1lcyA9IGdPUE4odG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmICghaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkge1xuICB2YXIgSVNfT1AgPSBpdCA9PT0gT2JqZWN0UHJvdG87XG4gIHZhciBuYW1lcyA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSkgcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpIHRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8pICRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKSB0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmIChERVNDUklQVE9SUyAmJiBzZXR0ZXIpIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywgeyBjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldCB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSkge1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgU3ltYm9sOiAkU3ltYm9sIH0pO1xuXG5mb3IgKHZhciBlczZTeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGogPSAwOyBlczZTeW1ib2xzLmxlbmd0aCA+IGo7KXdrcyhlczZTeW1ib2xzW2orK10pO1xuXG5mb3IgKHZhciB3ZWxsS25vd25TeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgayA9IDA7IHdlbGxLbm93blN5bWJvbHMubGVuZ3RoID4gazspIHdrc0RlZmluZSh3ZWxsS25vd25TeW1ib2xzW2srK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKHN5bSkge1xuICAgIGlmICghaXNTeW1ib2woc3ltKSkgdGhyb3cgVHlwZUVycm9yKHN5bSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICAgIGZvciAodmFyIGtleSBpbiBTeW1ib2xSZWdpc3RyeSkgaWYgKFN5bWJvbFJlZ2lzdHJ5W2tleV0gPT09IHN5bSkgcmV0dXJuIGtleTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHsgYTogUyB9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpIHtcbiAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgdmFyIGkgPSAxO1xuICAgIHZhciByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICAkcmVwbGFjZXIgPSByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYgKCFpc09iamVjdChyZXBsYWNlcikgJiYgaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpIHJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIGlmICghaXNBcnJheShyZXBsYWNlcikpIHJlcGxhY2VyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgJHJlcGxhY2VyID09ICdmdW5jdGlvbicpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZiAoIWlzU3ltYm9sKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtZmluYWxseVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1Byb21pc2UnLCB7ICdmaW5hbGx5JzogZnVuY3Rpb24gKG9uRmluYWxseSkge1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBjb3JlLlByb21pc2UgfHwgZ2xvYmFsLlByb21pc2UpO1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBvbkZpbmFsbHkgPT0gJ2Z1bmN0aW9uJztcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB4OyB9KTtcbiAgICB9IDogb25GaW5hbGx5LFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSk7XG4gICAgfSA6IG9uRmluYWxseVxuICApO1xufSB9KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtdHJ5XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUHJvbWlzZScsIHsgJ3RyeSc6IGZ1bmN0aW9uIChjYWxsYmFja2ZuKSB7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYodGhpcyk7XG4gIHZhciByZXN1bHQgPSBwZXJmb3JtKGNhbGxiYWNrZm4pO1xuICAocmVzdWx0LmUgPyBwcm9taXNlQ2FwYWJpbGl0eS5yZWplY3QgOiBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlKShyZXN1bHQudik7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufSB9KTtcbiIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpO1xuIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdvYnNlcnZhYmxlJyk7XG4iLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG52YXIgRE9NSXRlcmFibGVzID0gKCdDU1NSdWxlTGlzdCxDU1NTdHlsZURlY2xhcmF0aW9uLENTU1ZhbHVlTGlzdCxDbGllbnRSZWN0TGlzdCxET01SZWN0TGlzdCxET01TdHJpbmdMaXN0LCcgK1xuICAnRE9NVG9rZW5MaXN0LERhdGFUcmFuc2Zlckl0ZW1MaXN0LEZpbGVMaXN0LEhUTUxBbGxDb2xsZWN0aW9uLEhUTUxDb2xsZWN0aW9uLEhUTUxGb3JtRWxlbWVudCxIVE1MU2VsZWN0RWxlbWVudCwnICtcbiAgJ01lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsJyArXG4gICdTVkdQYXRoU2VnTGlzdCxTVkdQb2ludExpc3QsU1ZHU3RyaW5nTGlzdCxTVkdUcmFuc2Zvcm1MaXN0LFNvdXJjZUJ1ZmZlckxpc3QsU3R5bGVTaGVldExpc3QsVGV4dFRyYWNrQ3VlTGlzdCwnICtcbiAgJ1RleHRUcmFja0xpc3QsVG91Y2hMaXN0Jykuc3BsaXQoJywnKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBET01JdGVyYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBET01JdGVyYWJsZXNbaV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlIHx8IG9iamVjdENyZWF0ZVBvbHlmaWxsXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IG9iamVjdEtleXNQb2x5ZmlsbFxudmFyIGJpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCB8fCBmdW5jdGlvbkJpbmRQb2x5ZmlsbFxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19ldmVudHMnKSkge1xuICAgIHRoaXMuX2V2ZW50cyA9IG9iamVjdENyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG52YXIgaGFzRGVmaW5lUHJvcGVydHk7XG50cnkge1xuICB2YXIgbyA9IHt9O1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgJ3gnLCB7IHZhbHVlOiAwIH0pO1xuICBoYXNEZWZpbmVQcm9wZXJ0eSA9IG8ueCA9PT0gMDtcbn0gY2F0Y2ggKGVycikgeyBoYXNEZWZpbmVQcm9wZXJ0eSA9IGZhbHNlIH1cbmlmIChoYXNEZWZpbmVQcm9wZXJ0eSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgICAvLyBjaGVjayB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhIHBvc2l0aXZlIG51bWJlciAod2hvc2UgdmFsdWUgaXMgemVybyBvclxuICAgICAgLy8gZ3JlYXRlciBhbmQgbm90IGEgTmFOKS5cbiAgICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IGFyZyAhPT0gYXJnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gICAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG59XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJuXCIgYXJndW1lbnQgbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG4vLyBUaGVzZSBzdGFuZGFsb25lIGVtaXQqIGZ1bmN0aW9ucyBhcmUgdXNlZCB0byBvcHRpbWl6ZSBjYWxsaW5nIG9mIGV2ZW50XG4vLyBoYW5kbGVycyBmb3IgZmFzdCBjYXNlcyBiZWNhdXNlIGVtaXQoKSBpdHNlbGYgb2Z0ZW4gaGFzIGEgdmFyaWFibGUgbnVtYmVyIG9mXG4vLyBhcmd1bWVudHMgYW5kIGNhbiBiZSBkZW9wdGltaXplZCBiZWNhdXNlIG9mIHRoYXQuIFRoZXNlIGZ1bmN0aW9ucyBhbHdheXMgaGF2ZVxuLy8gdGhlIHNhbWUgbnVtYmVyIG9mIGFyZ3VtZW50cyBhbmQgdGh1cyBkbyBub3QgZ2V0IGRlb3B0aW1pemVkLCBzbyB0aGUgY29kZVxuLy8gaW5zaWRlIHRoZW0gY2FuIGV4ZWN1dGUgZmFzdGVyLlxuZnVuY3Rpb24gZW1pdE5vbmUoaGFuZGxlciwgaXNGbiwgc2VsZikge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmNhbGwoc2VsZik7XG4gIGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBsaXN0ZW5lcnNbaV0uY2FsbChzZWxmKTtcbiAgfVxufVxuZnVuY3Rpb24gZW1pdE9uZShoYW5kbGVyLCBpc0ZuLCBzZWxmLCBhcmcxKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmLCBhcmcxKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYsIGFyZzEpO1xuICB9XG59XG5mdW5jdGlvbiBlbWl0VHdvKGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZzEsIGFyZzIpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5jYWxsKHNlbGYsIGFyZzEsIGFyZzIpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmNhbGwoc2VsZiwgYXJnMSwgYXJnMik7XG4gIH1cbn1cbmZ1bmN0aW9uIGVtaXRUaHJlZShoYW5kbGVyLCBpc0ZuLCBzZWxmLCBhcmcxLCBhcmcyLCBhcmczKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtaXRNYW55KGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZ3MpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5hcHBseShzZWxmLCBhcmdzKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGV2ZW50cztcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT0gbnVsbCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKCFoYW5kbGVyKVxuICAgIHJldHVybiBmYWxzZTtcblxuICB2YXIgaXNGbiA9IHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nO1xuICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICBzd2l0Y2ggKGxlbikge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgIGNhc2UgMTpcbiAgICAgIGVtaXROb25lKGhhbmRsZXIsIGlzRm4sIHRoaXMpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgZW1pdE9uZShoYW5kbGVyLCBpc0ZuLCB0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgZW1pdFR3byhoYW5kbGVyLCBpc0ZuLCB0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICBlbWl0VGhyZWUoaGFuZGxlciwgaXNGbiwgdGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSk7XG4gICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgIGRlZmF1bHQ6XG4gICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGVtaXRNYW55KGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoIWV2ZW50cykge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gb2JqZWN0Q3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKCFleGlzdGluZykge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgICBpZiAocHJlcGVuZCkge1xuICAgICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgaWYgKCFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIG0gPSAkZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgICBpZiAobSAmJiBtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtKSB7XG4gICAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyBcIicgKyBTdHJpbmcodHlwZSkgKyAnXCIgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdC4nKTtcbiAgICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlID09PSAnb2JqZWN0JyAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJyVzOiAlcycsIHcubmFtZSwgdy5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCwgYXJndW1lbnRzWzBdKTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCwgYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0LCBhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgIGFyZ3VtZW50c1syXSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKVxuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3MpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBiaW5kLmNhbGwob25jZVdyYXBwZXIsIHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoIWV2ZW50cylcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAoIWxpc3QpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gb2JqZWN0Q3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoIWV2ZW50cylcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmICghZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gb2JqZWN0Q3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0pIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IG9iamVjdENyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gb2JqZWN0S2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gb2JqZWN0Q3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgdmFyIGV2bGlzdGVuZXI7XG4gIHZhciByZXQ7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKCFldmVudHMpXG4gICAgcmV0ID0gW107XG4gIGVsc2Uge1xuICAgIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gICAgaWYgKCFldmxpc3RlbmVyKVxuICAgICAgcmV0ID0gW107XG4gICAgZWxzZSBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgICByZXQgPSBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXTtcbiAgICBlbHNlXG4gICAgICByZXQgPSB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3Qub3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG4vLyBBYm91dCAxLjV4IGZhc3RlciB0aGFuIHRoZSB0d28tYXJnIHZlcnNpb24gb2YgQXJyYXkjc3BsaWNlKCkuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICh2YXIgaSA9IGluZGV4LCBrID0gaSArIDEsIG4gPSBsaXN0Lmxlbmd0aDsgayA8IG47IGkgKz0gMSwgayArPSAxKVxuICAgIGxpc3RbaV0gPSBsaXN0W2tdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9iamVjdENyZWF0ZVBvbHlmaWxsKHByb3RvKSB7XG4gIHZhciBGID0gZnVuY3Rpb24oKSB7fTtcbiAgRi5wcm90b3R5cGUgPSBwcm90bztcbiAgcmV0dXJuIG5ldyBGO1xufVxuZnVuY3Rpb24gb2JqZWN0S2V5c1BvbHlmaWxsKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrIGluIG9iaikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGspKSB7XG4gICAga2V5cy5wdXNoKGspO1xuICB9XG4gIHJldHVybiBrO1xufVxuZnVuY3Rpb24gZnVuY3Rpb25CaW5kUG9seWZpbGwoY29udGV4dCkge1xuICB2YXIgZm4gPSB0aGlzO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICB9O1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vLyBUaGlzIG1ldGhvZCBvZiBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QgbmVlZHMgdG8gYmVcbi8vIGtlcHQgaWRlbnRpY2FsIHRvIHRoZSB3YXkgaXQgaXMgb2J0YWluZWQgaW4gcnVudGltZS5qc1xudmFyIGcgPSAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzIH0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuXG4vLyBVc2UgYGdldE93blByb3BlcnR5TmFtZXNgIGJlY2F1c2Ugbm90IGFsbCBicm93c2VycyBzdXBwb3J0IGNhbGxpbmdcbi8vIGBoYXNPd25Qcm9wZXJ0eWAgb24gdGhlIGdsb2JhbCBgc2VsZmAgb2JqZWN0IGluIGEgd29ya2VyLiBTZWUgIzE4My5cbnZhciBoYWRSdW50aW1lID0gZy5yZWdlbmVyYXRvclJ1bnRpbWUgJiZcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZykuaW5kZXhPZihcInJlZ2VuZXJhdG9yUnVudGltZVwiKSA+PSAwO1xuXG4vLyBTYXZlIHRoZSBvbGQgcmVnZW5lcmF0b3JSdW50aW1lIGluIGNhc2UgaXQgbmVlZHMgdG8gYmUgcmVzdG9yZWQgbGF0ZXIuXG52YXIgb2xkUnVudGltZSA9IGhhZFJ1bnRpbWUgJiYgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG5cbi8vIEZvcmNlIHJlZXZhbHV0YXRpb24gb2YgcnVudGltZS5qcy5cbmcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3J1bnRpbWVcIik7XG5cbmlmIChoYWRSdW50aW1lKSB7XG4gIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHJ1bnRpbWUuXG4gIGcucmVnZW5lcmF0b3JSdW50aW1lID0gb2xkUnVudGltZTtcbn0gZWxzZSB7XG4gIC8vIFJlbW92ZSB0aGUgZ2xvYmFsIHByb3BlcnR5IGFkZGVkIGJ5IHJ1bnRpbWUuanMuXG4gIHRyeSB7XG4gICAgZGVsZXRlIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuICB9IGNhdGNoKGUpIHtcbiAgICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgICAvLyByZXN1bHQgZm9yIHRoaXMgaXRlcmF0aW9uIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgc2FtZVxuICAgICAgICAgIC8vIHJlYXNvbi4gTm90ZSB0aGF0IHJlamVjdGlvbnMgb2YgeWllbGRlZCBQcm9taXNlcyBhcmUgbm90XG4gICAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAgIC8vIHdoZW4gYW4gYXdhaXRlZCBQcm9taXNlIGlzIHJlamVjdGVkLiBUaGlzIGRpZmZlcmVuY2UgaW5cbiAgICAgICAgICAvLyBiZWhhdmlvciBiZXR3ZWVuIHlpZWxkIGFuZCBhd2FpdCBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaXRcbiAgICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgICAvLyByZWplY3Rpb24gKHN3YWxsb3cgaXQgYW5kIGNvbnRpbnVlLCBtYW51YWxseSAudGhyb3cgaXQgYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGdlbmVyYXRvciwgYWJhbmRvbiBpdGVyYXRpb24sIHdoYXRldmVyKS4gV2l0aFxuICAgICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgICAvLyByZWplY3Rpb24gcmVhc29uIG91dHNpZGUgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgc28gdGhlXG4gICAgICAgICAgLy8gb25seSBvcHRpb24gaXMgdG8gdGhyb3cgaXQgZnJvbSB0aGUgYXdhaXQgZXhwcmVzc2lvbiwgYW5kXG4gICAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBydW50aW1lLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEluIHNsb3BweSBtb2RlLCB1bmJvdW5kIGB0aGlzYCByZWZlcnMgdG8gdGhlIGdsb2JhbCBvYmplY3QsIGZhbGxiYWNrIHRvXG4gIC8vIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIGlmIHdlJ3JlIGluIGdsb2JhbCBzdHJpY3QgbW9kZS4gVGhhdCBpcyBzYWRseSBhIGZvcm1cbiAgLy8gb2YgaW5kaXJlY3QgZXZhbCB3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeS5cbiAgKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcyB9KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKVxuKTtcbiIsInZhciB2MSA9IHJlcXVpcmUoJy4vdjEnKTtcbnZhciB2NCA9IHJlcXVpcmUoJy4vdjQnKTtcblxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIHJldHVybiBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxuXG4vLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG52YXIgZ2V0UmFuZG9tVmFsdWVzID0gKHR5cGVvZihjcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YobXNDcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKSk7XG5pZiAoZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xuICAgIHJldHVybiBybmRzODtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyIHJuZHMgPSBuZXcgQXJyYXkoMTYpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWF0aFJORygpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcm5kcztcbiAgfTtcbn1cbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gcm5nKCk7XG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtcbiAgICAgICAgc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICAgICAgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1cbiAgICAgIF07XG4gICAgfVxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IGJ5dGVzVG9VdWlkKGIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxO1xuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge1xuICBwYXJ0aXRpb24sXG4gIHBNYXAsXG4gIHFzaWZ5LFxuICBzdXBwb3J0LFxuICBub2JhdGNoLFxuICB0b0RhdGFCb2R5LFxuICBjbGVhblVuZGVmaW5lZFByb3BlcnRpZXMsXG59IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgSFRUUCBmcm9tIFwiLi9odHRwXCI7XG5pbXBvcnQgZW5kcG9pbnQgZnJvbSBcIi4vZW5kcG9pbnRcIjtcbmltcG9ydCAqIGFzIHJlcXVlc3RzIGZyb20gXCIuL3JlcXVlc3RzXCI7XG5pbXBvcnQgeyBhZ2dyZWdhdGUgfSBmcm9tIFwiLi9iYXRjaFwiO1xuaW1wb3J0IEJ1Y2tldCBmcm9tIFwiLi9idWNrZXRcIjtcbmltcG9ydCB7IGNhcGFibGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKipcbiAqIEN1cnJlbnRseSBzdXBwb3J0ZWQgcHJvdG9jb2wgdmVyc2lvbi5cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBTVVBQT1JURURfUFJPVE9DT0xfVkVSU0lPTiA9IFwidjFcIjtcblxuLyoqXG4gKiBIaWdoIGxldmVsIEhUVFAgY2xpZW50IGZvciB0aGUgS2ludG8gQVBJLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBjbGllbnQgPSBuZXcgS2ludG9DbGllbnQoXCJodHRwczovL2tpbnRvLmRldi5tb3phd3MubmV0L3YxXCIpO1xuICogY2xpZW50LmJ1Y2tldChcImRlZmF1bHRcIilcbiAqICAgIC5jb2xsZWN0aW9uKFwibXktYmxvZ1wiKVxuICogICAgLmNyZWF0ZVJlY29yZCh7dGl0bGU6IFwiRmlyc3QgYXJ0aWNsZVwifSlcbiAqICAgLnRoZW4oY29uc29sZS5sb2cuYmluZChjb25zb2xlKSlcbiAqICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKSk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtpbnRvQ2xpZW50QmFzZSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfSAgICAgICByZW1vdGUgIFRoZSByZW1vdGUgVVJMLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgIFtvcHRpb25zPXt9XSAgICAgICAgICAgICAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gICAgICBbb3B0aW9ucy5zYWZlPXRydWVdICAgICAgICAgICBBZGRzIGNvbmN1cnJlbmN5IGhlYWRlcnMgdG8gZXZlcnkgcmVxdWVzdHMuXG4gICAqIEBwYXJhbSAge0V2ZW50RW1pdHRlcn0gW29wdGlvbnMuZXZlbnRzPUV2ZW50RW1pdHRlcl0gVGhlIGV2ZW50cyBoYW5kbGVyIGluc3RhbmNlLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgIFtvcHRpb25zLmhlYWRlcnM9e31dICAgICAgICAgIFRoZSBrZXktdmFsdWUgaGVhZGVycyB0byBwYXNzIHRvIGVhY2ggcmVxdWVzdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgICAgICBbb3B0aW9ucy5yZXRyeT0wXSAgICAgICAgICAgICBOdW1iZXIgb2YgcmV0cmllcyB3aGVuIHJlcXVlc3QgZmFpbHMgKGRlZmF1bHQ6IDApXG4gICAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgW29wdGlvbnMuYnVja2V0PVwiZGVmYXVsdFwiXSAgICBUaGUgZGVmYXVsdCBidWNrZXQgdG8gdXNlLlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgIFtvcHRpb25zLnJlcXVlc3RNb2RlPVwiY29yc1wiXSAgVGhlIEhUVFAgcmVxdWVzdCBtb2RlIChmcm9tIEVTNiBmZXRjaCBzcGVjKS5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgICAgICBbb3B0aW9ucy50aW1lb3V0PW51bGxdICAgICAgICBUaGUgcmVxdWVzdCB0aW1lb3V0IGluIG1zLCBpZiBhbnkuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihyZW1vdGUsIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICh0eXBlb2YgcmVtb3RlICE9PSBcInN0cmluZ1wiIHx8ICFyZW1vdGUubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJlbW90ZSBVUkw6IFwiICsgcmVtb3RlKTtcbiAgICB9XG4gICAgaWYgKHJlbW90ZVtyZW1vdGUubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSB7XG4gICAgICByZW1vdGUgPSByZW1vdGUuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgICB0aGlzLl9iYWNrb2ZmUmVsZWFzZVRpbWUgPSBudWxsO1xuXG4gICAgdGhpcy5fcmVxdWVzdHMgPSBbXTtcbiAgICB0aGlzLl9pc0JhdGNoID0gISFvcHRpb25zLmJhdGNoO1xuICAgIHRoaXMuX3JldHJ5ID0gb3B0aW9ucy5yZXRyeSB8fCAwO1xuICAgIHRoaXMuX3NhZmUgPSAhIW9wdGlvbnMuc2FmZTtcbiAgICB0aGlzLl9oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuXG4gICAgLy8gcHVibGljIHByb3BlcnRpZXNcbiAgICAvKipcbiAgICAgKiBUaGUgcmVtb3RlIHNlcnZlciBiYXNlIFVSTC5cbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMucmVtb3RlID0gcmVtb3RlO1xuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgc2VydmVyIGluZm9ybWF0aW9uLlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fG51bGx9XG4gICAgICovXG4gICAgdGhpcy5zZXJ2ZXJJbmZvID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBUaGUgZXZlbnQgZW1pdHRlciBpbnN0YW5jZS4gU2hvdWxkIGNvbXBseSB3aXRoIHRoZSBgRXZlbnRFbWl0dGVyYFxuICAgICAqIGludGVyZmFjZS5cbiAgICAgKiBAaWdub3JlXG4gICAgICogQHR5cGUge0NsYXNzfVxuICAgICAqL1xuICAgIHRoaXMuZXZlbnRzID0gb3B0aW9ucy5ldmVudHM7XG5cbiAgICBjb25zdCB7IHJlcXVlc3RNb2RlLCB0aW1lb3V0IH0gPSBvcHRpb25zO1xuICAgIC8qKlxuICAgICAqIFRoZSBIVFRQIGluc3RhbmNlLlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBAdHlwZSB7SFRUUH1cbiAgICAgKi9cbiAgICB0aGlzLmh0dHAgPSBuZXcgSFRUUCh0aGlzLmV2ZW50cywgeyByZXF1ZXN0TW9kZSwgdGltZW91dCB9KTtcbiAgICB0aGlzLl9yZWdpc3RlckhUVFBFdmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmVtb3RlIGVuZHBvaW50IGJhc2UgVVJMLiBTZXR0aW5nIHRoZSB2YWx1ZSB3aWxsIGFsc28gZXh0cmFjdCBhbmRcbiAgICogdmFsaWRhdGUgdGhlIHZlcnNpb24uXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgcmVtb3RlKCkge1xuICAgIHJldHVybiB0aGlzLl9yZW1vdGU7XG4gIH1cblxuICAvKipcbiAgICogQGlnbm9yZVxuICAgKi9cbiAgc2V0IHJlbW90ZSh1cmwpIHtcbiAgICBsZXQgdmVyc2lvbjtcbiAgICB0cnkge1xuICAgICAgdmVyc2lvbiA9IHVybC5tYXRjaCgvXFwvKHZcXGQrKVxcLz8kLylbMV07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcmVtb3RlIFVSTCBtdXN0IGNvbnRhaW4gdGhlIHZlcnNpb246IFwiICsgdXJsKTtcbiAgICB9XG4gICAgaWYgKHZlcnNpb24gIT09IFNVUFBPUlRFRF9QUk9UT0NPTF9WRVJTSU9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIHByb3RvY29sIHZlcnNpb246ICR7dmVyc2lvbn1gKTtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3RlID0gdXJsO1xuICAgIHRoaXMuX3ZlcnNpb24gPSB2ZXJzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHNlcnZlciBwcm90b2NvbCB2ZXJzaW9uLCBlZy4gYHYxYC5cbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCB2ZXJzaW9uKCkge1xuICAgIHJldHVybiB0aGlzLl92ZXJzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEJhY2tvZmYgcmVtYWluaW5nIHRpbWUsIGluIG1pbGxpc2Vjb25kcy4gRGVmYXVsdHMgdG8gemVybyBpZiBubyBiYWNrb2ZmIGlzXG4gICAqIG9uZ29pbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnZXQgYmFja29mZigpIHtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGlmICh0aGlzLl9iYWNrb2ZmUmVsZWFzZVRpbWUgJiYgY3VycmVudFRpbWUgPCB0aGlzLl9iYWNrb2ZmUmVsZWFzZVRpbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9iYWNrb2ZmUmVsZWFzZVRpbWUgLSBjdXJyZW50VGltZTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIEhUVFAgZXZlbnRzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlZ2lzdGVySFRUUEV2ZW50cygpIHtcbiAgICAvLyBQcmV2ZW50IHJlZ2lzdGVyaW5nIGV2ZW50IGZyb20gYSBiYXRjaCBjbGllbnQgaW5zdGFuY2VcbiAgICBpZiAoIXRoaXMuX2lzQmF0Y2gpIHtcbiAgICAgIHRoaXMuZXZlbnRzLm9uKFwiYmFja29mZlwiLCBiYWNrb2ZmTXMgPT4ge1xuICAgICAgICB0aGlzLl9iYWNrb2ZmUmVsZWFzZVRpbWUgPSBiYWNrb2ZmTXM7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgYSBidWNrZXQgb2JqZWN0IHRvIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiBpdC5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfSAgbmFtZSAgICAgICAgICAgICAgVGhlIGJ1Y2tldCBuYW1lLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucz17fV0gICAgICBUaGUgcmVxdWVzdCBvcHRpb25zLlxuICAgKiBAcGFyYW0gIHtCb29sZWFufSBbb3B0aW9ucy5zYWZlXSAgICBUaGUgcmVzdWx0aW5nIHNhZmUgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBbb3B0aW9ucy5yZXRyeV0gICBUaGUgcmVzdWx0aW5nIHJldHJ5IG9wdGlvbi5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnMuaGVhZGVyc10gVGhlIGV4dGVuZGVkIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHJldHVybiB7QnVja2V0fVxuICAgKi9cbiAgYnVja2V0KG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgQnVja2V0KHRoaXMsIG5hbWUsIHtcbiAgICAgIGJhdGNoOiB0aGlzLl9pc0JhdGNoLFxuICAgICAgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSxcbiAgICAgIHNhZmU6IHRoaXMuX2dldFNhZmUob3B0aW9ucyksXG4gICAgICByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucyksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGNsaWVudCBcImhlYWRlcnNcIiBmb3IgZXZlcnkgcmVxdWVzdCwgdXBkYXRpbmcgcHJldmlvdXMgaGVhZGVycyAoaWYgYW55KS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGhlYWRlcnMgVGhlIGhlYWRlcnMgdG8gbWVyZ2Ugd2l0aCBleGlzdGluZyBvbmVzLlxuICAgKi9cbiAgc2V0SGVhZGVycyhoZWFkZXJzKSB7XG4gICAgdGhpcy5faGVhZGVycyA9IHtcbiAgICAgIC4uLnRoaXMuX2hlYWRlcnMsXG4gICAgICAuLi5oZWFkZXJzLFxuICAgIH07XG4gICAgdGhpcy5zZXJ2ZXJJbmZvID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIFwiaGVhZGVyc1wiIGZvciBhIGdpdmVuIHJlcXVlc3QsIG1lcmdpbmcgdGhlXG4gICAqIHBlci1yZXF1ZXN0IGhlYWRlcnMgd2l0aCBvdXIgb3duIFwiZGVmYXVsdFwiIGhlYWRlcnMuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB1bmxpa2Ugb3RoZXIgb3B0aW9ucywgaGVhZGVycyBhcmVuJ3Qgb3ZlcnJpZGRlbiwgYnV0XG4gICAqIG1lcmdlZCBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9ucyBmb3IgYSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgX2dldEhlYWRlcnMob3B0aW9ucykge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLl9oZWFkZXJzLFxuICAgICAgLi4ub3B0aW9ucy5oZWFkZXJzLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSBvZiBcInNhZmVcIiBmb3IgYSBnaXZlbiByZXF1ZXN0LCB1c2luZyB0aGVcbiAgICogcGVyLXJlcXVlc3Qgb3B0aW9uIGlmIHByZXNlbnQgb3IgZmFsbGluZyBiYWNrIHRvIG91ciBkZWZhdWx0XG4gICAqIG90aGVyd2lzZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbnMgZm9yIGEgcmVxdWVzdC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBfZ2V0U2FmZShvcHRpb25zKSB7XG4gICAgcmV0dXJuIHsgc2FmZTogdGhpcy5fc2FmZSwgLi4ub3B0aW9ucyB9LnNhZmU7XG4gIH1cblxuICAvKipcbiAgICogQXMgX2dldFNhZmUsIGJ1dCBmb3IgXCJyZXRyeVwiLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldFJldHJ5KG9wdGlvbnMpIHtcbiAgICByZXR1cm4geyByZXRyeTogdGhpcy5fcmV0cnksIC4uLm9wdGlvbnMgfS5yZXRyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHNlcnZlcidzIFwiaGVsbG9cIiBlbmRwb2ludC4gVGhpcyBlbmRwb2ludCByZXZlYWxzXG4gICAqIHNlcnZlciBjYXBhYmlsaXRpZXMgYW5kIHNldHRpbmdzIGFzIHdlbGwgYXMgdGVsbGluZyB0aGUgY2xpZW50XG4gICAqIFwid2hvIHRoZXkgYXJlXCIgYWNjb3JkaW5nIHRvIHRoZWlyIGdpdmVuIGF1dGhvcml6YXRpb24gaGVhZGVycy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnM9e31dIFRoZSByZXF1ZXN0IG9wdGlvbnMuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zLmhlYWRlcnM9e31dIEhlYWRlcnMgdG8gdXNlIHdoZW4gbWFraW5nXG4gICAqICAgICB0aGlzIHJlcXVlc3QuXG4gICAqIEBwYXJhbSAge051bWJlcn0gIFtvcHRpb25zLnJldHJ5PTBdICAgIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgX2dldEhlbGxvKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLnJlbW90ZSArIGVuZHBvaW50KFwicm9vdFwiKTtcbiAgICBjb25zdCB7IGpzb24gfSA9IGF3YWl0IHRoaXMuaHR0cC5yZXF1ZXN0KFxuICAgICAgcGF0aCxcbiAgICAgIHsgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSB9LFxuICAgICAgeyByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucykgfVxuICAgICk7XG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHNlcnZlciBpbmZvcm1hdGlvbiBhbmQgcGVyc2lzdCB0aGVtIGxvY2FsbHkuIFRoaXMgb3BlcmF0aW9uIGlzXG4gICAqIHVzdWFsbHkgcGVyZm9ybWVkIGEgc2luZ2xlIHRpbWUgZHVyaW5nIHRoZSBpbnN0YW5jZSBsaWZlY3ljbGUuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XSBUaGUgcmVxdWVzdCBvcHRpb25zLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBbb3B0aW9ucy5yZXRyeT0wXSAgICBOdW1iZXIgb2YgcmV0cmllcyB0byBtYWtlXG4gICAqICAgICB3aGVuIGZhY2VkIHdpdGggdHJhbnNpZW50IGVycm9ycy5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIGZldGNoU2VydmVySW5mbyhvcHRpb25zID0ge30pIHtcbiAgICBpZiAodGhpcy5zZXJ2ZXJJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJJbmZvO1xuICAgIH1cbiAgICB0aGlzLnNlcnZlckluZm8gPSBhd2FpdCB0aGlzLl9nZXRIZWxsbyh7IHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSB9KTtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXJJbmZvO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBLaW50byBzZXJ2ZXIgc2V0dGluZ3MuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XSBUaGUgcmVxdWVzdCBvcHRpb25zLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBbb3B0aW9ucy5yZXRyeT0wXSAgICBOdW1iZXIgb2YgcmV0cmllcyB0byBtYWtlXG4gICAqICAgICB3aGVuIGZhY2VkIHdpdGggdHJhbnNpZW50IGVycm9ycy5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIEBub2JhdGNoKFwiVGhpcyBvcGVyYXRpb24gaXMgbm90IHN1cHBvcnRlZCB3aXRoaW4gYSBiYXRjaCBvcGVyYXRpb24uXCIpXG4gIGFzeW5jIGZldGNoU2VydmVyU2V0dGluZ3Mob3B0aW9ucykge1xuICAgIGNvbnN0IHsgc2V0dGluZ3MgfSA9IGF3YWl0IHRoaXMuZmV0Y2hTZXJ2ZXJJbmZvKG9wdGlvbnMpO1xuICAgIHJldHVybiBzZXR0aW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBzZXJ2ZXIgY2FwYWJpbGl0aWVzIGluZm9ybWF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucz17fV0gVGhlIHJlcXVlc3Qgb3B0aW9ucy5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMucmV0cnk9MF0gICAgTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0LCBFcnJvcj59XG4gICAqL1xuICBAbm9iYXRjaChcIlRoaXMgb3BlcmF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aGluIGEgYmF0Y2ggb3BlcmF0aW9uLlwiKVxuICBhc3luYyBmZXRjaFNlcnZlckNhcGFiaWxpdGllcyhvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7IGNhcGFiaWxpdGllcyB9ID0gYXdhaXQgdGhpcy5mZXRjaFNlcnZlckluZm8ob3B0aW9ucyk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdGllcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBhdXRoZW50aWNhdGVkIHVzZXIgaW5mb3JtYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XSBUaGUgcmVxdWVzdCBvcHRpb25zLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucy5oZWFkZXJzPXt9XSBIZWFkZXJzIHRvIHVzZSB3aGVuIG1ha2luZ1xuICAgKiAgICAgdGhpcyByZXF1ZXN0LlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBbb3B0aW9ucy5yZXRyeT0wXSAgICBOdW1iZXIgb2YgcmV0cmllcyB0byBtYWtlXG4gICAqICAgICB3aGVuIGZhY2VkIHdpdGggdHJhbnNpZW50IGVycm9ycy5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIEBub2JhdGNoKFwiVGhpcyBvcGVyYXRpb24gaXMgbm90IHN1cHBvcnRlZCB3aXRoaW4gYSBiYXRjaCBvcGVyYXRpb24uXCIpXG4gIGFzeW5jIGZldGNoVXNlcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IGF3YWl0IHRoaXMuX2dldEhlbGxvKG9wdGlvbnMpO1xuICAgIHJldHVybiB1c2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGF1dGhlbnRpY2F0ZWQgdXNlciBpbmZvcm1hdGlvbi5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnM9e31dIFRoZSByZXF1ZXN0IG9wdGlvbnMuXG4gICAqIEBwYXJhbSAge051bWJlcn0gIFtvcHRpb25zLnJldHJ5PTBdICAgIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgQG5vYmF0Y2goXCJUaGlzIG9wZXJhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhpbiBhIGJhdGNoIG9wZXJhdGlvbi5cIilcbiAgYXN5bmMgZmV0Y2hIVFRQQXBpVmVyc2lvbihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7IGh0dHBfYXBpX3ZlcnNpb24gfSA9IGF3YWl0IHRoaXMuZmV0Y2hTZXJ2ZXJJbmZvKG9wdGlvbnMpO1xuICAgIHJldHVybiBodHRwX2FwaV92ZXJzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgYmF0Y2ggcmVxdWVzdHMsIGNodW5raW5nIHRoZW0gYWNjb3JkaW5nIHRvIHRoZSBiYXRjaF9tYXhfcmVxdWVzdHNcbiAgICogc2VydmVyIHNldHRpbmcgd2hlbiBuZWVkZWQuXG4gICAqXG4gICAqIEBwYXJhbSAge0FycmF5fSAgcmVxdWVzdHMgICAgIFRoZSBsaXN0IG9mIGJhdGNoIHN1YnJlcXVlc3RzIHRvIHBlcmZvcm0uXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIF9iYXRjaFJlcXVlc3RzKHJlcXVlc3RzLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKTtcbiAgICBpZiAoIXJlcXVlc3RzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCBzZXJ2ZXJTZXR0aW5ncyA9IGF3YWl0IHRoaXMuZmV0Y2hTZXJ2ZXJTZXR0aW5ncyh7XG4gICAgICByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucyksXG4gICAgfSk7XG4gICAgY29uc3QgbWF4UmVxdWVzdHMgPSBzZXJ2ZXJTZXR0aW5nc1tcImJhdGNoX21heF9yZXF1ZXN0c1wiXTtcbiAgICBpZiAobWF4UmVxdWVzdHMgJiYgcmVxdWVzdHMubGVuZ3RoID4gbWF4UmVxdWVzdHMpIHtcbiAgICAgIGNvbnN0IGNodW5rcyA9IHBhcnRpdGlvbihyZXF1ZXN0cywgbWF4UmVxdWVzdHMpO1xuICAgICAgcmV0dXJuIHBNYXAoY2h1bmtzLCBjaHVuayA9PiB0aGlzLl9iYXRjaFJlcXVlc3RzKGNodW5rLCBvcHRpb25zKSk7XG4gICAgfVxuICAgIGNvbnN0IHsgcmVzcG9uc2VzIH0gPSBhd2FpdCB0aGlzLmV4ZWN1dGUoXG4gICAgICB7XG4gICAgICAgIC8vIEZJWE1FOiBpcyB0aGlzIHJlYWxseSBuZWNlc3NhcnksIHNpbmNlIGl0J3MgYWxzbyBwcmVzZW50IGluXG4gICAgICAgIC8vIHRoZSBcImRlZmF1bHRzXCI/XG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIHBhdGg6IGVuZHBvaW50KFwiYmF0Y2hcIiksXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBkZWZhdWx0czogeyBoZWFkZXJzIH0sXG4gICAgICAgICAgcmVxdWVzdHMsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgeyByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucykgfVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3BvbnNlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBiYXRjaCByZXF1ZXN0cyB0byB0aGUgcmVtb3RlIHNlcnZlci5cbiAgICpcbiAgICogTm90ZTogUmVzZXJ2ZWQgZm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKlxuICAgKiBAaWdub3JlXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBmdW5jdGlvbiB0byB1c2UgZm9yIGRlc2NyaWJpbmcgYmF0Y2ggb3BzLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgW29wdGlvbnM9e31dICAgICAgICAgICAgICBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59ICBbb3B0aW9ucy5zYWZlXSAgICAgICAgICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIFtvcHRpb25zLnJldHJ5XSAgICAgICAgICAgVGhlIHJldHJ5IG9wdGlvbi5cbiAgICogQHBhcmFtICB7U3RyaW5nfSAgIFtvcHRpb25zLmJ1Y2tldF0gICAgICAgICAgVGhlIGJ1Y2tldCBuYW1lIG9wdGlvbi5cbiAgICogQHBhcmFtICB7U3RyaW5nfSAgIFtvcHRpb25zLmNvbGxlY3Rpb25dICAgICAgVGhlIGNvbGxlY3Rpb24gbmFtZSBvcHRpb24uXG4gICAqIEBwYXJhbSAge09iamVjdH0gICBbb3B0aW9ucy5oZWFkZXJzXSAgICAgICAgIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59ICBbb3B0aW9ucy5hZ2dyZWdhdGU9ZmFsc2VdIFByb2R1Y2VzIGFuIGFnZ3JlZ2F0ZWQgcmVzdWx0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIEBub2JhdGNoKFwiQ2FuJ3QgdXNlIGJhdGNoIHdpdGhpbiBhIGJhdGNoIVwiKVxuICBhc3luYyBiYXRjaChmbiwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgcm9vdEJhdGNoID0gbmV3IEtpbnRvQ2xpZW50QmFzZSh0aGlzLnJlbW90ZSwge1xuICAgICAgZXZlbnRzOiB0aGlzLmV2ZW50cyxcbiAgICAgIGJhdGNoOiB0cnVlLFxuICAgICAgc2FmZTogdGhpcy5fZ2V0U2FmZShvcHRpb25zKSxcbiAgICAgIHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSxcbiAgICB9KTtcbiAgICBsZXQgYnVja2V0QmF0Y2gsIGNvbGxCYXRjaDtcbiAgICBpZiAob3B0aW9ucy5idWNrZXQpIHtcbiAgICAgIGJ1Y2tldEJhdGNoID0gcm9vdEJhdGNoLmJ1Y2tldChvcHRpb25zLmJ1Y2tldCk7XG4gICAgICBpZiAob3B0aW9ucy5jb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGxCYXRjaCA9IGJ1Y2tldEJhdGNoLmNvbGxlY3Rpb24ob3B0aW9ucy5jb2xsZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYmF0Y2hDbGllbnQgPSBjb2xsQmF0Y2ggfHwgYnVja2V0QmF0Y2ggfHwgcm9vdEJhdGNoO1xuICAgIGZuKGJhdGNoQ2xpZW50KTtcbiAgICBjb25zdCByZXNwb25zZXMgPSBhd2FpdCB0aGlzLl9iYXRjaFJlcXVlc3RzKHJvb3RCYXRjaC5fcmVxdWVzdHMsIG9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zLmFnZ3JlZ2F0ZSkge1xuICAgICAgcmV0dXJuIGFnZ3JlZ2F0ZShyZXNwb25zZXMsIHJvb3RCYXRjaC5fcmVxdWVzdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhbiBhdG9taWMgSFRUUCByZXF1ZXN0LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICByZXF1ZXN0ICAgICAgICAgICAgIFRoZSByZXF1ZXN0IG9iamVjdC5cbiAgICogQHBhcmFtICB7U3RyaW5nfSAgcmVxdWVzdC5wYXRoICAgICAgICBUaGUgcGF0aCB0byBmZXRjaCwgcmVsYXRpdmVcbiAgICogICAgIHRvIHRoZSBLaW50byBzZXJ2ZXIgcm9vdC5cbiAgICogQHBhcmFtICB7U3RyaW5nfSAgW3JlcXVlc3QubWV0aG9kPVwiR0VUXCJdIFRoZSBtZXRob2QgdG8gdXNlIGluIHRoZVxuICAgKiAgICAgcmVxdWVzdC5cbiAgICogQHBhcmFtICB7Qm9keX0gICAgW3JlcXVlc3QuYm9keV0gICAgICBUaGUgcmVxdWVzdCBib2R5LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbcmVxdWVzdC5oZWFkZXJzPXt9XSBUaGUgcmVxdWVzdCBoZWFkZXJzLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucz17fV0gICAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gW29wdGlvbnMucmF3PWZhbHNlXSBJZiB0cnVlLCByZXNvbHZlIHdpdGggZnVsbCByZXNwb25zZVxuICAgKiBAcGFyYW0gIHtCb29sZWFufSBbb3B0aW9ucy5zdHJpbmdpZnk9dHJ1ZV0gSWYgdHJ1ZSwgc2VyaWFsaXplIGJvZHkgZGF0YSB0b1xuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBbb3B0aW9ucy5yZXRyeT0wXSAgIFRoZSBudW1iZXIgb2YgdGltZXMgdG9cbiAgICogICAgIHJldHJ5IGEgcmVxdWVzdCBpZiB0aGUgc2VydmVyIHJlc3BvbmRzIHdpdGggUmV0cnktQWZ0ZXIuXG4gICAqIEpTT04uXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0LCBFcnJvcj59XG4gICAqL1xuICBhc3luYyBleGVjdXRlKHJlcXVlc3QsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHsgcmF3ID0gZmFsc2UsIHN0cmluZ2lmeSA9IHRydWUgfSA9IG9wdGlvbnM7XG4gICAgLy8gSWYgd2UncmUgd2l0aGluIGEgYmF0Y2gsIGFkZCB0aGUgcmVxdWVzdCB0byB0aGUgc3RhY2sgdG8gc2VuZCBhdCBvbmNlLlxuICAgIGlmICh0aGlzLl9pc0JhdGNoKSB7XG4gICAgICB0aGlzLl9yZXF1ZXN0cy5wdXNoKHJlcXVlc3QpO1xuICAgICAgLy8gUmVzb2x2ZSB3aXRoIGEgbWVzc2FnZSBpbiBjYXNlIHBlb3BsZSBhdHRlbXB0IGF0IGNvbnN1bWluZyB0aGUgcmVzdWx0XG4gICAgICAvLyBmcm9tIHdpdGhpbiBhIGJhdGNoIG9wZXJhdGlvbi5cbiAgICAgIGNvbnN0IG1zZyA9XG4gICAgICAgIFwiVGhpcyByZXN1bHQgaXMgZ2VuZXJhdGVkIGZyb20gd2l0aGluIGEgYmF0Y2ggXCIgK1xuICAgICAgICBcIm9wZXJhdGlvbiBhbmQgc2hvdWxkIG5vdCBiZSBjb25zdW1lZC5cIjtcbiAgICAgIHJldHVybiByYXcgPyB7IGpzb246IG1zZywgaGVhZGVyczogeyBnZXQoKSB7fSB9IH0gOiBtc2c7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuaHR0cC5yZXF1ZXN0KFxuICAgICAgdGhpcy5yZW1vdGUgKyByZXF1ZXN0LnBhdGgsXG4gICAgICBjbGVhblVuZGVmaW5lZFByb3BlcnRpZXMoe1xuICAgICAgICAvLyBMaW1pdCByZXF1ZXN0cyB0byBvbmx5IHRob3NlIHBhcnRzIHRoYXQgd291bGQgYmUgYWxsb3dlZCBpblxuICAgICAgICAvLyBhIGJhdGNoIHJlcXVlc3QgLS0gZG9uJ3QgcGFzcyB0aHJvdWdoIG90aGVyIGZhbmN5IGZldGNoKClcbiAgICAgICAgLy8gb3B0aW9ucyBsaWtlIGludGVncml0eSwgcmVkaXJlY3QsIG1vZGUgYmVjYXVzZSB0aGV5IHdpbGxcbiAgICAgICAgLy8gYnJlYWsgb24gYSBiYXRjaCByZXF1ZXN0LiAgQSBiYXRjaCByZXF1ZXN0IG9ubHkgYWxsb3dzXG4gICAgICAgIC8vIGhlYWRlcnMsIG1ldGhvZCwgcGF0aCAoYWJvdmUpLCBhbmQgYm9keS5cbiAgICAgICAgbWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogcmVxdWVzdC5oZWFkZXJzLFxuICAgICAgICBib2R5OiBzdHJpbmdpZnkgPyBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpIDogcmVxdWVzdC5ib2R5LFxuICAgICAgfSksXG4gICAgICB7IHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSB9XG4gICAgKTtcbiAgICByZXR1cm4gcmF3ID8gcmVzdWx0IDogcmVzdWx0Lmpzb247XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggc29tZSBwYWdlcyBmcm9tIGEgcGFnaW5hdGVkIGxpc3QsIGZvbGxvd2luZyB0aGUgYG5leHQtcGFnZWBcbiAgICogaGVhZGVyIGF1dG9tYXRpY2FsbHkgdW50aWwgd2UgaGF2ZSBmZXRjaGVkIHRoZSByZXF1ZXN0ZWQgbnVtYmVyXG4gICAqIG9mIHBhZ2VzLiBSZXR1cm4gYSByZXNwb25zZSB3aXRoIGEgYC5uZXh0KClgIG1ldGhvZCB0aGF0IGNhbiBiZVxuICAgKiBjYWxsZWQgdG8gZmV0Y2ggbW9yZSByZXN1bHRzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBwYXRoXG4gICAqICAgICBUaGUgcGF0aCB0byBtYWtlIHRoZSByZXF1ZXN0IHRvLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBwYXJhbXNcbiAgICogICAgIFRoZSBwYXJhbWV0ZXJzIHRvIHVzZSB3aGVuIG1ha2luZyB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtICB7U3RyaW5nfSAgW3BhcmFtcy5zb3J0PVwiLWxhc3RfbW9kaWZpZWRcIl1cbiAgICogICAgIFRoZSBzb3J0aW5nIG9yZGVyIHRvIHVzZSB3aGVuIGZldGNoaW5nLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbcGFyYW1zLmZpbHRlcnM9e31dXG4gICAqICAgICBUaGUgZmlsdGVycyB0byBzZW5kIGluIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBbcGFyYW1zLmxpbWl0PXVuZGVmaW5lZF1cbiAgICogICAgIFRoZSBsaW1pdCB0byBzZW5kIGluIHRoZSByZXF1ZXN0LiBVbmRlZmluZWQgbWVhbnMgbm8gbGltaXQuXG4gICAqIEBwYXJhbSAge051bWJlcn0gIFtwYXJhbXMucGFnZXM9dW5kZWZpbmVkXVxuICAgKiAgICAgVGhlIG51bWJlciBvZiBwYWdlcyB0byBmZXRjaC4gVW5kZWZpbmVkIG1lYW5zIG9uZSBwYWdlLiBQYXNzXG4gICAqICAgICBJbmZpbml0eSB0byBmZXRjaCBldmVyeXRoaW5nLlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBbcGFyYW1zLnNpbmNlPXVuZGVmaW5lZF1cbiAgICogICAgIFRoZSBFVGFnIGZyb20gd2hpY2ggdG8gc3RhcnQgZmV0Y2hpbmcuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XVxuICAgKiAgICAgQWRkaXRpb25hbCByZXF1ZXN0LWxldmVsIHBhcmFtZXRlcnMgdG8gdXNlIGluIGFsbCByZXF1ZXN0cy5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnMuaGVhZGVycz17fV1cbiAgICogICAgIEhlYWRlcnMgdG8gdXNlIGR1cmluZyBhbGwgcmVxdWVzdHMuXG4gICAqIEBwYXJhbSAge051bWJlcn0gIFtvcHRpb25zLnJldHJ5PTBdXG4gICAqICAgICBOdW1iZXIgb2YgdGltZXMgdG8gcmV0cnkgZWFjaCByZXF1ZXN0IGlmIHRoZSBzZXJ2ZXIgcmVzcG9uZHNcbiAgICogICAgIHdpdGggUmV0cnktQWZ0ZXIuXG4gICAqL1xuICBhc3luYyBwYWdpbmF0ZWRMaXN0KHBhdGgsIHBhcmFtcywgb3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gRklYTUU6IHRoaXMgaXMgY2FsbGVkIGV2ZW4gaW4gYmF0Y2ggcmVxdWVzdHMsIHdoaWNoIGRvZXNuJ3RcbiAgICAvLyBtYWtlIGFueSBzZW5zZSAoc2luY2UgYWxsIGJhdGNoIHJlcXVlc3RzIGdldCBhIFwiZHVtbXlcIlxuICAgIC8vIHJlc3BvbnNlOyBzZWUgZXhlY3V0ZSgpIGFib3ZlKS5cbiAgICBjb25zdCB7IHNvcnQsIGZpbHRlcnMsIGxpbWl0LCBwYWdlcywgc2luY2UgfSA9IHtcbiAgICAgIHNvcnQ6IFwiLWxhc3RfbW9kaWZpZWRcIixcbiAgICAgIC4uLnBhcmFtcyxcbiAgICB9O1xuICAgIC8vIFNhZmV0eS9Db25zaXN0ZW5jeSBjaGVjayBvbiBFVGFnIHZhbHVlLlxuICAgIGlmIChzaW5jZSAmJiB0eXBlb2Ygc2luY2UgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEludmFsaWQgdmFsdWUgZm9yIHNpbmNlICgke3NpbmNlfSksIHNob3VsZCBiZSBFVGFnIHZhbHVlLmBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVlcnlzdHJpbmcgPSBxc2lmeSh7XG4gICAgICAuLi5maWx0ZXJzLFxuICAgICAgX3NvcnQ6IHNvcnQsXG4gICAgICBfbGltaXQ6IGxpbWl0LFxuICAgICAgX3NpbmNlOiBzaW5jZSxcbiAgICB9KTtcbiAgICBsZXQgcmVzdWx0cyA9IFtdLFxuICAgICAgY3VycmVudCA9IDA7XG5cbiAgICBjb25zdCBuZXh0ID0gYXN5bmMgZnVuY3Rpb24obmV4dFBhZ2UpIHtcbiAgICAgIGlmICghbmV4dFBhZ2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGFnaW5hdGlvbiBleGhhdXN0ZWQuXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2Nlc3NOZXh0UGFnZShuZXh0UGFnZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHByb2Nlc3NOZXh0UGFnZSA9IGFzeW5jIG5leHRQYWdlID0+IHtcbiAgICAgIGNvbnN0IHsgaGVhZGVycyB9ID0gb3B0aW9ucztcbiAgICAgIHJldHVybiBoYW5kbGVSZXNwb25zZShhd2FpdCB0aGlzLmh0dHAucmVxdWVzdChuZXh0UGFnZSwgeyBoZWFkZXJzIH0pKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFnZVJlc3VsdHMgPSAocmVzdWx0cywgbmV4dFBhZ2UsIGV0YWcsIHRvdGFsUmVjb3JkcykgPT4ge1xuICAgICAgLy8gRVRhZyBzdHJpbmcgaXMgc3VwcG9zZWQgdG8gYmUgb3BhcXVlIGFuZCBzdG9yZWQgwqthcy1pc8K7LlxuICAgICAgLy8gRVRhZyBoZWFkZXIgdmFsdWVzIGFyZSBxdW90ZWQgKGJlY2F1c2Ugb2YgKiBhbmQgVy9cImZvb1wiKS5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhc3RfbW9kaWZpZWQ6IGV0YWcgPyBldGFnLnJlcGxhY2UoL1wiL2csIFwiXCIpIDogZXRhZyxcbiAgICAgICAgZGF0YTogcmVzdWx0cyxcbiAgICAgICAgbmV4dDogbmV4dC5iaW5kKG51bGwsIG5leHRQYWdlKSxcbiAgICAgICAgaGFzTmV4dFBhZ2U6ICEhbmV4dFBhZ2UsXG4gICAgICAgIHRvdGFsUmVjb3JkcyxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVJlc3BvbnNlID0gYXN5bmMgZnVuY3Rpb24oeyBoZWFkZXJzLCBqc29uIH0pIHtcbiAgICAgIGNvbnN0IG5leHRQYWdlID0gaGVhZGVycy5nZXQoXCJOZXh0LVBhZ2VcIik7XG4gICAgICBjb25zdCBldGFnID0gaGVhZGVycy5nZXQoXCJFVGFnXCIpO1xuICAgICAgY29uc3QgdG90YWxSZWNvcmRzID0gcGFyc2VJbnQoaGVhZGVycy5nZXQoXCJUb3RhbC1SZWNvcmRzXCIpLCAxMCk7XG5cbiAgICAgIGlmICghcGFnZXMpIHtcbiAgICAgICAgcmV0dXJuIHBhZ2VSZXN1bHRzKGpzb24uZGF0YSwgbmV4dFBhZ2UsIGV0YWcsIHRvdGFsUmVjb3Jkcyk7XG4gICAgICB9XG4gICAgICAvLyBBZ2dyZWdhdGUgbmV3IHJlc3VsdHMgd2l0aCBwcmV2aW91cyBvbmVzXG4gICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoanNvbi5kYXRhKTtcbiAgICAgIGN1cnJlbnQgKz0gMTtcbiAgICAgIGlmIChjdXJyZW50ID49IHBhZ2VzIHx8ICFuZXh0UGFnZSkge1xuICAgICAgICAvLyBQYWdpbmF0aW9uIGV4aGF1c3RlZFxuICAgICAgICByZXR1cm4gcGFnZVJlc3VsdHMocmVzdWx0cywgbmV4dFBhZ2UsIGV0YWcsIHRvdGFsUmVjb3Jkcyk7XG4gICAgICB9XG4gICAgICAvLyBGb2xsb3cgbmV4dCBwYWdlXG4gICAgICByZXR1cm4gcHJvY2Vzc05leHRQYWdlKG5leHRQYWdlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGhhbmRsZVJlc3BvbnNlKFxuICAgICAgYXdhaXQgdGhpcy5leGVjdXRlKFxuICAgICAgICAvLyBOLkIuOiBUaGlzIGRvZXNuJ3QgdXNlIF9nZXRIZWFkZXJzLCBiZWNhdXNlIGFsbCBjYWxscyB0b1xuICAgICAgICAvLyBgcGFnaW5hdGVkTGlzdGAgYXJlIGFzc3VtZWQgdG8gY29tZSBmcm9tIGNhbGxzIHRoYXQgYWxyZWFkeVxuICAgICAgICAvLyBoYXZlIGhlYWRlcnMgbWVyZ2VkIGF0IGUuZy4gdGhlIGJ1Y2tldCBvciBjb2xsZWN0aW9uIGxldmVsLlxuICAgICAgICB7IGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycywgcGF0aDogcGF0aCArIFwiP1wiICsgcXVlcnlzdHJpbmcgfSxcbiAgICAgICAgLy8gTi5CLiBUaGlzIGRvZXNuJ3QgdXNlIF9nZXRSZXRyeSwgYmVjYXVzZSBhbGwgY2FsbHMgdG9cbiAgICAgICAgLy8gYHBhZ2luYXRlZExpc3RgIGFyZSBhc3N1bWVkIHRvIGNvbWUgZnJvbSBjYWxscyB0aGF0IGFscmVhZHlcbiAgICAgICAgLy8gdXNlZCBgX2dldFJldHJ5YCBhdCBlLmcuIHRoZSBidWNrZXQgb3IgY29sbGVjdGlvbiBsZXZlbC5cbiAgICAgICAgeyByYXc6IHRydWUsIHJldHJ5OiBvcHRpb25zLnJldHJ5IHx8IDAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdHMgYWxsIHBlcm1pc3Npb25zLlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zPXt9XSAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9ucy5oZWFkZXJzPXt9XSBIZWFkZXJzIHRvIHVzZSB3aGVuIG1ha2luZ1xuICAgKiAgICAgdGhpcyByZXF1ZXN0LlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IFtvcHRpb25zLnJldHJ5PTBdICAgIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdFtdLCBFcnJvcj59XG4gICAqL1xuICBAY2FwYWJsZShbXCJwZXJtaXNzaW9uc19lbmRwb2ludFwiXSlcbiAgYXN5bmMgbGlzdFBlcm1pc3Npb25zKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHBhdGggPSBlbmRwb2ludChcInBlcm1pc3Npb25zXCIpO1xuICAgIC8vIEVuc3VyZSB0aGUgZGVmYXVsdCBzb3J0IHBhcmFtZXRlciBpcyBzb21ldGhpbmcgdGhhdCBleGlzdHMgaW4gcGVybWlzc2lvbnNcbiAgICAvLyBlbnRyaWVzLCBhcyBgbGFzdF9tb2RpZmllZGAgZG9lc24ndDsgaGVyZSwgd2UgcGljayBcImlkXCIuXG4gICAgY29uc3QgcGFnaW5hdGlvbk9wdGlvbnMgPSB7IHNvcnQ6IFwiaWRcIiwgLi4ub3B0aW9ucyB9O1xuICAgIHJldHVybiB0aGlzLnBhZ2luYXRlZExpc3QocGF0aCwgcGFnaW5hdGlvbk9wdGlvbnMsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucyksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBsaXN0IG9mIGJ1Y2tldHMuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnM9e31dICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zLmhlYWRlcnM9e31dIEhlYWRlcnMgdG8gdXNlIHdoZW4gbWFraW5nXG4gICAqICAgICB0aGlzIHJlcXVlc3QuXG4gICAqIEBwYXJhbSAge051bWJlcn0gW29wdGlvbnMucmV0cnk9MF0gICAgTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0W10sIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIGxpc3RCdWNrZXRzKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHBhdGggPSBlbmRwb2ludChcImJ1Y2tldFwiKTtcbiAgICByZXR1cm4gdGhpcy5wYWdpbmF0ZWRMaXN0KHBhdGgsIG9wdGlvbnMsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucyksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBidWNrZXQgb24gdGhlIHNlcnZlci5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfG51bGx9ICBpZCAgICAgICAgICAgICAgICBUaGUgYnVja2V0IG5hbWUgKG9wdGlvbmFsKS5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgICAgICBbb3B0aW9ucz17fV0gICAgICBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59ICAgICAgW29wdGlvbnMuZGF0YV0gICAgVGhlIGJ1Y2tldCBkYXRhIG9wdGlvbi5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gICAgICBbb3B0aW9ucy5zYWZlXSAgICBUaGUgc2FmZSBvcHRpb24uXG4gICAqIEBwYXJhbSAge09iamVjdH0gICAgICAgW29wdGlvbnMuaGVhZGVyc10gVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgICAgICBbb3B0aW9ucy5yZXRyeT0wXSBOdW1iZXIgb2YgcmV0cmllcyB0byBtYWtlXG4gICAqICAgICB3aGVuIGZhY2VkIHdpdGggdHJhbnNpZW50IGVycm9ycy5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIGNyZWF0ZUJ1Y2tldChpZCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgeyBkYXRhID0ge30sIHBlcm1pc3Npb25zIH0gPSBvcHRpb25zO1xuICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICBkYXRhLmlkID0gaWQ7XG4gICAgfVxuICAgIGNvbnN0IHBhdGggPSBkYXRhLmlkID8gZW5kcG9pbnQoXCJidWNrZXRcIiwgZGF0YS5pZCkgOiBlbmRwb2ludChcImJ1Y2tldFwiKTtcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlKFxuICAgICAgcmVxdWVzdHMuY3JlYXRlUmVxdWVzdChcbiAgICAgICAgcGF0aCxcbiAgICAgICAgeyBkYXRhLCBwZXJtaXNzaW9ucyB9LFxuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSxcbiAgICAgICAgICBzYWZlOiB0aGlzLl9nZXRTYWZlKG9wdGlvbnMpLFxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgeyByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucykgfVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhIGJ1Y2tldCBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEBpZ25vcmVcbiAgICogQHBhcmFtICB7T2JqZWN0fFN0cmluZ30gYnVja2V0ICAgICAgICAgICAgICAgICAgVGhlIGJ1Y2tldCB0byBkZWxldGUuXG4gICAqIEBwYXJhbSAge09iamVjdH0gICAgICAgIFtvcHRpb25zPXt9XSAgICAgICAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gICAgICAgW29wdGlvbnMuc2FmZV0gICAgICAgICAgVGhlIHNhZmUgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICBbb3B0aW9ucy5oZWFkZXJzXSAgICAgICBUaGUgaGVhZGVycyBvYmplY3Qgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgICAgICBbb3B0aW9ucy5yZXRyeT0wXSAgICAgICBOdW1iZXIgb2YgcmV0cmllcyB0byBtYWtlXG4gICAqICAgICB3aGVuIGZhY2VkIHdpdGggdHJhbnNpZW50IGVycm9ycy5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgICAgICAgW29wdGlvbnMubGFzdF9tb2RpZmllZF0gVGhlIGxhc3RfbW9kaWZpZWQgb3B0aW9uLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgZGVsZXRlQnVja2V0KGJ1Y2tldCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgYnVja2V0T2JqID0gdG9EYXRhQm9keShidWNrZXQpO1xuICAgIGlmICghYnVja2V0T2JqLmlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIGJ1Y2tldCBpZCBpcyByZXF1aXJlZC5cIik7XG4gICAgfVxuICAgIGNvbnN0IHBhdGggPSBlbmRwb2ludChcImJ1Y2tldFwiLCBidWNrZXRPYmouaWQpO1xuICAgIGNvbnN0IHsgbGFzdF9tb2RpZmllZCB9ID0geyAuLi5idWNrZXRPYmosIC4uLm9wdGlvbnMgfTtcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlKFxuICAgICAgcmVxdWVzdHMuZGVsZXRlUmVxdWVzdChwYXRoLCB7XG4gICAgICAgIGxhc3RfbW9kaWZpZWQsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICAgIHNhZmU6IHRoaXMuX2dldFNhZmUob3B0aW9ucyksXG4gICAgICB9KSxcbiAgICAgIHsgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpIH1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIGJ1Y2tldHMgb24gdGhlIHNlcnZlci5cbiAgICpcbiAgICogQGlnbm9yZVxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucz17fV0gICAgICAgICAgICBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IFtvcHRpb25zLnNhZmVdICAgICAgICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnMuaGVhZGVyc10gICAgICAgVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMubGFzdF9tb2RpZmllZF0gVGhlIGxhc3RfbW9kaWZpZWQgb3B0aW9uLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgQHN1cHBvcnQoXCIxLjRcIiwgXCIyLjBcIilcbiAgYXN5bmMgZGVsZXRlQnVja2V0cyhvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJidWNrZXRcIik7XG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShcbiAgICAgIHJlcXVlc3RzLmRlbGV0ZVJlcXVlc3QocGF0aCwge1xuICAgICAgICBsYXN0X21vZGlmaWVkOiBvcHRpb25zLmxhc3RfbW9kaWZpZWQsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICAgIHNhZmU6IHRoaXMuX2dldFNhZmUob3B0aW9ucyksXG4gICAgICB9KSxcbiAgICAgIHsgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpIH1cbiAgICApO1xuICB9XG59XG4iLCIvKipcbiAqIEV4cG9ydHMgYmF0Y2ggcmVzcG9uc2VzIGFzIGEgcmVzdWx0IG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtICB7QXJyYXl9IHJlc3BvbnNlcyBUaGUgYmF0Y2ggc3VicmVxdWVzdCByZXNwb25zZXMuXG4gKiBAcGFyYW0gIHtBcnJheX0gcmVxdWVzdHMgIFRoZSBpbml0aWFsIGlzc3VlZCByZXF1ZXN0cy5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFnZ3JlZ2F0ZShyZXNwb25zZXMgPSBbXSwgcmVxdWVzdHMgPSBbXSkge1xuICBpZiAocmVzcG9uc2VzLmxlbmd0aCAhPT0gcmVxdWVzdHMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiUmVzcG9uc2VzIGxlbmd0aCBzaG91bGQgbWF0Y2ggcmVxdWVzdHMgb25lLlwiKTtcbiAgfVxuICBjb25zdCByZXN1bHRzID0ge1xuICAgIGVycm9yczogW10sXG4gICAgcHVibGlzaGVkOiBbXSxcbiAgICBjb25mbGljdHM6IFtdLFxuICAgIHNraXBwZWQ6IFtdLFxuICB9O1xuICByZXR1cm4gcmVzcG9uc2VzLnJlZHVjZSgoYWNjLCByZXNwb25zZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCB7IHN0YXR1cyB9ID0gcmVzcG9uc2U7XG4gICAgY29uc3QgcmVxdWVzdCA9IHJlcXVlc3RzW2luZGV4XTtcbiAgICBpZiAoc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCA0MDApIHtcbiAgICAgIGFjYy5wdWJsaXNoZWQucHVzaChyZXNwb25zZS5ib2R5KTtcbiAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAvLyBFeHRyYWN0IHRoZSBpZCBtYW51YWxseSBmcm9tIHJlcXVlc3QgcGF0aCB3aGlsZSB3YWl0aW5nIGZvciBLaW50by9raW50byM4MThcbiAgICAgIGNvbnN0IHJlZ2V4ID0gLyhidWNrZXRzfGdyb3Vwc3xjb2xsZWN0aW9uc3xyZWNvcmRzKVxcLyhbXi9dKykkLztcbiAgICAgIGNvbnN0IGV4dHJhY3RzID0gcmVxdWVzdC5wYXRoLm1hdGNoKHJlZ2V4KTtcbiAgICAgIGNvbnN0IGlkID0gZXh0cmFjdHMubGVuZ3RoID09PSAzID8gZXh0cmFjdHNbMl0gOiB1bmRlZmluZWQ7XG4gICAgICBhY2Muc2tpcHBlZC5wdXNoKHtcbiAgICAgICAgaWQsXG4gICAgICAgIHBhdGg6IHJlcXVlc3QucGF0aCxcbiAgICAgICAgZXJyb3I6IHJlc3BvbnNlLmJvZHksXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gNDEyKSB7XG4gICAgICBhY2MuY29uZmxpY3RzLnB1c2goe1xuICAgICAgICAvLyBYWFg6IHNwZWNpZnlpbmcgdGhlIHR5cGUgaXMgcHJvYmFibHkgc3VwZXJmbHVvdXNcbiAgICAgICAgdHlwZTogXCJvdXRnb2luZ1wiLFxuICAgICAgICBsb2NhbDogcmVxdWVzdC5ib2R5LFxuICAgICAgICByZW1vdGU6XG4gICAgICAgICAgKHJlc3BvbnNlLmJvZHkuZGV0YWlscyAmJiByZXNwb25zZS5ib2R5LmRldGFpbHMuZXhpc3RpbmcpIHx8IG51bGwsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWNjLmVycm9ycy5wdXNoKHtcbiAgICAgICAgcGF0aDogcmVxdWVzdC5wYXRoLFxuICAgICAgICBzZW50OiByZXF1ZXN0LFxuICAgICAgICBlcnJvcjogcmVzcG9uc2UuYm9keSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xuICB9LCByZXN1bHRzKTtcbn1cbiIsImltcG9ydCB7IHRvRGF0YUJvZHksIGlzT2JqZWN0LCBjYXBhYmxlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gXCIuL2NvbGxlY3Rpb25cIjtcbmltcG9ydCAqIGFzIHJlcXVlc3RzIGZyb20gXCIuL3JlcXVlc3RzXCI7XG5pbXBvcnQgZW5kcG9pbnQgZnJvbSBcIi4vZW5kcG9pbnRcIjtcblxuLyoqXG4gKiBBYnN0cmFjdCByZXByZXNlbnRhdGlvbiBvZiBhIHNlbGVjdGVkIGJ1Y2tldC5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1Y2tldCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtICB7S2ludG9DbGllbnR9IGNsaWVudCAgICAgICAgICAgIFRoZSBjbGllbnQgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSAge1N0cmluZ30gICAgICBuYW1lICAgICAgICAgICAgICBUaGUgYnVja2V0IG5hbWUuXG4gICAqIEBwYXJhbSAge09iamVjdH0gICAgICBbb3B0aW9ucz17fV0gICAgICBUaGUgaGVhZGVycyBvYmplY3Qgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgW29wdGlvbnMuaGVhZGVyc10gVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gICAgIFtvcHRpb25zLnNhZmVdICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgICAgIFtvcHRpb25zLnJldHJ5XSAgIFRoZSByZXRyeSBvcHRpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjbGllbnQsIG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICAvKipcbiAgICAgKiBUaGUgYnVja2V0IG5hbWUuXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9pc0JhdGNoID0gISFvcHRpb25zLmJhdGNoO1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICAgIHRoaXMuX3JldHJ5ID0gb3B0aW9ucy5yZXRyeSB8fCAwO1xuICAgIHRoaXMuX3NhZmUgPSAhIW9wdGlvbnMuc2FmZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIFwiaGVhZGVyc1wiIGZvciBhIGdpdmVuIHJlcXVlc3QsIG1lcmdpbmcgdGhlXG4gICAqIHBlci1yZXF1ZXN0IGhlYWRlcnMgd2l0aCBvdXIgb3duIFwiZGVmYXVsdFwiIGhlYWRlcnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0SGVhZGVycyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuX2hlYWRlcnMsXG4gICAgICAuLi5vcHRpb25zLmhlYWRlcnMsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIFwic2FmZVwiIGZvciBhIGdpdmVuIHJlcXVlc3QsIHVzaW5nIHRoZVxuICAgKiBwZXItcmVxdWVzdCBvcHRpb24gaWYgcHJlc2VudCBvciBmYWxsaW5nIGJhY2sgdG8gb3VyIGRlZmF1bHRcbiAgICogb3RoZXJ3aXNlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9ucyBmb3IgYSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIF9nZXRTYWZlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4geyBzYWZlOiB0aGlzLl9zYWZlLCAuLi5vcHRpb25zIH0uc2FmZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcyBfZ2V0U2FmZSwgYnV0IGZvciBcInJldHJ5XCIuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0UmV0cnkob3B0aW9ucykge1xuICAgIHJldHVybiB7IHJldHJ5OiB0aGlzLl9yZXRyeSwgLi4ub3B0aW9ucyB9LnJldHJ5O1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBuYW1lICAgICAgICAgICAgICBUaGUgY29sbGVjdGlvbiBuYW1lLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucz17fV0gICAgICBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zLmhlYWRlcnNdIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IFtvcHRpb25zLnNhZmVdICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHJldHVybiB7Q29sbGVjdGlvbn1cbiAgICovXG4gIGNvbGxlY3Rpb24obmFtZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBDb2xsZWN0aW9uKHRoaXMuY2xpZW50LCB0aGlzLCBuYW1lLCB7XG4gICAgICBiYXRjaDogdGhpcy5faXNCYXRjaCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucyksXG4gICAgICBzYWZlOiB0aGlzLl9nZXRTYWZlKG9wdGlvbnMpLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBidWNrZXQgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9ucz17fV0gICAgICBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnMuaGVhZGVyc10gVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSBbb3B0aW9ucy5yZXRyeT0wXSBOdW1iZXIgb2YgcmV0cmllcyB0byBtYWtlXG4gICAqICAgICB3aGVuIGZhY2VkIHdpdGggdHJhbnNpZW50IGVycm9ycy5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIGdldERhdGEob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICBwYXRoOiBlbmRwb2ludChcImJ1Y2tldFwiLCB0aGlzLm5hbWUpLFxuICAgIH07XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLmNsaWVudC5leGVjdXRlKHJlcXVlc3QsIHtcbiAgICAgIHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSxcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYnVja2V0IGRhdGEuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIGRhdGEgICAgICAgICAgICAgICAgICAgIFRoZSBidWNrZXQgZGF0YSBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XSAgICAgICAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnMuaGVhZGVycz17fV0gICAgVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gW29wdGlvbnMuc2FmZV0gICAgICAgICAgVGhlIHNhZmUgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBbb3B0aW9ucy5yZXRyeT0wXSAgICAgICBOdW1iZXIgb2YgcmV0cmllcyB0byBtYWtlXG4gICAqICAgICB3aGVuIGZhY2VkIHdpdGggdHJhbnNpZW50IGVycm9ycy5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gW29wdGlvbnMucGF0Y2hdICAgICAgICAgVGhlIHBhdGNoIG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMubGFzdF9tb2RpZmllZF0gVGhlIGxhc3RfbW9kaWZpZWQgb3B0aW9uLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgc2V0RGF0YShkYXRhLCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAoIWlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIGJ1Y2tldCBvYmplY3QgaXMgcmVxdWlyZWQuXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1Y2tldCA9IHsgLi4uZGF0YSwgaWQ6IHRoaXMubmFtZSB9O1xuXG4gICAgLy8gRm9yIGRlZmF1bHQgYnVja2V0LCB3ZSBuZWVkIHRvIGRyb3AgdGhlIGlkIGZyb20gdGhlIGRhdGEgb2JqZWN0LlxuICAgIC8vIEJ1ZyBpbiBLaW50byA8IDMuMS4xXG4gICAgY29uc3QgYnVja2V0SWQgPSBidWNrZXQuaWQ7XG4gICAgaWYgKGJ1Y2tldC5pZCA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgIGRlbGV0ZSBidWNrZXQuaWQ7XG4gICAgfVxuXG4gICAgY29uc3QgcGF0aCA9IGVuZHBvaW50KFwiYnVja2V0XCIsIGJ1Y2tldElkKTtcbiAgICBjb25zdCB7IHBhdGNoLCBwZXJtaXNzaW9ucyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCB7IGxhc3RfbW9kaWZpZWQgfSA9IHsgLi4uZGF0YSwgLi4ub3B0aW9ucyB9O1xuICAgIGNvbnN0IHJlcXVlc3QgPSByZXF1ZXN0cy51cGRhdGVSZXF1ZXN0KFxuICAgICAgcGF0aCxcbiAgICAgIHsgZGF0YTogYnVja2V0LCBwZXJtaXNzaW9ucyB9LFxuICAgICAge1xuICAgICAgICBsYXN0X21vZGlmaWVkLFxuICAgICAgICBwYXRjaCxcbiAgICAgICAgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSxcbiAgICAgICAgc2FmZTogdGhpcy5fZ2V0U2FmZShvcHRpb25zKSxcbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKHJlcXVlc3QsIHsgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgbGlzdCBvZiBoaXN0b3J5IGVudHJpZXMgaW4gdGhlIGN1cnJlbnQgYnVja2V0LlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zPXt9XSAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9ucy5oZWFkZXJzXSBUaGUgaGVhZGVycyBvYmplY3Qgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IFtvcHRpb25zLnJldHJ5PTBdIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEFycmF5PE9iamVjdD4sIEVycm9yPn1cbiAgICovXG4gIEBjYXBhYmxlKFtcImhpc3RvcnlcIl0pXG4gIGFzeW5jIGxpc3RIaXN0b3J5KG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHBhdGggPSBlbmRwb2ludChcImhpc3RvcnlcIiwgdGhpcy5uYW1lKTtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQucGFnaW5hdGVkTGlzdChwYXRoLCBvcHRpb25zLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9nZXRIZWFkZXJzKG9wdGlvbnMpLFxuICAgICAgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgbGlzdCBvZiBjb2xsZWN0aW9ucyBpbiB0aGUgY3VycmVudCBidWNrZXQuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnM9e31dICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zLmhlYWRlcnNdIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gW29wdGlvbnMucmV0cnk9MF0gTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXk8T2JqZWN0PiwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgbGlzdENvbGxlY3Rpb25zKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHBhdGggPSBlbmRwb2ludChcImNvbGxlY3Rpb25cIiwgdGhpcy5uYW1lKTtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQucGFnaW5hdGVkTGlzdChwYXRoLCBvcHRpb25zLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9nZXRIZWFkZXJzKG9wdGlvbnMpLFxuICAgICAgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29sbGVjdGlvbiBpbiBjdXJyZW50IGJ1Y2tldC5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfHVuZGVmaW5lZH0gIGlkICAgICAgICAgIFRoZSBjb2xsZWN0aW9uIGlkLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucz17fV0gICAgICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtCb29sZWFufSBbb3B0aW9ucy5zYWZlXSAgICAgICAgVGhlIHNhZmUgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucy5oZWFkZXJzXSAgICAgVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMucmV0cnk9MF0gICAgIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucy5wZXJtaXNzaW9uc10gVGhlIHBlcm1pc3Npb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnMuZGF0YV0gICAgICAgIFRoZSBkYXRhIG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIGNyZWF0ZUNvbGxlY3Rpb24oaWQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHsgcGVybWlzc2lvbnMsIGRhdGEgPSB7fSB9ID0gb3B0aW9ucztcbiAgICBkYXRhLmlkID0gaWQ7XG4gICAgY29uc3QgcGF0aCA9IGVuZHBvaW50KFwiY29sbGVjdGlvblwiLCB0aGlzLm5hbWUsIGlkKTtcbiAgICBjb25zdCByZXF1ZXN0ID0gcmVxdWVzdHMuY3JlYXRlUmVxdWVzdChcbiAgICAgIHBhdGgsXG4gICAgICB7IGRhdGEsIHBlcm1pc3Npb25zIH0sXG4gICAgICB7XG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICAgIHNhZmU6IHRoaXMuX2dldFNhZmUob3B0aW9ucyksXG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShyZXF1ZXN0LCB7IHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgY29sbGVjdGlvbiBmcm9tIHRoZSBjdXJyZW50IGJ1Y2tldC5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiAgICAgICAgICAgICAgVGhlIGNvbGxlY3Rpb24gdG8gZGVsZXRlLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICBbb3B0aW9ucz17fV0gICAgICAgICAgICBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gICAgICAgIFtvcHRpb25zLmhlYWRlcnNdICAgICAgIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gICAgICAgIFtvcHRpb25zLnJldHJ5PTBdICAgICAgIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcGFyYW0gIHtCb29sZWFufSAgICAgICBbb3B0aW9ucy5zYWZlXSAgICAgICAgICBUaGUgc2FmZSBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gICAgICAgIFtvcHRpb25zLmxhc3RfbW9kaWZpZWRdIFRoZSBsYXN0X21vZGlmaWVkIG9wdGlvbi5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIGRlbGV0ZUNvbGxlY3Rpb24oY29sbGVjdGlvbiwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgY29sbGVjdGlvbk9iaiA9IHRvRGF0YUJvZHkoY29sbGVjdGlvbik7XG4gICAgaWYgKCFjb2xsZWN0aW9uT2JqLmlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIGNvbGxlY3Rpb24gaWQgaXMgcmVxdWlyZWQuXCIpO1xuICAgIH1cbiAgICBjb25zdCB7IGlkIH0gPSBjb2xsZWN0aW9uT2JqO1xuICAgIGNvbnN0IHsgbGFzdF9tb2RpZmllZCB9ID0geyAuLi5jb2xsZWN0aW9uT2JqLCAuLi5vcHRpb25zIH07XG4gICAgY29uc3QgcGF0aCA9IGVuZHBvaW50KFwiY29sbGVjdGlvblwiLCB0aGlzLm5hbWUsIGlkKTtcbiAgICBjb25zdCByZXF1ZXN0ID0gcmVxdWVzdHMuZGVsZXRlUmVxdWVzdChwYXRoLCB7XG4gICAgICBsYXN0X21vZGlmaWVkLFxuICAgICAgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSxcbiAgICAgIHNhZmU6IHRoaXMuX2dldFNhZmUob3B0aW9ucyksXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUocmVxdWVzdCwgeyByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucykgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBsaXN0IG9mIGdyb3VwcyBpbiB0aGUgY3VycmVudCBidWNrZXQuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnM9e31dICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zLmhlYWRlcnNdIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gW29wdGlvbnMucmV0cnk9MF0gTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXk8T2JqZWN0PiwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgbGlzdEdyb3VwcyhvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJncm91cFwiLCB0aGlzLm5hbWUpO1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5wYWdpbmF0ZWRMaXN0KHBhdGgsIG9wdGlvbnMsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucyksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBncm91cCBpbiBjdXJyZW50IGJ1Y2tldC5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAgICAgICAgICAgICAgICBUaGUgZ3JvdXAgaWQuXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnM9e31dICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zLmhlYWRlcnNdIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gW29wdGlvbnMucmV0cnk9MF0gTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0LCBFcnJvcj59XG4gICAqL1xuICBhc3luYyBnZXRHcm91cChpZCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICBwYXRoOiBlbmRwb2ludChcImdyb3VwXCIsIHRoaXMubmFtZSwgaWQpLFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUocmVxdWVzdCwgeyByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucykgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBncm91cCBpbiBjdXJyZW50IGJ1Y2tldC5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfHVuZGVmaW5lZH0gIGlkICAgICAgICAgICAgICAgICAgICBUaGUgZ3JvdXAgaWQuXG4gICAqIEBwYXJhbSAge0FycmF5PFN0cmluZz59ICAgICBbbWVtYmVycz1bXV0gICAgICAgICAgVGhlIGxpc3Qgb2YgcHJpbmNpcGFscy5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgICAgIFtvcHRpb25zPXt9XSAgICAgICAgICBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICAgICBbb3B0aW9ucy5kYXRhXSAgICAgICAgVGhlIGRhdGEgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgW29wdGlvbnMucGVybWlzc2lvbnNdIFRoZSBwZXJtaXNzaW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59ICAgICAgICAgICBbb3B0aW9ucy5zYWZlXSAgICAgICAgVGhlIHNhZmUgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgW29wdGlvbnMuaGVhZGVyc10gICAgIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gICAgICAgICAgICBbb3B0aW9ucy5yZXRyeT0wXSAgICAgTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0LCBFcnJvcj59XG4gICAqL1xuICBhc3luYyBjcmVhdGVHcm91cChpZCwgbWVtYmVycyA9IFtdLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgLi4ub3B0aW9ucy5kYXRhLFxuICAgICAgaWQsXG4gICAgICBtZW1iZXJzLFxuICAgIH07XG4gICAgY29uc3QgcGF0aCA9IGVuZHBvaW50KFwiZ3JvdXBcIiwgdGhpcy5uYW1lLCBpZCk7XG4gICAgY29uc3QgeyBwZXJtaXNzaW9ucyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCByZXF1ZXN0ID0gcmVxdWVzdHMuY3JlYXRlUmVxdWVzdChcbiAgICAgIHBhdGgsXG4gICAgICB7IGRhdGEsIHBlcm1pc3Npb25zIH0sXG4gICAgICB7XG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICAgIHNhZmU6IHRoaXMuX2dldFNhZmUob3B0aW9ucyksXG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShyZXF1ZXN0LCB7IHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGFuIGV4aXN0aW5nIGdyb3VwIGluIGN1cnJlbnQgYnVja2V0LlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBncm91cCAgICAgICAgICAgICAgICAgICBUaGUgZ3JvdXAgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucz17fV0gICAgICAgICAgICBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zLmRhdGFdICAgICAgICAgIFRoZSBkYXRhIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnMucGVybWlzc2lvbnNdICAgVGhlIHBlcm1pc3Npb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gW29wdGlvbnMuc2FmZV0gICAgICAgICAgVGhlIHNhZmUgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucy5oZWFkZXJzXSAgICAgICBUaGUgaGVhZGVycyBvYmplY3Qgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBbb3B0aW9ucy5yZXRyeT0wXSAgICAgICBOdW1iZXIgb2YgcmV0cmllcyB0byBtYWtlXG4gICAqICAgICB3aGVuIGZhY2VkIHdpdGggdHJhbnNpZW50IGVycm9ycy5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMubGFzdF9tb2RpZmllZF0gVGhlIGxhc3RfbW9kaWZpZWQgb3B0aW9uLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgdXBkYXRlR3JvdXAoZ3JvdXAsIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICghaXNPYmplY3QoZ3JvdXApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIGdyb3VwIG9iamVjdCBpcyByZXF1aXJlZC5cIik7XG4gICAgfVxuICAgIGlmICghZ3JvdXAuaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgZ3JvdXAgaWQgaXMgcmVxdWlyZWQuXCIpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgLi4ub3B0aW9ucy5kYXRhLFxuICAgICAgLi4uZ3JvdXAsXG4gICAgfTtcbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJncm91cFwiLCB0aGlzLm5hbWUsIGdyb3VwLmlkKTtcbiAgICBjb25zdCB7IHBhdGNoLCBwZXJtaXNzaW9ucyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCB7IGxhc3RfbW9kaWZpZWQgfSA9IHsgLi4uZGF0YSwgLi4ub3B0aW9ucyB9O1xuICAgIGNvbnN0IHJlcXVlc3QgPSByZXF1ZXN0cy51cGRhdGVSZXF1ZXN0KFxuICAgICAgcGF0aCxcbiAgICAgIHsgZGF0YSwgcGVybWlzc2lvbnMgfSxcbiAgICAgIHtcbiAgICAgICAgbGFzdF9tb2RpZmllZCxcbiAgICAgICAgcGF0Y2gsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICAgIHNhZmU6IHRoaXMuX2dldFNhZmUob3B0aW9ucyksXG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShyZXF1ZXN0LCB7IHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgZ3JvdXAgZnJvbSB0aGUgY3VycmVudCBidWNrZXQuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdHxTdHJpbmd9IGdyb3VwICAgICAgICAgICAgICAgICAgIFRoZSBncm91cCB0byBkZWxldGUuXG4gICAqIEBwYXJhbSAge09iamVjdH0gICAgICAgIFtvcHRpb25zPXt9XSAgICAgICAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgW29wdGlvbnMuaGVhZGVyc10gICAgICAgVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgICAgICAgW29wdGlvbnMucmV0cnk9MF0gICAgICAgTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59ICAgICAgIFtvcHRpb25zLnNhZmVdICAgICAgICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgICAgICAgW29wdGlvbnMubGFzdF9tb2RpZmllZF0gVGhlIGxhc3RfbW9kaWZpZWQgb3B0aW9uLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgZGVsZXRlR3JvdXAoZ3JvdXAsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGdyb3VwT2JqID0gdG9EYXRhQm9keShncm91cCk7XG4gICAgY29uc3QgeyBpZCB9ID0gZ3JvdXBPYmo7XG4gICAgY29uc3QgeyBsYXN0X21vZGlmaWVkIH0gPSB7IC4uLmdyb3VwT2JqLCAuLi5vcHRpb25zIH07XG4gICAgY29uc3QgcGF0aCA9IGVuZHBvaW50KFwiZ3JvdXBcIiwgdGhpcy5uYW1lLCBpZCk7XG4gICAgY29uc3QgcmVxdWVzdCA9IHJlcXVlc3RzLmRlbGV0ZVJlcXVlc3QocGF0aCwge1xuICAgICAgbGFzdF9tb2RpZmllZCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICBzYWZlOiB0aGlzLl9nZXRTYWZlKG9wdGlvbnMpLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKHJlcXVlc3QsIHsgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgbGlzdCBvZiBwZXJtaXNzaW9ucyBmb3IgdGhpcyBidWNrZXQuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnM9e31dICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zLmhlYWRlcnNdIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gW29wdGlvbnMucmV0cnk9MF0gTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0LCBFcnJvcj59XG4gICAqL1xuICBhc3luYyBnZXRQZXJtaXNzaW9ucyhvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCByZXF1ZXN0ID0ge1xuICAgICAgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSxcbiAgICAgIHBhdGg6IGVuZHBvaW50KFwiYnVja2V0XCIsIHRoaXMubmFtZSksXG4gICAgfTtcbiAgICBjb25zdCB7IHBlcm1pc3Npb25zIH0gPSBhd2FpdCB0aGlzLmNsaWVudC5leGVjdXRlKHJlcXVlc3QsIHtcbiAgICAgIHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSxcbiAgICB9KTtcbiAgICByZXR1cm4gcGVybWlzc2lvbnM7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIGV4aXN0aW5nIGJ1Y2tldCBwZXJtaXNzaW9ucyB3aXRoIHRoZSBvbmVzIHByb3ZpZGVkLlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBwZXJtaXNzaW9ucyAgICAgICAgICAgICBUaGUgcGVybWlzc2lvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucz17fV0gICAgICAgICAgICBUaGUgb3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gW29wdGlvbnMuc2FmZV0gICAgICAgICAgVGhlIHNhZmUgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucy5oZWFkZXJzPXt9XSAgICBUaGUgaGVhZGVycyBvYmplY3Qgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBbb3B0aW9ucy5yZXRyeT0wXSAgICAgICBOdW1iZXIgb2YgcmV0cmllcyB0byBtYWtlXG4gICAqICAgICB3aGVuIGZhY2VkIHdpdGggdHJhbnNpZW50IGVycm9ycy5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnMubGFzdF9tb2RpZmllZF0gVGhlIGxhc3RfbW9kaWZpZWQgb3B0aW9uLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgc2V0UGVybWlzc2lvbnMocGVybWlzc2lvbnMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICghaXNPYmplY3QocGVybWlzc2lvbnMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHBlcm1pc3Npb25zIG9iamVjdCBpcyByZXF1aXJlZC5cIik7XG4gICAgfVxuICAgIGNvbnN0IHBhdGggPSBlbmRwb2ludChcImJ1Y2tldFwiLCB0aGlzLm5hbWUpO1xuICAgIGNvbnN0IHsgbGFzdF9tb2RpZmllZCB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBkYXRhID0geyBsYXN0X21vZGlmaWVkIH07XG4gICAgY29uc3QgcmVxdWVzdCA9IHJlcXVlc3RzLnVwZGF0ZVJlcXVlc3QoXG4gICAgICBwYXRoLFxuICAgICAgeyBkYXRhLCBwZXJtaXNzaW9ucyB9LFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB0aGlzLl9nZXRIZWFkZXJzKG9wdGlvbnMpLFxuICAgICAgICBzYWZlOiB0aGlzLl9nZXRTYWZlKG9wdGlvbnMpLFxuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUocmVxdWVzdCwgeyByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucykgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kIHByaW5jaXBhbHMgdG8gdGhlIGJ1Y2tldCBwZXJtaXNzaW9ucy5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgcGVybWlzc2lvbnMgICAgICAgICAgICAgVGhlIHBlcm1pc3Npb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnM9e31dICAgICAgICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IFtvcHRpb25zLnNhZmVdICAgICAgICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnMuaGVhZGVyc10gICAgICAgVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMucmV0cnk9MF0gICAgICAgTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zLmxhc3RfbW9kaWZpZWRdIFRoZSBsYXN0X21vZGlmaWVkIG9wdGlvbi5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIGFkZFBlcm1pc3Npb25zKHBlcm1pc3Npb25zLCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAoIWlzT2JqZWN0KHBlcm1pc3Npb25zKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSBwZXJtaXNzaW9ucyBvYmplY3QgaXMgcmVxdWlyZWQuXCIpO1xuICAgIH1cbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJidWNrZXRcIiwgdGhpcy5uYW1lKTtcbiAgICBjb25zdCB7IGxhc3RfbW9kaWZpZWQgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgcmVxdWVzdCA9IHJlcXVlc3RzLmpzb25QYXRjaFBlcm1pc3Npb25zUmVxdWVzdChcbiAgICAgIHBhdGgsXG4gICAgICBwZXJtaXNzaW9ucyxcbiAgICAgIFwiYWRkXCIsXG4gICAgICB7XG4gICAgICAgIGxhc3RfbW9kaWZpZWQsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICAgIHNhZmU6IHRoaXMuX2dldFNhZmUob3B0aW9ucyksXG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShyZXF1ZXN0LCB7IHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgcHJpbmNpcGFscyBmcm9tIHRoZSBidWNrZXQgcGVybWlzc2lvbnMuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gIHBlcm1pc3Npb25zICAgICAgICAgICAgIFRoZSBwZXJtaXNzaW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XSAgICAgICAgICAgIFRoZSBvcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0gIHtCb29sZWFufSBbb3B0aW9ucy5zYWZlXSAgICAgICAgICBUaGUgc2FmZSBvcHRpb24uXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zLmhlYWRlcnNdICAgICAgIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gIFtvcHRpb25zLnJldHJ5PTBdICAgICAgIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucy5sYXN0X21vZGlmaWVkXSBUaGUgbGFzdF9tb2RpZmllZCBvcHRpb24uXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0LCBFcnJvcj59XG4gICAqL1xuICBhc3luYyByZW1vdmVQZXJtaXNzaW9ucyhwZXJtaXNzaW9ucywgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCFpc09iamVjdChwZXJtaXNzaW9ucykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgcGVybWlzc2lvbnMgb2JqZWN0IGlzIHJlcXVpcmVkLlwiKTtcbiAgICB9XG4gICAgY29uc3QgcGF0aCA9IGVuZHBvaW50KFwiYnVja2V0XCIsIHRoaXMubmFtZSk7XG4gICAgY29uc3QgeyBsYXN0X21vZGlmaWVkIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHJlcXVlc3QgPSByZXF1ZXN0cy5qc29uUGF0Y2hQZXJtaXNzaW9uc1JlcXVlc3QoXG4gICAgICBwYXRoLFxuICAgICAgcGVybWlzc2lvbnMsXG4gICAgICBcInJlbW92ZVwiLFxuICAgICAge1xuICAgICAgICBsYXN0X21vZGlmaWVkLFxuICAgICAgICBoZWFkZXJzOiB0aGlzLl9nZXRIZWFkZXJzKG9wdGlvbnMpLFxuICAgICAgICBzYWZlOiB0aGlzLl9nZXRTYWZlKG9wdGlvbnMpLFxuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUocmVxdWVzdCwgeyByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucykgfSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYmF0Y2ggb3BlcmF0aW9ucyBhdCB0aGUgY3VycmVudCBidWNrZXQgbGV2ZWwuXG4gICAqXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICAgICAgICAgICAgICAgICBUaGUgYmF0Y2ggb3BlcmF0aW9uIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgW29wdGlvbnM9e31dICAgICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgW29wdGlvbnMuaGVhZGVyc10gICAgVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gIFtvcHRpb25zLnNhZmVdICAgICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIFtvcHRpb25zLnJldHJ5PTBdICAgIFRoZSByZXRyeSBvcHRpb24uXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59ICBbb3B0aW9ucy5hZ2dyZWdhdGVdICBQcm9kdWNlcyBhIGdyb3VwZWQgcmVzdWx0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIGJhdGNoKGZuLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuYmF0Y2goZm4sIHtcbiAgICAgIGJ1Y2tldDogdGhpcy5uYW1lLFxuICAgICAgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSxcbiAgICAgIHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSxcbiAgICAgIHNhZmU6IHRoaXMuX2dldFNhZmUob3B0aW9ucyksXG4gICAgICBhZ2dyZWdhdGU6ICEhb3B0aW9ucy5hZ2dyZWdhdGUsXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tIFwidXVpZFwiO1xuXG5pbXBvcnQgeyBjYXBhYmxlLCB0b0RhdGFCb2R5LCBpc09iamVjdCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgKiBhcyByZXF1ZXN0cyBmcm9tIFwiLi9yZXF1ZXN0c1wiO1xuaW1wb3J0IGVuZHBvaW50IGZyb20gXCIuL2VuZHBvaW50XCI7XG5cbi8qKlxuICogQWJzdHJhY3QgcmVwcmVzZW50YXRpb24gb2YgYSBzZWxlY3RlZCBjb2xsZWN0aW9uLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtICB7S2ludG9DbGllbnR9ICBjbGllbnQgICAgICAgICAgICBUaGUgY2xpZW50IGluc3RhbmNlLlxuICAgKiBAcGFyYW0gIHtCdWNrZXR9ICAgICAgIGJ1Y2tldCAgICAgICAgICAgIFRoZSBidWNrZXQgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgbmFtZSAgICAgICAgICAgICAgVGhlIGNvbGxlY3Rpb24gbmFtZS5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgICAgICBbb3B0aW9ucz17fV0gICAgICBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gICAgICAgW29wdGlvbnMuaGVhZGVyc10gVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gICAgICBbb3B0aW9ucy5zYWZlXSAgICBUaGUgc2FmZSBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gICAgICAgW29wdGlvbnMucmV0cnldICAgVGhlIHJldHJ5IG9wdGlvbi5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gICAgICBbb3B0aW9ucy5iYXRjaF0gICAoUHJpdmF0ZSkgV2hldGhlciB0aGlzXG4gICAqICAgICBDb2xsZWN0aW9uIGlzIG9wZXJhdGluZyBhcyBwYXJ0IG9mIGEgYmF0Y2guXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjbGllbnQsIGJ1Y2tldCwgbmFtZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLmJ1Y2tldCA9IGJ1Y2tldDtcbiAgICAvKipcbiAgICAgKiBUaGUgY29sbGVjdGlvbiBuYW1lLlxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9pc0JhdGNoID0gISFvcHRpb25zLmJhdGNoO1xuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX3JldHJ5ID0gb3B0aW9ucy5yZXRyeSB8fCAwO1xuICAgIHRoaXMuX3NhZmUgPSAhIW9wdGlvbnMuc2FmZTtcbiAgICAvLyBGSVhNRTogVGhpcyBpcyBraW5kIG9mIHVnbHk7IHNob3VsZG4ndCB0aGUgYnVja2V0IGJlIHJlc3BvbnNpYmxlXG4gICAgLy8gZm9yIGRvaW5nIHRoZSBtZXJnZT9cbiAgICB0aGlzLl9oZWFkZXJzID0ge1xuICAgICAgLi4udGhpcy5idWNrZXQuX2hlYWRlcnMsXG4gICAgICAuLi5vcHRpb25zLmhlYWRlcnMsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIFwiaGVhZGVyc1wiIGZvciBhIGdpdmVuIHJlcXVlc3QsIG1lcmdpbmcgdGhlXG4gICAqIHBlci1yZXF1ZXN0IGhlYWRlcnMgd2l0aCBvdXIgb3duIFwiZGVmYXVsdFwiIGhlYWRlcnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0SGVhZGVycyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuX2hlYWRlcnMsXG4gICAgICAuLi5vcHRpb25zLmhlYWRlcnMsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIFwic2FmZVwiIGZvciBhIGdpdmVuIHJlcXVlc3QsIHVzaW5nIHRoZVxuICAgKiBwZXItcmVxdWVzdCBvcHRpb24gaWYgcHJlc2VudCBvciBmYWxsaW5nIGJhY2sgdG8gb3VyIGRlZmF1bHRcbiAgICogb3RoZXJ3aXNlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9ucyBmb3IgYSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIF9nZXRTYWZlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4geyBzYWZlOiB0aGlzLl9zYWZlLCAuLi5vcHRpb25zIH0uc2FmZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcyBfZ2V0U2FmZSwgYnV0IGZvciBcInJldHJ5XCIuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0UmV0cnkob3B0aW9ucykge1xuICAgIHJldHVybiB7IHJldHJ5OiB0aGlzLl9yZXRyeSwgLi4ub3B0aW9ucyB9LnJldHJ5O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgdG90YWwgbnVtYmVyIG9mIHJlY29yZHMgaW4gdGhpcyBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zPXt9XSAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9ucy5oZWFkZXJzXSBUaGUgaGVhZGVycyBvYmplY3Qgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IFtvcHRpb25zLnJldHJ5PTBdIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE51bWJlciwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgZ2V0VG90YWxSZWNvcmRzKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHBhdGggPSBlbmRwb2ludChcInJlY29yZFwiLCB0aGlzLmJ1Y2tldC5uYW1lLCB0aGlzLm5hbWUpO1xuICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9nZXRIZWFkZXJzKG9wdGlvbnMpLFxuICAgICAgcGF0aCxcbiAgICAgIG1ldGhvZDogXCJIRUFEXCIsXG4gICAgfTtcbiAgICBjb25zdCB7IGhlYWRlcnMgfSA9IGF3YWl0IHRoaXMuY2xpZW50LmV4ZWN1dGUocmVxdWVzdCwge1xuICAgICAgcmF3OiB0cnVlLFxuICAgICAgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpLFxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZUludChoZWFkZXJzLmdldChcIlRvdGFsLVJlY29yZHNcIiksIDEwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgY29sbGVjdGlvbiBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zPXt9XSAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9ucy5oZWFkZXJzXSBUaGUgaGVhZGVycyBvYmplY3Qgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IFtvcHRpb25zLnJldHJ5PTBdIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgZ2V0RGF0YShvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJjb2xsZWN0aW9uXCIsIHRoaXMuYnVja2V0Lm5hbWUsIHRoaXMubmFtZSk7XG4gICAgY29uc3QgcmVxdWVzdCA9IHsgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSwgcGF0aCB9O1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5jbGllbnQuZXhlY3V0ZShyZXF1ZXN0LCB7XG4gICAgICByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucyksXG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGNvbGxlY3Rpb24gZGF0YS5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIGRhdGEgICAgICAgICAgICAgICAgICAgIFRoZSBjb2xsZWN0aW9uIGRhdGEgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgW29wdGlvbnM9e31dICAgICAgICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgW29wdGlvbnMuaGVhZGVyc10gICAgICAgVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIFtvcHRpb25zLnJldHJ5PTBdICAgICAgIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcGFyYW0gIHtCb29sZWFufSAgW29wdGlvbnMuc2FmZV0gICAgICAgICAgVGhlIHNhZmUgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtCb29sZWFufSAgW29wdGlvbnMucGF0Y2hdICAgICAgICAgVGhlIHBhdGNoIG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIFtvcHRpb25zLmxhc3RfbW9kaWZpZWRdIFRoZSBsYXN0X21vZGlmaWVkIG9wdGlvbi5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIHNldERhdGEoZGF0YSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCFpc09iamVjdChkYXRhKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSBjb2xsZWN0aW9uIG9iamVjdCBpcyByZXF1aXJlZC5cIik7XG4gICAgfVxuICAgIGNvbnN0IHsgcGF0Y2gsIHBlcm1pc3Npb25zIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHsgbGFzdF9tb2RpZmllZCB9ID0geyAuLi5kYXRhLCAuLi5vcHRpb25zIH07XG5cbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJjb2xsZWN0aW9uXCIsIHRoaXMuYnVja2V0Lm5hbWUsIHRoaXMubmFtZSk7XG4gICAgY29uc3QgcmVxdWVzdCA9IHJlcXVlc3RzLnVwZGF0ZVJlcXVlc3QoXG4gICAgICBwYXRoLFxuICAgICAgeyBkYXRhLCBwZXJtaXNzaW9ucyB9LFxuICAgICAge1xuICAgICAgICBsYXN0X21vZGlmaWVkLFxuICAgICAgICBwYXRjaCxcbiAgICAgICAgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSxcbiAgICAgICAgc2FmZTogdGhpcy5fZ2V0U2FmZShvcHRpb25zKSxcbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKHJlcXVlc3QsIHsgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgbGlzdCBvZiBwZXJtaXNzaW9ucyBmb3IgdGhpcyBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zPXt9XSAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9ucy5oZWFkZXJzXSBUaGUgaGVhZGVycyBvYmplY3Qgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IFtvcHRpb25zLnJldHJ5PTBdIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgZ2V0UGVybWlzc2lvbnMob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgcGF0aCA9IGVuZHBvaW50KFwiY29sbGVjdGlvblwiLCB0aGlzLmJ1Y2tldC5uYW1lLCB0aGlzLm5hbWUpO1xuICAgIGNvbnN0IHJlcXVlc3QgPSB7IGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksIHBhdGggfTtcbiAgICBjb25zdCB7IHBlcm1pc3Npb25zIH0gPSBhd2FpdCB0aGlzLmNsaWVudC5leGVjdXRlKHJlcXVlc3QsIHtcbiAgICAgIHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSxcbiAgICB9KTtcbiAgICByZXR1cm4gcGVybWlzc2lvbnM7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIGV4aXN0aW5nIGNvbGxlY3Rpb24gcGVybWlzc2lvbnMgd2l0aCB0aGUgb25lcyBwcm92aWRlZC5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIHBlcm1pc3Npb25zICAgICAgICAgICAgIFRoZSBwZXJtaXNzaW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gICBbb3B0aW9ucz17fV0gICAgICAgICAgICBUaGUgb3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIFtvcHRpb25zLmhlYWRlcnNdICAgICAgIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gICBbb3B0aW9ucy5yZXRyeT0wXSAgICAgICBOdW1iZXIgb2YgcmV0cmllcyB0byBtYWtlXG4gICAqICAgICB3aGVuIGZhY2VkIHdpdGggdHJhbnNpZW50IGVycm9ycy5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gIFtvcHRpb25zLnNhZmVdICAgICAgICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIFtvcHRpb25zLmxhc3RfbW9kaWZpZWRdIFRoZSBsYXN0X21vZGlmaWVkIG9wdGlvbi5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIHNldFBlcm1pc3Npb25zKHBlcm1pc3Npb25zLCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAoIWlzT2JqZWN0KHBlcm1pc3Npb25zKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSBwZXJtaXNzaW9ucyBvYmplY3QgaXMgcmVxdWlyZWQuXCIpO1xuICAgIH1cbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJjb2xsZWN0aW9uXCIsIHRoaXMuYnVja2V0Lm5hbWUsIHRoaXMubmFtZSk7XG4gICAgY29uc3QgZGF0YSA9IHsgbGFzdF9tb2RpZmllZDogb3B0aW9ucy5sYXN0X21vZGlmaWVkIH07XG4gICAgY29uc3QgcmVxdWVzdCA9IHJlcXVlc3RzLnVwZGF0ZVJlcXVlc3QoXG4gICAgICBwYXRoLFxuICAgICAgeyBkYXRhLCBwZXJtaXNzaW9ucyB9LFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB0aGlzLl9nZXRIZWFkZXJzKG9wdGlvbnMpLFxuICAgICAgICBzYWZlOiB0aGlzLl9nZXRTYWZlKG9wdGlvbnMpLFxuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUocmVxdWVzdCwgeyByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucykgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kIHByaW5jaXBhbHMgdG8gdGhlIGNvbGxlY3Rpb24gcGVybWlzc2lvbnMuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gIHBlcm1pc3Npb25zICAgICAgICAgICAgIFRoZSBwZXJtaXNzaW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XSAgICAgICAgICAgIFRoZSBvcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0gIHtCb29sZWFufSBbb3B0aW9ucy5zYWZlXSAgICAgICAgICBUaGUgc2FmZSBvcHRpb24uXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zLmhlYWRlcnNdICAgICAgIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gIFtvcHRpb25zLnJldHJ5PTBdICAgICAgIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucy5sYXN0X21vZGlmaWVkXSBUaGUgbGFzdF9tb2RpZmllZCBvcHRpb24uXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0LCBFcnJvcj59XG4gICAqL1xuICBhc3luYyBhZGRQZXJtaXNzaW9ucyhwZXJtaXNzaW9ucywgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCFpc09iamVjdChwZXJtaXNzaW9ucykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgcGVybWlzc2lvbnMgb2JqZWN0IGlzIHJlcXVpcmVkLlwiKTtcbiAgICB9XG4gICAgY29uc3QgcGF0aCA9IGVuZHBvaW50KFwiY29sbGVjdGlvblwiLCB0aGlzLmJ1Y2tldC5uYW1lLCB0aGlzLm5hbWUpO1xuICAgIGNvbnN0IHsgbGFzdF9tb2RpZmllZCB9ID0gb3B0aW9ucztcbiAgICBjb25zdCByZXF1ZXN0ID0gcmVxdWVzdHMuanNvblBhdGNoUGVybWlzc2lvbnNSZXF1ZXN0KFxuICAgICAgcGF0aCxcbiAgICAgIHBlcm1pc3Npb25zLFxuICAgICAgXCJhZGRcIixcbiAgICAgIHtcbiAgICAgICAgbGFzdF9tb2RpZmllZCxcbiAgICAgICAgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSxcbiAgICAgICAgc2FmZTogdGhpcy5fZ2V0U2FmZShvcHRpb25zKSxcbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKHJlcXVlc3QsIHsgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBwcmluY2lwYWxzIGZyb20gdGhlIGNvbGxlY3Rpb24gcGVybWlzc2lvbnMuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gIHBlcm1pc3Npb25zICAgICAgICAgICAgIFRoZSBwZXJtaXNzaW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XSAgICAgICAgICAgIFRoZSBvcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0gIHtCb29sZWFufSBbb3B0aW9ucy5zYWZlXSAgICAgICAgICBUaGUgc2FmZSBvcHRpb24uXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zLmhlYWRlcnNdICAgICAgIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gIFtvcHRpb25zLnJldHJ5PTBdICAgICAgIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucy5sYXN0X21vZGlmaWVkXSBUaGUgbGFzdF9tb2RpZmllZCBvcHRpb24uXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0LCBFcnJvcj59XG4gICAqL1xuICBhc3luYyByZW1vdmVQZXJtaXNzaW9ucyhwZXJtaXNzaW9ucywgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCFpc09iamVjdChwZXJtaXNzaW9ucykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgcGVybWlzc2lvbnMgb2JqZWN0IGlzIHJlcXVpcmVkLlwiKTtcbiAgICB9XG4gICAgY29uc3QgcGF0aCA9IGVuZHBvaW50KFwiY29sbGVjdGlvblwiLCB0aGlzLmJ1Y2tldC5uYW1lLCB0aGlzLm5hbWUpO1xuICAgIGNvbnN0IHsgbGFzdF9tb2RpZmllZCB9ID0gb3B0aW9ucztcbiAgICBjb25zdCByZXF1ZXN0ID0gcmVxdWVzdHMuanNvblBhdGNoUGVybWlzc2lvbnNSZXF1ZXN0KFxuICAgICAgcGF0aCxcbiAgICAgIHBlcm1pc3Npb25zLFxuICAgICAgXCJyZW1vdmVcIixcbiAgICAgIHtcbiAgICAgICAgbGFzdF9tb2RpZmllZCxcbiAgICAgICAgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSxcbiAgICAgICAgc2FmZTogdGhpcy5fZ2V0U2FmZShvcHRpb25zKSxcbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKHJlcXVlc3QsIHsgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSByZWNvcmQgaW4gY3VycmVudCBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICByZWNvcmQgICAgICAgICAgICAgICAgVGhlIHJlY29yZCB0byBjcmVhdGUuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XSAgICAgICAgICBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zLmhlYWRlcnNdICAgICBUaGUgaGVhZGVycyBvYmplY3Qgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBbb3B0aW9ucy5yZXRyeT0wXSAgICAgTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IFtvcHRpb25zLnNhZmVdICAgICAgICBUaGUgc2FmZSBvcHRpb24uXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zLnBlcm1pc3Npb25zXSBUaGUgcGVybWlzc2lvbnMgb3B0aW9uLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgY3JlYXRlUmVjb3JkKHJlY29yZCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgeyBwZXJtaXNzaW9ucyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJyZWNvcmRcIiwgdGhpcy5idWNrZXQubmFtZSwgdGhpcy5uYW1lLCByZWNvcmQuaWQpO1xuICAgIGNvbnN0IHJlcXVlc3QgPSByZXF1ZXN0cy5jcmVhdGVSZXF1ZXN0KFxuICAgICAgcGF0aCxcbiAgICAgIHsgZGF0YTogcmVjb3JkLCBwZXJtaXNzaW9ucyB9LFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB0aGlzLl9nZXRIZWFkZXJzKG9wdGlvbnMpLFxuICAgICAgICBzYWZlOiB0aGlzLl9nZXRTYWZlKG9wdGlvbnMpLFxuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUocmVxdWVzdCwgeyByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucykgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBhdHRhY2htZW50IHRvIGEgcmVjb3JkLCBjcmVhdGluZyB0aGUgcmVjb3JkIHdoZW4gaXQgZG9lc24ndCBleGlzdC5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfSAgZGF0YVVSTCAgICAgICAgICAgICAgICAgVGhlIGRhdGEgdXJsLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbcmVjb3JkPXt9XSAgICAgICAgICAgICBUaGUgcmVjb3JkIGRhdGEuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XSAgICAgICAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnMuaGVhZGVyc10gICAgICAgVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMucmV0cnk9MF0gICAgICAgTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IFtvcHRpb25zLnNhZmVdICAgICAgICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMubGFzdF9tb2RpZmllZF0gVGhlIGxhc3RfbW9kaWZpZWQgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucy5wZXJtaXNzaW9uc10gICBUaGUgcGVybWlzc2lvbnMgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBbb3B0aW9ucy5maWxlbmFtZV0gICAgICBGb3JjZSB0aGUgYXR0YWNobWVudCBmaWxlbmFtZS5cbiAgICogQHBhcmFtICB7U3RyaW5nfSAgW29wdGlvbnMuZ3ppcHBlZF0gICAgICAgRm9yY2UgdGhlIGF0dGFjaG1lbnQgdG8gYmUgZ3ppcHBlZCBvciBub3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0LCBFcnJvcj59XG4gICAqL1xuICBAY2FwYWJsZShbXCJhdHRhY2htZW50c1wiXSlcbiAgYXN5bmMgYWRkQXR0YWNobWVudChkYXRhVVJJLCByZWNvcmQgPSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgeyBwZXJtaXNzaW9ucyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBpZCA9IHJlY29yZC5pZCB8fCB1dWlkLnY0KCk7XG4gICAgY29uc3QgcGF0aCA9IGVuZHBvaW50KFwiYXR0YWNobWVudFwiLCB0aGlzLmJ1Y2tldC5uYW1lLCB0aGlzLm5hbWUsIGlkKTtcbiAgICBjb25zdCB7IGxhc3RfbW9kaWZpZWQgfSA9IHsgLi4ucmVjb3JkLCAuLi5vcHRpb25zIH07XG4gICAgY29uc3QgYWRkQXR0YWNobWVudFJlcXVlc3QgPSByZXF1ZXN0cy5hZGRBdHRhY2htZW50UmVxdWVzdChcbiAgICAgIHBhdGgsXG4gICAgICBkYXRhVVJJLFxuICAgICAgeyBkYXRhOiByZWNvcmQsIHBlcm1pc3Npb25zIH0sXG4gICAgICB7XG4gICAgICAgIGxhc3RfbW9kaWZpZWQsXG4gICAgICAgIGZpbGVuYW1lOiBvcHRpb25zLmZpbGVuYW1lLFxuICAgICAgICBnemlwcGVkOiBvcHRpb25zLmd6aXBwZWQsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICAgIHNhZmU6IHRoaXMuX2dldFNhZmUob3B0aW9ucyksXG4gICAgICB9XG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLmNsaWVudC5leGVjdXRlKGFkZEF0dGFjaG1lbnRSZXF1ZXN0LCB7XG4gICAgICBzdHJpbmdpZnk6IGZhbHNlLFxuICAgICAgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmdldFJlY29yZChpZCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBhdHRhY2htZW50IGZyb20gYSBnaXZlbiByZWNvcmQuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gIHJlY29yZElkICAgICAgICAgICAgICAgIFRoZSByZWNvcmQgaWQuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XSAgICAgICAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnMuaGVhZGVyc10gICAgICAgVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMucmV0cnk9MF0gICAgICAgTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IFtvcHRpb25zLnNhZmVdICAgICAgICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMubGFzdF9tb2RpZmllZF0gVGhlIGxhc3RfbW9kaWZpZWQgb3B0aW9uLlxuICAgKi9cbiAgQGNhcGFibGUoW1wiYXR0YWNobWVudHNcIl0pXG4gIGFzeW5jIHJlbW92ZUF0dGFjaG1lbnQocmVjb3JkSWQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHsgbGFzdF9tb2RpZmllZCB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJhdHRhY2htZW50XCIsIHRoaXMuYnVja2V0Lm5hbWUsIHRoaXMubmFtZSwgcmVjb3JkSWQpO1xuICAgIGNvbnN0IHJlcXVlc3QgPSByZXF1ZXN0cy5kZWxldGVSZXF1ZXN0KHBhdGgsIHtcbiAgICAgIGxhc3RfbW9kaWZpZWQsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9nZXRIZWFkZXJzKG9wdGlvbnMpLFxuICAgICAgc2FmZTogdGhpcy5fZ2V0U2FmZShvcHRpb25zKSxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShyZXF1ZXN0LCB7IHJldHJ5OiB0aGlzLl9nZXRSZXRyeShvcHRpb25zKSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGEgcmVjb3JkIGluIGN1cnJlbnQgY29sbGVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgcmVjb3JkICAgICAgICAgICAgICAgICAgVGhlIHJlY29yZCB0byB1cGRhdGUuXG4gICAqIEBwYXJhbSAge09iamVjdH0gIFtvcHRpb25zPXt9XSAgICAgICAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgW29wdGlvbnMuaGVhZGVyc10gICAgICAgVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMucmV0cnk9MF0gICAgICAgTnVtYmVyIG9mIHJldHJpZXMgdG8gbWFrZVxuICAgKiAgICAgd2hlbiBmYWNlZCB3aXRoIHRyYW5zaWVudCBlcnJvcnMuXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IFtvcHRpb25zLnNhZmVdICAgICAgICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgW29wdGlvbnMubGFzdF9tb2RpZmllZF0gVGhlIGxhc3RfbW9kaWZpZWQgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBbb3B0aW9ucy5wZXJtaXNzaW9uc10gICBUaGUgcGVybWlzc2lvbnMgb3B0aW9uLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgdXBkYXRlUmVjb3JkKHJlY29yZCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCFpc09iamVjdChyZWNvcmQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHJlY29yZCBvYmplY3QgaXMgcmVxdWlyZWQuXCIpO1xuICAgIH1cbiAgICBpZiAoIXJlY29yZC5pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSByZWNvcmQgaWQgaXMgcmVxdWlyZWQuXCIpO1xuICAgIH1cbiAgICBjb25zdCB7IHBlcm1pc3Npb25zIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHsgbGFzdF9tb2RpZmllZCB9ID0geyAuLi5yZWNvcmQsIC4uLm9wdGlvbnMgfTtcbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJyZWNvcmRcIiwgdGhpcy5idWNrZXQubmFtZSwgdGhpcy5uYW1lLCByZWNvcmQuaWQpO1xuICAgIGNvbnN0IHJlcXVlc3QgPSByZXF1ZXN0cy51cGRhdGVSZXF1ZXN0KFxuICAgICAgcGF0aCxcbiAgICAgIHsgZGF0YTogcmVjb3JkLCBwZXJtaXNzaW9ucyB9LFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB0aGlzLl9nZXRIZWFkZXJzKG9wdGlvbnMpLFxuICAgICAgICBzYWZlOiB0aGlzLl9nZXRTYWZlKG9wdGlvbnMpLFxuICAgICAgICBsYXN0X21vZGlmaWVkLFxuICAgICAgICBwYXRjaDogISFvcHRpb25zLnBhdGNoLFxuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUocmVxdWVzdCwgeyByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucykgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhIHJlY29yZCBmcm9tIHRoZSBjdXJyZW50IGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdHxTdHJpbmd9IHJlY29yZCAgICAgICAgICAgICAgICAgIFRoZSByZWNvcmQgdG8gZGVsZXRlLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICBbb3B0aW9ucz17fV0gICAgICAgICAgICBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gICAgICAgIFtvcHRpb25zLmhlYWRlcnNdICAgICAgIFRoZSBoZWFkZXJzIG9iamVjdCBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gICAgICAgIFtvcHRpb25zLnJldHJ5PTBdICAgICAgIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcGFyYW0gIHtCb29sZWFufSAgICAgICBbb3B0aW9ucy5zYWZlXSAgICAgICAgICBUaGUgc2FmZSBvcHRpb24uXG4gICAqIEBwYXJhbSAge051bWJlcn0gICAgICAgIFtvcHRpb25zLmxhc3RfbW9kaWZpZWRdIFRoZSBsYXN0X21vZGlmaWVkIG9wdGlvbi5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIGRlbGV0ZVJlY29yZChyZWNvcmQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHJlY29yZE9iaiA9IHRvRGF0YUJvZHkocmVjb3JkKTtcbiAgICBpZiAoIXJlY29yZE9iai5pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSByZWNvcmQgaWQgaXMgcmVxdWlyZWQuXCIpO1xuICAgIH1cbiAgICBjb25zdCB7IGlkIH0gPSByZWNvcmRPYmo7XG4gICAgY29uc3QgeyBsYXN0X21vZGlmaWVkIH0gPSB7IC4uLnJlY29yZE9iaiwgLi4ub3B0aW9ucyB9O1xuICAgIGNvbnN0IHBhdGggPSBlbmRwb2ludChcInJlY29yZFwiLCB0aGlzLmJ1Y2tldC5uYW1lLCB0aGlzLm5hbWUsIGlkKTtcbiAgICBjb25zdCByZXF1ZXN0ID0gcmVxdWVzdHMuZGVsZXRlUmVxdWVzdChwYXRoLCB7XG4gICAgICBsYXN0X21vZGlmaWVkLFxuICAgICAgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSxcbiAgICAgIHNhZmU6IHRoaXMuX2dldFNhZmUob3B0aW9ucyksXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUocmVxdWVzdCwgeyByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucykgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGEgcmVjb3JkIGZyb20gdGhlIGN1cnJlbnQgY29sbGVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAgICAgICAgICAgICAgICBUaGUgcmVjb3JkIGlkIHRvIHJldHJpZXZlLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zPXt9XSAgICAgIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9ucy5oZWFkZXJzXSBUaGUgaGVhZGVycyBvYmplY3Qgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IFtvcHRpb25zLnJldHJ5PTBdIE51bWJlciBvZiByZXRyaWVzIHRvIG1ha2VcbiAgICogICAgIHdoZW4gZmFjZWQgd2l0aCB0cmFuc2llbnQgZXJyb3JzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fVxuICAgKi9cbiAgYXN5bmMgZ2V0UmVjb3JkKGlkLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJyZWNvcmRcIiwgdGhpcy5idWNrZXQubmFtZSwgdGhpcy5uYW1lLCBpZCk7XG4gICAgY29uc3QgcmVxdWVzdCA9IHsgaGVhZGVyczogdGhpcy5fZ2V0SGVhZGVycyhvcHRpb25zKSwgcGF0aCB9O1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKHJlcXVlc3QsIHsgcmV0cnk6IHRoaXMuX2dldFJldHJ5KG9wdGlvbnMpIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RzIHJlY29yZHMgZnJvbSB0aGUgY3VycmVudCBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBTb3J0aW5nIGlzIGRvbmUgYnkgcGFzc2luZyBhIGBzb3J0YCBzdHJpbmcgb3B0aW9uOlxuICAgKlxuICAgKiAtIFRoZSBmaWVsZCB0byBvcmRlciB0aGUgcmVzdWx0cyBieSwgcHJlZml4ZWQgd2l0aCBgLWAgZm9yIGRlc2NlbmRpbmcuXG4gICAqIERlZmF1bHQ6IGAtbGFzdF9tb2RpZmllZGAuXG4gICAqXG4gICAqIEBzZWUgaHR0cDovL2tpbnRvLnJlYWR0aGVkb2NzLmlvL2VuL3N0YWJsZS9hcGkvMS54L3NvcnRpbmcuaHRtbFxuICAgKlxuICAgKiBGaWx0ZXJpbmcgaXMgZG9uZSBieSBwYXNzaW5nIGEgYGZpbHRlcnNgIG9wdGlvbiBvYmplY3Q6XG4gICAqXG4gICAqIC0gYHtmaWVsZG5hbWU6IFwidmFsdWVcIn1gXG4gICAqIC0gYHttaW5fZmllbGRuYW1lOiA0MDAwfWBcbiAgICogLSBge2luX2ZpZWxkbmFtZTogXCIxLDIsM1wifWBcbiAgICogLSBge25vdF9maWVsZG5hbWU6IDB9YFxuICAgKiAtIGB7ZXhjbHVkZV9maWVsZG5hbWU6IFwiMCwxXCJ9YFxuICAgKlxuICAgKiBAc2VlIGh0dHA6Ly9raW50by5yZWFkdGhlZG9jcy5pby9lbi9zdGFibGUvYXBpLzEueC9maWx0ZXJpbmcuaHRtbFxuICAgKlxuICAgKiBQYWdpbmF0aW5nIGlzIGRvbmUgYnkgcGFzc2luZyBhIGBsaW1pdGAgb3B0aW9uLCB0aGVuIGNhbGxpbmcgdGhlIGBuZXh0KClgXG4gICAqIG1ldGhvZCBmcm9tIHRoZSByZXNvbHZlZCByZXN1bHQgb2JqZWN0IHRvIGZldGNoIHRoZSBuZXh0IHBhZ2UsIGlmIGFueS5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIFtvcHRpb25zPXt9XSAgICAgICAgICAgICAgICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgW29wdGlvbnMuaGVhZGVyc10gICAgICAgICAgICAgICBUaGUgaGVhZGVycyBvYmplY3Qgb3B0aW9uLlxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgW29wdGlvbnMucmV0cnk9MF0gICAgICAgICAgICAgICBOdW1iZXIgb2YgcmV0cmllcyB0byBtYWtlXG4gICAqICAgICB3aGVuIGZhY2VkIHdpdGggdHJhbnNpZW50IGVycm9ycy5cbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIFtvcHRpb25zLmZpbHRlcnM9W11dICAgICAgICAgICAgVGhlIGZpbHRlcnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgW29wdGlvbnMuc29ydD1cIi1sYXN0X21vZGlmaWVkXCJdIFRoZSBzb3J0IGZpZWxkLlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgW29wdGlvbnMuYXRdICAgICAgICAgICAgICAgICAgICBUaGUgdGltZXN0YW1wIHRvIGdldCBhIHNuYXBzaG90IGF0LlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgW29wdGlvbnMubGltaXQ9bnVsbF0gICAgICAgICAgICBUaGUgbGltaXQgZmllbGQuXG4gICAqIEBwYXJhbSAge1N0cmluZ30gICBbb3B0aW9ucy5wYWdlcz0xXSAgICAgICAgICAgICAgIFRoZSBudW1iZXIgb2YgcmVzdWx0IHBhZ2VzIHRvIGFnZ3JlZ2F0ZS5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIFtvcHRpb25zLnNpbmNlPW51bGxdICAgICAgICAgICAgT25seSByZXRyaWV2ZSByZWNvcmRzIG1vZGlmaWVkIHNpbmNlIHRoZSBwcm92aWRlZCB0aW1lc3RhbXAuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0LCBFcnJvcj59XG4gICAqL1xuICBhc3luYyBsaXN0UmVjb3JkcyhvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBwYXRoID0gZW5kcG9pbnQoXCJyZWNvcmRcIiwgdGhpcy5idWNrZXQubmFtZSwgdGhpcy5uYW1lKTtcbiAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcImF0XCIpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTbmFwc2hvdChvcHRpb25zLmF0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBhZ2luYXRlZExpc3QocGF0aCwgb3B0aW9ucywge1xuICAgICAgICBoZWFkZXJzOiB0aGlzLl9nZXRIZWFkZXJzKG9wdGlvbnMpLFxuICAgICAgICByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucyksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIGlzSGlzdG9yeUNvbXBsZXRlKCkge1xuICAgIC8vIFdlIGNvbnNpZGVyIHRoYXQgaWYgd2UgaGF2ZSB0aGUgY29sbGVjdGlvbiBjcmVhdGlvbiBldmVudCBwYXJ0IG9mIHRoZVxuICAgIC8vIGhpc3RvcnksIHRoZW4gYWxsIHJlY29yZHMgY2hhbmdlIGV2ZW50cyBoYXZlIGJlZW4gdHJhY2tlZC5cbiAgICBjb25zdCB7IGRhdGE6IFtvbGRlc3RIaXN0b3J5RW50cnldIH0gPSBhd2FpdCB0aGlzLmJ1Y2tldC5saXN0SGlzdG9yeSh7XG4gICAgICBsaW1pdDogMSxcbiAgICAgIGZpbHRlcnM6IHtcbiAgICAgICAgYWN0aW9uOiBcImNyZWF0ZVwiLFxuICAgICAgICByZXNvdXJjZV9uYW1lOiBcImNvbGxlY3Rpb25cIixcbiAgICAgICAgY29sbGVjdGlvbl9pZDogdGhpcy5uYW1lLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gISFvbGRlc3RIaXN0b3J5RW50cnk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIGxpc3RDaGFuZ2VzQmFja1RvKGF0KSB7XG4gICAgLy8gRW5zdXJlIHdlIGhhdmUgZW5vdWdoIGhpc3RvcnkgZGF0YSB0byByZXRyaWV2ZSB0aGUgY29tcGxldGUgbGlzdCBvZlxuICAgIC8vIGNoYW5nZXMuXG4gICAgaWYgKCFhd2FpdCB0aGlzLmlzSGlzdG9yeUNvbXBsZXRlKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJDb21wdXRpbmcgYSBzbmFwc2hvdCBpcyBvbmx5IHBvc3NpYmxlIHdoZW4gdGhlIGZ1bGwgaGlzdG9yeSBmb3IgYSBcIiArXG4gICAgICAgICAgXCJjb2xsZWN0aW9uIGlzIGF2YWlsYWJsZS4gSGVyZSwgdGhlIGhpc3RvcnkgcGx1Z2luIHNlZW1zIHRvIGhhdmUgXCIgK1xuICAgICAgICAgIFwiYmVlbiBlbmFibGVkIGFmdGVyIHRoZSBjcmVhdGlvbiBvZiB0aGUgY29sbGVjdGlvbi5cIlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgeyBkYXRhOiBjaGFuZ2VzIH0gPSBhd2FpdCB0aGlzLmJ1Y2tldC5saXN0SGlzdG9yeSh7XG4gICAgICBwYWdlczogSW5maW5pdHksIC8vIGFsbCBwYWdlcyB1cCB0byB0YXJnZXQgdGltZXN0YW1wIGFyZSByZXF1aXJlZFxuICAgICAgc29ydDogXCItdGFyZ2V0LmRhdGEubGFzdF9tb2RpZmllZFwiLFxuICAgICAgZmlsdGVyczoge1xuICAgICAgICByZXNvdXJjZV9uYW1lOiBcInJlY29yZFwiLFxuICAgICAgICBjb2xsZWN0aW9uX2lkOiB0aGlzLm5hbWUsXG4gICAgICAgIFwibWF4X3RhcmdldC5kYXRhLmxhc3RfbW9kaWZpZWRcIjogU3RyaW5nKGF0KSwgLy8gZXEuIHRvIDw9XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJldHVybiBjaGFuZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBAY2FwYWJsZShbXCJoaXN0b3J5XCJdKVxuICBhc3luYyBnZXRTbmFwc2hvdChhdCkge1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihhdCkgfHwgYXQgPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudCwgZXhwZWN0ZWQgYSBwb3NpdGl2ZSBpbnRlZ2VyLlwiKTtcbiAgICB9XG4gICAgLy8gUmV0cmlldmUgaGlzdG9yeSBhbmQgY2hlY2sgaXQgY292ZXJzIHRoZSByZXF1aXJlZCB0aW1lIHJhbmdlLlxuICAgIGNvbnN0IGNoYW5nZXMgPSBhd2FpdCB0aGlzLmxpc3RDaGFuZ2VzQmFja1RvKGF0KTtcbiAgICAvLyBSZXBsYXkgY2hhbmdlcyB0byBjb21wdXRlIHRoZSByZXF1ZXN0ZWQgc25hcHNob3QuXG4gICAgY29uc3Qgc2VlbklkcyA9IG5ldyBTZXQoKTtcbiAgICBsZXQgc25hcHNob3QgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHsgYWN0aW9uLCB0YXJnZXQ6IHsgZGF0YTogcmVjb3JkIH0gfSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoYWN0aW9uID09IFwiZGVsZXRlXCIpIHtcbiAgICAgICAgc2Vlbklkcy5hZGQocmVjb3JkLmlkKTsgLy8gZW5zdXJlIG5vdCByZXByb2Nlc3NpbmcgZGVsZXRlZCBlbnRyaWVzXG4gICAgICAgIHNuYXBzaG90ID0gc25hcHNob3QuZmlsdGVyKHIgPT4gci5pZCAhPT0gcmVjb3JkLmlkKTtcbiAgICAgIH0gZWxzZSBpZiAoIXNlZW5JZHMuaGFzKHJlY29yZC5pZCkpIHtcbiAgICAgICAgc2Vlbklkcy5hZGQocmVjb3JkLmlkKTtcbiAgICAgICAgc25hcHNob3QucHVzaChyZWNvcmQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgbGFzdF9tb2RpZmllZDogU3RyaW5nKGF0KSxcbiAgICAgIGRhdGE6IHNuYXBzaG90LnNvcnQoKGEsIGIpID0+IGIubGFzdF9tb2RpZmllZCAtIGEubGFzdF9tb2RpZmllZCksXG4gICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNuYXBzaG90cyBkb24ndCBzdXBwb3J0IHBhZ2luYXRpb25cIik7XG4gICAgICB9LFxuICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgdG90YWxSZWNvcmRzOiBzbmFwc2hvdC5sZW5ndGgsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBiYXRjaCBvcGVyYXRpb25zIGF0IHRoZSBjdXJyZW50IGNvbGxlY3Rpb24gbGV2ZWwuXG4gICAqXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICAgICAgICAgICAgICAgICBUaGUgYmF0Y2ggb3BlcmF0aW9uIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgW29wdGlvbnM9e31dICAgICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgW29wdGlvbnMuaGVhZGVyc10gICAgVGhlIGhlYWRlcnMgb2JqZWN0IG9wdGlvbi5cbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gIFtvcHRpb25zLnNhZmVdICAgICAgIFRoZSBzYWZlIG9wdGlvbi5cbiAgICogQHBhcmFtICB7TnVtYmVyfSAgIFtvcHRpb25zLnJldHJ5XSAgICAgIFRoZSByZXRyeSBvcHRpb24uXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59ICBbb3B0aW9ucy5hZ2dyZWdhdGVdICBQcm9kdWNlcyBhIGdyb3VwZWQgcmVzdWx0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn1cbiAgICovXG4gIGFzeW5jIGJhdGNoKGZuLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuYmF0Y2goZm4sIHtcbiAgICAgIGJ1Y2tldDogdGhpcy5idWNrZXQubmFtZSxcbiAgICAgIGNvbGxlY3Rpb246IHRoaXMubmFtZSxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2dldEhlYWRlcnMob3B0aW9ucyksXG4gICAgICByZXRyeTogdGhpcy5fZ2V0UmV0cnkob3B0aW9ucyksXG4gICAgICBzYWZlOiB0aGlzLl9nZXRTYWZlKG9wdGlvbnMpLFxuICAgICAgYWdncmVnYXRlOiAhIW9wdGlvbnMuYWdncmVnYXRlLFxuICAgIH0pO1xuICB9XG59XG4iLCIvKipcbiAqIEVuZHBvaW50cyB0ZW1wbGF0ZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBFTkRQT0lOVFMgPSB7XG4gIHJvb3Q6ICgpID0+IFwiL1wiLFxuICBiYXRjaDogKCkgPT4gXCIvYmF0Y2hcIixcbiAgcGVybWlzc2lvbnM6ICgpID0+IFwiL3Blcm1pc3Npb25zXCIsXG4gIGJ1Y2tldDogYnVja2V0ID0+IFwiL2J1Y2tldHNcIiArIChidWNrZXQgPyBgLyR7YnVja2V0fWAgOiBcIlwiKSxcbiAgaGlzdG9yeTogYnVja2V0ID0+IGAke0VORFBPSU5UUy5idWNrZXQoYnVja2V0KX0vaGlzdG9yeWAsXG4gIGNvbGxlY3Rpb246IChidWNrZXQsIGNvbGwpID0+XG4gICAgYCR7RU5EUE9JTlRTLmJ1Y2tldChidWNrZXQpfS9jb2xsZWN0aW9uc2AgKyAoY29sbCA/IGAvJHtjb2xsfWAgOiBcIlwiKSxcbiAgZ3JvdXA6IChidWNrZXQsIGdyb3VwKSA9PlxuICAgIGAke0VORFBPSU5UUy5idWNrZXQoYnVja2V0KX0vZ3JvdXBzYCArIChncm91cCA/IGAvJHtncm91cH1gIDogXCJcIiksXG4gIHJlY29yZDogKGJ1Y2tldCwgY29sbCwgaWQpID0+XG4gICAgYCR7RU5EUE9JTlRTLmNvbGxlY3Rpb24oYnVja2V0LCBjb2xsKX0vcmVjb3Jkc2AgKyAoaWQgPyBgLyR7aWR9YCA6IFwiXCIpLFxuICBhdHRhY2htZW50OiAoYnVja2V0LCBjb2xsLCBpZCkgPT5cbiAgICBgJHtFTkRQT0lOVFMucmVjb3JkKGJ1Y2tldCwgY29sbCwgaWQpfS9hdHRhY2htZW50YCxcbn07XG5cbi8qKlxuICogUmV0cmlldmVzIGEgc2VydmVyIGVucG9pbnQgYnkgaXRzIG5hbWUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgbmFtZSBUaGUgZW5kcG9pbnQgbmFtZS5cbiAqIEBwYXJhbSAgey4uLnN0cmluZ30gYXJncyBUaGUgZW5kcG9pbnQgcGFyYW1ldGVycy5cbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5kcG9pbnQobmFtZSwgLi4uYXJncykge1xuICByZXR1cm4gRU5EUE9JTlRTW25hbWVdKC4uLmFyZ3MpO1xufVxuIiwiLyoqXG4gKiBLaW50byBzZXJ2ZXIgZXJyb3IgY29kZSBkZXNjcmlwdG9ycy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IEVSUk9SX0NPREVTID0ge1xuICAxMDQ6IFwiTWlzc2luZyBBdXRob3JpemF0aW9uIFRva2VuXCIsXG4gIDEwNTogXCJJbnZhbGlkIEF1dGhvcml6YXRpb24gVG9rZW5cIixcbiAgMTA2OiBcIlJlcXVlc3QgYm9keSB3YXMgbm90IHZhbGlkIEpTT05cIixcbiAgMTA3OiBcIkludmFsaWQgcmVxdWVzdCBwYXJhbWV0ZXJcIixcbiAgMTA4OiBcIk1pc3NpbmcgcmVxdWVzdCBwYXJhbWV0ZXJcIixcbiAgMTA5OiBcIkludmFsaWQgcG9zdGVkIGRhdGFcIixcbiAgMTEwOiBcIkludmFsaWQgVG9rZW4gLyBpZFwiLFxuICAxMTE6IFwiTWlzc2luZyBUb2tlbiAvIGlkXCIsXG4gIDExMjogXCJDb250ZW50LUxlbmd0aCBoZWFkZXIgd2FzIG5vdCBwcm92aWRlZFwiLFxuICAxMTM6IFwiUmVxdWVzdCBib2R5IHRvbyBsYXJnZVwiLFxuICAxMTQ6IFwiUmVzb3VyY2Ugd2FzIGNyZWF0ZWQsIHVwZGF0ZWQgb3IgZGVsZXRlZCBtZWFud2hpbGVcIixcbiAgMTE1OiBcIk1ldGhvZCBub3QgYWxsb3dlZCBvbiB0aGlzIGVuZCBwb2ludCAoaGludDogc2VydmVyIG1heSBiZSByZWFkb25seSlcIixcbiAgMTE2OiBcIlJlcXVlc3RlZCB2ZXJzaW9uIG5vdCBhdmFpbGFibGUgb24gdGhpcyBzZXJ2ZXJcIixcbiAgMTE3OiBcIkNsaWVudCBoYXMgc2VudCB0b28gbWFueSByZXF1ZXN0c1wiLFxuICAxMjE6IFwiUmVzb3VyY2UgYWNjZXNzIGlzIGZvcmJpZGRlbiBmb3IgdGhpcyB1c2VyXCIsXG4gIDEyMjogXCJBbm90aGVyIHJlc291cmNlIHZpb2xhdGVzIGNvbnN0cmFpbnRcIixcbiAgMjAxOiBcIlNlcnZpY2UgVGVtcG9yYXJ5IHVuYXZhaWxhYmxlIGR1ZSB0byBoaWdoIGxvYWRcIixcbiAgMjAyOiBcIlNlcnZpY2UgZGVwcmVjYXRlZFwiLFxuICA5OTk6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFUlJPUl9DT0RFUztcblxuY2xhc3MgTmV0d29ya1RpbWVvdXRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IodXJsLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoXG4gICAgICBgVGltZW91dCB3aGlsZSB0cnlpbmcgdG8gYWNjZXNzICR7dXJsfSB3aXRoICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YFxuICAgICk7XG5cbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIE5ldHdvcmtUaW1lb3V0RXJyb3IpO1xuICAgIH1cblxuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cbn1cblxuY2xhc3MgVW5wYXJzZWFibGVSZXNwb25zZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihyZXNwb25zZSwgYm9keSwgZXJyb3IpIHtcbiAgICBjb25zdCB7IHN0YXR1cyB9ID0gcmVzcG9uc2U7XG5cbiAgICBzdXBlcihcbiAgICAgIGBSZXNwb25zZSBmcm9tIHNlcnZlciB1bnBhcnNlYWJsZSAoSFRUUCAke3N0YXR1cyB8fFxuICAgICAgICAwfTsgJHtlcnJvcn0pOiAke2JvZHl9YFxuICAgICk7XG5cbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIFVucGFyc2VhYmxlUmVzcG9uc2VFcnJvcik7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIHRoaXMuc3RhY2sgPSBlcnJvci5zdGFjaztcbiAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gIH1cbn1cblxuLyoqXG4gKiBcIkVycm9yXCIgc3ViY2xhc3MgcmVwcmVzZW50aW5nIGEgPj00MDAgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIFdoZXRoZXIgb3Igbm90IHRoaXMgaXMgYW4gZXJyb3IgZGVwZW5kcyBvbiB5b3VyIGFwcGxpY2F0aW9uLlxuICpcbiAqIFRoZSBganNvbmAgZmllbGQgY2FuIGJlIHVuZGVmaW5lZCBpZiB0aGUgc2VydmVyIHJlc3BvbmRlZCB3aXRoIGFuXG4gKiBlbXB0eSByZXNwb25zZSBib2R5LiBUaGlzIHNob3VsZG4ndCBnZW5lcmFsbHkgaGFwcGVuLiBNb3N0IFwiYmFkXCJcbiAqIHJlc3BvbnNlcyBjb21lIHdpdGggYSBKU09OIGVycm9yIGRlc2NyaXB0aW9uLCBvciAoaWYgdGhleSdyZVxuICogZnJvbnRlZCBieSBhIENETiBvciBuZ2lueCBvciBzb21ldGhpbmcpIG9jY2FzaW9uYWxseSBub24tSlNPTlxuICogcmVzcG9uc2VzICh3aGljaCBiZWNvbWUgVW5wYXJzZWFibGVSZXNwb25zZUVycm9ycywgYWJvdmUpLlxuICovXG5jbGFzcyBTZXJ2ZXJSZXNwb25zZSBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IocmVzcG9uc2UsIGpzb24pIHtcbiAgICBjb25zdCB7IHN0YXR1cyB9ID0gcmVzcG9uc2U7XG4gICAgbGV0IHsgc3RhdHVzVGV4dCB9ID0gcmVzcG9uc2U7XG4gICAgbGV0IGVycm5vTXNnO1xuXG4gICAgaWYgKGpzb24pIHtcbiAgICAgIC8vIFRyeSB0byBmaWxsIGluIGluZm9ybWF0aW9uIGZyb20gdGhlIEpTT04gZXJyb3IuXG4gICAgICBzdGF0dXNUZXh0ID0ganNvbi5lcnJvciB8fCBzdGF0dXNUZXh0O1xuXG4gICAgICAvLyBUYWtlIGVycm5vTXNnIGZyb20gZWl0aGVyIEVSUk9SX0NPREVTIG9yIGpzb24ubWVzc2FnZS5cbiAgICAgIGlmIChqc29uLmVycm5vICYmIGpzb24uZXJybm8gaW4gRVJST1JfQ09ERVMpIHtcbiAgICAgICAgZXJybm9Nc2cgPSBFUlJPUl9DT0RFU1tqc29uLmVycm5vXTtcbiAgICAgIH0gZWxzZSBpZiAoanNvbi5tZXNzYWdlKSB7XG4gICAgICAgIGVycm5vTXNnID0ganNvbi5tZXNzYWdlO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSBoYWQgYm90aCBFUlJPUl9DT0RFUyBhbmQganNvbi5tZXNzYWdlLCBhbmQgdGhleSBkaWZmZXIsXG4gICAgICAvLyBjb21iaW5lIHRoZW0uXG4gICAgICBpZiAoZXJybm9Nc2cgJiYganNvbi5tZXNzYWdlICYmIGpzb24ubWVzc2FnZSAhPT0gZXJybm9Nc2cpIHtcbiAgICAgICAgZXJybm9Nc2cgKz0gYCAoJHtqc29uLm1lc3NhZ2V9KWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG1lc3NhZ2UgPSBgSFRUUCAke3N0YXR1c30gJHtzdGF0dXNUZXh0fWA7XG4gICAgaWYgKGVycm5vTXNnKSB7XG4gICAgICBtZXNzYWdlICs9IGA6ICR7ZXJybm9Nc2d9YDtcbiAgICB9XG5cbiAgICBzdXBlcihtZXNzYWdlLnRyaW0oKSk7XG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBTZXJ2ZXJSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIHRoaXMuZGF0YSA9IGpzb247XG4gIH1cbn1cblxuZXhwb3J0IHsgTmV0d29ya1RpbWVvdXRFcnJvciwgU2VydmVyUmVzcG9uc2UsIFVucGFyc2VhYmxlUmVzcG9uc2VFcnJvciB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGRlbGF5IH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7XG4gIE5ldHdvcmtUaW1lb3V0RXJyb3IsXG4gIFNlcnZlclJlc3BvbnNlLFxuICBVbnBhcnNlYWJsZVJlc3BvbnNlRXJyb3IsXG59IGZyb20gXCIuL2Vycm9yc1wiO1xuXG4vKipcbiAqIEVuaGFuY2VkIEhUVFAgY2xpZW50IGZvciB0aGUgS2ludG8gcHJvdG9jb2wuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVFRQIHtcbiAgLyoqXG4gICAqIERlZmF1bHQgSFRUUCByZXF1ZXN0IGhlYWRlcnMgYXBwbGllZCB0byBlYWNoIG91dGdvaW5nIHJlcXVlc3QuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZ2V0IERFRkFVTFRfUkVRVUVTVF9IRUFERVJTKCkge1xuICAgIHJldHVybiB7XG4gICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IG9wdGlvbnMuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRPcHRpb25zKCkge1xuICAgIHJldHVybiB7IHRpbWVvdXQ6IG51bGwsIHJlcXVlc3RNb2RlOiBcImNvcnNcIiB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZXZlbnRzICAgICAgICAgICAgICAgICAgICAgICBUaGUgZXZlbnQgaGFuZGxlci5cbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgIFtvcHRpb25zPXt9fSAgICAgICAgICAgICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgW29wdGlvbnMudGltZW91dD1udWxsXSAgICAgICBUaGUgcmVxdWVzdCB0aW1lb3V0IGluIG1zLCBpZiBhbnkgKGRlZmF1bHQ6IGBudWxsYCkuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICBbb3B0aW9ucy5yZXF1ZXN0TW9kZT1cImNvcnNcIl0gVGhlIEhUVFAgcmVxdWVzdCBtb2RlIChkZWZhdWx0OiBgXCJjb3JzXCJgKS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGV2ZW50cywgb3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gcHVibGljIHByb3BlcnRpZXNcbiAgICAvKipcbiAgICAgKiBUaGUgZXZlbnQgZW1pdHRlciBpbnN0YW5jZS5cbiAgICAgKiBAdHlwZSB7RXZlbnRFbWl0dGVyfVxuICAgICAqL1xuICAgIGlmICghZXZlbnRzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBldmVudHMgaGFuZGxlciBwcm92aWRlZFwiKTtcbiAgICB9XG4gICAgdGhpcy5ldmVudHMgPSBldmVudHM7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmVxdWVzdCBtb2RlLlxuICAgICAqIEBzZWUgIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXF1ZXN0bW9kZVxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5yZXF1ZXN0TW9kZSA9IG9wdGlvbnMucmVxdWVzdE1vZGUgfHwgSFRUUC5kZWZhdWx0T3B0aW9ucy5yZXF1ZXN0TW9kZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSByZXF1ZXN0IHRpbWVvdXQuXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgSFRUUC5kZWZhdWx0T3B0aW9ucy50aW1lb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aW1lZEZldGNoKHVybCwgb3B0aW9ucykge1xuICAgIGxldCBoYXNUaW1lZG91dCA9IGZhbHNlO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBEZXRlY3QgaWYgYSByZXF1ZXN0IGhhcyB0aW1lZCBvdXQuXG4gICAgICBsZXQgX3RpbWVvdXRJZDtcbiAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgX3RpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGhhc1RpbWVkb3V0ID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3QobmV3IE5ldHdvcmtUaW1lb3V0RXJyb3IodXJsLCBvcHRpb25zKSk7XG4gICAgICAgIH0sIHRoaXMudGltZW91dCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBwcm9jZWVkV2l0aEhhbmRsZXIoZm4pIHtcbiAgICAgICAgcmV0dXJuIGFyZyA9PiB7XG4gICAgICAgICAgaWYgKCFoYXNUaW1lZG91dCkge1xuICAgICAgICAgICAgaWYgKF90aW1lb3V0SWQpIHtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aW1lb3V0SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm4oYXJnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgICAgIC50aGVuKHByb2NlZWRXaXRoSGFuZGxlcihyZXNvbHZlKSlcbiAgICAgICAgLmNhdGNoKHByb2NlZWRXaXRoSGFuZGxlcihyZWplY3QpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXN5bmMgcHJvY2Vzc1Jlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgeyBzdGF0dXMsIGhlYWRlcnMgfSA9IHJlc3BvbnNlO1xuICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgLy8gQ2hlY2sgaWYgd2UgaGF2ZSBhIGJvZHk7IGlmIHNvIHBhcnNlIGl0IGFzIEpTT04uXG4gICAgbGV0IGpzb247XG4gICAgaWYgKHRleHQubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0cnkge1xuICAgICAgICBqc29uID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aHJvdyBuZXcgVW5wYXJzZWFibGVSZXNwb25zZUVycm9yKHJlc3BvbnNlLCB0ZXh0LCBlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RhdHVzID49IDQwMCkge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlclJlc3BvbnNlKHJlc3BvbnNlLCBqc29uKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgc3RhdHVzLCBqc29uLCBoZWFkZXJzIH07XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIHJldHJ5KHVybCwgcmV0cnlBZnRlciwgcmVxdWVzdCwgb3B0aW9ucykge1xuICAgIGF3YWl0IGRlbGF5KHJldHJ5QWZ0ZXIpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCByZXF1ZXN0LCB7IC4uLm9wdGlvbnMsIHJldHJ5OiBvcHRpb25zLnJldHJ5IC0gMSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhbiBIVFRQIHJlcXVlc3QgdG8gdGhlIEtpbnRvIHNlcnZlci5cbiAgICpcbiAgICogUmVzb2x2ZXMgd2l0aCBhbiBvYmpldCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgSFRUUCByZXNwb25zZSBwcm9wZXJ0aWVzOlxuICAgKiAtIGB7TnVtYmVyfSAgc3RhdHVzYCAgVGhlIEhUVFAgc3RhdHVzIGNvZGUuXG4gICAqIC0gYHtPYmplY3R9ICBqc29uYCAgICBUaGUgSlNPTiByZXNwb25zZSBib2R5LlxuICAgKiAtIGB7SGVhZGVyc30gaGVhZGVyc2AgVGhlIHJlc3BvbnNlIGhlYWRlcnMgb2JqZWN0OyBzZWUgdGhlIEVTNiBmZXRjaCgpIHNwZWMuXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdXJsICAgICAgICAgICAgICAgVGhlIFVSTC5cbiAgICogQHBhcmFtICB7T2JqZWN0fSBbcmVxdWVzdD17fV0gICAgICBUaGUgcmVxdWVzdCBvYmplY3QsIHBhc3NlZCB0b1xuICAgKiAgICAgZmV0Y2goKSBhcyBpdHMgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSAge09iamVjdH0gW3JlcXVlc3QuaGVhZGVyc10gVGhlIHJlcXVlc3QgaGVhZGVycyBvYmplY3QgKGRlZmF1bHQ6IHt9KVxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zPXt9XSAgICAgIE9wdGlvbnMgZm9yIG1ha2luZyB0aGVcbiAgICogICAgIHJlcXVlc3RcbiAgICogQHBhcmFtICB7TnVtYmVyfSBbb3B0aW9ucy5yZXRyeV0gICBOdW1iZXIgb2YgcmV0cmllcyAoZGVmYXVsdDogMClcbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICovXG4gIGFzeW5jIHJlcXVlc3QodXJsLCByZXF1ZXN0ID0geyBoZWFkZXJzOiB7fSB9LCBvcHRpb25zID0geyByZXRyeTogMCB9KSB7XG4gICAgLy8gRW5zdXJlIGRlZmF1bHQgcmVxdWVzdCBoZWFkZXJzIGFyZSBhbHdheXMgc2V0XG4gICAgcmVxdWVzdC5oZWFkZXJzID0geyAuLi5IVFRQLkRFRkFVTFRfUkVRVUVTVF9IRUFERVJTLCAuLi5yZXF1ZXN0LmhlYWRlcnMgfTtcbiAgICAvLyBJZiBhIG11bHRpcGFydCBib2R5IGlzIHByb3ZpZGVkLCByZW1vdmUgYW55IGN1c3RvbSBDb250ZW50LVR5cGUgaGVhZGVyIGFzXG4gICAgLy8gdGhlIGZldGNoKCkgaW1wbGVtZW50YXRpb24gd2lsbCBhZGQgdGhlIGNvcnJlY3Qgb25lIGZvciB1cy5cbiAgICBpZiAocmVxdWVzdC5ib2R5ICYmIHR5cGVvZiByZXF1ZXN0LmJvZHkuYXBwZW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0LmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl07XG4gICAgfVxuICAgIHJlcXVlc3QubW9kZSA9IHRoaXMucmVxdWVzdE1vZGU7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMudGltZWRGZXRjaCh1cmwsIHJlcXVlc3QpO1xuICAgIGNvbnN0IHsgc3RhdHVzLCBoZWFkZXJzIH0gPSByZXNwb25zZTtcblxuICAgIHRoaXMuX2NoZWNrRm9yRGVwcmVjYXRpb25IZWFkZXIoaGVhZGVycyk7XG4gICAgdGhpcy5fY2hlY2tGb3JCYWNrb2ZmSGVhZGVyKHN0YXR1cywgaGVhZGVycyk7XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgc2VydmVyIHN1bW1vbnMgdGhlIGNsaWVudCB0byByZXRyeSBhZnRlciBhIHdoaWxlLlxuICAgIGNvbnN0IHJldHJ5QWZ0ZXIgPSB0aGlzLl9jaGVja0ZvclJldHJ5QWZ0ZXJIZWFkZXIoc3RhdHVzLCBoZWFkZXJzKTtcbiAgICAvLyBJZiBudW1iZXIgb2YgYWxsb3dlZCBvZiByZXRyaWVzIGlzIG5vdCBleGhhdXN0ZWQsIHJldHJ5IHRoZSBzYW1lIHJlcXVlc3QuXG4gICAgaWYgKHJldHJ5QWZ0ZXIgJiYgb3B0aW9ucy5yZXRyeSA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnJldHJ5KHVybCwgcmV0cnlBZnRlciwgcmVxdWVzdCwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NSZXNwb25zZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgX2NoZWNrRm9yRGVwcmVjYXRpb25IZWFkZXIoaGVhZGVycykge1xuICAgIGNvbnN0IGFsZXJ0SGVhZGVyID0gaGVhZGVycy5nZXQoXCJBbGVydFwiKTtcbiAgICBpZiAoIWFsZXJ0SGVhZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBhbGVydDtcbiAgICB0cnkge1xuICAgICAgYWxlcnQgPSBKU09OLnBhcnNlKGFsZXJ0SGVhZGVyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBwYXJzZSBBbGVydCBoZWFkZXIgbWVzc2FnZVwiLCBhbGVydEhlYWRlcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnNvbGUud2FybihhbGVydC5tZXNzYWdlLCBhbGVydC51cmwpO1xuICAgIHRoaXMuZXZlbnRzLmVtaXQoXCJkZXByZWNhdGVkXCIsIGFsZXJ0KTtcbiAgfVxuXG4gIF9jaGVja0ZvckJhY2tvZmZIZWFkZXIoc3RhdHVzLCBoZWFkZXJzKSB7XG4gICAgbGV0IGJhY2tvZmZNcztcbiAgICBjb25zdCBiYWNrb2ZmU2Vjb25kcyA9IHBhcnNlSW50KGhlYWRlcnMuZ2V0KFwiQmFja29mZlwiKSwgMTApO1xuICAgIGlmIChiYWNrb2ZmU2Vjb25kcyA+IDApIHtcbiAgICAgIGJhY2tvZmZNcyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgYmFja29mZlNlY29uZHMgKiAxMDAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYWNrb2ZmTXMgPSAwO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50cy5lbWl0KFwiYmFja29mZlwiLCBiYWNrb2ZmTXMpO1xuICB9XG5cbiAgX2NoZWNrRm9yUmV0cnlBZnRlckhlYWRlcihzdGF0dXMsIGhlYWRlcnMpIHtcbiAgICBsZXQgcmV0cnlBZnRlciA9IGhlYWRlcnMuZ2V0KFwiUmV0cnktQWZ0ZXJcIik7XG4gICAgaWYgKCFyZXRyeUFmdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRlbGF5ID0gcGFyc2VJbnQocmV0cnlBZnRlciwgMTApICogMTAwMDtcbiAgICByZXRyeUFmdGVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyBkZWxheTtcbiAgICB0aGlzLmV2ZW50cy5lbWl0KFwicmV0cnktYWZ0ZXJcIiwgcmV0cnlBZnRlcik7XG4gICAgcmV0dXJuIGRlbGF5O1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5pbXBvcnQgS2ludG9DbGllbnRCYXNlIGZyb20gXCIuL2Jhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2ludG9DbGllbnQgZXh0ZW5kcyBLaW50b0NsaWVudEJhc2Uge1xuICBjb25zdHJ1Y3RvcihyZW1vdGUsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGV2ZW50cyA9IG9wdGlvbnMuZXZlbnRzIHx8IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHN1cGVyKHJlbW90ZSwgT2JqZWN0LmFzc2lnbih7IGV2ZW50cyB9LCBvcHRpb25zKSk7XG4gIH1cbn1cblxuLy8gVGhpcyBpcyBhIGhhY2sgdG8gYXZvaWQgQnJvd3NlcmlmeSB0byBleHBvc2UgdGhlIGFib3ZlIGNsYXNzXG4vLyBhdCBgbmV3IEtpbnRvQ2xpZW50KClgIGluc3RlYWQgb2YgYG5ldyBLaW50b0NsaWVudC5kZWZhdWx0KClgLlxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9LaW50by9raW50by1odHRwLmpzL2lzc3Vlcy83N1xuaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBLaW50b0NsaWVudDtcbn1cbiIsImltcG9ydCB7IG9taXQsIGNyZWF0ZUZvcm1EYXRhIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgcmVxdWVzdERlZmF1bHRzID0ge1xuICBzYWZlOiBmYWxzZSxcbiAgLy8gY2hlY2sgaWYgd2Ugc2hvdWxkIHNldCBkZWZhdWx0IGNvbnRlbnQgdHlwZSBoZXJlXG4gIGhlYWRlcnM6IHt9LFxuICBwZXJtaXNzaW9uczogdW5kZWZpbmVkLFxuICBkYXRhOiB1bmRlZmluZWQsXG4gIHBhdGNoOiBmYWxzZSxcbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2FmZUhlYWRlcihzYWZlLCBsYXN0X21vZGlmaWVkKSB7XG4gIGlmICghc2FmZSkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuICBpZiAobGFzdF9tb2RpZmllZCkge1xuICAgIHJldHVybiB7IFwiSWYtTWF0Y2hcIjogYFwiJHtsYXN0X21vZGlmaWVkfVwiYCB9O1xuICB9XG4gIHJldHVybiB7IFwiSWYtTm9uZS1NYXRjaFwiOiBcIipcIiB9O1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXF1ZXN0KHBhdGgsIHsgZGF0YSwgcGVybWlzc2lvbnMgfSwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHsgaGVhZGVycywgc2FmZSB9ID0ge1xuICAgIC4uLnJlcXVlc3REZWZhdWx0cyxcbiAgICAuLi5vcHRpb25zLFxuICB9O1xuICByZXR1cm4ge1xuICAgIG1ldGhvZDogZGF0YSAmJiBkYXRhLmlkID8gXCJQVVRcIiA6IFwiUE9TVFwiLFxuICAgIHBhdGgsXG4gICAgaGVhZGVyczogeyAuLi5oZWFkZXJzLCAuLi5zYWZlSGVhZGVyKHNhZmUpIH0sXG4gICAgYm9keTogeyBkYXRhLCBwZXJtaXNzaW9ucyB9LFxuICB9O1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVSZXF1ZXN0KHBhdGgsIHsgZGF0YSwgcGVybWlzc2lvbnMgfSwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHsgaGVhZGVycywgc2FmZSwgcGF0Y2ggfSA9IHsgLi4ucmVxdWVzdERlZmF1bHRzLCAuLi5vcHRpb25zIH07XG4gIGNvbnN0IHsgbGFzdF9tb2RpZmllZCB9ID0geyAuLi5kYXRhLCAuLi5vcHRpb25zIH07XG5cbiAgaWYgKE9iamVjdC5rZXlzKG9taXQoZGF0YSwgXCJpZFwiLCBcImxhc3RfbW9kaWZpZWRcIikpLmxlbmd0aCA9PT0gMCkge1xuICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1ldGhvZDogcGF0Y2ggPyBcIlBBVENIXCIgOiBcIlBVVFwiLFxuICAgIHBhdGgsXG4gICAgaGVhZGVyczogeyAuLi5oZWFkZXJzLCAuLi5zYWZlSGVhZGVyKHNhZmUsIGxhc3RfbW9kaWZpZWQpIH0sXG4gICAgYm9keTogeyBkYXRhLCBwZXJtaXNzaW9ucyB9LFxuICB9O1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqc29uUGF0Y2hQZXJtaXNzaW9uc1JlcXVlc3QoXG4gIHBhdGgsXG4gIHBlcm1pc3Npb25zLFxuICBvcFR5cGUsXG4gIG9wdGlvbnMgPSB7fVxuKSB7XG4gIGNvbnN0IHsgaGVhZGVycywgc2FmZSwgbGFzdF9tb2RpZmllZCB9ID0geyAuLi5yZXF1ZXN0RGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcblxuICBjb25zdCBvcHMgPSBbXTtcblxuICBmb3IgKGNvbnN0IFt0eXBlLCBwcmluY2lwYWxzXSBvZiBPYmplY3QuZW50cmllcyhwZXJtaXNzaW9ucykpIHtcbiAgICBmb3IgKGNvbnN0IHByaW5jaXBhbCBvZiBwcmluY2lwYWxzKSB7XG4gICAgICBvcHMucHVzaCh7XG4gICAgICAgIG9wOiBvcFR5cGUsXG4gICAgICAgIHBhdGg6IGAvcGVybWlzc2lvbnMvJHt0eXBlfS8ke3ByaW5jaXBhbH1gLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICBwYXRoLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIC4uLmhlYWRlcnMsXG4gICAgICAuLi5zYWZlSGVhZGVyKHNhZmUsIGxhc3RfbW9kaWZpZWQpLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uLXBhdGNoK2pzb25cIixcbiAgICB9LFxuICAgIGJvZHk6IG9wcyxcbiAgfTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlUmVxdWVzdChwYXRoLCBvcHRpb25zID0ge30pIHtcbiAgY29uc3QgeyBoZWFkZXJzLCBzYWZlLCBsYXN0X21vZGlmaWVkIH0gPSB7XG4gICAgLi4ucmVxdWVzdERlZmF1bHRzLFxuICAgIC4uLm9wdGlvbnMsXG4gIH07XG4gIGlmIChzYWZlICYmICFsYXN0X21vZGlmaWVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU2FmZSBjb25jdXJyZW5jeSBjaGVjayByZXF1aXJlcyBhIGxhc3RfbW9kaWZpZWQgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiB7XG4gICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgIHBhdGgsXG4gICAgaGVhZGVyczogeyAuLi5oZWFkZXJzLCAuLi5zYWZlSGVhZGVyKHNhZmUsIGxhc3RfbW9kaWZpZWQpIH0sXG4gIH07XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEF0dGFjaG1lbnRSZXF1ZXN0KFxuICBwYXRoLFxuICBkYXRhVVJJLFxuICB7IGRhdGEsIHBlcm1pc3Npb25zIH0gPSB7fSxcbiAgb3B0aW9ucyA9IHt9XG4pIHtcbiAgY29uc3QgeyBoZWFkZXJzLCBzYWZlLCBnemlwcGVkIH0gPSB7IC4uLnJlcXVlc3REZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xuICBjb25zdCB7IGxhc3RfbW9kaWZpZWQgfSA9IHsgLi4uZGF0YSwgLi4ub3B0aW9ucyB9O1xuXG4gIGNvbnN0IGJvZHkgPSB7IGRhdGEsIHBlcm1pc3Npb25zIH07XG4gIGNvbnN0IGZvcm1EYXRhID0gY3JlYXRlRm9ybURhdGEoZGF0YVVSSSwgYm9keSwgb3B0aW9ucyk7XG5cbiAgbGV0IGN1c3RvbVBhdGggPVxuICAgIGd6aXBwZWQgIT0gbnVsbFxuICAgICAgPyAoY3VzdG9tUGF0aCA9IHBhdGggKyBcIj9nemlwcGVkPVwiICsgKGd6aXBwZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIikpXG4gICAgICA6IHBhdGg7XG5cbiAgcmV0dXJuIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHBhdGg6IGN1c3RvbVBhdGgsXG4gICAgaGVhZGVyczogeyAuLi5oZWFkZXJzLCAuLi5zYWZlSGVhZGVyKHNhZmUsIGxhc3RfbW9kaWZpZWQpIH0sXG4gICAgYm9keTogZm9ybURhdGEsXG4gIH07XG59XG4iLCIvKipcbiAqIENodW5rcyBhbiBhcnJheSBpbnRvIG4gcGllY2VzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gIHtBcnJheX0gIGFycmF5XG4gKiBAcGFyYW0gIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFydGl0aW9uKGFycmF5LCBuKSB7XG4gIGlmIChuIDw9IDApIHtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cbiAgcmV0dXJuIGFycmF5LnJlZHVjZSgoYWNjLCB4LCBpKSA9PiB7XG4gICAgaWYgKGkgPT09IDAgfHwgaSAlIG4gPT09IDApIHtcbiAgICAgIGFjYy5wdXNoKFt4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjY1thY2MubGVuZ3RoIC0gMV0ucHVzaCh4KTtcbiAgICB9XG4gICAgcmV0dXJuIGFjYztcbiAgfSwgW10pO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBQcm9taXNlIGFsd2F5cyByZXNvbHZpbmcgYWZ0ZXIgdGhlIHNwZWNpZmllZCBhbW91bnQgaW4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEByZXR1cm4gUHJvbWlzZTx2b2lkPlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsYXkobXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuXG4vKipcbiAqIE1hcHMgYSBsaXN0IHRvIHByb21pc2VzIHVzaW5nIHRoZSBwcm92aWRlZCBtYXBwaW5nIGZ1bmN0aW9uLCBleGVjdXRlcyB0aGVtXG4gKiBzZXF1ZW50aWFsbHkgdGhlbiByZXR1cm5zIGEgUHJvbWlzZSByZXNvbHZpbmcgd2l0aCBvcmRlcmVkIHJlc3VsdHMgb2J0YWluZWQuXG4gKiBUaGluayBvZiB0aGlzIGFzIGEgc2VxdWVudGlhbCBQcm9taXNlLmFsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtICB7QXJyYXl9ICAgIGxpc3QgVGhlIGxpc3QgdG8gbWFwLlxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgVGhlIG1hcHBpbmcgZnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcE1hcChsaXN0LCBmbikge1xuICBsZXQgcmVzdWx0cyA9IFtdO1xuICBhd2FpdCBsaXN0LnJlZHVjZShhc3luYyBmdW5jdGlvbihwcm9taXNlLCBlbnRyeSkge1xuICAgIGF3YWl0IHByb21pc2U7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KGF3YWl0IGZuKGVudHJ5KSk7XG4gIH0sIFByb21pc2UucmVzb2x2ZSgpKTtcbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbi8qKlxuICogVGFrZXMgYW4gb2JqZWN0IGFuZCByZXR1cm5zIGEgY29weSBvZiBpdCB3aXRoIHRoZSBwcm92aWRlZCBrZXlzIG9taXR0ZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSAge09iamVjdH0gICAgb2JqICBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSAgey4uLlN0cmluZ30ga2V5cyBUaGUga2V5cyB0byBvbWl0LlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gb21pdChvYmosIC4uLmtleXMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgIGlmICgha2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICBhY2Nba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG59XG5cbi8qKlxuICogQWx3YXlzIHJldHVybnMgYSByZXNvdXJjZSBkYXRhIG9iamVjdCBmcm9tIHRoZSBwcm92aWRlZCBhcmd1bWVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtICB7T2JqZWN0fFN0cmluZ30gcmVzb3VyY2VcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0YUJvZHkocmVzb3VyY2UpIHtcbiAgaWYgKGlzT2JqZWN0KHJlc291cmNlKSkge1xuICAgIHJldHVybiByZXNvdXJjZTtcbiAgfVxuICBpZiAodHlwZW9mIHJlc291cmNlID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIHsgaWQ6IHJlc291cmNlIH07XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudC5cIik7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhbiBvYmplY3QgaW50byBhbiBVUkwgcXVlcnkgc3RyaW5nLCBzdHJpcHBpbmcgb3V0IGFueSB1bmRlZmluZWRcbiAqIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcXNpZnkob2JqKSB7XG4gIGNvbnN0IGVuY29kZSA9IHYgPT5cbiAgICBlbmNvZGVVUklDb21wb25lbnQodHlwZW9mIHYgPT09IFwiYm9vbGVhblwiID8gU3RyaW5nKHYpIDogdik7XG4gIGNvbnN0IHN0cmlwVW5kZWZpbmVkID0gbyA9PiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG8pKTtcbiAgY29uc3Qgc3RyaXBwZWQgPSBzdHJpcFVuZGVmaW5lZChvYmopO1xuICByZXR1cm4gT2JqZWN0LmtleXMoc3RyaXBwZWQpXG4gICAgLm1hcChrID0+IHtcbiAgICAgIGNvbnN0IGtzID0gZW5jb2RlKGspICsgXCI9XCI7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzdHJpcHBlZFtrXSkpIHtcbiAgICAgICAgcmV0dXJuIGtzICsgc3RyaXBwZWRba10ubWFwKHYgPT4gZW5jb2RlKHYpKS5qb2luKFwiLFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZShzdHJpcHBlZFtrXSk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuam9pbihcIiZcIik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgdmVyc2lvbiBpcyB3aXRoaW4gdGhlIHByb3ZpZGVkIHJhbmdlLlxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gdmVyc2lvbiAgICBUaGUgdmVyc2lvbiB0byBjaGVjay5cbiAqIEBwYXJhbSAge1N0cmluZ30gbWluVmVyc2lvbiBUaGUgbWluaW11bSBzdXBwb3J0ZWQgdmVyc2lvbiAoaW5jbHVzaXZlKS5cbiAqIEBwYXJhbSAge1N0cmluZ30gbWF4VmVyc2lvbiBUaGUgbWluaW11bSBzdXBwb3J0ZWQgdmVyc2lvbiAoZXhjbHVzaXZlKS5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgdmVyc2lvbiBpcyBvdXRzaWRlIG9mIHRoZSBwcm92aWRlZCByYW5nZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVmVyc2lvbih2ZXJzaW9uLCBtaW5WZXJzaW9uLCBtYXhWZXJzaW9uKSB7XG4gIGNvbnN0IGV4dHJhY3QgPSBzdHIgPT4gc3RyLnNwbGl0KFwiLlwiKS5tYXAoeCA9PiBwYXJzZUludCh4LCAxMCkpO1xuICBjb25zdCBbdmVyTWFqb3IsIHZlck1pbm9yXSA9IGV4dHJhY3QodmVyc2lvbik7XG4gIGNvbnN0IFttaW5NYWpvciwgbWluTWlub3JdID0gZXh0cmFjdChtaW5WZXJzaW9uKTtcbiAgY29uc3QgW21heE1ham9yLCBtYXhNaW5vcl0gPSBleHRyYWN0KG1heFZlcnNpb24pO1xuICBjb25zdCBjaGVja3MgPSBbXG4gICAgdmVyTWFqb3IgPCBtaW5NYWpvcixcbiAgICB2ZXJNYWpvciA9PT0gbWluTWFqb3IgJiYgdmVyTWlub3IgPCBtaW5NaW5vcixcbiAgICB2ZXJNYWpvciA+IG1heE1ham9yLFxuICAgIHZlck1ham9yID09PSBtYXhNYWpvciAmJiB2ZXJNaW5vciA+PSBtYXhNaW5vcixcbiAgXTtcbiAgaWYgKGNoZWNrcy5zb21lKHggPT4geCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgVmVyc2lvbiAke3ZlcnNpb259IGRvZXNuJ3Qgc2F0aXNmeSAke21pblZlcnNpb259IDw9IHggPCAke21heFZlcnNpb259YFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBkZWNvcmF0b3IgZnVuY3Rpb24gZW5zdXJpbmcgYSB2ZXJzaW9uIGNoZWNrIGlzIHBlcmZvcm1lZCBhZ2FpbnN0XG4gKiB0aGUgcHJvdmlkZWQgcmVxdWlyZW1lbnRzIGJlZm9yZSBleGVjdXRpbmcgaXQuXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBtaW4gVGhlIHJlcXVpcmVkIG1pbiB2ZXJzaW9uIChpbmNsdXNpdmUpLlxuICogQHBhcmFtICB7U3RyaW5nfSBtYXggVGhlIHJlcXVpcmVkIG1heCB2ZXJzaW9uIChpbmNsdXNpdmUpLlxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdXBwb3J0KG1pbiwgbWF4KSB7XG4gIHJldHVybiBmdW5jdGlvbih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgIGNvbnN0IGZuID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0KCkge1xuICAgICAgICBjb25zdCB3cmFwcGVkTWV0aG9kID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAvLyBcInRoaXNcIiBpcyB0aGUgY3VycmVudCBpbnN0YW5jZSB3aGljaCBpdHMgbWV0aG9kIGlzIGRlY29yYXRlZC5cbiAgICAgICAgICBjb25zdCBjbGllbnQgPSBcImNsaWVudFwiIGluIHRoaXMgPyB0aGlzLmNsaWVudCA6IHRoaXM7XG4gICAgICAgICAgcmV0dXJuIGNsaWVudFxuICAgICAgICAgICAgLmZldGNoSFRUUEFwaVZlcnNpb24oKVxuICAgICAgICAgICAgLnRoZW4odmVyc2lvbiA9PiBjaGVja1ZlcnNpb24odmVyc2lvbiwgbWluLCBtYXgpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gZm4uYXBwbHkodGhpcywgYXJncykpO1xuICAgICAgICB9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XG4gICAgICAgICAgdmFsdWU6IHdyYXBwZWRNZXRob2QsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHdyYXBwZWRNZXRob2Q7XG4gICAgICB9LFxuICAgIH07XG4gIH07XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgZGVjb3JhdG9yIGZ1bmN0aW9uIGVuc3VyaW5nIHRoYXQgdGhlIHNwZWNpZmllZCBjYXBhYmlsaXRpZXMgYXJlXG4gKiBhdmFpbGFibGUgb24gdGhlIHNlcnZlciBiZWZvcmUgZXhlY3V0aW5nIGl0LlxuICpcbiAqIEBwYXJhbSAge0FycmF5PFN0cmluZz59IGNhcGFiaWxpdGllcyBUaGUgcmVxdWlyZWQgY2FwYWJpbGl0aWVzLlxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXBhYmxlKGNhcGFiaWxpdGllcykge1xuICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgICBjb25zdCBmbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldCgpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlZE1ldGhvZCA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgLy8gXCJ0aGlzXCIgaXMgdGhlIGN1cnJlbnQgaW5zdGFuY2Ugd2hpY2ggaXRzIG1ldGhvZCBpcyBkZWNvcmF0ZWQuXG4gICAgICAgICAgY29uc3QgY2xpZW50ID0gXCJjbGllbnRcIiBpbiB0aGlzID8gdGhpcy5jbGllbnQgOiB0aGlzO1xuICAgICAgICAgIHJldHVybiBjbGllbnRcbiAgICAgICAgICAgIC5mZXRjaFNlcnZlckNhcGFiaWxpdGllcygpXG4gICAgICAgICAgICAudGhlbihhdmFpbGFibGUgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBtaXNzaW5nID0gY2FwYWJpbGl0aWVzLmZpbHRlcihjID0+ICEoYyBpbiBhdmFpbGFibGUpKTtcbiAgICAgICAgICAgICAgaWYgKG1pc3NpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdTdHIgPSBtaXNzaW5nLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICBgUmVxdWlyZWQgY2FwYWJpbGl0aWVzICR7bWlzc2luZ1N0cn0gbm90IHByZXNlbnQgb24gc2VydmVyYFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiBmbi5hcHBseSh0aGlzLCBhcmdzKSk7XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIHtcbiAgICAgICAgICB2YWx1ZTogd3JhcHBlZE1ldGhvZCxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gd3JhcHBlZE1ldGhvZDtcbiAgICAgIH0sXG4gICAgfTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBkZWNvcmF0b3IgZnVuY3Rpb24gZW5zdXJpbmcgYW4gb3BlcmF0aW9uIGlzIG5vdCBwZXJmb3JtZWQgZnJvbVxuICogd2l0aGluIGEgYmF0Y2ggcmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UgdG8gdGhyb3cuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vYmF0Y2gobWVzc2FnZSkge1xuICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgICBjb25zdCBmbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldCgpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlZE1ldGhvZCA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgLy8gXCJ0aGlzXCIgaXMgdGhlIGN1cnJlbnQgaW5zdGFuY2Ugd2hpY2ggaXRzIG1ldGhvZCBpcyBkZWNvcmF0ZWQuXG4gICAgICAgICAgaWYgKHRoaXMuX2lzQmF0Y2gpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XG4gICAgICAgICAgdmFsdWU6IHdyYXBwZWRNZXRob2QsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHdyYXBwZWRNZXRob2Q7XG4gICAgICB9LFxuICAgIH07XG4gIH07XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gb2JqZWN0IChpLmUuIG5vdCBhbiBhcnJheSBub3IgbnVsbCkuXG4gKiBAcGFyYW0gIHtPYmplY3R9IHRoaW5nIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybiB7Ym9vbH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHRoaW5nKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IFwib2JqZWN0XCIgJiYgdGhpbmcgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIFBhcnNlcyBhIGRhdGEgdXJsLlxuICogQHBhcmFtICB7U3RyaW5nfSBkYXRhVVJMIFRoZSBkYXRhIHVybC5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGF0YVVSTChkYXRhVVJMKSB7XG4gIGNvbnN0IHJlZ2V4ID0gL15kYXRhOiguKik7YmFzZTY0LCguKikvO1xuICBjb25zdCBtYXRjaCA9IGRhdGFVUkwubWF0Y2gocmVnZXgpO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGRhdGEtdXJsOiAke1N0cmluZyhkYXRhVVJMKS5zdWJzdHIoMCwgMzIpfS4uLmApO1xuICB9XG4gIGNvbnN0IHByb3BzID0gbWF0Y2hbMV07XG4gIGNvbnN0IGJhc2U2NCA9IG1hdGNoWzJdO1xuICBjb25zdCBbdHlwZSwgLi4ucmF3UGFyYW1zXSA9IHByb3BzLnNwbGl0KFwiO1wiKTtcbiAgY29uc3QgcGFyYW1zID0gcmF3UGFyYW1zLnJlZHVjZSgoYWNjLCBwYXJhbSkgPT4ge1xuICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IHBhcmFtLnNwbGl0KFwiPVwiKTtcbiAgICByZXR1cm4geyAuLi5hY2MsIFtrZXldOiB2YWx1ZSB9O1xuICB9LCB7fSk7XG4gIHJldHVybiB7IC4uLnBhcmFtcywgdHlwZSwgYmFzZTY0IH07XG59XG5cbi8qKlxuICogRXh0cmFjdHMgZmlsZSBpbmZvcm1hdGlvbiBmcm9tIGEgZGF0YSB1cmwuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGRhdGFVUkwgVGhlIGRhdGEgdXJsLlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEZpbGVJbmZvKGRhdGFVUkwpIHtcbiAgY29uc3QgeyBuYW1lLCB0eXBlLCBiYXNlNjQgfSA9IHBhcnNlRGF0YVVSTChkYXRhVVJMKTtcbiAgY29uc3QgYmluYXJ5ID0gYXRvYihiYXNlNjQpO1xuICBjb25zdCBhcnJheSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmFyeS5sZW5ndGg7IGkrKykge1xuICAgIGFycmF5LnB1c2goYmluYXJ5LmNoYXJDb2RlQXQoaSkpO1xuICB9XG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXSwgeyB0eXBlIH0pO1xuICByZXR1cm4geyBibG9iLCBuYW1lIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIEZvcm1EYXRhIGluc3RhbmNlIGZyb20gYSBkYXRhIHVybCBhbmQgYW4gZXhpc3RpbmcgSlNPTiByZXNwb25zZVxuICogYm9keS5cbiAqIEBwYXJhbSAge1N0cmluZ30gZGF0YVVSTCAgICAgICAgICAgIFRoZSBkYXRhIHVybC5cbiAqIEBwYXJhbSAge09iamVjdH0gYm9keSAgICAgICAgICAgICAgIFRoZSByZXNwb25zZSBib2R5LlxuICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9ucz17fV0gICAgICAgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9ucy5maWxlbmFtZV0gRm9yY2UgYXR0YWNobWVudCBmaWxlIG5hbWUuXG4gKiBAcmV0dXJuIHtGb3JtRGF0YX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZvcm1EYXRhKGRhdGFVUkwsIGJvZHksIG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCB7IGZpbGVuYW1lID0gXCJ1bnRpdGxlZFwiIH0gPSBvcHRpb25zO1xuICBjb25zdCB7IGJsb2IsIG5hbWUgfSA9IGV4dHJhY3RGaWxlSW5mbyhkYXRhVVJMKTtcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgZm9ybURhdGEuYXBwZW5kKFwiYXR0YWNobWVudFwiLCBibG9iLCBuYW1lIHx8IGZpbGVuYW1lKTtcbiAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBib2R5KSB7XG4gICAgaWYgKHR5cGVvZiBib2R5W3Byb3BlcnR5XSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKHByb3BlcnR5LCBKU09OLnN0cmluZ2lmeShib2R5W3Byb3BlcnR5XSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbi8qKlxuICogQ2xvbmVzIGFuIG9iamVjdCB3aXRoIGFsbCBpdHMgdW5kZWZpbmVkIGtleXMgcmVtb3ZlZC5cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhblVuZGVmaW5lZFByb3BlcnRpZXMob2JqKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICBpZiAodHlwZW9mIG9ialtrZXldICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIl19
