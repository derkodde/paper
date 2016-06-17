$(document).ready(function($) {

    // open edit field
    $('.handle.page-settings').on('click', function(){
        //andere Handle ausblenden
        $('.fp-slidesNav').fadeToggle('slow');
        $(' .handle').not(this).each(function(){
            $(this).hide();
        });

        // dem Elternelement die klasse geben
        $('.settings-container').toggleClass('opened');
        // bearbeiten oder SChliessen symbole
        $(this).find('i.fa-close').toggleClass('inline-block');
        $(this).find("i.setting").toggle();
        $('section.main-content').toggle();
    });


});
