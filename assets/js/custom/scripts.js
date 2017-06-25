function stickyBtn() {
    if ($('.section-structural').length) {
        $(window).on('load resize', function() {
            setTimeout(function() {
                var section = $('.section-structural'),
                    content = section.find('.center-wrap'),
                    contentHeight = content.outerHeight(),
                    positionTop = content.position().top,
                    positionBottom = positionTop + contentHeight,
                    height = $(window).height(),
                    btn = section.find('.btn-estimate-box'),
                    btnHeight = btn.outerHeight(),
                    btnTopPosition = height - 98 - btnHeight,
                    btnBotoomPosition = height - 98;

                $(window).on('scroll', function () {
                    var currentPosition = $(window).scrollTop();

                    if (currentPosition > (positionTop - btnTopPosition) && currentPosition < (positionBottom - btnBotoomPosition)) {
                        if (!(btn.hasClass('b-fixed'))) {
                            btn.addClass('b-fixed');
                            btn.css('top', 'auto');
                            btn.css('bottom', '98px');
                        }
                    } else if (currentPosition < (positionTop - btnTopPosition)) {
                        if (btn.hasClass('b-fixed')) {
                            btn.removeClass('b-fixed');
                            btn.css('top', '0px');
                            btn.css('bottom', 'auto');
                        }
                    } else if (currentPosition > (positionBottom - btnBotoomPosition)) {
                        if (btn.hasClass('b-fixed')) {
                            btn.removeClass('b-fixed');
                            btn.css('top', 'auto');
                            btn.css('bottom', '0px');
                        }
                    }
                });
            }, 300);
        });
    }
}
function msieversion() {
    var ua = window.navigator.userAgent,
        msie = ua.indexOf('MSIE '),
        trident = ua.indexOf('Trident/'),
        edge = ua.indexOf('Edge/');
    if (msie > 0 || trident > 0 || edge > 0) {
        $('body').addClass('ie');
    }

    return false;
}
function setMaxOuterHeight(box) {
    var maxHeight = 0;
    box.each(function () {
        if ( $(this).outerHeight() > maxHeight ) {
            maxHeight = $(this).outerHeight();
        }
    });
    box.height(maxHeight);
}
function renderCircle() {
    if ($('.circle-bar').length) {
        var bar = $('.circle-bar'),
            pi = Math.PI;

        bar.each(function (i) {
            if ($(window).width() > 767) {
                var radius = bar.eq(i).data('radius'),
                    mainCircle = bar.eq(i).data('mainCircle'),
                    widthCf = 10,
                    widthCs = 16,
                    widthCt = 22;
                if (!radius) {
                    radius = 130;
                }
            } else if ($(window).width() < 768) {
                var radius = bar.eq(i).data('mRadius'),
                    mainCircle = bar.eq(i).data('mainCircle'),
                    widthCf = 6,
                    widthCs = 8,
                    widthCt = 10;
                if (!radius) {
                    radius = 65;
                }
            }


            if (mainCircle) {
                var width = radius * 2,
                    mainStrokeWidth = widthCf,
                    trueRadius = radius - (mainStrokeWidth / 2),
                    mainStrokeDasharray = 2 * pi * trueRadius,
                    mainStrokeDashoffset = mainStrokeDasharray * ((100 - mainCircle) * 0.01),
                    circleBg = '<circle cx="' + radius + '" cy="' + radius + '" r="' + trueRadius + '" fill="none" stroke="#EAEAEA" stroke-width="' + mainStrokeWidth + '" />',
                    circleMain = '<circle class="cpb-main" cx="' + radius + '" cy="' + radius + '" r="' + trueRadius + '" fill="none" stroke="#cd0000" stroke-width="' + mainStrokeWidth + '" stroke-dasharray="' + mainStrokeDasharray + '" stroke-dashoffset="' + mainStrokeDasharray + '" />',
                    circles = circleBg + circleMain,
                    secondCircle = $(this).data('secondCircle');

                if (secondCircle) {
                    var secondStrokeWidth = widthCs,
                        secondRadius = radius - mainStrokeWidth,
                        secondTrueRadius = secondRadius - (secondStrokeWidth / 2),
                        secondStrokeDasharray = 2 * pi * secondTrueRadius,
                        secondStrokeDashoffset = secondStrokeDasharray * ((100 - secondCircle) * 0.01),
                        circleSecond = '<circle class="cpb-second" cx="' + secondRadius + '" cy="' + secondRadius + '" r="' + secondTrueRadius + '" fill="none" stroke="#FE4040" stroke-width="' + secondStrokeWidth + '" stroke-dasharray="' + secondStrokeDasharray + '" stroke-dashoffset="' + secondStrokeDasharray + '" transform="translate(' + mainStrokeWidth + ', ' + mainStrokeWidth + ')"/>',
                        circles = circles + circleSecond,
                        thirdCircle = $(this).data('thirdCircle');

                    if (thirdCircle) {
                        var thirdStrokeWidth = widthCt,
                            offset = mainStrokeWidth + secondStrokeWidth,
                            thirdRadius = radius - mainStrokeWidth - secondStrokeWidth,
                            thirdTrueRadius = thirdRadius - (thirdStrokeWidth / 2),
                            thirdStrokeDasharray = 2 * pi * thirdTrueRadius,
                            thirdStrokeDashoffset = thirdStrokeDasharray * ((100 - thirdCircle) * 0.01),
                            circleThird = '<circle  class="cpb-third" cx="' + thirdRadius + '" cy="' + thirdRadius + '" r="' + thirdTrueRadius + '" fill="none" stroke="#B00000" stroke-width="' + thirdStrokeWidth + '" stroke-dasharray="' + thirdStrokeDasharray + '" stroke-dashoffset="' + thirdStrokeDasharray + '" transform="translate(' + offset + ', ' + offset + ')"/>',
                            circles = circles + circleThird;
                    }
                }

                bar.eq(i).css('width', width).css('height', width);

                $(this).html(function () {
                    return '<svg class="progress-svg" width="' + width + '" height="' + width + '" viewbox="0 0 ' + width + ' ' + width + '">' + circles + '</svg><span class="circle-value"><span class="counter">' + mainCircle + '</span>%</span> ';
                });

                $('.circle-value').css('line-height', width + 'px');

                setTimeout(function () {
                    bar.eq(i).find('.cpb-main').css('stroke-dashoffset', mainStrokeDashoffset);
                }, 100);
                setTimeout(function () {
                    bar.eq(i).find('.cpb-second').css('stroke-dashoffset', secondStrokeDashoffset);
                }, 200);
                setTimeout(function () {
                    bar.eq(i).find('.cpb-third').css('stroke-dashoffset', thirdStrokeDashoffset);
                }, 300);

                $(this).find('.counter').prop('Counter', 0).animate({
                    Counter: mainCircle
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
                bar.eq(i).addClass('complete');
            }
        });

    }
}
function circleProgressBar() {
    renderCircle();
    $(window).on('resize', function () {
        renderCircle();
    });
}
$(document).ready(function() {
    msieversion();
    body = $('body');

    //for burger menu
    $('.mobile-menu-toggle, .mobile-menu-overlay').on('click', function () {
        $('.mobile-menu-toggle').toggleClass('active');
        $('.mobile-menu-wrap').toggleClass('showing');
        // $(document.body).toggleClass('overflow');
        body.toggleClass('disable-scroll');
    });

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

    //for smooth scroll
        smoothScroll.init({
            selector: '.smooth-scroll, a', // Selector for links (must be a class, ID, data attribute, or element tag)
            speed: 500, // Integer. How fast to complete the scroll in milliseconds
            easing: 'easeInQuad', // Easing pattern to use
            offset: 130 // Integer. How far to offset the scrolling anchor location in pixels
        });

    // for empty links
    $('.prevent').on('click', function(event){
        event.preventDefault();
    });

    // for main banner
    if($('.browserHeight').length ) {
        $(window).on('load resize', function() {
            var banner = $('.browserHeight'),
                winHeight = $(window).height() - 106;

            banner.height(winHeight);
        });
    }

    //for footer
    // $(window).on('load resize', function() {
    //     if($('.footer-top-list').length) {
    //         var box = $('.footer-table');
    //         setMaxOuterHeight(box);
    //     }
    // });

    //for sticky btn
    stickyBtn();

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
                imgHeight = winHeight - 126,
                wrapMaxHeight = imgHeight + 86,
                activeIndex = swiper.activeIndex;

                if ($(this).hasClass('close-swiper')) {
                    popup.addClass('hide');
                    setTimeout(function () {
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
                    }, 350);
                    setTimeout(function () {
                        popup.removeClass('show');
                        popup.removeClass('hide');
                    }, 700 );
                } else if (!($(this).hasClass('dis'))) {
                    sliderBox.css('height', sliderBoxHeight);
                    popup.addClass('open');
                    slide.addClass('dis');
                    body.addClass('disable-scroll');
                    img.css('max-height', imgHeight);
                    wrap.css('max-height', wrapMaxHeight);
                    setTimeout(function () {
                        popup.addClass('show');
                    }, 500 );
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
                    imgHeight = winHeight - 126,
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
    //for btn
    $(window).on('load resize', function() {
        if ($('.leadership-cell .btn').length) {
            var cell = $('.leadership-cell'),
                btn = cell.find('.btn'),
                cellWidth = cell.width(),
                btnWidth = btn.outerWidth();

                if (cellWidth < btnWidth) {
                    btn.css('max-width', cellWidth);
                    btn.css('min-width', 'auto');
                    btn.addClass('small');
                } else {
                    btn.css('max-width', '');
                    btn.css('min-width', '');
                    btn.removeClass('small');
                }
        }
    });

    //for select
    $('select').on('change',function(){
        var color = $(this).find('option:selected').attr('value');
        if (color) {
            $(this).addClass('check');
        } else {
            $(this).removeClass('check');
        }
    });

    //for job history
    $('.right-arrow.job').on('click', function () {
        var btn = $(this),
            jobBox = btn.prev(),
            jobForm = jobBox.find('.job-history-list:first');

            jobForm.clone().appendTo(jobBox);
    });

    // for animation
    $(window).on('load scroll', function () {
        var bar = $('.circle-bar:not(.show)'),
            line = $('.retention-box:not(.show)');
        if (bar.length || line.length) {
            if (bar.visible()) {
                if (!(bar.hasClass('show'))) {
                    bar.addClass('show');
                    circleProgressBar();
                }
            }
            if (line.visible()) {
                if (!(line.hasClass('show'))) {
                    line.addClass('show');
                }
            }
        }
    });

    //for hide content
    $(window).on('load resize', function () {
        var section = $('.limited-height'),
            width = $(window).width(),
            hideHeight = 520;

        if (width < '768') {
            section.each(function (i) {
                var box = section.eq(i),
                    btnBox = box.find('.hide-content'),
                    btn = btnBox.find('.down-arrow'),
                    height = box.outerHeight();

                if (height > hideHeight) {
                    if (!(box.hasClass('hide'))) {
                        btnBox.addClass('show');
                        box.addClass('hide');
                        box.css('height', hideHeight);
                    }
                }

                btn.on('click', function () {
                    var btnBox = $(this).parents('.hide-content'),
                        box = $(this).parents('.limited-height');

                    btnBox.removeClass('show');
                    box.removeClass('hide');
                    box.css('height', '100%');
                });
            });
        } else {
            section.each(function (i) {
                var box = section.eq(i),
                    btnBox = box.find('.hide-content');

                    btnBox.removeClass('show');
                    box.removeClass('hide');
                    box.css('height', '100%');
            });
        }
    })
});