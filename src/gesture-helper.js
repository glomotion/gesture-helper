'use strict';

import EventEmitter from 'events';
import perfNow from 'performance-now';

export default class GestureHelper extends EventEmitter {
  constructor(...props) {
    super(...props);
    this.el = props[0];
    this.options = Object.assign({}, {
      sensitivity: 5,
      passive: false,
      capture: false,
      swipeVelocity: 0.7,
    }, props[1] || {});

    this.panning = false;
    this.startDirection = null;
    this.directionCount = 0;

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
    this.handleStart({ x: e.clientX, y: e.clientY, e: e });
    this.el.addEventListener('mousemove', this.mouseMove, this.eventOptions);
  }

  mouseUp = (e) => {
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
    if (this.directionCount < 2) {
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
    this.maxVelocity = this.currVelocity = 0;
  }

  handleMove({e={},x=0,y=0}) {
    let deltaX = x - this.startX;
    let deltaY = y - this.startY;

    if (this.startDirection === null) {
      this.startDirection = this.getStartDirection({ x:deltaX, y:deltaY });
    } else if (this.startDirection === 'horizontal'
      && !this.panning
      && Math.abs(deltaX) > this.options.sensitivity) {

      this.panning = true;
      this.emit('pan-start', {
        sourceEvent: e,
        startDirection: this.startDirection
      });
    }

    if (this.panning) {
      this.emit('pan', {
        deltaX,
        sourceEvent: e
      });

      // velocity = total distance moved / the time taken
      this.currVelocity = deltaX / (perfNow() - this.startTime);
      this.maxVelocity = Math.max(this.maxVelocity, Math.abs(this.currVelocity));
    }
  }

  handleEnd = (e) => {
    if (!this.panning) return;
    this.emit('pan-end', {
      isSwipe: this.maxVelocity > this.options.swipeVelocity,
      swipeDirection: (this.currVelocity > 0) ? 'left' : 'right',
      sourceEvent: e
    });

    this.panning = false;
  }
}
