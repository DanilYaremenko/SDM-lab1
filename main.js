const readlineSync = require('readline-sync');
const { readFileSync, existsSync } = require('fs');

let result = [];

//solving quadratic eqation
const solveQuadraticEquation = (a, b, c) => {
    const discriminant = b * b - 4 * a * c;
    const discriminantRoot = Math.sqrt(discriminant);

    console.log(`Equation is: (${a}) x^2 + (${b}) x + (${c}) = 0`);

    if (discriminant > 0) {
        const x1 = ((-b + discriminantRoot) / (2 * a)).toFixed(1);
        const x2 = ((-b - discriminantRoot) / (2 * a)).toFixed(1);
        result = [x1, x2];
    } else if (discriminant === 0) {
        const x1 = ((-b + discriminantRoot) / (2 * a)).toFixed(1);
        result = [x1];
    } else {
        result = [];
    }
    showTheAnswer(result);
}

//showing the result
const showTheAnswer = (arr) => {
    const numRoots = arr.length;

    console.log(`There are ${numRoots} roots`);
    
    if (numRoots === 2) {
        console.log(`x1 = ${arr[0]}`);
        console.log(`x2 = ${arr[1]}`);
    } else if (numRoots === 1) {
        console.log(`x1 = ${arr[0]}`);
    } else {
        return;
    }
    
}

//input values function
const askUser = (questionPrompt) => {
    let input = readlineSync.question(questionPrompt);

    while (isNaN(input)) {
        console.log('Error. Expected a valid real number, got invalid instead');
        input = readlineSync.question(questionPrompt);
    }

    if (questionPrompt === 'a = ' && input === '0') {
        console.log('Error. a cannot be 0');
        input = askUser(questionPrompt);
    }

    return input;
} 

//interactive mode
const startInteractiveMode = () => {
    const questions = ['a = ', 'b = ', 'c = '];
    const answers = questions.map(element => askUser(element));

    return solveQuadraticEquation(...answers);
}

//file mode
const startFileMode = () => {
    const filePath = process.argv[2];
    const fileExists = existsSync(filePath);

    if (!fileExists) {
        console.log(`file ${filePath} does not exist`);
        process.exit(1);
    }

    const text = readFileSync(filePath, 'utf8');
    const argumentsArray = text.split(' ').map(element => Number(element));

    if (argumentsArray.length !== 3) {
        console.log('invalid file format');
        process.exit(1);
    }

    if (argumentsArray[0] === 0) {
        console.log('Error. a cannot be 0');
        process.exit(1);
    }

    return solveQuadraticEquation(...argumentsArray);
}

//main starter condition
if (process.argv.length === 2) {
    startInteractiveMode();
} else if (process.argv.length === 3) {
    startFileMode();
}
