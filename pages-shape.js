window.PagesShape = function() {
  this.advance = _.bind(this.advance, this);
  this.onready = _.bind(this.onready, this);
  this.ondata = _.bind(this.ondata, this);
}

PagesShape.prototype = {
  advance: function() {
    if (this.current >= this.lines.length) {
      $('.about').fadeIn(1000);
    }

    $('<div>').appendTo(this.el).css({
      backgroundColor: 'green',
      height: '1px',
      width: this.lines[this.current].length + 'px'
    });
    this.current += 1;
    setTimeout(this.advance, 0);
  },
  ondata: function(text) {
    this.lines = text.split("\n");
    this.current = 0;
    this.el = $('.chart');
    setTimeout(this.advance, 0);
  },
  onready: function() {
    $.ajax({
      dataType: 'text',
      success: this.ondata,
      url: 'pages.json'
    });
  }
};

window.pagesShape = new PagesShape();
$(document).ready(pagesShape.onready);
