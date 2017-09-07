/******/ (function(modules) { // webpackBootstrap
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _performanceNow = __webpack_require__(1);

var _performanceNow2 = _interopRequireDefault(_performanceNow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_SWIPE_VELOCITY = 0.6;
var DIRECTION_THRESHOLD = 10;
var CHECK_DIRECTION_COUNT = 2;

var eventOptions = false;
try {
  var options = Object.defineProperty({}, "passive", {
    get: function get() {
      eventOptions = {
        passive: false,
        capture: true
      };
    }
  });
  window.addEventListener("test", null, options);
} catch (err) {}

var GestureHelper = function () {
  function GestureHelper(el, options) {
    _classCallCheck(this, GestureHelper);

    this.el = el;
    this.options = Object.assign({}, {
      threshold: DIRECTION_THRESHOLD,
      swipeVelocity: DEFAULT_SWIPE_VELOCITY,
      onPanStart: function onPanStart() {},
      onPan: function onPan() {},
      onPanEnd: function onPanEnd() {}
    }, options);
    this.panning = false;
    this.startDirection = null;
    this.directionCount = 0;
    this.setup();
  }

  _createClass(GestureHelper, [{
    key: 'isPanning',
    value: function isPanning() {
      return this.panning;
    }
  }, {
    key: 'setup',
    value: function setup() {
      var _this = this;

      // MOUSE
      var mouseMoveHandler = function mouseMoveHandler(e) {
        return _this.handleMove({
          e: e, x: e.clientX, y: e.clientY
        });
      };
      this.el.addEventListener('mousedown', function (e) {
        _this.handleStart({ x: e.clientX, y: e.clientY });
        _this.el.addEventListener('mousemove', mouseMoveHandler, eventOptions);
      }, eventOptions);
      this.el.addEventListener('mouseup', function (e) {
        _this.handleEnd();
        console.log('kill listeners!!');
        _this.el.removeEventListener('mousemove', mouseMoveHandler, eventOptions);
      }, eventOptions);

      // TOUCH
      var touchMoveHandler = function touchMoveHandler(e) {
        return _this.handleMove({
          e: e,
          x: e.touches[0].clientX, y: e.touches[0].clientY
        });
      };
      var touchEndHandler = function touchEndHandler(e) {
        _this.handleEnd();
        _this.el.removeEventListener('touchmove', touchMoveHandler, eventOptions);
      };
      this.el.addEventListener('touchstart', function (e) {
        _this.handleStart({
          x: e.touches[0].clientX, y: e.touches[0].clientY
        });
        _this.el.addEventListener('touchmove', touchMoveHandler, eventOptions);
      }, false);
      this.el.addEventListener('touchend', touchEndHandler, eventOptions);
      this.el.addEventListener('touchcancel', touchEndHandler, eventOptions);
    }
  }, {
    key: 'handleStart',
    value: function handleStart(_ref) {
      var _ref$x = _ref.x,
          x = _ref$x === undefined ? 0 : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === undefined ? 0 : _ref$y;


      // Ensure all settings are reset:
      this.startX = x;
      this.startY = y;
      this.startDirection = null;
      this.directionCount = 1;
      this.panning = false;
      this.startTime = _performanceNow2.default.now();
      this.maxVelocity = this.currVelocity = 0;
    }
  }, {
    key: 'getStartDirection',
    value: function getStartDirection(_ref2) {
      var _ref2$x = _ref2.x,
          x = _ref2$x === undefined ? 0 : _ref2$x,
          _ref2$y = _ref2.y,
          y = _ref2$y === undefined ? 0 : _ref2$y;

      if (this.directionCount < CHECK_DIRECTION_COUNT) {
        this.directionCount++;
        return null;
      } else {
        return Math.abs(x) > Math.abs(y) ? 'horizontal' : 'vertical';
      }
    }
  }, {
    key: 'handleMove',
    value: function handleMove(_ref3) {
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
      } else if (this.startDirection === 'horizontal' && !this.panning && Math.abs(deltaX) > this.options.threshold) {

        this.panning = true;
        this.options.onPanStart({});
      }

      if (this.panning) {
        if (eventOptions && eventOptions.passive === false) {
          e.preventDefault();
        }
        this.options.onPan({ deltaX: deltaX });

        // velocity = the time taken / total distance moved:
        this.currVelocity = deltaX / (_performanceNow2.default.now() - this.startTime);
        this.maxVelocity = Math.max(this.maxVelocity, Math.abs(this.currVelocity));
      }
    }
  }, {
    key: 'handleEnd',
    value: function handleEnd(x) {
      if (!this.panning) {
        return;
      }
      this.options.onPanEnd({
        isSwipe: this.maxVelocity > this.options.swipeVelocity,
        swipeDirection: this.currVelocity > 0 ? 'left' : 'right'
      });

      this.panning = false;
    }
  }]);

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