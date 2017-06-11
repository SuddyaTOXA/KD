$(function(){
	$(document).ready(function() {
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