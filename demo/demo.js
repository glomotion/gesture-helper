import GestureHelper from '../src/gesture-helper.js';

const demoOutput = document.getElementById('output');
const gestureCtrl = new GestureHelper(document.body, {
  passive: true,
  capture: true,
  blockOppositeScroll: false,
});

gestureCtrl.on('pan-start', handleStart);

function handleStart(e) {
  console.log('on pan-start', e);
  // e.sourceEvent.preventDefault();
  demoOutput.innerHTML = JSON.stringify(e);
  // setTimeout(function() {
  //   gestureCtrl.removeListener('pan-start', handleStart);
  // }, 1000);
}

gestureCtrl.on('pan', (e) => {
  console.log('on pan', e);
  // e.sourceEvent.preventDefault();
  demoOutput.innerHTML = JSON.stringify(e);
});

gestureCtrl.on('pan-end', (e) => {
  // e.sourceEvent.preventDefault();
  console.log('on pan-end', e);
  demoOutput.innerHTML = JSON.stringify(e);
  setTimeout(() => {
    demoOutput.innerHTML = `click &amp; drag horizontally ...`;
  }, 1000);
});