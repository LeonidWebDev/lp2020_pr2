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

    //game..........................................
    //welcome screen
    $('.rsp-welcome__button').on('click', function(e) {
        $('.rsp-welcome').toggleClass("active")
        $('.rsp-select').toggleClass("active")
    });

    //end screen
    $('.rsp-end-quit').on('click', function(e) {
        $('.rsp-end').toggleClass("active")
        $('.rsp-welcome').toggleClass("active")
    });

    //play again
    $('.rsp-end-playagain').on('click', function(e) {
        $('.rsp-end').toggleClass("active")
        $('.rsp-select').toggleClass("active")
    });

    //select screen
    let enemy = "Солмир"
    let enemyImgSc = ""
    let blok = ""
    $('.rsp-select').on('click', function(e) {

        // find name of enemy
        if ($(e.target).hasClass('rsp-select-icon')) {
            enemy = $(e.target).find("p").html()
            blok = $(e.target).html()

            //select description
            $(".rsp-select__text").find(`.rsp-select-descr.active`).removeClass("active")
            $(".rsp-select__text").find(`.rsp-select-descr[data-enemy="${enemy}"]`).addClass("active")

            //select opponent icon
            $(".rsp-select-icons").find(".rsp-select-icon.active").removeClass("active")
            $(e.target).addClass("active")

            //find enemy img
            enemyImgSc = $(e.target).find("img").attr("src")

        } else if ($(e.target).parents().hasClass('rsp-select-icon')) {
            enemy = $(e.target).parent().find("p").html()
            blok = $(e.target).parent().html()

            //select description
            $(".rsp-select__text").find(`.rsp-select-descr.active`).removeClass("active")
            $(".rsp-select__text").find(`.rsp-select-descr[data-enemy="${enemy}"]`).addClass("active")

            //select opponent icon
            $(".rsp-select-icons").find(".rsp-select-icon.active").removeClass("active")
            $(e.target).parent().addClass("active")

            //find enemy img
            enemyImgSc = $(e.target).parent().find("img").attr("src")

        }

        // draw selected enemy name
        $(".rsp-select-choice").html(enemy)


        //start battle if enemy selected
        if ($(e.target).hasClass('rsp-select__button') && enemy) {

            // //delete old enemyWrap
            // if ($('.enemyIcon')) {
            //     console.log("del one")
            //     $('.enemyIcon').remove()
            // }

            //new scene battle
            $('.rsp-select').toggleClass("active")
            $('.rsp-game').toggleClass("active")

            // //adding enemy icon and name
            // let enemyWrap = document.createElement('div');
            // enemyWrap.className = "enemyIcon";
            // enemyWrap.innerHTML = blok
            // console.log(enemyWrap)
            // $(".rsp-game-enemy").append(enemyWrap)
        }
    });

    //battle screen
    let playerArmy = ""
    $('.rsp-game-own>.rsp-select-icons').on('click', function(e) {
        //choice playerArmy
        if ($(e.target).hasClass('rsp-select-icon')) {
            playerArmy = $(e.target).find("p").html()
                //add class to active army
            $(".rsp-select-icons.battle").find(".rsp-select-icon.active").removeClass("active")
            $(e.target).addClass("active")
        } else if ($(e.target).parents().hasClass('rsp-select-icon')) {
            playerArmy = $(e.target).parent().find("p").html()
                //add class to active army
            $(".rsp-select-icons.battle").find(".rsp-select-icon.active").removeClass("active")
            $(e.target).parent().addClass("active")
        }

        //add and select army-icon to battle
        document.querySelector(".rsp-game-armyplayer-img").src = armys.get(playerArmy)
        document.querySelector(".rsp-game-armyplayer-img").style.display = "block"


        if (playerArmy == "Драконы") {
            playerChoice = 1
        } else if (playerArmy == "Рыцари") {
            playerChoice = 2
        } else if (playerArmy == "Джинны") {
            playerChoice = 3
        } else {
            return
        }

        // alert(playerChoice)


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
    let armys = new Map
    let roundMessage = ""
    let playerPoints = 0
    let enemyPoints = 0


    //проверка, кому засчитывать очки
    function addPoint(key) {
        if (key == resultArr[0]) {
            playerPoints += 1
        } else if (key == resultArr[1]) {
            enemyPoints += 1
        } else if (key == resultArr[2]) {
            return
        } else { return alert("err addPoint") }
    }

    // вывод очков
    function setEnemyPoints(ePoints) {
        $('.rsp-game-enemyPoints').text(ePoints)
    }

    function setPlayerPoints(plPoints) {
        $('.rsp-game-playerPoints').text(plPoints)
    }
    setEnemyPoints(enemyPoints)
    setPlayerPoints(playerPoints)

    function pointsToZero() {
        enemyPoints = 0
        playerPoints = 0
        setEnemyPoints(enemyPoints)
        setPlayerPoints(playerPoints)
    }

    //1 - dragon 2 - knight 3 - jinny
    // d win j, k win d, j win k.
    matrix.set("1 1", resultArr[2]);
    matrix.set("1 2", resultArr[1]);
    matrix.set("1 3", resultArr[0]);
    matrix.set("2 1", resultArr[0]);
    matrix.set("2 2", resultArr[2]);
    matrix.set("2 3", resultArr[1]);
    matrix.set("3 1", resultArr[1]);
    matrix.set("3 2", resultArr[0]);
    matrix.set("3 3", resultArr[2]);

    //armys icon src
    armys.set("Драконы", "./images/tabs/tab1.jpg");
    armys.set("Рыцари", "./images/tabs/tab2.jpg");
    armys.set("Джинны", "./images/tabs/tab3.jpg");

    // сброс всех параметров раунда
    function defaultRound() {
        //сбрасываем выбор игрока
        playerChoice = ""
        document.querySelector(".rsp-game-armyplayer-img").style.display = "none"

        document.querySelector(".rsp-game-armyplayer").style.transform = 'translate(0px)'
        document.querySelector(".rsp-game-armyplayer").style.transition = 'none'
            // сбрасываем выбор компьютера
        document.querySelector(".rsp-game-armycomputer-img").style.display = "none"

        document.querySelector(".rsp-game-armycomputer").style.transition = 'none'
        document.querySelector(".rsp-game-armycomputer").style.transform = 'translate(0px)'

        //убираем выделение армии
        $(".rsp-select-icons.battle").find(".rsp-select-icon.active").removeClass("active")
    }

    $('.rsp-game-start').on('click', function(e) {
        if (playerChoice == "") {

            alert("вы собираетесь пойти в бой без армии?")
            return
        }
        let computerChoice = getRandomInt(1, 4) // = > 1 || 2 || 3
        let currentKey = `${playerChoice} ${computerChoice}`

        // draw icon for computer army
        document.querySelector(".rsp-game-armycomputer-img").src = `./images/tabs/tab${computerChoice}.jpg`
        document.querySelector(".rsp-game-armycomputer-img").style.display = "block"

        if (matrix.has(currentKey) && playerChoice) {
            roundMessage = matrix.get(currentKey)
            alert(roundMessage)

            // анимация иконок во время боя и расстановка обратно по ее завершению
            // to do (убрать обработчик из цикла)
            // document.querySelector(".rsp-game-armycomputer").addEventListener("transitionend", function(e) {
            //     // e.currentTarget.style.transform = 'translate(0px)'
            //     // e.currentTarget.style.transition = 'none'
            // })
            document.querySelector(".rsp-game-armyplayer").addEventListener("transitionend", function(e) {
                // e.currentTarget.style.transform = 'translate(0px)'
                // e.currentTarget.style.transition = 'none'

                defaultRound()
            })

            function animFight() {
                ComputerIcon = document.querySelector(".rsp-game-armycomputer")
                PlayerIcon = document.querySelector(".rsp-game-armyplayer")
                ComputerIcon.style.transform = 'translate(150px)'
                ComputerIcon.style.transition = 'transform 3s ease-out 0.1s'
                PlayerIcon.style.transform = 'translate(-150px)'
                PlayerIcon.style.transition = 'transform 3s ease-out 0.1s'
            }
            animFight()

            //animfight 2 army
            // $(".rsp-game-choice").find(".rsp-game-armycomputer").addClass("rsp-game-fightenemy")
            // $(".rsp-game-choice").find(".rsp-game-armyplayer").addClass("rsp-game-fightplayer")


            // setTimeout(function() {
            //     $(".rsp-game-choice").find(".rsp-game-armycomputer.rsp-game-fightenemy").removeClass("rsp-game-fightenemy")
            //     $(".rsp-game-choice").find(".rsp-game-armyplayer.rsp-game-fightplayer").removeClass("rsp-game-fightplayer")

            // }, 2000)


            // $(".rsp-game-choice").find(".rsp-game-armycomputer").css("animation", "rsp-game-fightenemy 3s ease-in-out 1")
            // $(".rsp-game-choice").find(".rsp-game-armyplayer").css("animation", "rsp-game-fightplayer 3s ease-in-out 1")

            //добавляем очки
            addPoint(roundMessage)

            //показываем изменение результата
            setEnemyPoints(enemyPoints)
            setPlayerPoints(playerPoints)



            //проверяем условия (3 победы)
            if (playerPoints == 3 || enemyPoints == 3) {

                defaultRound()
                let result = playerPoints == 3 ? "Поздравляем! Победа за вами" : "Противник оказался сильнее";
                alert(result)

                //смена сцены
                $('.rsp-game').toggleClass("active")
                $('.rsp-end').toggleClass("active")

                //сбрасываем счет
                pointsToZero()
            }
        }

    })

    // class Game {
    //     // методы класса
    //     constructor() { ... }
    //     method1() { ... }
    //     method2() { ... }
    //     method3() { ... }
    //     ...
    //   }


})