import GestureHelper from '../src/gesture-helper.js';

const demoOutput = document.getElementById('output');
const gestureCtrl = new GestureHelper(document.body, {
  passive: false,
  capture: true,
  blockOppositeScroll: false,
  maxTapDuration: 300,
  sensitivity: 5,
});

gestureCtrl.on('tap', (e) => {
  console.log('tap!');
  demoOutput.innerHTML = JSON.stringify(e);
  clear();
});

gestureCtrl.on('pan.all', handleAll);
// gestureCtrl.on('pan.**', handler);
// gestureCtrl.on('pan.y.**', handler);

// gestureCtrl.on('pan.start', function(ev) {
//   console.log('pan.start', ev);
// });

// gestureCtrl.on('pan.end', function(ev) {
//   console.log('pan.end', ev);
// });

function handleAll(ev) {
  console.log('pan.all', ev);
}

function handler(ev) {
  console.log(this.event, ev);
}

const clear = () => setTimeout(() => {
  demoOutput.innerHTML = `click &amp; drag horizontally ...`;
  // gestureCtrl.off('pan.x.**', handler);
  // gestureCtrl.off('pan.both', handleBoth);
}, 1000);