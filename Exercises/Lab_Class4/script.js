"use strict";

let input;
let result;
let container;
let greeting;

document.addEventListener("DOMContentLoaded", ()=> {
  console.log('ready');
  container = document.getElementById("hello");
  input = document.getElementById("inputName");
  result = document.getElementById("result");

  container.style.width = (input.offsetWidth * 2) + "px";
  result.style.width = input.offsetWidth;
  result.classList.add("hide");

  console.log(input.offsetWidth);
  console.log(result.offsetWidth);
  console.log(result.classList);
})

function sayHello() {
  let message1 = document.getElementById("firstName").value;
  let message2 = document.getElementById("lastName").value;
  result.classList.remove("hide");
  result.style.width = input.offsetWidth + "px";
  document.getElementById("helloTo").innerHTML = message1 + "<br/>" + message2;
}
