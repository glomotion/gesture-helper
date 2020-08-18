import GestureHelper from "../src/gesture-helper.ts";

const demoOutput = document.getElementById("output");
const gestureCtrl = new GestureHelper(document.getElementById("touchArea"), {
  sensitivity: 0,
  passive: false,
  capture: false,
  startDirectionLoopCount: 2,
  terminatePanOutsideBounds: true,
  outsideBoundsOffset: 15,
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
  clearTimeout(timeoutIndex);
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
  `;
  clearTimeout(timeoutIndex);
}

// function handleX(ev) {
//   demoOutput.innerHTML = JSON.stringify(ev);
//   console.log('!!!!!!!!', ev);
// }

let timeoutIndex;
const clear = () => {
  timeoutIndex = setTimeout(() => {
    demoOutput.innerHTML = `click &amp; drag horizontally ...`;
  }, 2000);
};
