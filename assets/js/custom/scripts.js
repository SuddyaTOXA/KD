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

        //for slider
        if($('.s-slider').length) {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                autoHeight: true,
                centeredSlides: true,
                loop: true,
                observeParents: true
            });
            var duration = 100;
            $('.swiper-slide, .close-swiper').on('click', function(){
                if ($(this).hasClass('close-swiper')) {
                    var popup =  $(this).parents('.slider-popup.open');
                }  else {
                    var popup = $(this).parents('.slider-popup');
                }
                var sliderBox = popup.parents('.slider-box'),
                    sliderBoxHeight = sliderBox.outerHeight(),
                    slide = popup.find('.swiper-slide'),
                    popupWrap = popup.find('.slider-popup-wrap'),
                    wrap = popup.find('.swiper-wrapper'),
                    img = wrap.find('.swiper-slide img'),
                    winHeight = $(window).height(),
                    imgHeight = winHeight - 206,
                    wrapMaxHeight = imgHeight + 86,
                    activeIndex = swiper.activeIndex;

                    if ($(this).hasClass('close-swiper')) {
                        popup.removeClass('open');
                        slide.removeClass('dis');
                        body.removeClass('disable-scroll');
                        img.css('max-height', '');
                        wrap.css('max-height', '');
                        popupWrap.css('margin-top', '');
                        sliderBox.css('height', '');
                        setTimeout(function () {
                            swiper.update();
                            swiper.slideTo(activeIndex, 0, false);
                        }, duration);
                    } else if (!($(this).hasClass('dis'))) {
                        sliderBox.css('height', sliderBoxHeight);
                        popup.addClass('open');
                        slide.addClass('dis');
                        body.addClass('disable-scroll');
                        img.css('max-height', imgHeight);
                        wrap.css('max-height', wrapMaxHeight);
                        setTimeout(function () {

                            swiper.update();
                            swiper.slideTo(activeIndex, 0, false);
                            var h = ((winHeight - wrap.outerHeight()) / 2) - 43;
                            popupWrap.css('margin-top', h);
                        },duration );
                    }
            });

            $(window).on('load resize', function() {
                if ($('.slider-popup').hasClass('open')) {
                    var popup = $('.slider-popup.open'),
                        slide = popup.find('.swiper-slide'),
                        popupWrap = popup.find('.slider-popup-wrap'),
                        wrap = popup.find('.swiper-wrapper'),
                        img = wrap.find('.swiper-slide img'),
                        winHeight = $(window).height(),
                        imgHeight = winHeight - 206,
                        wrapMaxHeight = imgHeight + 86;

                        img.css('max-height', imgHeight);
                        wrap.css('max-height', wrapMaxHeight);
                        setTimeout(function () {
                            swiper.update();
                            var h = ((winHeight - wrap.outerHeight()) / 2) - 43;
                            popupWrap.css('margin-top', h);

                        },duration )
                }
            })
        }
    });
});