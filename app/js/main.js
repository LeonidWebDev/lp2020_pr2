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

    //game
    //welcome screen
    $('.rsp-welcome__button').on('click', function(e) {
        $('.rsp-welcome').toggleClass("active")
        $('.rsp-select').toggleClass("active")
    });

    //select screen
    let enemy = ""
    let enemyImg = ""
    $('.rsp-select').on('click', function(e) {

        // find name of enemy
        if ($(e.target).hasClass('rsp-select-icon')) {
            enemy = $(e.target).find("p").html()
            enemyImg = $(e.target).html()

        } else if ($(e.target).parents().hasClass('rsp-select-icon')) {
            enemy = $(e.target).parent().find("p").html()
            enemyImg = $(e.target).parent().html()
        }

        //start battle if enemy selected
        if ($(e.target).hasClass('rsp-select__button') && enemy) {

            $('.rsp-select').toggleClass("active")
            $('.rsp-game').toggleClass("active")

            //enemyicon
            $('.rsp-game-enemy').append(enemyImg)
        }
    });

    //battle screen
    let playerArmy = ""
    $('.rsp-game-battle>.rsp-select-icons').on('click', function(e) {

        //choice playerArmy
        if ($(e.target).hasClass('rsp-select-icon')) {
            playerArmy = $(e.target).find("p").html()
        } else if ($(e.target).parents().hasClass('rsp-select-icon')) {
            playerArmy = $(e.target).parent().find("p").html()
        }
        if (playerArmy == "Драконы") {
            playerChoice = 1
        } else if (playerArmy == "Рыцари") {
            playerChoice = 2
        } else if (playerArmy == "Джинны") {
            playerChoice = 3
        } else {
            return
        }

        alert(playerChoice)


    })

    //game screen
    let playerChoice = "" // 1 or 2 or 3 
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }
    let resultArr = ["YOU WIN", "YOU LOSE", "DRAW"]
    let matrix = new Map
    let roundMessage = ""
        //1 - dragon 2 - knight 3 - jinny
        // d win j, k win d, j win k.
    matrix.set("1 1", result[2]);
    matrix.set("1 2", result[1]);
    matrix.set("1 3", result[0]);
    matrix.set("2 1", result[0]);
    matrix.set("2 2", result[2]);
    matrix.set("2 3", result[1]);
    matrix.set("3 1", result[1]);
    matrix.set("3 2", result[0]);
    matrix.set("3 3", result[2]);

    $('.start!').on('click', function(e) {
            let computerChoice = getRandomInt(1, 4) // = > 1 || 2 || 3
            let currentKey = `${playerChoice} ${computerChoice}`

            if (matrix.has(currentKey)) {
                roundMessage = matrix.get(key)
                alert(roundMessage)
            }
        })
        // изменить счет => прибавить победу победителю

    // если количество побед 3, сообщаем кто победил и предлагаем сыграть снова или выйти
    // если выйти => окно приветствия
    // если сыграть снова => new Game

    // class Game {
    //     // методы класса
    //     constructor() { ... }
    //     method1() { ... }
    //     method2() { ... }
    //     method3() { ... }
    //     ...
    //   }


})