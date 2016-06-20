/*
* shows a fa-save Icon when Ajax saving
*	called, when the content of a slide or the menu is updated
*/
function showSaveSymbol(){
	$('i.fa-save').toggle();
	$('i.fa-save').fadeOut(600);
}

/*
* gets the path of the current slide
*	used for saving MCE content
*/
function getContentPath(){
		currPage = getCurrPage();
    var currContentPath = '/paper/content/'+ currPage + '.html';
    return currContentPath;
}


/*
*	gets the name of the current page with the current URL.
*	uses the current menu to get the name of the first item
*	needs the current Stack
*/
function getCurrPage() {
    url      = window.location.href;
    var array = url.split('/');
    var currPage = array[array.length-1];

		//fullpage.js gives no URL parameter for the first slide of a stack
    if (currPage == ('stack#' + currStack)) {
        $("#sortable1 li").each(function( index ) {
            currMenu.push($(this).text());
            // currPage = currMenu[0];
        });
      	urrPage= currMenu[0];
    }

    return currPage;
}

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
*	writeMenuJson() ajax saves the current position of the menu items to a json file
*
*/
function writeMenuJson(sortedIDs) {
		//merge ids from jQueryUI with names
		var menu = {};
		$.each(sortedIDs, function(key, value) {
				menu[key] = { 'id' :  value, 'title' :  $("#sortable1 #"+ value ).text() } ;
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

/*
*	displays the menu.  Only loaded on pageload!
*
*/
function loadMenuJson() {
    $.getJSON( "/paper/menu.json", function( data ) {

    stackname = 'firstStack';
    var items = [];
      $.each( data, function( key, val ) {
        //  console.log(val);
        items.push( '<li id="1_' + key + '" class="ui-state-default">' + val.title + '</li>' );
      });
      $('.ajax-stack').html('<h3 class="text-center"><a href="/paper/stack#' + stackname + '">' + stackname + '</a></h3><ul id="sortable1" class="menu droptrue">' + items.join( "" ) + '</ul>');
    });
}

/*
*	adds an entry in the menu and a content file
*
*/
function addPaper(){
		//add li to archive
    var newSlide = $('<li></li>').text($('.menu.archive input[name=paper-name]').val());
		$('.menu.archive').on('click', function(event){
			event.preventDefault();
		});
		$('.settings-container ul#menu_archive').append(newSlide);



}

/*
* ajaxLoadContent() Ajax-loads the whole Page content.
* fullpage.js and attrchange.js must be re-instanciated.
* It is called after closing the menu.
*/
function ajaxLoadContent (){
		showSaveSymbol();
		var stack ="firstStack";
	$('.section').load("/paper/controller/ajax-load-content.php", function(){ //section muss mit der Stack Klasse ersetzt erden
		$.fn.fullpage.destroy('all');
			initFullpageJs();
			initAttrchangeOnMce();
	});
}
/*
*	writes the (new) Content to the Content/*.html file of the currently changed paper when tinymce detects a change.
*
*/
function writeContent (currContent){
//     console.log("speicher");
    var currPage = getCurrPage();
    var currTargetPage = getContentPath();
    var currContent = currContent;
    var contentHandlerUrl = "/paper/controller/ajax-submit-content.php"; // the script where you handle the form input.

    var data = {
      currPage : currTargetPage,
      content : currContent
    };
//     console.log(data);
    $.ajax({
			type: "POST",
			url: contentHandlerUrl,
			data: data, // serializes the form's elements.
			success: function(data)	{
				showSaveSymbol();
				// console.log("Successfully send data of " + currPage + ".");
			}
   });
}


//==============
// init plugins
//==============
function initJQueryUi(){
	$('')
	$("ul.droptrue").sortable({
		connectWith: "ul"
	});

	$('#sortable1').sortable({
		axis: 'y',
		revert: true,
		update: function(event, ui) {
			var sortedIDs = $("#sortable1").sortable("toArray"); //
			writeMenuJson(sortedIDs);
		}
	});
}

function initFullpageJs(){
	$('#fullpage').fullpage({
			normalScrollElements: '.scrollable , nav.pagenav, .mceContentBody,  .settings-container.opened',
			scrollOverflow: true,
			fixedElements: 'nav#pagenav, .settings-container.opened',
			slidesNavigation: true,
			slidesNavPosition: 'bottom',
			keyboardScrolling: false,
			controlArrows: false,
			verticalCentered: false,
			fitToSection: true,
			recordHistory: false,
			fixed_toolbar_container: ".formtarget",
			anchors:['firstStack', 'secondStack', 'thirdStack'],
			afterRender: function(){
					tinymceInit();
					initAttrchangeOnMce();
			},
			afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
				 var loadedSection = $(this);
				 currSlide = slideAnchor;

				 //    console.log(currSlide);
				 }
	});
}
function tinymceInit(){
    tinymce.init({
        selector: 'article.scrollable',
        plugins: 'code advlist autolink link tabfocus contextmenu autoresize codesample hr charmap image',
        contextmenu: "formats",
        toolbar:  'undo redo | styleselect | bullist numlist  | outdent indent  | hr codesample link unlink image |',
				// toolbar: false,
        skin: 'white',
        tabfocus_elements: ":prev,:next",
        body_class: 'mce',
        content_css : '/paper/css/main.css',
        // height: 450,
        statusbar: true,
        inline: true,
        setup : function(ed) {
                  ed.on('change', function(e) {
                    var currContent = ed.getContent();
										writeContent (currContent);
									});
									ed.on('click', function(e) {
										$('.fp-slidesNav').fadeOut();
									});
            }
    });
}
function initAttrchangeOnMce(){
	$('article').attrchange({
	  trackValues: true,
	  callback: function (event) {
			if (event.attributeName === 'class'){
				var wasMce =  event.oldValue;
				console.log(wasMce);
				var pattern = /mce-edit-focus/;
				var exists = pattern.test(wasMce)
				if(exists) {

					$('.fp-slidesNav').show();
				}
			}
	  }
	});
}
