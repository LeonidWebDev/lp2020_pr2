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

    scenes = ['.rsp-welcome', '.rsp-select', '.rsp-game-wrapper', '.rsp-end']

    //смена сцены
    function sceneChange(a, b) {
        $(a).fadeOut(200, function() {
            $(b).fadeIn(200)
        })
    }
    //welcome screen
    $('.rsp-welcome__button').on('click', function(e) {
        sceneChange(scenes[0], scenes[1])
    });

    //end screen
    $('.rsp-end-quit').on('click', function(e) {
        sceneChange(scenes[3], scenes[0])
    });

    //play again
    $('.rsp-end-playagain').on('click', function(e) {
        //сбрасываем счет
        pointsToZero()

        sceneChange(scenes[3], scenes[1])
    });

    //select sceen
    let enemy = "Солмир" //противник по дефолту
    let playerArmy = "" // выбранная игроком армия

    // выбор противника
    $('.rsp-select').on('click', function(e) {

        // find name of enemy
        if (e.target.closest(".rsp-select-icon")) {
            enemy = e.target.closest(".rsp-select-icon").lastElementChild.innerHTML
                //select opponent icon
            $(".rsp-select .rsp-select-icons").find(".rsp-select-icon.active").removeClass("active")
            $(e.target.closest(".rsp-select-icon")).addClass("active")
        }

        // переключаем описание выбранного противника
        $(".rsp-select__text").find(`.rsp-select-descr.active`).removeClass("active")
        $(".rsp-select__text").find(`.rsp-select-descr[data-enemy="${enemy}"]`).addClass("active")

        // draw selected enemy name
        $(".rsp-select-choice").html(enemy)


        //start battle scene if enemy selected
        if ($(e.target).hasClass('rsp-select__button') && enemy) {

            //сбрасываем счет
            pointsToZero()

            sceneChange(scenes[1], scenes[2])
        }
    });

    //battle screen
    // показывает сообщения в окне сообщений
    function drawMessage(smt) {
        $(".rsp-game-title").html(smt)
    }

    // если армия еще не выбрана
    function emptyArmy() {
        if (playerChoice == "") {
            drawMessage(`Необходимо выбрать войска`)
            return true
        } else return false
    }

    // выбор армии
    $('.rsp-game-own>.rsp-select-icons').on('click', function(e) {

        // определяем выбранную армию, вешаем класс
        playerArmy = e.target.closest(".rsp-select-icon").lastElementChild.innerHTML
        $(".rsp-select-icons.battle").find(".rsp-select-icon.active").removeClass("active")
        $(e.target.closest(".rsp-select-icon")).addClass("active")

        drawMessage(`${playerArmy} приготовились к атаке`)

        //add and select army-icon to battle
        // document.querySelector(".rsp-game-armyplayer-img").src = armys.get(playerArmy)
        // document.querySelector(".rsp-game-armyplayer-img").style.display = "block"
        document.querySelector(".rsp-game-armyplayer").classList = "rsp-game-armyplayer"
        document.querySelector(".rsp-game-armyplayer").classList.add(armys.get(playerArmy))
            //.classList.add('knight')  Genie   dragon



        if (playerArmy == "Драконы") {
            playerChoice = 1
        } else if (playerArmy == "Рыцари") {
            playerChoice = 2
        } else if (playerArmy == "Джинны") {
            playerChoice = 3
        } else {
            return
        }

    })

    //game screen
    let WinNum = 3 // необходимое количество побед
    let playerChoice = "" // 1 or 2 or 3 


    function ifVictory(WinNum) {
        if (playerPoints == WinNum || enemyPoints == WinNum) {

            defaultRound()
            let result = playerPoints == 3 ? "Поздравляем! Победа за вами" : "Противник оказался сильнее";

            alert(result)

            sceneChange(scenes[2], scenes[3])
        }
    }

    // случайное число
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
        drawMessage('добро пожаловать на состязания!!<br>Выберите войска')
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
    armys.set("Драконы", "dragon");
    armys.set("Рыцари", "knight");
    armys.set("Джинны", "Genie");

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
    // анимация иконок во время боя и расстановка обратно по ее завершению
    document.querySelector(".rsp-game-armyplayer").addEventListener("transitionend", function(e) {

        drawMessage(`${roundMessage}`) //to do (написать в сообщении кто побеждает кого и кому очко засчитывается)
        defaultRound()

        // проверка условий победы
        ifVictory(WinNum)
    })

    // запускает раунд
    $('.rsp-game-start').on('click', function(e) {
        if (emptyArmy()) return false

        let computerChoice = getRandomInt(1, 4) // = > 1 || 2 || 3
        let currentKey = `${playerChoice} ${computerChoice}`

        // находим название выбранной армии компьютера
        for (let army of armys.keys()) {
            if (armys.get(army) == `./images/tabs/tab${computerChoice}.jpg`) {
                drawMessage(`Игрок: ${playerArmy} приготовились к атаке <br> Компьютер: ${army} приготовились к атаке `)
            }
        }

        // draw icon for computer army
        document.querySelector(".rsp-game-armycomputer-img").src = `./images/tabs/tab${computerChoice}.jpg`
        document.querySelector(".rsp-game-armycomputer-img").style.display = "block"

        if (matrix.has(currentKey) && playerChoice) {
            roundMessage = matrix.get(currentKey)

            //анимация иконок с войсками
            function animFight() {

                ComputerIcon = document.querySelector(".rsp-game-armycomputer")
                PlayerIcon = document.querySelector(".rsp-game-armyplayer")
                ComputerIcon.style.transform = 'translate(150px)'
                ComputerIcon.style.transition = 'transform 3s ease-out 0.1s'
                PlayerIcon.style.transform = 'translate(-150px)'
                PlayerIcon.style.transition = 'transform 3s ease-out 0.1s'
            }
            // анимация боя
            animFight()

            //добавляем очки
            addPoint(roundMessage)

            //показываем изменение результата
            setEnemyPoints(enemyPoints)
            setPlayerPoints(playerPoints)
        }
    })
})