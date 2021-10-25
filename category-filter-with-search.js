// document ready wrapper
$(document).ready( function() {

  // find all filter buttons
  const filterToggles = document.querySelectorAll('[data-filter]');

  // go over each filter button
  filterToggles.forEach(function(toggle) {
    
    let attrVal = toggle.getAttribute(['data-filter']); // find the filter attr
    let newVal = attrVal.toLowerCase().replace(' ', '-'); // hyphenate filter attr val
    toggle.setAttribute('data-filter', newVal); // set filter attr with new val
    
  });

  // go over all collection item category label elems
  $('.w-dyn-item .category').each(function(index, element) {
  		var _this = $( element );
      // lowercase, hyphenate and add as a class to dyn-item for isotope filtering
  		_this.parent().parent().addClass( _this.text().toLowerCase().replace(' ', '-'));
  });


  // quick search regex
  let qsRegex;
  let buttonFilter;

  // init Isotope
  const $grid = $('.grid').isotope({
      itemSelector: '.w-dyn-item',
      stagger: 30,
  		filter: function() {
      	var $this = $(this);
      	var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
      	var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
      	return searchResult && buttonResult;
    	}
  });

  // reveal all items after init
  const $items = $grid.find('.w-dyn-item');
  $grid.addClass('is-showing-items').isotope( 'revealItemElements', $items );

  $('#filters').on('click', 'button', function() {
      buttonFilter = $( this ).attr('data-filter');
      $grid.isotope();
  });

  // use value of search field to filter
  const $quicksearch = $('#quicksearch').keyup(debounce(function() {
    qsRegex = new RegExp($quicksearch.val(),'gi');
    $grid.isotope();
  }));

  // change is-checked class on buttons
  $('.button-group').each(function( i, buttonGroup ) {
    const $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });


  // debounce so filtering doesn't happen every millisecond
  function debounce(fn, threshold) {
      let timeout;
      return function debounced() {
        if ( timeout ) {
          clearTimeout( timeout );
        }
        function delayed() {
          fn();
          timeout = null;
        }
        setTimeout( delayed, threshold || 100 );
      };
  };


  // disable search from submitting
  $('#quicksearch').on('keyup keypress', function(e) {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      return false;
    }
  });

});
