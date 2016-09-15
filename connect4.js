
$(document).ready(function(){

var canvas = document.getElementsByTagName('canvas');
var red = 'rgb(250,0,0)';
var blue = 'rgb(0,0,255)';
var white = 'white';
turn = 'Player 1'
function createToken(){
  token = canvas[canvasNumber].getContext('2d');
  //alert('token clicked' + canvasClicked+token);
  token.beginPath();
  token.arc(50, 50, 45, 0, 2 * Math.PI, false);
  if(turn=='Player 1'){
    token.fillStyle = red;
    turn='Player 2';
  } else{
    token.fillStyle = blue;
    turn='Player 1';
  }

  token.fill();
}

$(canvas).click(function() {
  canvasClicked = $(this).attr('id');
  canvasNumber = canvasClicked-1;
  // canvasAboveId = $(this).attr('id')-7;
  // canvasAbove = $(this).parent().parent().prev().find('#' + canvasAboveId);
  createToken();
});
});
