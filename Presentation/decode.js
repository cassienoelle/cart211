"use strict";

/*

Javascript snippet to create a 'decoder'
animation on selected text

Cassie Smith - Fall 2019
inspired by code by Lauri: https://codepen.io/bionik/pen/dzBweB

*/

let symbols;
let symbolsNoSpaces;
let $initString;
let outputString;
let displayedString;
let $decodeElement;
let characters = [];
let titles = [];
let $elements = [];
let currentTitle = 0;
let corruption = false;
let decodeRate = 30;
let $currentSlide, $previousSlide;
let $glitchText, $corruptionText;
let clearBuffer = true;


$(document).ready(function() {
    console.log("ready!");

    $glitchText = $('#error');
    $glitchText.css('opacity', '0');
    $corruptionText = $('#corruption');
    $corruptionText.css('opacity', '0');

    setTitles();
    checkAnimation();
    $(document).bind('deck.change', checkAnimation);
});


function checkAnimation() {

  clearBuffer = true;

  setTimeout(function(){  console.log('checking');
    console.log($('#what').hasClass('deck-current'));
    if ($('#what').hasClass('deck-current')) {
      currentTitle = 0;
      runAnimation($('.first'));
    }
    else if ($('#slide-4').hasClass('deck-current')) {
      currentTitle = 1;
      runAnimation($('.second'));
    }
    else if ($('#origin').hasClass('deck-current')) {
      currentTitle = 2;
      runAnimation($('#corruption'));
      $glitchText.addClass('fadeIn');
      $glitchText.css('opacity', '1');
      setTimeout(()=> {
        $corruptionText.addClass('fadeIn');
        $corruptionText.css('opacity', '0.4');
      }, 2000);
    }
    else if ($('#context').hasClass('deck-current')) {
      // corruption = false;
      // $initString = " "
      // outputString = " ";
      // characters = [];
      currentTitle = 3;
      runAnimation($('.third'));
    }
  }, 700);



}

function runAnimation(element) {
  clearBuffer = false;

  let delay = 1000;
  if (currentTitle === 2) {
    delay = 1;
  }
  $decodeElement = element;
  console.log($decodeElement);
  setStrings();

  if (!titles[currentTitle].decoded) {
    setTimeout(setDecoder, delay);
    titles[currentTitle].decoded = true;
  }
  else {
    console.log('already ran');
    if (corruption) {
      console.log('long decode');
      setDecoder();
    }
  }

}

// // init()
// //
// //
// function init() {
//   switch (currentTitle) {
//     case 0:
//       $decodeElement = $('.first');
//       break;
//     case 1:
//       $decodeElement = $('.second');
//       break;
//     case 2:
//       $decodeElement = $('#corruption');
//       break;
//     default:
//       break;
//   }
//     console.log ('decode element = ' + $decodeElement.text());
//   setStrings();
//
//   $decodeElement.click(function() {
//     console.log('click!');
//
//
//
  //   if (currentTitle === 2) {
  //     $("#corruption").css("border", "none");
  //   }
  // });
  //
  // if (corruption) {
  //     setDecoder();
  // }
// }

// setTitles()
//
//
function setTitles() {
  titles = [
    {
      start: 'wh@ 12 17?',
      finish: 'What is it?',
      decoded: false
    },

    {
      start: '0r191N2',
      finish: 'Origins',
      decoded: false
    },

    {
    start: data[0],
    finish: data[1],
    decoded: false
    },

    {
    start: 'k0N73X7',
    finish: 'Context',
    decoded: false
    }
];
}

// setStrings()
//
// set the initial string as the current leetspeak title
// set the output string as the english version of that title
// set symbols as string of combined characters of first two
// make a version of symbols without spaces so first and last character are never 'empty'
function setStrings() {
  $initString = titles[currentTitle].start;
  outputString = titles[currentTitle].finish;
  symbols = $initString + outputString;

  for (let i = 0; i < symbols.length; i++){
    if (symbols[i] == " "){
      symbolsNoSpaces = symbols.substr(0,i) + symbols.substr(i + 1);
    }
  }

  console.log('init = ' + $initString);
  console.log('output = ' + outputString);
  console.log('symbols = ' + symbols);
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
  console.log('decodeText()');

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
  console.log('clear buffer? ' + clearBuffer);
  if (!clearBuffer) {
    $decodeElement.text(displayedString);
  }


  if (decoding && !clearBuffer) {
    setTimeout(decodeText, decodeRate);
  }
  else {
    console.log('done!');
    titles[currentTitle].decoded = true;

    if (currentTitle === 2 && !clearBuffer) {
      let x = titles[currentTitle].start;
      titles[currentTitle].start = titles[currentTitle].finish;
      titles[currentTitle].finish = x;
      corruption = true;
      decodeRate = 100;
      runAnimation($('#corruption'));
    }
    else {
      decodeRate = 30;
    }
  }

}
