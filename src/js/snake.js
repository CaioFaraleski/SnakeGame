window.onload = function() {

    let buttonDifficulty = document.querySelector('#game-over').children[2];

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
    })

    let startGame = setInterval(game, 110);

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
        num = 30
    }
    let pieceAmount = num;
    let initialPointX = 10;
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
            initialPointX = pieceAmount - 1;
        }
        if(initialPointX > pieceAmount - 1) {
            initialPointX = 0;
        }
        if(initialPointY < 0) {
            initialPointY = pieceAmount - 1;
        }
        if(initialPointY > pieceAmount - 1) {
            initialPointY = 0;
        }

        context.fillStyle = "#fcd31f";
        context.fillRect(0, 0, board.width, board.height);

        context.fillStyle = "red";
        context.fillRect(applePointX * pieceSize, applePointY * pieceSize, pieceSize, pieceSize);

        context.fillStyle = "blue";
        for (let i = 0; i < trail.length; i++) {
            arrayTrailColor = context.fillRect(trail[i].x * pieceSize, trail[i].y * pieceSize, pieceSize, pieceSize);
            if(trail[i].x == initialPointX && trail[i].y == initialPointY) {
                veloX = 0;
                veloY = 0;
                lastKey = 1;
                gameOver();
            }
        }

        trail.push( {x: initialPointX, y: initialPointY} );
        while (trail.length > tail) {
            trail.shift()
        }

        if(applePointX == initialPointX && applePointY == initialPointY) {
            tail++;
            applePointX = Math.floor(Math.random() * pieceAmount);
            applePointY = Math.floor(Math.random() * pieceAmount);
        }

        function gameOver() {
            let gameOverScreen = document.querySelector('#game-over');
            gameOverScreen.style.display = 'flex';
        }
    }

}