var numSquares = 6;
var colors = [];
var pickedColor;
//select the elements
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var winBackground = document.getElementById("winBackground");
var mainButton = document.getElementById("mainButton");
var modes = document.querySelectorAll(".mode");

init();

colorDisplay.textContent = pickedColor;

//mainButton listener
mainButton.addEventListener("click",function() {
  reset();
});

function init() {
  //modes listener
  modesListeners();
  //squares listeners and logic
  squaresListeners();
  //reset the page
  reset();
}

function modesListeners() {
  for(var i=0; i<modes.length; i++) {
    modes[i].addEventListener("click",function() {
      modes[0].classList.remove("selected");
      modes[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "easy" ? numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}

function squaresListeners() {
  //all squares listeners and logic
  for(var i=0; i<squares.length; i++) {
    squares[i].addEventListener("click", function() {
      //grab color of picked square and compare it with picked color
      var clickedColor = this.style.backgroundColor;
      if(clickedColor === pickedColor) {
        messageDisplay.textContent ="Correct!";
        //make the color of the squares same as the pickedColor
        changeSquaresPickedColor(pickedColor);
        winBackground.style.backgroundColor = pickedColor;
        mainButton.textContent ="Play Again?";
      }
      else{
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent ="Try Again!";
      }
    });
  }
}

function reset() {
  colors = makeColorsArray(numSquares);
  pickedColor = pickColor(colors);
  colorDisplay.textContent = pickedColor;
  mainButton.textContent = "New colors";

  messageDisplay.textContent = "";
  for(var i = 0; i<squares.length; i++) {
      if(colors[i]) {
        squares[i].style.display="block";
        squares[i].style.backgroundColor = colors[i];
      }
      else {
        squares[i].style.display = "none";
      }
  }
  winBackground.style.background = "steelblue";
}

function changeSquaresPickedColor(color) {
  //change the squares color of the correct answer
  for(var i=0; i<squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor(colors) {
  //after the creation of colors array pick a random index from the array for the correct answer
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function makeColorsArray(len) {
  //every index of the array has random r g b values
  var arr=[];
  for(var i=0; i<len; i++) {
    //make a random color
    arr[i] = randomColor();
  }

  return arr;
}

function randomColor() {

  var random_r = Math.floor(Math.random() * 256);
  var random_g = Math.floor(Math.random() * 256);
  var random_b = Math.floor(Math.random() * 256);
  //now make the rgb(r,g,b) css format
  return ("rgb("+random_r+", "+random_g+", "+random_b+")");
}
