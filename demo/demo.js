import GestureHelper from '../src/gesture-helper.js';

const demoOutput = document.getElementById('output');
let gestureControl = new GestureHelper(document.body, {
  onPanStart: () => {},
  onPan: (e) => {
    demoOutput.innerHTML = JSON.stringify(e);
  },
  onPanEnd: (e) => {
    demoOutput.innerHTML = JSON.stringify(e);
    setTimeout(() => {
      demoOutput.innerHTML = `click &amp; drag horizontally ...`;
    }, 1000);
  },
});

