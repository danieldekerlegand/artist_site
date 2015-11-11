var main = function () {
    $('.icon-menu').click(function () {
        var bodyPos = $('body').css('left');
        console.log(bodyPos);
        if( bodyPos == '0px') {
            $('.menu').animate({
                left: '0px'
            }, 200);
            $('body').animate({
                left: '285px'
            }, 200);
        } else {
            $('.menu').animate({
                left: '-285px'
            }, 200);
            $('body').animate({
                left: '0px'
            }, 200);
        }
    });
};

$(document).ready(main);