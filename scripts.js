$(function() {
  console.log('hi');

  var frameOffsetY = $('#frame').outerHeight() / 2;
  var frameOffsetX = $('#frame').outerWidth() / 2;

  $(document).on('mousemove', function(e) {
    var xPos = (e.clientX - frameOffsetX) + 'px';
    var yPos = (e.clientY - frameOffsetY) + 'px';
    var scrollOffset = $(window).scrollTop();
    var offset = $('#me').offset();


    $('#frame').css({
      top: yPos,
      left: xPos
    })

    var frameX = (e.clientX - frameOffsetX - offset.left) > 0 ? '-' + (e.clientX - frameOffsetX - offset.left) + 'px' : ((e.clientX - frameOffsetX - offset.left) * -1) + 'px';
    var frameY = (e.clientY - frameOffsetY + scrollOffset - offset.top) > 0 ? '-' + (e.clientY - frameOffsetY + scrollOffset - offset.top) + 'px' : ((e.clientY - frameOffsetY + scrollOffset - offset.top) * -1) + 'px';

    if (isInsideEl($('#me'), e.clientX - frameOffsetX, e.clientY - frameOffsetY) || isInsideEl($('#me'), e.clientX + frameOffsetX, e.clientY + frameOffsetY)) {
      console.log('inside');

      // console.log(e.clientX, e.clientY);
      // console.log('url("images/me-rx.png") ' + frameX + ' '+ frameY + ' / 300px 400px');

      console.log(frameX,frameY );

      $('#frame').css({
        'background': 'url("images/me-rx.png") ' + frameX + ' ' + frameY + ' / 300px 400px',
        'background-repeat': 'no-repeat'
      })


    }else {
      $('#frame')
        // .attr('style', '')
        .css({
          'background': ''
        })
    }
  });



});

function isInsideEl(el, x, y) {
  var offset = el.offset();
  var scrollOffset = $(window).scrollTop();
  var maxWidth = offset.left + el.outerWidth();
  var maxHeight = offset.top + el.outerHeight();
  var validX = false;
  var validY = false;
  var _y = y + scrollOffset;

  if (x >= offset.left && x <= maxWidth) {
    validX = true;
  }

  if (_y >= offset.top && _y <= maxHeight) {
    validY = true;
  }

  return validX && validY
}
