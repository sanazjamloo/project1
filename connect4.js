$(function() {
    console.log( "ready!" );

var canvas = document.getElementsByTagName('canvas');
var red = 'rgba(229,96,90,0.9)';
var blue = 'rgba(84,91,173,0.9)';
turn = 1;


var Board = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0]
];

function createToken(){
  token = canvas[canvasNumber].getContext('2d');
  //alert('token clicked' + canvasClicked+token);
  token.beginPath();
  token.arc(50, 50, 45, 0, 2 * Math.PI, false);
  if(turn == 1){
    token.fillStyle = red;
  } else {
    token.fillStyle = blue;
  }
    token.fill();
}

$('.token-box').click(function() {
  if (turn > 0){      //check if the game is not over
      canvasClicked = $(this).children('canvas').attr('id');
      column = 8-((canvasClicked-1) % 7 + 1);    //subtract 1 before getting remainder otherwise last row would be 0,
      //subtract from 8 because we want the column number to start from right.

    row = 7-(Math.floor((canvasClicked-1) / 7) + 1);  //subtract from 7 because we want row number to start from bottom
    // whereas id's start from top.
    console.log(canvasClicked +' row:'+ row+ 'column:'+ column + ' it is '+ turn +' turn');

    canvasNumber = canvasClicked - 1;        //because canvas array starts at 0.

    if(row == 1 && Board[row-1][column-1] == 0){     //check if the first row and the cell is empty.
      Board[row-1][column-1] = turn;                //set cell value to players turn.
      createToken();
      if (findFourHorizontal() > 0 || findFourVertical() > 0){    //functions return 1 if they find four connected token.
          alert('Player ' + turn + ' is the winner!');
        gameOver();
      }
      changeTurn();
    } else if (Board[row-2][column-1] > 0 && Board[row-1][column-1]== 0) {  // if we are not in the first row check if
      //the cell below is filled and this cell is empty.

      Board[row-1][column-1]=turn;         //set cell value to players turn
      createToken();
        if (findFourHorizontal() > 0 || findFourVertical() > 0){
          alert('Player ' + turn + ' is the winner!');
        gameOver();
      }
      changeTurn();

    }
  }
});

//find 4 tokens connected vertically
function findFourVertical() {
  for(var i = 0; i < 6; i++){   // checks all the rows
    for(var j= 0; j < 4; j++){   // j checks the row, thre are only 4 possibilities.
  //console.log('i:'+i,'j:'+j);
      if((Board[i][j]==turn) &&
      (Board[i][j+1]==turn) &&
      (Board[i][j+2]==turn) &&
      (Board[i][j+3]==turn)){
        return 1;
      }
    }
  }
}

//find 4 tokens connected horizontally
function findFourHorizontal() {
  for(var i = 0; i < 7; i++){      // checks columns
    for(var j = 0; j < 3; j++){   // checks the ith column, there are only 3 possibilities.
      if((Board[j][i]==turn) &&
       (Board[j+1][i]==turn) &&
       (Board[j+2][i]==turn) &&
       (Board[j+3][i]==turn)){
        return 1;
      }
    }
  }
}

function changeTurn(){
  if (turn == 1){
    turn = 2;
  }
  else if (turn == 2){
    turn = 1;
  }
}

function gameOver() {
turn = 0;
}

// function clearBoard() {
// alert('clear clicked!!!');
// }

//clear the board
$("#clear").click(function(){

location.reload();
});

});
