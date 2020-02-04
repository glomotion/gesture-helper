import GestureHelper from "../src/gesture-helper.js";

const demoOutput = document.getElementById("output");
const gestureCtrl = new GestureHelper(document.body, {
  sensitivity: 0,
  passive: false,
  capture: false
  // useMomentum: true
  // longTapDuration: 500, // coming soon
});

gestureCtrl.on("tap", e => {
  demoOutput.innerHTML = JSON.stringify(e);
  clear();
});

gestureCtrl.on("pan.all", handleAll);

gestureCtrl.on("pan.start", function(ev) {
  demoOutput.innerHTML = JSON.stringify(ev);
});

gestureCtrl.on("pan.end", function(ev) {
  demoOutput.innerHTML = JSON.stringify(ev);
  clear();
});

gestureCtrl.on("momentum.**", function(ev) {
  demoOutput.innerHTML = JSON.stringify(ev);
});

function handleAll(ev) {
  demoOutput.innerHTML = JSON.stringify(ev);
}

const clear = () =>
  setTimeout(() => {
    demoOutput.innerHTML = `click &amp; drag horizontally ...`;
    // gestureCtrl.off('pan.x.**', handler);
    // gestureCtrl.off('pan.both', handleBoth);
  }, 5000);
