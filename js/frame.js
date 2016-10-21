class Frame {
  constructor(selector) {
    this.$el = $(selector);
    this.centerOffset = this.getCenterOffset();
  }

  getCenterOffset() {
    const center = {};
    center.y = this.$el.outerHeight(true) / 2;
    center.x = this.$el.outerWidth(true) / 2;
    return center;
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
    const newX = `${x - this.centerOffset.x}px`;
    const newY = `${y - this.centerOffset.y}px`;
    // console.log(newY, newY);
    this.$el.css({
      top: newY,
      left: newX
    });
  }

  getEl() {
    return this.$el;
  }
}
