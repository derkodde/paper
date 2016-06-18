var currSlide = '';
var currStack = "firstStack";
var currMenu = [];


jQuery(document).ready(function() {

  initFullpageJs();
  loadMenuJson();

  $('#pagenav .handle i.page-settings').on('click', function() {
	   initJQueryUi()// JQUERYUI ----- Menu
		 toggleMenu();
  });

	

	$('article').attrchange({
	  trackValues: true,
	  callback: function (event) {
			if (event.attributeName === 'class'){
				var wasMce =  event.oldValue;
				var pattern = /mce-edit-focus/;
				var exists = pattern.test(wasMce)
				if(exists) {

					$('.fp-slidesNav').show();
				}
			}

	  }
	});

});
