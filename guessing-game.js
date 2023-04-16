// all of the below is readline interface + the import itself
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

//dynamic attempt where the user decides the amount
let numAttempts;

//specifies how many attempts the user wants
askLimit = answer => {
    numAttempts = answer;
     // first question, minimum number and after this it calls asRange
    rl.question("Enter a minimum number ", askRange);
}
// the game starts here, and jumps up to Asklimit function above and then down to askRange function
rl.question("How many attempts would you like? ", askLimit);

function askRange(min) {
    // asking for max number
    rl.question("Enter a maximum number ", function answerMaxNum(max) {
        // print thinking of num between min and max num
        console.log("I'm thinking of a number between " + min + " and " + max + "...");
        // generates a random / secretnumber out of the min and max number being input
        secretNumber = randomInRange(Number(min), Number(max));
        // starts the guessing / the askGuess function which checks if the guess is higher or lower than secretNum we just generated
        rl.question("Enter a guess ", askGuess = (answer) => {
            // decrementing the guess attempts
            numAttempts--;
            // if true = prints you win and close the Readline Async function
            if (checkGuess(Number(answer)) === true) {
                console.log("You win!");
                rl.close();
                // if attempts reaches 0 the game ends
            } else if (numAttempts === 0){
                console.log("Too bad, better luck next time!")
                rl.close();
              // else it asks for more guesses
            } else {
                return rl.question("Enter a guess ", askGuess);
            }

        });
    });
}

// functon that checks if the guess is higher or lower than secretNum
let checkGuess = num => {
    if (num > secretNumber) {
        console.log("Too high");
        return false;
    } else if (num < secretNumber) {
        console.log("Too low");
        return false;
    } else {
        console.log("Correct!");
        return true;
    }
}

//random num inclusive min and max
function randomInRange(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
