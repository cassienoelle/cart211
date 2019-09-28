"use strict";

/*

Javascript snippet to create a 'decoder'
animation on selected text

Cassie Smith - Fall 2019

*/

let $firstString;
let $secondString;
let $currentChar;
let $currentSlide;
let $decodeElement;

$(document).ready(function() {
    console.log("ready!");
    $decodeElement = $(".decode");

    console.log($decodeElement.text());
});



// pseudo-CODE

// variables for first string, second string, current char
// select title of current slide
// if it has a class of "decode" run code
//
