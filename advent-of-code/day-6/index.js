const fs = require('fs');

const str = fs.readFileSync('./input.txt', 'utf-8');

const isUnique = (arr) => {
    return new Set(arr).size === arr.length;
}

const startOfPacketMarker = (markerLength) => {
    let slidingWindow = [];
    for(let i = 0; i < str.length; i++) {
        slidingWindow.push(str[i]);
        if(slidingWindow.length >= markerLength) {
            slidingWindow.shift();
        }

        if(slidingWindow.length === markerLength && isUnique(slidingWindow)) {
            console.log(i+1);
            break;
        }
    }
}


// Another sliding window example
const maxSubArraySum = (arr, size) => {
    let currSum = 0;
    let maxSumSeen = -Infinity // incase of negative numbers

    for(let i = 0; i < arr.length; i++) {
        currSum += arr[i]
        // check to see if we should start moving the window along by one
        if(i >= size - 1) {
            maxSumSeen = Math.max(currSum, maxSumSeen);
            // sumbract the value of 1st element in window e.g. 1 (1,2,3)
            currSum -= arr[i - (size - 1)];
        }
    }

    return maxSumSeen;
}

console.log(maxSubArraySum([1,2,3,4,5,6], 2));

startOfPacketMarker(4);
startOfPacketMarker(14);