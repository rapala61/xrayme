class Xray extends Effect {
  constructor(frame, picture, picUrl) {
    super(frame, picture);
    this.picUrl = picUrl;
    this.name = 'xray';
  }

  update(mouseX, mouseY) {
    this.frame.syncWithCoords(mouseX, mouseY);
    const bgPosition = this.getBackgroundPosition(mouseX, mouseY);
    const isInsidePic = this.isFrameOverPic(mouseX, mouseY);

    if (isInsidePic) {
      this.updateFrameBGPosition(bgPosition.x, bgPosition.y);
    } else {
      this.frame.getEl().css({
        background: ''
      });
    }
  }

  isPointOverPic(mouseX, mouseY) {
    const offset = this.picture.getOffset();
    const scrollOffset = $(window).scrollTop();
    const maxWidth = offset.left + this.picture.getEl().outerWidth();
    const maxHeight = offset.top + this.picture.getEl().outerHeight();
    let validX = false;
    let validY = false;
    const yPlus = mouseY + scrollOffset;

    if (mouseX >= offset.left && mouseX <= maxWidth) {
      validX = true;
    }

    if (yPlus >= offset.top && yPlus <= maxHeight) {
      validY = true;
    }
    return validX && validY;
  }

  isFrameOverPic(mouseX, mouseY) {
    const centerOffset = this.frame.getCenterOffset();
    const corners = [
      { x: mouseX - centerOffset.x, y: mouseY - centerOffset.y },
      { x: mouseX + centerOffset.x, y: mouseY - centerOffset.y },
      { x: mouseX - centerOffset.x, y: mouseY + centerOffset.y },
      { x: mouseX + centerOffset.x, y: mouseY + centerOffset.y }
    ];

    let results = 0;
    for (let i = 0; i < corners.length; i += 1) {
      if (this.isPointOverPic(corners[i].x, corners[i].y)) {
        results += 1;
      }
    }

    return !!results;
  }

  getBackgroundPosition(mouseX, mouseY) {
    const scrollTop = $(window).scrollTop();
    let xPos = mouseX - this.frame.getCenterOffset().x - this.picture.getOffset().left;
    let yPos = mouseY - this.frame.getCenterOffset().y - this.picture.getOffset().top + scrollTop;

    // Make sure that the backgroiund position fits the movement as
    // the mouse moves.
    if (xPos > 0) {
      xPos = `-${xPos}px`;
    } else {
      xPos = `${xPos * -1}px`;
    }

    if (yPos > 0) {
      yPos = `-${yPos}px`;
    } else {
      yPos = `${yPos * -1}px`;
    }

    return { x: xPos, y: yPos };
  }

  updateFrameBGPosition(xPos, yPos) {
    this.frame.getEl().css({
      background: `url(${this.picUrl}) ${xPos} ${yPos} / 300px 400px`,
      'background-repeat': 'no-repeat'
    });
  }
}
