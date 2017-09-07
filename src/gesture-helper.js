'use strict';

import perf from 'performance-now';

const DEFAULT_SWIPE_VELOCITY = 0.6;
const DIRECTION_THRESHOLD = 10;
const CHECK_DIRECTION_COUNT = 2;

var eventOptions = false;
try {
  var options = Object.defineProperty({}, "passive", {
    get: () => {
      eventOptions = {
        passive: false,
        capture: true
      };
    }
  });
  window.addEventListener("test", null, options);
} catch(err) {}

export default class GestureHelper {
  constructor(el, options) {
    this.el = el;
    this.options = Object.assign({}, {
      threshold: DIRECTION_THRESHOLD,
      swipeVelocity: DEFAULT_SWIPE_VELOCITY,
      onPanStart: () => {},
      onPan: () => {},
      onPanEnd: () => {}
    }, options);
    this.panning = false;
    this.startDirection = null;
    this.directionCount = 0;
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
      this.el.addEventListener('mousemove', mouseMoveHandler, eventOptions);
    }, eventOptions);
    this.el.addEventListener('mouseup', e => {
      this.handleEnd();
      console.log('kill listeners!!');
      this.el.removeEventListener('mousemove', mouseMoveHandler, eventOptions);
    }, eventOptions);

    // TOUCH
    let touchMoveHandler = e => this.handleMove({
      e: e,
      x: e.touches[0].clientX, y: e.touches[0].clientY
    });
    let touchEndHandler = e => {
      this.handleEnd();
      this.el.removeEventListener('touchmove', touchMoveHandler, eventOptions);
    };
    this.el.addEventListener('touchstart', e => {
      this.handleStart({
        x: e.touches[0].clientX, y: e.touches[0].clientY
      });
      this.el.addEventListener('touchmove', touchMoveHandler, eventOptions);
    }, false);
    this.el.addEventListener('touchend', touchEndHandler, eventOptions);
    this.el.addEventListener('touchcancel', touchEndHandler, eventOptions);
  }

  handleStart({x=0,y=0}) {

    // Ensure all settings are reset:
    this.startX = x;
    this.startY = y;
    this.startDirection = null;
    this.directionCount = 1;
    this.panning = false;
    this.startTime = perf.now();
    this.maxVelocity = this.currVelocity = 0;
  }

  getStartDirection({x=0,y=0}) {
    if (this.directionCount < CHECK_DIRECTION_COUNT) {
      this.directionCount++;
      return null;
    } else {
      return Math.abs(x) > Math.abs(y) ? 'horizontal' : 'vertical';
    }
  }

  handleMove({e={},x=0,y=0}) {
    let deltaX = x - this.startX;
    let deltaY = y - this.startY;

    if (this.startDirection === null) {
      this.startDirection = this.getStartDirection({x:deltaX,y:deltaY});
    } else if (this.startDirection === 'horizontal'
      && !this.panning
      && Math.abs(deltaX) > this.options.threshold) {

      this.panning = true;
      this.options.onPanStart({});
    }

    if (this.panning) {
      if (eventOptions && eventOptions.passive === false) {
        e.preventDefault();
      }
      this.options.onPan({deltaX});

      // velocity = the time taken / total distance moved:
      this.currVelocity = deltaX / (perf.now() - this.startTime);
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
