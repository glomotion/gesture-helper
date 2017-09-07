import GestureHelper from '../src/gesture-helper.js';

const demoOutput = document.getElementById('output');
let gestureControl = new GestureHelper(document.body, {
  onPanStart: () => {},
  onPan: (e) => {
    demoOutput.innerHTML = JSON.stringify(e);
  },
  onPanEnd: (e) => {
    demoOutput.innerHTML = `click &amp; drag horizontally ...`;
  },
});

