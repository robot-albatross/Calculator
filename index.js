//Calculator Operations

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function division(a,b) {
    return Math.round((a / b) * 100) / 100;
}

function operate(operation, a, b) {
    operation(a,b);
}

//keys events

buttons = document.querySelector(".buttons");
console.log(buttons);

