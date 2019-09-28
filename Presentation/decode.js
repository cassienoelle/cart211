"use strict";

/*

Javascript snippet to create a 'decoder'
animation on selected text

Cassie Smith - Fall 2019

*/

let $randomString = "";
let $symbols = '$%#@*!378'
let $initString;
let $outputString;
let $currentChar;
let $currentSlide;
let $decodeElement;
let clicked = false;
let decodedIndexes = [];

$(document).ready(function() {
    console.log("ready!");
    $decodeElement = $(".decode");
    $currentSlide = $(".deck-current");

    $decodeElement.click(function() {
      console.log('click!');

      if (!clicked) {
        setStrings();
        generateRandomString($outputString);
        decodeText();
        clicked = true;
      }
      else {
        console.log('already clicked');
      }
    });

});

// setStrings()
//
// set the initial string as the current leetspeak title
// set the output string as the english version of that title
function setStrings() {
  $initString = $decodeElement.text();
  $outputString = "What is it?";
  console.log('init = ' + $initString);
  console.log('output = ' + $outputString);
}

// generateRandomString()
//
//
function generateRandomString(str) {
  $randomString = "";
  let numChars = str.length;
  console.log('chars needed: ' + numChars);

  for (let i = 0; i < str.length; i++) {
    let r = Math.floor(Math.random() * $symbols.length);
    $randomString += $symbols.charAt(r);
    console.log($randomString);
  }
}

// decodeText()
//
//
function decodeText() {
  decodedIndexes = [];
  let possibleIndexes = [];

  for (let i = 0; i < $outputString.length; i++) {
    possibleIndexes.push(i);
  }

  console.log('okay! possible indexes is: ' + possibleIndexes);
  let timing = setInterval(function() {
    console.log('init length = ' + $initString.length);
    console.log('out length = ' + $outputString.length);


      let r = possibleIndexes[Math.floor(Math.random() * possibleIndexes.length)];
      console.log('r = ' + r);
      console.log('includes? ' + decodedIndexes.includes(r));


      if (decodedIndexes.includes(r) == false) {
        $initString = setCharAt($initString,r,$randomString.charAt(r));
        decodedIndexes.push(r);
        $(".decode").text($initString);
      }
      else {
        $initString = setCharAt($initString,r,$outputString.charAt(r));
        $(".decode").text($initString);
        possibleIndexes.splice(findIndex(possibleIndexes,r), 1);
        console.log('possible = ' + possibleIndexes);
        // console.log('includes');
        // console.log(decodedIndexes);
        // console.log('init length: ' + $initString.length + 'decodedIndex length: ' + decodedIndexes.length);
      }

      if ($initString == $outputString) {
        console.log('init = ' + $initString);
        console.log('output = ' + $outputString);
        clearInterval(timing);
        console.log('cleared');
      }
  }, 500);
}

function setCharAt(str,index,chr) {
    // if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function findIndex(array, value) {
  for(let i = 0; i < array.length; i++){
    if (array[i] === value) {
      return i;
    }
  }
}
