(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("GestureHelper", [], factory);
	else if(typeof exports === 'object')
		exports["GestureHelper"] = factory();
	else
		root["GestureHelper"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _eventemitter = __webpack_require__(2);

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _performanceNow = __webpack_require__(3);

var _performanceNow2 = _interopRequireDefault(_performanceNow);

var _inputdevicecapabilitiesPolyfill = __webpack_require__(4);

var _inputdevicecapabilitiesPolyfill2 = _interopRequireDefault(_inputdevicecapabilitiesPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// @TODO: temp polyfill code, should tidy this a bit..


(0, _inputdevicecapabilitiesPolyfill2.default)(window);

var GestureHelper = function (_EventEmitter) {
  _inherits(GestureHelper, _EventEmitter);

  function GestureHelper() {
    _classCallCheck(this, GestureHelper);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this, {
      wildcard: true
    }));

    _this.mouseMove = function (e) {
      _this.handleMove({ e: e, x: e.clientX, y: e.clientY });
    };

    _this.touchMove = function (e) {
      _this.handleMove({ e: e, x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    _this.touchStart = function (e) {
      _this.handleStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        e: e
      });
      _this.el.addEventListener('touchmove', _this.touchMove, _this.eventOptions);
    };

    _this.touchEnd = function (e) {
      _this.handleEnd(e);
      _this.el.removeEventListener('touchmove', _this.touchMove, _this.eventOptions);
    };

    _this.mouseDown = function (e) {
      if (e.sourceCapabilities.firesTouchEvents) return;
      _this.handleStart({ x: e.clientX, y: e.clientY, e: e });
      _this.el.addEventListener('mousemove', _this.mouseMove, _this.eventOptions);
    };

    _this.mouseUp = function (e) {
      if (e.sourceCapabilities.firesTouchEvents) return;
      _this.handleEnd(e);
      _this.el.removeEventListener('mousemove', _this.mouseMove, _this.eventOptions);
    };

    _this.handleEnd = function (e) {
      var deltaTime = (0, _performanceNow2.default)() - _this.startTime;
      if (_this.panning) {
        _this.panning = false;
        var isSwipe = false;
        var swipeDirection = null;
        if (_this.velocity.max.x > _this.options.swipeVelocity && _this.startDirection === 'horizontal') {

          isSwipe = true;
          swipeDirection = _this.velocity.current.x > 0 ? 'right' : 'left';
        } else if (_this.velocity.max.y > _this.options.swipeVelocity && _this.startDirection === 'vertical') {

          isSwipe = true;
          swipeDirection = _this.velocity.current.y > 0 ? 'down' : 'up';
        }
        _this.emit('pan.end', { isSwipe: isSwipe, swipeDirection: swipeDirection, sourceEvent: e });
      } else if (deltaTime <= _this.options.maxTapDuration) {
        _this.emit('tap', { srcEvent: e });
      }

      return;
    };

    _this.el = arguments.length <= 0 ? undefined : arguments[0];
    _this.options = Object.assign({}, {
      sensitivity: 5,
      passive: false,
      capture: false,
      swipeVelocity: 0.7,
      maxTapDuration: 300,
      longTapDuration: 400
    }, (arguments.length <= 1 ? undefined : arguments[1]) || {});

    _this.panning = false;
    _this.startDirection = null;
    _this.directionCount = 0;
    _this.clearVelocityStats();

    // Small feature detect for support of "passive" events
    _this.eventOptions = false;
    try {
      var options = Object.defineProperty({}, "passive", {
        get: function get() {
          _this.eventOptions = {
            passive: !!_this.options.passive,
            capture: !!_this.options.capture
          };
        }
      });
      _this.el.addEventListener("test", null, options);
    } catch (err) {
      console.error(err);
      _this.eventOptions = {
        capture: !!_this.options.capture
      };
    }

    _this.setup();
    return _this;
  }

  GestureHelper.prototype.clearVelocityStats = function clearVelocityStats() {
    this.velocity = {
      current: { x: 0, y: 0 },
      max: { x: 0, y: 0 }
    };
  };

  GestureHelper.prototype.isPanning = function isPanning() {
    return this.panning;
  };

  GestureHelper.prototype.setup = function setup() {
    this.el.addEventListener('mousedown', this.mouseDown, this.eventOptions);
    this.el.addEventListener('mouseup', this.mouseUp, this.eventOptions);
    this.el.addEventListener('touchstart', this.touchStart, this.eventOptions);
    this.el.addEventListener('touchend', this.touchEnd, this.eventOptions);
    this.el.addEventListener('touchcancel', this.touchEnd, this.eventOptions);
  };

  GestureHelper.prototype.destroy = function destroy() {
    this.el.removeEventListener('mousedown', this.mouseDown, this.eventOptions);
    this.el.removeEventListener('mouseup', this.mouseUp, this.eventOptions);
    this.el.removeEventListener('mousemove', this.mouseMove, this.eventOptions);
    this.el.removeEventListener('touchstart', this.touchStart, this.eventOptions);
    this.el.removeEventListener('touchend', this.touchEnd, this.eventOptions);
    this.el.removeEventListener('touchcancel', this.touchEnd, this.eventOptions);
    this.el.removeEventListener('touchmove', this.touchMove, this.eventOptions);
  };

  GestureHelper.prototype.getStartDirection = function getStartDirection(_ref) {
    var _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y;

    if (this.directionCount < 2) {
      this.directionCount++;
      return null;
    } else {
      return Math.abs(x) > Math.abs(y) ? 'horizontal' : 'vertical';
    }
  };

  GestureHelper.prototype.handleStart = function handleStart(_ref2) {
    var _ref2$x = _ref2.x,
        x = _ref2$x === undefined ? 0 : _ref2$x,
        _ref2$y = _ref2.y,
        y = _ref2$y === undefined ? 0 : _ref2$y,
        _ref2$e = _ref2.e,
        e = _ref2$e === undefined ? {} : _ref2$e;


    // Ensure all settings are reset:
    this.startX = x;
    this.startY = y;
    this.startDirection = null;
    this.directionCount = 1;
    this.panning = false;
    this.startTime = (0, _performanceNow2.default)();
    this.clearVelocityStats();
  };

  GestureHelper.prototype.handleMove = function handleMove(_ref3) {
    var _ref3$e = _ref3.e,
        e = _ref3$e === undefined ? {} : _ref3$e,
        _ref3$x = _ref3.x,
        x = _ref3$x === undefined ? 0 : _ref3$x,
        _ref3$y = _ref3.y,
        y = _ref3$y === undefined ? 0 : _ref3$y;

    var deltaX = x - this.startX;
    var deltaY = y - this.startY;

    if (this.startDirection === null) {
      this.startDirection = this.getStartDirection({ x: deltaX, y: deltaY });
    } else if (!this.panning && (Math.abs(deltaX) > this.options.sensitivity || Math.abs(deltaY) > this.options.sensitivity)) {

      this.panning = true;
      this.emit('pan.start', {
        sourceEvent: e,
        startDirection: this.startDirection
      });
    } else if (this.panning) {
      this.emit('pan.both', {
        startDirection: this.startDirection,
        deltaX: deltaX, deltaY: deltaY,
        sourceEvent: e
      });

      if (this.startDirection === 'horizontal') {
        deltaX < 0 ? this.emit('pan.x.left', { delta: Math.abs(deltaX), sourceEvent: e }) : this.emit('pan.x.right', { delta: Math.abs(deltaX), sourceEvent: e });
      }

      if (this.startDirection === 'vertical') {
        deltaY < 0 ? this.emit('pan.y.up', { delta: Math.abs(deltaY), sourceEvent: e }) : this.emit('pan.y.down', { delta: Math.abs(deltaY), sourceEvent: e });
      }

      // velocity = total distance moved / the time taken
      var deltaTime = (0, _performanceNow2.default)() - this.startTime;
      this.velocity.current.x = deltaX / deltaTime;
      this.velocity.current.y = deltaY / deltaTime;
      this.velocity.max.x = Math.max(this.velocity.max.x, Math.abs(this.velocity.current.x));
      this.velocity.max.y = Math.max(this.velocity.max.y, Math.abs(this.velocity.current.y));
    }
  };

  return GestureHelper;
}(_eventemitter2.default);

exports.default = GestureHelper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      this._maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;

      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this._newListener = conf.newListener);
      conf.removeListener && (this._removeListener = conf.removeListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' +
        'leak detected. ' + count + ' listeners added. ' +
        'Use emitter.setMaxListeners() to increase limit.';

    if(this.verboseMemoryLeak){
      errorMsg += ' Event name: ' + eventName + '.';
    }

    if(typeof process !== 'undefined' && process.emitWarning){
      var e = new Error(errorMsg);
      e.name = 'MaxListenersExceededWarning';
      e.emitter = this;
      e.count = count;
      process.emitWarning(e);
    } else {
      console.error(errorMsg);

      if (console.trace){
        console.trace();
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this._newListener = false;
    this._removeListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (
            !tree._listeners.warned &&
            this._maxListeners > 0 &&
            tree._listeners.length > this._maxListeners
          ) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    if (n !== undefined) {
      this._maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.event = '';


  EventEmitter.prototype.once = function(event, fn) {
    return this._once(event, fn, false);
  };

  EventEmitter.prototype.prependOnceListener = function(event, fn) {
    return this._once(event, fn, true);
  };

  EventEmitter.prototype._once = function(event, fn, prepend) {
    this._many(event, 1, fn, prepend);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    return this._many(event, ttl, fn, false);
  }

  EventEmitter.prototype.prependMany = function(event, ttl, fn) {
    return this._many(event, ttl, fn, true);
  }

  EventEmitter.prototype._many = function(event, ttl, fn, prepend) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      return fn.apply(this, arguments);
    }

    listener._origin = fn;

    this._on(event, listener, prepend);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this._newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) args[j] = arguments[j];
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this, type);
          break;
        case 2:
          handler[i].call(this, type, arguments[1]);
          break;
        case 3:
          handler[i].call(this, type, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this);
          break;
        case 2:
          handler[i].call(this, arguments[1]);
          break;
        case 3:
          handler[i].call(this, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this._newListener) {
        if (!this._events.newListener) { return Promise.resolve([false]); }
    }

    var promises= [];

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) args[j] = arguments[j];
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(this._all[i].call(this, type));
          break;
        case 2:
          promises.push(this._all[i].call(this, type, arguments[1]));
          break;
        case 3:
          promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
          break;
        default:
          promises.push(this._all[i].apply(this, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
      case 1:
        promises.push(handler.call(this));
        break;
      case 2:
        promises.push(handler.call(this, arguments[1]));
        break;
      case 3:
        promises.push(handler.call(this, arguments[1], arguments[2]));
        break;
      default:
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      handler = handler.slice();
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler[i].call(this));
          break;
        case 2:
          promises.push(handler[i].call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler[i].call(this, arguments[1], arguments[2]));
          break;
        default:
          promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function(type, listener) {
    return this._on(type, listener, false);
  };

  EventEmitter.prototype.prependListener = function(type, listener) {
    return this._on(type, listener, true);
  };

  EventEmitter.prototype.onAny = function(fn) {
    return this._onAny(fn, false);
  };

  EventEmitter.prototype.prependAny = function(fn) {
    return this._onAny(fn, true);
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype._onAny = function(fn, prepend){
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    if(prepend){
      this._all.unshift(fn);
    }else{
      this._all.push(fn);
    }

    return this;
  }

  EventEmitter.prototype._on = function(type, listener, prepend) {
    if (typeof type === 'function') {
      this._onAny(type, listener);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    if (this._newListener)
       this.emit('newListener', type, listener);

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just add
      if(prepend){
        this._events[type].unshift(listener);
      }else{
        this._events[type].push(listener);
      }

      // Check for listener leak
      if (
        !this._events[type].warned &&
        this._maxListeners > 0 &&
        this._events[type].length > this._maxListeners
      ) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return this;
  }

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        if (this._removeListener)
          this.emit("removeListener", type, listener);

        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
        if (this._removeListener)
          this.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if ((obj instanceof Function) || (typeof obj !== "object") || (obj === null))
          continue;
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          if (this._removeListener)
            this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      if (this._removeListener) {
        for(i = 0, l = fns.length; i < l; i++)
          this.emit("removeListenerAny", fns[i]);
      }
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (type === undefined) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.eventNames = function(){
    return Object.keys(this._events);
  }

  EventEmitter.prototype.listenerCount = function(type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (true) {
     // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return EventEmitter;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/* inputdevicecapabilities-polyfill.js - https://github.com/WICG/InputDeviceCapabilities
 *
 * Uses a (not perfectly accurate) heuristic to  implement
 * UIEvent.sourceCapabilities and InputDeviceCapabilities.firesTouchEvents.
 * Assumptions:
 *   - If sourceCapabilities is consulted on an event, it will be first read within
 *     one second of the original event being dispatched.  We could, instead,
 *     determine the sourceCapabilities as soon as any UIEvent is dispatched (eg.
 *     by hooking addEventListener) but that woudln't work for legacy onevent
 *     style handlers.
 *   - Touch and non-touch input devices aren't both being used within one
 *     second of eachother.  Eg. if you tap the screen then quickly move the
 *     mouse, we may incorrectly attribute the mouse movement to the touch
 *     device.
 *
 *  Browser support:
 *   - Verified working on:
 *     - Chrome 43 (Windows, Linux and Android)
 *     - IE 11 (Windows)
 *     - Firefox 38 (Linux)
 *     - Safari 8 (Mac and iOS)
 *   - Event constructors aren't supported by IE at all.
 *   - IE on Windows phone isn't supported properly (https://github.com/WICG/InputDeviceCapabilities/issues/13)
 *   - Won't work in IE prior to version 9 (due to lack of Object.defineProperty)
 */

function InputDeviceCapabilities(global) {
  'use strict';

  if ('InputDeviceCapabilities' in global || 'sourceCapabilities' in UIEvent.prototype) return;

  function InputDeviceCapabilities(inputDeviceCapabilitiesInit) {
    Object.defineProperty(this, '__firesTouchEvents', {
      value: inputDeviceCapabilitiesInit && 'firesTouchEvents' in inputDeviceCapabilitiesInit ? inputDeviceCapabilitiesInit.firesTouchEvents : false,
      writable: false,
      enumerable: false
    });
  };
  // Put the attributes prototype as getter functions to match the IDL.
  InputDeviceCapabilities.prototype = {
    get firesTouchEvents() {
      return this.__firesTouchEvents;
    }
  };
  global.InputDeviceCapabilities = InputDeviceCapabilities;

  var touchDevice = new InputDeviceCapabilities({ firesTouchEvents: true });
  var nonTouchDevice = new InputDeviceCapabilities({ firesTouchEvents: false });

  // Keep track of the last time we saw a touch event.  Note that if you don't
  // already have touch handlers on your document, this can have unfortunate
  // consequences for scrolling performance.  See https://plus.google.com/+RickByers/posts/cmzrtyBYPQc.
  var lastTouchTime;
  function touchHandler(event) {
    lastTouchTime = Date.now();
  };
  document.addEventListener('touchstart', touchHandler, true);
  document.addEventListener('touchmove', touchHandler, true);
  document.addEventListener('touchend', touchHandler, true);
  document.addEventListener('touchcancel', touchHandler, true);

  var specifiedSourceCapabilitiesName = '__inputDeviceCapabilitiesPolyfill_specifiedSourceCapabilities';

  // A few UIEvents aren't really input events and so should always have a null
  // source capabilities.  Arguably we should have a list of opt-in event types instead,
  // but that probably depends on ultimately how we want to specify this behavior.
  var eventTypesWithNoSourceCapabilities = ['resize', 'error', 'load', 'unload', 'abort'];

  // We assume that any UI event that occurs within this many ms from a touch
  // event is caused by a touch device.  This needs to be a little longer than
  // the maximum tap delay on various browsers (350ms in Safari) while remaining
  // as short as possible to reduce the risk of confusing other input that happens
  // to come shortly after touch input.
  var touchTimeConstant = 1000;

  Object.defineProperty(UIEvent.prototype, 'sourceCapabilities', {
    get: function get() {
      // Handle script-generated events and events which have already had their
      // sourceCapabilities read.
      if (specifiedSourceCapabilitiesName in this) return this[specifiedSourceCapabilitiesName];

      // Handle non-input events.
      if (eventTypesWithNoSourceCapabilities.indexOf(this.type) >= 0) return null;

      // touch events may not be supported by this browser at all (eg. IE desktop).
      if (!('TouchEvent' in global)) return nonTouchDevice;

      // Touch events are always generated from devices that fire touch events.
      if (this instanceof TouchEvent) return touchDevice;

      // Pointer events are special - they may come before a touch event.
      if ('PointerEvent' in global && this instanceof PointerEvent) {
        if (this.pointerType == "touch") return touchDevice;
        return nonTouchDevice;
      }

      // Otherwise use recent touch events to decide if this event is likely due
      // to a touch device or not.
      var sourceCapabilities = Date.now() < lastTouchTime + touchTimeConstant ? touchDevice : nonTouchDevice;

      // Cache the value to ensure it can't change over the life of the event.
      Object.defineProperty(this, specifiedSourceCapabilitiesName, {
        value: sourceCapabilities,
        writable: false
      });

      return sourceCapabilities;
    },
    configurable: true,
    enumerable: true
  });

  // Add support for supplying a sourceCapabilities from JS in all UIEvent constructors.
  function augmentEventConstructor(constructorName) {
    if (!(constructorName in global)) return;

    // IE doesn't support event constructors at all.
    // In Safari typeof constructor is 'object' while it's 'function' in other browsers.
    if (!('length' in global[constructorName]) || global[constructorName].length < 1) return;

    var origCtor = global[constructorName];
    global[constructorName] = function (type, initDict) {
      var sourceCapabilities = initDict && initDict.sourceCapabilities ? initDict.sourceCapabilities : null;
      // Need to explicitly remove sourceCapabilities from the dictionary as it would cause
      // a type error in blink when InputDeviceCapabilities support is disabled.
      if (initDict) delete initDict.sourceCapabilities;
      var evt = new origCtor(type, initDict);
      // Stash the sourceCapabilities value away for use by the UIEvent.sourceCapabilities
      // getter.  We could instead shadow the property on this instance, but
      // that would be subtly different than the specified API.
      Object.defineProperty(evt, specifiedSourceCapabilitiesName, {
        value: sourceCapabilities,
        writable: false
      });
      return evt;
    };
    global[constructorName].prototype = origCtor.prototype;
  };

  // Note that SVGZoomEvent desn't yet have constructors defined.
  var uiEventConstructors = ['UIEvent', 'MouseEvent', 'TouchEvent', 'InputEvent', 'CompositionEvent', 'FocusEvent', 'KeyboardEvent', 'WheelEvent', 'PointerEvent'];
  for (var i = 0; i < uiEventConstructors.length; i++) {
    augmentEventConstructor(uiEventConstructors[i]);
  } // Ensure events created with document.createEvent always get a null sourceCapabilities
  var origCreateEvent = Document.prototype.createEvent;
  Document.prototype.createEvent = function (type) {
    var evt = origCreateEvent.call(this, type);
    if (evt instanceof UIEvent) {
      Object.defineProperty(evt, specifiedSourceCapabilitiesName, {
        value: null,
        writable: false
      });
      return evt;
    }
  };
}

exports.default = InputDeviceCapabilities;

/***/ })
/******/ ])["default"];
});