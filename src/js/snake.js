window.onload = function() {

    let buttonDifficulty = document.querySelector('#game-over').children[2];
    let buttonStart = document.querySelector('#game-over').children[1];

    if (!localStorage.getItem('difficulty')) {
        localStorage.setItem('difficulty', 'Medium')
    }
    else {
        buttonDifficulty.innerText = localStorage.getItem('difficulty')
    }
    let board = document.querySelector("#table");
    let context = board.getContext("2d");
    let lastKey;

    document.addEventListener("keydown", (event) => {
        switch (event.keyCode) {
            case 37:
                lastKey = 37;
                break;
            case 38:
                lastKey = 38;
                break;
            case 39:
                lastKey = 39;
                
                break;
            case 40:
                lastKey = 40;
                
                break;
            default:
                break;
        }
    });

    buttonDifficulty.addEventListener('click', (event) => {
        if(event.target.innerHTML === 'Medium') {
            event.target.innerText = 'Hard';
            localStorage.setItem('difficulty', 'Hard');
        }
        else if(event.target.innerHTML === 'Hard') {
            event.target.innerText = 'Easy'
            localStorage.setItem('difficulty', 'Easy');
        }
        else if(event.target.innerHTML === 'Easy') {
            event.target.innerText = 'Medium';
            localStorage.setItem('difficulty', 'Medium');
        }
    });

    function start() {
        let gameOverScreen = document.querySelector('#game-over');
        gameOverScreen.style.display = 'none';
        if(localStorage.getItem('difficulty') === 'Medium') {
            pieceSize = 600 / 20;
            pieceAmount = 20;
        }
        else if (localStorage.getItem('difficulty') === 'Easy') {
            pieceSize = 600 / 10;
            pieceAmount = 10;
        }
        else {
            pieceSize = 600 / 25;
            pieceAmount = 25;
        }
        lastKey = 0;
        initialPointX = 9;
        initialPointY = 9;
        applePointX = Math.floor(Math.random() * pieceAmount);
        applePointY = Math.floor(Math.random() * pieceAmount);
        veloX = 0;
        veloY = -1;
    }

    buttonStart.addEventListener('click', (event) => {
        start();
    })

    let startGame = setInterval(game, 90);

    const velo = 1;
    let veloX = 0;
    let veloY = -1;
    let num;
    if(localStorage.getItem('difficulty') === 'Medium') {
        num = 20
    }
    else if (localStorage.getItem('difficulty') === 'Easy') {
        num = 10
    }
    else {
        num = 25
    }
    let pieceAmount = num;
    let initialPointX = 9;
    let initialPointY = 9;
    let pieceSize = 600 / num; 
    let applePointX = Math.floor(Math.random() * pieceAmount);
    let applePointY = Math.floor(Math.random() * pieceAmount);
    let trail = [];
    let tail = 1;

    
    
    function game() {
        if(lastKey === 37 && veloX !== velo && veloY !== 0) {
            veloX = -velo;
            veloY = 0;
        }
        else if(lastKey === 38 && veloX !== 0 && veloY !== velo) {
            veloX = 0;
            veloY = -velo;
        }
        else if(lastKey === 39 && veloX !== -velo && veloY !== 0) {
            veloX = velo;
            veloY = 0;
        }
        else if(lastKey === 40 && veloX !== 0 && veloY !== velo) {
            veloX = 0;
            veloY = velo;
        }
        
        initialPointX += veloX;
        initialPointY += veloY;

        if(initialPointX < 0) {
            gameOver();
        }
        if(initialPointX > pieceAmount - 1) {
            gameOver();
        }
        if(initialPointY < 0) {
            gameOver();
        }
        if(initialPointY > pieceAmount - 1) {
            gameOver();
        }

        for (var i = 0; i < pieceAmount; i++){
            for (var j = 0; j < pieceAmount; j++){
              if((i + j) % 2 === 0) {
                context.fillStyle = "#fcd31f";
                context.fillRect(j * pieceSize, i * pieceSize, pieceSize, pieceSize);
              }
              else {
                context.fillStyle = "#dfb913";
                context.fillRect(j * pieceSize, i * pieceSize, pieceSize, pieceSize);
              }
            }
          }
        

        context.fillStyle = "red";
        context.fillRect(applePointX * pieceSize + Math.floor((pieceSize / 10) * 100), applePointY * pieceSize + Math.floor((pieceSize / 10) * 100), pieceSize - Math.floor((pieceSize / 20) * 100), pieceSize - Math.floor((pieceSize / 20) * 100));

        context.fillStyle = "blue";
        for (let i = 0; i < trail.length; i++) {
            arrayTrailColor = context.fillRect(trail[i].x * pieceSize, trail[i].y * pieceSize, pieceSize - 1, pieceSize - 1);
            if(trail[i].x == initialPointX && trail[i].y == initialPointY) {
                gameOver();
            }
        }

        trail.push( {x: initialPointX, y: initialPointY} );
        while (trail.length > tail) {
            trail.shift()
        }

        if(applePointX == initialPointX && applePointY == initialPointY) {
            let diferent = false;
            tail++;
            while (applePointX == initialPointX && applePointY == initialPointY && diferent !== true) {
                applePointX = Math.floor(Math.random() * pieceAmount);
                applePointY = Math.floor(Math.random() * pieceAmount);
                if(trail.length > 0) {
                    for (let i = 0; i < trail.length; i++) {
                        if(trail[i].x !== applePointX && trail[i].y !== applePointY) {
                            diferent = true;
                        }
                        
                    }
                }
            }
        }

    }

    function gameOver() {
        let gameOverScreen = document.querySelector('#game-over');
        gameOverScreen.style.display = 'flex';
        initialPointX -= veloX;
        initialPointY -= veloY;
        veloX = 0;
        veloY = 0;
        tail = 1
        lastKey = 1;
    }

    

}