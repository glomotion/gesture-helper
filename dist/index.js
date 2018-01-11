(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("gesture-helper", [], factory);
	else if(typeof exports === 'object')
		exports["gesture-helper"] = factory();
	else
		root["gesture-helper"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _performanceNow = __webpack_require__(1);

var _performanceNow2 = _interopRequireDefault(_performanceNow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GestureHelper = function () {
  function GestureHelper(el, options) {
    var _this = this;

    _classCallCheck(this, GestureHelper);

    this.mouseMove = function (e) {
      _this.handleMove({ e: e, x: e.clientX, y: e.clientY });
    };

    this.touchMove = function (e) {
      _this.handleMove({ e: e, x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    this.touchStart = function (e) {
      _this.handleStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        e: e
      });
      _this.el.addEventListener('touchmove', _this.touchMove, _this.eventOptions);
    };

    this.touchEnd = function (e) {
      _this.handleEnd(e);
      _this.el.removeEventListener('touchmove', _this.touchMove, _this.eventOptions);
    };

    this.mouseDown = function (e) {
      _this.handleStart({ x: e.clientX, y: e.clientY, e: e });
      _this.el.addEventListener('mousemove', _this.mouseMove, _this.eventOptions);
    };

    this.mouseUp = function (e) {
      _this.handleEnd(e);
      _this.el.removeEventListener('mousemove', _this.mouseMove, _this.eventOptions);
    };

    this.handleEnd = function (e) {
      if (!_this.panning) return;
      _this.options.onPanEnd({
        isSwipe: _this.maxVelocity > _this.options.swipeVelocity,
        swipeDirection: _this.currVelocity > 0 ? 'left' : 'right',
        sourceEvent: e
      });

      _this.panning = false;
    };

    this.el = el;
    this.options = Object.assign({}, {
      sensitivity: 5,
      passive: false,
      capture: false,
      allowOppositeDirection: true,
      swipeVelocity: 0.7,
      onPanStart: function onPanStart() {},
      onPan: function onPan() {},
      onPanEnd: function onPanEnd() {}
    }, options);
    this.panning = false;
    this.startDirection = null;
    this.directionCount = 0;

    // Small feature detect for support of "passive" events
    this.eventOptions = false;
    try {
      var options = Object.defineProperty({}, "passive", {
        get: function get() {
          _this.eventOptions = {
            passive: !!_this.options.passive,
            capture: !!_this.options.capture
          };
        }
      });
      this.el.addEventListener("test", null, options);
    } catch (err) {
      console.err(err);
      this.eventOptions = {
        capture: !!this.options.capture
      };
    }

    this.setup();
  }

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
    this.maxVelocity = this.currVelocity = 0;
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
    } else if (this.startDirection === 'horizontal' && !this.panning && Math.abs(deltaX) > this.options.sensitivity) {

      this.panning = true;
      this.options.onPanStart({
        sourceEvent: e,
        startDirection: this.startDirection
      });
    }

    // If we're not allowing opposite direction browser default behaviours:
    if (this.options.allowOppositeDirection === false && this.eventOptions && this.eventOptions.passive === false) {

      e.preventDefault();
    }

    if (this.panning) {

      // If allowing opposite direction browser default behaviours:
      if (this.options.allowOppositeDirection === true && this.eventOptions && this.eventOptions.passive === false) {

        e.preventDefault();
      }

      this.options.onPan({
        deltaX: deltaX,
        sourceEvent: e
      });

      // velocity = total distance moved / the time taken
      this.currVelocity = deltaX / ((0, _performanceNow2.default)() - this.startTime);
      this.maxVelocity = Math.max(this.maxVelocity, Math.abs(this.currVelocity));
    }
  };

  return GestureHelper;
}();

exports.default = GestureHelper;

/***/ }),
/* 1 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
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


/***/ })
/******/ ]);
});