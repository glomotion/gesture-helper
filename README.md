# gesture-helper
a **tiny** touch & mouse library to help make tracking touch interactions more simple.

Gesture helper extends https://github.com/asyncly/EventEmitter2, and returns an event emitter.
Events can be name spaced, per EventEmitter2. This means that you can bind to the following events:
```javascript
tap
pan.**
pan.start
pan.end
pan.y.up
pan.y.down
pan.y.**
pan.x.left
pan.x.right
pan.x.**
```
In the interest of keeping the library small, versatile and uncomplicated, all source touch/mouse events are returned inside EE2 event payloads ```javascript { sourceEvent: e }```.
This allows you to add preventDefault() and other native event functionality as you need it.

# install:
```bash yarn install gesture-helper```

**then:**
```javascript
const gestureControl = new GestureHelper(document.querySelector('.el'), { ...options });
```

# optional settings (with default value):
```javascript
  passive: false,
  capture: false,
  sensitivity: Number(5), // Integer: Px's movement to allow before capturing pan event
  swipeVelocity: Float(0.7), // Float: Velocity threshold range for varied swipe detection
  maxTapDuration: Number(300), // Integer: Milliseconds of finger being on the screen before a tap event is ignored
```

