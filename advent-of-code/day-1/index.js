const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./elf-calories.txt', 'utf-8');
let rl = readline.createInterface({input: readStream});

const readFileContents = (cb) => {
   let currentCaloryCount = 0;
   let currentElfCount = 0;
   let elves = [];
    rl.on('line', (line) => {
        if (line.length === 0) {
            currentElfCount++;
            elves.push({
                id: currentElfCount,
                caloryCount: currentCaloryCount
            })
            currentCaloryCount = 0;
            return;
        }

        currentCaloryCount = currentCaloryCount + Number.parseInt(line, 10);
    });

    rl.on('close', () => {
      cb(elves);
    })
}

const getTopThreeElves = (elves) => {
    return elves.sort(function(a, b) {
        return b.caloryCount - a.caloryCount 
    }).slice(0, 3);  
}

const getTotalCalories = (elves) => {
    return elves.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.caloryCount
    }, 0)
}

const printElf = ({id, caloryCount}) => {
  console.log(`elf ${id} has ${caloryCount} calories`);
}

const getResults = (elves) => {
    const topThreeElves = getTopThreeElves(elves);
    console.log(`The top three elves are carrying a total of ${getTotalCalories(topThreeElves)} calories`)
    topThreeElves.forEach(printElf);
}

readFileContents(getResults);




   