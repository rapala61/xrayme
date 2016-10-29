/* global document, window, _, Frame, Picture, Xray */

const frame = new Frame('#frame');
const picture = new Picture('#me');
const xray = new Xray(frame, picture, {
  xrayPicUrl: 'images/me-rx.png'
});

// Github Ribbon
const githubRibbon = (e) => {
  const ribbonImg = $('.gh-ribbon');
  const ghRibbonOffset = ribbonImg.offset();
  const ghRibbonHeight = ribbonImg.outerHeight() + ghRibbonOffset.top;
  const frameCenter = frame.getFrameCenterOffsets();
  const rightCornerX = e.clientX + frameCenter.x;
  const rightCornerY = e.clientY - frameCenter.y;
  let active = false;

  if (rightCornerX > ghRibbonOffset.left && rightCornerY < ghRibbonHeight) {
    active = true;
    frame.updateCss({
      display: 'none'
    });
  } else {
    frame.updateCss({
      display: 'block'
    });
  }
  return active;
};

const onTouch = (e) => {
  const touchCoords = e.originalEvent.touches[0];
  xray.update(touchCoords.clientX, touchCoords.clientY);
};

const onMouseMove = _.throttle((e) => {
  const activeGithubRibbon = githubRibbon(e);
  if (!activeGithubRibbon) {
    xray.update(e.clientX, e.clientY);
  }
}, 10);

if (window.isMobile) {
  $(document).on('touchstart', onTouch);
} else {
  $(document).on('mousemove', onMouseMove);
}
