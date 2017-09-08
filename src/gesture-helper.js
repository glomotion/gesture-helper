'use strict';

import perfNow from 'performance-now';

export default class GestureHelper {
  constructor(el, options) {
    this.el = el;
    this.options = Object.assign({}, {
      sensitivity: 5,
      swipeVelocity: 0.7,
      onPanStart: () => {},
      onPan: () => {},
      onPanEnd: () => {}
    }, options);
    this.panning = false;
    this.startDirection = null;
    this.directionCount = 0;

    // Small feature detect for "passive" events
    this.eventOptions = false;
    try {
      var options = Object.defineProperty({}, "passive", {
        get: () => {
          this.eventOptions = {
            passive: false,
            capture: true
          };
        }
      });
      this.el.addEventListener("test", null, options);
    } catch(err) {}

    this.setup();
  }

  isPanning() {
    return this.panning;
  }

  setup() {

    // MOUSE
    let mouseMoveHandler = e => this.handleMove({
      e: e, x: e.clientX, y: e.clientY
    });
    this.el.addEventListener('mousedown', e => {
      this.handleStart({ x: e.clientX, y: e.clientY });
      this.el.addEventListener('mousemove', mouseMoveHandler, this.eventOptions);
    }, this.eventOptions);
    this.el.addEventListener('mouseup', e => {
      this.handleEnd();
      this.el.removeEventListener('mousemove', mouseMoveHandler, this.eventOptions);
    }, this.eventOptions);

    // TOUCH
    let touchMoveHandler = e => this.handleMove({
      e: e,
      x: e.touches[0].clientX, y: e.touches[0].clientY
    });
    let touchEndHandler = e => {
      this.handleEnd();
      this.el.removeEventListener('touchmove', touchMoveHandler, this.eventOptions);
    };
    this.el.addEventListener('touchstart', e => {
      this.handleStart({
        x: e.touches[0].clientX, y: e.touches[0].clientY
      });
      this.el.addEventListener('touchmove', touchMoveHandler, this.eventOptions);
    }, false);
    this.el.addEventListener('touchend', touchEndHandler, this.eventOptions);
    this.el.addEventListener('touchcancel', touchEndHandler, this.eventOptions);
  }

  getStartDirection({x=0,y=0}) {
    if (this.directionCount < 2) {
      this.directionCount++;
      return null;
    } else {
      return Math.abs(x) > Math.abs(y) ? 'horizontal' : 'vertical';
    }
  }

  handleStart({x=0,y=0}) {

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
      this.startDirection = this.getStartDirection({x:deltaX,y:deltaY});
    } else if (this.startDirection === 'horizontal'
      && !this.panning
      && Math.abs(deltaX) > this.options.sensitivity) {

      this.panning = true;
      this.options.onPanStart({});
    }

    if (this.panning) {
      if (this.eventOptions && this.eventOptions.passive === false) {
        e.preventDefault();
      }
      this.options.onPan({deltaX});

      // velocity = total distance moved / the time taken
      this.currVelocity = deltaX / (perfNow() - this.startTime);
      this.maxVelocity = Math.max(this.maxVelocity, Math.abs(this.currVelocity));
    }
  }

  handleEnd(x) {
    if (!this.panning) {
      return;
    }
    this.options.onPanEnd({
      isSwipe: this.maxVelocity > this.options.swipeVelocity,
      swipeDirection: (this.currVelocity > 0) ? 'left' : 'right'
    });

    this.panning = false;
  }
}
