const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//min max for FIRST ROUND
let min = 1;
let max = 100;


//GAME
console.log(
  "Let's play a game where you (human) make up a number and I (computer) try to guess it.\n To begin, please think of any number between 1-100."
);

async function start() {
  let firstA = await ask(
    "Are you ready to play? Please use 'Y' for Yes and 'N' for No.\n "
  );
  firstA = trim(firstA);
  //trims and capitalizes firstA
  if (firstA === "Y") {
    console.log("Welcome, let's proceed! My first guess is... ");
  }
  if (firstA !== "Y") {
    console.log("Hmmmmm....");
    process.exit();
  }
//GUESSING BEGINS
  let compGuess = getSmartInt(min, max);

  let numAsk = await ask("Is it " + compGuess + " ?\n");
  

  while (numAsk === "N") {
    let userDir = await ask("Is it higher 'H' or lower 'L' ?\n");
    userDir = trim(userDir);
    if (userDir === "H") {
      min = compGuess;
      compGuess = getSmartInt(compGuess, max);
      numAsk = await ask("Is it " + compGuess + " ?\n");
    }
    if (userDir === "L") {
      max = compGuess;
      compGuess = getSmartInt(min, compGuess);
      numAsk = await ask("Is it " + compGuess + " ?\n");
    }
  }

  // IF YES, Second ROUND

  //SECOND ROUND!!
  if (numAsk === "Y") {
    console.log(
      "\nYay, I win!\n ...\n ... One step closer to being human....\n"
    );
    let secA = await ask(
      "Would you like to play again? 'Y' for yes. 'N' for no.\n"
    );
    if (secA === "Y") {
      console.log("Welcome, let's proceed!");
    }
    if (secA === "N") {
      console.log("Hmmmmm....\n*cough* *cough*\n...sore loser!");
      process.exit();
    }
  }

  console.log("This time you will set the range\n");
  //Now setting new mins/maxs
  newMin = await ask("What is the minimum number? ");
  newMax = await ask("What is the maximum number? ");
  ///is new smartInt needed?
  newMin = +newMin
  newMax = +newMax
  console.log(newMin);
  console.log(newMax);
//insure we have numbers with +
  
  let compGuessA = getSmartIntA(newMin, newMax);
  compGuessA = +compGuessA

  let numAskA = await ask("Is it " + compGuessA + " ?");
//first number guess using smartint

//second round number guesses
  while (numAskA === "N") {
    let userDir = await ask("Is it higher 'H' or lower 'L' ?\n");
    userDir = trim(userDir);
    if (userDir === "H") {
      newMin = +compGuessA;
      compGuessA = getSmartIntA(compGuessA, newMax);
      console.log (compGuessA)
      numAskA = await ask("Is it " + +compGuessA + " ?\n");
    }
    if (userDir === "L") {
      newMax = +compGuessA;
      compGuessA = getSmartIntA(newMin, compGuessA);
      numAskA = await ask("Is it " + +compGuessA + " ?\n");
    }
  }

  //END OF (WHILE NO) - ON TO FINAL
if (numAskA === "Y") {
  console.log ("I win again! I am so smart! That is all, goodbye!")
  process.exit()
} 
}
start();

//NEED TO TRIM second round
//trim and capitalizes all user answers
function trim(word) {
  let trimmy = word.trim().toUpperCase();
  return trimmy;
}

//first round smart int
function getSmartInt(min, max) {
  let range = Math.floor((min + max) / 2);

  return range;
}

//second round smart int
function getSmartIntA(min, max) {
  min = +newMin;
  max = +newMax;
  let range = Math.floor((+newMin + +newMax) / 2);
  return range;
}

