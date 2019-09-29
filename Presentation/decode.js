"use strict";

/*

Javascript snippet to create a 'decoder'
animation on selected text

Cassie Smith - Fall 2019
inspired by code by Lauri: https://codepen.io/bionik/pen/dzBweB

*/

let $randomString = "";
let symbols;
let symbolsNoSpaces;
let $initString;
let outputString;
let displayedString;
let $currentSlide;
let $decodeElement;
let clicked = false;
let characters = [];

$(document).ready(function() {
    console.log("ready!");
    $decodeElement = $(".decode");
    $currentSlide = $(".deck-current");

    $decodeElement.click(function() {
      console.log('click!');

      if (!clicked) {
        setStrings();
        generateRandomString(outputString);
        setDecoder();
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
// set symbols as string of combined characters of first two
// make a version of symbols without spaces so first and last character are never 'empty'
function setStrings() {
  $initString = $decodeElement.text();
  outputString = "What is it?";
  symbols = $initString + outputString;

  for (let i = 0; i < symbols.length; i++){
    if (symbols[i] == " "){
      symbolsNoSpaces = symbols.substr(0,i) + symbols.substr(i + 1);
    }
  }

  console.log('init = ' + $initString);
  console.log('output = ' + outputString);
}


function setCharAt(str,index,chr) {
    // if(index > str.length-1) return str;
    return str.substr(0,index) + str.substr(index+1);
}

// generateRandomString()
//
//
function generateRandomString(str) {
  $randomString = "";
  let numChars = str.length;
  console.log('chars needed: ' + numChars);

  for (let i = 0; i < str.length; i++) {
    let r = Math.floor(Math.random() * symbols.length);
    $randomString += symbols.charAt(r);
    console.log($randomString);
  }
}

// setDecoder()
//
//
function setDecoder() {
  characters = [];

  for (let i = 0; i < outputString.length; i++) {
    characters.push({
      countdown: Math.floor(Math.random() * 10),
      final: outputString.charAt(i)
    });
  }

  console.log(characters);
  decodeText();
}

// decodeText()
//
//
function decodeText() {
  let decoding = false;
  let displayedString = "";

  for (let i = 0; i < characters.length; i++) {
    let currentChar = characters[i];

    if (currentChar.countdown > 0) {
      currentChar.countdown--;
      decoding = true;

      if (i === 0 || i === characters.length - 1) {
        displayedString += symbolsNoSpaces[Math.floor(Math.random() * symbolsNoSpaces.length)];
      } else {
        displayedString += symbols[Math.floor(Math.random() * symbols.length)];
      }

    }
    else {
      displayedString += currentChar.final;
    }
  }

  $decodeElement.text(displayedString);

  if (decoding) {
    setTimeout(decodeText, 25);
  }
  else {
    console.log('done!');
  }

}


//
// // decodeTextArchived()
// //
// //
// function decodeTextArchived() {
//   decodedIndexes = [];
//   let possibleIndexes = [];
//
//   for (let i = 0; i < outputString.length; i++) {
//     possibleIndexes.push(i);
//   }
//
//   console.log('okay! possible indexes is: ' + possibleIndexes);
//   let timing = setInterval(function() {
//     console.log('init length = ' + $initString.length);
//     console.log('out length = ' + outputString.length);
//
//
//       let r = possibleIndexes[Math.floor(Math.random() * possibleIndexes.length)];
//       console.log('r = ' + r);
//       console.log('includes? ' + decodedIndexes.includes(r));
//
//
//       if (decodedIndexes.includes(r) == false) {
//         $initString = setCharAt($initString,r,$randomString.charAt(r));
//         decodedIndexes.push(r);
//         $(".decode").text($initString);
//       }
//       else {
//         $initString = setCharAt($initString,r,outputString.charAt(r));
//         $(".decode").text($initString);
//         possibleIndexes.splice(findIndex(possibleIndexes,r), 1);
//         console.log('possible = ' + possibleIndexes);
//         // console.log('includes');
//         // console.log(decodedIndexes);
//         // console.log('init length: ' + $initString.length + 'decodedIndex length: ' + decodedIndexes.length);
//       }
//
//       if ($initString == outputString) {
//         console.log('init = ' + $initString);
//         console.log('output = ' + outputString);
//         clearInterval(timing);
//         console.log('cleared');
//       }
//   }, 50);
// }
