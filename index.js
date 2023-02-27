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
        setTimeout(() => {alert("STOP RIGHT THERE CRIMINAL SCUM!");},100);
        return "";
    }

    if (b/a  !== Math.floor(b/a)) {
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
values = document.querySelectorAll(".buttons > ul > li > .value");
values.forEach(value => {
    value.addEventListener("click", function eventHandler(e) {
        if (lastKey.lastKeyPressedWasSign) {
            display.innerHTML = "";
        }
        //e.stopPropagation();
        display.innerHTML += value.innerHTML;
        lastKey.lastKeyPressedWasSign = false;
        
    });
});

mathSigns = document.querySelectorAll(".buttons > ul > li > .mathSign");
mathSigns.forEach(mathSign => {
    mathSign.addEventListener("click", function eventHandler(e) {
        if (!(lastKey.lastKeyPressedWasSign)) {
            selectOperation(lastKey.lastKeySignPressed);
        }
        //e.stopPropagation();
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
    display.innerHTML = "";
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

invertButton = document.querySelector(".invert");
invertButton.addEventListener("click", function eventHandler(e) {
    if (display.innerHTML.charAt(0) === "-") {
        display.innerHTML = display.innerHTML.slice(1);
    } else {
        display.innerHTML = "-" + display.innerHTML;
    }
})

backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", function eventHandler(e) {
    display.innerHTML = display.innerHTML.slice(0,display.innerHTML.length-1);
})

document.body.addEventListener("keydown", function eventHandler(e) {
    function clicker(keyID,buttonSelector) {
        if (e.which === keyID) {
            document.querySelector(buttonSelector).click();
        }
    }
    e.preventDefault();
    clicker(96,".zero");
    clicker(97,".one");
    clicker(98,".two");
    clicker(99,".three");
    clicker(100,".four");
    clicker(101,".five");
    clicker(102,".six");
    clicker(103,".seven");
    clicker(104,".eight");
    clicker(105,".nine");
    clicker(107,".plus");
    clicker(109,".minus");
    clicker(106,".times");
    clicker(111,".divided");
    clicker(187,".equal");
    clicker(190,".dot");
    clicker(80,".percentage");
    clicker(9,".invert");
    clicker(8,".backspace");
    clicker(46,".clear");


});
function checkForLongDisplayValue(eventName) {
    document.body.addEventListener(eventName, function eventHandler(e) {
        if (display.innerHTML.length > 8) {
            clearButton = document.querySelector(".clear");
            clearButton.click();
            setTimeout(() => {alert("NUMBER TOO BIG, MAX 8 DIGITS!");},100);
        }
    })    
}
checkForLongDisplayValue("click");
checkForLongDisplayValue("keydown");


//You have to change the background for something legal XDDDD