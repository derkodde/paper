var currSlide = '';
var currStack = "firstStack";
var currMenu = [];


jQuery(document).ready(function() {

  initFullpageJs();
	ajaxLoadContent();
	loadMenuJson();

  $('#pagenav .handle i.page-settings').on('click', function() {
		initJQueryUi()// JQUERYUI ----- Menu
		toggleMenu();
  });

});
