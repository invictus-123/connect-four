var playerOne = prompt("Player One: Enter your name, You will be blue: ");
var playerOneColor = 'rgb(100, 100, 200)';

var playerTwo = prompt("Player Two: Enter your name, You will be red: ");
var playerTwoColor = 'rgb(200, 100, 100)';

var game_on = true;
var moves = 0;

table = $('table tr');

function reportWin(row, col) {
    console.log("You won starting at row: " + row + " col: " + col);
}

function changeColor(row, col, color) {
    return table.eq(row).find('td').eq(col).find('button').css('background-color', color);
}

function getColor(row, col) {
    return table.eq(row).find('td').eq(col).find('button').css('background-color');
}

function checkBottom(col) {
    for(var row = 5; row >= 0; row --) {
        var curColor = getColor(row, col);
        if(curColor === 'rgb(128, 128, 128)') {
            return row;
        }
    }
}

function checkConnect(one, two, three, four) {
    if(one === two && two === three && three === four && one !== 'rgb(128, 128, 128)' && one !== 'undefined') {
        return true;
    }
    return false;
}

function checkHorizontalWin() {
    for(var row = 0; row < 6; row ++) {
        for(var col = 0; col + 3 < 7; col ++) {
            if(checkConnect(getColor(row, col), getColor(row, col + 1), getColor(row, col + 2), getColor(row, col + 3))) {
                console.log("Horizontal Win");
                reportWin(row, col);
                return true;
            }
        }
    }
}

function checkVerticalWin() {
    for(var row = 0; row + 3 < 6; row ++) {
        for(var col = 0; col < 7; col ++) {
            if(checkConnect(getColor(row, col), getColor(row + 1, col), getColor(row + 2, col), getColor(row + 3, col))) {
                console.log("Vertical Win");
                reportWin(row, col);
                return true;
            }
        }
    }
}

function checkDiagonalWin() {
    for(var row = 0; row + 3 < 6; row ++) {
        for(var col = 0; col + 3 < 7; col ++) {
            if(checkConnect(getColor(row, col), getColor(row + 1, col + 1), getColor(row + 2, col + 2), getColor(row + 3, col + 3))) {
                console.log("Diagonal Win");
                reportWin(row, col);
                return true;
            }
        }
    }
    for(var row = 3; row < 6; row ++) {
        for(var col = 0; col + 3 < 7; col ++) {
            if(checkConnect(getColor(row, col), getColor(row - 1, col + 1), getColor(row - 2, col + 2), getColor(row - 3, col + 3))) {
                console.log("Diagonal Win");
                reportWin(row, col);
                return true;
            }
        }
    }
}

function gameEnd(winningPlayer) {
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    $('h1').text(winningPlayer + " has won! Refresh your browser to play again!").css("fontSize", "50px")
    game_on = false;
}

function gameDraw() {
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    $('h1').text("The game ended in a draw! Refresh your browser to play again!").css("fontSize", "50px")
    game_on = false;
}

var currentName = playerOne;
var currentColor = playerOneColor;

$('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");

$('.board button').on('click', function() {
    var col = $(this).closest('td').index();
    var row = checkBottom(col);
    if(getColor(row, col) === 'rgb(128, 128, 128)' && game_on === true) {
        moves ++;
        changeColor(row, col, currentColor);
        if(checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin()) {
            gameEnd(currentName);
        }
        if(moves === 42) {
            gameDraw();
        }
        if(currentColor === playerOneColor) {
            currentColor = playerTwoColor;
            currentName = playerTwo;
            $('h3').text(currentName + ": it is your turn, please pick a column to drop your red chip.");
        }
        else {
            currentColor = playerOneColor;
            currentName = playerOne;
            $('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
        }
    }
});
