const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./elf-calories.txt', 'utf-8');
let rl = readline.createInterface({input: readStream});

let currentCaloryCount = 0;
let currentElfCount = 0;
let elfCalories = [];

 rl.on('line', (line) => {
     if (line.length === 0) {
        currentElfCount++;

        elfCalories.push({
            id: currentElfCount,
            caloryCount: currentCaloryCount
        })
        currentCaloryCount = 0;
        return;
    }

     currentCaloryCount = currentCaloryCount + Number.parseInt(line, 10);
   });

   rl.on('close', function() {
    elfCalories.sort(function(a, b) {
        return b.caloryCount - a.caloryCount 
    });
    const topThreeElves = elfCalories.slice(0, 3);

    topThreeElves.forEach(({id, caloryCount}) => {
        console.log(`elf ${id} has ${caloryCount} calories`);
    })

    const totalCalories = topThreeElves.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.caloryCount
    }, 0)

    console.log(totalCalories);
   })

   