# gesture-helper
a **tiny** touch & mouse library to help make tracking touch interactions more simple.

***note:** This lib currently only supports horizontal movement. If/when it detects up and down movement (at gesture start), it stands down so that the browser can scroll, as per usual.

# install:
```yarn install gesture-helper```

**then:**
```
let gestureControl = new GestureHelper(document.querySelector('.el'), {
  onPanStart: () => {},
  onPan: (e) => {},
  onPanEnd: (e) => {},
});
```

# optional settings (with default value):
```
  sensitivity: Number(5), // Integer: Px's movement to allow before capturing pan event
  swipeVelocity: Float(0.7), // Float: Velocity threshold range for varied swipe detection
```

