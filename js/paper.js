var currSlide = '';
var currStack = "firstStack";
var currMenu = [];


jQuery(document).ready(function() {

  initFullpageJs();
	ajaxLoadContent();

  $('#pagenav .handle i.page-settings').on('click', function() {
		loadMenuJson();
		toggleMenu();
		// JQUERYUI ----- Menu
  });

});
