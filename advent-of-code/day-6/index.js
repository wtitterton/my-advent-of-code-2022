const fs = require('fs');

const str = fs.readFileSync('./input.txt', 'utf-8');

const isUnique = (arr) => {
    return new Set(arr).size === arr.length;
}

const startOfPacketMarker = (markerLength) => {
    let slidingWindow = [];
    for(let i = 0; i < str.length; i++) {
        slidingWindow.push(str[i]);
        if(slidingWindow.length > markerLength) {
            slidingWindow.shift();
        }

        if(slidingWindow.length === markerLength && isUnique(slidingWindow)) {
            console.log(i+1);
            break;
        }
    }
}

startOfPacketMarker(4);
startOfPacketMarker(14);