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
let alienText;
let introLinkPath;
let introLinkText;
let animationComplete;

document.addEventListener('DOMContentLoaded', ()=> {

  console.log('ready');
  setupIntro()
  // Update DOM
  displayMessage();

  // Animate on delay
  setTimeout(()=>{
    animateWelcome();
  },3000);

});

// setupIntro()
//
// Set initial variables
function setupIntro() {
  // Message to display
  message = [
    'hello ',
    '',
    'world'
  ];
  // Word to insert in middle of message
  insertWord = 'other';
  alienText = 'σƚɥҽɾ';
  // Select DOM element to display message
  welcomeMessage = document.getElementById('hello');
  // Set link path to next page
  introLinkPath = "menu.html";
  // Control for appending link to message
  animationComplete = false;
}

// displayMessage()
//
// Concatenates words to form message and displays message
// Sets different styling for inserted word and adds link
function displayMessage() {

  welcomeMessage.innerHTML = message[0] + '<span id="other">' + message[1] + '</span>' + message[2];
  introLinkText = welcomeMessage.querySelector('.message > span#other');
  introLinkText.style.color = '#d9441e';

  console.log('animation complete? ' + animationComplete);

  if (animationComplete) {
    appendLink(introLinkText, introLinkPath);
    alienTextHover(introLinkText);
  }

}

// appendLink(element, path)
//
//
function appendLink(element, path) {
  console.log('append!');
  let el = element;
  let href = path;
  let wrapper = document.createElement('a');

  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
  wrapper.href = href;
}

// alienTextHover ()
//
//
function alienTextHover (link) {
  let l = link;
  l.addEventListener('mouseover', ()=>{
    l.innerHTML = alienText;
    l.style.letterSpacing = '-0.028em';
  });

  l.addEventListener('mouseout', ()=>{
    l.innerHTML = insertWord;
    l.style.letterSpacing = 'normal';
  })
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
    // and append link to inserted word
    if (i === maxInterval) {
      clearInterval(cycle);
      animationComplete = true;
      message[2] = " " + message[2];
      displayMessage();
      console.log('done!');
    }
  }, timing);

}
