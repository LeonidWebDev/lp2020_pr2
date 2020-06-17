$(function() {
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });


    // tabs
    $('.tabs__head').on('click', function(e) {
        let classes = $(this).attr("class")
        let indx = classes.indexOf('_tabs')
        let detection = classes.substr(indx, 6) // detect the _class of tab
        $('.tabs__head ').removeClass('active')
        $(this).addClass('active')

        // addClass to tabs__body
        $(`.tabs__body`).removeClass('active')
        $(`.tabs__body.${detection}`).addClass('active')
        console.log()



    });


})