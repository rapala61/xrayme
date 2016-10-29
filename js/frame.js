/**
 * Encapsulates state and features specific to the frame element in the page
 * The frame is synchronizable based on (x, y) coordinates.
 */
class Frame {
  constructor(selector) {
    this.$el = $(selector);
    this.frameCenterOffsets = this.getFrameCenterOffsets();
  }

  /**
   * getFrameCenterOffsets
   * Gets the necessary offset in pixels to get the middle point of the frame.
   *
   * @returns {object} an object with x and y properties.
   */
  getFrameCenterOffsets() {
    return {
      // pass true as argument of outerHeight and outerWidth to include margins
      y: this.$el.outerHeight(true) / 2,
      x: this.$el.outerWidth(true) / 2
    };
  }


  /**
   * getCorners - Calculates the x,y coordinates of the 4 corners of the frame
   *              at its current position.
   *
   * @returns {Array} Array of coordinate objects
   */
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


  /**
   * moveTo - moves the Frame to the given coordinates
   *
   * @param {Number} X coordinate
   * @param {Number} Y coordinate
   *
   * @returns {type} Description
   */
  moveTo(x, y) {
    return this.updateCss({
      top: y,
      left: x
    });
  }


  /**
   * updateCss - Updates the CSS of the frame with the passed object of CSS properties
   *
   * @param {Object} options CSS properties to be applied to the frame
   *
   * @returns {Object} The frame's jQuery object
   */
  updateCss(options) {
    return this.$el.css(options || {});
  }


  /**
   * getEl - Gets the frame element
   *
   * @returns {Object} The frame's jQuery element
   */
  getEl() {
    return this.$el;
  }
}
