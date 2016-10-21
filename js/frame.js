/**
 * Encapsulates state and features specific to the frame element in the page
 * The frame is synchronizable based on (x, y) coordinates.
 */
class Frame {
  constructor(selector) {
    this.$el = $(selector);
    this.frameCenter = this.getFrameCenter();
  }

  /**
   * getFrameCenter
   *
   * @returns {type} Description
   */
  getFrameCenter() {
    const center = {};
    center.y = this.$el.outerHeight(true) / 2;
    center.x = this.$el.outerWidth(true) / 2;
    return center;
  }

  getCursorOffset(mouseX, mouseY) {
    const cursorOffset = {};
    cursorOffset.x = mouseX - this.frameCenter.x;
    cursorOffset.y = mouseY - this.frameCenter.y;
    return cursorOffset;
  }

  getCorners() {
    const offset = this.$el.offset();
    const corners = [
      { x: offset.left,
        y: offset.top },
      { x: offset.left + this.$el.outerWidth(true),
        y: offset.top },
      { x: offset.left,
        y: offset.top + this.$el.outerHeight(true) },
      { x: offset.left + this.$el.outerWidth(true),
        y: offset.top + this.$el.outerHeight(true) }
    ];
    return corners;
  }

  syncWithCoords(x, y) {
    const cursorOffset = this.getCursorOffset(x, y);
    return this.updateCss({
      top: cursorOffset.y,
      left: cursorOffset.x
    });
  }

  updateCss(options) {
    return this.$el.css(options || {});
  }

  getEl() {
    return this.$el;
  }
}
