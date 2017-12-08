import GestureHelper from '../src/gesture-helper.js';

const demoOutput = document.getElementById('output');
let gestureControl = new GestureHelper(document.body, {
  passive: false,
  capture: true,
  allowOppositeDirection: false,
  onPanStart: (e) => {
    console.log(e);
    // e.sourceEvent.preventDefault();
    demoOutput.innerHTML = JSON.stringify(e);
  },
  onPan: (e) => {
    console.log(e);
    // e.sourceEvent.preventDefault();
    demoOutput.innerHTML = JSON.stringify(e);
  },
  onPanEnd: (e) => {
    // e.sourceEvent.preventDefault();
    demoOutput.innerHTML = JSON.stringify(e);
    setTimeout(() => {
      demoOutput.innerHTML = `click &amp; drag horizontally ...`;
    }, 1000);
  },
});

