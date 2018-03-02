# gesture-helper
a **tiny** touch & mouse library to help make tracking touch interactions more simple.

Gesture helper extends https://github.com/asyncly/EventEmitter2, and returns an event emitter.
Events can be namespaced, per EventEmitter2. This means that you can bind to events like:
```javascript
tap // (for simple tap / click events)
pan.** // (wildcard for all pan-related events)
pan.prestart // (immediate touchStart event - mainly useful for immediately blocking browser behaviour)
pan.start // (the beginning of a discernable drag event)
pan.end // (the end of a detected drag event)
pan.all // (a progress event for any and all directions of finger movement)
pan.y.up // (a progress event as the finger moves up)
pan.y.down // (a progress event as the finger moves down)
pan.y.** // (wildcard for both up and down movement progress events)
pan.x.left // (a progress event as the finger moves left)
pan.x.right // (a progress event as the finger moves right)
pan.x.** // (wildcard for both left and right movement progress events)
```

In the interest of keeping the library small, unopinionated, and versatile - any preventDefault / stopPropogation / event bubbling related functionality is left untouched. This can be added to each application, depending on what you need.

All source touch/mouse events are returned inside all EE2 event payloads, as follows
```javascript
{ ..., sourceEvent: e }
```
Eg. you can call ```ev.sourceEvent.preventDefault()``` as well as other native browser event functionality, as you need it.

Per EE2, the event handler name (eg. ```pan.y.up```, ```pan.x.left```, ```pan.all```) is also bound to the listener function's scope as the property ```this.event```.
*Note: If you plan to access this property, please avoid defining handlers using arrow functions.

# install:
```
yarn install gesture-helper
npm i gesture-helper
```

**then:**
```javascript
import GestureHelper from 'gesture-helper';
const gestureCtrl = new GestureHelper(document.querySelector('.el'), { ...options });
gestureCtrl.on('tap', (e) => {
  console.log(this.event) // window.event
});
gestureCtrl.on('pan.all', function(e) {
  console.log(this.event) // 'pan.all'
});
```

# demo:
to see this component in action, run:
```
yarn demo
```


# optional settings (with default value):
```javascript
  passive: false,
  capture: false,
  sensitivity: Number(5), // Integer: Px's movement to allow before capturing pan event
  swipeVelocity: Float(0.7), // Float: Velocity threshold range for varied swipe detection
  maxTapDuration: Number(300), // Integer: Milliseconds of finger being on the screen before a tap event is ignored
```

