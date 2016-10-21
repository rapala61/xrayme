/* global document, _, Frame, Picture, Xray */

const frame = new Frame('#frame');
const picture = new Picture('#me');
const xray = new Xray(frame, picture, 'images/me-rx.png');

const onMouseMove = _.throttle((e) => {
  xray.update(e.clientX, e.clientY);
}, 10);
$(document).on('mousemove', onMouseMove);
