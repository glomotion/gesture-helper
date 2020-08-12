import GestureHelper from "../src/gesture-helper.js";

const demoOutput = document.getElementById("output");
const gestureCtrl = new GestureHelper(document.getElementById("touchArea"), {
  sensitivity: 0,
  passive: false,
  capture: false,
  startDirectionLoopCount: 2,
  // useMomentum: true, // coming soon
  // longTapDuration: 500, // coming soon
});

gestureCtrl.on("tap", e => {
  demoOutput.innerHTML = `
    tap event:
    ${JSON.stringify(e)}
  `;
  clear();
});


gestureCtrl.on("pan.start", function (ev) {
  demoOutput.innerHTML = `
    pan.start event:
    ${JSON.stringify(ev)}
  `;
});

gestureCtrl.on("pan.all", handleAll);
// gestureCtrl.on("pan.x.**", handleX);

gestureCtrl.on("pan.end", function (ev) {
  demoOutput.innerHTML = `
    pan.end event:
    ${JSON.stringify(ev)}
  `
  clear();
});

function handleAll(ev) {
  demoOutput.innerHTML = `
    pan.all event:
    ${JSON.stringify(ev)}
  `
}

function handleX(ev) {
  demoOutput.innerHTML = JSON.stringify(ev);
  console.log('!!!!!!!!', ev);
}

const clear = () =>
  setTimeout(() => {
    demoOutput.innerHTML = `click &amp; drag horizontally ...`;
  }, 2000);
