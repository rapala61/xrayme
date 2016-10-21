class Picture {
  constructor(selector) {
    this.$el = $(selector);
  }

  getOffset() {
    return this.$el.offset();
  }

  getEl() {
    return this.$el;
  }
}
