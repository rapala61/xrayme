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
  const frameCenter = frame.getFrameCenter();
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

const onMouseMove = _.throttle((e) => {
  const activeGithubRibbon = githubRibbon(e);
  if (!activeGithubRibbon) {
    xray.update(e.clientX, e.clientY);
  }
}, 10);


$(document).on('mousemove', onMouseMove);
