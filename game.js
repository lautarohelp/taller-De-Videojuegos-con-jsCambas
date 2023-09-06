const canvas = document.querySelector("#game")
const game = canvas.getContext('2d')
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

let elementSize;
let canvasSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;


const playerPosition = {
    x:undefined,
    y:undefined,
};

const giftPosition = {
    x:undefined,
    y:undefined,    
};

let enemiesPositions = [];

window.addEventListener('load',setCanvasSize)
window.addEventListener('resize',setCanvasSize)



function setCanvasSize() {

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvas.setAttribute('width',canvasSize)
    canvas.setAttribute('height',canvasSize)

    elementSize = Math.floor(canvasSize / 10) //rodondeo a decimales
    
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame()


    console.log({canvasSize,elementSize});
}

function startGame() {
    game.font = elementSize + 'px Verdana'; //hay que colocar los pixeles y el tipo de fuente
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime,100)
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));

    showLives();

    enemiesPositions = [];
    game.clearRect(0,0,canvasSize, canvasSize);


    //lo hacemos mas limpio

    mapRowsCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX =  elementSize * (colI + 1.3);
            const posY =  elementSize * (rowI + 1); 

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                } 
            }else if (col == 'I') { //podemos buscarlo atraves de sus cordenadas
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if (col == 'X') {
                enemiesPositions.push({
                    x: posX,
                    y: posY,
                })
            }
            
            game.fillText(emoji,posX,posY)
        })
    });

    movePlayer();

/*   for (let j = 1; j <= 10; j++) {
        for (let i = 1; i <= 10; i++) {
        game.fillText(emojis[mapRowsCols[j - 1][i - 1]],elementSize * i + 10,elementSize * j)
        }
    }
     */

   /*  window.innerHeight */
    // window.innerWidth

    //game.fillRect(0,50,100,100); //lo crea
    //game.clearRect(50,50,50,50); //este borra el rectangulo
    //game.clearRect()
    //game.clearRect(0,0,50,50)
    
    /*  game.font = '25px verdana';
    game.fillStyle = 'purple';
    game.textAlign = '';
    game.fillText('',100,100); */
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
    levelWin();
    }

    const enemiesCollision = enemiesPositions.find(enemy => {
        const enemiesCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemiesCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        //tenemos que decir si son true o false
        return enemiesCollisionX && enemiesCollisionY;
    })
    if (enemiesCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y)

}

function levelWin() {
    console.log('subiste de nivel');
    level++;
    startGame();
}

function gameOver() {
    const game_Over = document.querySelector('.fail');
    game_Over.classList.remove('inactive');

    /* const showRecorsito = document.querySelector('.newrecord');
    const RECORD = localStorage.getSeconds('record_time');
    showRecorsito.textContent = RECORD; */

    clearInterval(timeInterval);
} 

function levelFail() {
    lives--;

    if (lives <= 0) {
        level = 0;
        lives = 3;
        gameOver();
    };
    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
    
}
function gameWin() {
    console.log('gamaste');
    clearInterval(timeInterval);
    const contWin = document.querySelector('.container-win')
    contWin.classList.remove('inactive')

    const recordTime = localStorage.getSeconds('record_time')
    const playerTime = Math.floor((Date.now() - timeStart)/1000);
    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime.getSeconds())
            pResult.textContent = 'superaste el record';
        } else {
            pResult.textContent = 'lo siento no superaste este record';
        }
    }else {
        localStorage.setItem('record_time', playerTime.getSeconds());
    }
    console.log({recordTime,playerTime});
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']) //[1,2,3]

    spanLives.textContent = ""
    heartsArray.forEach(herat => spanLives.append(herat))
    /* spanLives.textContent = heartsArray; */

}

function showTime() {
    spanTime.textContent = Date.now() - timeStart;
}

function showRecord() {
    spanRecord.textContent = localStorage.getItem('record_time');
}


window.addEventListener('keydown', moveByKeys) ;
btnUp.addEventListener('click',moveUp);
btnLeft.addEventListener('click',moveLeft);
btnRight.addEventListener('click',moveRight);
btnDown.addEventListener('click',moveDown);


    function moveByKeys(event) {
    if (event.key == 'ArrowUp' || event.key == 'w') moveUp();
    else if (event.key == 'ArrowLeft' || event.key == 'a') moveLeft();
    else if (event.key == 'ArrowRight' || event.key == 'd') moveRight();
    else if (event.key == 'ArrowDown' || event.key == 's') moveDown();
} 

function moveUp() {
    console.log('arriva');
    if ((playerPosition.y - elementSize) < elementSize -1) {
        console.log('haaaaaaa');
    }else {
    playerPosition.y -= elementSize;
    startGame();
    }
}
function moveLeft() {
    console.log('isquierza');
    if ((playerPosition.x - elementSize) < elementSize -1) {
        console.log('haaaaaaa');
    }else {
    playerPosition.x -= elementSize;
    startGame();
    }
}
function moveRight() {
    console.log('derecha');
    if ((playerPosition.x + elementSize) > canvasSize +1 ) {
        console.log('haaaaaaa');
    }else {
    playerPosition.x += elementSize;
    startGame();
    }
}
function moveDown() {
    console.log('abajo');
    if ((playerPosition.y + elementSize) > canvasSize ) {
        console.log('haaaaaaa');
    }else {
    playerPosition.y += elementSize;
    startGame();
    }
}