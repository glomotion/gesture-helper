'use strict';

import perfNow from 'performance-now';

export default class GestureHelper {
  constructor(el, options) {
    this.el = el;
    this.options = Object.assign({}, {
      sensitivity: 5,
      passive: false,
      capture: false,
      allowOppositeDirection: true,
      swipeVelocity: 0.7,
      onPanStart: () => {},
      onPan: () => {},
      onPanEnd: () => {}
    }, options);
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
      console.err(err);
      this.eventOptions = {
        capture: !! this.options.capture
      };
    }

    this._touchStart = this.touchStart.bind(this);
    this._touchEnd = this.touchEnd.bind(this);
    this._touchMove = this.touchMove.bind(this);
    this._mouseUp = this.mouseUp.bind(this);
    this._mouseDown = this.mouseDown.bind(this);
    this._mouseMove = this.mouseMove.bind(this);

    this.setup();
  }

  isPanning() {
    return this.panning;
  }

  setup() {
    this.el.addEventListener('mousedown', this._mouseDown, this.eventOptions);
    this.el.addEventListener('mouseup', this._mouseUp, this.eventOptions);    
    this.el.addEventListener('touchstart', this._touchStart, this.eventOptions);
    this.el.addEventListener('touchend', this._touchEnd, this.eventOptions);
    this.el.addEventListener('touchcancel', this._touchEnd, this.eventOptions);
  }

  mouseMove(e) {
    this.handleMove({ e: e, x: e.clientX, y: e.clientY });
  }

  touchMove(e) {
    this.handleMove({ e: e, x: e.touches[0].clientX, y: e.touches[0].clientY });
  }

  touchStart(e) {
    this.handleStart({
      x: e.touches[0].clientX, 
      y: e.touches[0].clientY,
      e: e
    });
    this.el.addEventListener('touchmove', this._touchMove, this.eventOptions);
  }
  
  touchEnd(e) {
    this.handleEnd(e);
    this.el.removeEventListener('touchmove', this._touchMove, this.eventOptions);
  }

  mouseDown(e) {
    this.handleStart({ x: e.clientX, y: e.clientY, e: e });
    this.el.addEventListener('mousemove', this._mouseMove, this.eventOptions);
  }

  mouseUp(e) {
    this.handleEnd(e);
    this.el.removeEventListener('mousemove', this._mouseMove, this.eventOptions);
  }

  destroy() {
    this.el.removeEventListener('mousedown', this._mouseDown, this.eventOptions);
    this.el.removeEventListener('mouseup', this._mouseUp, this.eventOptions);    
    this.el.removeEventListener('mousemove', this._mouseMove, this.eventOptions);
    this.el.removeEventListener('touchstart', this._touchStart, this.eventOptions);
    this.el.removeEventListener('touchend', this._touchEnd, this.eventOptions);
    this.el.removeEventListener('touchcancel', this._touchEnd, this.eventOptions);
    this.el.removeEventListener('touchmove', this._touchMove, this.eventOptions);
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
    
    // If we're not allowing opposite direction browser default behaviours:
    if (this.options.allowOppositeDirection === false
      && this.eventOptions
      && this.eventOptions.passive === false) {
    
      e.preventDefault();
    }

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
      this.options.onPanStart({
        sourceEvent: e,
        startDirection: this.startDirection
      });
    }

    // If we're not allowing opposite direction browser default behaviours:
    if (this.options.allowOppositeDirection === false
      && this.eventOptions
      && this.eventOptions.passive === false) {
    
      e.preventDefault();
    }

    if (this.panning) {

      // If allowing opposite direction browser default behaviours:
      if (this.options.allowOppositeDirection === true
        && this.eventOptions
        && this.eventOptions.passive === false) {
      
        e.preventDefault();
      }
      
      this.options.onPan({ 
        deltaX,
        sourceEvent: e 
      });

      // velocity = total distance moved / the time taken
      this.currVelocity = deltaX / (perfNow() - this.startTime);
      this.maxVelocity = Math.max(this.maxVelocity, Math.abs(this.currVelocity));
    }
  }

  handleEnd(e) {
    if (!this.panning) return;
    this.options.onPanEnd({
      isSwipe: this.maxVelocity > this.options.swipeVelocity,
      swipeDirection: (this.currVelocity > 0) ? 'left' : 'right',
      sourceEvent: e
    });

    this.panning = false;
  }
}
