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

In the interest of keeping the library small, versatile and uncomplicated, all source touch/mouse events are returned inside EE2 event payloads, as follows:

```javascript
{ ..., sourceEvent: e }
```

This allows you to add preventDefault() and other native event functionality as you need it.

Per EE2, the event handler name (eg. ```pan.x.up```, ```pan.all```) is also returned to the listener function's scope as the property ```this.event```.
*Note: If you plan to access this property, please avoid defining handlers using arrow functions.

# install:
```
yarn install gesture-helper
npm i gesture-helper
```

**then:**
```javascript
const gestureControl = new GestureHelper(document.querySelector('.el'), { ...options });
gestureCtrl.on('tap', (e) => {
  console.log(this.event) // window.event
});
gestureCtrl.on('pan.all', function(e) {
  console.log(this.event) // 'pan.all'
});
```

# optional settings (with default value):
```javascript
  passive: false,
  capture: false,
  sensitivity: Number(5), // Integer: Px's movement to allow before capturing pan event
  swipeVelocity: Float(0.7), // Float: Velocity threshold range for varied swipe detection
  maxTapDuration: Number(300), // Integer: Milliseconds of finger being on the screen before a tap event is ignored
```

