


/*
* shows a fa-save Icon when Ajax saving
*	called, when the content of a slide or the menu is updated
*/
function showSaveSymbol(){
	$('i.fa-save').toggle();
	$('i.fa-save').fadeOut(600);
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
    var menu =  mergeIdsAndNames(sortedIDs);
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
*
*
*/
function mergeIdsAndNames(sortedIDs) {
    var menuOrder = {};
    $.each(sortedIDs, function(key, value) {
        menuOrder[key] = { 'id' :  value, 'title' :  getMenuTitle(value)} ;
    });
    return menuOrder
}

function getMenuTitle(id) {
    return $("#sortable1 #"+id ).text();
}

function loadMenuJson() {
    $.getJSON( "/paper/menu.json", function( data ) {

    stackname = 'firstStack';
    var items = [];
      $.each( data, function( key, val ) {
        //  console.log(val);
        items.push( '<li id="1_' + key + '" class="ui-state-default">' + val.title + '</li>' );
      });
      $('.ajax-stack').html('<h3><a href="/paper/stack#' + stackname + '">' + stackname + '</a></h3><ul id="sortable1" class="menu droptrue">' + items.join( "" ) + '</ul>');
    });
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
*
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
           success: function(data)
           {
						showSaveSymbol();

  				 console.log("Successfully send data of " + currPage + ".");

           }
         });
}

function getContentPath(){
    url      = window.location.href;
    var array = url.split('/');
    var currPage = array[array.length-1];

    if (currPage == ('stack#' + currStack)) {
        $("#sortable1 li").each(function( index ) {
            currMenu.push($(this).text());
        });

        // console.log( currMenu[0]);
        currPage= currMenu[0];
    }

    // console.log(currPage);
    var currContentPath = '/paper/content/'+ currPage + '.html';
    // console.log(currContentPath);
    return currContentPath;
}
function getCurrPage() {
    url      = window.location.href;
    var array = url.split('/');
    var currPage = array[array.length-1];

    if (currPage == ('stack#' + currStack)) {
        $("#sortable1 li").each(function( index ) {
            currMenu.push($(this).text());
            // currPage = currMenu[0];
        });

        // console.log( currMenu[0]);
        currPage= currMenu[0];
    }
    return currPage;
}
//==============
// init plugins
//==============
function initJQueryUi(){
	$('')
	$("ul.droptrue").sortable({
		connectWith: "ul"
	});
	// --------------sortierung bei Aufrufend der Seite----------
	$('#sortable1').sortable({
		create: function(event, ui) {
			// var sortedIDs = $( "#sortable1" ).sortable( "serialize", { key:"sort"} );
			var sortedIDs = $("#sortable1").sortable("toArray");
			//   console.log(mergeIdsAndNames(sortedIDs));
			console.log('created sortable');
		}
	});
	$('#sortable1').sortable({
		axis: 'y',
		update: function(event, ui) {
			// var sortedIDs = $( "#sortable1" ).sortable( "serialize", { key:'sort'} );
			// $('.array').text(sortedIDs); //print to page

			var sortedIDs = $("#sortable1").sortable("toArray"); //
			// console.log(mergeIdsAndNames(sortedIDs)); //object
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
        toolbar:  'undo redo | fontselect styleselect | bullist numlist  | outdent indent  | hr codesample link unlink image |',
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
