'use strict';

import EventEmitter2 from 'eventemitter2';
import perfNow from 'performance-now';

// @TODO: temp polyfill code, should tidy this a bit..
import InputDeviceCapabilitiesPolyfill from './inputdevicecapabilities-polyfill.js';
InputDeviceCapabilitiesPolyfill(window);

export default class GestureHelper extends EventEmitter2 {
  constructor(...props) {
    super({
      wildcard: true,
    });

    this.el = props[0];
    this.options = Object.assign({}, {
      sensitivity: 5,
      passive: false,
      capture: false,
      swipeVelocity: 0.7,
      maxTapDuration: 300,
      longTapDuration: 400,
      startDirectionLoopCount: 2,
    }, props[1] || {});

    this.panning = false;
    this.startDirection = null;
    this.directionCount = 0;
    this.clearVelocityStats();

    // Small feature detect for support of "passive" events
    this.eventOptions = false;
    try {
      var options = Object.defineProperty({}, "passive", {
        get: () => {
          this.eventOptions = {
            passive: !! this.options.passive,
            capture: !! this.options.capture
          };
        }
      });
      this.el.addEventListener("test", null, options);
    } catch(err) {
      console.error(err);
      this.eventOptions = {
        capture: !! this.options.capture
      };
    }

    this.setup();
  }

  clearVelocityStats() {
    this.velocity = {
      current: { x: 0, y: 0 },
      max: { x: 0, y: 0 },
    };
  }

  isPanning() {
    return this.panning;
  }

  setup() {
    this.el.addEventListener('mousedown', this.mouseDown, this.eventOptions);
    this.el.addEventListener('mouseup', this.mouseUp, this.eventOptions);
    this.el.addEventListener('touchstart', this.touchStart, this.eventOptions);
    this.el.addEventListener('touchend', this.touchEnd, this.eventOptions);
    this.el.addEventListener('touchcancel', this.touchEnd, this.eventOptions);
  }

  mouseMove = (e) => {
    this.handleMove({ e: e, x: e.clientX, y: e.clientY });
  }

  touchMove = (e) => {
    this.handleMove({ e: e, x: e.touches[0].clientX, y: e.touches[0].clientY });
  }

  touchStart = (e) => {
    this.handleStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      e: e
    });
    this.el.addEventListener('touchmove', this.touchMove, this.eventOptions);
  }

  touchEnd = (e) => {
    this.handleEnd(e);
    this.el.removeEventListener('touchmove', this.touchMove, this.eventOptions);
  }

  mouseDown = (e) => {
    if (e.sourceCapabilities.firesTouchEvents) return;
    this.handleStart({ x: e.clientX, y: e.clientY, e: e });
    this.el.addEventListener('mousemove', this.mouseMove, this.eventOptions);
  }

  mouseUp = (e) => {
    if (e.sourceCapabilities.firesTouchEvents) return;
    this.handleEnd(e);
    this.el.removeEventListener('mousemove', this.mouseMove, this.eventOptions);
  }

  destroy() {
    this.el.removeEventListener('mousedown', this.mouseDown, this.eventOptions);
    this.el.removeEventListener('mouseup', this.mouseUp, this.eventOptions);
    this.el.removeEventListener('mousemove', this.mouseMove, this.eventOptions);
    this.el.removeEventListener('touchstart', this.touchStart, this.eventOptions);
    this.el.removeEventListener('touchend', this.touchEnd, this.eventOptions);
    this.el.removeEventListener('touchcancel', this.touchEnd, this.eventOptions);
    this.el.removeEventListener('touchmove', this.touchMove, this.eventOptions);
  }

  getStartDirection({x=0,y=0}) {
    if (this.directionCount <= this.options.startDirectionLoopCount) {
      this.directionCount++;
      return null;
    } else {
      return Math.abs(x) > Math.abs(y) ? 'horizontal' : 'vertical';
    }
  }

  handleStart({x=0,y=0,e={}}) {

    // Ensure all settings are reset:
    this.startX = x;
    this.startY = y;
    this.startDirection = null;
    this.directionCount = 1;
    this.panning = false;
    this.startTime = perfNow();
    this.clearVelocityStats();
    this.emit('pan.prestart', { sourceEvent: e });
  }

  handleMove({e={},x=0,y=0}) {
    const deltaX = x - this.startX;
    const deltaY = y - this.startY;

    if (this.startDirection === null) {
      this.startDirection = this.getStartDirection({ x:deltaX, y:deltaY });
    } else if (!this.panning
      && (Math.abs(deltaX) > this.options.sensitivity
        || Math.abs(deltaY) > this.options.sensitivity)) {

      this.panning = true;
      this.emit('pan.start', {
        startDirection: this.startDirection,
        sourceEvent: e
      });
    }

    if (this.panning) {
      this.emit('pan.all', {
        startDirection: this.startDirection,
        deltaX, deltaY,
        sourceEvent: e
      });

      if (this.startDirection === 'horizontal') {
        deltaX < 0
          ? this.emit('pan.x.left', { delta: deltaX, sourceEvent: e })
          : this.emit('pan.x.right', { delta: deltaX, sourceEvent: e });
      } else if (this.startDirection === 'vertical') {
        deltaY < 0
          ? this.emit('pan.y.up', { delta: deltaY, sourceEvent: e })
          : this.emit('pan.y.down', { delta: deltaY, sourceEvent: e });
      }

      // velocity = total distance moved / the time taken
      const deltaTime = perfNow() - this.startTime;
      this.velocity.current.x = deltaX / deltaTime;
      this.velocity.current.y = deltaY / deltaTime;
      this.velocity.max.x = Math.max(this.velocity.max.x, Math.abs(this.velocity.current.x));
      this.velocity.max.y = Math.max(this.velocity.max.y, Math.abs(this.velocity.current.y));
    }
  }

  handleEnd = (e) => {
    const deltaTime = perfNow() - this.startTime;
    if (this.panning) {
      this.panning = false;
      let isSwipe = false;
      let swipeDirection = null;
      if (this.velocity.max.x > this.options.swipeVelocity
        && this.startDirection === 'horizontal') {

        isSwipe = true;
        swipeDirection = this.velocity.current.x > 0 ? 'right' : 'left';
      } else if (this.velocity.max.y > this.options.swipeVelocity
        && this.startDirection === 'vertical') {

        isSwipe = true;
        swipeDirection = this.velocity.current.y > 0 ? 'down' : 'up';
      }
      this.emit('pan.end', { isSwipe, swipeDirection, sourceEvent: e });
      if (this.options.useMomentum) {
        this.momentum = momentum({
          velocity: {
            x: this.velocity.current.x,
            y: this.velocity.current.y,
          },
          from: {
            x: this.lastDeltaX,
            y: this.lastDeltaY,
          },
        });
        this.momentum.start();
      }

    } else if (deltaTime <= this.options.maxTapDuration) {
      this.emit('tap', { srcEvent: e });
    }

    return;
  }
}
