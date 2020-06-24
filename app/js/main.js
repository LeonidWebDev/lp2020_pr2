$(function() {
    //slick slider
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
        let eClass = classes.substr(indx, 6) // detect the unicue _class of tab (but better with data-attr)

        $('.tabs__head').removeClass('active')
        $(this).addClass('active')

        // addClass to tabs__body
        $(`.tabs__body`).removeClass('active')
        $(`.tabs__body.${eClass}`).addClass('active')

    });

    // accordeon
    $('.accordeon__item').on('click', function(e) {
        let curElem = $(this).children(".accordeon__item-body")
        curElem.toggleClass("accordeon__item-body--hidden")
    });


})