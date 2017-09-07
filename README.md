# gesture-helper
a simple touch &amp; mouse library to help make tracking touch interactions more simple.

# install:
```yarn install gesture-helper```

then
```
let gestureControl = new GestureHelper(document.querySelector('.el'), {
  onPanStart: () => {},
  onPan: (e) => {},
  onPanEnd: (e) => {},
});
```

# optional settings:
```
threshold: 10,
swipeVelocity: 0 - 2
```

