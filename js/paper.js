var currSlide = '';
var currStack = "firstStack";
var currMenu = [];


jQuery(document).ready(function() {

  initFullpageJs();
  loadMenuJson();



  $('.page-settings.handle').on('click', function() {

    // JQUERYUI ----- Menu
    //===================================

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
        $("ul.droptrue").sortable({
          connectWith: "ul"
        });
      }
    });
    // -----------------sortierungspeichern nach sortieren -------------------

  });

  //  ajax load mce editor for the current page on edit button click

  $('.mce-edit-focus, #content-settings .handle i.fa-close').on('click', function() {
    // this is the id of the form
    writeContent();
    $('.fp-slidesNav').show('slow');
    $('#page-settings .handle').show('slow');

  });


  // open edit field
  $('.handle.page-settings').on('click', function() {
    //andere Handle ausblenden
    $('.fp-slidesNav').fadeToggle('slow');
    $(' .handle').not(this).each(function() {
      $(this).hide();
    });

    // dem Elternelement die klasse geben
    $('.settings-container').toggleClass('opened');
    // bearbeiten oder SChliessen symbole
    $(this).find('i.fa-close').toggleClass('inline-block');
    $(this).find("i.setting").toggle();
    $('section.main-content').toggle();
		// ajaxLoadContent();
  });

});
