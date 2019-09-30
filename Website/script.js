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
let insertWord;
let introLink;

document.addEventListener('DOMContentLoaded', ()=> {

  console.log('ready');
  // Set words in message
  message = [
    'hello ',
    '',
    'world'
  ];
  // Word to insert in middle of message
  insertWord = 'other ';
  // Select DOM element to display message and store in variable
  welcomeMessage = document.getElementById('hello');
  // Update element
  displayMessage();

  // Animate on delay
  setTimeout(()=>{
    animateWelcome();
  },3000);

});

// displayMessage()
//
// Concatenates words to form message and displays
// Sets different styling for inserted word
function displayMessage() {

  welcomeMessage.innerHTML = message[0] + '<span id="other">' + message[1] + '</span>' + message[2];
  introLink = welcomeMessage.querySelector('.message > span#other');
  introLink.style.color = '#d9441e';

}

// animateWelcome()
//
// Runs animation inserting word in middle of message, one char at a time
function animateWelcome() {

  let i = 0;
  let maxInterval = insertWord.length;
  let insertChar;

  // Calls interval at random periods
  // between 50-100ms to better simulate natural typing
  let min = 50;
  let max = 100;
  let timing = Math.floor(Math.random() * (max - min + 1) ) + min;

  // Each interval, insert one character
  let cycle = setInterval(()=>{
    insertChar = insertWord.charAt(i);
    message[1] += insertChar;
    displayMessage();
    i++;

    // Clear interval when full word has been inserted
    if (i === maxInterval) {
      clearInterval(cycle);
      console.log('done!');
    }
  }, timing);

}
