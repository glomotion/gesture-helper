import { currentTime, currentFrameTime, onFrameUpdate } from 'framesync';

const frame = ({ update }) => {
  let isActive = true;

  const nextFrame = () => {
    if (!isActive) return;
    update();
    onFrameUpdate(nextFrame);
  };

  onFrameUpdate(nextFrame);

  return {
    stop: () => isActive = false;
  };
});

export default frame;
