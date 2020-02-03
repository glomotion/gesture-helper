import EventEmitter2 from 'eventemitter2';

const ee = new EventEmitter2({
  wildcard: true,
});

export default ee;
