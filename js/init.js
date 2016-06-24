
//==============
// init plugins
//==============
function initJQueryUi(){
	$('#firstStack-menu, #menu_archive').sortable({
		connectWith: "ul",
		axis: 'y',
		revert: true,
		update: function(event, ui) {
			var sortedIDs = $("#firstStack-menu").sortable("toArray");
			writeMenuJson(sortedIDs)
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
				var pattern = /mce-edit-focus/;
				var exists = pattern.test(wasMce)
				if(exists) {
					$('.fp-slidesNav').show();
				}
			}
	  }
	});
}
