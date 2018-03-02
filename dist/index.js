webpackJsonp([0],{

/***/ "V2lK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _eventemitter = __webpack_require__("JNfv");

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _performanceNow = __webpack_require__("UGHC");

var _performanceNow2 = _interopRequireDefault(_performanceNow);

var _inputdevicecapabilitiesPolyfill = __webpack_require__("OZEC");

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
      longTapDuration: 400,
      startDirectionLoopCount: 2
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

    if (this.directionCount <= this.options.startDirectionLoopCount) {
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
    this.emit('pan.prestart', { sourceEvent: e });
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
        startDirection: this.startDirection,
        sourceEvent: e
      });
    }

    if (this.panning) {
      this.emit('pan.all', {
        startDirection: this.startDirection,
        deltaX: deltaX, deltaY: deltaY,
        sourceEvent: e
      });

      if (this.startDirection === 'horizontal') {
        deltaX < 0 ? this.emit('pan.x.left', { delta: deltaX, sourceEvent: e }) : this.emit('pan.x.right', { delta: deltaX, sourceEvent: e });
      } else if (this.startDirection === 'vertical') {
        deltaY < 0 ? this.emit('pan.y.up', { delta: deltaY, sourceEvent: e }) : this.emit('pan.y.down', { delta: deltaY, sourceEvent: e });
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

/***/ })

},["V2lK"]);