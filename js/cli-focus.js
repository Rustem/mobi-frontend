+function (e) {
  'use strict';

  function toggleFocus(e) {
    $(this)
      .parents('ul')
      .find('.li--focus').removeClass('li--focus')
    $(this).addClass('li--focus')
  }

  $('.js-list-focus').on('mouseenter', toggleFocus)

}(jQuery);
