import GestureHelper from "../src/gesture-helper.js";

const demoOutput = document.getElementById("output");
const gestureCtrl = new GestureHelper(document.getElementById("touchArea"), {
  sensitivity: 0,
  passive: false,
  capture: false,
  startDirectionLoopCount: 2,
  // useMomentum: true
  // longTapDuration: 500, // coming soon
});

gestureCtrl.on("tap", e => {
  demoOutput.innerHTML = JSON.stringify(e);
  clear();
});


gestureCtrl.on("pan.start", function (ev) {
  demoOutput.innerHTML = JSON.stringify(ev);
});

gestureCtrl.on("pan.all", handleAll);
// gestureCtrl.on("pan.x.**", handleX);

gestureCtrl.on("pan.end", function (ev) {
  demoOutput.innerHTML = JSON.stringify(ev);
  clear();
});

function handleAll(ev) {
  demoOutput.innerHTML = JSON.stringify(ev);
}

function handleX(ev) {
  demoOutput.innerHTML = JSON.stringify(ev);
  console.log('!!!!!!!!', ev);
}

const clear = () =>
  setTimeout(() => {
    demoOutput.innerHTML = `click &amp; drag horizontally ...`;
  }, 5000);
