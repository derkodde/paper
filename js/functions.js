//=================
//Ajax Load content
//=================
function ajaxLoadContent (){
	$('.main-content').load("/paper/controller/ajax-load-content.php", function(){
			console.log("Ajax Content refreshed!");
			initFullpageJs();
	});
}



// Menu
//==========================================

// abhängig: mergeIdsAndNames()
function writeMenuJson(sortedIDs) {
    var menu =  mergeIdsAndNames(sortedIDs);
    //  jQuery to write to file
    $.ajax({
        type : "POST",
        url : "/paper/controller/menu-json.php",
        data : { json : JSON.stringify(menu) },
        success : function(result){
            console.log('AJAX successfully called!!');

            },
        error : function(exeption){
            console.log('error');
            }

    });
    // console.log(JSON.stringify(menu));
}
//abhängig: sortedIDs
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



//  Content
//==========================================
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
        // contextmenu: "link image inserttable formats bullist numlist",
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
            }
    });
}
