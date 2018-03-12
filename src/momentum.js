// Reimplementing:
// github.com/Popmotion/popmotion/blob/master/packages/popmotion/src/animations/decay/index.ts

import rAF from 'raf';
import now from 'performance-now';
// import emitter from './emitter';

const momentum = (props = {}) => {
  const {
    velocity = { x: 0, y: 0 },
    from = { x: 0, y: 0 },
    power = 0.8,
    timeConstant = 350,
    restDelta = 0.5,
    roundDestination,
    emitter,
  } = props;

  let elapsed = 0;
  let rafIndex = null;
  let direction = null;

  // Decide momentum direction:
  let selectedVelocity;
  let selectedFrom;
  if (Math.abs(velocity.x) > Math.abs(velocity.y)) {
    selectedVelocity = velocity.x;
    selectedFrom = from.x;
    direction = velocity.x < 0
      ? 'left'
      : 'right';
  } else {
    selectedVelocity = velocity.y;
    selectedFrom = from.y;
    direction = velocity.y < 0
      ? 'up'
      : 'down';
  }

  const timeStart = now();
  const amplitudeX = power * velocity.x;
  const amplitudeY = power * velocity.y;
  const idealTargetX = Math.round(from.x + amplitudeX);
  const idealTargetY = Math.round(from.y + amplitudeY);
  // const target = (typeof modifyTarget === 'undefined')
  //   ? idealTargetX
  //   : modifyTarget(idealTarget);
  const targetX = idealTargetX;
  const targetY = idealTargetY;
  emitter.emit('momentum.start');

  function modifyTarget(idealTarget) {
    // @TODO: allow the momentum to be rounded down to the nearest integer:
    return idealTarget;
  }

  function update() {
    rafIndex = rAF(() => {
      elapsed = now() - timeStart;
      const deltaX = -amplitudeX * Math.exp(-elapsed / timeConstant);
      const deltaY = -amplitudeY * Math.exp(-elapsed / timeConstant);
      const isMovingX = deltaX > restDelta || deltaX < -restDelta;
      const isMovingY = deltaY > restDelta || deltaY < -restDelta;
      const currentX = isMovingX ? targetX + deltaX : targetX;
      const currentY = isMovingY ? targetY + deltaY : targetY;

  // console.log(`momentum update ---------------------
  //   fromX: ${from.x},
  //   fromY: ${from.y},
  //   targetX: ${targetX},
  //   targetY: ${targetY},
  // `);

      emitter.emit('momentum.all', {
        deltaX: currentX,
        deltaY: currentY,
      });
      switch (direction) {
        case 'up':
        case 'down':
          emitter.emit(`momentum.y.${direction}`, { delta: currentY });
          break;

        case 'left':
        case 'right':
          emitter.emit(`momentum.x.${direction}`, { delta: currentX });
          break;
      }

      // Loop back, or complete the momentum cycle:
      if (isMovingX || isMovingY) {
        update();
      } else {
        console.log('stopping!');
        emitter.emit('momentum.end', { });
      }
    });
  }

  return {
    start: update,
    stop: () => isMoving = false,
  }
};


export default momentum;
