
function sayHello() {
  let message1 = document.getElementById("name").value;
  let message2 = document.getElementById("name2").value;
  let message3 = message1 + " " + message2;
  document.getElementById("helloTo").innerHTML = message3;
}
