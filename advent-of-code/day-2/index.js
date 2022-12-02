// if both values are the same it's a draw
const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./strategy.txt', 'utf-8');
let rl = readline.createInterface({input: readStream});
let myScorePartOneLogic = 0;
let myScorePartTwoLogic = 0;

const pointsForOutcome = {
    lose: 0,
    draw: 3,
    win: 6,
}

const handToOutcome = {
    X: "lose",
    Y: "draw",
    Z: "win"
}

const outcomes = {
    rock: {
        rock: "draw",
        paper: "win",
        scissors: "lose"
    },
    paper: {
        rock: "lose",
        paper: "draw",
        scissors: "win"
    },
    scissors: {
        rock: "win",
        paper: "lose",
        scissors: "draw"
    },
}

const pointsForHand = {
    rock: 1,
    paper: 2,
    scissors: 3,
}

const availableMoves = {
    A: "rock",
    B: "paper",
    C: "scissors",
    X: "rock",
    Y: "paper",
    Z: "scissors"
}

const partOneLogic = (theirMove, yourMove) => {
    const outcome = outcomes[theirMove][yourMove];
    myScorePartOneLogic += (pointsForHand[yourMove] + pointsForOutcome[outcome]);
}

const partTwoLogic = (theirMove, yourMove) => {
    const outcome = handToOutcome[yourMove];
    let correctHand;
    for(const possibleMoves in outcomes[theirMove]) {
        if(outcomes[theirMove][possibleMoves] === outcome) {
          correctHand = possibleMoves;
        }
    }

    myScorePartTwoLogic += (pointsForHand[correctHand] + pointsForOutcome[outcome]);
}

rl.on('line', (line) => {
    const plays = line.split(" ");
    const yourMoveRawValue = plays[1];
    const theirMove = availableMoves[plays[0]];
    const yourMove = availableMoves[plays[1]];

    partOneLogic(theirMove, yourMove);
    partTwoLogic(theirMove, yourMoveRawValue);
});

rl.on('close', () => {
  console.log("part one result:", myScorePartOneLogic);
  console.log("part two result:", myScorePartTwoLogic);
})
