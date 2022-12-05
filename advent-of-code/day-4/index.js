const fs = require('fs');
const readline = require('readline');
const readStream = fs.createReadStream('./input.txt', 'utf-8');
let rl = readline.createInterface({input: readStream});

const readFileContents = (cb) => {
    const ranges = [];
    rl.on('line', (line) => {
      const pairing = line.split(',');
      ranges.push([
       createRangeObject(pairing[0]),
       createRangeObject(pairing[1])
      ])
    });

    rl.on('close', () => {
      cb(ranges);
    })
}

const createRangeObject = (range) => {
    const values = range.split('-');
    return {
        start: Number(values[0]),
        end: Number(values[1])
    }
}

const rangesContained = (r1, r2) => {
  const isFirstRangeOverlaping = r1.start >= r2.start && r1.end <= r2.end;
  const isSecondRangeOverlapping = r2.start >= r1.start && r2.end <= r1.end;
  return isFirstRangeOverlaping || isSecondRangeOverlapping;
}

const rangesOverlap = (r1, r2) => {
  return r1.start <= r2.end && r1.end >= r2.start
}

const getResults = (ranges) => {
  const numberOfFullyOverlappingRanges = ranges.reduce((acc, range) => {
    if(rangesContained(range[0], range[1])) {
        return acc + 1
    }
    return acc;
  }, 0)

   const anyOverlapsAtAll = ranges.reduce((acc, range) => {
    if(rangesOverlap(range[0], range[1])) {
        return acc + 1
    }
    return acc;
  }, 0)

  console.log(numberOfFullyOverlappingRanges);
   console.log(anyOverlapsAtAll);
}

readFileContents(getResults)