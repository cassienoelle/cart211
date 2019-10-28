"use strict";


let instructions;
let diceNumber;
let diceNumber2;
let diceImage;
let diceImage2;
let nextImage;
let diceface;

document.addEventListener("DOMContentLoaded", function() {
  instructions = document.getElementById('instructions');
  diceNumber = document.getElementById('diceNumber');
  diceNumber2 = document.getElementById('diceNumber2');
  diceImage = document.getElementById('diceImage');
  diceImage2 = document.getElementById('diceImage2');

  instructions.addEventListener('click', ()=> {
    throwDice();
  })
});

function throwDice() {
  console.log('thrown');
  diceface = Math.floor(Math.random() * 6 + 1);
  diceNumber.innerHTML = diceface;
  nextImage = 'assets/img/dice' +  diceface + '.jpg';
  diceImage.src = nextImage;

  diceface = Math.floor(Math.random() * 6 + 1);
  diceNumber2.innerHTML = diceface;
  nextImage = 'assets/img/dice' +  diceface + '.jpg';
  diceImage2.src = nextImage;
}
