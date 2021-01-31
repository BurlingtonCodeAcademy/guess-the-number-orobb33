const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//always 1-100
let min = 1;
let max = 100;

//random compguess generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

console.log(
  "Let's play a game where I (the computer) make up a number and you (the supposed human) try to guess it. \n I will think of a number between 1-100.\n"
);

async function start() {
  let firstA = await ask(
    "Do you think you can handle that? Please use Y for yes and N for no.\n"
  );
  firstA = trim(firstA);

  if (firstA === "Y") {
    console.log("Welcome, let's proceed!\n");
  }
  if (firstA === "N") {
    console.log("Seems about right... goodbye");
    process.exit();
  }
//compGen is random generated number
  let compGen = getRandomInt(min, max);
  compGen = +compGen;
  //console.log(+compGen);
//insures it is number
  let userGuess = await ask("What is your first guess?\n");
  userGuess = +userGuess;
  //stores number and makes sure its number

  //while (userGuess !== compGen) {
  while (userGuess !== compGen) {
    //maybe let / await ask function

    if (userGuess < compGen) {
      userGuess = await ask(
        "Incorrect, the number is higher. Please guess again.\n"
      );
      //console.log (userGuess)
    }
    if (userGuess > compGen) {
      userGuess = await ask(
        "Incorrect, the number is lower. Please guess again.\n"
      );
      //console.log (userGuess)
    } else if (userGuess == compGen) {
      console.log("Congratulations! You have proved yourself...for now");
      process.exit();
    }
  }
}
start();

//trim funciton
function trim(word) {
  let trimmy = word.trim().toUpperCase();
  return trimmy;
}