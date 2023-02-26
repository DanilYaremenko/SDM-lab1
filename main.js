const readlineSync = require('readline-sync');
const { readFileSync, existsSync } = require('fs');

//solving quadratic eqation
const solveQuadraticEquation = (a, b, c) => {
    const discriminant = b * b - 4 * a * c;
    const discriminantRoot = Math.sqrt(discriminant);

    if (discriminant > 0) {
        const x1 = (-b + discriminantRoot) / (2 * a);
        const x2 = (-b - discriminantRoot) / (2 * a);
        return [x1, x2];
    } else if (discriminant == 0) {
        const x1 = (-b + discriminantRoot) / (2 * a);
        return [x1];
    } else {
        return [];
    }
}

//input values function
const askUser = (questionPrompt) => readlineSync.question(questionPrompt);

//interactive mode
const startInteractiveMode = () => {
    const questions = ['a = ', 'b = ', 'c = '];
    const answers = questions.map(element => askUser(element));

    return solveQuadraticEquation(...answers);
}

//file mode
const startFileMode = () => {
    const filePath = process.argv[2];

    if (!existsSync(filePath)) {
        console.log(`file ${filePath} does not exist`);
        process.exit(1);
    }

    const text = readFileSync(filePath, 'utf8');
    const argumentsArray = text.split(' ').map(element => Number(element));
    
    return solveQuadraticEquation(...argumentsArray);
}

//main starter condition
if (process.argv.length === 2) {
    startInteractiveMode();
} else if (process.argv.length === 3) {
    startFileMode();
}
