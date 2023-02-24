//Calculator Operations

function add(a,b) {
    if ((a === undefined && b === undefined)) {
        return 0;
    }
    if (b === undefined) {
        return a;
    }
    return a + b;
}

function subtract(a,b) {
    if ((a === undefined && b === undefined)) {
        return 0;
    }
    if (b === undefined) {
        return a;
    }

    if (a < 0) {
        return -1*(Math.abs(a) - Math.abs(b));
    } else if ((b < 0) && (a < 0)) {
        return -1*(Math.abs(a) + Math.abs(b));
    } else {
        return Math.abs(b) - Math.abs(a);
    }
}

function multiply(a,b) {
    if ((a === undefined && b === undefined)) {
        return 0;
    }
    if (b === undefined) {
        return a;
    }
    return a * b;
}

function division(a,b) {
    if ((a === undefined && b === undefined)) {
        return 0;
    }
    if (b === undefined) {
        return a;
    }

    if (a === 0) {
        clearButton = document.querySelector(".clear");
        clearButton.click();
        setTimeout(() => {alert("STOP RIGHT THERE CRIMINAL SCUM!");},1000);
        return 0;
    }

    if (b/a < 1) {
        return Math.round(b/a * 100) / 100;
    } else {
        return b/a;
    }
}

//Make the operation
function configureMathSignButton(operation) {
    displayValues.currentDisplayValue = Number(display.innerHTML);
    display.innerHTML = operation(displayValues.currentDisplayValue, displayValues.pastDisplayValue).toString();
}
function selectOperation(symbol) {
    console.log(symbol);
    if (symbol === "+") {
        configureMathSignButton(add);
    }    
    if (symbol === "-") {
        configureMathSignButton(subtract);
    }
    if (symbol === "*") {
        configureMathSignButton(multiply);
    }
    if (symbol === "/") {
        configureMathSignButton(division);
    }
}

//keys events

let lastKey = {lastKeyPressedWasSign: false, lastKeySignPressed:""};

displayValues = {
    pastDisplayValue: undefined,
    currentDisplayValue: undefined,
};

display = document.querySelector(".display");
values = document.querySelectorAll(".buttons > .value");
values.forEach(value => {
    value.addEventListener("click", function eventHandler(e) {
        if (lastKey.lastKeyPressedWasSign) {
            display.innerHTML = "";
        }
        e.stopImmediatePropagation();
        display.innerHTML += value.innerHTML;
        lastKey.lastKeyPressedWasSign = false;
    });
});

mathSigns = document.querySelectorAll(".buttons > .mathSign");
mathSigns.forEach(mathSign => {
    mathSign.addEventListener("click", function eventHandler(e) {
        if (!(lastKey.lastKeyPressedWasSign)) {
            selectOperation(lastKey.lastKeySignPressed);
        }
        e.stopImmediatePropagation();
        displayValues.pastDisplayValue = Number(display.innerHTML);
        lastKey.lastKeySignPressed = mathSign.innerHTML;
        lastKey.lastKeyPressedWasSign = true;
    })
});

equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", function eventHandler(e) {
    if ((!(lastKey.lastKeyPressedWasSign)) && displayValues.pastDisplayValue !== undefined) {
        selectOperation(lastKey.lastKeySignPressed);
        displayValues.pastDisplayValue = undefined;
        lastKey.lastKeyPressedWasSign = false;
    }
});

clearButton = document.querySelector(".clear");
clearButton.addEventListener("click",function eventHandler(e) {
    display.innerHTML = 0;
    displayValues.pastDisplayValue = undefined;
    displayValues.currentDisplayValue = undefined;
    lastKey.lastKeyPressedWasSign = false;
    lastKey.lastKeySignPressed = "";
});

dotButton = document.querySelector(".dot");
dotButton.addEventListener("click", function eventHandler(e) {
    let noDots = true;
    for (let i = 0; i < display.innerHTML.length; i++) {
        if (display.innerHTML.charAt(i) === ".") {
            noDots = false;
        }
    }
    if (noDots) {
        display.innerHTML += ".";
    }
});

percentageButton = document.querySelector(".percentage");
percentageButton.addEventListener("click",function eventHandler(e) {
    display.innerHTML = (Number(display.innerHTML)/100).toString();
});

//you have 3 things left to do:

//the invert sign button, pretty simple if 1st digit of display.innerHTML 
//then display.innerHTML = "-" + himself. Else make a for from index 1 onwards and make it the 
//new innerHTML to remove the "-"

//The keyboard support, just pick the indexes on google and do an event.keydown, 
//if equal to 0 key index then click() the 0 button, same thing to all keys
//the +/- , make a hot key for it and put that on the screen for the user 

//Amogus theme... you figure out, i hope XD