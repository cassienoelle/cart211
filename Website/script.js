/*
Website Title: Exoplanet
Author: Cassie Smith
Date: Fall 2019

Main JS for Assignment One, CART 211
Professor: Dr. Olivier Sorrentino
Concordia University
*/

"use strict";

let welcomeMessage;
let message;
let insertMessage;

document.addEventListener('DOMContentLoaded', ()=> {

  console.log('ready');
  message = [
    'Hello ',
    '',
    'World'
  ];
  insertMessage = 'Other ';

  welcomeMessage = document.getElementById('hello');
  displayMessage();

  setTimeout(()=>{
    animateWelcome();
  },2000);
});

function displayMessage() {
  welcomeMessage.innerHTML = message[0] + message[1] + message[2];
}

function animateWelcome() {
  let i = 0;
  let max = insertMessage.length;
  let insertChar;

  let cycle = setInterval(()=>{
    insertChar = insertMessage.charAt(i);
    message[1] += insertChar;
    displayMessage();
    i++;

    if (i === max) {
      clearInterval(cycle);
      console.log('done!');
    }
  }, 1000);

}
