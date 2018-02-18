import GestureHelper from '../src/gesture-helper.js';

const demoOutput = document.getElementById('output');
const gestureCtrl = new GestureHelper(document.body, {
  passive: false,
  capture: true,
  blockOppositeScroll: false,
  maxTapDuration: 300,
  sensitivity: 5,
});

gestureCtrl.on('pan-start', handleStart);

function handleStart(e) {
  console.log('on pan-start', e);
  e.sourceEvent.preventDefault();
  demoOutput.innerHTML = JSON.stringify(e);
}

gestureCtrl.on('long-tap', (e) => {
  console.log('long tap!');
  demoOutput.innerHTML = JSON.stringify(e);
  clear();
});

gestureCtrl.on('tap', (e) => {
  console.log('tap!');
  demoOutput.innerHTML = JSON.stringify(e);
  clear();
});

gestureCtrl.on('pan', (e) => {
  console.log('pan', e);
  e.sourceEvent.preventDefault();
  demoOutput.innerHTML = JSON.stringify(e);
});

gestureCtrl.on('pan-left', (e) => {
  console.log('pan-left', e);
});

gestureCtrl.on('pan-right', (e) => {
  console.log('pan-right', e);
});

gestureCtrl.on('pan-up', (e) => {
  console.log('pan-up', e);
});

gestureCtrl.on('pan-down', (e) => {
  console.log('pan-down', e);
});

gestureCtrl.on('pan-end', (e) => {
  e.sourceEvent.preventDefault();
  console.log('on pan-end', e);
  demoOutput.innerHTML = JSON.stringify(e);
  clear();
});

const clear = () => setTimeout(() => {
  demoOutput.innerHTML = `click &amp; drag horizontally ...`;
}, 1000);