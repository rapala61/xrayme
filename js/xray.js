/* global window, Xray, Effect */

/**
 * Xray - Reveals a second image in the frame as
 *        the use hovers over the picture.
 * @extends Effect
 */
class Xray extends Effect {

  /**
   * constructor - Description
   *
   * @param {class}   frame       The frame instance
   * @param {class}   picture     The picture instance
   * @param {object} [options={}] xrayPicUrl
   */
  constructor(frame, picture, options = {}) {
    super(frame, picture);
    this.name = 'xray';
    this.opts = {
      xrayPicUrl: options.xrayPicUrl || ''
    };
  }


  /**
   * update - It moves the frame to the (x,y) coordinates of the pointer.
   *          It also checks if there is collition and updates the frame's
   *          background picture and position.
   *
   * @param {number} mouseX
   * @param {number} mouseY
   *
   */
  update(mouseX, mouseY) {
    /**
     * We must move the frame to the new pointer position, offsetted by frames center offsets
     */
    const y = mouseY - this.frame.frameCenterOffsets.y;
    const x = mouseX - this.frame.frameCenterOffsets.x;

    // move the frame to x, y coordinates
    this.frame.moveTo(x, y);
    const colliding = this.detectFrameCollition();

    if (colliding) {
      const xrayBGCoords = this.getXrayBGCoords(mouseX, mouseY);
      this.updateFrameBGPosition(xrayBGCoords.x, xrayBGCoords.y);
    } else {
      this.frame.getEl().css({
        background: ''
      });
    }
  }


  /**
   * isPointOverPic - Checks and specific (x,y) for collition with the picture.
   *
   * @param {number} mouseX
   * @param {number} mouseY
   *
   * @returns {boolean} True if both (x,y) are colliding
   */
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


  /**
   * detectFrameCollition - Gets all 4 corners of the frame and detects if any
   *                        of them has collided
   *
   * @returns {boolean} True if any corner has collided
   */
  detectFrameCollition() {
    const corners = this.frame.getCorners();

    let numOfCollitions = 0;
    for (let i = 0; i < corners.length; i += 1) {
      if (this.isPointOverPic(corners[i].x, corners[i].y)) {
        numOfCollitions += 1;
      }
    }

    return !!numOfCollitions;
  }

  /**
   * getXrayBGCoords - Computes the x position and the y position of the
   *                   background image that will be shown in the frame
   *
   * @param {number} mouseX
   * @param {number} mouseY
   *
   * @returns {Object} The object with the x and y position coordinates
   *                   of the background image
   */
  getXrayBGCoords(mouseX, mouseY) {
    const scrollTop = $(window).scrollTop();
    const frameCenterOffsetX = this.frame.getFrameCenterOffsets().x;
    const frameCenterOffsetY = this.frame.getFrameCenterOffsets().y;
    const picX = this.picture.getOffset().left;
    const picY = this.picture.getOffset().top;
    const borderOffset = parseInt(this.frame.getEl().css('borderWidth'), 10);
    let xPos = (mouseX - frameCenterOffsetX - picX) + borderOffset;
    let yPos = (mouseY - frameCenterOffsetY - picY) + scrollTop + borderOffset;

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


  /**
   * updateFrameBGPosition - Updates the frame's background image with the
   *                         provided x and y coordinates.
   *
   * @param {number} xPos
   * @param {number} yPos
   *
   * @returns {object} The frames jQuery element
   */
  updateFrameBGPosition(xPos, yPos) {
    return this.frame.updateCss({
      background: `url(${this.opts.xrayPicUrl}) ${xPos} ${yPos} /
        ${this.picture.getEl().outerWidth()}px ${this.picture.getEl().outerHeight()}px`,
      'background-repeat': 'no-repeat'
    });
  }
}
