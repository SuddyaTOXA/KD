$(function(){
	$(document).ready(function() {
	    body = $('body');
	    // for submenu
        $('.open-overlay, .close-overlay').on('click', function(){
            if($(this).hasClass('open-overlay')) {
                body.addClass('disable-scroll');
                $(this).next().addClass('open').fadeIn(550);
            } else if ($(this).hasClass('close-overlay')) {
                body.removeClass('disable-scroll');
                $(this).parent().removeClass('open').fadeOut(550);
            }
        });
        $(document).on('keyup', function(e) {
            if (e.keyCode == 27) {
                body.removeClass('disable-scroll');
                $('.submenu-overlay.open').removeClass('open').fadeOut(550);
            }
        });


        // for empty links
        $('.prevent').on('click', function(event){
            event.preventDefault();
        });

	    // for main banner
        if($('.browserHeight').length ) {
            $(window).on('load resize', function() {
                var banner = $('.browserHeight'),
                    winHeight = $(window).height() - 156;

                banner.height(winHeight);
            });
        }
    });
});