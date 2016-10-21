/* global document, window, _ */

const frame = new Frame('#frame');
const pic = new Picture('#me');
const xray = new Xray(frame, pic, 'images/me-rx.png');

const onMouseMove = _.throttle((e) => {
  xray.update(e.clientX, e.clientY);
}, 10);
$(document).on('mousemove', onMouseMove);
