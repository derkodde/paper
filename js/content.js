


/*
* shows a fa-save Icon when Ajax saving
* called, when the content of a slide or the menu is updated
*/
function showSaveSymbol() {
	$('i.fa-save').toggle();
	$('i.fa-save').delay(1200).fadeOut(300);
}


/*
* gets the path of the current slide
*	used for saving MCE content
*/
function getContentPath(){
    return '/paper/content/' + $(".slide.active > h1").text() + '.html';
}


/*
*	writes the (new) Content to the Content/*.html file of the currently changed paper when tinymce detects a change.
*
*/
function writeContent (currContent){
//     console.log("speicher");
    // var currPage = getCurrPage();
    var currTargetPage = getContentPath();
		console.log(currTargetPage);
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
