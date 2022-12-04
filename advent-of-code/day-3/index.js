const fs = require('fs');
const { uptime } = require('process');
const readline = require('readline');

const readStream = fs.createReadStream('./input.txt', 'utf-8');
let rl = readline.createInterface({input: readStream});

const readFileContents = (cb) => {
    const strings = [];
    rl.on('line', (line) => {
       // split string into to parts
       // find matching letter in each part
       // translate letter into priority (a - z) 1-26 (A - Z) 27 - 52
       // sum these values
       strings.push(line);
    });

    rl.on('close', () => {
      cb(strings);
    })
}

const splitStringInHalf = (str) => {
    const middle = str.length / 2;
    return [str.substring(0, middle), str.substring(str.length - middle , str.length)];      
}

const findMatchingLetterBetweenTwoStrings = (str1, str2) => {
    const letterMap = str2.split("").reduce((o, key) => ({ ...o, [key]: key}), {});
    const matchingLetters = [];
    const st1Letters = str1.split("");

    st1Letters.forEach((letter) => {
        if(letterMap.hasOwnProperty(letter) && !matchingLetters.includes(letter)) {
            matchingLetters.push(letter);
        }
    });
    return matchingLetters;
}

const findNumberOfMatchingOccurancesBetweenStrings = (strings) => {
    const firstString = strings[0];
    const letterMap = firstString.split("").reduce((o, key) => ({ ...o, [key]: 0}), {});
    strings.forEach((str) => {
        const strArr = str.split("");
        const alreadySeen = [];
        for(const letter of strArr) {
            if(letterMap.hasOwnProperty(letter) && !alreadySeen.includes(letter)) {
                alreadySeen.push(letter);
                letterMap[letter] = letterMap[letter] += 1;
            }
        }
    });

    return letterMap;
}

const converLetterToPriority = (letter) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    return  alphabet.indexOf(letter) + 1;
}

const partOneAlgorithm = (strings) => {
    return strings.reduce((acc, str) => {
        const [st1, str2] = splitStringInHalf(str);
        const matchingLetters = findMatchingLetterBetweenTwoStrings(st1, str2)
        return acc + converLetterToPriority(...matchingLetters)
    }, 0)
}

const chunkArray = (inputArray, chunkSize) => {
    return inputArray.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/chunkSize)

    if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
    }, [])
}

const getOccurenceEqualToGroupSize = (ocuurences, groupSize) => {
    let res = "";
    for (const occurence in ocuurences) {
        if(ocuurences[occurence] === groupSize) {
           res = occurence;
           break;
        }
    }

    return res;
}

const partTwoAlgorithm = (strings) => {
    const chunkedArray = chunkArray(strings, 3);   
    return chunkedArray.reduce((acc, group) => {
        const ocuurences = findNumberOfMatchingOccurancesBetweenStrings(group);
        const groupId = getOccurenceEqualToGroupSize(ocuurences, group.length)
        return acc + converLetterToPriority(groupId)
    }, 0)
}

const getResults = (strings) => {
   const partOneData = [...strings];
   const partTwoData = [...strings];
   const totalSumOfPriorities = partOneAlgorithm(partOneData);
   console.log(totalSumOfPriorities);
   const totalPriorityOfGroups = partTwoAlgorithm(partTwoData);
    console.log(totalPriorityOfGroups);
}

readFileContents(getResults);
