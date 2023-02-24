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
    } else {
        return Math.abs(a) - Math.abs(b);
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
    if (b/a < 1) {
        return Math.round(b/a * 100) / 100;
    } else {
        return b/a;
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

        if ((!(lastKey.lastKeyPressedWasSign)) && displayValues.pastDisplayValue === undefined); {
            selectOperation(lastKey.lastKeySignPressed);
        }
        e.stopImmediatePropagation();
        displayValues.pastDisplayValue = Number(display.innerHTML);
        lastKey.lastKeySignPressed = mathSign.innerHTML;
        lastKey.lastKeyPressedWasSign = true;
    })
});

