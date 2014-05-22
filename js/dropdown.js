+function (e) {
  'use strict';

  function dismissDropdown(e) {
    e.preventDefault()
    var $dropdown = $(e.target).parents('.dropdown')
    $dropdown.removeClass('dropdown--open')
  }

  function openDropdown(e) {
    e.preventDefault()
    var $dropdown = $(e.target).parents('.dropdown')
    $dropdown.addClass('dropdown--open')
  }

  function toggleDropdown(e) {
    e.preventDefault()
    var $dropdown = $(e.target).parents('.dropdown')

    if ($dropdown.hasClass('dropdown--open')) {
      dismissDropdown(e)
    } else {
      openDropdown(e)
    }
  }

  var timer;

  $('[data-toggle="dropdown"]').on('click', toggleDropdown)
  $('[data-dismiss="dropdown"]').on('click', dismissDropdown)
  $('.filter [data-toggle="dropdown"]').on({
    'mouseenter': function(e) {
      // wait for .1 sec
      // toggle if not opened
      // else do nothing
      timer = setTimeout(
        function() {
          openDropdown(e)
        }, 100
      )
    },
    'mouseout': function(e) {
      clearTimeout(timer)
    }

  })

}(jQuery);
