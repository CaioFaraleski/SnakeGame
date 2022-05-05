window.onload = function() {

    let board = document.querySelector("#table");
    console.log(board)
    let context = board.getContext("2d");

    context.fillStyle = "#fcd31f";
    context.fillRect(0, 0, board.width, board.height)
}