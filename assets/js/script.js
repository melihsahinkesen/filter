// External js: jquery, isotope.pkgd.js, bootstrap.min.js
$(document).ready( function() {

  // Create object to store filter for each group
  var buttonFilters = {};
  var buttonFilter = '*';
  // Create new object for the range filters and set default values
  // The default values should correspond to the default values from the slider

  // Initialise Isotope
  // Set the item selector
  var $grid = $('.grid').isotope({
    itemSelector: '.item',
    layout: 'masonry',
    // use filter function
    filter: function() {
      var $this = $(this);
      return $this.is( buttonFilter );
    }
  });

  // Look inside element with .filters class for any clicks on elements with .btn
  $('.filters').on( 'click', '.btn', function() {

    var $this = $(this);
    // Get group key from parent btn-group (e.g. data-filter-group="color")
    var $buttonGroup = $this.parents('.btn-group');
    var filterGroup = $buttonGroup.attr('data-filter-group');
    // set filter for group
    buttonFilters[ filterGroup ] = $this.attr('data-filter');
    // Combine filters or set the value to * if buttonFilters
    buttonFilter = concatValues( buttonFilters ) || '*';
    // Log out current filter to check that it's working when clicked
    console.log( buttonFilter )
    // Trigger isotope again to refresh layout
    $grid.isotope();
  });

  // change checked class on btn-filter to toggle which one is active
  $('.btn-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', '.btn-filter', function() {
          $buttonGroup.find('.checked').removeClass('checked');
          $(this).addClass('checked');
      });
  });
});

// Flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}