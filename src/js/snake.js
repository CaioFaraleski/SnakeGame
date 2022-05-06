window.onload = function() {

    let board = document.querySelector("#table");
    let context = board.getContext("2d");

    document.addEventListener("keydown", (event) => {
        switch (event.keyCode) {
            case 37:
                veloX = -velo;
                veloY = 0;
                break;
            case 38:
                veloX = 0;
                veloY = -velo;
                break;
            case 39:
                veloX = velo;
                veloY = 0;
                break;
            case 40:
                veloX = 0;
                veloY = velo;
                break;
            default:
                break;
        }
    })

    setInterval(game, 90);

    const velo = 1;

    let veloX = 0;
    let veloY = 0;
    let initialPointX = 10;
    let initialPointY = 15;
    let pieceSize = board.getBoundingClientRect().width / 17;
    let pieceAmount = 17;
    let applePointX = 15;
    let applePointY = 15;
    let trail = [];
    tail = 2;


    function game() {
        console.log("to aqui")
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
            context.fillRect(trail[i].x * pieceSize, trail[i].y * pieceSize, pieceSize, pieceSize);
            if(trail[i].x == initialPointX && trail[i].y == initialPointY) {
                veloX = 0;
                veloY = 0;
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
    }

}