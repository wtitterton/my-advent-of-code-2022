const fs = require('fs');

class Stack {
    constructor()
    {
        this.items = [];
    }

    unShift(item) {
        this.items.unshift(item);
    }

    shift() {
        if (this.items.length == 0) {
            return "Underflow";
        }
       
        return this.items.shift();
    }

    removeMany(number) {
        const copy = this.items.slice();
        this.items = this.items.slice(number, this.items.length);
        return copy.slice(0, number);
    }

    putMany(items) {
        this.items = [...items, ...this.items];
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length == 0;
    }

    printStack()
    {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}

const createStacks = (data) => {
    const stacks = {}
    data.forEach(stack => stacks[stack.id] = createStack(stack) );
    return stacks;
}

const createStack = (stackData) => {
    const stack = new Stack();
    stack.putMany(stackData.items);
    return stack;
}

const interpretInstruction = (instruction) => {
    var regex = /\d+/g;
    var numbers = instruction.match(regex);
    return {
        amount: numbers[0],
        from: numbers[1],
        to: numbers[2]
    }
}

const moveCrate = (stacks, amount, from, to, shoudReverse = true) => {
    const source = stacks[from];
    const destination = stacks[to];

    const removed = source.removeMany(amount);

    const items = shoudReverse ? removed.reverse() : removed;

    destination.putMany(items);
}

const getTopCrates = (stacks) => {
    const items = [];

    for(const stack in stacks) {
        items.push(stacks[stack].shift());
    }

    return items;
}

const rawData = fs.readFileSync('crates.json', 'utf8');
const json = JSON.parse(rawData);
const instructions = fs.readFileSync('instructions.txt', 'utf8').split('\n');

const partOne = () => {
    const newStack = createStacks(json);
    instructions.forEach((instruction) => {
        const {amount, from, to} = interpretInstruction(instruction);
        moveCrate(newStack, amount, from, to, true);
    });
   return getTopCrates(newStack);
}

const partTwo = () => {
    const newStack = createStacks(json);
    instructions.forEach((instruction) => {
        const {amount, from, to} = interpretInstruction(instruction);
        moveCrate(newStack, amount, from, to, false);
    });
   return getTopCrates(newStack);
}

console.log(partOne());
console.log(partTwo());


