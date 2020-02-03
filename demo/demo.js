import GestureHelper from '../src/gesture-helper.js';

const demoOutput = document.getElementById('output');
const gestureCtrl = new GestureHelper(document.body, {
  sensitivity: 0,
  passive: false,
  capture: false,
  swipeVelocity: 0.7,
  maxTapDuration: 300,
  startDirectionLoopCount: 1,
  useMomentum: true,
  // longTapDuration: 500, // coming soon
});

gestureCtrl.on('tap', (e) => {
  console.log('tap!');
  demoOutput.innerHTML = JSON.stringify(e);
  clear();
});

gestureCtrl.on('pan.all', handleAll);
// gestureCtrl.on('pan.y.**', handler);

gestureCtrl.on('pan.start', function (ev) {
  console.log('pan.start', ev);
});

gestureCtrl.on('pan.end', function (ev) {
  console.log('pan.end', ev);
  demoOutput.innerHTML = JSON.stringify(ev);
  clear();
});

gestureCtrl.on('momentum.**', function (ev) {
  console.log('momentum.**', ev);
  demoOutput.innerHTML = JSON.stringify(ev);
});

function handleAll(ev) {
  console.log(this.event, ev);
  demoOutput.innerHTML = JSON.stringify(ev);
}

function handler(ev) {
  console.log(this.event, ev);
  demoOutput.innerHTML = JSON.stringify(ev);
}

const clear = () => setTimeout(() => {
  demoOutput.innerHTML = `click &amp; drag horizontally ...`;
  // gestureCtrl.off('pan.x.**', handler);
  // gestureCtrl.off('pan.both', handleBoth);
}, 1000);
