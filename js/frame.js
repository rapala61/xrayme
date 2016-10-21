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
