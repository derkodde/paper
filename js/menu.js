

/*
* toggleMenu is called, when the menu icon is clicked and handles the fading of the menu & slides and of the icons.
*	it calls the ajaxLoadContent() when the menu is left to load the content in the new order of the menu.
*/
function toggleMenu(){

	if ($('.settings-container').hasClass('opened')){
		ajaxLoadContent();
	} else {
		var vhWithoutNav =  $( document ).height() - 41;
		$('.settings-container').css('height', vhWithoutNav +'px' );
	}

	// change CSS class of the menu
	$('.settings-container').toggleClass('opened');

	// toggle the Content
	$('.settings-container').fadeToggle();
	$('.slide').fadeToggle();

	// toggle the icons
	$('.fp-slidesNav').fadeToggle();
	$('.handle i.fa-ellipsis-v').toggle();
	$('i.fa-close').toggleClass('inline-block');
}



/*
*	adds an entry in the menu and a content file
*
*/
function addPaper(event){
		//add li to archive

	var element = $('.menu.archive input[name=paper-name]');
	var forminput = element.val();
	var n_items = $("#firstStack-menu li").length;

  var newItem = $('<li id="sortable_1_' + (n_items+1) + '" class="ui-state-default ui-sortable-handle"></li>').text(forminput);

	element.submit(function(e) {
    e.preventDefault();
	});

	if (validateAddPaper(forminput, element) === true ) {
		$('.settings-container ul#menu_archive').append(newItem);
		$('.menu.archive input[name=paper-name]').val(null).attr('placeholder', 'add another paper?');
		addMenuAndFile(inputToFilename(forminput));
		forminput = null;
		initJQueryUi();
	}

}


/*
* validates the input of the form
*
* returns a boolean
*/
function validateAddPaper(forminput, element){

	if (forminput == null || forminput == "") { // not empty
		element.css({'outline' : 'red auto 5px'}).attr('placeholder', 'feed me letters! argh!');
		return false;
	}
	// else if () { // checks if the name is already in use
	//
	// }
	// else if () { // check if the name is usable as filename
	//
	// }
	else {
			element.css({'outline' : 'initial'});
		return true;
	}

}

/*
* processes the name to a unique Filename
*
*
*/
function inputToFilename(forminput){

	return forminput
}
/*
* adds a menu entry and a file with the same name in Content folder
* return string in lowercase, with no spaces or special chars
*/
function addMenuAndFile(forminput){
	writeMenuJson();
	showSaveSymbol();
}



/*
*	displays the menu.  Only loaded on pageload!
*
*/
function loadMenuJson() {
	$.getJSON( "/paper/menu.json", function( data ) {

		stackname = 'firstStack';

		if (menuJsonIsEmpty == 1) {
			data =  contentfiles;
			// console.log(data);
		}
		var items = [];

		$.each( data, function( key, val ) {
			//  console.log(val);
			items.push( '<li id="sortable_1_' + key + '" class="ui-state-default ui-sortable-handle">' + val.title + '</li>' );
		});

		$('.ajax-stack').html('<h3 class="text-center"><h3>' + stackname + '</a></h3><ul id="firstStack-menu" class="menu droptrue">' + items.join( "" ) + '</ul>');

		initJQueryUi();
  });
}


/*
*	writeMenuJson() ajax saves the current position of the menu items to a json file
*
*/
function writeMenuJson(sortedIDs) {
		//merge ids from jQueryUI with names

		var menu = {};
		$.each(sortedIDs, function(key, value) {
				menu[key] = { 'id' :  value, 'title' :  $("#firstStack-menu #"+ value ).text() } ;
		});


    //  jQuery to write to file
    $.ajax({
        type : "POST",
        url : "/paper/controller/menu-json.php",
        data : { json : JSON.stringify(menu) },
        success : function(result){
					showSaveSymbol();
					var menuWritten = true;
            },
        error : function(exeption){
            console.log('error');
					}
    });
    // console.log(JSON.stringify(menu));
}
